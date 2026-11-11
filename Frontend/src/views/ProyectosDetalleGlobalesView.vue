<template>
  <div
    class="pagina"
    :class="{ 'modo-oscuro': modoOscuro }"
  >
    <div class="contenido">

      <!-- ======================================== -->
      <!-- CABECERA DE LA VISTA -->
      <!-- ======================================== -->

      <header class="cabecera-pagina">

        <div class="cabecera-texto">

          <button
            type="button"
            class="btn-regresar"
            aria-label="Regresar a proyectos en los que participo"
            title="Regresar"
            @click="regresar"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Regresar
          </button>


          <p class="subtitulo">
            Concentrado del proyecto
          </p>

          <h1>
            {{
              !cargando && !error && proyecto.nombre
                ? proyecto.nombre
                : 'Detalle del proyecto'
            }}
          </h1>

          <p class="descripcion">
            Consulta la información consolidada, recursos y productos académicos del proyecto.
          </p>

        </div>


        <div
          class="cabecera-lateral"
          aria-hidden="true"
        >

          <span
            v-if="!cargando && !error"
            class="estado-proyecto estado-cabecera"
            :class="claseEstadoProyecto(proyecto.estado)"
          >
            <span class="punto-estado"></span>
            {{ proyecto.estado }}
          </span>


          <div class="ilustracion-detalle">

            <span class="orbita-detalle orbita-detalle-1"></span>
            <span class="orbita-detalle orbita-detalle-2"></span>

            <svg
              viewBox="0 0 300 145"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="carpetaDetalle"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#c7e0ff"
                  />
                  <stop
                    offset="100%"
                    stop-color="#8eb8ef"
                  />
                </linearGradient>

                <linearGradient
                  id="hojaDetalle"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#ffffff"
                  />
                  <stop
                    offset="100%"
                    stop-color="#f5faff"
                  />
                </linearGradient>

                <linearGradient
                  id="lupaDetalle"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#5ba0f8"
                  />
                  <stop
                    offset="100%"
                    stop-color="#176be2"
                  />
                </linearGradient>
              </defs>


              <!-- HALO -->
              <ellipse
                class="detalle-halo"
                cx="164"
                cy="89"
                rx="116"
                ry="47"
                fill="#dcecff"
                opacity=".55"
              />


              <!-- CARPETA -->
              <g
                class="detalle-carpeta"
                transform="translate(43 43) rotate(-4 81 43)"
              >
                <path
                  d="M8 10h58l13 13h77a10 10 0 0 1 10 10v57H8A10 10 0 0 1-2 80V20A10 10 0 0 1 8 10Z"
                  fill="url(#carpetaDetalle)"
                  stroke="#89b4ed"
                  stroke-width="1.2"
                />

                <path
                  d="M4 33h158a8 8 0 0 1 8 8v49H4Z"
                  fill="#9cc4f5"
                  opacity=".82"
                />
              </g>


              <!-- DOCUMENTO PRINCIPAL -->
              <g
                class="detalle-documento"
                transform="translate(87 19) rotate(5 57 49)"
              >
                <rect
                  x="0"
                  y="0"
                  width="115"
                  height="98"
                  rx="11"
                  fill="url(#hojaDetalle)"
                  stroke="#bfd7f5"
                  stroke-width="1.2"
                />

                <circle
                  cx="92"
                  cy="21"
                  r="11"
                  fill="#e2f4ec"
                  stroke="#c7e7da"
                  stroke-width="1"
                />

                <path
                  d="m87 21 3 3 7-8"
                  fill="none"
                  stroke="#15966a"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <rect
                  x="17"
                  y="22"
                  width="50"
                  height="7"
                  rx="3.5"
                  fill="#dceafb"
                />

                <rect
                  x="17"
                  y="42"
                  width="77"
                  height="6"
                  rx="3"
                  fill="#d7e6f9"
                />

                <rect
                  x="17"
                  y="59"
                  width="65"
                  height="6"
                  rx="3"
                  fill="#deebfa"
                />

                <rect
                  x="17"
                  y="76"
                  width="48"
                  height="6"
                  rx="3"
                  fill="#e3eefb"
                />
              </g>


              <!-- LUPA -->
              <g
                class="detalle-lupa"
                transform="translate(188 65)"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="#edf6ff"
                  stroke="url(#lupaDetalle)"
                  stroke-width="5"
                />

                <circle
                  cx="25"
                  cy="25"
                  r="13"
                  fill="#dcecff"
                  opacity=".58"
                />

                <path
                  d="M40 40 60 60"
                  fill="none"
                  stroke="#176be2"
                  stroke-width="8"
                  stroke-linecap="round"
                />

                <path
                  d="M15 18c5-6 13-7 20-3"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity=".76"
                />
              </g>


              <!-- DESTELLOS -->
              <circle
                class="detalle-destello"
                cx="42"
                cy="26"
                r="4"
                fill="#7caceb"
                opacity=".55"
              />

              <circle
                class="detalle-destello"
                cx="28"
                cy="45"
                r="2.4"
                fill="#9fc4f2"
                opacity=".52"
              />

              <circle
                class="detalle-destello"
                cx="268"
                cy="24"
                r="3.2"
                fill="#8eb9ee"
                opacity=".50"
              />
            </svg>

          </div>

        </div>

      </header>



      <!-- ======================================== -->
      <!-- CARGANDO -->
      <!-- ======================================== -->

      <div
        v-if="cargando"
        class="estado-pagina"
      >
        <div class="spinner"></div>

        <strong>
          Cargando proyecto...
        </strong>

        <span>
          Estamos preparando la información del proyecto.
        </span>
      </div>



      <!-- ======================================== -->
      <!-- ERROR -->
      <!-- ======================================== -->

      <div
        v-else-if="error"
        class="estado-pagina estado-pagina-error"
      >
        <div class="estado-pagina-icono">
          !
        </div>

        <h2>
          No fue posible mostrar el proyecto
        </h2>

        <p>
          {{ error }}
        </p>

        <button
          type="button"
          class="btn-volver-error"
          @click="regresar"
        >
          Volver a proyectos
        </button>
      </div>



      <!-- ======================================== -->
      <!-- CONTENIDO DEL PROYECTO -->
      <!-- ======================================== -->

      <template v-else>


        <!-- ======================================== -->
        <!-- DATOS GENERALES -->
        <!-- ======================================== -->

        <section class="resumen-general">

          <!-- RESPONSABLE -->
          <article class="dato dato-responsable">

            <div class="icono-dato">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="dato-contenido">
              <span class="etiqueta-dato">
                Responsable
              </span>

              <strong>
                {{ proyecto.responsable || 'Sin responsable' }}
              </strong>
            </div>

          </article>


          <span class="separador-dato"></span>


          <!-- COLABORADORES -->
          <article class="dato dato-colaboradores">

            <div class="icono-dato">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="9"
                  cy="8"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <circle
                  cx="16.5"
                  cy="9"
                  r="2.4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M3.8 18c.5-3.4 2.3-5.2 5.2-5.2s4.8 1.8 5.3 5.2M14 13.5c2.8.2 4.6 1.7 5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>


            <div class="dato-contenido">

              <span class="etiqueta-dato">
                Colaboradores
              </span>


              <div
                v-if="proyecto.colaboradores.length > 0"
                class="lista-colaboradores"
              >
                <div
                  v-for="(colaborador, index) in proyecto.colaboradores"
                  :key="`${colaborador}-${index}`"
                  class="colaborador-item"
                >
                  <span class="avatar-colaborador">
                    {{ obtenerIniciales(colaborador) }}
                  </span>

                  <strong>
                    {{ colaborador }}
                  </strong>
                </div>
              </div>


              <strong v-else>
                Sin colaboradores
              </strong>

            </div>

          </article>


          <span class="separador-dato"></span>


          <!-- CONVOCATORIA -->
          <article class="dato">

            <div class="icono-dato">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 11v2a2 2 0 0 0 2 2h2l1.5 5h2L10 15h1l7 3V6l-7 3H6a2 2 0 0 0-2 2z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 9v6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="dato-contenido">
              <span class="etiqueta-dato">
                Convocatoria
              </span>

              <strong>
                {{ proyecto.convocatoria || 'Sin convocatoria' }}
              </strong>
            </div>

          </article>


          <span class="separador-dato"></span>


          <!-- PERIODO -->
          <article class="dato">

            <div class="icono-dato">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="5.5"
                  width="16"
                  height="14"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M8 3.5v4M16 3.5v4M4 9.5h16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="dato-contenido">
              <span class="etiqueta-dato">
                Periodo
              </span>

              <strong>
                {{ proyecto.periodo || 'Sin periodo' }}
              </strong>
            </div>

          </article>

        </section>



        <!-- ======================================== -->
        <!-- RECURSOS HUMANOS -->
        <!-- ======================================== -->

        <section class="seccion">

          <div class="titulo-seccion">

            <div class="icono-seccion">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 9l9-5 9 5-9 5z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 12v4.5c2.7 2 7.3 2 10 0V12M20 10v6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>


            <div>
              <h2>
                Recursos humanos
              </h2>

              <p>
                Actividades de formación y participación relacionadas con el proyecto.
              </p>
            </div>

          </div>


          <!-- TABLA PARA PC Y TABLET -->
          <div class="tabla-contenedor tabla-recursos-escritorio">

            <table class="tabla-recursos">

              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nombre</th>
                  <th>Nombre de la actividad</th>
                  <th>Periodo</th>
                </tr>
              </thead>


              <tbody>

                <tr
                  v-for="recurso in recursosHumanos"
                  :key="recurso.id"
                >
                  <td>
                    {{ recurso.tipo || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ recurso.nombre || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ recurso.actividad || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ recurso.periodo || 'Sin especificar' }}
                  </td>
                </tr>


                <tr
                  v-if="recursosHumanos.length === 0"
                >
                  <td
                    colspan="4"
                    class="sin-registros"
                  >
                    <div class="sin-registros-contenido">

                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linejoin="round"
                        />
                      </svg>

                      No hay recursos humanos registrados.

                    </div>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>


          <!-- TARJETAS PARA CELULAR -->
          <div class="recursos-movil">

            <article
              v-for="(recurso, index) in recursosHumanos"
              :key="`recurso-movil-${recurso.id}`"
              class="tarjeta-movil"
            >

              <div class="encabezado-tarjeta-movil">

                <span class="numero-registro">
                  Recurso humano {{ index + 1 }}
                </span>

                <h3>
                  {{ recurso.nombre || 'Sin nombre' }}
                </h3>

              </div>


              <div class="datos-tarjeta-movil">

                <div class="dato-movil">
                  <span>Tipo</span>

                  <strong>
                    {{ recurso.tipo || 'Sin especificar' }}
                  </strong>
                </div>


                <div class="dato-movil">
                  <span>
                    Nombre de la actividad
                  </span>

                  <strong>
                    {{ recurso.actividad || 'Sin especificar' }}
                  </strong>
                </div>


                <div class="dato-movil">
                  <span>Periodo</span>

                  <strong>
                    {{ recurso.periodo || 'Sin especificar' }}
                  </strong>
                </div>

              </div>

            </article>


            <div
              v-if="recursosHumanos.length === 0"
              class="sin-registros-movil"
            >
              No hay recursos humanos registrados.
            </div>

          </div>

        </section>



        <!-- ======================================== -->
        <!-- PRODUCTOS ACADÉMICOS -->
        <!-- ======================================== -->

        <section class="seccion">

          <div class="titulo-seccion">

            <div class="icono-seccion">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 3.5V8h4M9 12h6M9 15.5h6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>


            <div>
              <h2>
                Productos académicos
              </h2>

              <p>
                Productos generados a partir del proyecto.
              </p>
            </div>

          </div>


          <!-- TABLA PARA PC Y TABLET -->
          <div class="tabla-contenedor tabla-productos-escritorio">

            <table class="tabla-productos">

              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nombre del producto</th>
                  <th>Dónde</th>
                  <th>Fecha de envío</th>
                  <th>Fecha de publicación</th>
                  <th>Estado</th>
                </tr>
              </thead>


              <tbody>

                <tr
                  v-for="producto in productosAcademicos"
                  :key="producto.id"
                >

                  <td>
                    {{ producto.tipo || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ producto.nombre || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ producto.donde || 'Sin especificar' }}
                  </td>

                  <td>
                    {{ formatearFecha(producto.fechaEnvio) }}
                  </td>

                  <td>
                    {{ formatearFecha(producto.fechaPublicacion) }}
                  </td>

                  <td>
                    <span
                      class="estado-producto"
                      :class="claseEstadoProducto(producto.estado)"
                    >
                      <span class="punto-estado"></span>
                      {{ producto.estado || 'Sin estado' }}
                    </span>
                  </td>

                </tr>


                <tr
                  v-if="productosAcademicos.length === 0"
                >
                  <td
                    colspan="6"
                    class="sin-registros"
                  >
                    <div class="sin-registros-contenido">

                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linejoin="round"
                        />
                      </svg>

                      No hay productos académicos registrados.

                    </div>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>


          <!-- PRODUCTOS PARA CELULAR -->
          <div class="productos-movil">

            <article
              v-for="(producto, index) in productosAcademicos"
              :key="`producto-movil-${producto.id}`"
              class="tarjeta-movil"
            >

              <div class="encabezado-producto-movil">

                <div class="producto-titulo-movil">

                  <span class="numero-registro">
                    Producto académico {{ index + 1 }}
                  </span>

                  <h3>
                    {{ producto.nombre || 'Sin nombre' }}
                  </h3>

                </div>


                <span
                  class="estado-producto"
                  :class="claseEstadoProducto(producto.estado)"
                >
                  <span class="punto-estado"></span>
                  {{ producto.estado || 'Sin estado' }}
                </span>

              </div>


              <div class="datos-tarjeta-movil">

                <div class="dato-movil">
                  <span>Tipo</span>

                  <strong>
                    {{ producto.tipo || 'Sin especificar' }}
                  </strong>
                </div>


                <div class="dato-movil">
                  <span>Dónde</span>

                  <strong>
                    {{ producto.donde || 'Sin especificar' }}
                  </strong>
                </div>


                <div class="dato-movil">
                  <span>
                    Fecha de envío
                  </span>

                  <strong>
                    {{ formatearFecha(producto.fechaEnvio) }}
                  </strong>
                </div>


                <div class="dato-movil">
                  <span>
                    Fecha de publicación
                  </span>

                  <strong>
                    {{ formatearFecha(producto.fechaPublicacion) }}
                  </strong>
                </div>

              </div>

            </article>


            <div
              v-if="productosAcademicos.length === 0"
              class="sin-registros-movil"
            >
              No hay productos académicos registrados.
            </div>

          </div>

        </section>

      </template>

    </div>
  </div>
