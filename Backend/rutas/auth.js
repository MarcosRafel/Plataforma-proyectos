const express = require('express');
const router = express.Router();
const pool = require('../db');
const crypto = require('crypto'); // Nuevo módulo nativo de Node.js para generar hashes
const { verificarContrasena, crearTokenSesion, crearHashContrasena, autenticar, requerirAdministrador } = require('../seguridad');
const { enviarCorreo } = require('./mailer');

const enProduccion = process.env.NODE_ENV === 'production';
const opcionesCookie = {
    httpOnly: true,
    sameSite: process.env.COOKIE_SAME_SITE || 'lax',
    secure: enProduccion,
    path: '/'
};

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE correo = ? AND activo = 1', [correo]);
        
        if (usuarios.length === 0 || !verificarContrasena(password, usuarios[0].password_hash)) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        const usuario = usuarios[0];
        const token = crearTokenSesion(usuario);

        res.cookie('plataforma_sesion', token, {
            ...opcionesCookie,
            maxAge: 28800 * 1000
        });

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,             
                especialidad: usuario.especialidad,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTA /me
router.get('/me', autenticar, (req, res) => {
    res.json({ usuario: req.usuario });
});

// LOGOUT
router.post('/logout', (req, res) => {
    res.clearCookie('plataforma_sesion', opcionesCookie);
    res.json({ mensaje: 'Sesión cerrada correctamente.' });
});

// OBTENER USUARIOS
router.get('/usuarios', autenticar, requerirAdministrador, async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT id_usuario AS id, nombre, apellido, correo, especialidad, rol, activo, fecha_registro FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'No fue posible cargar los usuarios.' });
    }
});

// OBTENER USUARIOS DISPONIBLES PARA COLABORADORES
router.get('/usuarios/seleccionables', autenticar, async (req, res) => {
    try {
        const [usuarios] = await pool.query(`
            SELECT id_usuario AS id, nombre, apellido, correo
            FROM usuarios
            WHERE activo = 1
              AND rol = 'Investigador'
            ORDER BY nombre ASC, apellido ASC
        `);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'No fue posible cargar los usuarios disponibles.' });
    }
});

