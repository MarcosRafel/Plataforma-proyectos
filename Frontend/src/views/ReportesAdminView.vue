<template>
  <div class="pagina pagina-admin" :class="{ 'modo-oscuro': modoOscuro }">
    <main class="contenido">
      <header class="cabecera">
        <div class="cabecera-contenido">
          <button type="button" class="btn-regresar" @click="regresar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Regresar
          </button>

          <p class="subtitulo">Administración</p>
          <h1>Gestión de reportes</h1>
          <p class="descripcion">
            Consulta indicadores de la plataforma, genera reportes filtrados de proyectos
            y conserva un historial de los reportes creados.
          </p>

          <span class="estado-modulo">
            <span></span>
            Módulo activo
          </span>
        </div>

        <div class="ilustracion" aria-hidden="true">
          <span class="orbita orbita-1"></span>
          <span class="orbita orbita-2"></span>
          <div class="documento">
            <span class="documento-icono">
              <svg viewBox="0 0 24 24">
                <path d="M6 3.5h8l4 4V20H6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                <path d="M14 3.5V8h4M9 12h6M9 15h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <div class="lineas"><i></i><i></i><i></i></div>
          </div>
          <div class="grafica"><i></i><i></i><i></i><i></i></div>
        </div>
      </header>

      <p v-if="mensaje" class="mensaje-global" :class="tipoMensaje">
        {{ mensaje }}
      </p>

      <section class="panel resumen-panel">
        <div class="panel-titulo">
          <span class="panel-icono morado">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </span>
          <div>
            <h2>Resumen administrativo</h2>
            <p>Indicadores generales calculados con la información actual de la plataforma.</p>
          </div>
          <button type="button" class="btn-secundario recargar" :disabled="cargando" @click="cargarDatos">
            {{ cargando ? 'Actualizando…' : 'Actualizar' }}
          </button>
        </div>

        <div class="metricas" :class="{ cargando }">
          <article class="metrica">
            <span class="metrica-etiqueta">Proyectos</span>
            <strong>{{ resumen.proyectos }}</strong>
            <small>registrados en total</small>
          </article>
          <article class="metrica">
            <span class="metrica-etiqueta">Usuarios activos</span>
            <strong>{{ resumen.usuarios_activos }}</strong>
            <small>{{ resumen.investigadores_activos }} investigadores</small>
          </article>
          <article class="metrica">
            <span class="metrica-etiqueta">Convocatorias</span>
            <strong>{{ resumen.convocatorias_activas }}</strong>
            <small>activas actualmente</small>
          </article>
          <article class="metrica">
            <span class="metrica-etiqueta">Reportes</span>
            <strong>{{ resumen.reportes_generados }}</strong>
            <small>guardados en historial</small>
          </article>
        </div>

        <div class="distribucion">
          <div class="distribucion-encabezado">
            <div>
              <h3>Proyectos por estado</h3>
              <p>Distribución de los proyectos registrados.</p>
            </div>
            <small v-if="resumen.ultima_actualizacion">
              Última actualización: {{ fechaLegible(resumen.ultima_actualizacion) }}
            </small>
          </div>

          <div v-if="proyectosPorEstado.length" class="barras">
            <div v-for="item in proyectosPorEstado" :key="item.estado" class="barra-fila" :class="claseEstado(item.estado)">
              <span>{{ item.estado }}</span>
              <div class="barra-track">
                <i :style="{ width: porcentajeEstado(item.total) }"></i>
              </div>
              <strong>{{ item.total }}</strong>
            </div>
          </div>
          <p v-else class="vacio">No hay datos de estados disponibles.</p>
        </div>
      </section>

      <section class="panel generador-panel">
        <div class="panel-titulo generador-titulo">
          <span class="panel-icono azul">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3.5h8l4 4V20H6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
              <path d="M14 3.5V8h4M9 12h6M9 15h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div>
            <h2>Nuevo reporte</h2>
            <p>
              Completa los filtros que necesites y presiona Buscar. Después selecciona los proyectos
              que quieras incluir antes de generar el reporte.
            </p>
          </div>
        </div>

        <form class="generador-form" @submit.prevent="buscarProyectos">
          <div class="filtros-unificados">
            <div class="filtros-unificados-cabecera">
              <div>
                <strong>Buscar proyectos</strong>
                <span>Completa solo los datos que necesites. Si dejas todo vacío, se mostrarán todos los proyectos.</span>
              </div>
            </div>

            <div class="filtros-unificados-grid">
              <label class="campo campo-busqueda">
                <span>Proyecto</span>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                    <path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <input v-model.trim="filtros.busqueda" type="search" maxlength="120" placeholder="Ej. Agronomía inteligente" />
                </div>
              </label>

              <label class="campo">
                <span>Estado del proyecto</span>
                <select v-model="filtros.estado">
                  <option value="">Todos los estados</option>
                  <option v-for="estado in catalogos.estados" :key="estado" :value="estado">{{ estado }}</option>
                </select>
              </label>

              <label class="campo campo-busqueda-simple">
                <span>Convocatoria</span>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                    <path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <input v-model.trim="filtros.convocatoria" type="search" maxlength="150" placeholder="Ej. Convocatoria 2026" list="convocatorias-sugeridas" />
                </div>
              </label>

              <label class="campo campo-busqueda-simple">
                <span>Responsable</span>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                    <path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <input v-model.trim="filtros.responsable" type="search" maxlength="150" placeholder="Ej. Juan López" />
                </div>
              </label>

              <label class="campo campo-busqueda-simple">
                <span>Colaborador</span>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                    <path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <input v-model.trim="filtros.colaborador" type="search" maxlength="150" placeholder="Ej. Juan López" />
                </div>
              </label>

              <div class="campo periodo-campo">
                <span>Periodo de actualización</span>
                <div class="periodo-controles">
                  <label>
                    <small>Desde</small>
                    <input v-model="filtros.desde" type="date" />
                  </label>
                  <span class="periodo-separador" aria-hidden="true">—</span>
                  <label>
                    <small>Hasta</small>
                    <input v-model="filtros.hasta" type="date" />
                  </label>
                </div>
              </div>
            </div>

            <div class="acciones-busqueda">
              <button v-if="hayFiltros" type="button" class="btn-limpiar-filtros" :disabled="buscandoProyectos" @click="limpiarFiltros">
                Limpiar filtros
              </button>
              <button type="submit" class="btn-buscar-proyectos" :disabled="buscandoProyectos">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
                {{ buscandoProyectos ? 'Buscando…' : 'Buscar' }}
              </button>
            </div>
          </div>
        </form>

        <datalist id="convocatorias-sugeridas">
          <option v-for="convocatoria in catalogos.convocatorias" :key="convocatoria" :value="convocatoria" />
        </datalist>

        <section class="resultados-busqueda">
          <div class="resultados-busqueda-cabecera">
            <div>
              <span class="resultado-kicker">Resultados de búsqueda</span>
              <h3>Selecciona los proyectos que irán en el reporte</h3>
              <p v-if="busquedaRealizada">
                Encontramos {{ resultadosBusqueda.length }} proyecto(s). Marca únicamente los que quieras incluir.
              </p>
              <p v-else>
                Presiona Buscar para consultar proyectos. Si no escribes ningún filtro se mostrarán todos.
              </p>
            </div>
            <div v-if="busquedaRealizada && resultadosBusqueda.length" class="seleccion-resumen">
              <strong>{{ proyectosSeleccionados.length }}</strong>
              <small>seleccionado(s)</small>
            </div>
          </div>

          <div v-if="buscandoProyectos" class="vacio resultado-vacio">
            Buscando proyectos…
          </div>

          <div v-else-if="busquedaRealizada && resultadosBusqueda.length" class="tabla-contenedor resultados-tabla">
            <table>
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Responsable</th>
                  <th>Convocatoria</th>
                  <th>Estado</th>
                  <th class="columna-ver">Ver</th>
                  <th class="columna-seleccionar">
                    <label class="seleccionar-todos">
                      <input
                        type="checkbox"
                        :checked="todosResultadosSeleccionados"
                        :indeterminate.prop="algunosResultadosSeleccionados"
                        aria-label="Seleccionar todos los proyectos encontrados"
                        @change="cambiarSeleccionTodos"
                      />
                      <span>Seleccionar</span>
                    </label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="fila in resultadosBusqueda"
                  :key="fila.id_proyecto"
                  :class="{ 'fila-seleccionada': proyectoEstaSeleccionado(fila.id_proyecto) }"
                >
                  <td>
                    <strong>{{ fila.nombre_proyecto }}</strong>
                    <small>#{{ fila.id_proyecto }} · {{ fila.periodo }}</small>
                  </td>
                  <td>
                    {{ fila.responsable }}
                    <small>{{ fila.responsable_correo }}</small>
                  </td>
                  <td>{{ fila.convocatoria }}</td>
                  <td><span class="estado-chip" :class="claseEstado(fila.estado)">{{ fila.estado }}</span></td>
                  <td class="columna-ver">
                    <button
                      type="button"
                      class="btn-ver-proyecto"
                      :aria-label="`Vista previa de ${fila.nombre_proyecto}`"
                      @click="verProyecto(fila.id_proyecto)"
                    >Ver</button>
                  </td>
                  <td class="columna-seleccionar">
                    <label class="checkbox-proyecto" :title="`Seleccionar ${fila.nombre_proyecto}`">
                      <input
                        type="checkbox"
                        :checked="proyectoEstaSeleccionado(fila.id_proyecto)"
                        :aria-label="`Seleccionar ${fila.nombre_proyecto} para el reporte`"
                        @change="cambiarSeleccionProyecto(fila.id_proyecto, $event.target.checked)"
                      />
                      <span aria-hidden="true">✓</span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else-if="busquedaRealizada" class="vacio resultado-vacio">
            No se encontraron proyectos con los filtros indicados.
          </div>
          <div v-else class="vacio resultado-vacio">
            Aún no se ha realizado una búsqueda.
          </div>

          <div class="acciones-generador acciones-reporte-seleccionado">
            <div class="ayuda-seleccion">
              <strong v-if="proyectosSeleccionados.length">
                {{ proyectosSeleccionados.length }} proyecto(s) listo(s) para generar el reporte.
              </strong>
              <span v-else>Selecciona al menos un proyecto para habilitar la generación del reporte.</span>
            </div>
            <button
              type="button"
              class="btn-principal btn-generar"
              :disabled="!proyectosSeleccionados.length || generando"
              @click="generarReporte"
            >
              <svg v-if="!generando" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3.5h8l4 4V20H6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                <path d="M14 3.5V8h4M9 12h6M9 15h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ generando ? 'Generando reporte…' : `Generar reporte (${proyectosSeleccionados.length})` }}
            </button>
          </div>
        </section>

        <div v-if="reporteActual" class="resultado">
          <div class="resultado-encabezado">
            <div>
              <span class="resultado-kicker">Reporte #{{ reporteActual.id }}</span>
              <h3>{{ reporteActual.nombre }}</h3>
              <p>{{ reporteActual.total_registros }} proyecto(s) · {{ fechaLegible(reporteActual.fecha_generacion) }}</p>
            </div>
            <div class="resultado-acciones">
              <button type="button" class="btn-descargar secundario" @click="abrirVistaReporte(reporteActual)">
                Vista previa
              </button>
              <button type="button" class="btn-descargar" @click="descargarPdf(reporteActual)">
                Descargar PDF
              </button>
              <button
                type="button"
                class="btn-descargar btn-correo"
                :disabled="enviandoCorreo"
                title="Enviar reporte por correo"
                @click="enviarReportePorCorreo(reporteActual)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <path d="m4.5 7 7.5 6 7.5-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ enviandoCorreo ? 'Enviando…' : 'Enviar por correo' }}
              </button>
            </div>
          </div>

          <div v-if="reporteActual.registros?.length" class="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Responsable</th>
                  <th>Convocatoria</th>
                  <th>Estado</th>
                  <th>Periodo</th>
                  <th>Colab.</th>
                  <th>Recursos</th>
                  <th>Productos</th>
                  <th>Actualización</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fila in reporteActual.registros" :key="fila.id_proyecto">
                  <td>
                    <strong>{{ fila.nombre_proyecto }}</strong>
                    <small>#{{ fila.id_proyecto }}</small>
                  </td>
                  <td>{{ fila.responsable }}</td>
                  <td>{{ fila.convocatoria }}</td>
                  <td><span class="estado-chip" :class="claseEstado(fila.estado)">{{ fila.estado }}</span></td>
                  <td>{{ fila.periodo }}</td>
                  <td class="numero">{{ fila.colaboradores }}</td>
                  <td class="numero">{{ fila.recursos_humanos }}</td>
                  <td class="numero">{{ fila.productos_academicos }}</td>
                  <td>{{ fechaCorta(fila.fecha_actualizacion) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="vacio resultado-vacio">
            El reporte se generó correctamente, pero ningún proyecto coincide con los filtros seleccionados.
          </div>
        </div>
      </section>

      <section class="panel historial-panel">
        <div class="panel-titulo">
          <span class="panel-icono verde">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16v12H4ZM8 4.5v5M16 4.5v5M4 10h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <div>
            <h2>Historial de reportes</h2>
            <p>Se conservan los últimos reportes generados para consultarlos o descargar nuevamente su PDF.</p>
          </div>
        </div>

        <div v-if="historial.length" class="historial-lista">
          <article v-for="item in historial" :key="item.id" class="historial-item">
            <div class="historial-principal">
              <span class="historial-id">#{{ item.id }}</span>
              <div>
                <h3>{{ item.nombre }}</h3>
                <p>{{ filtrosDescripcion(item.filtros) }}</p>
                <small>
                  {{ item.total_registros }} registro(s) · {{ fechaLegible(item.fecha_generacion) }} ·
                  {{ item.generado_por?.nombre_completo || 'Administrador' }}
                </small>
              </div>
            </div>
            <div class="historial-acciones">
              <button type="button" class="btn-mini" @click="abrirReporte(item.id)">Abrir</button>
              <button type="button" class="btn-mini" @click="descargarHistorial(item.id)">PDF</button>
              <button
                type="button"
                class="btn-mini btn-correo"
                :disabled="idReporteEnviando === item.id"
                title="Enviar reporte por correo"
                @click="enviarReportePorCorreoPorId(item.id)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <path d="m4.5 7 7.5 6 7.5-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ idReporteEnviando === item.id ? 'Enviando…' : 'Correo' }}
              </button>
              <button type="button" class="btn-mini peligro" @click="solicitarEliminarReporte(item)">Eliminar</button>
            </div>
          </article>
        </div>
        <p v-else class="vacio">Todavía no se han generado reportes.</p>
      </section>
    </main>

    <div
      v-if="modalVistaReporteAbierto"
      class="modal-fondo modal-reporte-fondo"
    >
      <section
        class="modal-vista-reporte"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-vista-reporte"
      >
        <header class="modal-reporte-cabecera">
          <div>
            <span class="resultado-kicker">{{ vistaProyectoIndividual ? 'Vista previa del proyecto' : `Vista previa del reporte #${reporteVista?.id}` }}</span>
            <h2 id="titulo-vista-reporte">{{ reporteVista?.nombre }}</h2>
            <p v-if="vistaProyectoIndividual">Consulta de solo lectura · No se ha generado ningún reporte.</p>
            <p v-else>
              {{ reporteVista?.total_registros || 0 }} proyecto(s) ·
              {{ fechaLegible(reporteVista?.fecha_generacion) }}
            </p>
          </div>
          <div class="modal-reporte-acciones">
            <button v-if="!vistaProyectoIndividual" type="button" class="btn-descargar" @click="descargarPdf(reporteVista)">Descargar PDF</button>
            <button type="button" class="btn-cerrar-vista" aria-label="Cerrar vista previa" @click="cerrarVistaReporte">×</button>
          </div>
        </header>

        <div class="modal-reporte-contenido">
          <section v-if="!vistaProyectoIndividual" class="resumen-reporte-detallado">
            <div>
              <span>Generado por</span>
              <strong>{{ reporteVista?.generado_por?.nombre_completo || reporteVista?.generado_por?.correo || 'Administrador' }}</strong>
            </div>
            <div>
              <span>Filtros</span>
              <strong>{{ filtrosDescripcion(reporteVista?.filtros || {}) }}</strong>
            </div>
          </section>

          <p v-if="!proyectosVistaReporte.length" class="vacio">
            Este reporte no contiene información detallada disponible.
          </p>

          <article
            v-for="proyecto in proyectosVistaReporte"
            :key="proyecto.id_proyecto"
            class="proyecto-reporte-detallado"
          >
            <div class="proyecto-reporte-cabecera">
              <div>
                <span class="historial-id">#{{ proyecto.id_proyecto }}</span>
                <h3>{{ proyecto.nombre_proyecto }}</h3>
                <p>{{ proyecto.convocatoria }} · {{ proyecto.periodo }}</p>
              </div>
              <div class="proyecto-reporte-cabecera-acciones">
                <span class="estado-chip" :class="claseEstado(proyecto.estado)">{{ proyecto.estado }}</span>
                <button v-if="!vistaProyectoIndividual" type="button" class="btn-mini" @click="verProyecto(proyecto.id_proyecto)">Vista individual</button>
              </div>
            </div>

            <section class="detalle-seccion">
              <h4>Datos generales</h4>
              <div class="detalle-grid">
                <div><span>Responsable</span><strong>{{ proyecto.responsable || '—' }}</strong></div>
                <div><span>Convocatoria</span><strong>{{ proyecto.convocatoria || '—' }}</strong></div>
                <div><span>Periodo</span><strong>{{ proyecto.periodo || '—' }}</strong></div>
                <div><span>Estado actual</span><strong>{{ proyecto.estado || '—' }}</strong></div>
              </div>
            </section>

            <section class="detalle-seccion">
              <h4>Colaboradores ({{ proyecto.colaboradores?.length || 0 }})</h4>
              <div v-if="proyecto.colaboradores?.length" class="tabla-contenedor tabla-detalle-reporte">
                <table>
                  <thead><tr><th>Nombre</th></tr></thead>
                  <tbody>
                    <tr v-for="item in proyecto.colaboradores" :key="item.id">
                      <td>{{ item.nombre }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-else class="detalle-vacio">Sin colaboradores registrados.</p>
            </section>

            <section class="detalle-seccion">
              <h4>Recursos humanos ({{ proyecto.recursos_humanos?.length || 0 }})</h4>
              <div v-if="proyecto.recursos_humanos?.length" class="tabla-contenedor tabla-detalle-reporte">
                <table>
                  <thead><tr><th>Tipo</th><th>Nombre</th><th>Nombre de la actividad</th><th>Periodo</th></tr></thead>
                  <tbody>
                    <tr v-for="item in proyecto.recursos_humanos" :key="item.id">
                      <td>{{ item.tipo }}</td><td>{{ item.nombre }}</td><td>{{ item.actividad }}</td><td>{{ item.periodo }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-else class="detalle-vacio">Sin recursos humanos registrados.</p>
            </section>

            <section class="detalle-seccion">
              <h4>Productos académicos ({{ proyecto.productos_academicos?.length || 0 }})</h4>
              <div v-if="proyecto.productos_academicos?.length" class="tabla-contenedor tabla-detalle-reporte">
                <table>
                  <thead><tr><th>Tipo</th><th>Nombre del producto</th><th>Dónde</th><th>Fecha de envío</th><th>Fecha de publicación</th><th>Estado</th></tr></thead>
                  <tbody>
                    <tr v-for="item in proyecto.productos_academicos" :key="item.id">
                      <td>{{ item.tipo }}</td><td>{{ item.nombre }}</td><td>{{ item.lugar || '—' }}</td><td>{{ fechaSolo(item.fecha_envio) }}</td><td>{{ fechaSolo(item.fecha_publicacion) }}</td><td>{{ item.estado }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-else class="detalle-vacio">Sin productos académicos registrados.</p>
            </section>

          </article>
        </div>
      </section>
    </div>

    <div
      v-if="modalEliminarAbierto"
      class="modal-fondo"
    >
      <section
        class="modal-eliminar-reporte"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="titulo-eliminar-reporte"
      >
        <span class="modal-eliminar-icono" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 3.5 21 20H3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
            <path d="M12 9v5M12 17.2v.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
          </svg>
        </span>

        <h2 id="titulo-eliminar-reporte">Eliminar reporte del historial</h2>
        <p class="modal-eliminar-descripcion">
          Esta acción eliminará permanentemente el reporte seleccionado del historial.
          Los proyectos y sus datos no se eliminarán.
        </p>

        <div v-if="reporteAEliminar" class="reporte-a-eliminar">
          <span>Reporte #{{ reporteAEliminar.id }}</span>
          <strong>{{ reporteAEliminar.nombre }}</strong>
          <small>{{ reporteAEliminar.total_registros }} registro(s)</small>
        </div>

        <label class="label-confirmacion-reporte" for="confirmacion-eliminar-reporte">
          Para continuar, escribe <strong>ELIMINAR</strong>
        </label>
        <input
          id="confirmacion-eliminar-reporte"
          ref="inputConfirmacionEliminar"
          v-model="textoConfirmacionEliminar"
          type="text"
          autocomplete="off"
          spellcheck="false"
          placeholder="Escribe ELIMINAR"
          @keyup.enter="confirmarEliminarReporte"
        />

        <div class="modal-acciones-reporte">
          <button
            type="button"
            class="btn-modal-cancelar"
            :disabled="eliminando"
            @click="cerrarModalEliminar"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn-modal-eliminar"
            :disabled="!puedeEliminarReporte || eliminando"
            @click="confirmarEliminarReporte"
          >
            {{ eliminando ? 'Eliminando…' : 'Eliminar definitivamente' }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>


<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../utils/api'
import { crearPdfReporteProyectos } from '../utils/reportPdf'
import { useTema } from '../utils/useTema'

const router = useRouter()
const { modoOscuro } = useTema()

const cargando = ref(false)
const generando = ref(false)
const enviandoCorreo = ref(false)
const idReporteEnviando = ref(null)
const buscandoProyectos = ref(false)
const mensaje = ref('')
const tipoMensaje = ref('')
const reporteActual = ref(null)
const reporteVista = ref(null)
const modalVistaReporteAbierto = ref(false)
const vistaProyectoIndividual = ref(false)
const historial = ref([])
const proyectosPorEstado = ref([])
const resultadosBusqueda = ref([])
const busquedaRealizada = ref(false)
const proyectosSeleccionados = ref([])
const modalEliminarAbierto = ref(false)
const reporteAEliminar = ref(null)
const textoConfirmacionEliminar = ref('')
const eliminando = ref(false)
const inputConfirmacionEliminar = ref(null)

const resumen = reactive({
  proyectos: 0,
  usuarios_activos: 0,
  investigadores_activos: 0,
  convocatorias_activas: 0,
  reportes_generados: 0,
  ultima_actualizacion: null
})

const catalogos = reactive({
  estados: [],
  convocatorias: []
})

const filtros = reactive({
  busqueda: '',
  estado: '',
  convocatoria: '',
  responsable: '',
  colaborador: '',
  desde: '',
  hasta: ''
})

const filtrosActivos = computed(() =>
  Object.values(filtros).filter(valor => String(valor || '').trim()).length
)

const hayFiltros = computed(() => filtrosActivos.value > 0)
const puedeEliminarReporte = computed(() =>
  textoConfirmacionEliminar.value.trim() === 'ELIMINAR'
)

const proyectosVistaReporte = computed(() =>
  Array.isArray(reporteVista.value?.proyectos_detallados)
    ? reporteVista.value.proyectos_detallados
    : []
)

const todosResultadosSeleccionados = computed(() => {
  if (!resultadosBusqueda.value.length) return false
  return resultadosBusqueda.value.every(fila =>
    proyectosSeleccionados.value.includes(Number(fila.id_proyecto))
  )
})

const algunosResultadosSeleccionados = computed(() =>
  proyectosSeleccionados.value.length > 0 && !todosResultadosSeleccionados.value
)

const maximoEstado = computed(() =>
  Math.max(1, ...proyectosPorEstado.value.map(item => Number(item.total || 0)))
)

const solicitarJson = async (ruta, opciones = {}) => {
  const respuesta = await apiFetch(ruta, opciones)
  const datos = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'No fue posible completar la operación.')
  }

  return datos
}

const cargarResumen = async () => {
  const datos = await solicitarJson('/reportes/resumen')
  Object.assign(resumen, datos.resumen || {})
  proyectosPorEstado.value = datos.proyectos_por_estado || []
  catalogos.estados = datos.catalogos?.estados || []
  catalogos.convocatorias = datos.catalogos?.convocatorias || []
}

const cargarHistorial = async () => {
  const datos = await solicitarJson('/reportes/historial')
  historial.value = datos.reportes || []
}

const cargarDatos = async () => {
  cargando.value = true
  mensaje.value = ''

  try {
    await Promise.all([cargarResumen(), cargarHistorial()])
  } catch (error) {
    mensaje.value = error.message || 'No fue posible cargar el módulo de reportes.'
    tipoMensaje.value = 'error'
  } finally {
    cargando.value = false
  }
}

const limpiarResultados = () => {
  resultadosBusqueda.value = []
  proyectosSeleccionados.value = []
  busquedaRealizada.value = false
}

const limpiarFiltros = () => {
  Object.assign(filtros, {
    busqueda: '',
    estado: '',
    convocatoria: '',
    responsable: '',
    colaborador: '',
    desde: '',
    hasta: ''
  })
  limpiarResultados()
  mensaje.value = ''
  tipoMensaje.value = ''
}

const buscarProyectos = async () => {
  mensaje.value = ''

  if (filtros.desde && filtros.hasta && filtros.desde > filtros.hasta) {
    mensaje.value = 'La fecha inicial no puede ser posterior a la fecha final.'
    tipoMensaje.value = 'error'
    limpiarResultados()
    return
  }

  buscandoProyectos.value = true
  proyectosSeleccionados.value = []

  try {
    const datos = await solicitarJson('/reportes/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filtros })
    })

    resultadosBusqueda.value = datos.registros || []
    busquedaRealizada.value = true
    tipoMensaje.value = ''
  } catch (error) {
    resultadosBusqueda.value = []
    busquedaRealizada.value = true
    mensaje.value = error.message || 'No fue posible consultar los proyectos.'
    tipoMensaje.value = 'error'
  } finally {
    buscandoProyectos.value = false
  }
}

const proyectoEstaSeleccionado = id =>
  proyectosSeleccionados.value.includes(Number(id))

const cambiarSeleccionProyecto = (id, seleccionado) => {
  const idNumerico = Number(id)
  if (!Number.isInteger(idNumerico) || idNumerico <= 0) return

  if (seleccionado) {
    if (!proyectosSeleccionados.value.includes(idNumerico)) {
      proyectosSeleccionados.value = [...proyectosSeleccionados.value, idNumerico]
    }
  } else {
    proyectosSeleccionados.value = proyectosSeleccionados.value.filter(item => item !== idNumerico)
  }
}

const cambiarSeleccionTodos = evento => {
  if (evento.target.checked) {
    proyectosSeleccionados.value = resultadosBusqueda.value.map(fila => Number(fila.id_proyecto))
  } else {
    proyectosSeleccionados.value = []
  }
}

const verProyecto = id => {
  const ruta = router.resolve({
    name: 'proyecto-detalle-admin',
    params: { id }
  }).href
  window.open(ruta, '_blank', 'noopener,noreferrer')
}

const generarReporte = async () => {
  mensaje.value = ''

  if (!proyectosSeleccionados.value.length) {
    mensaje.value = 'Selecciona al menos un proyecto antes de generar el reporte.'
    tipoMensaje.value = 'error'
    return
  }

  if (filtros.desde && filtros.hasta && filtros.desde > filtros.hasta) {
    mensaje.value = 'La fecha inicial no puede ser posterior a la fecha final.'
    tipoMensaje.value = 'error'
    return
  }

  generando.value = true

  try {
    const datos = await solicitarJson('/reportes/generar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filtros,
        proyectosSeleccionados: proyectosSeleccionados.value
      })
    })

    reporteActual.value = datos.reporte
    mensaje.value = `Reporte generado correctamente con ${datos.reporte.total_registros} proyecto(s).`
    tipoMensaje.value = 'exito'
    await Promise.all([cargarResumen(), cargarHistorial()])
    await nextTick()
    document.querySelector('.resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (error) {
    mensaje.value = error.message || 'No fue posible generar el reporte.'
    tipoMensaje.value = 'error'
  } finally {
    generando.value = false
  }
}

