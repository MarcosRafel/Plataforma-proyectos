<template>
  <div class="pagina" :class="{ 'modo-oscuro': modoOscuro }">
    <div class="contenido">

      <!-- ======================================== -->
      <!-- CABECERA DE LA VISTA -->
      <!-- ======================================== -->

      <header class="cabecera-pagina">

        <div class="cabecera-texto">

          <button type="button" class="btn-regresar" aria-label="Regresar al panel principal" title="Regresar"
            @click="regresar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

            Regresar
          </button>


          <p class="subtitulo">
            Gestión de proyectos
          </p>

          <h1>
            Mis proyectos
          </h1>

          <p class="descripcion">
            Consulta, filtra y administra los proyectos en los que eres responsable desde un solo lugar.
          </p>


          <section class="resumen-minimalista" aria-label="Resumen de mis proyectos">

            <!-- TOTAL -->
            <article class="mini-estadistica mini-estadistica-azul">
              <span class="mini-acento"></span>

              <div class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor"
                    stroke-width="1.8" stroke-linejoin="round" />
                  <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
                </svg>
              </div>

              <div class="mini-dato">
                <strong>{{ proyectos.length }}</strong>

                <div>
                  <span>Registrados</span>
                  <small>
                    {{ proyectosFiltrados.length }} visibles
                  </small>
                </div>
              </div>
            </article>


            <!-- EN PROCESO -->
            <article class="mini-estadistica mini-estadistica-amarilla">
              <span class="mini-acento"></span>

              <div class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 7.5v5l3.4 2" fill="none" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" />
                </svg>
              </div>

              <div class="mini-dato">
                <strong>{{ totalEnProceso }}</strong>

                <div>
                  <span>En proceso</span>
                  <small>Activos</small>
                </div>
              </div>
            </article>


            <!-- LIBERADOS -->
            <article class="mini-estadistica mini-estadistica-verde">
              <span class="mini-acento"></span>

              <div class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity=".92" />
                  <path d="m8.3 12.1 2.4 2.4 5-5" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>

              <div class="mini-dato">
                <strong>{{ totalLiberados }}</strong>

                <div>
                  <span>Liberados</span>
                  <small>Finalizados</small>
                </div>
              </div>
            </article>


            <!-- RECHAZADOS -->
            <article class="mini-estadistica mini-estadistica-roja">
              <span class="mini-acento"></span>

              <div class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path d="m9 9 6 6m0-6-6 6" fill="none" stroke="currentColor" stroke-width="1.9"
                    stroke-linecap="round" />
                </svg>
              </div>

              <div class="mini-dato">
                <strong>{{ totalRechazados }}</strong>

                <div>
                  <span>Rechazados</span>
                  <small>No aprobados</small>
                </div>
              </div>
            </article>

          </section>

        </div>


        <div class="cabecera-ilustracion" aria-hidden="true">
          <span class="orbita orbita-1"></span>
          <span class="orbita orbita-2"></span>

          <div class="carpeta-ilustracion">
            <span class="carpeta-pestana"></span>

            <div class="documento documento-1">
              <span></span>
              <span></span>
              <span class="linea-corta"></span>
            </div>

            <div class="documento documento-2">
              <div class="check-documento">
                <svg viewBox="0 0 24 24">
                  <path d="m7 12 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>

              <span></span>
              <span class="linea-media"></span>
            </div>
          </div>

          <div class="mini-grafica">
            <span class="barra barra-1"></span>
            <span class="barra barra-2"></span>
            <span class="barra barra-3"></span>
            <span class="barra barra-4"></span>
          </div>

          <span class="destello destello-1"></span>
          <span class="destello destello-2"></span>
          <span class="destello destello-3"></span>
        </div>

      </header>


      <!-- ======================================== -->
      <!-- ADMINISTRACIÓN DE MIS PROYECTOS -->
      <!-- ======================================== -->

      <section class="panel-proyectos">

        <!-- ENCABEZADO -->
        <div class="encabezado">

          <div class="titulo-proyectos">

            <div class="icono-titulo-proyectos">

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="none" stroke="currentColor"
                  stroke-width="1.8" stroke-linejoin="round" />

                <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
              </svg>

            </div>


            <div>

              <h2>
                Proyectos registrados
              </h2>

              <p>
                Revisa la información general, el estado y las últimas actualizaciones.
              </p>

            </div>

          </div>



          <button type="button" class="btn-nuevo" @click="nuevoProyecto">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>

            Nuevo proyecto

          </button>

        </div>



        <!-- ======================================== -->
        <!-- FILTROS -->
        <!-- ======================================== -->

        <div class="zona-filtros">

          <div class="filtros">

            <!-- BUSCAR PROYECTO -->
            <div class="campo-filtro campo-filtro-busqueda">

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8" />

                <path d="M15 15l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>


              <input v-model="busqueda" type="text" placeholder="Buscar proyecto..." />

            </div>



            <!-- ESTADOS -->
            <div class="campo-filtro campo-filtro-select">

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16l-6.5 7v5l-3 2v-7z" fill="none" stroke="currentColor" stroke-width="1.7"
                  stroke-linejoin="round" />
              </svg>


              <select v-model="estadoSeleccionado">

                <option>
                  Todos los estados
                </option>

                <option>
                  En captura
                </option>

                <option>
                  Sometido
                </option>

                <option>
                  Con registro
                </option>

                <option>
                  Financiado
                </option>

                <option>
                  Rechazado
                </option>

                <option>
                  Informe pendiente
                </option>

                <option>
                  Informe en deuda
                </option>

                <option>
                  Liberado
                </option>

              </select>

            </div>



            <!-- BUSCAR CONVOCATORIA -->
            <div class="campo-filtro campo-filtro-busqueda">

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8" />

                <path d="M15 15l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>


              <input v-model="busquedaConvocatoriaProyecto" type="text" placeholder="Buscar convocatoria..." />

            </div>

          </div>



          <!-- ORDENAR -->
          <div class="ordenar">

            <span class="texto-ordenar">

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14M5 8l3-3 3 3M16 19V5M13 16l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.7"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              Ordenar por

            </span>


            <select v-model="ordenSeleccionado">

              <option value="recientes">
                Más recientes
              </option>

              <option value="antiguos">
                Más antiguos
              </option>

              <option value="nombre-asc">
                Nombre A-Z
              </option>

              <option value="nombre-desc">
                Nombre Z-A
              </option>

            </select>

          </div>

        </div>



        <!-- ======================================== -->
        <!-- RESUMEN DE RESULTADOS -->
        <!-- ======================================== -->

        <div class="resumen-resultados">

          <div class="resultado-texto">
            <span class="resultado-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16l-6.5 7v5l-3 2v-7Z" fill="none" stroke="currentColor" stroke-width="1.7"
                  stroke-linejoin="round" />
              </svg>
            </span>

            <p>
              Mostrando
              <strong>{{ proyectosFiltrados.length }}</strong>
              de
              <strong>{{ proyectos.length }}</strong>
              proyectos
            </p>
          </div>


          <button v-if="filtrosActivos > 0" type="button" class="btn-limpiar-filtros" @click="limpiarFiltros">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" />
            </svg>

            Limpiar filtros
          </button>

        </div>


        <!-- ======================================== -->
        <!-- TABLA PC / TABLET -->
        <!-- ======================================== -->

        <div class="tabla-contenedor tabla-escritorio">

          <table>

            <thead>

              <tr>

                <th>
                  Proyecto
                </th>

                <th>
                  Responsable
                </th>

                <th>
                  Convocatoria
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Fecha de actualización
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              <!-- CARGANDO -->
              <tr v-if="cargandoProyectos">

                <td colspan="6" class="sin-resultados">
                  Cargando proyectos...
                </td>

              </tr>


              <!-- ERROR -->
              <tr v-else-if="errorProyectos">

                <td colspan="6" class="sin-resultados mensaje-error-proyectos">
                  {{ errorProyectos }}
                </td>

              </tr>


              <!-- SIN RESULTADOS -->
              <tr v-else-if="proyectosFiltrados.length === 0">

                <td colspan="6" class="sin-resultados">
                  No se encontraron proyectos.
                </td>

              </tr>



              <!-- PROYECTOS -->
              <template v-else>

                <tr v-for="proyecto in proyectosFiltrados" :key="proyecto._id">

                  <!-- PROYECTO -->
                  <td>

                    <div class="celda-proyecto">

                      <div class="icono-proyecto" :class="claseIconoProyecto(proyecto._id)">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="none"
                            stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />

                          <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
                        </svg>

                      </div>


                      <div class="texto-proyecto">

                        <strong>
                          {{ proyecto.nombre_proyecto }}
                        </strong>

                        <span v-if="proyecto.periodo">
                          {{ proyecto.periodo }}
                        </span>

                        <span v-else>
                          Proyecto registrado
                        </span>

                      </div>

                    </div>

                  </td>



                  <!-- RESPONSABLE -->
                  <td>

                    <div class="responsable">

                      <div class="avatar">
                        {{ obtenerIniciales(proyecto.responsable) }}
                      </div>


                      <div class="responsable-texto">

                        <strong>
                          {{ proyecto.responsable }}
                        </strong>

                        <span>
                          Responsable del proyecto
                        </span>

                      </div>

                    </div>

                  </td>



                  <!-- CONVOCATORIA -->
                  <td>

                    <div class="convocatoria-tabla">

                      <strong>
                        {{ proyecto.convocatoria }}
                      </strong>

                      <span>
                        Convocatoria registrada
                      </span>

                    </div>

                  </td>



                  <!-- ESTADO -->
                  <td>

                    <span class="estado" :class="claseEstado(proyecto.estado)">

                      <span class="punto-estado"></span>

                      {{ proyecto.estado }}

                    </span>

                  </td>



                  <!-- ======================================== -->
                  <!-- FECHA Y HORA -->
                  <!-- ======================================== -->

                  <td>

                    <div class="fecha-proyecto">

                      <strong>
                        {{ formatearFecha(proyecto.fecha_actualizacion) }}
                      </strong>


                      <span v-if="!proyecto.fecha_actualizacion">
                        Sin actualización registrada
                      </span>


                      <span v-else-if="formatearHora(proyecto.fecha_actualizacion)">
                        {{ formatearHora(proyecto.fecha_actualizacion) }}
                        · Última modificación
                      </span>


                      <span v-else>
                        Última modificación
                      </span>

                    </div>

                  </td>



                  <!-- ACCIONES -->
                  <td>

                    <div class="acciones">

                      <!-- VER -->
                      <button type="button" class="btn-ver" @click="verProyecto(proyecto._id)">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5z" fill="none" stroke="currentColor"
                            stroke-width="1.7" stroke-linejoin="round" />

                          <circle cx="12" cy="12" r="2.3" fill="none" stroke="currentColor" stroke-width="1.7" />
                        </svg>

                        Ver

                      </button>


                      <!-- EDITAR -->
                      <button type="button" class="btn-editar" @click="editarProyecto(proyecto._id)">

                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M5 18.5l1-4L15.5 5l3.5 3.5-9.5 9.5z" fill="none" stroke="currentColor"
                            stroke-width="1.7" stroke-linejoin="round" />

                          <path d="M13.5 7l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.7" />
                        </svg>

                        Editar

                      </button>

                    </div>

                  </td>

                </tr>

              </template>

            </tbody>

          </table>

        </div>



        <!-- ======================================== -->
        <!-- TARJETAS PARA CELULAR -->
        <!-- ======================================== -->

        <div class="proyectos-movil">

          <div v-if="cargandoProyectos" class="sin-resultados-movil">
            Cargando proyectos...
          </div>


          <div v-else-if="errorProyectos" class="sin-resultados-movil mensaje-error-proyectos">
            {{ errorProyectos }}
          </div>


          <div v-else-if="proyectosFiltrados.length === 0" class="sin-resultados-movil">
            No se encontraron proyectos.
          </div>



          <template v-else>

            <article v-for="proyecto in proyectosFiltrados" :key="`movil-${proyecto._id}`" class="tarjeta-proyecto">

              <div class="tarjeta-proyecto-superior">

                <div class="icono-proyecto icono-proyecto-movil" :class="claseIconoProyecto(proyecto._id)">

                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="none" stroke="currentColor"
                      stroke-width="1.8" stroke-linejoin="round" />

                    <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
                  </svg>

                </div>


                <div class="tarjeta-titulo">

                  <h3>
                    {{ proyecto.nombre_proyecto }}
                  </h3>

                  <span v-if="proyecto.periodo">
                    {{ proyecto.periodo }}
                  </span>

                </div>

              </div>



              <span class="estado" :class="claseEstado(proyecto.estado)">

                <span class="punto-estado"></span>

                {{ proyecto.estado }}

              </span>



              <div class="datos-proyecto-movil">

                <!-- RESPONSABLE -->
                <div class="dato-movil">

                  <span class="etiqueta-movil">
                    Responsable
                  </span>


                  <div class="responsable responsable-movil">

                    <div class="avatar">
                      {{ obtenerIniciales(proyecto.responsable) }}
                    </div>

                    <strong>
                      {{ proyecto.responsable }}
                    </strong>

                  </div>

                </div>



                <!-- CONVOCATORIA -->
                <div class="dato-movil">

                  <span class="etiqueta-movil">
                    Convocatoria
                  </span>

                  <strong>
                    {{ proyecto.convocatoria }}
                  </strong>

                </div>



                <!-- FECHA Y HORA -->
                <div class="dato-movil">

                  <span class="etiqueta-movil">
                    Última actualización
                  </span>


                  <strong>
                    {{ formatearFecha(proyecto.fecha_actualizacion) }}
                  </strong>


                  <span v-if="formatearHora(proyecto.fecha_actualizacion)" class="hora-actualizacion-movil">
                    {{ formatearHora(proyecto.fecha_actualizacion) }}
                  </span>

                </div>

              </div>



              <div class="acciones-movil">

                <button type="button" class="btn-ver" @click="verProyecto(proyecto._id)">
                  Ver proyecto
                </button>


                <button type="button" class="btn-editar" @click="editarProyecto(proyecto._id)">
                  Editar
                </button>

              </div>

            </article>

          </template>

        </div>

      </section>

    </div>
  </div>
