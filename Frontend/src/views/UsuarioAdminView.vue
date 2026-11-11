<template>

  <div
    class="pagina pagina-admin"
    :class="{ 'modo-oscuro': modoOscuro }"
  >

    <main class="contenido">

      <!-- ======================================== -->
      <!-- CABECERA -->
      <!-- ======================================== -->

      <header class="cabecera-pagina">

        <div class="cabecera-texto">

          <button
            type="button"
            class="btn-regresar"
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
            Cuenta administrativa
          </p>

          <h1>
            Ajustes
          </h1>

          <p class="descripcion">
            Consulta y actualiza la información de tu perfil administrativo y la seguridad de tu cuenta.
          </p>


          <div
            class="estado-cambios"
            :class="{ activo: hayCambios || hayCambiosSeguridad }"
          >
            <span class="estado-punto"></span>

            {{
              hayCambios || hayCambiosSeguridad
                ? 'Hay cambios pendientes'
                : 'Información actualizada'
            }}
          </div>

        </div>


        <div
          class="cabecera-ilustracion"
          aria-hidden="true"
        >
          <span class="orbita orbita-1"></span>
          <span class="orbita orbita-2"></span>

          <div class="tarjeta-perfil-decorativa">

            <div class="avatar-decorativo">
              {{ iniciales }}
            </div>

            <div class="lineas-decorativas">
              <span></span>
              <span></span>
            </div>

          </div>

          <span class="destello destello-1"></span>
          <span class="destello destello-2"></span>
          <span class="destello destello-3"></span>
        </div>

      </header>



      <!-- ======================================== -->
      <!-- CONTENIDO -->
      <!-- ======================================== -->

      <section class="distribucion">

        <!-- ====================================== -->
        <!-- PERFIL RESUMIDO -->
        <!-- ====================================== -->

        <aside class="tarjeta perfil-resumen">

          <div class="perfil-avatar-grande">
            {{ iniciales }}
          </div>

          <h2>
            {{ nombreCompleto || 'Administrador' }}
          </h2>

          <p>
            {{ formulario.rol || 'Administrador' }}
          </p>

          <span class="perfil-en-linea">
            <i></i>
            Sesión activa
          </span>


          <div class="separador"></div>


          <div class="dato-resumen">

            <span>Correo</span>

            <strong>
              {{ formulario.correo || 'Sin correo registrado' }}
            </strong>

          </div>


          <div class="dato-resumen">

            <span>Especialidad</span>

            <strong>
              {{ formulario.especialidad || 'Sin especialidad registrada' }}
            </strong>

          </div>


          <div class="nota-perfil">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />

              <path
                d="M12 10v6M12 7h.01"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>

            <p>
              El rol administrativo es controlado por la plataforma y no puede modificarse desde esta vista.
            </p>
          </div>

        </aside>



        <!-- ====================================== -->
        <!-- FORMULARIO -->
        <!-- ====================================== -->

        <section class="tarjeta formulario-tarjeta">

          <div class="encabezado-seccion">

            <div class="icono-seccion">
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
                  d="M5.5 19c.7-4 2.9-6 6.5-6s5.8 2 6.5 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <h2>Información personal</h2>

              <p>
                Modifica los datos visibles de tu perfil.
              </p>
            </div>

          </div>


          <form
            class="formulario"
            @submit.prevent="guardarCambios"
          >

            <div class="campo">

              <label for="nombre">
                Nombre
              </label>

              <div class="entrada-icono">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <path
                    d="M5.5 19c.7-3.8 2.8-5.8 6.5-5.8s5.8 2 6.5 5.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  id="nombre"
                  v-model.trim="formulario.nombre"
                  type="text"
                  autocomplete="given-name"
                  placeholder="Nombre"
                >

              </div>

            </div>


            <div class="campo">

              <label for="apellido">
                Apellido
              </label>

              <div class="entrada-icono">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <path
                    d="M5.5 19c.7-3.8 2.8-5.8 6.5-5.8s5.8 2 6.5 5.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>

                <input
                  id="apellido"
                  v-model.trim="formulario.apellido"
                  type="text"
                  autocomplete="family-name"
                  placeholder="Apellido"
                >

              </div>

            </div>


            <div class="campo">

              <label for="correo">
                Correo electrónico
              </label>

              <div class="entrada-icono">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3.5"
                    y="5.5"
                    width="17"
                    height="13"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <path
                    d="m5 8 7 5 7-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <input
                  id="correo"
                  v-model.trim="formulario.correo"
                  type="email"
                  autocomplete="email"
                  placeholder="correo@ejemplo.com"
                >

              </div>

            </div>


            <div class="campo">

              <label for="especialidad">
                Especialidad
              </label>

              <div class="entrada-icono">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 7.5 12 4l8 3.5-8 3.5Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />

                  <path
                    d="M7 10v5.5c2.7 2 7.3 2 10 0V10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <input
                  id="especialidad"
                  v-model.trim="formulario.especialidad"
                  type="text"
                  placeholder="Ej. Inteligencia artificial"
                >

              </div>

            </div>


            <div class="campo campo-ancho">

              <label for="rol">
                Rol
              </label>

              <div class="entrada-icono entrada-bloqueada">

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />

                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>

                <input
                  id="rol"
                  :value="formulario.rol"
                  type="text"
                  disabled
                >

              </div>

              <small>
                El rol solo puede cambiarse desde la gestión administrativa de usuarios.
              </small>

            </div>


            <div
              v-if="mensaje"
              class="mensaje"
              :class="tipoMensaje"
              role="status"
            >
              <svg
                v-if="tipoMensaje === 'exito'"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />

                <path
                  d="m8 12 2.7 2.7 5.5-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <svg
                v-else
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />

                <path
                  d="M12 8v5M12 16h.01"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>

              {{ mensaje }}
            </div>


            <div class="acciones">

              <button
                type="button"
                class="btn-secundario"
                :disabled="!hayCambios"
                @click="restablecer"
              >
                Restablecer
              </button>


              <button
                type="submit"
                class="btn-guardar"
                :disabled="!hayCambios"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 4h11l3 3v13H5Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />

                  <path
                    d="M8 4v6h8V4M8 20v-6h8v6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />
                </svg>

                Guardar cambios
              </button>

            </div>

          </form>

        </section>


        <!-- ====================================== -->
        <!-- SEGURIDAD -->
        <!-- ====================================== -->

        <section class="tarjeta formulario-tarjeta seguridad-tarjeta">

          <div class="encabezado-seccion">

            <div class="icono-seccion">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M7 10V8a5 5 0 0 1 10 0v2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />

                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
              </svg>
            </div>

            <div>
              <h2>Seguridad de la cuenta</h2>

              <p>
                Cambia tu contraseña de acceso. Usa al menos 8 caracteres; las demás sesiones abiertas de tu cuenta dejarán de ser válidas.
              </p>
            </div>

          </div>


          <form
            class="formulario"
            @submit.prevent="cambiarContrasena"
          >

            <div class="campo campo-ancho">

              <label for="contrasena-actual">
                Contraseña actual
              </label>

              <div class="entrada-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>

                <input
                  id="contrasena-actual"
                  v-model="seguridad.contrasenaActual"
                  type="password"
                  autocomplete="current-password"
                  maxlength="128"
                  placeholder="Contraseña actual"
                >
              </div>

            </div>


