const express = require('express')

const pool = require('../db')
const {
  autenticar,
  requerirAdministrador
} = require('../seguridad')
const { enviarCorreo } = require('./mailer')

const router = express.Router()

router.use(autenticar)
router.use(requerirAdministrador)

const texto = valor => String(valor ?? '').trim()

const fechaSql = valor => {
  const coincidencia = texto(valor).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return coincidencia ? coincidencia[0] : ''
}

const numeroPositivo = valor => {
  const numero = Number(valor)
  return Number.isInteger(numero) && numero > 0 ? numero : null
}

const idsPositivosUnicos = valores => {
  if (!Array.isArray(valores)) return []

  return [...new Set(
    valores
      .map(numeroPositivo)
      .filter(Boolean)
  )].slice(0, 500)
}

const normalizarFiltros = entrada => ({
  busqueda: texto(entrada?.busqueda).slice(0, 120),
  estado: texto(entrada?.estado).slice(0, 50),
  convocatoria: texto(entrada?.convocatoria).slice(0, 150),
  responsable: texto(entrada?.responsable).slice(0, 150),
  colaborador: texto(entrada?.colaborador).slice(0, 150),
  desde: fechaSql(entrada?.desde),
  hasta: fechaSql(entrada?.hasta),
  // Compatibilidad con reportes históricos previos
  idResponsable: numeroPositivo(entrada?.idResponsable)
})

const parsearJson = valor => {
  if (valor === null || valor === undefined) {
    return null
  }

  if (typeof valor === 'object') {
    return valor
  }

  try {
    return JSON.parse(String(valor))
  } catch {
    return null
  }
}

const construirConsulta = (filtros, proyectosSeleccionados = []) => {
  const condiciones = []
  const parametros = []

  if (filtros.busqueda) {
    const patron = `%${filtros.busqueda}%`
    condiciones.push(`(
      p.nombre_proyecto LIKE ? OR
      p.periodo LIKE ?
    )`)
    parametros.push(patron, patron)
  }

  if (filtros.estado) {
    condiciones.push('e.nombre = ?')
    parametros.push(filtros.estado)
  }

  if (filtros.convocatoria) {
    condiciones.push('c.nombre LIKE ?')
    parametros.push(`%${filtros.convocatoria}%`)
  }

  if (filtros.idResponsable) {
    condiciones.push('p.id_responsable = ?')
    parametros.push(filtros.idResponsable)
  }

  if (filtros.responsable) {
    const patron = `%${filtros.responsable}%`
    condiciones.push('(u.nombre_completo LIKE ? OR u.correo LIKE ?)')
    parametros.push(patron, patron)
  }

  if (filtros.colaborador) {
    const patron = `%${filtros.colaborador}%`
    condiciones.push(`EXISTS (
      SELECT 1
      FROM colaboradores col
      LEFT JOIN usuarios uc
        ON uc.id_usuario = col.id_usuario
      WHERE col.id_proyecto = p.id
        AND (
          uc.nombre_completo LIKE ? OR
          uc.correo LIKE ? OR
          col.nombre_externo LIKE ? OR
          col.correo_externo LIKE ?
        )
    )`)
    parametros.push(patron, patron, patron, patron)
  }

  if (filtros.desde) {
    condiciones.push('DATE(p.fecha_actualizacion) >= ?')
    parametros.push(filtros.desde)
  }

  if (filtros.hasta) {
    condiciones.push('DATE(p.fecha_actualizacion) <= ?')
    parametros.push(filtros.hasta)
  }

  if (proyectosSeleccionados.length) {
    condiciones.push(`p.id IN (${proyectosSeleccionados.map(() => '?').join(', ')})`)
    parametros.push(...proyectosSeleccionados)
  }

  const where = condiciones.length > 0
    ? `WHERE ${condiciones.join(' AND ')}`
    : ''

  return { where, parametros }
}

