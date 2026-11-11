const ANCHO_PAGINA = 841.89
const ALTO_PAGINA = 595.28
const MARGEN = 32
const ANCHO_UTIL = ANCHO_PAGINA - MARGEN * 2

const reemplazosWinAnsi = {
  '€': 128,
  '‘': 145,
  '’': 146,
  '“': 147,
  '”': 148,
  '•': 149,
  '–': 150,
  '—': 151,
  '…': 133
}

const normalizarFecha = valor => String(valor || '').replace(' ', 'T')

const fechaLegible = valor => {
  if (!valor) return 'Sin fecha'
  const fecha = new Date(normalizarFecha(valor))
  if (Number.isNaN(fecha.getTime())) return String(valor)
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(fecha)
}

const fechaCorta = valor => {
  if (!valor) return '-'
  const fecha = new Date(normalizarFecha(valor))
  if (Number.isNaN(fecha.getTime())) return String(valor).slice(0, 10)
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(fecha)
}

const formatoTamano = valor => {
  const bytes = Number(valor)
  if (!Number.isFinite(bytes) || bytes < 0) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

const filtrosDescripcion = valores => {
  const partes = []
  if (valores?.busqueda) partes.push(`proyecto: ${valores.busqueda}`)
  if (valores?.estado) partes.push(`estado: ${valores.estado}`)
  if (valores?.convocatoria) partes.push(`convocatoria: ${valores.convocatoria}`)
  if (valores?.responsable) partes.push(`responsable: ${valores.responsable}`)
  if (valores?.colaborador) partes.push(`colaborador: ${valores.colaborador}`)
  if (Array.isArray(valores?.proyectosSeleccionados)) {
    partes.push(`${valores.proyectosSeleccionados.length} proyecto(s) seleccionado(s)`)
  }
  if (valores?.idResponsable) partes.push('responsable específico')
  if (valores?.desde) partes.push(`desde ${valores.desde}`)
  if (valores?.hasta) partes.push(`hasta ${valores.hasta}`)
  return partes.length ? partes.join(' · ') : 'Sin filtros de búsqueda'
}

const aWinAnsi = valor => {
  const limpio = String(valor ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  let salida = ''
  for (const caracter of limpio) {
    const codigo = caracter.codePointAt(0)
    if (codigo >= 32 && codigo <= 255) {
      salida += String.fromCharCode(codigo)
    } else if (reemplazosWinAnsi[caracter]) {
      salida += String.fromCharCode(reemplazosWinAnsi[caracter])
    } else {
      salida += '?'
    }
  }
  return salida
}

const escaparTextoPdf = valor =>
  aWinAnsi(valor)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')

const numeroPdf = valor => Number(Number(valor).toFixed(2)).toString()

const dividirTexto = (valor, ancho, tamano = 8, maxLineas = Infinity) => {
  const entrada = String(valor ?? '').replace(/\s+/g, ' ').trim() || '-'
  const maxCaracteres = Math.max(5, Math.floor(ancho / (tamano * 0.52)))
  const palabras = entrada.split(' ')
  const lineas = []
  let actual = ''

  const empujarActual = () => {
    if (actual && lineas.length < maxLineas) lineas.push(actual)
    actual = ''
  }

  for (const palabraOriginal of palabras) {
    if (lineas.length >= maxLineas) break
    let palabra = palabraOriginal

    if (palabra.length > maxCaracteres) {
      empujarActual()
      while (palabra.length > maxCaracteres && lineas.length < maxLineas) {
        lineas.push(palabra.slice(0, maxCaracteres))
        palabra = palabra.slice(maxCaracteres)
      }
      actual = palabra
      continue
    }

    const candidato = actual ? `${actual} ${palabra}` : palabra
    if (candidato.length <= maxCaracteres) {
      actual = candidato
    } else {
      empujarActual()
      actual = palabra
    }
  }

  empujarActual()

  if (lineas.length > maxLineas) return lineas.slice(0, maxLineas)
  if (lineas.length === maxLineas && lineas.join(' ').length < entrada.length) {
    const ultimo = maxLineas - 1
    lineas[ultimo] = `${lineas[ultimo].slice(0, Math.max(1, maxCaracteres - 3)).trimEnd()}...`
  }

  return lineas.length ? lineas : ['-']
}

const crearPdfBinario = paginas => {
  const objetos = []
  const totalPaginas = paginas.length
  const primerObjetoPagina = 5
  const referenciasPaginas = []

  objetos[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objetos[3] =
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
  objetos[4] =
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'

  for (let indice = 0; indice < totalPaginas; indice += 1) {
    const paginaObjeto = primerObjetoPagina + indice * 2
    const contenidoObjeto = paginaObjeto + 1
    const contenido = paginas[indice]
    referenciasPaginas.push(`${paginaObjeto} 0 R`)
    objetos[paginaObjeto] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ANCHO_PAGINA} ${ALTO_PAGINA}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contenidoObjeto} 0 R >>`
    objetos[contenidoObjeto] =
      `<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`
  }

  objetos[2] =
    `<< /Type /Pages /Count ${totalPaginas} /Kids [${referenciasPaginas.join(' ')}] >>`

  const cantidadObjetos = objetos.length - 1
  let pdf = '%PDF-1.4\n%' + String.fromCharCode(226, 227, 207, 211) + '\n'
  const offsets = Array.from({ length: cantidadObjetos + 1 }, () => 0)

  for (let numero = 1; numero <= cantidadObjetos; numero += 1) {
    offsets[numero] = pdf.length
    pdf += `${numero} 0 obj\n${objetos[numero]}\nendobj\n`
  }

  const inicioXref = pdf.length
  pdf += `xref\n0 ${cantidadObjetos + 1}\n`
  pdf += '0000000000 65535 f \n'
  for (let numero = 1; numero <= cantidadObjetos; numero += 1) {
    pdf += `${String(offsets[numero]).padStart(10, '0')} 00000 n \n`
  }
  pdf +=
    `trailer\n<< /Size ${cantidadObjetos + 1} /Root 1 0 R >>\n` +
    `startxref\n${inicioXref}\n%%EOF`

  return Uint8Array.from(pdf, caracter => caracter.charCodeAt(0) & 0xff)
}

export const crearPdfReporteProyectos = reporte => {
  const paginas = []
  let contenido = ''
  let y = MARGEN
  const limite = ALTO_PAGINA - 42
  let paginaNumero = 0
  let proyectoActual = ''

  const texto = (valor, x, ySuperior, tamano = 8, negrita = false, color = '0.15 0.19 0.27') => {
    const yPdf = ALTO_PAGINA - ySuperior - tamano
    return (
      `BT /${negrita ? 'F2' : 'F1'} ${numeroPdf(tamano)} Tf ${color} rg ` +
      `${numeroPdf(x)} ${numeroPdf(yPdf)} Td (${escaparTextoPdf(valor)}) Tj ET\n`
    )
  }

  const rectangulo = (x, ySuperior, ancho, alto, relleno = null, borde = '0.83 0.86 0.91') => {
    const yPdf = ALTO_PAGINA - ySuperior - alto
    let comandos = ''
    if (relleno) {
      comandos += `${relleno} rg ${numeroPdf(x)} ${numeroPdf(yPdf)} ${numeroPdf(ancho)} ${numeroPdf(alto)} re f\n`
    }
    if (borde) {
      comandos += `${borde} RG 0.55 w ${numeroPdf(x)} ${numeroPdf(yPdf)} ${numeroPdf(ancho)} ${numeroPdf(alto)} re S\n`
    }
    return comandos
  }

  const linea = (x1, y1, x2, y2, color = '0.84 0.87 0.91') =>
    `${color} RG 0.55 w ${numeroPdf(x1)} ${numeroPdf(ALTO_PAGINA - y1)} m ` +
    `${numeroPdf(x2)} ${numeroPdf(ALTO_PAGINA - y2)} l S\n`

  const cerrarPagina = () => {
    if (!contenido) return
    paginaNumero += 1
    contenido += linea(MARGEN, ALTO_PAGINA - 29, ANCHO_PAGINA - MARGEN, ALTO_PAGINA - 29)
    contenido += texto(
      `Plataforma de Gestión de Proyectos · Reporte #${reporte?.id || 'nuevo'} · Página ${paginaNumero}`,
      MARGEN,
      ALTO_PAGINA - 23,
      7.1,
      false,
      '0.43 0.49 0.59'
    )
    paginas.push(contenido)
    contenido = ''
  }

  const nuevaPagina = (subtitulo = '') => {
    cerrarPagina()
    y = 28
    contenido += texto('Reporte detallado de proyectos', MARGEN, y, 14, true)
    y += 20
    if (subtitulo) {
      contenido += texto(subtitulo, MARGEN, y, 8.2, false, '0.40 0.32 0.55')
      y += 16
    }
    contenido += linea(MARGEN, y, ANCHO_PAGINA - MARGEN, y, '0.55 0.34 0.82')
    y += 13
  }

  const asegurarEspacio = (alto, subtitulo = proyectoActual) => {
    if (y + alto <= limite) return
    nuevaPagina(subtitulo ? `${subtitulo} · continuación` : '')
  }

  const escribirLineas = (valor, opciones = {}) => {
    const {
      x = MARGEN,
      ancho = ANCHO_UTIL,
      tamano = 8.2,
      negrita = false,
      interlineado = 10.5,
      color = '0.15 0.19 0.27',
      sangria = 0
    } = opciones
    const lineas = dividirTexto(valor, ancho - sangria, tamano)
    for (const item of lineas) {
      asegurarEspacio(interlineado + 2)
      contenido += texto(item, x + sangria, y, tamano, negrita, color)
      y += interlineado
    }
    return lineas.length
  }

  const tituloSeccion = (titulo, altoContenidoMinimo = 0) => {
    // Reserva también espacio para el primer bloque de contenido. Así se evita
    // dejar un título de sección huérfano al final de una página.
    asegurarEspacio(33 + altoContenidoMinimo)
    y += 4
    contenido += rectangulo(MARGEN, y, ANCHO_UTIL, 22, '0.95 0.96 0.99', '0.83 0.86 0.91')
    contenido += texto(titulo, MARGEN + 8, y + 7, 9, true, '0.26 0.20 0.38')
    y += 29
  }

  const pares = lista => {
    const anchoCol = (ANCHO_UTIL - 12) / 2
    for (let i = 0; i < lista.length; i += 2) {
      asegurarEspacio(34)
      const parA = lista[i]
      const parB = lista[i + 1]
      const dibujar = (par, x) => {
        if (!par) return
        contenido += rectangulo(x, y, anchoCol, 30, '0.985 0.988 0.995')
        contenido += texto(par[0], x + 6, y + 5, 6.8, true, '0.44 0.39 0.53')
        const lineasValor = dividirTexto(par[1] ?? '-', anchoCol - 12, 7.6, 2)
        lineasValor.forEach((lineaValor, indice) => {
          contenido += texto(lineaValor, x + 6, y + 15 + indice * 8.4, 7.6)
        })
      }
      dibujar(parA, MARGEN)
      dibujar(parB, MARGEN + anchoCol + 12)
      y += 36
    }
  }

  const dibujarTabla = (titulo, filas, columnas, vacio = 'Sin registros.') => {
    const altoCabecera = 22

    const prepararFila = fila => {
      const celdas = columnas.map(col => ({
        ...col,
        lineas: dividirTexto(
          typeof col.valor === 'function' ? col.valor(fila) : fila[col.clave],
          col.ancho - 8,
          6.8,
          col.maxLineas || 3
        )
      }))
      const maxLineas = Math.max(1, ...celdas.map(celda => celda.lineas.length))
      return { celdas, alto: Math.max(22, 8 + maxLineas * 8.4) }
    }

    if (!filas.length) {
      tituloSeccion(`${titulo} (0)`, 16)
      escribirLineas(vacio, { color: '0.45 0.50 0.59' })
      y += 5
      return
    }

    const filasPreparadas = filas.map(prepararFila)
    // El título, la cabecera y la primera fila deben permanecer juntos.
    tituloSeccion(`${titulo} (${filas.length})`, altoCabecera + filasPreparadas[0].alto)

    const dibujarCabecera = () => {
      contenido += rectangulo(MARGEN, y, ANCHO_UTIL, altoCabecera, '0.94 0.95 0.98')
      let x = MARGEN
      for (const col of columnas) {
        contenido += texto(col.etiqueta, x + 4, y + 7, 6.8, true, '0.32 0.38 0.48')
        x += col.ancho
        contenido += linea(x, y, x, y + altoCabecera)
      }
      y += altoCabecera
    }

    dibujarCabecera()

    for (const filaPreparada of filasPreparadas) {
      const { celdas, alto } = filaPreparada

      if (y + alto > limite) {
        nuevaPagina(proyectoActual ? `${proyectoActual} · ${titulo}` : titulo)
        dibujarCabecera()
      }

      contenido += rectangulo(MARGEN, y, ANCHO_UTIL, alto)
      let x = MARGEN
      for (const celda of celdas) {
        celda.lineas.forEach((lineaCelda, indice) => {
          contenido += texto(lineaCelda, x + 4, y + 6 + indice * 8.4, 6.8)
        })
        x += celda.ancho
        contenido += linea(x, y, x, y + alto)
      }
      y += alto
    }
    y += 5
  }

  // Portada / resumen
  contenido += texto('Reporte detallado de proyectos', MARGEN, y, 21, true)
  y += 31
  contenido += texto(
    `Reporte #${reporte?.id || 'nuevo'} · ${fechaLegible(reporte?.fecha_generacion)}`,
    MARGEN,
    y,
    9.4,
    false,
    '0.38 0.29 0.52'
  )
  y += 17
  contenido += texto(
    `Generado por: ${reporte?.generado_por?.nombre_completo || reporte?.generado_por?.correo || 'Administrador'}`,
    MARGEN,
    y,
    8.5
  )
  y += 15
  contenido += texto(`Total de proyectos: ${reporte?.total_registros ?? 0}`, MARGEN, y, 8.5, true)
  y += 18
  contenido += linea(MARGEN, y, ANCHO_PAGINA - MARGEN, y, '0.55 0.34 0.82')
  y += 15
  escribirLineas(`Filtros: ${filtrosDescripcion(reporte?.filtros || {})}`, {
    tamano: 8.1,
    color: '0.36 0.40 0.49'
  })
  y += 8

  const detalles = Array.isArray(reporte?.proyectos_detallados)
    ? reporte.proyectos_detallados
    : []
  const resumen = detalles.length
    ? detalles
    : (Array.isArray(reporte?.registros) ? reporte.registros : [])

  tituloSeccion('Proyectos incluidos')
  resumen.forEach((proyecto, indice) => {
    asegurarEspacio(20)
    const nombre = proyecto.nombre_proyecto || proyecto.nombre || `Proyecto ${proyecto.id_proyecto || ''}`
    escribirLineas(`${indice + 1}. ${nombre} · ${proyecto.estado || '-'} · ${proyecto.responsable || '-'}`, {
      tamano: 7.8,
      interlineado: 9.5
    })
  })

  if (!detalles.length) {
    y += 8
    escribirLineas(
      'Este reporte histórico no contiene una copia detallada de los proyectos. Se muestran únicamente los datos disponibles en el reporte.',
      { color: '0.52 0.39 0.18' }
    )
  }

  for (const proyecto of detalles) {
    proyectoActual = proyecto.nombre_proyecto || `Proyecto #${proyecto.id_proyecto}`
    const subtituloProyecto = `${proyectoActual} · #${proyecto.id_proyecto}`

    // No se fuerza una hoja nueva por proyecto. Si existe espacio suficiente,
    // el detalle comienza en la misma página y aprovecha el espacio disponible.
    // Solo se salta de página cuando no cabe un bloque inicial legible.
    const altoInicioProyecto = 165
    if (y + altoInicioProyecto > limite) {
      nuevaPagina(subtituloProyecto)
    } else {
      y += 10
      contenido += linea(MARGEN, y, ANCHO_PAGINA - MARGEN, y, '0.78 0.68 0.91')
      y += 14
    }

    contenido += texto(proyectoActual, MARGEN, y, 17, true)
    y += 24
    contenido += texto(
      `${proyecto.estado || '-'} · ${proyecto.convocatoria || '-'} · ${proyecto.periodo || '-'}`,
      MARGEN,
      y,
      8.6,
      false,
      '0.38 0.29 0.52'
    )
    y += 18

    tituloSeccion('Datos generales', 34)
    pares([
      ['Responsable', proyecto.responsable || '-'],
      ['Correo responsable', proyecto.responsable_correo || '-'],
      ['Especialidad', proyecto.responsable_especialidad || '-'],
      ['Modalidad', proyecto.modalidad || '-'],
      ['Prioridad', proyecto.prioridad || '-'],
      ['Avance', `${Number(proyecto.porcentaje_avance || 0)}%`],
      ['Fecha de inicio', fechaCorta(proyecto.fecha_inicio)],
      ['Fin estimado', fechaCorta(proyecto.fecha_fin_estimada)],
      ['Finalización', fechaCorta(proyecto.fecha_finalizacion)],
      ['Sometido', proyecto.sometido_at ? fechaLegible(proyecto.sometido_at) : '-'],
      ['Actualización de estado', proyecto.estado_actualizado_at ? fechaLegible(proyecto.estado_actualizado_at) : '-'],
      ['Última actualización', proyecto.fecha_actualizacion ? fechaLegible(proyecto.fecha_actualizacion) : '-']
    ])

    tituloSeccion('Descripción', 14)
    escribirLineas(proyecto.descripcion || 'Sin descripción registrada.', { tamano: 8, interlineado: 10.2 })
    y += 6

    tituloSeccion('Estado y convocatoria', 24)
    escribirLineas(`Estado: ${proyecto.estado || '-'}${proyecto.estado_descripcion ? ` · ${proyecto.estado_descripcion}` : ''}`, { tamano: 8 })
    escribirLineas(
      `Convocatoria: ${proyecto.convocatoria || '-'} · ${fechaCorta(proyecto.convocatoria_fecha_inicio)} a ${fechaCorta(proyecto.convocatoria_fecha_fin)}`,
      { tamano: 8 }
    )
    y += 5

    dibujarTabla(
      'Colaboradores',
      Array.isArray(proyecto.colaboradores) ? proyecto.colaboradores : [],
      [
        { clave: 'nombre', etiqueta: 'Nombre', ancho: 260, maxLineas: 2 },
        { clave: 'correo', etiqueta: 'Correo', ancho: 300, maxLineas: 2 },
        { clave: 'origen', etiqueta: 'Origen', ancho: ANCHO_UTIL - 560, maxLineas: 1 }
      ],
      'Sin colaboradores registrados.'
    )

    dibujarTabla(
      'Recursos humanos',
      Array.isArray(proyecto.recursos_humanos) ? proyecto.recursos_humanos : [],
      [
        { clave: 'nombre', etiqueta: 'Participante', ancho: 160, maxLineas: 2 },
        { clave: 'tipo', etiqueta: 'Tipo', ancho: 105, maxLineas: 2 },
        { clave: 'actividad', etiqueta: 'Actividad', ancho: 250, maxLineas: 3 },
        { clave: 'periodo', etiqueta: 'Periodo', ancho: 105, maxLineas: 2 },
        { clave: 'correo', etiqueta: 'Correo', ancho: ANCHO_UTIL - 620, maxLineas: 2 }
      ],
      'Sin recursos humanos registrados.'
    )

    dibujarTabla(
      'Productos académicos',
      Array.isArray(proyecto.productos_academicos) ? proyecto.productos_academicos : [],
      [
        { clave: 'tipo', etiqueta: 'Tipo', ancho: 100, maxLineas: 2 },
        { clave: 'nombre', etiqueta: 'Producto', ancho: 245, maxLineas: 3 },
        { clave: 'lugar', etiqueta: 'Lugar', ancho: 155, maxLineas: 2 },
        { clave: 'estado', etiqueta: 'Estado', ancho: 90, maxLineas: 2 },
        { etiqueta: 'Envío', ancho: 92, valor: fila => fechaCorta(fila.fecha_envio), maxLineas: 2 },
        { etiqueta: 'Publicación', ancho: ANCHO_UTIL - 682, valor: fila => fechaCorta(fila.fecha_publicacion), maxLineas: 2 }
      ],
      'Sin productos académicos registrados.'
    )

    dibujarTabla(
      'Entregables comprometidos',
      Array.isArray(proyecto.entregables) ? proyecto.entregables : [],
      [
        { clave: 'categoria', etiqueta: 'Categoría', ancho: 145, maxLineas: 2 },
        { clave: 'tipo', etiqueta: 'Entregable', ancho: 230, maxLineas: 3 },
        { etiqueta: 'Cantidades', ancho: 105, valor: fila => `${fila.cantidad_entregada || 0} / ${fila.cantidad_comprometida || 0}`, maxLineas: 1 },
        { clave: 'observaciones', etiqueta: 'Observaciones', ancho: ANCHO_UTIL - 480, maxLineas: 3 }
      ],
      'Sin entregables comprometidos registrados.'
    )

    dibujarTabla(
      'Historial de estados',
      Array.isArray(proyecto.historial_estados) ? proyecto.historial_estados : [],
      [
        { etiqueta: 'Fecha', ancho: 118, valor: fila => fechaLegible(fila.fecha_cambio), maxLineas: 2 },
        { etiqueta: 'Cambio', ancho: 180, valor: fila => `${fila.estado_anterior || '-'} > ${fila.estado_nuevo || '-'}`, maxLineas: 3 },
        { clave: 'usuario', etiqueta: 'Usuario', ancho: 160, maxLineas: 2 },
        { clave: 'comentario', etiqueta: 'Comentario', ancho: ANCHO_UTIL - 458, maxLineas: 4 }
      ],
      'Sin movimientos de estado registrados.'
    )

    dibujarTabla(
      'Archivos relacionados',
      Array.isArray(proyecto.archivos) ? proyecto.archivos : [],
      [
        { clave: 'nombre_original', etiqueta: 'Archivo', ancho: 190, maxLineas: 3 },
        { clave: 'entregable', etiqueta: 'Entregable', ancho: 145, maxLineas: 2 },
        { etiqueta: 'Tipo', ancho: 95, valor: fila => fila.tipo_mime || fila.extension || '-', maxLineas: 2 },
        { etiqueta: 'Tamaño', ancho: 70, valor: fila => formatoTamano(fila.tamano), maxLineas: 1 },
        { clave: 'subido_por', etiqueta: 'Subido por', ancho: 135, maxLineas: 2 },
        { etiqueta: 'Fecha', ancho: ANCHO_UTIL - 635, valor: fila => fechaLegible(fila.fecha_creacion), maxLineas: 2 }
      ],
      'Sin archivos relacionados registrados.'
    )
  }

  cerrarPagina()
  return crearPdfBinario(paginas.length ? paginas : [''])
}