<div class="campo">
              <label for="contrasena-nueva">
                Nueva contraseña
              </label>
              <!-- AÑADIDO: div con clase entrada-icono y SVG -->
              <div class="entrada-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                  <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/>
                </svg>
                <input
                  id="contrasena-nueva"
                  v-model="seguridad.contrasenaNueva"
                  type="password"
                  autocomplete="new-password"
                  minlength="8"
                  maxlength="128"
                  placeholder="Mínimo 8 caracteres"
                >
              </div>
            </div>

            <div class="campo">
              <label for="contrasena-confirmar">
                Confirmar contraseña
              </label>
              <!-- AÑADIDO: div con clase entrada-icono y SVG -->
              <div class="entrada-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                  <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/>
                </svg>
                <input
                  id="contrasena-confirmar"
                  v-model="seguridad.confirmacion"
                  type="password"
                  autocomplete="new-password"
                  minlength="8"
                  maxlength="128"
                  placeholder="Repite la nueva contraseña"
                >
              </div>
            </div>


            <div
              v-if="mensajeSeguridad"
              class="mensaje"
              :class="tipoMensajeSeguridad"
              role="status"
            >
              {{ mensajeSeguridad }}
            </div>


            <div class="acciones">

              <button
                type="button"
                class="btn-secundario"
                :disabled="!hayCambiosSeguridad || cambiandoContrasena"
                @click="limpiarSeguridad"
              >
                Limpiar
              </button>


              <button
                type="submit"
                class="btn-guardar"
                :disabled="!hayCambiosSeguridad || cambiandoContrasena"
              >
                {{
                  cambiandoContrasena
                    ? 'Actualizando...'
                    : 'Cambiar contraseña'
                }}
              </button>

            </div>

          </form>

        </section>

      </section>

    </main>

  </div>

</template>


<script setup>

import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useTema
} from '../utils/useTema'

import { apiFetch } from '../utils/api'



const router =
  useRouter()


const {
  modoOscuro
} = useTema()



// ========================================
// ESTADO
// ========================================

const usuarioOriginal =
  ref({})


const formulario =
  reactive({
    nombre: '',
    apellido: '',
    correo: '',
    especialidad: '',
    rol: 'Administrador'
  })


const datosIniciales =
  ref('')


const mensaje =
  ref('')


const tipoMensaje =
  ref('')



const seguridad =
  reactive({
    contrasenaActual: '',
    contrasenaNueva: '',
    confirmacion: ''
  })


const mensajeSeguridad =
  ref('')


const tipoMensajeSeguridad =
  ref('')


const cambiandoContrasena =
  ref(false)


const hayCambiosSeguridad =
  computed(
    () =>
      Boolean(
        seguridad.contrasenaActual ||
        seguridad.contrasenaNueva ||
        seguridad.confirmacion
      )
  )



// ========================================
// NOMBRE COMPLETO
// ========================================

const nombreCompleto =
  computed(() => {

    return [
      formulario.nombre,
      formulario.apellido
    ]
      .map(
        valor =>
          String(valor || '').trim()
      )
      .filter(Boolean)
      .join(' ')

  })



// ========================================
// INICIALES
// ========================================

const iniciales =
  computed(() => {

    const nombre =
      formulario.nombre.trim()

    const apellido =
      formulario.apellido.trim()


    if (
      nombre &&
      apellido
    ) {

      return (
        nombre[0] +
        apellido[0]
      ).toUpperCase()

    }


    const base =
      nombre ||
      'Administrador'


    return String(base)
      .trim()
      .slice(0, 2)
      .toUpperCase()

  })



// ========================================
// NORMALIZAR FORMULARIO
// ========================================

const estadoFormulario = () => {

  return JSON.stringify({

    nombre:
      formulario.nombre.trim(),

    apellido:
      formulario.apellido.trim(),

    correo:
      formulario.correo.trim(),

    especialidad:
      formulario.especialidad.trim(),

    rol:
      formulario.rol

  })

}


const hayCambios =
  computed(
    () =>
      estadoFormulario() !==
      datosIniciales.value
  )



// ========================================
// CARGAR USUARIO DE LA SESIÓN
// ========================================

const cargarUsuario = () => {

  try {

    const usuarioGuardado =
      sessionStorage.getItem(
        'usuario-plataforma'
      )


    if (
      !usuarioGuardado
    ) {

      router.replace({
        name: 'login'
      })

      return

    }


    const usuario =
      JSON.parse(
        usuarioGuardado
      )


    usuarioOriginal.value =
      usuario


    formulario.nombre =
      String(
        usuario?.nombre ||
        usuario?.nombre_completo ||
        usuario?.correo?.split('@')[0] ||
        ''
      )


    formulario.apellido =
      String(
        usuario?.apellido ||
        usuario?.apellidos ||
        usuario?.apellido_usuario ||
        ''
      )


    formulario.correo =
      String(
        usuario?.correo ||
        usuario?.email ||
        ''
      )


    formulario.especialidad =
      String(
        usuario?.especialidad ||
        usuario?.area_especialidad ||
        usuario?.especialidad_academica ||
        ''
      )


    formulario.rol =
      String(
        typeof usuario?.rol === 'string'
          ? usuario.rol
          : usuario?.rol?.nombre ||
            usuario?.nombre_rol ||
            usuario?.tipo_usuario ||
            'Administrador'
      )


    datosIniciales.value =
      estadoFormulario()

  } catch (error) {

    console.error(
      'No fue posible cargar la información del usuario:',
      error
    )


    sessionStorage.removeItem(
      'usuario-plataforma'
    )


    router.replace({
      name: 'login'
    })

  }

}



// ========================================
// GUARDAR
// ========================================