const consultarProyectos = async (filtros, proyectosSeleccionados = []) => {
  const { where, parametros } = construirConsulta(filtros, proyectosSeleccionados)

  const [filas] = await pool.query(
    `SELECT
       p.id AS id_proyecto,
       p.nombre_proyecto,
       u.nombre_completo AS responsable,
       u.correo AS responsable_correo,
       c.nombre AS convocatoria,
       e.nombre AS estado,
       p.periodo,
       p.fecha_creacion,
       p.fecha_actualizacion,
       (
         SELECT COUNT(*)
         FROM colaboradores col
         WHERE col.id_proyecto = p.id
       ) AS colaboradores,
       (
         SELECT GROUP_CONCAT(
           DISTINCT COALESCE(uc.nombre_completo, NULLIF(col.nombre_externo, ''), NULLIF(col.correo_externo, ''))
           ORDER BY COALESCE(uc.nombre_completo, col.nombre_externo, col.correo_externo)
           SEPARATOR ' · '
         )
         FROM colaboradores col
         LEFT JOIN usuarios uc
           ON uc.id_usuario = col.id_usuario
         WHERE col.id_proyecto = p.id
       ) AS colaboradores_detalle,
       (
         SELECT COUNT(*)
         FROM recursos_humanos rh
         WHERE rh.id_proyecto = p.id
       ) AS recursos_humanos,
       (
         SELECT COUNT(*)
         FROM productos_academicos pa
         WHERE pa.id_proyecto = p.id
       ) AS productos_academicos
     FROM proyectos p
     INNER JOIN usuarios u
       ON u.id_usuario = p.id_responsable
     INNER JOIN convocatoria c
       ON c.id = p.id_convocatoria
     INNER JOIN estados_proyecto e
       ON e.id = p.id_estado
     ${where}
     ORDER BY p.fecha_actualizacion DESC, p.id DESC`,
    parametros
  )

  return filas.map(fila => ({
    ...fila,
    id_proyecto: Number(fila.id_proyecto),
    colaboradores: Number(fila.colaboradores || 0),
    recursos_humanos: Number(fila.recursos_humanos || 0),
    productos_academicos: Number(fila.productos_academicos || 0),
    colaboradores_detalle: fila.colaboradores_detalle || ''
  }))
}