</template>



<script setup>

import {
  ref,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'



// ========================================
// ROUTER
// ========================================

const router =
  useRouter()

const route =
  useRoute()




// ========================================
// TEMA GLOBAL DE LA PLATAFORMA
// ========================================

const {
  modoOscuro
} = useTema()



// ========================================
// ESTADOS DE CARGA
// ========================================

const cargando =
  ref(true)

const error =
  ref('')



// ========================================
// DATOS DEL PROYECTO
// ========================================

const proyecto =
  ref({

    id: null,

    nombre: '',

    responsable: '',

    colaboradores: [],

    convocatoria: '',

    periodo: '',

    estado: ''

  })



// ========================================
// RECURSOS HUMANOS
// ========================================

const recursosHumanos =
  ref([])



// ========================================
// PRODUCTOS ACADÉMICOS
// ========================================

const productosAcademicos =
  ref([])



// ========================================
// CARGAR PROYECTO DESDE EL BACKEND
// ========================================

const cargarProyecto = async idProyecto => {
  cargando.value = true
  error.value = ''

  try {
    const id = Number(idProyecto)
    if (!Number.isInteger(id) || id <= 0) throw new Error('El identificador del proyecto no es válido.')

    const respuesta = await apiFetch(`/proyectos/${id}`, { credentials: 'include' })
    const datos = await respuesta.json()

    if (!respuesta.ok) throw new Error(datos.mensaje || datos.error || 'No fue posible obtener el proyecto.')

    proyecto.value = {
      id: datos.generales.id,
      nombre: datos.generales.nombre_proyecto || '',
      responsable: datos.generales.responsable || '',
      colaboradores: Array.isArray(datos.colaboradores) ? datos.colaboradores.map(c => c.nombre_colaborador || c.nombre || c) : [],
      convocatoria: datos.generales.convocatoria_nombre || '',
      periodo: datos.generales.periodo || '',
      estado: datos.generales.estado_nombre || ''
    }

    recursosHumanos.value = Array.isArray(datos.recursosHumanos) ? datos.recursosHumanos.map(r => ({ id: r.id || Math.random(), tipo: r.tipo || '', nombre: r.nombre_participante || r.nombre || '', actividad: r.nombre_actividad || r.actividad || '', periodo: r.periodo || '' })) : []
    productosAcademicos.value = Array.isArray(datos.productos) ? datos.productos.map(p => ({ id: p.id || Math.random(), tipo: p.tipo || '', nombre: p.nombre_producto || p.nombre || '', donde: p.donde || p.lugar || '', fechaEnvio: p.fecha_envio || p.fechaEnvio || '', fechaPublicacion: p.fecha_publicacion || p.fechaPublicacion || '', estado: p.estado || 'En preparación' })) : []

  } catch (errorPeticion) {
    console.error('Error al cargar proyecto:', errorPeticion)
    error.value = errorPeticion.message || 'No fue posible cargar el proyecto.'
    proyecto.value = { id: null, nombre: '', responsable: '', colaboradores: [], convocatoria: '', periodo: '', estado: '' }
    recursosHumanos.value = []
    productosAcademicos.value = []
  } finally {
    cargando.value = false
  }
}



// ========================================
// CARGAR CUANDO CAMBIA EL ID
// ========================================

watch(

  () =>
    route.params.id,

  nuevoId => {

    cargarProyecto(
      nuevoId
    )

  },

  {
    immediate: true
  }

)



// ========================================
// FORMATEAR FECHA
// ========================================

const formatearFecha =
  fecha => {

    if (!fecha) {
      return 'Pendiente'
    }


    /*
      El backend puede devolver:

      2026-09-15

      o

      2026-09-15T06:00:00.000Z

      Tomamos YYYY-MM-DD directamente
      para evitar cambios accidentales
      por zona horaria.
    */

    const fechaTexto =
      String(fecha)
        .trim()
        .split('T')[0]
        .split(' ')[0]


    const partes =
      fechaTexto.split('-')


    if (
      partes.length !== 3
    ) {
      return fechaTexto
    }


    const [
      anio,
      mes,
      dia
    ] = partes


    const fechaLocal =
      new Date(
        Number(anio),
        Number(mes) - 1,
        Number(dia)
      )


    if (
      Number.isNaN(
        fechaLocal.getTime()
      )
    ) {
      return fechaTexto
    }


    return new Intl.DateTimeFormat(
      'es-MX',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    ).format(
      fechaLocal
    )

  }



// ========================================
// OBTENER INICIALES
// ========================================

const obtenerIniciales =
  nombre => {

    if (
      !nombre ||
      typeof nombre !== 'string'
    ) {
      return '?'
    }


    const palabras =
      nombre
        .trim()
        .split(/\s+/)
        .filter(Boolean)


    if (
      palabras.length === 0
    ) {
      return '?'
    }


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
// REGRESAR A PROYECTOS EN LOS QUE PARTICIPO
// ========================================

const regresar = () => {

  router.push(
    '/proyectos-globales'
  )

}



// ========================================
// COLOR DEL ESTADO DEL PROYECTO
// ========================================

const claseEstadoProyecto =
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



// ========================================
// COLOR DEL ESTADO DEL PRODUCTO
// ========================================

const claseEstadoProducto =
  estado => {

    switch (estado) {

      case 'En preparación':
        return 'producto-preparacion'


      case 'Enviado':
        return 'producto-enviado'


      case 'En revisión':
        return 'producto-revision'


      case 'Aceptado':
        return 'producto-aceptado'


      case 'Publicado':
        return 'producto-publicado'


      case 'Rechazado':
        return 'producto-rechazado'


      default:
        return 'producto-default'

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
  width: 100%;
  min-height: 100vh;

  padding:
    28px
    30px
    42px;

  background:
    radial-gradient(
      circle at 6% 0%,
      rgba(219, 234, 254, 0.72),
      transparent 27%
    ),
    radial-gradient(
      circle at 96% 7%,
      rgba(219, 234, 254, 0.58),
      transparent 24%
    ),
    #f7faff;

  color: #0b1f50;
}


.contenido {
  width: 100%;
  max-width: 1680px;

  margin:
    0
    auto;
}



/* ========================================
   BOTÓN REGRESAR
======================================== */

.btn-regresar {
  min-height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding:
    0
    15px;

  margin-bottom: 16px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #eef5ff
    );

  color: #1264df;

  border:
    1px solid
    #bcd3f2;

  border-radius: 9px;

  box-shadow:
    0 4px 12px
    rgba(
      28,
      91,
      178,
      0.09
    );

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
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #1569ee;

  box-shadow:
    0 7px 17px
    rgba(
      21,
      105,
      238,
      0.21
    );

  transform:
    translateX(-2px)
    translateY(-1px);
}



/* ========================================
   CARGANDO / ERROR
======================================== */

.estado-pagina {
  min-height: 230px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 32px;

  background: white;

  border:
    1px solid
    #dce6f3;

  border-radius: 13px;

  box-shadow:
    0 5px 18px
    rgba(
      48,
      84,
      137,
      0.05
    );

  text-align: center;
}


.estado-pagina strong,
.estado-pagina h2 {
  margin: 0;

  color: #17315d;

  font-size: 17px;
}


.estado-pagina span,
.estado-pagina p {
  margin: 0;

  color: #6d84a9;

  font-size: 14px;

  line-height: 1.5;
}


.spinner {
  width: 34px;
  height: 34px;

  margin-bottom: 7px;

  border:
    3px solid
    #dbe8f7;

  border-top-color: #176ef0;

  border-radius: 50%;

  animation:
    girar
    0.8s
    linear
    infinite;
}


@keyframes girar {

  to {
    transform:
      rotate(360deg);
  }

}


.estado-pagina-icono {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 5px;

  background: #ffe5e8;

  border-radius: 50%;

  color: #d93c49;

  font-size: 20px;
  font-weight: 800;
}


.btn-volver-error {
  min-height: 40px;

  margin-top: 12px;

  padding:
    0
    15px;

  background: white;

  color: #b52d38;

  border:
    1px solid
    #edb9bf;

  border-radius: 7px;

  font-family: inherit;
  font-size: 13px;
  font-weight: 650;

  cursor: pointer;
}



/* ========================================
   ENCABEZADO
======================================== */

.encabezado {
  position: relative;

  min-height: 126px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;

  margin-bottom: 18px;

  padding:
    14px
    28px
    16px
    3px;

  overflow: hidden;
}


.encabezado-informacion {
  position: relative;

  z-index: 2;

  min-width: 0;

  max-width: 900px;
}


.subtitulo {
  margin:
    0
    0
    4px;

  color: #4f6ea5;

  font-size: 15px;
}


.encabezado h1 {
  margin: 0;

  color: #0a2058;

  font-size: 38px;
  font-weight: 770;

  line-height: 1.16;

  letter-spacing: -0.7px;

  overflow-wrap: anywhere;
}


.descripcion {
  margin:
    7px
    0
    0;

  color: #5271a5;

  font-size: 16px;

  line-height: 1.45;
}


.estado-proyecto {
  position: relative;

  z-index: 3;

  display: inline-flex;
  align-items: center;

  gap: 8px;

  flex-shrink: 0;

  padding:
    9px
    18px;

  border-radius: 22px;

  font-size: 14px;
  font-weight: 650;

  white-space: nowrap;

  box-shadow:
    0 4px 11px
    rgba(
      52,
      86,
      139,
      0.06
    );
}


.encabezado-decoracion {
  position: absolute;

  right: -20px;
  bottom: -28px;

  width: 370px;
  height: 165px;

  opacity: 0.85;

  pointer-events: none;
}


.encabezado-decoracion::before {
  content: '';

  position: absolute;

  top: -65px;
  right: -80px;

  width: 330px;
  height: 150px;

  background:
    rgba(
      255,
      255,
      255,
      0.47
    );

  border-radius:
    0
    0
    0
    130px;

  transform:
    rotate(-8deg);
}


.encabezado-decoracion svg {
  position: relative;

  z-index: 1;

  width: 100%;
  height: 100%;
}



/* ========================================
   ESTADOS DEL PROYECTO
======================================== */

.punto-estado {
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  border-radius: 50%;

  background: currentColor;
}


.estado-captura {
  background: #eaf0f7;
  color: #5d769d;
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
   RESUMEN GENERAL
======================================== */

.resumen-general {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    1px
    minmax(0, 1.1fr)
    1px
    minmax(0, 1fr)
    1px
    minmax(0, 1fr);

  align-items: stretch;

  gap: 18px;

  margin-bottom: 20px;

  padding:
    22px
    24px;

  background:
    rgba(
      255,
      255,
      255,
      0.97
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 13px;

  box-shadow:
    0 5px 20px
    rgba(
      48,
      84,
      137,
      0.045
    );
}


.dato {
  min-width: 0;

  display: flex;
  align-items: flex-start;

  gap: 13px;
}


.icono-dato {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e7f1ff,
      #dceaff
    );

  border:
    1px solid
    #d6e6fb;

  border-radius: 10px;

  color: #1269ee;
}


.icono-dato svg {
  width: 27px;
  height: 27px;
}


.dato-contenido {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 5px;
}


.etiqueta-dato {
  color: #5876a5;

  font-size: 13.5px;
}


.dato-contenido > strong,
.colaborador-item strong {
  color: #0f285b;

  font-size: 14.5px;
  font-weight: 700;

  line-height: 1.45;

  overflow-wrap: anywhere;
}


.separador-dato {
  width: 1px;
  min-height: 60px;

  background: #d3deed;
}



/* ========================================
   COLABORADORES
======================================== */

.lista-colaboradores {
  display: flex;
  flex-direction: column;

  gap: 7px;
}


.colaborador-item {
  display: flex;
  align-items: center;

  gap: 8px;
}


.avatar-colaborador {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e4efff;

  border:
    1px solid
    #ccdef6;

  border-radius: 50%;

  color: #1768db;

  font-size: 9px;
  font-weight: 750;
}



/* ========================================
   SECCIONES
======================================== */

.seccion {
  margin-bottom: 18px;

  padding:
    19px
    20px
    20px;

  background:
    rgba(
      255,
      255,
      255,
      0.97
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 13px;

  box-shadow:
    0 5px 20px
    rgba(
      48,
      84,
      137,
      0.045
    );

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.seccion:hover {
  border-color: #d2e0f1;

  box-shadow:
    0 7px 22px
    rgba(
      48,
      84,
      137,
      0.06
    );
}


.titulo-seccion {
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 14px;
}


.icono-seccion {
  width: 46px;
  height: 46px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e6f1ff,
      #d8eaff
    );

  border:
    1px solid
    #d5e5f9;

  border-radius: 10px;

  color: #1269ee;
}


.icono-seccion svg {
  width: 26px;
  height: 26px;
}


.titulo-seccion h2 {
  margin: 0;

  color: #0a2058;

  font-size: 21px;
  font-weight: 750;
}


.titulo-seccion p {
  margin:
    3px
    0
    0;

  color: #607ca9;

  font-size: 14px;

  line-height: 1.45;
}



/* ========================================
   TABLAS
======================================== */

.tabla-contenedor {
  width: 100%;

  overflow-x: auto;
  overflow-y: hidden;

  background: white;

  border:
    1px solid
    #dce6f2;

  border-radius: 9px;

  -webkit-overflow-scrolling:
    touch;
}


table {
  width: 100%;

  border-collapse: collapse;
}


.tabla-recursos {
  min-width: 820px;
}


.tabla-productos {
  min-width: 1080px;
}


thead {
  background:
    linear-gradient(
      180deg,
      #f2f6fc,
      #edf3fa
    );
}


th,
td {
  padding:
    13px
    14px;

  text-align: left;

  border-bottom:
    1px solid
    #e2e9f3;
}


th {
  color: #17315d;

  font-size: 13px;
  font-weight: 730;

  white-space: nowrap;
}


td {
  color: #18335f;

  font-size: 13.5px;

  line-height: 1.5;

  vertical-align: middle;

  overflow-wrap: anywhere;
}


tbody tr:last-child td {
  border-bottom: none;
}


tbody tr:hover {
  background: #fbfdff;
}



/* ========================================
   BARRA DE DESPLAZAMIENTO
======================================== */

.tabla-contenedor::-webkit-scrollbar {
  height: 8px;
}


.tabla-contenedor::-webkit-scrollbar-track {
  background: #eef3f9;

  border-radius: 20px;
}


.tabla-contenedor::-webkit-scrollbar-thumb {
  background: #a7b9cf;

  border-radius: 20px;
}


.tabla-contenedor::-webkit-scrollbar-thumb:hover {
  background: #8ea4c0;
}



/* ========================================
   ESTADOS DE PRODUCTOS
======================================== */

.estado-producto {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  padding:
    7px
    12px;

  border-radius: 20px;

  font-size: 12.5px;
  font-weight: 650;

  white-space: nowrap;
}


.producto-preparacion {
  background: #eaf0f7;
  color: #5d769d;
}


.producto-enviado {
  background: #e1ecff;
  color: #2168d6;
}


.producto-revision {
  background: #fff0d9;
  color: #dc8010;
}


.producto-aceptado {
  background: #eee8ff;
  color: #7038db;
}


.producto-publicado {
  background: #dff6e9;
  color: #168153;
}


.producto-rechazado {
  background: #ffe3e6;
  color: #ed3548;
}


.producto-default {
  background: #eef2f7;
  color: #5d6d85;
}



/* ========================================
   SIN REGISTROS
======================================== */

.sin-registros {
  padding:
    28px
    20px;

  color: #6d84a8;

  text-align: center;
}


.sin-registros-contenido {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  font-size: 13px;
}


.sin-registros-contenido svg {
  width: 21px;
  height: 21px;

  color: #86a3cc;
}



/* ========================================
   TARJETAS PARA CELULAR
======================================== */

.recursos-movil,
.productos-movil {
  display: none;
}


.tarjeta-movil {
  width: 100%;

  padding: 17px;

  background: white;

  border:
    1px solid
    #dfe7f3;

  border-radius: 11px;

  box-shadow:
    0 3px 12px
    rgba(
      31,
      70,
      130,
      0.04
    );
}


.encabezado-tarjeta-movil {
  padding-bottom: 13px;

  margin-bottom: 15px;

  border-bottom:
    1px solid
    #e5ebf4;
}


.encabezado-tarjeta-movil h3 {
  margin:
    4px
    0
    0;

  color: #0f285b;

  font-size: 16px;

  line-height: 1.4;

  overflow-wrap: anywhere;
}


.numero-registro {
  color: #6b82a8;

  font-size: 12px;
}


.datos-tarjeta-movil {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


.dato-movil {
  display: flex;
  flex-direction: column;

  gap: 4px;
}


.dato-movil span {
  color: #6c83a8;

  font-size: 12px;
}


.dato-movil strong {
  color: #17315d;

  font-size: 14px;
  font-weight: 600;

  line-height: 1.45;

  overflow-wrap: anywhere;
}



/* ========================================
   PRODUCTO MÓVIL
======================================== */

.encabezado-producto-movil {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 12px;

  padding-bottom: 13px;

  margin-bottom: 15px;

  border-bottom:
    1px solid
    #e5ebf4;
}


.producto-titulo-movil {
  min-width: 0;

  flex: 1;
}


.producto-titulo-movil h3 {
  margin:
    4px
    0
    0;

  color: #0f285b;

  font-size: 16px;

  line-height: 1.4;

  overflow-wrap: anywhere;
}


.sin-registros-movil {
  padding:
    26px
    18px;

  background: #fbfdff;

  border:
    1px dashed
    #c7d8ed;

  border-radius: 9px;

  color: #6c84aa;

  font-size: 13px;

  text-align: center;
}



/* ========================================
   PC / LAPTOP MEDIANA
======================================== */

@media (max-width: 1350px) {

  .encabezado h1 {
    font-size: 34px;
  }


  .resumen-general {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 0;

    padding:
      18px
      20px;
  }


  .separador-dato {
    display: none;
  }


  .dato {
    min-height: 90px;

    padding:
      12px
      14px;
  }


  .dato:nth-of-type(1),
  .dato:nth-of-type(2) {
    border-bottom:
      1px solid
      #e4ebf4;
  }


  .dato:nth-of-type(1),
  .dato:nth-of-type(3) {
    border-right:
      1px solid
      #e4ebf4;
  }

}



/* ========================================
   TABLET
======================================== */

@media (max-width: 950px) {

  .pagina {
    padding:
      23px
      20px
      35px;
  }


  .encabezado {
    min-height: 140px;

    padding-right: 18px;
  }


  .encabezado-decoracion {
    opacity: 0.55;
  }


  .encabezado h1 {
    font-size: 31px;
  }


  .descripcion {
    font-size: 14px;
  }


  .resumen-general {
    grid-template-columns:
      1fr
      1fr;
  }


  .tabla-recursos {
    min-width: 800px;
  }


  .tabla-productos {
    min-width: 1040px;
  }

}



/* ========================================
   CELULAR
======================================== */

@media (max-width: 700px) {

  .pagina {
    padding:
      17px
      13px
      28px;
  }


  .btn-regresar {
    width: 100%;

    min-height: 46px;

    margin-bottom: 14px;

    font-size: 14px;
  }


  .encabezado {
    min-height: 0;

    flex-direction: column;
    align-items: flex-start;

    gap: 13px;

    padding:
      9px
      2px
      15px;
  }


  .encabezado-decoracion {
    display: none;
  }


  .encabezado h1 {
    font-size: 28px;
  }


  .subtitulo {
    font-size: 14px;
  }


  .descripcion {
    font-size: 13.5px;
  }


  .estado-proyecto {
    align-self: flex-start;

    padding:
      8px
      14px;

    font-size: 13px;
  }


  .resumen-general {
    grid-template-columns:
      1fr;

    gap: 0;

    padding:
      8px
      15px;

    border-radius: 11px;
  }


  .dato {
    min-height: 0;

    padding:
      15px
      0;

    border-right: none !important;

    border-bottom:
      1px solid
      #e3eaf4;
  }


  .dato:last-child {
    border-bottom: none;
  }


  .icono-dato {
    width: 44px;
    height: 44px;
  }


  .etiqueta-dato {
    font-size: 13px;
  }


  .dato-contenido > strong,
  .colaborador-item strong {
    font-size: 14px;
  }


  .seccion {
    padding:
      16px
      13px;

    border-radius: 11px;
  }


  .titulo-seccion {
    align-items: flex-start;
  }


  .titulo-seccion h2 {
    font-size: 19px;
  }


  .titulo-seccion p {
    font-size: 13px;
  }


  .icono-seccion {
    width: 42px;
    height: 42px;
  }


  .tabla-recursos-escritorio,
  .tabla-productos-escritorio {
    display: none;
  }


  .recursos-movil,
  .productos-movil {
    display: flex;
    flex-direction: column;

    gap: 12px;
  }


  .estado-pagina {
    min-height: 210px;

    padding:
      24px
      18px;
  }

}



/* ========================================
   CELULARES PEQUEÑOS
======================================== */

@media (max-width: 420px) {

  .pagina {
    padding:
      14px
      10px
      24px;
  }


  .encabezado h1 {
    font-size: 25px;
  }


  .resumen-general {
    padding:
      7px
      12px;
  }


  .dato {
    gap: 11px;
  }


  .icono-dato {
    width: 40px;
    height: 40px;
  }


  .icono-dato svg {
    width: 23px;
    height: 23px;
  }


  .seccion {
    padding:
      14px
      11px;
  }


  .tarjeta-movil {
    padding: 15px;
  }


  .encabezado-producto-movil {
    flex-direction: column;

    align-items: flex-start;
  }


  .estado-producto {
    align-self: flex-start;
  }

}



/* ========================================
   ACCESIBILIDAD
======================================== */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;

    transition-duration:
      0.01ms !important;

    animation-duration:
      0.01ms !important;

    animation-iteration-count:
      1 !important;
  }

}


/* ========================================
   MODO OSCURO - BASE GENERAL
   Comparte el tema seleccionado desde
   ProyectosView.vue mediante useTema.js
======================================== */

.pagina.modo-oscuro {
  background:
    radial-gradient(
      circle at 6% 0%,
      rgba(40, 82, 145, 0.25),
      transparent 28%
    ),
    radial-gradient(
      circle at 96% 7%,
      rgba(38, 75, 132, 0.22),
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #101827 0%,
      #111b2d 48%,
      #0e1726 100%
    );

  color: #dbeafe;
}


/* ========================================
   BOTÓN REGRESAR
======================================== */

.modo-oscuro .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #17253a,
      #1d304b
    );

  color: #8ebaff;

  border-color: #3a5577;

  box-shadow:
    0 5px 15px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);
}