const obtenerReporte = async id => {
  const datos = await solicitarJson(`/reportes/historial/${id}`)
  return datos.reporte
}

const abrirVistaReporte = reporte => {
  if (!reporte) return
  reporteVista.value = reporte
  modalVistaReporteAbierto.value = true
}

const cerrarVistaReporte = () => {
  modalVistaReporteAbierto.value = false
  reporteVista.value = null
}

const abrirReporte = async id => {
  mensaje.value = ''

  try {
    const reporte = await obtenerReporte(id)
    reporteActual.value = reporte
    abrirVistaReporte(reporte)
  } catch (error) {
    mensaje.value = error.message || 'No fue posible abrir el reporte.'
    tipoMensaje.value = 'error'
  }
}

const descargarHistorial = async id => {
  mensaje.value = ''

  try {
    const reporte = await obtenerReporte(id)
    descargarPdf(reporte)
  } catch (error) {
    mensaje.value = error.message || 'No fue posible descargar el reporte.'
    tipoMensaje.value = 'error'
  }
}

const solicitarEliminarReporte = async item => {
  reporteAEliminar.value = item
  textoConfirmacionEliminar.value = ''
  modalEliminarAbierto.value = true
  await nextTick()
  inputConfirmacionEliminar.value?.focus()
}

const cerrarModalEliminar = () => {
  if (eliminando.value) return
  modalEliminarAbierto.value = false
  reporteAEliminar.value = null
  textoConfirmacionEliminar.value = ''
}