const guardarCambios = async () => {

  mensaje.value = ''
  tipoMensaje.value = ''


  if (
    formulario.nombre.trim() === ''
  ) {

    mensaje.value =
      'El nombre no puede quedar vacío.'

    tipoMensaje.value =
      'error'

    return
  }


  if (
    formulario.correo &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(formulario.correo)
  ) {

    mensaje.value =
      'Ingresa un correo electrónico válido.'

    tipoMensaje.value =
      'error'

    return
  }


  try {

    const respuesta =
      await apiFetch(
        '/me',
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify({
              nombre:
                formulario.nombre.trim(),

              apellido:
                formulario.apellido.trim(),

              correo:
                formulario.correo.trim(),

              especialidad:
                formulario.especialidad.trim()
            })
        }
      )


    const datos =
      await respuesta
        .json()
        .catch(() => ({}))


    if (!respuesta.ok) {

      throw new Error(
        datos.mensaje ||
        'No fue posible actualizar los datos del usuario.'
      )
    }


    const actualizado =
      datos.usuario || {
        ...usuarioOriginal.value,
        nombre: formulario.nombre.trim(),
        correo: formulario.correo.trim()
      }


    sessionStorage.setItem(
      'usuario-plataforma',
      JSON.stringify(actualizado)
    )


    usuarioOriginal.value =
      actualizado


    datosIniciales.value =
      estadoFormulario()


    mensaje.value =
      datos.mensaje ||
      'Los datos del usuario se actualizaron correctamente.'

    tipoMensaje.value =
      'exito'

  } catch (error) {

    console.error(
      'No fue posible guardar los cambios del usuario:',
      error
    )

    mensaje.value =
      error.message ||
      'No fue posible actualizar los datos del usuario.'

    tipoMensaje.value =
      'error'
  }

}


// ========================================
// CAMBIAR CONTRASEÑA
// ========================================

const limpiarSeguridad = () => {
  seguridad.contrasenaActual = ''
  seguridad.contrasenaNueva = ''
  seguridad.confirmacion = ''
  mensajeSeguridad.value = ''
  tipoMensajeSeguridad.value = ''
}


const cambiarContrasena = async () => {
  mensajeSeguridad.value = ''
  tipoMensajeSeguridad.value = ''

  if (!seguridad.contrasenaActual) {
    mensajeSeguridad.value =
      'Ingresa tu contraseña actual.'

    tipoMensajeSeguridad.value =
      'error'

    return
  }

  if (
    seguridad.contrasenaNueva.length < 8
  ) {
    mensajeSeguridad.value =
      'La nueva contraseña debe tener al menos 8 caracteres.'

    tipoMensajeSeguridad.value =
      'error'

    return
  }

  if (
    seguridad.contrasenaNueva.length > 128
  ) {
    mensajeSeguridad.value =
      'La nueva contraseña no puede superar los 128 caracteres.'

    tipoMensajeSeguridad.value =
      'error'

    return
  }

  if (
    seguridad.contrasenaNueva !==
    seguridad.confirmacion
  ) {
    mensajeSeguridad.value =
      'La confirmación no coincide con la nueva contraseña.'

    tipoMensajeSeguridad.value =
      'error'

    return
  }

  if (
    seguridad.contrasenaActual ===
    seguridad.contrasenaNueva
  ) {
    mensajeSeguridad.value =
      'La nueva contraseña debe ser diferente de la actual.'

    tipoMensajeSeguridad.value =
      'error'

    return
  }

  cambiandoContrasena.value = true

  try {
    const respuesta =
      await apiFetch(
        '/me/password',
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify({
              contrasenaActual:
                seguridad.contrasenaActual,

              contrasenaNueva:
                seguridad.contrasenaNueva,

              confirmacion:
                seguridad.confirmacion
            })
        }
      )

    const datos =
      await respuesta
        .json()
        .catch(() => ({}))

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje ||
        'No fue posible cambiar la contraseña.'
      )
    }

    seguridad.contrasenaActual = ''
    seguridad.contrasenaNueva = ''
    seguridad.confirmacion = ''

    mensajeSeguridad.value =
      datos.mensaje ||
      'La contraseña se actualizó correctamente.'

    tipoMensajeSeguridad.value =
      'exito'
  } catch (error) {
    console.error(
      'No fue posible cambiar la contraseña:',
      error
    )

    mensajeSeguridad.value =
      error.message ||
      'No fue posible cambiar la contraseña.'

    tipoMensajeSeguridad.value =
      'error'
  } finally {
    cambiandoContrasena.value = false
  }
}



// ========================================
// RESTABLECER
// ========================================

const restablecer = () => {

  cargarUsuario()

  mensaje.value = ''

  tipoMensaje.value = ''

}



// ========================================
// REGRESAR
// ========================================

const regresar = () => {

  if (
    hayCambios.value ||
    hayCambiosSeguridad.value
  ) {

    const continuar =
      window.confirm(
        'Hay cambios sin guardar. ¿Deseas regresar sin guardarlos?'
      )


    if (
      !continuar
    ) {

      return

    }

  }


  router.push({
    name: 'administracion'
  })

}



// ========================================
// INICIAR
// ========================================

const validarAdministrador = () => {

  try {

    const guardado =
      sessionStorage.getItem(
        'usuario-plataforma'
      )


    if (
      !guardado
    ) {

      return false

    }


    const usuario =
      JSON.parse(
        guardado
      )


    const rol =
      String(
        typeof usuario?.rol === 'string'
          ? usuario.rol
          : usuario?.rol?.nombre ||
            usuario?.nombre_rol ||
            usuario?.tipo_usuario ||
            ''
      )
        .trim()
        .toLowerCase()


    return (
      rol ===
      'administrador'
    )

  } catch (error) {

    console.error(
      'No fue posible validar el rol administrativo:',
      error
    )

    return false

  }

}



onMounted(() => {

  if (
    !validarAdministrador()
  ) {

    router.replace({
      name: 'proyectos'
    })

    return

  }


  cargarUsuario()

})

</script>


<style scoped>

/* ========================================
   GENERAL
======================================== */

* {
  box-sizing: border-box;
}


.pagina {
  width: 100%;
  min-height: 100vh;

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

  color: #0b1f50;

  transition:
    background 0.25s ease,
    color 0.25s ease;
}


.contenido {
  width: 100%;
  max-width: 1450px;

  margin:
    0
    auto;
}


/* ========================================
   CABECERA
======================================== */

.cabecera-pagina {
  position: relative;
  isolation: isolate;

  min-height: 180px;

  display: grid;

  grid-template-columns:
    minmax(350px, 1fr)
    minmax(290px, .52fr);

  align-items: center;

  gap: 40px;

  margin-bottom: 18px;

  padding:
    18px
    20px;

  background:
    rgba(
      255,
      255,
      255,
      .88
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
      .045
    );

  overflow: hidden;
}


.cabecera-pagina::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 470px;
  height: 190px;

  top: -105px;
  right: 9%;

  background:
    radial-gradient(
      circle,
      rgba(208, 228, 254, .52),
      rgba(208, 228, 254, .10) 62%,
      transparent 70%
    );

  border-radius: 50%;
}


.cabecera-pagina::after {
  content: '';

  position: absolute;
  z-index: -1;

  width: 170px;
  height: 170px;

  right: -62px;
  bottom: -92px;

  background:
    rgba(
      210,
      230,
      255,
      .26
    );

  border-radius: 50%;
}


.cabecera-texto {
  position: relative;
  z-index: 2;
}


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
      .10
    );

  font-family: inherit;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    color .2s ease,
    background .2s ease,
    border-color .2s ease,
    box-shadow .2s ease,
    transform .2s ease;
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
      .22
    );

  transform:
    translateX(-2px)
    translateY(-1px);
}