.modo-oscuro .btn-regresar:hover {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #3985f4;

  box-shadow:
    0 8px 20px rgba(7, 89, 210, 0.28);
}


/* ========================================
   CARGANDO / ERROR
======================================== */

.modo-oscuro .estado-pagina {
  background:
    linear-gradient(
      180deg,
      #19263a,
      #162236
    );

  border-color: #2d405c;

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.025);
}


.modo-oscuro .estado-pagina strong,
.modo-oscuro .estado-pagina h2 {
  color: #edf5ff;
}


.modo-oscuro .estado-pagina span,
.modo-oscuro .estado-pagina p {
  color: #9eb2d2;
}


.modo-oscuro .spinner {
  border-color: #304563;
  border-top-color: #69a5ff;
}


.modo-oscuro .estado-pagina-icono {
  background: #4b2631;
  color: #ff8090;

  box-shadow:
    inset 0 0 0 1px rgba(255, 128, 144, 0.12);
}


.modo-oscuro .btn-volver-error {
  background: #1b293e;
  color: #ff9ba7;
  border-color: #71414a;
}


.modo-oscuro .btn-volver-error:hover {
  background: #2a3548;
  border-color: #96515e;
}


/* ========================================
   ENCABEZADO
======================================== */

.modo-oscuro .subtitulo {
  color: #9bb4da;
}