const confirmarEliminarReporte = async () => {
  if (!puedeEliminarReporte.value || !reporteAEliminar.value || eliminando.value) {
    return
  }

  mensaje.value = ''
  eliminando.value = true
  const id = reporteAEliminar.value.id

  try {
    const datos = await solicitarJson(`/reportes/historial/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmacion: textoConfirmacionEliminar.value.trim() })
    })

    if (Number(reporteActual.value?.id) === Number(id)) {
      reporteActual.value = null
    }

    modalEliminarAbierto.value = false
    reporteAEliminar.value = null
    textoConfirmacionEliminar.value = ''
    mensaje.value = datos.mensaje
    tipoMensaje.value = 'exito'
    await Promise.all([cargarResumen(), cargarHistorial()])
  } catch (error) {
    mensaje.value = error.message || 'No fue posible eliminar el reporte.'
    tipoMensaje.value = 'error'
  } finally {
    eliminando.value = false
  }
}

const descargarPdf = reporte => {
  const bytes = crearPdfReporteProyectos(reporte)
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  const fecha = String(reporte?.fecha_generacion || new Date().toISOString()).slice(0, 10)
  enlace.href = url
  enlace.download = `reporte-proyectos-${fecha}-${reporte?.id || 'nuevo'}.pdf`
  document.body.appendChild(enlace)
  enlace.click()
  enlace.remove()
  URL.revokeObjectURL(url)
}

const convertirBytesABase64 = bytes => {
  let texto = ''
  const tamanoBloque = 0x8000

  for (let indice = 0; indice < bytes.length; indice += tamanoBloque) {
    texto += String.fromCharCode(...bytes.subarray(indice, indice + tamanoBloque))
  }

  return btoa(texto)
}

const enviarReportePorCorreo = async reporte => {
  if (!reporte?.id || enviandoCorreo.value) return

  mensaje.value = ''
  enviandoCorreo.value = true
  idReporteEnviando.value = Number(reporte.id)

  try {
    const bytes = crearPdfReporteProyectos(reporte)
    const datos = await solicitarJson(`/reportes/historial/${reporte.id}/enviar-correo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdfBase64: convertirBytesABase64(bytes) })
    })

    mensaje.value = datos.mensaje
    tipoMensaje.value = 'exito'
  } catch (error) {
    mensaje.value = error.message || 'No fue posible enviar el reporte por correo.'
    tipoMensaje.value = 'error'
  } finally {
    enviandoCorreo.value = false
    idReporteEnviando.value = null
  }
}