const consultarDetallesProyectos = async idsEntrada => {
  const ids = idsPositivosUnicos(idsEntrada)

  if (!ids.length) return []

  const marcadores = ids.map(() => '?').join(', ')

  const [
    [proyectos],
    [colaboradores],
    [recursos],
    [productos],
    [historial],
    [entregables],
    [archivos]
  ] = await Promise.all([
    pool.query(
      `SELECT
         p.id AS id_proyecto,
         p.nombre_proyecto,
        NULL AS descripcion,
        NULL AS modalidad,
         p.periodo,
        NULL AS prioridad,
        NULL AS porcentaje_avance,
        NULL AS activo,
        NULL AS sometido_at,
        NULL AS estado_actualizado_at,
        NULL AS fecha_inicio,
        NULL AS fecha_fin_estimada,
        NULL AS fecha_finalizacion,
         p.fecha_creacion,
         p.fecha_actualizacion,
         u.id_usuario AS responsable_id,
         u.nombre_completo AS responsable,
         u.correo AS responsable_correo,
         u.especialidad AS responsable_especialidad,
         c.id AS convocatoria_id,
         c.nombre AS convocatoria,
         c.fecha_inicio AS convocatoria_fecha_inicio,
         c.fecha_fin AS convocatoria_fecha_fin,
         c.activo AS convocatoria_activa,
         e.id AS estado_id,
         e.nombre AS estado,
         e.descripcion AS estado_descripcion
       FROM proyectos p
       INNER JOIN usuarios u
         ON u.id_usuario = p.id_responsable
       INNER JOIN convocatoria c
         ON c.id = p.id_convocatoria
       INNER JOIN estados_proyecto e
         ON e.id = p.id_estado
       WHERE p.id IN (${marcadores})`,
      ids
    ),
    pool.query(
      `SELECT
         col.id,
         col.id_proyecto,
         col.id_usuario,
         COALESCE(
           u.nombre_completo,
           NULLIF(col.nombre_externo, ''),
           NULLIF(col.correo_externo, ''),
           'Sin nombre'
         ) AS nombre,
         COALESCE(u.correo, col.correo_externo, '') AS correo,
         CASE WHEN col.id_usuario IS NULL THEN 'Externo' ELSE 'Usuario' END AS origen,
         col.fecha_creacion,
         col.fecha_actualizacion
       FROM colaboradores col
       LEFT JOIN usuarios u
         ON u.id_usuario = col.id_usuario
       WHERE col.id_proyecto IN (${marcadores})
       ORDER BY col.id_proyecto, nombre, col.id`,
      ids
    ),
    pool.query(
      `SELECT
         rh.id,
         rh.id_proyecto,
         rh.id_usuario,
         COALESCE(
           u.nombre_completo,
           NULLIF(rh.nombre_externo, ''),
           NULLIF(rh.correo_externo, ''),
           'Sin nombre'
         ) AS nombre,
         COALESCE(u.correo, rh.correo_externo, '') AS correo,
         CASE WHEN rh.id_usuario IS NULL THEN 'Externo' ELSE 'Usuario' END AS origen,
         rh.tipo,
         rh.nombre_actividad AS actividad,
         rh.periodo,
         rh.fecha_creacion,
         rh.fecha_actualizacion
       FROM recursos_humanos rh
       LEFT JOIN usuarios u
         ON u.id_usuario = rh.id_usuario
       WHERE rh.id_proyecto IN (${marcadores})
       ORDER BY rh.id_proyecto, rh.tipo, nombre, rh.id`,
      ids
    ),
    pool.query(
      `SELECT
         pa.id,
         pa.id_proyecto,
         pa.tipo,
         pa.nombre_producto AS nombre,
         pa.lugar,
         pa.fecha_envio,
         pa.fecha_publicacion,
         pa.estado,
         pa.fecha_creacion,
         pa.fecha_actualizacion
       FROM productos_academicos pa
       WHERE pa.id_proyecto IN (${marcadores})
       ORDER BY pa.id_proyecto, pa.tipo, pa.nombre_producto, pa.id`,
      ids
    ),
    // Estas entidades pertenecen a una versión ampliada del esquema y no
    // existen en la base original; se mantienen vacías para conservar el
    // formato del reporte sin impedir su generación.
    Promise.resolve([[]]),
    Promise.resolve([[]]),
    Promise.resolve([[]])
  ])

  const mapa = new Map(
    proyectos.map(proyecto => [
      Number(proyecto.id_proyecto),
      {
        ...proyecto,
        id_proyecto: Number(proyecto.id_proyecto),
        responsable_id: Number(proyecto.responsable_id),
        convocatoria_id: Number(proyecto.convocatoria_id),
        convocatoria_activa: Boolean(proyecto.convocatoria_activa),
        estado_id: Number(proyecto.estado_id),
        porcentaje_avance: Number(proyecto.porcentaje_avance || 0),
        activo: Boolean(proyecto.activo),
        colaboradores: [],
        recursos_humanos: [],
        productos_academicos: [],
        historial_estados: [],
        entregables: [],
        archivos: []
      }
    ])
  )

  const anexar = (filas, clave) => {
    for (const fila of filas) {
      const proyecto = mapa.get(Number(fila.id_proyecto))
      if (!proyecto) continue
      proyecto[clave].push({
        ...fila,
        id: Number(fila.id),
        id_proyecto: Number(fila.id_proyecto),
        ...(fila.id_usuario !== undefined
          ? { id_usuario: fila.id_usuario ? Number(fila.id_usuario) : null }
          : {}),
        ...(fila.cantidad_comprometida !== undefined
          ? { cantidad_comprometida: Number(fila.cantidad_comprometida || 0) }
          : {}),
        ...(fila.cantidad_entregada !== undefined
          ? { cantidad_entregada: Number(fila.cantidad_entregada || 0) }
          : {}),
        ...(fila.tamano !== undefined
          ? { tamano: fila.tamano === null ? null : Number(fila.tamano) }
          : {})
      })
    }
  }

  anexar(colaboradores, 'colaboradores')
  anexar(recursos, 'recursos_humanos')
  anexar(productos, 'productos_academicos')
  anexar(historial, 'historial_estados')
  anexar(entregables, 'entregables')
  anexar(archivos, 'archivos')

  return ids
    .map(id => mapa.get(id))
    .filter(Boolean)
}

router.get('/resumen', async (req, res) => {
  try {
    const [totales] = await pool.query(
      `SELECT
         (SELECT COUNT(*) FROM proyectos) AS proyectos,
         (SELECT COUNT(*) FROM usuarios WHERE activo = 1) AS usuarios_activos,
         (SELECT COUNT(*) FROM usuarios WHERE activo = 1 AND rol = 'Investigador') AS investigadores_activos,
         (SELECT COUNT(*) FROM convocatoria WHERE activo = 1) AS convocatorias_activas,
         (SELECT COUNT(*) FROM reportes_generados) AS reportes_generados,
         (SELECT MAX(fecha_actualizacion) FROM proyectos) AS ultima_actualizacion`
    )

    const [porEstado] = await pool.query(
      `SELECT
         e.nombre AS estado,
         COUNT(p.id) AS total
       FROM estados_proyecto e
       LEFT JOIN proyectos p
         ON p.id_estado = e.id
       WHERE e.activo = 1
       GROUP BY e.id, e.nombre
       ORDER BY e.id`
    )

    const [catalogosEstado] = await pool.query(
      `SELECT nombre
       FROM estados_proyecto
       WHERE activo = 1
       ORDER BY id`
    )

    const [catalogosConvocatoria] = await pool.query(
      `SELECT nombre
       FROM convocatoria
       WHERE activo = 1
       ORDER BY nombre`
    )

    const resumen = totales[0] || {}

    res.json({
      resumen: {
        proyectos: Number(resumen.proyectos || 0),
        usuarios_activos: Number(resumen.usuarios_activos || 0),
        investigadores_activos: Number(resumen.investigadores_activos || 0),
        convocatorias_activas: Number(resumen.convocatorias_activas || 0),
        reportes_generados: Number(resumen.reportes_generados || 0),
        ultima_actualizacion: resumen.ultima_actualizacion || null
      },
      proyectos_por_estado: porEstado.map(item => ({
        estado: item.estado,
        total: Number(item.total || 0)
      })),
      catalogos: {
        estados: catalogosEstado.map(item => item.nombre),
        convocatorias: catalogosConvocatoria.map(item => item.nombre)
      }
    })
  } catch (error) {
    console.error('Error consultando resumen de reportes:', error)
    res.status(500).json({
      mensaje: 'No fue posible cargar el resumen administrativo.'
    })
  }
})