.modo-oscuro .encabezado h1 {
  color: #f1f5ff;

  text-shadow:
    0 4px 18px rgba(0, 0, 0, 0.24);
}


.modo-oscuro .descripcion {
  color: #9eb2d4;
}


/*
  Conservamos el dibujo de las montañas.
  En lugar de ocultarlo, cada capa recibe
  un tono oscuro distinto para mantener
  nieve, profundidad y siluetas.
*/

.modo-oscuro .encabezado-decoracion {
  opacity: 0.97;

  filter:
    drop-shadow(0 10px 14px rgba(0, 0, 0, 0.18));
}


.modo-oscuro .encabezado-decoracion::before {
  background:
    radial-gradient(
      ellipse at 68% 70%,
      rgba(75, 112, 164, 0.16),
      rgba(35, 54, 82, 0.08) 52%,
      transparent 72%
    );
}


.modo-oscuro .encabezado-decoracion circle {
  fill: #39597f;
}


.modo-oscuro .encabezado-decoracion path:nth-of-type(1) {
  fill: #263d5d;
}


.modo-oscuro .encabezado-decoracion path:nth-of-type(2) {
  fill: #31527c;
}


.modo-oscuro .encabezado-decoracion path:nth-of-type(3) {
  fill: #3b638f;
}