</template>



<script setup>

import {
  computed,
  onMounted,
  ref
} from 'vue'

import { useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'


// ========================================
// ROUTER
// ========================================

const router =
  useRouter()


// ========================================
// TEMA GLOBAL
// Se controla desde ProyectosView.vue.
// Aquí únicamente se refleja el tema activo.
// ========================================

const {
  modoOscuro
} = useTema()


// ========================================
// REGRESAR AL PANEL PRINCIPAL
// ========================================

const regresar = () => {

  router.push('/proyectos')

}


// ========================================
// FILTROS
// ========================================

const busqueda =
  ref('')


const busquedaConvocatoriaProyecto =
  ref('')


const estadoSeleccionado =
  ref('Todos los estados')


const ordenSeleccionado =
  ref('recientes')


// ========================================
// ESTADO DE LOS FILTROS
// ========================================

const filtrosActivos =
  computed(() => {

    let total = 0

    if (busqueda.value.trim() !== '') {
      total++
    }

    if (
      busquedaConvocatoriaProyecto
        .value
        .trim() !== ''
    ) {
      total++
    }

    if (
      estadoSeleccionado.value !==
      'Todos los estados'
    ) {
      total++
    }

    if (
      ordenSeleccionado.value !==
      'recientes'
    ) {
      total++
    }

    return total

  })


const limpiarFiltros = () => {

  busqueda.value = ''

  busquedaConvocatoriaProyecto.value = ''

  estadoSeleccionado.value =
    'Todos los estados'

  ordenSeleccionado.value =
    'recientes'

}


// ========================================
// PROYECTOS
// ========================================

const proyectos =
  ref([])


const cargandoProyectos =
  ref(false)


const errorProyectos =
  ref('')


// ========================================
// CARGAR PROYECTOS
// ========================================

const cargarProyectos = async () => {
  cargandoProyectos.value = true
  errorProyectos.value = ''

  try {
    const respuesta = await apiFetch('/proyectos/mios', { credentials: 'include' })

    if (!respuesta.ok) {
      throw new Error('No fue posible obtener los proyectos.')
    }

    const datos = await respuesta.json()

    proyectos.value = datos.map(proyecto => ({
      _id: proyecto._id || proyecto.id,
      nombre_proyecto: proyecto.nombre_proyecto || 'Proyecto sin nombre',
      responsable: proyecto.responsable || 'Sin responsable',
      convocatoria: proyecto.convocatoria?.nombre || proyecto.convocatoria || 'Sin convocatoria',
      estado: proyecto.estado?.nombre || proyecto.estado || 'Sin estado',
      periodo: proyecto.periodo || '',
      fecha_actualizacion:
        proyecto.fecha_actualizacion ||
        proyecto.actualizado_en ||
        proyecto.fecha_modificacion ||
        proyecto.updated_at ||
        null
    }))
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
    errorProyectos.value = 'No fue posible cargar los proyectos.'
  } finally {
    cargandoProyectos.value = false
  }
}

// ========================================
// AL ABRIR LA VISTA
// ========================================

onMounted(() => {

  cargarProyectos()

})


// ========================================
// RESUMEN DE ESTADOS
// ========================================

const totalEnProceso =
  computed(() => {

    const estadosProceso =
      new Set([
        'En captura',
        'Sometido',
        'Con registro',
        'Financiado',
        'Informe pendiente',
        'Informe en deuda'
      ])

    return proyectos.value.filter(
      proyecto =>
        estadosProceso.has(
          proyecto.estado
        )
    ).length

  })


const totalLiberados =
  computed(() =>
    proyectos.value.filter(
      proyecto =>
        proyecto.estado ===
        'Liberado'
    ).length
  )


const totalRechazados =
  computed(() =>
    proyectos.value.filter(
      proyecto =>
        proyecto.estado ===
        'Rechazado'
    ).length
  )


// ========================================
// CONVERTIR FECHA PARA ORDENAMIENTO
// ========================================

const valorFecha = fecha => {

  if (!fecha) {
    return null
  }


  const texto =
    String(fecha)
      .trim()


  if (
    /[T\s]\d{2}:\d{2}/.test(
      texto
    )
  ) {

    const fechaNormalizada =
      texto.includes(' ') &&
        !texto.includes('T')
        ? texto.replace(
          ' ',
          'T'
        )
        : texto


    const fechaConvertida =
      new Date(
        fechaNormalizada
      )


    if (
      !Number.isNaN(
        fechaConvertida.getTime()
      )
    ) {

      return (
        fechaConvertida.getTime()
      )

    }

  }


  const coincidencia =
    texto.match(
      /^(\d{4})-(\d{2})-(\d{2})/
    )


  if (coincidencia) {

    return new Date(
      Number(coincidencia[1]),
      Number(coincidencia[2]) - 1,
      Number(coincidencia[3])
    ).getTime()

  }


  return null

}


// ========================================
// FILTRADO Y ORDENAMIENTO
// ========================================

const proyectosFiltrados =
  computed(() => {

    const textoProyecto =
      busqueda.value
        .trim()
        .toLowerCase()


    const textoConvocatoria =
      busquedaConvocatoriaProyecto
        .value
        .trim()
        .toLowerCase()


    const filtrados =
      proyectos.value.filter(
        proyecto => {

          const nombreProyecto =
            proyecto
              .nombre_proyecto
              .toLowerCase()


          const responsable =
            proyecto
              .responsable
              .toLowerCase()


          const nombreConvocatoria = proyecto.convocatoria.toLowerCase()


          const coincideProyecto =
            nombreProyecto.includes(
              textoProyecto
            ) ||
            responsable.includes(
              textoProyecto
            )


          const coincideConvocatoria =
            nombreConvocatoria.includes(
              textoConvocatoria
            )


          const coincideEstado =
            estadoSeleccionado.value ===
            'Todos los estados' ||
            proyecto.estado ===
            estadoSeleccionado.value


          return (
            coincideProyecto &&
            coincideConvocatoria &&
            coincideEstado
          )

        }
      )


    const resultado =
      [...filtrados]


    if (
      ordenSeleccionado.value ===
      'nombre-asc'
    ) {

      return resultado.sort(
        (a, b) =>
          a.nombre_proyecto.localeCompare(
            b.nombre_proyecto,
            'es'
          )
      )

    }


    if (
      ordenSeleccionado.value ===
      'nombre-desc'
    ) {

      return resultado.sort(
        (a, b) =>
          b.nombre_proyecto.localeCompare(
            a.nombre_proyecto,
            'es'
          )
      )

    }


    return resultado.sort(
      (a, b) => {

        const fechaA =
          valorFecha(
            a.fecha_actualizacion
          )


        const fechaB =
          valorFecha(
            b.fecha_actualizacion
          )


        if (
          fechaA === null &&
          fechaB === null
        ) {
          return 0
        }


        if (
          fechaA === null
        ) {
          return 1
        }


        if (
          fechaB === null
        ) {
          return -1
        }


        if (
          ordenSeleccionado.value ===
          'antiguos'
        ) {

          return (
            fechaA -
            fechaB
          )

        }


        return (
          fechaB -
          fechaA
        )

      }
    )

  })


// ========================================
// FORMATEAR FECHA
// ========================================

const formatearFecha =
  fecha => {

    if (!fecha) {
      return 'Sin fecha'
    }


    const texto =
      String(fecha)
        .trim()


    const coincidencia =
      texto.match(
        /^(\d{4})-(\d{2})-(\d{2})/
      )


    if (coincidencia) {

      const fechaLocal =
        new Date(
          Number(coincidencia[1]),
          Number(coincidencia[2]) - 1,
          Number(coincidencia[3])
        )


      return new Intl.DateTimeFormat(
        'es-MX',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      ).format(
        fechaLocal
      )

    }


    const fechaConvertida =
      new Date(
        fecha
      )


    if (
      Number.isNaN(
        fechaConvertida.getTime()
      )
    ) {
      return 'Sin fecha'
    }


    return new Intl.DateTimeFormat(
      'es-MX',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    ).format(
      fechaConvertida
    )

  }


// ========================================
// FORMATEAR HORA
// ========================================

const formatearHora =
  fecha => {

    if (!fecha) {
      return ''
    }


    const texto =
      String(fecha)
        .trim()


    const tieneHora =
      /[T\s]\d{2}:\d{2}/.test(
        texto
      )


    if (!tieneHora) {
      return ''
    }


    const fechaNormalizada =
      texto.includes(' ') &&
        !texto.includes('T')
        ? texto.replace(
          ' ',
          'T'
        )
        : texto


    const fechaConvertida =
      new Date(
        fechaNormalizada
      )


    if (
      Number.isNaN(
        fechaConvertida.getTime()
      )
    ) {
      return ''
    }


    return new Intl.DateTimeFormat(
      'es-MX',
      {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }
    ).format(
      fechaConvertida
    )

  }


// ========================================
// INICIALES DEL RESPONSABLE
// ========================================

const obtenerIniciales =
  nombre => {

    if (!nombre) {
      return '?'
    }


    const palabras =
      nombre
        .trim()
        .split(/\s+/)
        .filter(Boolean)


    if (
      palabras.length === 1
    ) {

      return palabras[0]
        .substring(0, 2)
        .toUpperCase()

    }


    return (
      palabras[0][0] +
      palabras[1][0]
    ).toUpperCase()

  }


// ========================================
// COLOR DEL ICONO DEL PROYECTO
// ========================================

const claseIconoProyecto =
  id => {

    const numero =
      Number(id) || 0


    const clases = [
      'icono-proyecto-verde',
      'icono-proyecto-azul',
      'icono-proyecto-celeste',
      'icono-proyecto-morado'
    ]


    return clases[
      Math.abs(numero) %
      clases.length
    ]

  }


// ========================================
// NAVEGACIÓN DE PROYECTOS
// ========================================

const verProyecto =
  id => {

    router.push({
      name: 'proyecto-detalle',

      params: {
        id
      }
    })

  }


const editarProyecto =
  id => {

    router.push({
      name: 'proyecto-editar',

      params: {
        id
      }
    })

  }


const nuevoProyecto = () => {

  router.push({
    name: 'proyecto-nuevo'
  })

}


// ========================================
// COLORES DE ESTADOS
// ========================================

const claseEstado =
  estado => {

    switch (estado) {

      case 'En captura':
        return 'estado-captura'


      case 'Sometido':
        return 'estado-sometido'


      case 'Con registro':
        return 'estado-registro'


      case 'Financiado':
        return 'estado-financiado'


      case 'Rechazado':
        return 'estado-rechazado'


      case 'Informe pendiente':
        return 'estado-informe-pendiente'


      case 'Informe en deuda':
        return 'estado-informe-deuda'


      case 'Liberado':
        return 'estado-liberado'


      default:
        return 'estado-default'

    }

  }

</script>



<style scoped>
/* ========================================
   CONFIGURACIÓN GENERAL
======================================== */

* {
  box-sizing: border-box;
}


.pagina {
  --azul-principal: #1269ee;
  --azul-profundo: #0a2058;
  --azul-texto: #17315d;
  --azul-secundario: #5875a6;
  --borde: #dce7f5;
  --borde-fuerte: #c9d9ed;
  --fondo-suave: #f7faff;
  --sombra: 0 5px 20px rgba(48, 84, 137, 0.045);
  --sombra-hover: 0 12px 28px rgba(48, 84, 137, 0.09);

  width: 100%;
  min-height: 100vh;

  padding:
    24px 26px 40px;

  background:
    radial-gradient(circle at 7% 3%,
      rgba(219, 234, 254, 0.75),
      transparent 25%),
    radial-gradient(circle at 94% 2%,
      rgba(219, 234, 254, 0.60),
      transparent 24%),
    #f7faff;

  color: #0b1f50;

  transition:
    background 0.25s ease,
    color 0.25s ease;
}


.contenido {
  width: 100%;
  max-width: 1650px;

  margin:
    0 auto;
}


/* ========================================
   CABECERA
======================================== */

.cabecera-pagina {
  position: relative;
  isolation: isolate;

  min-height: 168px;

  display: grid;

  grid-template-columns:
    minmax(340px, 1fr) minmax(300px, 0.55fr);

  align-items: center;

  gap: 42px;

  margin-bottom: 20px;

  padding:
    18px 20px;

  background:
    rgba(255,
      255,
      255,
      0.88);

  border:
    1px solid var(--borde);

  border-radius: 14px;

  box-shadow:
    var(--sombra);

  overflow: hidden;
}


.cabecera-pagina::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 470px;
  height: 190px;

  top: -104px;
  right: 9%;

  background:
    radial-gradient(circle,
      rgba(208, 228, 254, 0.52),
      rgba(208, 228, 254, 0.10) 62%,
      transparent 70%);

  border-radius: 50%;

  pointer-events: none;
}