router.post('/preview', async (req, res) => {
  try {
    const filtros = normalizarFiltros(req.body?.filtros || req.body || {})

    if (filtros.desde && filtros.hasta && filtros.desde > filtros.hasta) {
      return res.status(400).json({
        mensaje: 'La fecha inicial no puede ser posterior a la fecha final.'
      })
    }

    const registros = await consultarProyectos(filtros)

    res.json({
      total: registros.length,
      registros
    })
  } catch (error) {
    console.error('Error generando vista previa del reporte:', error)
    res.status(500).json({
      mensaje: 'No fue posible obtener la vista previa de proyectos.'
    })
  }
})

router.post('/generar', async (req, res) => {
  try {
    const filtros = normalizarFiltros(req.body?.filtros || req.body || {})
    const proyectosSeleccionados = idsPositivosUnicos(req.body?.proyectosSeleccionados)

    if (!proyectosSeleccionados.length) {
      return res.status(400).json({
        mensaje: 'Selecciona al menos un proyecto antes de generar el reporte.'
      })
    }

    if (filtros.desde && filtros.hasta && filtros.desde > filtros.hasta) {
      return res.status(400).json({
        mensaje: 'La fecha inicial no puede ser posterior a la fecha final.'
      })
    }

    const registros = await consultarProyectos(filtros, proyectosSeleccionados)

    if (!registros.length) {
      return res.status(400).json({
        mensaje: 'Los proyectos seleccionados ya no coinciden con los filtros actuales. Vuelve a buscar y seleccionarlos.'
      })
    }

    const proyectosDetallados = await consultarDetallesProyectos(
      registros.map(item => item.id_proyecto)
    )

    const fechaGeneracion = new Date().toISOString()
    const nombre = `Reporte de proyectos - ${fechaGeneracion.slice(0, 10)}`
    const filtrosReporte = {
      ...filtros,
      proyectosSeleccionados
    }

    const contenido = {
      tipo: 'proyectos',
      nombre,
      filtros: filtrosReporte,
      fecha_generacion: fechaGeneracion,
      generado_por: {
        id_usuario: req.usuario.id_usuario,
        nombre_completo: req.usuario.nombre_completo,
        correo: req.usuario.correo
      },
      total_registros: registros.length,
      registros,
      proyectos_detallados: proyectosDetallados
    }

    const [resultado] = await pool.query(
      `INSERT INTO reportes_generados
         (nombre, tipo, filtros_json, contenido_json, total_registros, generado_por)
       VALUES (?, 'proyectos', ?, ?, ?, ?)`,
      [
        nombre,
        JSON.stringify(filtrosReporte),
        JSON.stringify(contenido),
        registros.length,
        req.usuario.id_usuario
      ]
    )

    res.status(201).json({
      reporte: {
        id: Number(resultado.insertId),
        ...contenido
      }
    })
  } catch (error) {
    console.error('Error generando reporte:', error)
    res.status(500).json({
      mensaje: 'No fue posible generar el reporte.'
    })
  }
})