.modo-oscuro .encabezado-decoracion path:nth-of-type(4) {
  fill: #4a78aa;
}


.modo-oscuro .encabezado-decoracion path:nth-of-type(5),
.modo-oscuro .encabezado-decoracion path:nth-of-type(6) {
  fill: #b9d1ef;
}


/* ========================================
   ESTADOS DEL PROYECTO
======================================== */

.modo-oscuro .estado-proyecto,
.modo-oscuro .estado-producto {
  border:
    1px solid
    rgba(255, 255, 255, 0.08);

  box-shadow:
    0 4px 11px rgba(0, 0, 0, 0.13);
}


.modo-oscuro .estado-captura,
.modo-oscuro .producto-preparacion,
.modo-oscuro .estado-default,
.modo-oscuro .producto-default {
  background: #28374c;
  color: #afc0da;
}


.modo-oscuro .estado-sometido,
.modo-oscuro .producto-enviado {
  background: #20375b;
  color: #82b2ff;
}


.modo-oscuro .estado-registro,
.modo-oscuro .producto-aceptado {
  background: #382e59;
  color: #bda4ff;
}


.modo-oscuro .estado-financiado,
.modo-oscuro .producto-publicado {
  background: #1d4638;
  color: #73d9ae;
}


.modo-oscuro .estado-rechazado,
.modo-oscuro .producto-rechazado {
  background: #512932;
  color: #ff8d9b;
}