const enviarReportePorCorreoPorId = async id => {
  if (enviandoCorreo.value) return

  try {
    const reporte = await obtenerReporte(id)
    await enviarReportePorCorreo(reporte)
  } catch (error) {
    mensaje.value = error.message || 'No fue posible cargar el reporte para enviarlo por correo.'
    tipoMensaje.value = 'error'
  }
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
  if (!valor) return '—'
  const fecha = new Date(normalizarFecha(valor))
  if (Number.isNaN(fecha.getTime())) return String(valor).slice(0, 10)
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(fecha)
}

const fechaSolo = valor => {
  if (!valor) return '—'
  const fecha = new Date(normalizarFecha(valor))
  if (Number.isNaN(fecha.getTime())) return String(valor).slice(0, 10)
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(fecha)
}

const fechaLegibleOpcional = valor => valor ? fechaLegible(valor) : '—'

const claseEstado = estado => {
  const normalizado = String(estado || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const clasesPermitidas = new Set([
    'en-captura',
    'sometido',
    'con-registro',
    'financiado',
    'rechazado',
    'informe-pendiente',
    'informe-en-deuda',
    'liberado'
  ])

  if (normalizado === 'en-captura') return 'estado-captura'
  if (normalizado === 'con-registro') return 'estado-registro'
  if (normalizado === 'informe-en-deuda') return 'estado-informe-deuda'
  return clasesPermitidas.has(normalizado)
    ? `estado-${normalizado}`
    : 'estado-default'
}

const formatoTamano = valor => {
  const bytes = Number(valor)
  if (!Number.isFinite(bytes) || bytes < 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

const porcentajeEstado = total => `${Math.round((Number(total || 0) / maximoEstado.value) * 100)}%`

const filtrosDescripcion = valores => {
  const partes = []
  if (valores?.busqueda) partes.push(`búsqueda: ${valores.busqueda}`)
  if (valores?.estado) partes.push(`estado: ${valores.estado}`)
  if (valores?.convocatoria) partes.push(`convocatoria: ${valores.convocatoria}`)
  if (valores?.responsable) partes.push(`responsable: ${valores.responsable}`)
  if (valores?.colaborador) partes.push(`colaborador: ${valores.colaborador}`)
  if (Array.isArray(valores?.proyectosSeleccionados)) partes.push(`${valores.proyectosSeleccionados.length} proyecto(s) seleccionado(s)`)
  if (valores?.idResponsable) partes.push('responsable específico')
  if (valores?.desde) partes.push(`desde ${valores.desde}`)
  if (valores?.hasta) partes.push(`hasta ${valores.hasta}`)
  return partes.length ? partes.join(' · ') : 'Todos los proyectos'
}

const regresar = () => router.push({ name: 'administracion' })

watch(filtros, () => {
  if (busquedaRealizada.value || proyectosSeleccionados.value.length) {
    limpiarResultados()
  }
}, { deep: true })

onMounted(cargarDatos)
</script>


<style scoped>
* { box-sizing: border-box; }
button, input, select { font: inherit; }

.pagina {
  min-height: 100vh;
  padding: 24px 26px 44px;
  background:
    radial-gradient(circle at 7% 3%, rgba(219, 234, 254, .75), transparent 25%),
    radial-gradient(circle at 94% 2%, rgba(232, 223, 255, .45), transparent 24%),
    #f7faff;
  color: #0b1f50;
}

.contenido { width: 100%; max-width: 1650px; margin: 0 auto; }

.cabecera {
  position: relative;
  min-height: 236px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 20px;
  padding: 18px 20px;
  background: rgba(255,255,255,.95);
  border: 1px solid #dce7f5;
  border-radius: 14px;
  box-shadow: 0 7px 23px rgba(48,84,137,.055);
  overflow: hidden;
}

.cabecera::before {
  content: '';
  position: absolute;
  width: 420px;
  height: 220px;
  top: -100px;
  right: 110px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(214,198,249,.55), rgba(214,198,249,.10) 62%, transparent 70%);
}

.cabecera-contenido { position: relative; z-index: 2; }

.btn-regresar {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;
  margin-bottom: 12px;
  color: #7138d2;
  background: linear-gradient(135deg, #fff, #f3eeff);
  border: 1px solid #cbb8ef;
  border-radius: 9px;
  box-shadow: 0 4px 12px rgba(96,56,161,.10);
  font-weight: 700;
  cursor: pointer;
}
.btn-regresar svg { width: 18px; height: 18px; }
.btn-regresar:hover { color: #fff; background: linear-gradient(135deg,#925ff4,#7138d2); }
.subtitulo { margin: 0 0 5px; color: #816aa7; font-size: 14px; }
.cabecera h1 { margin: 0; color: #31204e; font-size: clamp(31px,3vw,44px); line-height: 1; }
.descripcion { max-width: 800px; margin: 10px 0 15px; color: #715f8e; font-size: 15px; line-height: 1.55; }
.estado-modulo { display: inline-flex; align-items: center; gap: 7px; min-height: 29px; padding: 0 11px; color: #23684c; background: #e9f8f1; border: 1px solid #bde8d4; border-radius: 999px; font-size: 11px; font-weight: 800; }
.estado-modulo > span { width: 7px; height: 7px; background: #2aaa75; border-radius: 50%; }

.ilustracion { position: relative; }
.documento { position: absolute; z-index: 2; top: 50%; left: 48%; width: 210px; height: 116px; transform: translate(-50%,-47%) rotate(-4deg); background: linear-gradient(145deg,#fff,#f2edff); border: 1px solid #d7c6f4; border-radius: 18px; box-shadow: 0 16px 30px rgba(91,55,143,.13); }
.documento-icono { position: absolute; top: 27px; left: 24px; width: 51px; height: 51px; display: flex; align-items: center; justify-content: center; color: #7138d2; background: linear-gradient(145deg,#ede4ff,#ddcdff); border: 1px solid #ccb6f3; border-radius: 13px; }
.documento-icono svg { width: 28px; height: 28px; }
.lineas { position: absolute; top: 31px; right: 22px; width: 92px; }
.lineas i { display: block; height: 8px; margin-bottom: 9px; background: #e0d4f5; border-radius: 999px; }
.lineas i:nth-child(2) { width: 76%; } .lineas i:nth-child(3) { width: 54%; }
.grafica { position: absolute; z-index: 3; right: 35px; bottom: 22px; width: 72px; height: 55px; display: flex; align-items: flex-end; justify-content: center; gap: 5px; padding: 10px; background: #fff; border: 1px solid #d8caf0; border-radius: 12px; box-shadow: 0 10px 23px rgba(91,55,143,.13); }
.grafica i { width: 7px; border-radius: 4px 4px 2px 2px; background: #8550e0; }
.grafica i:nth-child(1){height:16px}.grafica i:nth-child(2){height:26px}.grafica i:nth-child(3){height:35px}.grafica i:nth-child(4){height:23px}
.orbita { position: absolute; border: 1px solid #ddcff5; border-radius: 50%; }
.orbita-1 { width: 94px; height: 94px; top: 22px; right: 18px; }
.orbita-2 { width: 66px; height: 66px; top: 36px; right: 32px; border-style: dashed; }

.mensaje-global { margin: 18px 0 0; padding: 12px 15px; border-radius: 10px; font-weight: 650; }
.mensaje-global.exito { color: #176b3a; background: #edf9f1; border: 1px solid #c8ead4; }
.mensaje-global.error { color: #a62f35; background: #fff1f1; border: 1px solid #f1cccc; }

.panel { margin-top: 20px; padding: 21px; background: rgba(255,255,255,.96); border: 1px solid #ded3f3; border-radius: 14px; box-shadow: 0 6px 20px rgba(46,70,113,.045); }
.panel-titulo { display: flex; align-items: center; gap: 13px; padding-bottom: 16px; border-bottom: 1px solid #eadff6; }
.panel-titulo > div { min-width: 0; flex: 1; }
.panel-titulo h2 { margin: 0 0 4px; color: #31204e; font-size: 23px; }
.panel-titulo p { margin: 0; color: #75608f; line-height: 1.45; }
.panel-icono { flex: 0 0 auto; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 12px; }
.panel-icono svg { width: 27px; height: 27px; }
.panel-icono.morado { color: #7138d2; background: #eee5ff; border: 1px solid #d4c1f8; }
.panel-icono.azul { color: #286fc5; background: #e9f3ff; border: 1px solid #c3ddfb; }
.panel-icono.verde { color: #228564; background: #e7f7f1; border: 1px solid #c2e8db; }

.metricas { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; margin-top: 18px; }
.metricas.cargando { opacity: .65; }
.metrica { padding: 18px; border: 1px solid #e5eaf4; border-radius: 13px; background: linear-gradient(145deg,#fff,#fbfcff); }
.metrica-etiqueta { display: block; color: #657894; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
.metrica strong { display: block; margin: 8px 0 3px; color: #31204e; font-size: 34px; line-height: 1; }
.metrica small { color: #71829b; }

.distribucion { margin-top: 18px; padding: 18px; border: 1px solid #e5eaf4; border-radius: 13px; }
.distribucion-encabezado { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; }
.distribucion h3 { margin: 0; color: #31204e; font-size: 17px; }
.distribucion p { margin: 4px 0 0; color: #71829b; }
.distribucion small { color: #7b88a0; }
.barras { display: grid; gap: 11px; margin-top: 17px; }
.barra-fila { display: grid; grid-template-columns: minmax(130px,210px) 1fr 38px; gap: 12px; align-items: center; color: #526882; font-size: 13px; }
.barra-fila strong { color: #31204e; text-align: right; }
.barra-track { height: 9px; background: #eef1f8; border-radius: 999px; overflow: hidden; }
.barra-track i { display: block; min-width: 3px; height: 100%; border-radius: inherit; background: var(--estado-solido, #8d5be4); transition: width .2s ease; }
.barra-fila > span { color: var(--estado-texto, #526882); font-weight: 650; }

.btn-secundario, .btn-principal, .btn-descargar, .btn-mini { border: 0; border-radius: 9px; cursor: pointer; font-weight: 750; }
.btn-secundario { min-height: 39px; padding: 0 14px; color: #60458b; background: #f4effd; border: 1px solid #d8c9f0; }
.btn-principal, .btn-descargar { min-height: 42px; padding: 0 17px; color: #fff; background: linear-gradient(135deg,#8450df,#6735c6); box-shadow: 0 7px 15px rgba(104,53,198,.18); }
.btn-descargar.btn-correo { display: inline-flex; align-items: center; justify-content: center; gap: 7px; background: linear-gradient(135deg,#8450df,#6735c6); box-shadow: 0 7px 15px rgba(104,53,198,.18); }
.btn-correo svg { width: 16px; height: 16px; flex: 0 0 auto; }
button:disabled { opacity: .6; cursor: wait; }
.recargar { margin-left: auto; }

.generador-titulo { padding-bottom: 17px; }
.generador-form { margin-top: 18px; }
.filtros-principales { display: grid; grid-template-columns: minmax(0,1.7fr) minmax(250px,.8fr); gap: 14px; }
.campo { display: grid; gap: 7px; }
.campo > span { color: #4c5f7d; font-size: 13px; font-weight: 800; }
.campo input, .campo select { width: 100%; min-height: 45px; padding: 0 12px; color: #263e62; background: #fff; border: 1px solid #ced9e9; border-radius: 10px; outline: none; transition: border-color .18s ease, box-shadow .18s ease; }
.campo input:focus, .campo select:focus { border-color: #8c5ce2; box-shadow: 0 0 0 3px rgba(140,92,226,.12); }
.control-con-icono { position: relative; }
.control-con-icono svg { position: absolute; z-index: 1; top: 50%; left: 13px; width: 19px; height: 19px; transform: translateY(-50%); color: #8292a9; pointer-events: none; }
.control-con-icono input { padding-left: 42px; }
.barra-opciones-reporte { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-top: 14px; padding: 12px 14px; background: #faf9fd; border: 1px solid #e5dcf2; border-radius: 11px; }
.btn-mas-filtros { min-height: 38px; display: inline-flex; align-items: center; gap: 8px; padding: 0 11px; color: #644b8e; background: #fff; border: 1px solid #d9cbed; border-radius: 9px; font-weight: 800; cursor: pointer; transition: background .18s ease, border-color .18s ease, color .18s ease; }
.btn-mas-filtros:hover, .btn-mas-filtros.activo { color: #6531bd; background: #f3edfd; border-color: #cdb7ee; }
.icono-filtro { width: 18px; height: 18px; }
.icono-chevron { width: 16px; height: 16px; transition: transform .18s ease; }
.btn-mas-filtros.activo .icono-chevron { transform: rotate(180deg); }
.contador-filtros { min-width: 21px; height: 21px; display: inline-grid; place-items: center; padding: 0 6px; color: #fff; background: #7440cf; border-radius: 999px; font-size: 11px; }
.resumen-seleccion { min-width: 0; display: flex; align-items: center; justify-content: flex-end; gap: 10px; text-align: right; }
.resumen-seleccion > div { min-width: 0; display: grid; gap: 2px; }
.resumen-seleccion strong { color: #344965; font-size: 13px; }
.resumen-seleccion small { color: #7b8ba1; font-size: 12px; }
.resumen-punto { flex: 0 0 auto; width: 8px; height: 8px; background: #8ca0b7; border-radius: 50%; box-shadow: 0 0 0 4px rgba(140,160,183,.12); }
.resumen-punto.activo { background: #7b45d6; box-shadow: 0 0 0 4px rgba(123,69,214,.12); }
.filtros-avanzados { margin-top: 12px; padding: 16px; background: linear-gradient(145deg,#fbfaff,#f8fbff); border: 1px solid #e2d8f1; border-radius: 12px; overflow: hidden; }
.filtros-avanzados-cabecera { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.filtros-avanzados-cabecera > div { display: grid; gap: 3px; }
.filtros-avanzados-cabecera strong { color: #3a2a57; font-size: 14px; }
.filtros-avanzados-cabecera span { color: #7a6b91; font-size: 12px; }
.filtros-avanzados-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px; }
.periodo-campo { grid-column: 1 / -1; }
.periodo-controles { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr); gap: 10px; align-items: end; }
.periodo-controles label { display: grid; gap: 6px; }
.periodo-controles small { color: #71829b; font-size: 12px; font-weight: 750; }
.periodo-separador { align-self: end; padding-bottom: 13px; color: #9aa5b5; font-weight: 700; }
.acciones-generador { display: flex; align-items: center; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.btn-limpiar-filtros { min-height: 42px; padding: 0 13px; color: #73599b; background: transparent; border: 0; border-radius: 9px; font-weight: 750; cursor: pointer; }
.btn-limpiar-filtros:hover { background: #f5f0fb; }
.btn-generar { min-width: 170px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.btn-generar svg { width: 19px; height: 19px; }
.desplegar-enter-active, .desplegar-leave-active { transition: opacity .18s ease, transform .18s ease; transform-origin: top; }
.desplegar-enter-from, .desplegar-leave-to { opacity: 0; transform: translateY(-5px); }

.resultado { margin-top: 22px; border-top: 1px solid #eadff6; padding-top: 19px; }
.resultado-encabezado { display: flex; justify-content: space-between; align-items: center; gap: 18px; }
.resultado-acciones { flex: 0 0 auto; display: flex; gap: 9px; }
.btn-descargar.secundario { color: #644b8e; background: #f4effd; border: 1px solid #d8c9f0; box-shadow: none; }
.btn-descargar.secundario:hover { background: #ece4f8; }
.resultado-kicker { color: #7651b1; font-size: 12px; font-weight: 850; text-transform: uppercase; }
.resultado h3 { margin: 4px 0; color: #31204e; font-size: 19px; }
.resultado p { margin: 0; color: #71829b; }
.tabla-contenedor { margin-top: 16px; overflow-x: auto; border: 1px solid #e2e8f2; border-radius: 11px; }
table { width: 100%; min-width: 1120px; border-collapse: collapse; background: #fff; }
th { padding: 11px 12px; color: #586b88; background: #f7f8fc; border-bottom: 1px solid #e2e8f2; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: .03em; }
td { padding: 12px; color: #405774; border-bottom: 1px solid #eef1f6; vertical-align: top; font-size: 13px; }
tbody tr:last-child td { border-bottom: 0; }
td strong { display: block; max-width: 300px; color: #263e62; }
td small { display: block; margin-top: 4px; color: #8996aa; }
.numero { text-align: center; font-weight: 800; }
/* Colores de estados: iguales a la tabla de Administración de proyectos. */
.estado-captura { --estado-fondo: #e1f4ed; --estado-texto: #07885e; --estado-solido: #07885e; }
.estado-sometido { --estado-fondo: #e1ecff; --estado-texto: #2168d6; --estado-solido: #2168d6; }
.estado-registro { --estado-fondo: #eee8ff; --estado-texto: #7038db; --estado-solido: #7038db; }
.estado-financiado { --estado-fondo: #dff6e9; --estado-texto: #168153; --estado-solido: #168153; }
.estado-rechazado { --estado-fondo: #ffe3e6; --estado-texto: #ed3548; --estado-solido: #ed3548; }
.estado-informe-pendiente { --estado-fondo: #fff0d9; --estado-texto: #dc8010; --estado-solido: #dc8010; }
.estado-informe-deuda { --estado-fondo: #fce6ef; --estado-texto: #bd2857; --estado-solido: #bd2857; }
.estado-liberado { --estado-fondo: #dff4f0; --estado-texto: #087966; --estado-solido: #087966; }
.estado-default { --estado-fondo: #eef2f7; --estado-texto: #5d6d85; --estado-solido: #5d6d85; }
.estado-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  color: var(--estado-texto, #5d6d85);
  background: var(--estado-fondo, #eef2f7);
  border-radius: 999px;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 750;
}
.estado-chip::before {
  content: '';
  width: 7px;
  height: 7px;
  flex: 0 0 7px;
  background: currentColor;
  border-radius: 50%;
}

.historial-lista { display: grid; gap: 11px; margin-top: 17px; }
.historial-item { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 14px; border: 1px solid #e3e8f1; border-radius: 11px; background: #fff; }
.historial-principal { min-width: 0; display: flex; align-items: flex-start; gap: 12px; }
.historial-id { flex: 0 0 auto; padding: 5px 8px; color: #6b4e9c; background: #f3edfc; border-radius: 7px; font-size: 12px; font-weight: 800; }
.historial-item h3 { margin: 0; color: #324967; font-size: 15px; }
.historial-item p { margin: 4px 0; color: #6e8098; font-size: 13px; }
.historial-item small { color: #8996aa; }
.historial-acciones { flex: 0 0 auto; display: flex; gap: 7px; }
.btn-mini { min-height: 34px; padding: 0 11px; color: #5d477f; background: #f5f1fb; border: 1px solid #ded2ef; }
.btn-mini.btn-correo { display: inline-flex; align-items: center; justify-content: center; gap: 5px; color: #5d477f; background: #f5f1fb; border-color: #ded2ef; }
.btn-mini.btn-correo svg { width: 14px; height: 14px; }
.btn-mini.peligro { color: #a63e45; background: #fff3f3; border-color: #efd0d2; }

.modal-fondo {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(16, 24, 40, .58);
  backdrop-filter: blur(4px);
}
.modal-eliminar-reporte {
  width: min(100%, 520px);
  padding: 25px;
  background: #fff;
  border: 1px solid #ead7da;
  border-radius: 16px;
  box-shadow: 0 24px 70px rgba(21, 29, 45, .25);
}
.modal-eliminar-icono {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  color: #b13d45;
  background: #fff0f1;
  border: 1px solid #f0c9cc;
  border-radius: 14px;
}
.modal-eliminar-icono svg { width: 29px; height: 29px; }
.modal-eliminar-reporte h2 { margin: 15px 0 7px; color: #3b2430; font-size: 22px; }
.modal-eliminar-descripcion { margin: 0; color: #6c6370; line-height: 1.55; }
.reporte-a-eliminar {
  display: grid;
  gap: 3px;
  margin: 17px 0;
  padding: 13px 14px;
  background: #faf7fb;
  border: 1px solid #e9dfeb;
  border-radius: 11px;
}
.reporte-a-eliminar span { color: #8a6d91; font-size: 12px; font-weight: 800; text-transform: uppercase; }
.reporte-a-eliminar strong { color: #49364f; overflow-wrap: anywhere; }
.reporte-a-eliminar small { color: #817387; }
.label-confirmacion-reporte { display: block; margin-bottom: 7px; color: #56445d; font-size: 13px; font-weight: 700; }
.label-confirmacion-reporte strong { color: #a62f35; }
.modal-eliminar-reporte input {
  width: 100%;
  min-height: 45px;
  padding: 0 12px;
  color: #3c2b42;
  background: #fff;
  border: 1px solid #d9cbdc;
  border-radius: 10px;
  outline: none;
}
.modal-eliminar-reporte input:focus { border-color: #b54f59; box-shadow: 0 0 0 3px rgba(181, 79, 89, .12); }
.modal-acciones-reporte { display: flex; justify-content: flex-end; gap: 9px; margin-top: 18px; }
.btn-modal-cancelar, .btn-modal-eliminar {
  min-height: 41px;
  padding: 0 15px;
  border-radius: 9px;
  font-weight: 800;
  cursor: pointer;
}
.btn-modal-cancelar { color: #63556a; background: #f7f5f8; border: 1px solid #ded8e0; }
.btn-modal-eliminar { color: #fff; background: #b13d45; border: 1px solid #a4373f; }
.btn-modal-eliminar:hover:not(:disabled) { background: #9d323a; }
.btn-modal-eliminar:disabled { opacity: .5; cursor: not-allowed; }

.vacio { margin: 18px 0 0; padding: 17px; color: #71829b; background: #f8faff; border: 1px dashed #d7deea; border-radius: 10px; text-align: center; }
.resultado-vacio { margin-top: 15px; }

.modo-oscuro { background: radial-gradient(circle at 7% 3%,rgba(43,78,127,.35),transparent 25%), radial-gradient(circle at 94% 2%,rgba(94,68,139,.25),transparent 24%), #071225; color: #e9effa; }
.modo-oscuro .cabecera, .modo-oscuro .panel { background: rgba(13,27,49,.97); border-color: #293c59; }
.modo-oscuro .cabecera h1, .modo-oscuro .panel-titulo h2, .modo-oscuro .metrica strong, .modo-oscuro .distribucion h3, .modo-oscuro .barra-fila strong, .modo-oscuro .resultado h3 { color: #edf2ff; }
.modo-oscuro .subtitulo, .modo-oscuro .descripcion, .modo-oscuro .panel-titulo p, .modo-oscuro .distribucion p, .modo-oscuro .resultado p, .modo-oscuro .vacio { color: #a8b6ce; }
.modo-oscuro .panel-titulo, .modo-oscuro .resultado { border-color: #2b3e5d; }
.modo-oscuro .metrica, .modo-oscuro .distribucion, .modo-oscuro .historial-item, .modo-oscuro table { background: #0a172a; border-color: #2a3d5b; }
.modo-oscuro th { color: #afbdd2; background: #102039; border-color: #30425e; }
.modo-oscuro td { color: #c7d2e5; border-color: #263a59; }
.modo-oscuro td strong, .modo-oscuro .historial-item h3 { color: #e4ebf8; }
.modo-oscuro .campo span { color: #b5c3d8; }
.modo-oscuro .campo input, .modo-oscuro .campo select { color: #e6eefb; background: #09172a; border-color: #344866; color-scheme: dark; }
.modo-oscuro .barra-track { background: #1a2c47; }
.modo-oscuro .historial-item p, .modo-oscuro .historial-item small, .modo-oscuro .metrica small { color: #94a6c2; }
.modo-oscuro .vacio { background: #0a172a; border-color: #344866; }
.modo-oscuro .documento, .modo-oscuro .grafica { background: #13213a; border-color: #3d4f6d; }
.modo-oscuro .lineas i { background: #354663; }
.modo-oscuro .barra-opciones-reporte { background: #0b192d; border-color: #2d405e; }
.modo-oscuro .btn-mas-filtros { color: #c9b8e8; background: #10203a; border-color: #3a4e6d; }
.modo-oscuro .btn-mas-filtros:hover, .modo-oscuro .btn-mas-filtros.activo { color: #e1d5f8; background: #1a2943; border-color: #6e55a1; }
.modo-oscuro .resumen-seleccion strong { color: #dfe7f5; }
.modo-oscuro .resumen-seleccion small { color: #94a6c2; }
.modo-oscuro .filtros-avanzados { background: linear-gradient(145deg,#0b192d,#0a1729); border-color: #2d405e; }
.modo-oscuro .filtros-avanzados-cabecera strong { color: #e4ebf8; }
.modo-oscuro .filtros-avanzados-cabecera span, .modo-oscuro .periodo-controles small { color: #9aabc5; }
.modo-oscuro .btn-limpiar-filtros { color: #c7b6e4; }
.modo-oscuro .btn-limpiar-filtros:hover { background: #172641; }
.modo-oscuro .btn-descargar.secundario { color: #d5c7ea; background: #172641; border-color: #3b4f6d; }
.modo-oscuro .modal-fondo { background: rgba(2, 8, 20, .72); }
.modo-oscuro .modal-eliminar-reporte { background: #0d1b31; border-color: #4a3541; }
.modo-oscuro .modal-eliminar-reporte h2 { color: #f0e8ed; }
.modo-oscuro .modal-eliminar-descripcion { color: #aeb8ca; }
.modo-oscuro .reporte-a-eliminar { background: #101d32; border-color: #39485f; }
.modo-oscuro .reporte-a-eliminar span, .modo-oscuro .reporte-a-eliminar small { color: #a9a0b0; }
.modo-oscuro .reporte-a-eliminar strong { color: #eef2fb; }
.modo-oscuro .label-confirmacion-reporte { color: #d9dfe9; }
.modo-oscuro .modal-eliminar-reporte input { color: #eef2fb; background: #09172a; border-color: #42536c; }
.modo-oscuro .btn-modal-cancelar { color: #d3dbe8; background: #17253b; border-color: #3b4d67; }

@media (max-width: 1050px) {
  .cabecera { grid-template-columns: 1fr 270px; }
  .metricas { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .filtros-principales { grid-template-columns: minmax(0,1.4fr) minmax(230px,.8fr); }
}

@media (max-width: 760px) {
  .pagina { padding: 14px 12px 30px; }
  .cabecera { min-height: auto; grid-template-columns: 1fr; padding: 17px; }
  .ilustracion { display: none; }
  .panel { padding: 16px; }
  .panel-titulo { align-items: flex-start; flex-wrap: wrap; }
  .recargar { margin-left: 61px; }
  .metricas, .filtros-principales, .filtros-avanzados-grid { grid-template-columns: 1fr; }
  .barra-opciones-reporte { align-items: flex-start; flex-direction: column; }
  .resumen-seleccion { justify-content: flex-start; text-align: left; }
  .periodo-campo { grid-column: auto; }
  .periodo-controles { grid-template-columns: 1fr; }
  .periodo-separador { display: none; }
  .acciones-generador { align-items: stretch; flex-direction: column-reverse; }
  .acciones-generador button { width: 100%; }
  .distribucion-encabezado, .resultado-encabezado, .historial-item { align-items: flex-start; flex-direction: column; }
  .barra-fila { grid-template-columns: 110px 1fr 30px; gap: 8px; }
  .resultado-acciones { width: 100%; flex-direction: column; }
  .btn-descargar { width: 100%; }
  .historial-acciones { width: 100%; flex-wrap: wrap; }
  .historial-acciones button { flex: 1; }
  .modal-eliminar-reporte { padding: 20px; }
  .modal-acciones-reporte { flex-direction: column-reverse; }
  .modal-acciones-reporte button { width: 100%; }
}

.campo-busqueda-simple .control-con-icono,
.campo-busqueda .control-con-icono {
  min-height: 45px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  background: #fff;
  border: 1.5px solid #b8c7db;
  border-radius: 10px;
  box-shadow: inset 0 1px 2px rgba(39, 62, 98, .035);
  transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
}

.campo-busqueda-simple .control-con-icono:focus-within,
.campo-busqueda .control-con-icono:focus-within {
  border-color: #8050da;
  box-shadow: 0 0 0 3px rgba(128, 80, 218, .13);
}

.campo-busqueda-simple .control-con-icono svg,
.campo-busqueda .control-con-icono svg {
  position: static;
  width: 18px;
  height: 18px;
  transform: none;
  color: #6f83a1;
  flex: 0 0 auto;
}

.campo-busqueda-simple .control-con-icono input,
.campo-busqueda .control-con-icono input {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 42px;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  box-shadow: none;
}

.campo input[type='date'],
.campo select {
  border-width: 1.5px;
  border-color: #b8c7db;
}

.filtros-avanzados-grid-busqueda {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.periodo-campo-completo {
  grid-column: 1 / -1;
}

.vista-previa {
  margin-top: 22px;
  border-top: 1px solid #eadff6;
  padding-top: 19px;
}

.vista-previa-cabecera {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.vista-previa-cabecera h3 {
  margin: 4px 0;
  color: #31204e;
  font-size: 19px;
}

.vista-previa-cabecera p {
  margin: 0;
  color: #71829b;
}

.vista-previa-resumen {
  flex: 0 0 auto;
  min-width: 130px;
  padding: 10px 12px;
  text-align: center;
  background: #f7f4fd;
  border: 1px solid #e2d7f2;
  border-radius: 12px;
}

.vista-previa-resumen strong {
  display: block;
  color: #5b39a5;
  font-size: 22px;
  line-height: 1;
}

.vista-previa-resumen small {
  color: #7a6b92;
  font-size: 12px;
  font-weight: 700;
}

.vista-previa-tabla table {
  min-width: 980px;
}

.coincidencia-total {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  min-height: 28px;
  padding: 0 9px;
  color: #52328e;
  background: #f3ecfd;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.texto-secundario-tabla {
  display: block;
  margin-top: 5px;
  max-width: 280px;
  color: #8996aa;
}

.modo-oscuro .campo-busqueda-simple .control-con-icono,
.modo-oscuro .campo-busqueda .control-con-icono {
  background: #09172a;
  border-color: #405675;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .12);
}

.modo-oscuro .campo-busqueda-simple .control-con-icono:focus-within,
.modo-oscuro .campo-busqueda .control-con-icono:focus-within {
  border-color: #9a72e7;
  box-shadow: 0 0 0 3px rgba(154, 114, 231, .16);
}

.modo-oscuro .campo-busqueda-simple .control-con-icono svg,
.modo-oscuro .campo-busqueda .control-con-icono svg {
  color: #9eb1cd;
}

.modo-oscuro .vista-previa {
  border-color: #2b3e5d;
}

.modo-oscuro .vista-previa-cabecera h3,
.modo-oscuro .vista-previa-resumen strong {
  color: #edf2ff;
}

.modo-oscuro .vista-previa-cabecera p,
.modo-oscuro .vista-previa-resumen small,
.modo-oscuro .texto-secundario-tabla {
  color: #94a6c2;
}

.modo-oscuro .vista-previa-resumen {
  background: #101f36;
  border-color: #334867;
}

.modo-oscuro .coincidencia-total {
  color: #e0d5f6;
  background: #1b2941;
}

@media (max-width: 1050px) {
  .filtros-avanzados-grid-busqueda {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .filtros-avanzados-grid-busqueda {
    grid-template-columns: 1fr;
  }

  .vista-previa-cabecera {
    flex-direction: column;
  }

  .vista-previa-resumen {
    width: 100%;
    max-width: 220px;
  }
}


.filtros-unificados {
  padding: 18px;
  background: linear-gradient(145deg, #fbf9ff, #f8fbff);
  border: 1px solid #e3d8f2;
  border-radius: 13px;
}

.filtros-unificados-cabecera {
  margin-bottom: 15px;
}

.filtros-unificados-cabecera > div {
  display: grid;
  gap: 3px;
}

.filtros-unificados-cabecera strong {
  color: #3b2b58;
  font-size: 15px;
}

.filtros-unificados-cabecera span {
  color: #7a6d8c;
  font-size: 12px;
}

.filtros-unificados-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.acciones-busqueda {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 17px;
  padding-top: 15px;
  border-top: 1px solid #e8dff4;
}

.btn-buscar-proyectos {
  min-width: 150px;
  min-height: 43px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  color: #fff;
  background: linear-gradient(135deg, #7850d9, #6536c7);
  border: 0;
  border-radius: 10px;
  box-shadow: 0 7px 16px rgba(101, 54, 199, .18);
  font-weight: 800;
  cursor: pointer;
}

.btn-buscar-proyectos svg {
  width: 18px;
  height: 18px;
}

.resultados-busqueda {
  margin-top: 22px;
  padding-top: 19px;
  border-top: 1px solid #eadff6;
}

.resultados-busqueda-cabecera {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
}

.resultados-busqueda-cabecera h3 {
  margin: 4px 0;
  color: #31204e;
  font-size: 19px;
}

.resultados-busqueda-cabecera p {
  margin: 0;
  color: #71829b;
  line-height: 1.45;
}

.seleccion-resumen {
  flex: 0 0 auto;
  min-width: 122px;
  padding: 11px 13px;
  text-align: center;
  background: #f6f1fd;
  border: 1px solid #ddcef2;
  border-radius: 11px;
}

.seleccion-resumen strong {
  display: block;
  color: #6339ad;
  font-size: 22px;
  line-height: 1;
}

.seleccion-resumen small {
  color: #7a6a92;
  font-weight: 700;
}

.resultados-tabla table {
  min-width: 960px;
}

.columna-ver,
.columna-seleccionar {
  width: 110px;
  text-align: center;
  vertical-align: middle;
}

.btn-ver-proyecto {
  min-height: 34px;
  padding: 0 13px;
  color: #5d3d98;
  background: #f4effd;
  border: 1px solid #d8c9ef;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
}

.btn-ver-proyecto:hover {
  background: #ebe1fa;
}

.seleccionar-todos {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
}

.seleccionar-todos input,
.checkbox-proyecto input {
  width: 18px;
  height: 18px;
  accent-color: #7140cc;
  cursor: pointer;
}

.checkbox-proyecto {
  width: 34px;
  height: 34px;
  position: relative;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
}

.checkbox-proyecto span {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.fila-seleccionada td {
  background: #fbf8ff;
}

.acciones-reporte-seleccionado {
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #ece4f5;
}

.ayuda-seleccion {
  min-width: 0;
  display: grid;
  gap: 2px;
  color: #74839a;
  font-size: 13px;
}

.ayuda-seleccion strong {
  color: #4b3970;
}

.btn-generar:disabled {
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}

.modo-oscuro .filtros-unificados {
  background: linear-gradient(145deg, #0b192d, #0a1729);
  border-color: #2d405e;
}

.modo-oscuro .filtros-unificados-cabecera strong,
.modo-oscuro .resultados-busqueda-cabecera h3,
.modo-oscuro .seleccion-resumen strong,
.modo-oscuro .ayuda-seleccion strong {
  color: #edf2ff;
}

.modo-oscuro .filtros-unificados-cabecera span,
.modo-oscuro .resultados-busqueda-cabecera p,
.modo-oscuro .seleccion-resumen small,
.modo-oscuro .ayuda-seleccion {
  color: #94a6c2;
}

.modo-oscuro .acciones-busqueda,
.modo-oscuro .resultados-busqueda,
.modo-oscuro .acciones-reporte-seleccionado {
  border-color: #2b3e5d;
}

.modo-oscuro .seleccion-resumen {
  background: #101f36;
  border-color: #344866;
}

.modo-oscuro .btn-ver-proyecto {
  color: #ddd1f2;
  background: #172641;
  border-color: #3c4f6e;
}

.modo-oscuro .fila-seleccionada td {
  background: #101d33;
}

@media (max-width: 1050px) {
  .filtros-unificados-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .filtros-unificados-grid {
    grid-template-columns: 1fr;
  }

  .acciones-busqueda,
  .acciones-reporte-seleccionado,
  .resultados-busqueda-cabecera {
    align-items: stretch;
    flex-direction: column;
  }

  .btn-buscar-proyectos,
  .btn-generar {
    width: 100%;
  }

  .seleccion-resumen {
    width: 100%;
  }
}



.modal-reporte-fondo {
  align-items: start;
  overflow-y: auto;
}

.modal-vista-reporte {
  width: min(1280px, calc(100vw - 34px));
  max-height: calc(100vh - 34px);
  display: flex;
  flex-direction: column;
  margin: 17px auto;
  background: #fff;
  border: 1px solid #ded7ea;
  border-radius: 16px;
  box-shadow: 0 24px 70px rgba(21, 29, 45, .28);
  overflow: hidden;
}

.modal-reporte-cabecera {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 22px;
  border-bottom: 1px solid #e7e0ef;
  background: linear-gradient(145deg, #fff, #faf7ff);
}

.modal-reporte-cabecera h2 { margin: 4px 0; color: #31204e; font-size: 23px; }
.modal-reporte-cabecera p { margin: 0; color: #71829b; }
.modal-reporte-acciones { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.btn-cerrar-vista {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #725c8f;
  background: #f5f1fa;
  border: 1px solid #ded4eb;
  border-radius: 10px;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.modal-reporte-contenido { padding: 20px 22px 28px; overflow-y: auto; }
.resumen-reporte-detallado { display: grid; grid-template-columns: minmax(220px, .7fr) minmax(0, 1.3fr); gap: 12px; margin-bottom: 18px; }
.resumen-reporte-detallado > div { padding: 13px 14px; background: #f8f6fb; border: 1px solid #e7dfef; border-radius: 11px; }
.resumen-reporte-detallado span, .detalle-grid span, .descripcion-proyecto-reporte > span { display: block; margin-bottom: 4px; color: #7a6c91; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .03em; }
.resumen-reporte-detallado strong { color: #3e3153; overflow-wrap: anywhere; }

.proyecto-reporte-detallado { margin-top: 18px; border: 1px solid #e1e6ef; border-radius: 14px; background: #fff; overflow: hidden; }
.proyecto-reporte-cabecera { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 16px 18px; background: #f8faff; border-bottom: 1px solid #e3e8f1; }
.proyecto-reporte-cabecera h3 { margin: 5px 0 3px; color: #263e62; font-size: 20px; }
.proyecto-reporte-cabecera p { margin: 0; color: #71829b; }
.proyecto-reporte-cabecera-acciones { display: flex; align-items: center; gap: 8px; }
.detalle-seccion { padding: 16px 18px; border-bottom: 1px solid #edf0f5; }
.detalle-seccion:last-child { border-bottom: 0; }
.detalle-seccion h4 { margin: 0 0 12px; color: #3a3150; font-size: 15px; }
.detalle-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.detalle-grid > div { min-width: 0; padding: 10px 11px; background: #fafbfe; border: 1px solid #e8ecf3; border-radius: 9px; }
.detalle-grid strong { display: block; color: #3f5573; font-size: 13px; overflow-wrap: anywhere; }
.descripcion-proyecto-reporte { margin-top: 11px; padding: 11px 12px; background: #fafbfe; border: 1px solid #e8ecf3; border-radius: 9px; }
.descripcion-proyecto-reporte p { margin: 0; color: #536982; line-height: 1.5; white-space: pre-wrap; }
.tabla-detalle-reporte { margin-top: 0; }
.tabla-detalle-reporte table { min-width: 760px; }
.detalle-vacio { margin: 0; padding: 12px; color: #7d8ba0; background: #fafbfe; border: 1px dashed #dce2eb; border-radius: 9px; }

.modo-oscuro .modal-vista-reporte { background: #0d1b31; border-color: #324661; }
.modo-oscuro .modal-reporte-cabecera { background: linear-gradient(145deg, #102039, #0d1b31); border-color: #2d405e; }
.modo-oscuro .modal-reporte-cabecera h2, .modo-oscuro .proyecto-reporte-cabecera h3, .modo-oscuro .detalle-seccion h4 { color: #edf2ff; }
.modo-oscuro .modal-reporte-cabecera p, .modo-oscuro .proyecto-reporte-cabecera p, .modo-oscuro .descripcion-proyecto-reporte p { color: #a6b5cb; }
.modo-oscuro .btn-cerrar-vista { color: #d7caec; background: #172641; border-color: #3b4f6d; }
.modo-oscuro .resumen-reporte-detallado > div, .modo-oscuro .detalle-grid > div, .modo-oscuro .descripcion-proyecto-reporte, .modo-oscuro .detalle-vacio { background: #0a172a; border-color: #2c405e; }
.modo-oscuro .resumen-reporte-detallado strong, .modo-oscuro .detalle-grid strong { color: #dbe5f4; }
.modo-oscuro .resumen-reporte-detallado span, .modo-oscuro .detalle-grid span, .modo-oscuro .descripcion-proyecto-reporte > span { color: #9babc3; }
.modo-oscuro .proyecto-reporte-detallado { background: #0a172a; border-color: #2c405e; }
.modo-oscuro .proyecto-reporte-cabecera { background: #102039; border-color: #2c405e; }
.modo-oscuro .detalle-seccion { border-color: #263a59; }

@media (max-width: 900px) {
  .modal-reporte-cabecera, .proyecto-reporte-cabecera { flex-direction: column; }
  .modal-reporte-acciones { width: 100%; flex-wrap: wrap; }
  .detalle-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .resumen-reporte-detallado { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .detalle-grid { grid-template-columns: 1fr; }
  .modal-vista-reporte { width: calc(100vw - 16px); margin: 8px auto; max-height: calc(100vh - 16px); }
}

.btn-ver-proyecto:disabled { opacity: .65; cursor: wait; }
</style>