router.get('/historial', async (req, res) => {
  try {
    const [filas] = await pool.query(
      `SELECT
         r.id,
         r.nombre,
         r.tipo,
         r.filtros_json,
         r.total_registros,
         r.fecha_generacion,
         u.nombre_completo AS generado_por_nombre,
         u.correo AS generado_por_correo
       FROM reportes_generados r
       INNER JOIN usuarios u
         ON u.id_usuario = r.generado_por
       ORDER BY r.fecha_generacion DESC, r.id DESC
       LIMIT 100`
    )

    res.json({
      reportes: filas.map(fila => ({
        id: Number(fila.id),
        nombre: fila.nombre,
        tipo: fila.tipo,
        filtros: parsearJson(fila.filtros_json) || {},
        total_registros: Number(fila.total_registros || 0),
        fecha_generacion: fila.fecha_generacion,
        generado_por: {
          nombre_completo: fila.generado_por_nombre,
          correo: fila.generado_por_correo
        }
      }))
    })
  } catch (error) {
    console.error('Error consultando historial de reportes:', error)
    res.status(500).json({
      mensaje: 'No fue posible cargar el historial de reportes.'
    })
  }
})

router.post('/historial/:id/enviar-correo', async (req, res) => {
  try {
    const id = numeroPositivo(req.params.id)
    const pdfBase64 = String(req.body?.pdfBase64 || '')

    if (!id || !pdfBase64) {
      return res.status(400).json({
        mensaje: 'El reporte y el archivo PDF son obligatorios.'
      })
    }

    if (!/^JVBERi0/.test(pdfBase64) || pdfBase64.length > 8 * 1024 * 1024) {
      return res.status(400).json({
        mensaje: 'El archivo PDF no es válido o excede el tamaño permitido.'
      })
    }

    const [filas] = await pool.query(
      `SELECT nombre
       FROM reportes_generados
       WHERE id = ?
       LIMIT 1`,
      [id]
    )

    if (filas.length === 0) {
      return res.status(404).json({ mensaje: 'El reporte no existe.' })
    }

    await enviarCorreo(
      req.usuario.correo,
      `Reporte de proyectos: ${filas[0].nombre}`,
      `<p>Hola,</p><p>Adjunto encontrarás el reporte de proyectos solicitado desde la plataforma.</p><p>Saludos.</p>`,
      [{
        filename: `reporte-proyectos-${id}.pdf`,
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf'
      }]
    )

    res.json({
      mensaje: `El reporte fue enviado a ${req.usuario.correo}.`
    })
  } catch (error) {
    console.error('Error enviando reporte por correo:', error)
    res.status(500).json({
      mensaje: 'No fue posible enviar el reporte por correo.'
    })
  }
})

router.get('/historial/:id', async (req, res) => {
  try {
    const id = numeroPositivo(req.params.id)

    if (!id) {
      return res.status(400).json({ mensaje: 'Reporte no válido.' })
    }

    const [filas] = await pool.query(
      `SELECT
         id,
         nombre,
         contenido_json,
         fecha_generacion
       FROM reportes_generados
       WHERE id = ?
       LIMIT 1`,
      [id]
    )

    if (filas.length === 0) {
      return res.status(404).json({ mensaje: 'El reporte no existe.' })
    }

    const contenido = parsearJson(filas[0].contenido_json)

    if (!contenido) {
      return res.status(500).json({
        mensaje: 'El contenido guardado del reporte no es válido.'
      })
    }

    if (!Array.isArray(contenido.proyectos_detallados)) {
      const idsHistoricos = Array.isArray(contenido.registros)
        ? contenido.registros.map(item => item.id_proyecto)
        : []

      contenido.proyectos_detallados = await consultarDetallesProyectos(idsHistoricos)
    }

    res.json({
      reporte: {
        id,
        ...contenido,
        nombre: contenido.nombre || filas[0].nombre,
        fecha_generacion:
          contenido.fecha_generacion || filas[0].fecha_generacion
      }
    })
  } catch (error) {
    console.error('Error abriendo reporte histórico:', error)
    res.status(500).json({
      mensaje: 'No fue posible abrir el reporte seleccionado.'
    })
  }
})

router.delete('/historial/:id', async (req, res) => {
  try {
    const id = numeroPositivo(req.params.id)
    const confirmacion = String(req.body?.confirmacion || '').trim()

    if (!id) {
      return res.status(400).json({ mensaje: 'Reporte no válido.' })
    }

    if (confirmacion !== 'ELIMINAR') {
      return res.status(400).json({
        mensaje: 'Para eliminar el reporte debes escribir ELIMINAR como confirmación.'
      })
    }

    const [resultado] = await pool.query(
      `DELETE FROM reportes_generados
       WHERE id = ?`,
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'El reporte no existe.' })
    }

    res.json({ mensaje: 'El reporte se eliminó del historial.' })
  } catch (error) {
    console.error('Error eliminando reporte:', error)
    res.status(500).json({
      mensaje: 'No fue posible eliminar el reporte.'
    })
  }
})

module.exports = router