.modo-oscuro .estado-informe-pendiente,
.modo-oscuro .producto-revision {
  background: #503b21;
  color: #ffc46f;
}


.modo-oscuro .estado-informe-deuda {
  background: #4c293b;
  color: #f199bf;
}


.modo-oscuro .estado-liberado {
  background: #1d443f;
  color: #73d4c4;
}


/* ========================================
   RESUMEN GENERAL
======================================== */

.modo-oscuro .resumen-general {
  background:
    linear-gradient(
      180deg,
      rgba(25, 37, 57, 0.98),
      rgba(22, 34, 53, 0.98)
    );

  border-color: #2d405b;

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.17),
    inset 0 1px 0 rgba(255, 255, 255, 0.025);
}


.modo-oscuro .icono-dato {
  background:
    linear-gradient(
      145deg,
      #203654,
      #29486f
    );

  border-color: #355778;
  color: #69a6ff;

  box-shadow:
    0 6px 15px rgba(0, 0, 0, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);
}


.modo-oscuro .etiqueta-dato {
  color: #92a9ca;
}


.modo-oscuro .dato-contenido > strong,
.modo-oscuro .colaborador-item strong {
  color: #e6effb;
}


.modo-oscuro .separador-dato {
  background: #34455e;
}


.modo-oscuro .avatar-colaborador {
  background: #243d61;
  color: #78afff;
  border-color: #355578;

  box-shadow:
    0 0 0 1px rgba(76, 108, 153, 0.18);
}


/* Bordes usados por el resumen en laptops y móviles */
@media (max-width: 1350px) {

  .modo-oscuro .dato:nth-of-type(1),
  .modo-oscuro .dato:nth-of-type(2) {
    border-bottom-color: #314159;
  }


  .modo-oscuro .dato:nth-of-type(1),
  .modo-oscuro .dato:nth-of-type(3) {
    border-right-color: #314159;
  }

}


@media (max-width: 700px) {

  .modo-oscuro .dato {
    border-bottom-color: #314159;
  }

}


/* ========================================
   SECCIONES
======================================== */

.modo-oscuro .seccion {
  background:
    linear-gradient(
      180deg,
      rgba(25, 37, 57, 0.98),
      rgba(22, 34, 53, 0.98)
    );

  border-color: #2d405b;

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.17),
    inset 0 1px 0 rgba(255, 255, 255, 0.025);
}


.modo-oscuro .seccion:hover {
  border-color: #3a5273;

  box-shadow:
    0 13px 32px rgba(0, 0, 0, 0.23),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}


.modo-oscuro .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #203654,
      #29486f
    );

  border-color: #355778;
  color: #69a6ff;

  box-shadow:
    0 6px 15px rgba(0, 0, 0, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.035);
}


.modo-oscuro .titulo-seccion h2 {
  color: #edf5ff;
}


.modo-oscuro .titulo-seccion p {
  color: #96acce;
}


/* ========================================
   TABLAS
======================================== */

.modo-oscuro .tabla-contenedor {
  background: #111b2c;
  border-color: #304159;

  box-shadow:
    0 5px 15px rgba(0, 0, 0, 0.15);
}


.modo-oscuro table {
  background: #111b2c;
}


.modo-oscuro thead {
  background:
    linear-gradient(
      180deg,
      #202d41,
      #1b283b
    );
}


.modo-oscuro th {
  color: #dce9f9;
  border-bottom-color: #33445b;
}


.modo-oscuro td {
  color: #cedaeb;
  border-bottom-color: #29384d;
}


.modo-oscuro tbody tr:hover {
  background:
    linear-gradient(
      90deg,
      #18253a,
      #1a2940
    );
}


/* ========================================
   BARRA DE DESPLAZAMIENTO
======================================== */

.modo-oscuro .tabla-contenedor::-webkit-scrollbar-track {
  background: #172236;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb {
  background: #43556f;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb:hover {
  background: #566b88;
}


/* ========================================
   SIN REGISTROS
======================================== */

.modo-oscuro .sin-registros {
  color: #94a8c7;
}


.modo-oscuro .sin-registros-contenido svg {
  color: #7495c1;
}


.modo-oscuro .sin-registros-movil {
  background:
    linear-gradient(
      180deg,
      #172439,
      #152136
    );

  border-color: #3c506c;
  color: #93a8c8;
}


/* ========================================
   TARJETAS PARA CELULAR
======================================== */

.modo-oscuro .tarjeta-movil {
  background:
    linear-gradient(
      180deg,
      #172439,
      #152136
    );

  border-color: #2d4059;

  box-shadow:
    0 7px 20px rgba(0, 0, 0, 0.17);
}


.modo-oscuro .encabezado-tarjeta-movil,
.modo-oscuro .encabezado-producto-movil {
  border-bottom-color: #304159;
}


.modo-oscuro .encabezado-tarjeta-movil h3,
.modo-oscuro .producto-titulo-movil h3 {
  color: #edf4ff;
}


.modo-oscuro .numero-registro,
.modo-oscuro .dato-movil span {
  color: #90a5c5;
}


.modo-oscuro .dato-movil strong {
  color: #dce8f7;
}


/* ========================================
   DETALLES FINALES Y CONTRASTE
======================================== */

.modo-oscuro .punto-estado {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.035);
}


.modo-oscuro .estado-proyecto:hover,
.modo-oscuro .estado-producto:hover {
  filter: brightness(1.08);
}


