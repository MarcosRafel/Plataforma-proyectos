const express = require('express');
const router = express.Router();
const pool = require('../db');
const { autenticar } = require('../seguridad');

// 1. OBTENER CATÁLOGOS
router.get('/catalogos', autenticar, async (req, res) => {
    try {
        const [estadosProyecto] = await pool.query('SELECT * FROM estados_proyecto WHERE activo = 1');
        res.json({ estadosProyecto });
    } catch (error) {
        res.status(500).json({ error: 'Error cargando catálogos' });
    }
});

// 2. TODOS LOS PROYECTOS (Administrador)
router.get('/proyectos', autenticar, async (req, res) => {
    try {
        // Aprovechamos la vista que ya une todas las tablas
        const query = `
            SELECT id, nombre_proyecto, responsable, periodo, fecha_actualizacion,
                   convocatoria_nombre, estado_nombre
            FROM vista_proyectos 
        `;
        const [rows] = await pool.query(query);
        const proyectosFormateados = rows.map(row => ({
            _id: row.id,
            nombre_proyecto: row.nombre_proyecto,
            responsable: row.responsable, // La vista ya trae el nombre_completo
            periodo: row.periodo,
            fecha_actualizacion: row.fecha_actualizacion,
            convocatoria: { nombre: row.convocatoria_nombre || 'Sin asignar' },
            estado: { nombre: row.estado_nombre || 'Sin asignar' }
        }));
        res.json(proyectosFormateados);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 3. MIS PROYECTOS (Solo los que administra el usuario actual)
router.get('/proyectos/mios', autenticar, async (req, res) => {
    try {
        // Ahora filtramos de forma exacta y segura usando el ID numérico
        const query = `
            SELECT id, nombre_proyecto, responsable, periodo, fecha_actualizacion,
                   convocatoria_nombre, estado_nombre
            FROM vista_proyectos 
            WHERE id_responsable = ?
        `;
        const [rows] = await pool.query(query, [req.usuario.id_usuario]);
        
        const proyectosFormateados = rows.map(row => ({
            _id: row.id,
            nombre_proyecto: row.nombre_proyecto,
            responsable: row.responsable,
            periodo: row.periodo,
            fecha_actualizacion: row.fecha_actualizacion,
            convocatoria: { nombre: row.convocatoria_nombre || 'Sin asignar' },
            estado: { nombre: row.estado_nombre || 'Sin asignar' }
        }));
        res.json(proyectosFormateados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 4. PARTICIPACIONES (Donde el usuario es colaborador o recurso, pero NO responsable)
router.get('/proyectos/participaciones', autenticar, async (req, res) => {
    try {
        const idUsuario = req.usuario.id_usuario;
        
        const query = `
            SELECT DISTINCT vp.id, vp.nombre_proyecto, vp.responsable, vp.periodo, vp.fecha_actualizacion,
                   vp.convocatoria_nombre, vp.estado_nombre
            FROM vista_proyectos vp
            LEFT JOIN colaboradores col ON vp.id = col.id_proyecto
            LEFT JOIN recursos_humanos rh ON vp.id = rh.id_proyecto
            WHERE vp.id_responsable != ? 
              AND (col.id_usuario = ? OR rh.id_usuario = ?)
        `;
        const [rows] = await pool.query(query, [idUsuario, idUsuario, idUsuario]);
        
        const proyectosFormateados = rows.map(row => ({
            _id: row.id,
            nombre_proyecto: row.nombre_proyecto,
            responsable: row.responsable,
            periodo: row.periodo,
            fecha_actualizacion: row.fecha_actualizacion,
            convocatoria: { nombre: row.convocatoria_nombre || 'Sin asignar' },
            estado: { nombre: row.estado_nombre || 'Sin asignar' }
        }));
        res.json(proyectosFormateados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// 5. OBTENER UN PROYECTO ESPECÍFICO
router.get('/proyectos/:id', autenticar, async (req, res) => {
    try {
        const id = req.params.id;
        // Obtenemos todo a través de las vistas para no perder los campos calculados
        const [generales] = await pool.query('SELECT * FROM vista_proyectos WHERE id = ?', [id]);

        if (generales.length === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });

        const [colaboradores] = await pool.query('SELECT * FROM vista_colaboradores WHERE id_proyecto = ?', [id]);
        const [recursos] = await pool.query('SELECT * FROM vista_recursos_humanos WHERE id_proyecto = ?', [id]);
        
        // Mapeamos 'lugar' a 'donde' para no romper tu frontend
        const [productosData] = await pool.query('SELECT * FROM vista_productos_academicos WHERE id_proyecto = ?', [id]);
        const productos = productosData.map(p => ({ ...p, donde: p.lugar }));

        // Para evitar romper el frontend, inyectamos propiedades antiguas como alias
        const proyectoGeneral = {
            ...generales[0],
            convocatoria: generales[0].convocatoria_nombre,
            estado: generales[0].estado_nombre
        };

        res.json({ generales: proyectoGeneral, colaboradores, recursosHumanos: recursos, productos });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener' });
    }
});

// 6. CREAR PROYECTO
router.post('/proyectos', autenticar, async (req, res) => {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        const { generales, colaboradores, recursosHumanos, productos } = req.body;

        const nombreConvocatoria = generales.nombre_convocatoria || generales.convocatoria;
        let id_convocatoria_final;
        const [busqueda] = await conexion.query('SELECT id FROM convocatoria WHERE nombre = ?', [nombreConvocatoria]);
        
        if (busqueda.length > 0) {
            id_convocatoria_final = busqueda[0].id;
        } else {
            const [nueva] = await conexion.query('INSERT INTO convocatoria (nombre) VALUES (?)', [nombreConvocatoria]);
            id_convocatoria_final = nueva.insertId; 
        }

        // El ID del responsable viene del cuerpo si es admin asignando, o de la sesión actual
        const id_responsable_final = generales.id_responsable || req.usuario.id_usuario;

        const [resultadoProyecto] = await conexion.query(`
            INSERT INTO proyectos (nombre_proyecto, id_convocatoria, id_estado, periodo, id_responsable) 
            VALUES (?, ?, ?, ?, ?)
        `, [generales.nombre_proyecto, id_convocatoria_final, 1, generales.periodo, id_responsable_final]);
        
        const idNuevoProyecto = resultadoProyecto.insertId;

        // Inserción de colaboradores (Separando si es usuario del sistema o externo)
        if (colaboradores && colaboradores.length > 0) {
            const valuesColaboradores = colaboradores.map(c => {
                const isString = typeof c === 'string';
                const id_us = (!isString && c.id_usuario) ? c.id_usuario : null;
                const nombreExt = id_us ? null : (isString ? c : c.nombre);
                return [idNuevoProyecto, id_us, nombreExt, null]; // id_proyecto, id_usuario, nombre_externo, correo_externo
            });
            await conexion.query('INSERT INTO colaboradores (id_proyecto, id_usuario, nombre_externo, correo_externo) VALUES ?', [valuesColaboradores]);
        }

        // Inserción de Recursos Humanos (Igual, maneja externos por defecto si no hay ID)
        if (recursosHumanos && recursosHumanos.length > 0) {
            const valuesRecursos = recursosHumanos.map(r => {
                const id_us = r.id_usuario || null;
                const nombreExt = id_us ? null : r.nombre;
                return [idNuevoProyecto, id_us, nombreExt, null, r.tipo, r.actividad, r.periodo];
            });
            await conexion.query('INSERT INTO recursos_humanos (id_proyecto, id_usuario, nombre_externo, correo_externo, tipo, nombre_actividad, periodo) VALUES ?', [valuesRecursos]);
        }

        // Inserción de Productos (Mapea 'donde' a la columna 'lugar', valida el ENUM de estado)
        if (productos && productos.length > 0) {
            const valuesProductos = productos.map(p => [
                idNuevoProyecto, 
                p.tipo, 
                p.nombre, 
                p.donde || p.lugar, 
                p.fechaEnvio || p.fecha_envio || null, 
                p.fechaPublicacion || p.fecha_publicacion || null, 
                p.estado || 'En preparación'
            ]);
            await conexion.query('INSERT INTO productos_academicos (id_proyecto, tipo, nombre_producto, lugar, fecha_envio, fecha_publicacion, estado) VALUES ?', [valuesProductos]);
        }

        await conexion.commit(); 
        res.status(201).json({ mensaje: 'Proyecto creado exitosamente', id: idNuevoProyecto });
    } catch (error) {
        console.error("Error al registrar:", error);
        await conexion.rollback(); 
        res.status(500).json({ error: 'Error al registrar' });
    } finally {
        conexion.release(); 
    }
});

// 7. EDITAR PROYECTO
router.put('/proyectos/:id', autenticar, async (req, res) => {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        const idProyecto = req.params.id;
        const { generales, colaboradores, recursosHumanos, productos } = req.body;

        const nombreConvocatoria = generales.nombre_convocatoria || generales.convocatoria;
        let id_convocatoria_final;
        const [busqueda] = await conexion.query('SELECT id FROM convocatoria WHERE nombre = ?', [nombreConvocatoria]);
        if (busqueda.length > 0) {
            id_convocatoria_final = busqueda[0].id;
        } else {
            const [nueva] = await conexion.query('INSERT INTO convocatoria (nombre) VALUES (?)', [nombreConvocatoria]);
            id_convocatoria_final = nueva.insertId;
        }

        const [busquedaEstado] = await conexion.query('SELECT id FROM estados_proyecto WHERE nombre = ?', [generales.estado]);
        const id_estado_final = busquedaEstado.length > 0 ? busquedaEstado[0].id : 1; 

        const id_responsable_final = generales.id_responsable || req.usuario.id_usuario;

        await conexion.query(`
            UPDATE proyectos 
            SET nombre_proyecto = ?, id_convocatoria = ?, periodo = ?, id_responsable = ?, id_estado = ? 
            WHERE id = ?
        `, [generales.nombre_proyecto || generales.nombre, id_convocatoria_final, generales.periodo, id_responsable_final, id_estado_final, idProyecto]);

        await conexion.query('DELETE FROM colaboradores WHERE id_proyecto = ?', [idProyecto]);
        if (colaboradores && colaboradores.length > 0) {
            const valColab = colaboradores.map(c => {
                const isString = typeof c === 'string';
                const id_us = (!isString && c.id_usuario) ? c.id_usuario : null;
                const nombreExt = id_us ? null : (isString ? c : c.nombre);
                return [idProyecto, id_us, nombreExt, null];
            });
            await conexion.query('INSERT INTO colaboradores (id_proyecto, id_usuario, nombre_externo, correo_externo) VALUES ?', [valColab]);
        }

        await conexion.query('DELETE FROM recursos_humanos WHERE id_proyecto = ?', [idProyecto]);
        if (recursosHumanos && recursosHumanos.length > 0) {
            const valRecursos = recursosHumanos.map(r => {
                const id_us = r.id_usuario || null;
                const nombreExt = id_us ? null : r.nombre;
                return [idProyecto, id_us, nombreExt, null, r.tipo, r.actividad, r.periodo];
            });
            await conexion.query('INSERT INTO recursos_humanos (id_proyecto, id_usuario, nombre_externo, correo_externo, tipo, nombre_actividad, periodo) VALUES ?', [valRecursos]);
        }

        await conexion.query('DELETE FROM productos_academicos WHERE id_proyecto = ?', [idProyecto]);
        if (productos && productos.length > 0) {
            const valProductos = productos.map(p => [
                idProyecto, 
                p.tipo, 
                p.nombre, 
                p.donde || p.lugar, 
                p.fechaEnvio || p.fecha_envio || null, 
                p.fechaPublicacion || p.fecha_publicacion || null, 
                p.estado || 'En preparación'
            ]);
            await conexion.query('INSERT INTO productos_academicos (id_proyecto, tipo, nombre_producto, lugar, fecha_envio, fecha_publicacion, estado) VALUES ?', [valProductos]);
        }

        await conexion.commit();
        res.json({ mensaje: 'Proyecto actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar:", error);
        await conexion.rollback();
        res.status(500).json({ error: 'Error al actualizar' });
    } finally {
        conexion.release();
    }
});

// 8. ELIMINAR PROYECTO
router.delete('/proyectos/:id', autenticar, async (req, res) => {
    try {
        await pool.query('DELETE FROM proyectos WHERE id = ?', [req.params.id]);
        res.json({ mensaje: 'Proyecto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;