.subtitulo {
  margin:
    0
    0
    3px;

  color: #617eae;

  font-size: 14px;
}


.cabecera-pagina h1 {
  margin: 0;

  color: #0a2058;

  font-size: 34px;
  font-weight: 760;

  line-height: 1.15;

  letter-spacing: -.5px;
}


.descripcion {
  max-width: 670px;

  margin:
    7px
    0
    0;

  color: #5875a6;

  font-size: 14px;

  line-height: 1.5;
}


.estado-cambios {
  min-height: 29px;

  display: inline-flex;
  align-items: center;

  gap: 7px;

  margin-top: 13px;

  padding:
    0
    10px;

  background: #eaf7f1;

  border:
    1px solid
    #d3ebdf;

  border-radius: 999px;

  color: #497767;

  font-size: 10px;
  font-weight: 680;
}


.estado-cambios.activo {
  background: #fff4dc;

  border-color: #efdfb7;

  color: #a76a11;
}


.estado-punto {
  width: 7px;
  height: 7px;

  background: currentColor;

  border-radius: 50%;
}


/* ========================================
   ILUSTRACIÓN
======================================== */

.cabecera-ilustracion {
  position: relative;

  justify-self: end;

  width: 310px;
  height: 135px;
}


.cabecera-ilustracion::before {
  content: '';

  position: absolute;

  width: 230px;
  height: 100px;

  right: 3px;
  bottom: 0;

  background:
    radial-gradient(
      ellipse at center,
      rgba(166, 201, 247, .31),
      transparent 70%
    );

  border-radius: 50%;
}


.orbita {
  position: absolute;

  display: block;

  border:
    1px solid
    rgba(96, 149, 220, .16);

  border-radius: 50%;
}


.orbita-1 {
  width: 120px;
  height: 120px;

  right: 4px;
  top: -6px;
}


.orbita-2 {
  width: 76px;
  height: 76px;

  right: 27px;
  top: 16px;

  border-style: dashed;
}


.tarjeta-perfil-decorativa {
  position: absolute;

  width: 178px;
  height: 103px;

  left: 45px;
  bottom: 9px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding:
    17px;

  background:
    linear-gradient(
      145deg,
      #ffffff,
      #f3f8ff
    );

  border:
    1px solid
    #cfe1f6;

  border-radius: 15px;

  box-shadow:
    0 13px 27px
    rgba(
      42,
      87,
      149,
      .11
    );

  transform:
    rotate(-4deg);
}


.avatar-decorativo {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e3efff,
      #d3e7ff
    );

  border:
    1px solid
    #c9def8;

  border-radius: 50%;

  color: #3477cd;

  font-size: 14px;
  font-weight: 800;
}


.lineas-decorativas {
  width: 68px;

  display: flex;
  flex-direction: column;

  gap: 9px;
}


.lineas-decorativas span {
  width: 100%;
  height: 6px;

  background: #d8e7f9;

  border-radius: 999px;
}


.lineas-decorativas span:last-child {
  width: 68%;
}


.engranaje-decorativo {
  position: absolute;

  width: 38px;
  height: 38px;

  right: -17px;
  bottom: -12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #287df0,
      #1263d7
    );

  border:
    3px solid
    #f1f7ff;

  border-radius: 12px;

  color: white;

  box-shadow:
    0 8px 18px
    rgba(
      22,
      99,
      215,
      .20
    );
}


.engranaje-decorativo svg {
  width: 23px;
  height: 23px;
}


.destello {
  position: absolute;

  display: block;

  border-radius: 50%;

  background: #78a9e9;

  opacity: .48;
}


.destello-1 {
  width: 7px;
  height: 7px;

  top: 13px;
  left: 18px;
}


.destello-2 {
  width: 4px;
  height: 4px;

  top: 34px;
  left: 5px;
}


.destello-3 {
  width: 5px;
  height: 5px;

  right: 7px;
  bottom: 18px;
}


/* ========================================
   DISTRIBUCIÓN
======================================== */

.distribucion {
  display: grid;

  grid-template-columns:
    minmax(250px, 330px)
    minmax(0, 1fr);

  align-items: start;

  gap: 16px;
}


.seguridad-tarjeta {
  grid-column: 2;
}


.tarjeta {
  position: relative;

  background:
    rgba(
      255,
      255,
      255,
      .97
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 14px;

  box-shadow:
    0 6px 21px
    rgba(
      48,
      84,
      137,
      .05
    );

  overflow: hidden;
}


/* ========================================
   PERFIL RESUMIDO
======================================== */

.perfil-resumen {
  padding:
    25px
    20px;

  text-align: center;
}


.perfil-resumen::before {
  content: '';

  position: absolute;

  width: 160px;
  height: 160px;

  top: -95px;
  right: -70px;

  background:
    radial-gradient(
      circle,
      rgba(210, 230, 255, .50),
      transparent 68%
    );

  border-radius: 50%;
}


.perfil-avatar-grande {
  position: relative;

  width: 84px;
  height: 84px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin:
    4px
    auto
    15px;

  background:
    linear-gradient(
      145deg,
      #e2efff,
      #cfe5ff
    );

  border:
    1px solid
    #c5dcf8;

  border-radius: 50%;

  color: #2d75d5;

  box-shadow:
    0 9px 21px
    rgba(
      42,
      87,
      149,
      .10
    );

  font-size: 24px;
  font-weight: 800;
}


.perfil-resumen h2 {
  margin: 0;

  color: #102858;

  font-size: 18px;
  font-weight: 740;
}


.perfil-resumen > p {
  margin:
    4px
    0
    9px;

  color: #7085a8;

  font-size: 11px;
}


.perfil-en-linea {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding:
    5px
    9px;

  background: #eaf8f1;

  border:
    1px solid
    #d5ecdf;

  border-radius: 999px;

  color: #4e806c;

  font-size: 9px;
  font-weight: 680;
}


.perfil-en-linea i {
  width: 6px;
  height: 6px;

  display: block;

  background: #25b978;

  border-radius: 50%;
}


.separador {
  height: 1px;

  margin:
    20px
    0;

  background: #e9eff7;
}


.dato-resumen {
  display: flex;
  flex-direction: column;

  gap: 4px;

  margin-bottom: 14px;

  text-align: left;
}


.dato-resumen span {
  color: #8193ad;

  font-size: 9px;
  font-weight: 650;

  text-transform: uppercase;

  letter-spacing: .05em;
}


.dato-resumen strong {
  overflow-wrap: anywhere;

  color: #1c3763;

  font-size: 11px;
  font-weight: 670;
}


.nota-perfil {
  display: grid;

  grid-template-columns:
    auto
    minmax(0, 1fr);

  gap: 8px;

  margin-top: 20px;

  padding:
    10px;

  background: #f3f8ff;

  border:
    1px solid
    #e0ebf8;

  border-radius: 9px;

  color: #6482aa;

  text-align: left;
}


.nota-perfil svg {
  width: 16px;
  height: 16px;

  margin-top: 1px;
}


.nota-perfil p {
  margin: 0;

  font-size: 9px;

  line-height: 1.45;
}


/* ========================================
   FORMULARIO
======================================== */

.formulario-tarjeta {
  padding:
    20px;
}


.encabezado-seccion {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 20px;

  padding-bottom: 17px;

  border-bottom:
    1px solid
    #edf2f8;
}


.icono-seccion {
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e7f1ff,
      #d6e8ff
    );

  border:
    1px solid
    #d2e3f8;

  border-radius: 10px;

  color: #1269ee;
}