.modo-oscuro .resumen-general,
.modo-oscuro .seccion,
.modo-oscuro .estado-pagina,
.modo-oscuro .tarjeta-movil {
  backdrop-filter: blur(2px);
}




/* ==========================================================
   REFINAMIENTO VISUAL 2026
   Consistente con ProyectoNuevo, ProyectoEditar,
   MisProyectos y Convocatorias.
========================================================== */


/* ========================================
   PÁGINA
======================================== */

.pagina {
  padding:
    24px
    26px
    40px;

  background:
    radial-gradient(
      circle at 7% 3%,
      rgba(219, 234, 254, 0.75),
      transparent 25%
    ),
    radial-gradient(
      circle at 94% 2%,
      rgba(219, 234, 254, 0.60),
      transparent 24%
    ),
    #f7faff;

  transition:
    background 0.25s ease,
    color 0.25s ease;
}


.contenido {
  max-width: 1650px;
}


/* ========================================
   CABECERA DE LA VISTA
======================================== */

.cabecera-pagina {
  position: relative;
  isolation: isolate;

  min-height: 178px;

  display: grid;

  grid-template-columns:
    minmax(360px, 1fr)
    minmax(330px, 0.58fr);

  align-items: center;

  gap: 42px;

  margin-bottom: 20px;

  padding:
    18px
    20px;

  background:
    rgba(
      255,
      255,
      255,
      0.88
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 14px;

  box-shadow:
    0 5px 20px
    rgba(
      48,
      84,
      137,
      0.045
    );

  overflow: hidden;
}


.cabecera-pagina::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 480px;
  height: 200px;

  top: -112px;
  right: 9%;

  background:
    radial-gradient(
      circle,
      rgba(208, 228, 254, 0.52),
      rgba(208, 228, 254, 0.10) 62%,
      transparent 70%
    );

  border-radius: 50%;

  pointer-events: none;
}


.cabecera-pagina::after {
  content: '';

  position: absolute;
  z-index: -1;

  width: 175px;
  height: 175px;

  right: -66px;
  bottom: -96px;

  background:
    rgba(
      210,
      230,
      255,
      0.27
    );

  border-radius: 50%;

  pointer-events: none;
}


.cabecera-texto {
  position: relative;
  z-index: 3;

  min-width: 0;
}


.cabecera-texto .subtitulo {
  margin:
    0
    0
    3px;

  color: #617eae;

  font-size: 14px;
}


.cabecera-texto h1 {
  margin: 0;

  color: #0a2058;

  font-size: 34px;
  font-weight: 760;

  line-height: 1.15;

  letter-spacing: -0.5px;

  overflow-wrap: anywhere;
}


.cabecera-texto .descripcion {
  max-width: 740px;

  margin:
    7px
    0
    0;

  color: #5875a6;

  font-size: 14px;

  line-height: 1.5;
}


/* ========================================
   BOTÓN REGRESAR
   Igual al resto de la plataforma
======================================== */

.btn-regresar {
  min-height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding:
    0
    15px;

  margin-bottom: 12px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #eef5ff
    );

  color: #1264df;

  border:
    1px solid
    #bcd3f2;

  border-radius: 9px;

  box-shadow:
    0 4px 12px
    rgba(
      28,
      91,
      178,
      0.10
    );

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
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #1569ee;

  box-shadow:
    0 7px 17px
    rgba(
      21,
      105,
      238,
      0.22
    );

  transform:
    translateX(-2px)
    translateY(-1px);
}


.btn-regresar:active {
  transform:
    translateX(0)
    translateY(0);
}


.btn-regresar:focus-visible {
  outline:
    3px solid
    rgba(
      30,
      111,
      240,
      0.18
    );

  outline-offset: 3px;
}


/* ========================================
   LATERAL DE LA CABECERA
======================================== */

.cabecera-lateral {
  position: relative;

  justify-self: end;

  width: 340px;
  height: 142px;
}


.estado-cabecera {
  position: absolute;
  z-index: 5;

  top: 7px;
  right: 12px;

  padding:
    7px
    13px;

  font-size: 11px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.76
    );

  box-shadow:
    0 4px 12px
    rgba(
      43,
      79,
      133,
      0.08
    );
}


.ilustracion-detalle {
  position: absolute;

  inset: 0;

  pointer-events: none;
}


.ilustracion-detalle::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 255px;
  height: 103px;

  right: 2px;
  bottom: 3px;

  background:
    radial-gradient(
      ellipse at center,
      rgba(166, 201, 247, 0.31),
      rgba(166, 201, 247, 0.05) 68%,
      transparent 73%
    );

  border-radius: 50%;

  transform:
    rotate(-7deg);
}


.ilustracion-detalle svg {
  position: absolute;

  right: 0;
  bottom: -3px;

  width: 312px;
  height: 151px;

  overflow: visible;

  filter:
    drop-shadow(
      0 9px 14px
      rgba(
        49,
        94,
        158,
        0.08
      )
    );
}


.orbita-detalle {
  position: absolute;
  z-index: -1;

  display: block;

  border:
    1px solid
    rgba(
      96,
      149,
      220,
      0.16
    );

  border-radius: 50%;
}


.orbita-detalle-1 {
  width: 122px;
  height: 122px;

  right: 0;
  top: 0;
}


.orbita-detalle-2 {
  width: 77px;
  height: 77px;

  right: 23px;
  top: 22px;

  border-style: dashed;

  opacity: 0.70;
}


.detalle-carpeta,
.detalle-documento,
.detalle-lupa {
  transform-box: fill-box;
  transform-origin: center;

  transition:
    transform 0.22s ease;
}


.cabecera-pagina:hover .detalle-carpeta {
  transform:
    translateY(-1px)
    rotate(-0.6deg);
}


.cabecera-pagina:hover .detalle-documento {
  transform:
    translateY(-2px)
    rotate(0.8deg);
}


.cabecera-pagina:hover .detalle-lupa {
  transform:
    translateX(2px)
    translateY(-1px);
}


/* ========================================
   CARGANDO / ERROR
======================================== */

.estado-pagina {
  min-height: 240px;

  border-radius: 14px;

  box-shadow:
    0 7px 22px
    rgba(
      48,
      84,
      137,
      0.055
    );
}


/* ========================================
   RESUMEN GENERAL
======================================== */

