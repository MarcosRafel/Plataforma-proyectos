<template>
  <main class="pagina-recuperacion">
    <section class="tarjeta-recuperacion">
      <button
        type="button"
        class="volver"
        @click="router.push({ name: 'login' })"
      >
        ← Volver al inicio de sesión
      </button>

      <div class="marca">GP</div>
      <p class="eyebrow">Gestión de Proyectos</p>
      <h1>Recuperar contraseña</h1>
      <p class="descripcion">
        Escribe el correo asociado a tu cuenta. Si está registrado,
        recibirás un enlace temporal para crear una nueva contraseña.
      </p>

      <form @submit.prevent="enviarCorreoRecuperacion">
        <label for="correo-recuperacion">Correo electrónico</label>
        <input
          id="correo-recuperacion"
          v-model.trim="correo"
          type="email"
          autocomplete="email"
          placeholder="nombre@institucion.mx"
          :disabled="enviando"
          required
        />

        <p
          v-if="mensaje"
          class="mensaje"
          :class="tipoMensaje"
        >
          {{ mensaje }}
        </p>

        <button
          type="submit"
          class="principal"
          :disabled="enviando"
        >
          {{ enviando ? 'Enviando…' : 'Enviar enlace de recuperación' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Agregado del nuevo script
import { useTema } from '../utils/useTema' // Conservado de tu versión actual
import { apiFetch } from '../utils/api' // Conservado de tu versión actual

const router = useRouter() // Agregado del nuevo script
const { modoOscuro } = useTema()

const correo = ref('')
const mensaje = ref('')
const tipoMensaje = ref('')
const enviando = ref(false)

const enviarCorreoRecuperacion = async () => {
  mensaje.value = ''
  tipoMensaje.value = ''

  // Validación estricta de formato de correo (Agregada del nuevo script)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    mensaje.value = 'Ingresa un correo electrónico válido.'
    tipoMensaje.value = 'error'
    return
  }

  enviando.value = true

  try {
    // Ruta del backend conservada
    const respuesta = await apiFetch('/recuperar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo: correo.value })
    })

    const datos = await respuesta.json().catch(() => ({}))

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible procesar la solicitud.')
    }

    mensaje.value = datos.mensaje || 'Se han enviado las instrucciones a tu correo.'
    tipoMensaje.value = 'exito'
    correo.value = '' // Limpiamos el campo tras el éxito
  } catch (error) {
    mensaje.value = error.message || 'Error al conectar con el servidor.'
    tipoMensaje.value = 'error'
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.pagina-recuperacion {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 18px;
  background:
    radial-gradient(circle at top left, rgba(30, 103, 216, 0.16), transparent 34rem),
    #f4f7fb;
  color: #17345f;
}

.tarjeta-recuperacion {
  width: min(100%, 520px);
  padding: 34px;
  background: #fff;
  border: 1px solid #dbe5f2;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(26, 61, 112, 0.12);
}

.volver {
  border: 0;
  padding: 0;
  margin-bottom: 28px;
  background: transparent;
  color: #1768db;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.marca {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #1264df;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
}

.eyebrow {
  margin: 18px 0 5px;
  color: #1264df;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1 {
  margin: 0;
  font-size: clamp(28px, 6vw, 38px);
  line-height: 1.1;
}

.descripcion {
  margin: 15px 0 28px;
  color: #61789a;
  line-height: 1.65;
}

form {
  display: grid;
  gap: 12px;
}

label {
  font-weight: 750;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #cbd9ea;
  border-radius: 10px;
  outline: none;
  font: inherit;
  color: #17345f;
}

input:focus {
  border-color: #1264df;
  box-shadow: 0 0 0 3px rgba(18, 100, 223, 0.12);
}

.principal {
  margin-top: 7px;
  padding: 13px 18px;
  border: 0;
  border-radius: 10px;
  background: #1264df;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-weight: 800;
}

.principal:disabled {
  opacity: 0.65;
  cursor: wait;
}

.mensaje {
  margin: 4px 0 0;
  padding: 11px 13px;
  border-radius: 9px;
  line-height: 1.45;
}

.mensaje.exito {
  background: #edf9f1;
  color: #176b3a;
}

.mensaje.error {
  background: #fff1f1;
  color: #a62f35;
}


:global(.tema-oscuro) .pagina-recuperacion {
  background:
    radial-gradient(circle at top left, rgba(54, 126, 235, 0.18), transparent 34rem),
    #071225;
  color: #e8f0ff;
}

:global(.tema-oscuro) .tarjeta-recuperacion {
  background: #0d1b31;
  border-color: #243a5c;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
}

:global(.tema-oscuro) .descripcion {
  color: #9fb2d1;
}

:global(.tema-oscuro) input {
  background: #0a172a;
  border-color: #314765;
  color: #e8f0ff;
}

@media (max-width: 600px) {
  .tarjeta-recuperacion {
    padding: 25px 20px;
  }
}
</style>