// CREAR USUARIO
router.post('/usuarios', autenticar, requerirAdministrador, async (req, res) => {
    try {
        const { nombre, apellido, correo, especialidad, rol, activo, contrasena } = req.body;

        if (!nombre || !apellido) {
            return res.status(400).json({ mensaje: 'Nombre y apellido son obligatorios.' });
        }

        const password_hash_final = crearHashContrasena(contrasena || 'temporal123');

        const [resultado] = await pool.query(`
            INSERT INTO usuarios (nombre, apellido, correo, especialidad, rol, activo, password_hash)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            nombre.trim(), 
            apellido.trim(), 
            correo ? correo.trim() : null, 
            especialidad ? especialidad.trim() : '', 
            rol || 'Investigador', 
            activo !== false ? 1 : 0, 
            password_hash_final
        ]);

        res.status(201).json({ mensaje: 'Usuario creado correctamente', id: resultado.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'El correo electrónico ya se encuentra registrado.' });
        }
        res.status(500).json({ mensaje: 'Error al registrar el usuario en la base de datos.' });
    }
});

// EDITAR USUARIO
router.put('/usuarios/:id', autenticar, requerirAdministrador, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, especialidad, rol, activo, contrasena } = req.body;

        if (!nombre || !apellido) {
            return res.status(400).json({ mensaje: 'Nombre y apellido son obligatorios.' });
        }

        let query = `UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, especialidad = ?, rol = ?, activo = ?`;
        let params = [nombre.trim(), apellido.trim(), correo ? correo.trim() : null, especialidad ? especialidad.trim() : '', rol, activo !== false ? 1 : 0];

        if (contrasena) {
            const password_hash_final = crearHashContrasena(contrasena);
            query += `, password_hash = ?`;
            params.push(password_hash_final);
        }

        query += ` WHERE id_usuario = ?`;
        params.push(id);

        await pool.query(query, params);
        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'El correo electrónico ya se encuentra registrado por otro usuario.' });
        }
        res.status(500).json({ mensaje: 'Error al actualizar el usuario.' });
    }
});

// ELIMINAR USUARIO
router.delete('/usuarios/:id', autenticar, requerirAdministrador, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario.' });
    }
});

// ACTUALIZAR PERFIL PROPIO
router.put('/me', autenticar, async (req, res) => {
    try {
        const { nombre, apellido, correo, especialidad } = req.body;

        if (!nombre || !apellido) {
            return res.status(400).json({ mensaje: 'Nombre y apellido son obligatorios.' });
        }

        await pool.query(
            `UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, especialidad = ? WHERE id_usuario = ?`,
            [nombre.trim(), apellido.trim(), correo ? correo.trim() : null, especialidad ? especialidad.trim() : '', req.usuario.id_usuario]
        );

        const [filas] = await pool.query('SELECT id_usuario AS id, nombre, apellido, correo, especialidad, rol FROM usuarios WHERE id_usuario = ?', [req.usuario.id_usuario]);
        
        res.json({ 
            mensaje: 'Los datos del usuario se actualizaron correctamente.',
            usuario: filas[0] 
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'El correo electrónico ya está en uso por otra cuenta.' });
        }
        res.status(500).json({ mensaje: 'Error al actualizar el perfil.' });
    }
});

// CAMBIAR CONTRASEÑA PROPIA
router.put('/me/password', autenticar, async (req, res) => {
    try {
        const { contrasenaActual, contrasenaNueva } = req.body;
        
        const [usuarios] = await pool.query('SELECT password_hash FROM usuarios WHERE id_usuario = ?', [req.usuario.id_usuario]);
        
        if (usuarios.length === 0 || !verificarContrasena(contrasenaActual, usuarios[0].password_hash)) {
            return res.status(401).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const password_hash_final = crearHashContrasena(contrasenaNueva);
        await pool.query('UPDATE usuarios SET password_hash = ? WHERE id_usuario = ?', [password_hash_final, req.usuario.id_usuario]);

        res.json({ mensaje: 'La contraseña se actualizó correctamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cambiar la contraseña.' });
    }
});

// RECUPERAR CONTRASEÑA (Envío de correo con Token)
router.post('/recuperar', async (req, res) => {
    try {
        const { correo } = req.body;
        const [usuarios] = await pool.query('SELECT id_usuario FROM usuarios WHERE correo = ? AND activo = 1', [correo]);

        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            
            // 1. Generar token aleatorio seguro
            const tokenPlano = crypto.randomBytes(32).toString('hex');
            
            // 2. Crear hash SHA-256 para guardar en la base de datos
            const tokenHash = crypto.createHash('sha256').update(tokenPlano).digest('hex');
            
            // 3. Establecer expiración (1 hora)
            const expiraEn = new Date(Date.now() + 3600000);

            // 4. Guardar en la nueva tabla
            await pool.query(
                'INSERT INTO tokens_recuperacion_password (id_usuario, token_hash, expira_en) VALUES (?, ?, ?)',
                [usuario.id_usuario, tokenHash, expiraEn]
            );

            const asunto = "Recuperación de contraseña - Plataforma de Proyectos";
            const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');
            const parametros = new URLSearchParams({ correo, token: tokenPlano });
            const cuerpoHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dce7f5; border-radius: 10px;">
                    <h2 style="color: #0a2058;">¿Olvidaste tu contraseña?</h2>
                    <p style="color: #5875a6; line-height: 1.5;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${frontendUrl}/reset-password?${parametros}" style="background-color: #1264df; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Restablecer contraseña</a>
                    </div>
                    <p style="color: #8799b7; font-size: 12px;">El enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
                </div>
            `;

            await enviarCorreo(correo, asunto, cuerpoHtml);
        }

        res.json({ mensaje: 'Si el correo está registrado, recibirás las instrucciones en breve.' });
    } catch (error) {
        console.error("Error al procesar recuperación:", error);
        res.status(500).json({ mensaje: 'Ocurrió un error interno al intentar enviar el correo.' });
    }
});

// ACTUALIZAR CONTRASEÑA (Validación con la tabla de tokens)
router.post('/actualizar-password', async (req, res) => {
    try {
        const { correo, contrasenaNueva, token } = req.body;

        if (!token) {
            return res.status(400).json({ mensaje: 'Enlace de recuperación incompleto.' });
        }

        // Buscar al usuario por correo
        const [usuarios] = await pool.query('SELECT id_usuario FROM usuarios WHERE correo = ?', [correo]);
        if (usuarios.length === 0) {
            return res.status(400).json({ mensaje: 'El usuario no existe.' });
        }
        
        const usuario = usuarios[0];

        // Hashear el token recibido para compararlo con el de la base de datos
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        // Validar que el token exista, pertenezca al usuario, no haya expirado y no haya sido usado
        const [tokensDb] = await pool.query(
            'SELECT id FROM tokens_recuperacion_password WHERE id_usuario = ? AND token_hash = ? AND expira_en > NOW() AND usado_en IS NULL',
            [usuario.id_usuario, tokenHash]
        );

        if (tokensDb.length === 0) {
            return res.status(400).json({ mensaje: 'El enlace de recuperación es inválido, ya fue usado o ha expirado.' });
        }

        const password_hash_final = crearHashContrasena(contrasenaNueva);

        // 1. Actualizar la contraseña del usuario
        await pool.query('UPDATE usuarios SET password_hash = ? WHERE id_usuario = ?', [password_hash_final, usuario.id_usuario]);
        
        // 2. Invalidar el token para que no se pueda volver a usar
        await pool.query('UPDATE tokens_recuperacion_password SET usado_en = NOW() WHERE id = ?', [tokensDb[0].id]);

        res.json({ mensaje: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar la contraseña.' });
    }
});

module.exports = router;