.resumen-general {
  position: relative;

  border-radius: 14px;

  box-shadow:
    0 6px 21px
    rgba(
      48,
      84,
      137,
      0.045
    );

  overflow: hidden;

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.resumen-general::before {
  content: '';

  position: absolute;

  width: 160px;
  height: 160px;

  top: -102px;
  right: -82px;

  background:
    radial-gradient(
      circle,
      rgba(
        213,
        231,
        255,
        0.40
      ),
      transparent 69%
    );

  border-radius: 50%;

  pointer-events: none;
}


.resumen-general:hover {
  transform:
    translateY(-1px);

  border-color: #cadcf0;

  box-shadow:
    0 10px 25px
    rgba(
      48,
      84,
      137,
      0.075
    );
}


.icono-dato {
  border-radius: 10px;

  box-shadow:
    0 5px 13px
    rgba(
      34,
      88,
      166,
      0.06
    );

  transition:
    transform 0.20s ease;
}


.resumen-general:hover .icono-dato {
  transform:
    scale(1.035);
}


/* ========================================
   SECCIONES
======================================== */

.seccion {
  position: relative;

  margin-bottom: 15px;

  padding:
    19px
    19px
    17px;

  border-radius: 14px;

  box-shadow:
    0 5px 19px
    rgba(
      48,
      84,
      137,
      0.045
    );

  overflow: hidden;

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.seccion::before {
  content: '';

  position: absolute;

  width: 150px;
  height: 150px;

  top: -96px;
  right: -78px;

  background:
    radial-gradient(
      circle,
      rgba(
        213,
        231,
        255,
        0.42
      ),
      transparent 69%
    );

  border-radius: 50%;

  pointer-events: none;
}


.seccion:hover {
  transform:
    translateY(-1px);

  border-color: #cadcf0;

  box-shadow:
    0 9px 23px
    rgba(
      48,
      84,
      137,
      0.075
    );
}


.icono-seccion {
  border-radius: 10px;

  box-shadow:
    0 5px 13px
    rgba(
      34,
      88,
      166,
      0.06
    );

  transition:
    transform 0.20s ease;
}


.seccion:hover .icono-seccion {
  transform:
    scale(1.035);
}


.titulo-seccion h2 {
  color: #0a2058;
}


.titulo-seccion p {
  color: #617da9;
}


/* ========================================
   TABLAS
======================================== */

.tabla-contenedor {
  border-radius: 10px;

  box-shadow:
    0 4px 13px
    rgba(
      39,
      73,
      127,
      0.03
    );
}


thead {
  background:
    linear-gradient(
      180deg,
      #f7fafd,
      #f0f5fb
    );
}


tbody tr {
  transition:
    background 0.18s ease;
}


/* ========================================
   TARJETAS MÓVILES
======================================== */

.tarjeta-movil {
  border-radius: 14px;

  box-shadow:
    0 6px 18px
    rgba(
      31,
      70,
      130,
      0.055
    );

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.tarjeta-movil:hover {
  transform:
    translateY(-2px);

  border-color: #cadcef;

  box-shadow:
    0 10px 24px
    rgba(
      31,
      70,
      130,
      0.085
    );
}


/* ========================================
   ESTADOS EN MODO OSCURO
======================================== */

.modo-oscuro .estado-proyecto,
.modo-oscuro .estado-producto {
  border-width: 1px;
  border-style: solid;
}


.modo-oscuro .estado-captura {
  background: #263447;
  border-color: #40526a;
  color: #aabbd1;
}


.modo-oscuro .estado-sometido {
  background: #18334f;
  border-color: #315c87;
  color: #7fb6f4;
}


.modo-oscuro .estado-registro {
  background: #143846;
  border-color: #2a6272;
  color: #6fd0e8;
}


.modo-oscuro .estado-financiado {
  background: #173a30;
  border-color: #2d6552;
  color: #78d2a6;
}


.modo-oscuro .estado-rechazado {
  background: #45252d;
  border-color: #6a3944;
  color: #f49aa6;
}


.modo-oscuro .estado-informe-pendiente {
  background: #47351f;
  border-color: #6c5130;
  color: #e9bd70;
}


.modo-oscuro .estado-informe-deuda {
  background: #442632;
  border-color: #673849;
  color: #e69ab6;
}


.modo-oscuro .estado-liberado {
  background: #173936;
  border-color: #2c625e;
  color: #72cfc5;
}


/* ========================================
   MODO OSCURO: CABECERA Y DETALLES
======================================== */

.pagina.modo-oscuro {
  background:
    radial-gradient(
      circle at 5% 0%,
      rgba(40, 82, 145, 0.25),
      transparent 28%
    ),
    radial-gradient(
      circle at 97% 0%,
      rgba(38, 75, 132, 0.22),
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #101827 0%,
      #111b2d 48%,
      #0e1726 100%
    );
}


.modo-oscuro .cabecera-pagina {
  background:
    rgba(
      22,
      34,
      53,
      0.94
    );

  border-color: #30445f;

  box-shadow:
    0 8px 22px
    rgba(
      0,
      0,
      0,
      0.12
    );
}


.modo-oscuro .cabecera-pagina::before {
  background:
    radial-gradient(
      circle,
      rgba(67, 108, 164, 0.18),
      rgba(67, 108, 164, 0.04) 62%,
      transparent 70%
    );
}


.modo-oscuro .cabecera-pagina::after {
  background:
    rgba(
      54,
      91,
      142,
      0.12
    );
}


.modo-oscuro .cabecera-texto .subtitulo {
  color: #91a8cc;
}


.modo-oscuro .cabecera-texto h1 {
  color: #edf5ff;

  text-shadow: none;
}


.modo-oscuro .cabecera-texto .descripcion {
  color: #a5b7d5;
}


.modo-oscuro .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #1b2a40,
      #17253a
    );

  border-color: #3a506f;

  color: #b9d4fa;

  box-shadow:
    0 4px 12px
    rgba(
      0,
      0,
      0,
      0.12
    );
}


.modo-oscuro .btn-regresar:hover {
  color: white;

  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #4f8ff1;
}


.modo-oscuro .ilustracion-detalle::before {
  background:
    radial-gradient(
      ellipse at center,
      rgba(75, 120, 181, 0.18),
      transparent 70%
    );
}


.modo-oscuro .orbita-detalle {
  border-color:
    rgba(
      111,
      159,
      221,
      0.20
    );
}


.modo-oscuro .detalle-halo {
  fill: #29486f;

  opacity: .50;
}


.modo-oscuro .detalle-carpeta path:first-child {
  fill: #315982;
  stroke: #4976a6;
}


.modo-oscuro .detalle-carpeta path:nth-child(2) {
  fill: #416f9f;
}


.modo-oscuro .detalle-documento rect:first-child {
  fill: #1c2d45;
  stroke: #46617f;
}


.modo-oscuro .detalle-documento rect:not(:first-child) {
  fill: #39516e;
}


.modo-oscuro .detalle-documento circle {
  fill: #1d4438;
  stroke: #326654;
}


.modo-oscuro .detalle-documento path {
  stroke: #78d2a6;
}


.modo-oscuro .detalle-lupa circle:first-child {
  fill: #1d314d;
  stroke: #5d99e6;
}


.modo-oscuro .detalle-lupa circle:nth-child(2) {
  fill: #345577;
}


.modo-oscuro .detalle-lupa path:nth-of-type(1) {
  stroke: #5d99e6;
}


.modo-oscuro .detalle-destello {
  fill: #78a9e8;
}


.modo-oscuro .resumen-general:hover,
.modo-oscuro .seccion:hover,
.modo-oscuro .tarjeta-movil:hover {
  border-color: #45668e;
}


/* ========================================
   RESPONSIVE DEL REFINAMIENTO
======================================== */

@media (max-width: 1050px) {

  .cabecera-pagina {
    grid-template-columns:
      1fr;

    min-height: 170px;
  }


  .cabecera-lateral {
    position: absolute;

    right: 16px;
    top: 10px;

    opacity: .19;

    pointer-events: none;
  }


  .cabecera-texto {
    max-width: 720px;
  }


  .estado-cabecera {
    display: none;
  }

}


@media (max-width: 700px) {

  .pagina {
    padding:
      18px
      14px
      30px;
  }


  .cabecera-pagina {
    min-height: 0;

    padding: 16px;

    border-radius: 12px;
  }


  .cabecera-texto h1 {
    font-size: 29px;
  }


  .cabecera-texto .descripcion {
    font-size: 13px;
  }


  .btn-regresar {
    width: auto;

    min-height: 40px;

    margin-bottom: 12px;

    font-size: 14px;
  }


  .cabecera-lateral {
    display: none;
  }


  .resumen-general {
    border-radius: 12px;
  }


  .seccion {
    border-radius: 12px;
  }

}


@media (prefers-reduced-motion: reduce) {

  .btn-regresar,
  .resumen-general,
  .seccion,
  .tarjeta-movil,
  .icono-dato,
  .icono-seccion,
  .detalle-carpeta,
  .detalle-documento,
  .detalle-lupa {
    transition: none !important;
  }


  .btn-regresar:hover,
  .resumen-general:hover,
  .seccion:hover,
  .tarjeta-movil:hover,
  .resumen-general:hover .icono-dato,
  .seccion:hover .icono-seccion,
  .cabecera-pagina:hover .detalle-carpeta,
  .cabecera-pagina:hover .detalle-documento,
  .cabecera-pagina:hover .detalle-lupa {
    transform: none !important;
  }

}

</style>