.icono-seccion svg {
  width: 24px;
  height: 24px;
}


.encabezado-seccion h2 {
  margin: 0;

  color: #102858;

  font-size: 18px;
  font-weight: 740;
}


.encabezado-seccion p {
  margin:
    3px
    0
    0;

  color: #7186aa;

  font-size: 11px;
}


.formulario {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    17px
    15px;
}


.campo {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 7px;
}


.campo-ancho {
  grid-column:
    1 / -1;
}


.campo label {
  color: #38577e;

  font-size: 11px;
  font-weight: 700;
}


.campo small {
  color: #8295b0;

  font-size: 9px;

  line-height: 1.4;
}


.entrada-icono {
  position: relative;
}


.entrada-icono > svg {
  position: absolute;

  top: 50%;
  left: 13px;

  width: 17px;
  height: 17px;

  transform:
    translateY(-50%);

  color: #6684af;

  pointer-events: none;
}


.entrada-icono input {
  width: 100%;
  height: 43px;

  padding:
    0
    13px
    0
    41px;

  background: white;

  border:
    1px solid
    #cbd9eb;

  border-radius: 8px;

  color: #17315d;

  font-family: inherit;
  font-size: 12px;

  outline: none;

  transition:
    border-color .2s ease,
    box-shadow .2s ease,
    background .2s ease;
}


.entrada-icono input:focus {
  border-color: #2c78eb;

  box-shadow:
    0 0 0 3px
    rgba(
      32,
      112,
      238,
      .08
    );
}


.entrada-bloqueada input {
  background: #f2f6fb;

  color: #71839f;

  cursor: not-allowed;
}


/* ========================================
   MENSAJES
======================================== */

.mensaje {
  grid-column:
    1 / -1;

  min-height: 40px;

  display: flex;
  align-items: center;

  gap: 8px;

  padding:
    9px
    11px;

  border-radius: 8px;

  font-size: 10px;
  font-weight: 620;
}


.mensaje svg {
  width: 17px;
  height: 17px;

  flex-shrink: 0;
}


.mensaje.exito {
  background: #eaf8f1;

  border:
    1px solid
    #d3ecdf;

  color: #39765e;
}


.mensaje.error {
  background: #fff0f2;

  border:
    1px solid
    #f2d5da;

  color: #b14452;
}


/* ========================================
   ACCIONES
======================================== */

.acciones {
  grid-column:
    1 / -1;

  display: flex;
  justify-content: flex-end;

  gap: 9px;

  margin-top: 3px;

  padding-top: 17px;

  border-top:
    1px solid
    #edf2f8;
}


.btn-secundario,
.btn-guardar {
  min-height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    16px;

  border-radius: 8px;

  font-family: inherit;
  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform .2s ease,
    background .2s ease,
    border-color .2s ease,
    box-shadow .2s ease;
}


.btn-secundario {
  background: white;

  border:
    1px solid
    #cbd9eb;

  color: #54729d;
}


.btn-secundario:hover:not(:disabled) {
  background: #f3f7fd;

  border-color: #afc5e1;

  transform:
    translateY(-1px);
}


.btn-guardar {
  background:
    linear-gradient(
      135deg,
      #1974f6,
      #075ee9
    );

  border:
    1px solid
    #0869ef;

  color: white;

  box-shadow:
    0 7px 17px
    rgba(
      17,
      103,
      235,
      .19
    );
}


.btn-guardar svg {
  width: 17px;
  height: 17px;
}


.btn-guardar:hover:not(:disabled) {
  transform:
    translateY(-1px);

  box-shadow:
    0 9px 21px
    rgba(
      17,
      103,
      235,
      .25
    );
}


.btn-secundario:disabled,
.btn-guardar:disabled {
  opacity: .48;

  cursor: not-allowed;
}


/* ========================================
   MODO OSCURO
======================================== */

.pagina.modo-oscuro {
  background:
    radial-gradient(
      circle at 5% 0%,
      rgba(40, 82, 145, .25),
      transparent 28%
    ),
    radial-gradient(
      circle at 97% 0%,
      rgba(38, 75, 132, .22),
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


.modo-oscuro .cabecera-pagina,
.modo-oscuro .tarjeta {
  background:
    rgba(
      22,
      34,
      53,
      .95
    );

  border-color: #30445f;

  box-shadow:
    0 8px 24px
    rgba(
      0,
      0,
      0,
      .14
    );
}


.modo-oscuro .cabecera-pagina::before {
  background:
    radial-gradient(
      circle,
      rgba(67, 108, 164, .18),
      rgba(67, 108, 164, .04) 62%,
      transparent 70%
    );
}


.modo-oscuro .cabecera-pagina::after {
  background:
    rgba(
      54,
      91,
      142,
      .12
    );
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


.modo-oscuro .subtitulo {
  color: #91a8cc;
}


.modo-oscuro .cabecera-pagina h1,
.modo-oscuro .perfil-resumen h2,
.modo-oscuro .encabezado-seccion h2,
.modo-oscuro .dato-resumen strong {
  color: #edf5ff;
}


.modo-oscuro .descripcion,
.modo-oscuro .perfil-resumen > p,
.modo-oscuro .encabezado-seccion p {
  color: #a5b7d5;
}


.modo-oscuro .estado-cambios {
  background: #183a31;

  border-color: #2d6352;

  color: #78d2a6;
}


.modo-oscuro .estado-cambios.activo {
  background: #47351f;

  border-color: #6c5130;

  color: #e9bd70;
}


.modo-oscuro .tarjeta-perfil-decorativa {
  background:
    linear-gradient(
      145deg,
      #1b2b42,
      #17263b
    );

  border-color: #3a506f;
}


.modo-oscuro .avatar-decorativo,
.modo-oscuro .perfil-avatar-grande,
.modo-oscuro .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #263c5e,
      #294a78
    );

  border-color: #36577f;

  color: #9bc1f4;
}


.modo-oscuro .lineas-decorativas span {
  background: #3b526f;
}


.modo-oscuro .engranaje-decorativo {
  border-color: #17253a;
}


.modo-oscuro .orbita {
  border-color:
    rgba(
      111,
      159,
      221,
      .20
    );
}


.modo-oscuro .destello {
  background: #73a8e8;
}


.modo-oscuro .perfil-en-linea {
  background: #183a31;

  border-color: #2d6352;

  color: #83d6ad;
}


.modo-oscuro .separador,
.modo-oscuro .encabezado-seccion,
.modo-oscuro .acciones {
  border-color: #2c405b;
}


.modo-oscuro .dato-resumen span,
.modo-oscuro .campo small {
  color: #869cbb;
}


.modo-oscuro .nota-perfil {
  background: #18283e;

  border-color: #304862;

  color: #9ab1d0;
}


.modo-oscuro .campo label {
  color: #b6c9e4;
}


.modo-oscuro .entrada-icono > svg {
  color: #819bc0;
}


.modo-oscuro .entrada-icono input {
  background: #111c2e;

  border-color: #3b4d68;

  color: #edf5ff;

  color-scheme: dark;
}


.modo-oscuro .entrada-icono input:focus {
  border-color: #5594f1;

  box-shadow:
    0 0 0 3px
    rgba(
      65,
      139,
      241,
      .12
    );
}


.modo-oscuro .entrada-bloqueada input {
  background: #172337;

  color: #8396b3;
}


.modo-oscuro .btn-secundario {
  background: #18263b;

  border-color: #3a506d;

  color: #9fc5f5;
}


.modo-oscuro .btn-secundario:hover:not(:disabled) {
  background: #20324d;

  border-color: #52739c;
}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 900px) {

  .cabecera-pagina {
    grid-template-columns:
      1fr;
  }


  .cabecera-ilustracion {
    position: absolute;

    right: 15px;
    top: 11px;

    opacity: .17;

    pointer-events: none;
  }


  .distribucion {
    grid-template-columns:
      1fr;
  }


  .seguridad-tarjeta {
    grid-column: auto;
  }


  .perfil-resumen {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    column-gap: 15px;

    text-align: left;
  }


  .perfil-avatar-grande {
    grid-row:
      1 / 5;

    width: 72px;
    height: 72px;

    margin:
      0;

    font-size: 20px;
  }


  .perfil-resumen > h2,
  .perfil-resumen > p,
  .perfil-en-linea {
    justify-self: start;
  }


  .perfil-resumen .separador,
  .perfil-resumen .dato-resumen,
  .perfil-resumen .nota-perfil {
    grid-column:
      1 / -1;
  }

}