.cabecera-pagina::after {
  content: '';

  position: absolute;
  z-index: -1;

  width: 170px;
  height: 170px;

  right: -62px;
  bottom: -94px;

  background:
    rgba(210,
      230,
      255,
      0.27);

  border-radius: 50%;

  pointer-events: none;
}


.cabecera-texto {
  position: relative;
  z-index: 2;

  min-width: 0;
}


.btn-regresar {
  min-height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding:
    0 15px;

  margin-bottom: 12px;

  background:
    linear-gradient(135deg,
      #ffffff,
      #eef5ff);

  color: #1264df;

  border:
    1px solid #bcd3f2;

  border-radius: 9px;

  box-shadow:
    0 4px 12px rgba(28,
      91,
      178,
      0.10);

  font-family: inherit;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}


.btn-regresar svg {
  width: 20px;
  height: 20px;
}


.btn-regresar:hover {
  color: white;

  background:
    linear-gradient(135deg,
      #247cff,
      #0960eb);

  border-color: #1569ee;

  box-shadow:
    0 7px 17px rgba(21,
      105,
      238,
      0.22);

  transform:
    translateX(-2px) translateY(-1px);
}


.btn-regresar:active {
  transform:
    translateX(0) translateY(0);
}


.btn-regresar:focus-visible {
  outline:
    3px solid rgba(30,
      111,
      240,
      0.18);

  outline-offset: 3px;
}


.subtitulo {
  margin:
    0 0 3px;

  color: #617eae;

  font-size: 14px;
}


.cabecera-pagina h1 {
  margin: 0;

  color: var(--azul-profundo);

  font-size: 34px;
  font-weight: 760;

  line-height: 1.15;

  letter-spacing: -0.5px;
}


.descripcion {
  max-width: 720px;

  margin:
    7px 0 0;

  color: var(--azul-secundario);

  font-size: 14px;

  line-height: 1.5;
}


.resumen-minimalista {
  width:
    min(100%,
      690px);

  display: grid;

  grid-template-columns:
    repeat(4,
      minmax(0, 1fr));

  gap: 8px;

  margin-top: 14px;
}


.mini-estadistica {
  --mini-color: #2473e8;
  --mini-fondo: #edf5ff;
  --mini-borde: #d8e7fa;

  position: relative;

  min-width: 0;
  min-height: 58px;

  display: flex;
  align-items: center;

  gap: 9px;

  padding:
    9px 11px;

  background:
    rgba(255,
      255,
      255,
      0.74);

  border:
    1px solid #dce8f6;

  border-radius: 10px;

  box-shadow:
    0 3px 11px rgba(48,
      84,
      137,
      0.035);

  overflow: hidden;

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.mini-estadistica:hover {
  transform:
    translateY(-2px);

  border-color:
    #c8daef;

  box-shadow:
    0 7px 16px rgba(48,
      84,
      137,
      0.075);
}


.mini-acento {
  position: absolute;

  top: 0;
  right: 0;
  left: 0;

  height: 2px;

  background:
    var(--mini-color);

  opacity: 0.82;
}


.mini-icono {
  width: 32px;
  height: 32px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    var(--mini-fondo);

  border:
    1px solid var(--mini-borde);

  border-radius: 8px;

  color:
    var(--mini-color);

  transition:
    transform 0.20s ease;
}


.mini-estadistica:hover .mini-icono {
  transform:
    scale(1.04);
}


.mini-icono svg {
  width: 18px;
  height: 18px;
}


.mini-dato {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 8px;
}


.mini-dato>strong {
  flex-shrink: 0;

  color: #112c61;

  font-size: 19px;
  font-weight: 780;

  line-height: 1;
}


.mini-dato>div {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 1px;
}


.mini-dato span {
  overflow: hidden;

  color: #496890;

  font-size: 10px;
  font-weight: 700;

  line-height: 1.15;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.mini-dato small {
  overflow: hidden;

  color: #8799b4;

  font-size: 8px;
  font-weight: 580;

  line-height: 1.15;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.mini-estadistica-azul {
  --mini-color: #2473e8;
  --mini-fondo: #eaf3ff;
  --mini-borde: #d7e7fb;
}


.mini-estadistica-amarilla {
  --mini-color: #d89a24;
  --mini-fondo: #fff5dc;
  --mini-borde: #f4e4ba;
}


.mini-estadistica-verde {
  --mini-color: #15946b;
  --mini-fondo: #e3f6ef;
  --mini-borde: #d0ecdf;
}


.mini-estadistica-roja {
  --mini-color: #df5363;
  --mini-fondo: #ffedf0;
  --mini-borde: #f5d9df;
}


/* ========================================
   ILUSTRACIÓN DE CABECERA
======================================== */

.cabecera-ilustracion {
  position: relative;
  isolation: isolate;

  justify-self: end;

  width: 330px;
  height: 136px;

  margin-right: 8px;
}


.cabecera-ilustracion::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 245px;
  height: 100px;

  right: 0;
  bottom: 0;

  background:
    radial-gradient(ellipse at center,
      rgba(166, 201, 247, 0.31),
      rgba(166, 201, 247, 0.05) 68%,
      transparent 73%);

  border-radius: 50%;

  transform:
    rotate(-7deg);
}


.orbita {
  position: absolute;

  display: block;

  border:
    1px solid rgba(96,
      149,
      220,
      0.16);

  border-radius: 50%;
}


.orbita-1 {
  width: 126px;
  height: 126px;

  right: 0;
  top: -14px;
}


.orbita-2 {
  width: 78px;
  height: 78px;

  right: 24px;
  top: 9px;

  border-style: dashed;

  opacity: 0.70;
}


.carpeta-ilustracion {
  position: absolute;

  width: 176px;
  height: 104px;

  left: 56px;
  bottom: 7px;

  background:
    linear-gradient(145deg,
      #bcd9ff,
      #8fbaf2);

  border:
    1px solid rgba(85,
      139,
      212,
      0.23);

  border-radius:
    12px 14px 16px 16px;

  box-shadow:
    0 14px 28px rgba(44,
      94,
      162,
      0.15);

  transform:
    rotate(-3deg);
}


.carpeta-pestana {
  position: absolute;

  width: 76px;
  height: 24px;

  left: 11px;
  top: -15px;

  background:
    linear-gradient(145deg,
      #c8e0ff,
      #9fc7fa);

  border:
    1px solid rgba(85,
      139,
      212,
      0.18);

  border-bottom: none;

  border-radius:
    9px 12px 0 0;
}


.documento {
  position: absolute;

  background:
    linear-gradient(180deg,
      #ffffff,
      #f7fbff);

  border:
    1px solid rgba(188,
      210,
      238,
      0.88);

  border-radius: 9px;

  box-shadow:
    0 8px 16px rgba(41,
      82,
      140,
      0.10);
}


.documento-1 {
  width: 94px;
  height: 73px;

  left: 16px;
  top: 15px;

  padding:
    17px 13px;

  transform:
    rotate(-8deg);
}


.documento-2 {
  width: 99px;
  height: 80px;

  right: 14px;
  top: 8px;

  padding:
    34px 12px 10px;

  transform:
    rotate(7deg);
}


.documento>span {
  display: block;

  width: 62px;
  height: 5px;

  margin-bottom: 8px;

  background:
    linear-gradient(90deg,
      #dbe9fb,
      #cfe1f8);

  border-radius: 999px;
}


.documento>.linea-corta {
  width: 40px;
}


.documento>.linea-media {
  width: 50px;
}


.check-documento {
  position: absolute;

  width: 25px;
  height: 25px;

  top: 8px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    #e1f4ed;

  border:
    1px solid #cdeadd;

  border-radius: 50%;

  color: #159267;
}


.check-documento svg {
  width: 15px;
  height: 15px;
}


.mini-grafica {
  position: absolute;

  right: 18px;
  bottom: 12px;

  width: 72px;
  height: 48px;

  display: flex;
  align-items: flex-end;

  gap: 5px;

  padding:
    8px 9px;

  background:
    rgba(255,
      255,
      255,
      0.87);

  border:
    1px solid #d6e5f7;

  border-radius: 9px;

  box-shadow:
    0 8px 18px rgba(46,
      88,
      148,
      0.09);

  transform:
    rotate(5deg);
}


.barra {
  width: 8px;

  display: block;

  background:
    linear-gradient(180deg,
      #69a7f8,
      #2879e8);

  border-radius:
    4px 4px 2px 2px;
}


.barra-1 {
  height: 12px;
}


.barra-2 {
  height: 20px;
}


.barra-3 {
  height: 28px;
}


.barra-4 {
  height: 17px;
}


.destello {
  position: absolute;

  display: block;

  border-radius: 50%;

  background: #78a9e9;

  opacity: 0.50;
}


.destello-1 {
  width: 7px;
  height: 7px;

  left: 22px;
  top: 12px;
}


.destello-2 {
  width: 4px;
  height: 4px;

  left: 9px;
  top: 33px;
}


.destello-3 {
  width: 5px;
  height: 5px;

  right: 11px;
  top: 18px;
}


/* ========================================
   PANEL PRINCIPAL
======================================== */

.panel-proyectos {
  position: relative;

  width: 100%;

  padding:
    20px 22px 22px;

  background:
    rgba(255,
      255,
      255,
      0.97);

  border:
    1px solid var(--borde);

  border-radius: 14px;

  box-shadow:
    0 8px 25px rgba(48,
      84,
      137,
      0.05),
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.78);

  overflow: hidden;
}


.panel-proyectos::before {
  content: '';

  position: absolute;

  width: 180px;
  height: 180px;

  right: -95px;
  top: -108px;

  background:
    radial-gradient(circle,
      rgba(213, 231, 255, 0.48),
      transparent 68%);

  border-radius: 50%;

  pointer-events: none;
}


/* ========================================
   ENCABEZADO DEL PANEL
======================================== */

.encabezado {
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  margin-bottom: 18px;

  padding-bottom: 18px;

  border-bottom:
    1px solid #edf2f8;
}


.titulo-proyectos {
  display: flex;
  align-items: center;

  gap: 14px;
}


.icono-titulo-proyectos {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(145deg,
      #e7f1ff,
      #d4e6ff);

  border:
    1px solid #d0e1f8;

  border-radius: 11px;

  color: var(--azul-principal);

  box-shadow:
    0 6px 15px rgba(34,
      88,
      166,
      0.07);
}


.icono-titulo-proyectos svg {
  width: 26px;
  height: 26px;
}


.encabezado h2 {
  margin: 0;

  color: var(--azul-profundo);

  font-size: 24px;
  font-weight: 750;

  letter-spacing: -0.25px;
}


.encabezado p {
  margin:
    4px 0 0;

  color: var(--azul-secundario);

  font-size: 13px;

  line-height: 1.45;
}


/* ========================================
   BOTÓN NUEVO
======================================== */

.btn-nuevo {
  min-height: 46px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  padding:
    0 20px;

  background:
    linear-gradient(135deg,
      #1974f6,
      #075ee9);

  color: white;

  border:
    1px solid rgba(5,
      84,
      205,
      0.08);

  border-radius: 9px;

  box-shadow:
    0 7px 17px rgba(17,
      103,
      235,
      0.19),
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.20);

  font-family: inherit;
  font-size: 14px;
  font-weight: 680;

  white-space: nowrap;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}


.btn-nuevo svg {
  width: 20px;
  height: 20px;
}


.btn-nuevo:hover {
  transform:
    translateY(-2px);

  filter:
    saturate(1.04);

  box-shadow:
    0 10px 22px rgba(17,
      103,
      235,
      0.25),
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.22);
}


/* ========================================
   FILTROS
======================================== */

.zona-filtros {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  margin-bottom: 12px;

  padding:
    12px;

  background:
    linear-gradient(180deg,
      #fbfdff,
      #f7faff);

  border:
    1px solid #e5edf7;

  border-radius: 12px;

  box-shadow:
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.82);
}


.filtros {
  display: flex;
  align-items: center;

  gap: 10px;

  flex: 1;

  min-width: 0;
}


.campo-filtro {
  position: relative;

  min-width: 0;
}


.campo-filtro-busqueda {
  flex:
    1 1 260px;

  max-width: 365px;
}


.campo-filtro-select {
  flex:
    0 1 225px;
}


.campo-filtro>svg {
  position: absolute;

  top: 50%;
  left: 14px;
  z-index: 2;

  width: 18px;
  height: 18px;

  transform:
    translateY(-50%);

  color: #6681ae;

  pointer-events: none;
}


.campo-filtro input,
.campo-filtro select,
.ordenar select {
  width: 100%;
  height: 42px;

  background: white;

  border:
    1px solid #ccd9ea;

  border-radius: 9px;

  color: #1b3260;

  font-family: inherit;
  font-size: 13px;

  outline: none;

  box-shadow:
    0 2px 7px rgba(47,
      80,
      130,
      0.025);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}


.campo-filtro input,
.campo-filtro select {
  padding-left: 42px;
}


.campo-filtro select {
  padding-right: 34px;
}


.campo-filtro input::placeholder {
  color: #8799b6;
}


.campo-filtro input:hover,
.campo-filtro select:hover,
.ordenar select:hover {
  border-color: #b7c9e1;
}


.campo-filtro input:focus,
.campo-filtro select:focus,
.ordenar select:focus {
  border-color: #2c78eb;

  box-shadow:
    0 0 0 3px rgba(32,
      112,
      238,
      0.08);
}


.ordenar {
  display: flex;
  align-items: center;

  gap: 9px;

  flex-shrink: 0;
}


.texto-ordenar {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  color: #617ba4;

  font-size: 12px;
  font-weight: 650;

  white-space: nowrap;
}


.texto-ordenar svg {
  width: 17px;
  height: 17px;

  color: #5e7fae;
}


.ordenar select {
  width: 155px;

  padding:
    0 31px 0 12px;
}


/* ========================================
   RESUMEN DE RESULTADOS
======================================== */

.resumen-resultados {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  margin:
    0 2px 12px;
}


.resultado-texto {
  display: flex;
  align-items: center;

  gap: 8px;
}


.resultado-icono {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    #edf5ff;

  border:
    1px solid #dceafa;

  border-radius: 8px;

  color: #4c79b9;
}


.resultado-icono svg {
  width: 15px;
  height: 15px;
}


.resultado-texto p {
  margin: 0;

  color: #6c81a5;

  font-size: 11px;
}


.resultado-texto strong {
  color: #244e89;

  font-weight: 750;
}


.btn-limpiar-filtros {
  min-height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding:
    0 11px;

  background:
    #f7faff;

  border:
    1px solid #d7e3f1;

  border-radius: 8px;

  color: #5474a2;

  font-family: inherit;
  font-size: 11px;
  font-weight: 650;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}


.btn-limpiar-filtros svg {
  width: 14px;
  height: 14px;
}


.btn-limpiar-filtros:hover {
  color: #1768dc;

  background: #edf5ff;

  border-color: #bfd6f1;

  transform:
    translateY(-1px);
}


/* ========================================
   TABLA
======================================== */

.tabla-contenedor {
  width: 100%;

  overflow: hidden;

  background: white;

  border:
    1px solid #dce6f2;

  border-radius: 12px;

  box-shadow:
    0 5px 15px rgba(39,
      73,
      127,
      0.035);
}


table {
  width: 100%;

  border-collapse: collapse;
}


thead {
  background:
    linear-gradient(180deg,
      #f8fafd,
      #f1f6fc);
}


th {
  padding:
    14px 14px;

  color: #16305f;

  border-bottom:
    1px solid #e0e8f2;

  font-size: 12px;
  font-weight: 720;

  text-align: left;

  letter-spacing: 0.16px;

  white-space: nowrap;
}


td {
  padding:
    13px 14px;

  border-bottom:
    1px solid #edf2f7;

  color: #3c557c;

  font-size: 12px;

  vertical-align: middle;
}


tbody tr {
  transition:
    background 0.18s ease;
}


tbody tr:last-child td {
  border-bottom: none;
}


tbody tr:hover {
  background:
    linear-gradient(90deg,
      #fbfdff,
      #f7faff);
}


/* ========================================
   CELDA PROYECTO
======================================== */

.celda-proyecto {
  display: flex;
  align-items: center;

  gap: 11px;

  min-width: 220px;
}


.icono-proyecto {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  box-shadow:
    inset 0 0 0 1px rgba(255,
      255,
      255,
      0.58);
}


.icono-proyecto svg {
  width: 21px;
  height: 21px;
}


.icono-proyecto-verde {
  background: #dff5eb;
  color: #0a9c6a;
}


.icono-proyecto-azul {
  background: #e3efff;
  color: #166ce9;
}


.icono-proyecto-celeste {
  background: #e3f5ff;
  color: #1592d4;
}


.icono-proyecto-morado {
  background: #f0e7ff;
  color: #7138e8;
}


.texto-proyecto,
.responsable-texto,
.convocatoria-tabla,
.fecha-proyecto {
  display: flex;
  flex-direction: column;

  gap: 3px;
}


.texto-proyecto strong {
  color: #0a2458;

  font-size: 13px;
  font-weight: 680;

  line-height: 1.25;
}


.texto-proyecto span,
.responsable-texto span,
.convocatoria-tabla span,
.fecha-proyecto span {
  color: #7186ac;

  font-size: 10px;
}


/* ========================================
   RESPONSABLE
======================================== */

.responsable {
  min-width: 170px;

  display: flex;
  align-items: center;

  gap: 9px;
}


.avatar {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(145deg,
      #e4f0ff,
      #d8eaff);

  border:
    2px solid rgba(255,
      255,
      255,
      0.95);

  border-radius: 50%;

  color: #3477cd;

  box-shadow:
    0 0 0 1px rgba(172,
      198,
      231,
      0.55),
    0 4px 10px rgba(40,
      78,
      137,
      0.05);

  font-size: 11px;
  font-weight: 750;
}


.responsable-texto strong,
.convocatoria-tabla strong,
.fecha-proyecto strong {
  color: #102653;

  font-size: 11px;
  font-weight: 650;
}


.convocatoria-tabla {
  min-width: 175px;
}


.fecha-proyecto {
  min-width: 175px;
}


/* ========================================
   ESTADOS
======================================== */

.estado {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  padding:
    6px 10px;

  border:
    1px solid rgba(255,
      255,
      255,
      0.72);

  border-radius: 999px;

  box-shadow:
    0 2px 6px rgba(35,
      73,
      126,
      0.035);

  font-size: 11px;
  font-weight: 620;

  white-space: nowrap;
}


.punto-estado {
  width: 7px;
  height: 7px;

  flex-shrink: 0;

  background: currentColor;

  border-radius: 50%;
}


.estado-captura {
  background: #e1f4ed;
  color: #07885e;
}


.estado-sometido {
  background: #e1ecff;
  color: #2168d6;
}


.estado-registro {
  background: #eee8ff;
  color: #7038db;
}


.estado-financiado {
  background: #dff6e9;
  color: #168153;
}


.estado-rechazado {
  background: #ffe3e6;
  color: #ed3548;
}


.estado-informe-pendiente {
  background: #fff0d9;
  color: #dc8010;
}


.estado-informe-deuda {
  background: #fce6ef;
  color: #bd2857;
}


.estado-liberado {
  background: #dff4f0;
  color: #087966;
}


.estado-default {
  background: #eef2f7;
  color: #5d6d85;
}


/* ========================================
   ACCIONES
======================================== */

.acciones {
  min-width: 172px;

  display: flex;
  align-items: center;

  gap: 7px;
}


.acciones button,
.acciones-movil button {
  min-height: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding:
    0 13px;

  border-radius: 8px;

  font-family: inherit;
  font-size: 11px;
  font-weight: 650;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.acciones button:hover,
.acciones-movil button:hover {
  transform:
    translateY(-1px);
}


.acciones button svg {
  width: 16px;
  height: 16px;
}


.btn-ver {
  background:
    linear-gradient(135deg,
      #1474f3,
      #075dde);

  color: white;

  border:
    1px solid #086af2;

  box-shadow:
    0 4px 10px rgba(8,
      106,
      242,
      0.14);
}


.btn-ver:hover {
  box-shadow:
    0 6px 13px rgba(8,
      106,
      242,
      0.20);
}


.btn-editar {
  background: white;
  color: #1358bf;

  border:
    1px solid #c9d9ed;
}


.btn-editar:hover {
  background: #f3f7fd;

  border-color: #9fbbe0;
}


/* ========================================
   MENSAJES
======================================== */

.sin-resultados {
  padding: 36px;

  color: #64799f;

  text-align: center;
}


.mensaje-error-proyectos {
  color: #b91c1c;
}


/* ========================================
   TARJETAS MÓVILES
======================================== */

.proyectos-movil {
  display: none;
}


.tarjeta-proyecto {
  width: 100%;

  padding: 17px;

  background:
    rgba(255,
      255,
      255,
      0.98);

  border:
    1px solid #dfe7f3;

  border-radius: 14px;

  box-shadow:
    0 7px 20px rgba(31,
      70,
      130,
      0.06);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.tarjeta-proyecto:hover {
  transform:
    translateY(-2px);

  border-color: #cadcef;

  box-shadow:
    0 11px 25px rgba(31,
      70,
      130,
      0.09);
}


.tarjeta-proyecto-superior {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 13px;
}


.icono-proyecto-movil {
  width: 42px;
  height: 42px;
}


.tarjeta-titulo {
  min-width: 0;
}


.tarjeta-titulo h3 {
  margin: 0;

  color: #0b2458;

  font-size: 15px;
  font-weight: 720;

  line-height: 1.35;
}


.tarjeta-titulo span {
  display: block;

  margin-top: 3px;

  color: #6b82aa;

  font-size: 11px;
}


.datos-proyecto-movil {
  display: flex;
  flex-direction: column;

  gap: 15px;

  margin-top: 16px;

  padding:
    15px 0;

  border-top:
    1px solid #e8edf5;

  border-bottom:
    1px solid #e8edf5;
}


.dato-movil {
  display: flex;
  flex-direction: column;

  gap: 6px;
}


.etiqueta-movil {
  color: #7186a9;

  font-size: 10px;
  font-weight: 650;

  text-transform: uppercase;

  letter-spacing: 0.045em;
}


.dato-movil strong {
  color: #102754;

  font-size: 13px;
  font-weight: 650;
}


.hora-actualizacion-movil {
  color: #7186ac;

  font-size: 11px;
}


.responsable-movil {
  min-width: 0;
}


.acciones-movil {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 10px;

  padding-top: 15px;
}


.acciones-movil button {
  width: 100%;
  min-height: 42px;
}


.sin-resultados-movil {
  padding:
    30px 20px;

  background: #f7f9fd;

  border:
    1px solid #e0e7f2;

  border-radius: 10px;

  color: #697fa4;

  text-align: center;

  font-size: 13px;
}


/* ========================================
   MODO OSCURO
======================================== */

.pagina.modo-oscuro {
  --azul-profundo: #edf5ff;
  --azul-texto: #dce9fb;
  --azul-secundario: #9eb2d4;
  --borde: #30445f;
  --borde-fuerte: #3b526f;

  background:
    radial-gradient(circle at 5% 0%,
      rgba(40, 82, 145, 0.25),
      transparent 28%),
    radial-gradient(circle at 97% 0%,
      rgba(38, 75, 132, 0.22),
      transparent 25%),
    linear-gradient(180deg,
      #101827 0%,
      #111b2d 48%,
      #0e1726 100%);

  color: #dbeafe;
}


.modo-oscuro .cabecera-pagina,
.modo-oscuro .panel-proyectos {
  background:
    rgba(22,
      34,
      53,
      0.94);

  border-color: #30445f;

  box-shadow:
    0 8px 24px rgba(0,
      0,
      0,
      0.14);
}


.modo-oscuro .cabecera-pagina::before {
  background:
    radial-gradient(circle,
      rgba(67, 108, 164, 0.18),
      rgba(67, 108, 164, 0.04) 62%,
      transparent 70%);
}


.modo-oscuro .cabecera-pagina::after,
.modo-oscuro .panel-proyectos::before {
  background:
    rgba(54,
      91,
      142,
      0.12);
}


.modo-oscuro .subtitulo {
  color: #91a8cc;
}


.modo-oscuro .cabecera-pagina h1,
.modo-oscuro .encabezado h2,
.modo-oscuro .texto-proyecto strong,
.modo-oscuro .responsable-texto strong,
.modo-oscuro .convocatoria-tabla strong,
.modo-oscuro .fecha-proyecto strong,
.modo-oscuro .tarjeta-titulo h3,
.modo-oscuro .dato-movil strong {
  color: #edf5ff;
}


.modo-oscuro .descripcion,
.modo-oscuro .encabezado p {
  color: #a5b7d5;
}


.modo-oscuro .mini-estadistica {
  background:
    rgba(25,
      40,
      62,
      0.78);

  border-color:
    #344b69;

  box-shadow:
    0 4px 12px rgba(0,
      0,
      0,
      0.10);
}


.modo-oscuro .mini-estadistica:hover {
  border-color:
    #456587;

  box-shadow:
    0 8px 18px rgba(0,
      0,
      0,
      0.18);
}


.modo-oscuro .mini-icono {
  background:
    rgba(35,
      55,
      82,
      0.92);

  border-color:
    rgba(83,
      112,
      151,
      0.42);
}


.modo-oscuro .mini-dato>strong {
  color: #edf5ff;
}


.modo-oscuro .mini-dato span {
  color: #b6cae5;
}


.modo-oscuro .mini-dato small {
  color: #7f95b4;
}


.modo-oscuro .btn-regresar {
  background:
    linear-gradient(135deg,
      #1b2a40,
      #17253a);

  border-color: #3a506f;

  color: #b9d4fa;

  box-shadow:
    0 4px 12px rgba(0,
      0,
      0,
      0.12);
}


.modo-oscuro .btn-regresar:hover {
  color: white;

  background:
    linear-gradient(135deg,
      #247cff,
      #0960eb);

  border-color: #4f8ff1;
}


.modo-oscuro .cabecera-ilustracion::before {
  background:
    radial-gradient(ellipse at center,
      rgba(75, 120, 181, 0.18),
      transparent 70%);
}


.modo-oscuro .orbita {
  border-color:
    rgba(111,
      159,
      221,
      0.20);
}


.modo-oscuro .carpeta-ilustracion {
  background:
    linear-gradient(145deg,
      #315982,
      #284d77);

  border-color: #3f668f;

  box-shadow:
    0 14px 28px rgba(0,
      0,
      0,
      0.22);
}


.modo-oscuro .carpeta-pestana {
  background:
    linear-gradient(145deg,
      #3b6897,
      #315a84);

  border-color: #466f9a;
}


.modo-oscuro .documento,
.modo-oscuro .mini-grafica {
  background:
    linear-gradient(180deg,
      #1b2b42,
      #17263b);

  border-color: #3a506f;
}


.modo-oscuro .documento>span {
  background:
    linear-gradient(90deg,
      #39526f,
      #314865);
}


.modo-oscuro .destello {
  background: #73a8e8;
}


.modo-oscuro .encabezado {
  border-color: #2c405c;
}


.modo-oscuro .icono-titulo-proyectos,
.modo-oscuro .resultado-icono {
  background:
    linear-gradient(145deg,
      #263c5e,
      #294a78);

  border-color: #36577f;

  color: #69a5ff;
}


.modo-oscuro .zona-filtros {
  background:
    linear-gradient(180deg,
      #162236,
      #142033);

  border-color: #2d415e;

  box-shadow:
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.02);
}


.modo-oscuro .campo-filtro input,
.modo-oscuro .campo-filtro select,
.modo-oscuro .ordenar select {
  background: #111c2e;

  border-color: #3b4d68;

  color: #eef5ff;

  color-scheme: dark;
}


.modo-oscuro .campo-filtro input::placeholder {
  color: #768aa9;
}


.modo-oscuro .campo-filtro>svg,
.modo-oscuro .texto-ordenar,
.modo-oscuro .texto-ordenar svg {
  color: #8197ba;
}


.modo-oscuro .campo-filtro input:focus,
.modo-oscuro .campo-filtro select:focus,
.modo-oscuro .ordenar select:focus {
  border-color: #5594f1;

  box-shadow:
    0 0 0 3px rgba(65,
      139,
      241,
      0.12);
}


.modo-oscuro .resultado-texto p {
  color: #91a7ca;
}


.modo-oscuro .resultado-texto strong {
  color: #b8d4fa;
}


.modo-oscuro .btn-limpiar-filtros {
  background: #17243a;

  border-color: #344a68;

  color: #9eb8dd;
}


.modo-oscuro .btn-limpiar-filtros:hover {
  background: #20324d;

  border-color: #47678e;

  color: #c4dbfa;
}


.modo-oscuro .tabla-contenedor {
  background: #131f31;

  border-color: #30425e;

  box-shadow:
    0 8px 22px rgba(0,
      0,
      0,
      0.13);
}


.modo-oscuro thead {
  background:
    linear-gradient(180deg,
      #1b2a40,
      #17243a);
}


.modo-oscuro th {
  color: #c5d7ef;

  border-color: #30425d;
}


.modo-oscuro td {
  color: #a8bad5;

  border-color: #243650;
}


.modo-oscuro tbody tr:hover {
  background:
    linear-gradient(90deg,
      #17253a,
      #152235);
}


.modo-oscuro .texto-proyecto span,
.modo-oscuro .responsable-texto span,
.modo-oscuro .convocatoria-tabla span,
.modo-oscuro .fecha-proyecto span,
.modo-oscuro .tarjeta-titulo span,
.modo-oscuro .etiqueta-movil,
.modo-oscuro .hora-actualizacion-movil {
  color: #879dbc;
}


.modo-oscuro .avatar {
  background:
    linear-gradient(145deg,
      #263c5e,
      #294a78);

  border-color: #1c2d46;

  color: #9bc2f4;

  box-shadow:
    0 0 0 1px #36577f;
}


.modo-oscuro .btn-editar {
  background: #18263b;

  border-color: #3a506d;

  color: #9fc5f5;
}


.modo-oscuro .btn-editar:hover {
  background: #20324d;

  border-color: #52739c;
}


.modo-oscuro .tarjeta-proyecto {
  background: #142033;

  border-color: #2e425e;

  box-shadow:
    0 8px 22px rgba(0,
      0,
      0,
      0.12);
}


.modo-oscuro .tarjeta-proyecto:hover {
  border-color: #45668e;

  box-shadow:
    0 12px 26px rgba(0,
      0,
      0,
      0.20);
}


.modo-oscuro .datos-proyecto-movil {
  border-color: #2b3d57;
}


.modo-oscuro .sin-resultados-movil {
  background: #162338;

  border-color: #30445f;

  color: #9eb2d4;
}




/* ========================================
   ESTADOS EN MODO OSCURO
   Fondos oscuros teñidos + texto de color
======================================== */

.modo-oscuro .estado {
  border-width: 1px;
  border-style: solid;

  box-shadow:
    inset 0 1px 0 rgba(255,
      255,
      255,
      0.025),
    0 2px 6px rgba(0,
      0,
      0,
      0.08);
}


.modo-oscuro .estado-captura {
  background:
    #173a35;

  border-color:
    #2c6258;

  color:
    #76cfba;
}


.modo-oscuro .estado-sometido {
  background:
    #18334f;

  border-color:
    #315c87;

  color:
    #7fb6f4;
}


.modo-oscuro .estado-registro {
  background:
    #143846;

  border-color:
    #2a6272;

  color:
    #6fd0e8;
}


.modo-oscuro .estado-financiado {
  background:
    #173a30;

  border-color:
    #2d6552;

  color:
    #78d2a6;
}


.modo-oscuro .estado-rechazado {
  background:
    #45252d;

  border-color:
    #6a3944;

  color:
    #f49aa6;
}


.modo-oscuro .estado-informe-pendiente {
  background:
    #47351f;

  border-color:
    #6c5130;

  color:
    #e9bd70;
}


.modo-oscuro .estado-informe-deuda {
  background:
    #442632;

  border-color:
    #673849;

  color:
    #e69ab6;
}


.modo-oscuro .estado-liberado {
  background:
    #173936;

  border-color:
    #2c625e;

  color:
    #72cfc5;
}


.modo-oscuro .estado-default {
  background:
    #263447;

  border-color:
    #40526a;

  color:
    #aabbd1;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 1250px) {

  .cabecera-pagina {
    grid-template-columns:
      minmax(320px, 1fr) minmax(260px, 0.48fr);

    gap: 28px;
  }


  .cabecera-ilustracion {
    width: 285px;

    transform:
      scale(0.92);

    transform-origin:
      right center;
  }


  .zona-filtros {
    align-items: flex-start;
    flex-direction: column;
  }


  .filtros {
    width: 100%;

    flex-wrap: wrap;
  }


  .campo-filtro-busqueda {
    max-width: none;

    flex:
      1 1 250px;
  }


  .campo-filtro-select {
    flex:
      1 1 220px;
  }


  .ordenar {
    align-self: flex-end;
  }


  .tabla-contenedor {
    overflow-x: auto;

    -webkit-overflow-scrolling:
      touch;
  }


  table {
    min-width: 1180px;
  }

}


@media (max-width: 900px) {

  .pagina {
    padding:
      22px 20px 35px;
  }


  .cabecera-pagina {
    grid-template-columns:
      1fr;

    min-height: 164px;
  }


  .cabecera-ilustracion {
    position: absolute;

    right: 12px;
    top: 10px;

    opacity: 0.17;

    pointer-events: none;
  }


  .cabecera-texto {
    max-width: 680px;
  }

}


@media (max-width: 700px) {

  .pagina {
    padding:
      18px 14px 30px;
  }


  .cabecera-pagina {
    padding: 16px;

    border-radius: 12px;
  }


  .cabecera-pagina h1 {
    font-size: 29px;
  }


  .descripcion {
    font-size: 13px;
  }


  .btn-regresar {
    min-height: 40px;

    font-size: 14px;
  }


  .cabecera-ilustracion {
    display: none;
  }


  .resumen-minimalista {
    width: 100%;

    grid-template-columns:
      repeat(2,
        minmax(0, 1fr));

    gap: 7px;
  }


  .mini-estadistica {
    min-height: 56px;

    padding:
      8px 9px;
  }


  .mini-dato>strong {
    font-size: 18px;
  }


  .panel-proyectos {
    padding:
      17px 14px;
  }


  .encabezado {
    flex-direction: column;

    align-items: stretch;

    gap: 15px;
  }


  .titulo-proyectos {
    align-items: center;
  }


  .icono-titulo-proyectos {
    width: 44px;
    height: 44px;
  }


  .encabezado h2 {
    font-size: 21px;
  }


  .encabezado p {
    font-size: 12px;
  }


  .btn-nuevo {
    width: 100%;
    min-height: 47px;
  }


  .zona-filtros {
    gap: 10px;
  }


  .filtros {
    flex-direction: column;

    width: 100%;

    gap: 9px;
  }


  .campo-filtro,
  .campo-filtro-busqueda,
  .campo-filtro-select {
    width: 100%;
    max-width: none;

    flex: none;
  }


  .campo-filtro input,
  .campo-filtro select {
    height: 47px;

    font-size: 16px;
  }


  .ordenar {
    width: 100%;

    flex-direction: column;

    align-items: stretch;

    gap: 6px;
  }


  .ordenar select {
    width: 100%;
    height: 47px;

    font-size: 16px;
  }


  .resumen-resultados {
    align-items: flex-start;

    flex-direction: column;
  }


  .btn-limpiar-filtros {
    align-self: flex-end;
  }


  .tabla-escritorio {
    display: none;
  }


  .proyectos-movil {
    display: flex;
    flex-direction: column;

    gap: 12px;
  }

}


@media (max-width: 420px) {

  .resumen-minimalista {
    grid-template-columns:
      1fr;
  }


  .mini-estadistica {
    min-height: 54px;
  }


  .pagina {
    padding:
      15px 10px 25px;
  }


  .cabecera-pagina {
    padding:
      14px 13px;
  }


  .cabecera-pagina h1 {
    font-size: 26px;
  }


  .panel-proyectos {
    padding:
      15px 11px;
  }


  .acciones-movil {
    grid-template-columns:
      1fr;
  }

}


/* ========================================
   ACCESIBILIDAD
======================================== */

@media (prefers-reduced-motion: reduce) {

  .btn-regresar,
  .mini-estadistica,
  .mini-icono,
  .btn-nuevo,
  .btn-limpiar-filtros,
  .acciones button,
  .acciones-movil button,
  .tarjeta-proyecto,
  tbody tr {
    transition: none !important;
  }


  .btn-regresar:hover,
  .mini-estadistica:hover,
  .mini-estadistica:hover .mini-icono,
  .btn-nuevo:hover,
  .btn-limpiar-filtros:hover,
  .acciones button:hover,
  .acciones-movil button:hover,
  .tarjeta-proyecto:hover {
    transform: none !important;
  }

}
</style>