@media (max-width: 650px) {

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


  .cabecera-ilustracion {
    display: none;
  }


  .cabecera-pagina h1 {
    font-size: 29px;
  }


  .btn-regresar {
    min-height: 40px;

    font-size: 14px;
  }


  .formulario {
    grid-template-columns:
      1fr;
  }


  .campo-ancho {
    grid-column: auto;
  }


  .mensaje,
  .acciones {
    grid-column: auto;
  }


  .acciones {
    flex-direction: column-reverse;
  }


  .btn-secundario,
  .btn-guardar {
    width: 100%;

    min-height: 46px;
  }

}


@media (max-width: 430px) {

  .pagina {
    padding:
      15px
      10px
      25px;
  }


  .perfil-resumen {
    grid-template-columns:
      1fr;

    text-align: center;
  }


  .perfil-avatar-grande {
    grid-row: auto;

    margin:
      0
      auto;
  }


  .perfil-resumen > h2,
  .perfil-resumen > p,
  .perfil-en-linea {
    justify-self: center;
  }

}


@media (prefers-reduced-motion: reduce) {

  .btn-regresar,
  .btn-secundario,
  .btn-guardar {
    transition: none !important;
  }


  .btn-regresar:hover,
  .btn-secundario:hover,
  .btn-guardar:hover {
    transform: none !important;
  }

}



/* ==========================================================
   IDENTIDAD VISUAL ADMINISTRATIVA · MORADO
========================================================== */

.pagina-admin {
  background:
    radial-gradient(
      circle at 7% 3%,
      rgba(232, 223, 255, .78),
      transparent 25%
    ),
    radial-gradient(
      circle at 94% 2%,
      rgba(241, 235, 255, .72),
      transparent 24%
    ),
    #faf8ff;

  color: #2f1f4b;
}


.pagina-admin .cabecera-pagina,
.pagina-admin .tarjeta {
  background:
    rgba(
      255,
      255,
      255,
      .94
    );

  border-color: #ddd3f4;

  box-shadow:
    0 6px 22px
    rgba(
      84,
      55,
      142,
      .06
    );
}


.pagina-admin .cabecera-pagina::before {
  background:
    radial-gradient(
      circle,
      rgba(209, 191, 248, .56),
      rgba(209, 191, 248, .11) 62%,
      transparent 70%
    );
}


.pagina-admin .cabecera-pagina::after {
  background:
    rgba(
      220,
      206,
      252,
      .30
    );
}


.pagina-admin .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f3eeff
    );

  color: #7138d2;

  border-color: #cbb8ef;

  box-shadow:
    0 4px 12px
    rgba(
      96,
      56,
      161,
      .10
    );
}


.pagina-admin .btn-regresar:hover {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #925ff4,
      #7138d2
    );

  border-color: #7b42db;

  box-shadow:
    0 7px 17px
    rgba(
      113,
      56,
      210,
      .23
    );
}


.pagina-admin .subtitulo {
  color: #816aa7;
}


.pagina-admin .cabecera-pagina h1,
.pagina-admin .perfil-resumen h2,
.pagina-admin .encabezado-seccion h2,
.pagina-admin .dato-resumen strong {
  color: #31204e;
}


.pagina-admin .descripcion,
.pagina-admin .perfil-resumen > p,
.pagina-admin .encabezado-seccion p {
  color: #715f8e;
}


.pagina-admin .tarjeta-perfil-decorativa {
  background:
    linear-gradient(
      145deg,
      #ffffff,
      #f5f0ff
    );

  border-color: #d8c9f3;

  box-shadow:
    0 13px 27px
    rgba(
      91,
      55,
      143,
      .12
    );
}


.pagina-admin .avatar-decorativo,
.pagina-admin .perfil-avatar-grande,
.pagina-admin .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #efe7ff,
      #dfd1ff
    );

  border-color: #d1bff3;

  color: #793de0;
}


.pagina-admin .lineas-decorativas span {
  background: #e1d5f6;
}


.pagina-admin .engranaje-decorativo {
  background:
    linear-gradient(
      145deg,
      #955ff3,
      #7035d0
    );

  border-color: #f6f1ff;

  box-shadow:
    0 8px 18px
    rgba(
      113,
      53,
      208,
      .23
    );
}


.pagina-admin .orbita {
  border-color:
    rgba(
      133,
      91,
      204,
      .20
    );
}


.pagina-admin .destello {
  background: #9e72e9;
}


.pagina-admin .separador,
.pagina-admin .encabezado-seccion,
.pagina-admin .acciones {
  border-color: #ebe3f7;
}


.pagina-admin .dato-resumen span,
.pagina-admin .campo small {
  color: #8a79a1;
}


.pagina-admin .dato-resumen strong {
  color: #493461;
}


.pagina-admin .nota-perfil {
  background: #f7f3ff;

  border-color: #ded2f3;

  color: #75638d;
}


.pagina-admin .campo label {
  color: #5c4479;
}


.pagina-admin .entrada-icono > svg {
  color: #8061aa;
}


.pagina-admin .entrada-icono input {
  border-color: #d3c7e8;

  color: #3d2b55;
}


.pagina-admin .entrada-icono input:focus {
  border-color: #8850e7;

  box-shadow:
    0 0 0 3px
    rgba(
      123,
      66,
      219,
      .09
    );
}


.pagina-admin .entrada-bloqueada input {
  background: #f3f0f8;

  color: #857695;
}


.pagina-admin .btn-secundario {
  border-color: #d1c4e6;

  color: #735d90;
}


.pagina-admin .btn-secundario:hover:not(:disabled) {
  background: #f6f2fc;

  border-color: #bda9dc;
}


.pagina-admin .btn-guardar {
  background:
    linear-gradient(
      135deg,
      #8e59f2,
      #6f34d3
    );

  border-color: #743bd5;

  box-shadow:
    0 7px 17px
    rgba(
      111,
      52,
      211,
      .22
    );
}


.pagina-admin .btn-guardar:hover:not(:disabled) {
  box-shadow:
    0 9px 21px
    rgba(
      111,
      52,
      211,
      .29
    );
}


/* ==========================================================
   MODO OSCURO ADMINISTRATIVO
========================================================== */

.pagina-admin.modo-oscuro {
  background:
    radial-gradient(
      circle at 5% 0%,
      rgba(91, 63, 151, .26),
      transparent 28%
    ),
    radial-gradient(
      circle at 97% 0%,
      rgba(78, 50, 134, .23),
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #171326 0%,
      #171225 48%,
      #120f1e 100%
    );

  color: #eee8f8;
}


.pagina-admin.modo-oscuro .cabecera-pagina,
.pagina-admin.modo-oscuro .tarjeta {
  background:
    rgba(
      31,
      25,
      47,
      .96
    );

  border-color: #46375f;

  box-shadow:
    0 8px 24px
    rgba(
      0,
      0,
      0,
      .18
    );
}


.pagina-admin.modo-oscuro .cabecera-pagina::before {
  background:
    radial-gradient(
      circle,
      rgba(112, 81, 171, .20),
      rgba(112, 81, 171, .04) 62%,
      transparent 70%
    );
}


.pagina-admin.modo-oscuro .cabecera-pagina::after {
  background:
    rgba(
      92,
      66,
      139,
      .14
    );
}


.pagina-admin.modo-oscuro .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #2b213d,
      #241c34
    );

  border-color: #5a457b;

  color: #d4c0f5;
}


.pagina-admin.modo-oscuro .btn-regresar:hover {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #9260f3,
      #7138d2
    );

  border-color: #8e61ed;
}


.pagina-admin.modo-oscuro .subtitulo {
  color: #b9a6d7;
}


.pagina-admin.modo-oscuro .cabecera-pagina h1,
.pagina-admin.modo-oscuro .perfil-resumen h2,
.pagina-admin.modo-oscuro .encabezado-seccion h2,
.pagina-admin.modo-oscuro .dato-resumen strong {
  color: #f7f2ff;
}


.pagina-admin.modo-oscuro .descripcion,
.pagina-admin.modo-oscuro .perfil-resumen > p,
.pagina-admin.modo-oscuro .encabezado-seccion p {
  color: #c7bad9;
}


.pagina-admin.modo-oscuro .tarjeta-perfil-decorativa {
  background:
    linear-gradient(
      145deg,
      #2b213e,
      #241c35
    );

  border-color: #55416f;
}


.pagina-admin.modo-oscuro .avatar-decorativo,
.pagina-admin.modo-oscuro .perfil-avatar-grande,
.pagina-admin.modo-oscuro .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #3c2d57,
      #34254e
    );

  border-color: #604780;

  color: #c9a9ff;
}


.pagina-admin.modo-oscuro .lineas-decorativas span {
  background: #493960;
}


.pagina-admin.modo-oscuro .engranaje-decorativo {
  border-color: #241c35;
}


.pagina-admin.modo-oscuro .orbita {
  border-color:
    rgba(
      165,
      133,
      216,
      .20
    );
}


.pagina-admin.modo-oscuro .destello {
  background: #b38bed;
}


.pagina-admin.modo-oscuro .separador,
.pagina-admin.modo-oscuro .encabezado-seccion,
.pagina-admin.modo-oscuro .acciones {
  border-color: #3b2e52;
}


.pagina-admin.modo-oscuro .dato-resumen span,
.pagina-admin.modo-oscuro .campo small {
  color: #aa9abb;
}


.pagina-admin.modo-oscuro .nota-perfil {
  background: #241c34;

  border-color: #49395f;

  color: #bcaed0;
}


.pagina-admin.modo-oscuro .campo label {
  color: #d2c4e2;
}


.pagina-admin.modo-oscuro .entrada-icono > svg {
  color: #a993c3;
}


.pagina-admin.modo-oscuro .entrada-icono input {
  background: #171122;

  border-color: #4b3a61;

  color: #f4effa;

  color-scheme: dark;
}


.pagina-admin.modo-oscuro .entrada-icono input:focus {
  border-color: #9b6bf0;

  box-shadow:
    0 0 0 3px
    rgba(
      142,
      89,
      242,
      .13
    );
}


.pagina-admin.modo-oscuro .entrada-bloqueada input {
  background: #21192f;

  color: #a79ab4;
}


.pagina-admin.modo-oscuro .btn-secundario {
  background: #251d35;

  border-color: #514067;

  color: #ceb9ee;
}


.pagina-admin.modo-oscuro .btn-secundario:hover:not(:disabled) {
  background: #302443;

  border-color: #725897;
}




/* ==========================================================
   REFINAMIENTO VISUAL · MODO OSCURO ADMINISTRATIVO
========================================================== */

.pagina-admin.modo-oscuro {
  background:
    radial-gradient(
      circle at 6% 0%,
      rgba(103, 73, 168, .28),
      transparent 27%
    ),
    radial-gradient(
      circle at 94% 4%,
      rgba(73, 50, 130, .24),
      transparent 24%
    ),
    linear-gradient(
      180deg,
      #171226 0%,
      #151121 48%,
      #110d1b 100%
    ) !important;

  color: #f3ecff !important;
}


/* ========================================
   SUPERFICIES
======================================== */

.pagina-admin.modo-oscuro .cabecera-pagina,
.pagina-admin.modo-oscuro .tarjeta {
  background:
    linear-gradient(
      180deg,
      rgba(34, 27, 51, .98),
      rgba(29, 23, 44, .98)
    ) !important;

  border-color: #52406d !important;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, .20),
    inset 0 1px 0 rgba(255, 255, 255, .025) !important;
}


/* ========================================
   CABECERA
======================================== */

.pagina-admin.modo-oscuro .cabecera-pagina::before {
  background:
    radial-gradient(
      circle,
      rgba(127, 94, 194, .23),
      rgba(127, 94, 194, .05) 62%,
      transparent 71%
    ) !important;
}


.pagina-admin.modo-oscuro .cabecera-pagina::after {
  background:
    rgba(103, 76, 155, .18) !important;
}


.pagina-admin.modo-oscuro .orbita {
  border-color:
    rgba(188, 156, 237, .24) !important;
}


.pagina-admin.modo-oscuro .destello {
  background: #c19cfb !important;
  opacity: .62 !important;
}


/* ========================================
   TARJETA DECORATIVA
======================================== */

.pagina-admin.modo-oscuro .tarjeta-perfil-decorativa {
  background:
    linear-gradient(
      145deg,
      #302440,
      #281e37
    ) !important;

  border-color: #634b80 !important;

  box-shadow:
    0 16px 30px rgba(0, 0, 0, .24) !important;
}


.pagina-admin.modo-oscuro .avatar-decorativo,
.pagina-admin.modo-oscuro .perfil-avatar-grande,
.pagina-admin.modo-oscuro .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #493460,
      #3b2a51
    ) !important;

  border-color: #745496 !important;

  color: #d5b8ff !important;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .04) !important;
}


.pagina-admin.modo-oscuro .lineas-decorativas span {
  background:
    linear-gradient(
      90deg,
      #66507f,
      #4d3c65
    ) !important;
}


/* ========================================
   TIPOGRAFÍA
======================================== */

.pagina-admin.modo-oscuro .cabecera-pagina h1,
.pagina-admin.modo-oscuro .perfil-resumen h2,
.pagina-admin.modo-oscuro .encabezado-seccion h2,
.pagina-admin.modo-oscuro .dato-resumen strong {
  color: #fcf9ff !important;
}


.pagina-admin.modo-oscuro .subtitulo {
  color: #c9b2eb !important;
}


.pagina-admin.modo-oscuro .descripcion,
.pagina-admin.modo-oscuro .perfil-resumen > p,
.pagina-admin.modo-oscuro .encabezado-seccion p {
  color: #d2c5e3 !important;
}


.pagina-admin.modo-oscuro .dato-resumen span,
.pagina-admin.modo-oscuro .campo small {
  color: #b6a5c8 !important;
}


/* ========================================
   ESTADOS
======================================== */

.pagina-admin.modo-oscuro .estado-cambios {
  color: #b8dcca !important;

  background:
    rgba(34, 112, 76, .20) !important;

  border-color:
    rgba(79, 172, 125, .40) !important;
}


.pagina-admin.modo-oscuro .estado-cambios.activo {
  color: #ffd49a !important;

  background:
    rgba(162, 103, 24, .20) !important;

  border-color:
    rgba(224, 159, 61, .40) !important;
}


.pagina-admin.modo-oscuro .perfil-en-linea {
  color: #b9e7d1 !important;

  background:
    rgba(27, 118, 77, .22) !important;

  border-color:
    rgba(75, 171, 123, .42) !important;
}


/* ========================================
   CAMPOS
======================================== */

.pagina-admin.modo-oscuro .campo label {
  color: #e3d7f0 !important;
}


.pagina-admin.modo-oscuro .entrada-icono > svg {
  color: #b6a2d0 !important;
}


.pagina-admin.modo-oscuro .entrada-icono input {
  background:
    linear-gradient(
      180deg,
      #191323,
      #171120
    ) !important;

  border-color: #56436e !important;

  color: #f8f3ff !important;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .02) !important;

  color-scheme: dark;
}


.pagina-admin.modo-oscuro
.entrada-icono input:hover:not(:disabled) {
  border-color: #695284 !important;
}


.pagina-admin.modo-oscuro
.entrada-icono input:focus {
  background: #1b1427 !important;

  border-color: #a06cf3 !important;

  box-shadow:
    0 0 0 3px
    rgba(160, 108, 243, .14) !important;
}


.pagina-admin.modo-oscuro
.entrada-icono input::placeholder {
  color: #776987 !important;
  opacity: 1;
}


.pagina-admin.modo-oscuro
.entrada-bloqueada input {
  background:
    linear-gradient(
      180deg,
      #241b31,
      #20172c
    ) !important;

  border-color: #49385e !important;

  color: #b7a9c5 !important;
}


/* ========================================
   NOTA INFORMATIVA
======================================== */

.pagina-admin.modo-oscuro .nota-perfil {
  background:
    linear-gradient(
      135deg,
      rgba(75, 56, 102, .28),
      rgba(47, 37, 67, .36)
    ) !important;

  border-color: #55416f !important;

  color: #cabcd8 !important;
}


.pagina-admin.modo-oscuro .nota-perfil svg {
  color: #bda5df !important;
}


/* ========================================
   BOTONES
======================================== */

.pagina-admin.modo-oscuro .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #2c223b,
      #241b32
    ) !important;

  border-color: #654d83 !important;

  color: #e3d2fb !important;

  box-shadow:
    0 5px 14px
    rgba(0, 0, 0, .16) !important;
}


.pagina-admin.modo-oscuro .btn-regresar:hover {
  color: #ffffff !important;

  background:
    linear-gradient(
      135deg,
      #9a68f5,
      #7438d8
    ) !important;

  border-color: #9160ec !important;
}


.pagina-admin.modo-oscuro .btn-secundario {
  background:
    linear-gradient(
      180deg,
      #261d34,
      #21182e
    ) !important;

  border-color: #5a466f !important;

  color: #d5c3ec !important;
}


.pagina-admin.modo-oscuro
.btn-secundario:hover:not(:disabled) {
  background:
    linear-gradient(
      180deg,
      #322541,
      #2a2038
    ) !important;

  border-color: #775c98 !important;
}


.pagina-admin.modo-oscuro .btn-guardar {
  color: #ffffff !important;

  background:
    linear-gradient(
      135deg,
      #9360f0,
      #7138d2
    ) !important;

  border-color: #8350df !important;

  box-shadow:
    0 8px 19px
    rgba(113, 56, 210, .28) !important;
}


.pagina-admin.modo-oscuro
.btn-guardar:hover:not(:disabled) {
  background:
    linear-gradient(
      135deg,
      #a376f4,
      #8249df
    ) !important;

  border-color: #9564ed !important;

  box-shadow:
    0 10px 23px
    rgba(113, 56, 210, .34) !important;
}


/* ========================================
   PERFIL IZQUIERDO
======================================== */

.pagina-admin.modo-oscuro .perfil-resumen {
  background:
    linear-gradient(
      180deg,
      #211a32,
      #1d172c
    ) !important;
}


.pagina-admin.modo-oscuro .separador,
.pagina-admin.modo-oscuro .encabezado-seccion,
.pagina-admin.modo-oscuro .acciones {
  border-color: #463757 !important;
}

</style>
