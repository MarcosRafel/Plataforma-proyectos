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
            aria-label="Regresar al panel principal"
            title="Regresar"
            @click="regresarAProyectos"
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
            Oportunidades y financiamiento
          </p>

          <h1>
            Convocatorias
          </h1>

          <p class="descripcion">
            Encuentra nuevas convocatorias, oportunidades y fuentes de financiamiento
            disponibles en Internet.
          </p>

        </div>


        <div
          class="cabecera-ilustracion"
          aria-hidden="true"
        >
          <span class="orbita orbita-1"></span>
          <span class="orbita orbita-2"></span>

          <div class="tarjeta-cabecera tarjeta-cabecera-atras">
            <span class="mini-linea mini-linea-corta"></span>
            <span class="mini-linea"></span>
            <span class="mini-linea mini-linea-media"></span>
          </div>

          <div class="tarjeta-cabecera tarjeta-cabecera-frente">
            <div class="icono-cabecera-globo">
              <svg viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="17"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                />
                <path
                  d="M7 24h34 M24 7c6 7 6 27 0 34 M24 7c-6 7-6 27 0 34"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <span class="mini-linea"></span>
            <span class="mini-linea mini-linea-media"></span>

            <div class="mini-avion">
              <svg viewBox="0 0 54 48">
                <path
                  d="M5 20 48 7 34 41 24 29 16 35 18 26Z"
                  fill="currentColor"
                />
                <path
                  d="M18 26 48 7 24 29"
                  fill="#0f5fcf"
                  opacity=".72"
                />
              </svg>
            </div>
          </div>

          <span class="destello-cabecera destello-cabecera-1"></span>
          <span class="destello-cabecera destello-cabecera-2"></span>
          <span class="destello-cabecera destello-cabecera-3"></span>
        </div>

      </header>


      <!-- ======================================== -->
      <!-- BUSCAR NUEVAS CONVOCATORIAS -->
      <!-- ======================================== -->
      <section class="buscador-convocatorias">

        <div class="contenido-convocatorias">

          <div class="encabezado-convocatorias">
            <div class="icono-megafono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 11v2a2 2 0 0 0 2 2h2l1.5 5h2L10 15h1l7 3V6l-7 3H6a2 2 0 0 0-2 2z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 9v6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="buscador-convocatorias-titulo">
              <h2>Buscar nuevas convocatorias</h2>

              <p>
                Escribe o dicta exactamente lo que deseas encontrar.
                La búsqueda se abrirá en Google sin modificar tu consulta.
              </p>

              <div
                class="buscador-etiquetas"
                aria-label="Características del buscador"
              >
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12.5 9.2 17 19 7"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Texto exacto
                </span>

                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="9"
                      y="3.5"
                      width="6"
                      height="11"
                      rx="3"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                    />
                    <path
                      d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3M9 20h6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                    />
                  </svg>
                  Dictado por voz
                </span>

                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5v12A1.5 1.5 0 0 0 5.5 20h12a1.5 1.5 0 0 0 1.5-1.5V16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13 4h7v7M12 12l8-8"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Nueva pestaña
                </span>
              </div>
            </div>
          </div>


          <div class="barra-convocatorias">
            <div class="campo-busqueda-convocatoria">
              <svg
                class="icono-busqueda"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M15 15l4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>

              <input
                v-model="busquedaConvocatoria"
                type="text"
                placeholder="Ej. inteligencia artificial, tecnología, investigación, educación..."
                @keyup.enter="buscarConvocatoria"
              />

              <button
                type="button"
                class="btn-voz"
                :class="{ activo: escuchando }"
                :title="escuchando ? 'Escuchando...' : 'Buscar por voz'"
                aria-label="Buscar por voz"
                @click="buscarPorVoz"
              >
                <img
                  :src="iconoMicrofono"
                  alt=""
                  class="icono-microfono"
                />
              </button>
            </div>

            <button
              type="button"
              class="btn-buscar-convocatoria"
              @click="buscarConvocatoria"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M15 15l4.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              Buscar
            </button>
          </div>


          <div
            v-if="escuchando"
            class="mensaje-voz"
          >
            <span class="indicador-escuchando"></span>
            Escuchando... habla ahora.
          </div>

          <div
            v-if="mensajeConvocatoria"
            class="mensaje-convocatoria"
          >
            {{ mensajeConvocatoria }}
          </div>

          <p class="ayuda-convocatorias">
            Puedes escribir tu búsqueda o utilizar el micrófono.
            Los resultados se abrirán en una nueva pestaña.
          </p>
        </div>


        <!-- DECORACIÓN -->
        <div
          class="decoracion-convocatorias"
          aria-hidden="true"
        >
          <span class="burbuja-fondo burbuja-fondo-1"></span>
          <span class="burbuja-fondo burbuja-fondo-2"></span>

          <div class="hoja-decorativa">
            <span class="doblez-hoja"></span>

            <div class="globo-decorativo">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.8"
                />
                <path
                  d="M6 24h36 M24 6 C31 13 31 35 24 42 M24 6 C17 13 17 35 24 42"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
                <path
                  d="M10 15 C18 19 30 19 38 15 M10 33 C18 29 30 29 38 33"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  opacity="0.75"
                />
              </svg>
            </div>

            <span class="linea-hoja linea-hoja-1"></span>
            <span class="linea-hoja linea-hoja-2"></span>
            <span class="linea-hoja linea-hoja-3"></span>
            <span class="linea-hoja linea-hoja-4"></span>

            <div class="avion-papel">
              <svg
                viewBox="0 0 54 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 20 L48 7 L34 41 L24 29 L16 35 L18 26 Z"
                  fill="#1972ed"
                />
                <path
                  d="M18 26 L48 7 L24 29"
                  fill="#0f5fcf"
                  opacity="0.92"
                />
                <path
                  d="M24 29 L34 41 L29 28"
                  fill="#69a2f6"
                />
              </svg>
            </div>

            <span class="destello-hoja destello-hoja-1"></span>
            <span class="destello-hoja destello-hoja-2"></span>
          </div>

          <div class="mensaje-ilustracion">
            <div class="texto-decorativo">
              Nuevas<br>
              oportunidades<br>
              para grandes ideas
            </div>

            <svg
              class="flecha-decorativa"
              viewBox="0 0 92 62"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 50 C35 58 67 44 75 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <path
                d="M68 22 L76 14 L82 25"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>


      <!-- ======================================== -->
      <!-- CÓMO UTILIZAR EL BUSCADOR -->
      <!-- ======================================== -->
      <section
        class="guia-busqueda"
        aria-label="Cómo utilizar el buscador de convocatorias"
      >

        <article class="guia-item">
          <span class="guia-numero">1</span>

          <div class="guia-icono">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 6.5h15v11h-15Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 10h9M7.5 14h6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <strong>Escribe o dicta</strong>
            <p>
              Introduce las palabras que quieres buscar o utiliza el micrófono.
            </p>
          </div>
        </article>


        <article class="guia-item">
          <span class="guia-numero">2</span>

          <div class="guia-icono">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="10.5"
                cy="10.5"
                r="5.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="m15 15 4.5 4.5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <strong>Revisa la consulta</strong>
            <p>
              El texto reconocido permanece en el campo para que puedas comprobarlo.
            </p>
          </div>
        </article>


        <article class="guia-item">
          <span class="guia-numero">3</span>

          <div class="guia-icono">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 12h12M14 7l5 5-5 5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div>
            <strong>Pulsa Buscar</strong>
            <p>
              Google abrirá una nueva pestaña con exactamente el texto del campo.
            </p>
          </div>
        </article>

      </section>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import iconoMicrofono from '../assets/microfono.png'


// ========================================
// NAVEGACIÓN Y TEMA GLOBAL
// El tema se controla desde ProyectosView.vue.
// Esta vista únicamente refleja el estado global.
// ========================================
const router = useRouter()
const { modoOscuro } = useTema()


const regresarAProyectos = () => {
  router.push('/proyectos')
}


// ========================================
// BUSCAR NUEVAS CONVOCATORIAS
// ========================================
const busquedaConvocatoria = ref('')
const escuchando = ref(false)
const mensajeConvocatoria = ref('')


// ========================================
// BÚSQUEDA EN INTERNET
// Usa exactamente el texto escrito o dictado.
// No añade palabras automáticamente.
// ========================================
const buscarConvocatoria = () => {
  mensajeConvocatoria.value = ''

  const texto = busquedaConvocatoria.value.trim()

  if (texto === '') {
    mensajeConvocatoria.value =
      'Escribe o dicta qué tipo de convocatoria deseas buscar.'
    return
  }

  const consultaCodificada = encodeURIComponent(texto)
  const url = `https://www.google.com/search?q=${consultaCodificada}`

  window.open(
    url,
    '_blank',
    'noopener,noreferrer'
  )
}


// ========================================
// BÚSQUEDA POR VOZ
// Solo transcribe al campo.
// No ejecuta la búsqueda automáticamente.
// ========================================
const buscarPorVoz = () => {
  mensajeConvocatoria.value = ''

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    mensajeConvocatoria.value =
      'El reconocimiento de voz no está disponible en este navegador. Puedes realizar la búsqueda escribiendo el texto.'
    return
  }

  const reconocimiento = new SpeechRecognition()

  reconocimiento.lang = 'es-MX'
  reconocimiento.interimResults = false
  reconocimiento.maxAlternatives = 1

  escuchando.value = true

  try {
    reconocimiento.start()
  } catch (error) {
    console.error(
      'Error al iniciar reconocimiento de voz:',
      error
    )

    escuchando.value = false
    mensajeConvocatoria.value =
      'No fue posible iniciar el reconocimiento de voz.'
    return
  }

  reconocimiento.onresult = evento => {
    const textoReconocido =
      evento.results[0][0].transcript

    busquedaConvocatoria.value = textoReconocido
    mensajeConvocatoria.value = ''
  }

  reconocimiento.onend = () => {
    escuchando.value = false
  }

  reconocimiento.onerror = evento => {
    escuchando.value = false

    if (evento.error === 'not-allowed') {
      mensajeConvocatoria.value =
        'No se otorgó permiso para utilizar el micrófono.'
      return
    }

    if (evento.error === 'no-speech') {
      mensajeConvocatoria.value =
        'No se detectó voz. Intenta nuevamente.'
      return
    }

    mensajeConvocatoria.value =
      'No fue posible reconocer la voz. Intenta nuevamente.'
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}


/* ========================================
   PÁGINA
======================================== */
.pagina {
  width: 100%;
  min-height: 100vh;
  padding: 24px 26px 40px;

  background:
    radial-gradient(
      circle at 7% 3%,
      rgba(219, 234, 254, 0.75),
      transparent 25%
    ),
    radial-gradient(
      circle at 94% 2%,
      rgba(219, 234, 254, 0.6),
      transparent 24%
    ),
    #f7faff;

  color: #0b1f50;
}

.contenido {
  width: 100%;
  max-width: 1650px;
  margin: 0 auto;
}


/* ========================================
   CABECERA DE LA VISTA
   Misma línea visual que ProyectoNuevoView.vue
======================================== */

.cabecera-pagina {
  position: relative;
  isolation: isolate;

  min-height: 154px;

  display: grid;

  grid-template-columns:
    minmax(320px, 1fr)
    minmax(300px, 0.55fr);

  align-items: center;

  gap: 40px;

  margin-bottom: 22px;

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

  width: 470px;
  height: 190px;

  top: -105px;
  right: 8%;

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

  width: 165px;
  height: 165px;

  right: -62px;
  bottom: -92px;

  background:
    rgba(
      210,
      230,
      255,
      0.26
    );

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

  letter-spacing: -0.5px;
}


.descripcion {
  max-width: 680px;

  margin:
    7px
    0
    0;

  color: #5875a6;

  font-size: 14px;

  line-height: 1.5;
}


/* ========================================
   ILUSTRACIÓN DE CABECERA
======================================== */

.cabecera-ilustracion {
  position: relative;
  isolation: isolate;

  justify-self: end;

  width: 310px;
  height: 126px;

  margin-right: 12px;
}


.cabecera-ilustracion::before {
  content: '';

  position: absolute;
  z-index: -1;

  width: 220px;
  height: 92px;

  right: 8px;
  bottom: 2px;

  background:
    radial-gradient(
      ellipse at center,
      rgba(167, 202, 247, 0.31),
      rgba(167, 202, 247, 0.05) 67%,
      transparent 72%
    );

  border-radius: 50%;

  transform:
    rotate(-8deg);
}


.orbita {
  position: absolute;

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


.orbita-1 {
  width: 118px;
  height: 118px;

  right: 5px;
  top: -17px;
}


.orbita-2 {
  width: 72px;
  height: 72px;

  right: 28px;
  top: 6px;

  border-style: dashed;

  opacity: 0.70;
}


.tarjeta-cabecera {
  position: absolute;

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98),
      rgba(248, 252, 255, 0.96)
    );

  border:
    1px solid
    rgba(
      205,
      223,
      246,
      0.85
    );

  border-radius: 10px;

  box-shadow:
    0 11px 24px
    rgba(
      43,
      91,
      151,
      0.10
    );
}


.tarjeta-cabecera-atras {
  width: 122px;
  height: 84px;

  left: 42px;
  top: 30px;

  padding:
    20px
    17px;

  transform:
    rotate(-9deg);

  opacity: 0.78;
}


.tarjeta-cabecera-frente {
  width: 142px;
  height: 108px;

  right: 40px;
  top: 6px;

  padding:
    14px
    14px;

  transform:
    rotate(7deg);
}


.icono-cabecera-globo {
  position: absolute;

  width: 38px;
  height: 38px;

  top: 9px;
  right: 10px;

  color: #176ff0;
}


.icono-cabecera-globo svg {
  width: 100%;
  height: 100%;
}


.mini-linea {
  display: block;

  width: 82px;
  height: 6px;

  margin-bottom: 10px;

  background:
    linear-gradient(
      90deg,
      #dceafb,
      #d2e4fa
    );

  border-radius: 999px;
}


.mini-linea-corta {
  width: 43px;
}


.mini-linea-media {
  width: 62px;
}


.tarjeta-cabecera-frente > .mini-linea {
  margin-top: 45px;
  margin-left: 4px;
}


.tarjeta-cabecera-frente > .mini-linea-media {
  margin-top: 0;
}


.mini-avion {
  position: absolute;

  width: 33px;
  height: 29px;

  right: 9px;
  bottom: 8px;

  color: #1972ed;

  filter:
    drop-shadow(
      0 3px 3px
      rgba(
        19,
        94,
        198,
        0.12
      )
    );
}


.mini-avion svg {
  width: 100%;
  height: 100%;
}


.destello-cabecera {
  position: absolute;

  display: block;

  border-radius: 50%;

  background:
    #79a9e8;

  opacity: 0.48;
}


.destello-cabecera-1 {
  width: 7px;
  height: 7px;

  top: 11px;
  left: 18px;
}


.destello-cabecera-2 {
  width: 4px;
  height: 4px;

  top: 28px;
  left: 6px;
}


.destello-cabecera-3 {
  width: 5px;
  height: 5px;

  right: 12px;
  bottom: 17px;
}


/* ========================================
   BUSCADOR DE CONVOCATORIAS
======================================== */
.buscador-convocatorias {
  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 224px;

  display: flex;
  align-items: stretch;

  padding: 27px 30px 22px;

  background:
    linear-gradient(
      112deg,
      #eaf4ff 0%,
      #e8f3ff 40%,
      #d8ebff 72%,
      #cfe6ff 100%
    );

  border: 1px solid #d5e7fb;
  border-radius: 14px;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    0 6px 24px rgba(63, 112, 179, 0.06);

  overflow: hidden;

  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background 0.25s ease;
}

.buscador-convocatorias:hover {
  transform: translateY(-2px);
  border-color: #c9def7;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    0 10px 28px rgba(63, 112, 179, 0.09);
}

.buscador-convocatorias:hover .icono-megafono {
  transform: scale(1.035);
}

.buscador-convocatorias::before {
  content: "";
  position: absolute;
  z-index: -2;

  width: 660px;
  height: 245px;
  top: -102px;
  right: 260px;

  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.52),
      rgba(194, 221, 252, 0.12)
    );

  border-radius: 50%;
  transform: rotate(-10deg);
  pointer-events: none;
}

.buscador-convocatorias::after {
  content: "";
  position: absolute;
  z-index: -2;

  width: 560px;
  height: 240px;
  right: -128px;
  bottom: -145px;

  background:
    radial-gradient(
      ellipse at center,
      rgba(179, 214, 251, 0.72),
      rgba(179, 214, 251, 0.05) 68%,
      transparent 72%
    );

  border-radius: 50%;
  transform: rotate(-8deg);
  pointer-events: none;
}

.contenido-convocatorias {
  position: relative;
  z-index: 3;
  width: 74%;
}

.encabezado-convocatorias {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
}

.icono-megafono {
  position: relative;

  width: 66px;
  height: 66px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #1468ee;

  background:
    linear-gradient(
      145deg,
      #d9ebff,
      #bfdcff
    );

  border: 1px solid rgba(90, 151, 231, 0.12);
  border-radius: 14px;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 7px 16px rgba(59, 116, 189, 0.08);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.icono-megafono::after {
  content: "";
  position: absolute;

  width: 16px;
  height: 16px;
  top: 7px;
  right: 7px;

  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.92) 0 25%,
      transparent 30%
    );

  opacity: 0.8;
}

.icono-megafono svg {
  width: 37px;
  height: 37px;

  filter:
    drop-shadow(
      0 2px 2px rgba(20, 104, 238, 0.08)
    );
}

.buscador-convocatorias-titulo h2 {
  margin: 0;
  color: #09205c;
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.15px;
}

.buscador-convocatorias-titulo p {
  margin: 6px 0 0;
  color: #45659b;
  font-size: 13px;
  line-height: 1.5;
}




.buscador-etiquetas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 7px;

  margin-top: 10px;
}


.buscador-etiquetas span {
  min-height: 27px;

  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding:
    0
    9px;

  background:
    rgba(
      255,
      255,
      255,
      0.48
    );

  border:
    1px solid
    rgba(
      148,
      184,
      229,
      0.28
    );

  border-radius: 999px;

  color: #5578aa;

  font-size: 10px;
  font-weight: 680;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.65
    );
}


.buscador-etiquetas svg {
  width: 14px;
  height: 14px;

  color: #2475e8;
}



/* ========================================
   BARRA DE BÚSQUEDA
======================================== */
.barra-convocatorias {
  display: flex;
  gap: 11px;
}

.campo-busqueda-convocatoria {
  position: relative;
  flex: 1;
  min-width: 0;
}

.campo-busqueda-convocatoria input {
  width: 100%;
  height: 48px;

  padding: 0 52px 0 48px;

  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #c7d8ef;
  border-radius: 8px;

  box-shadow:
    0 2px 8px rgba(51, 91, 151, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  color: #172c59;
  font-size: 14px;
  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.campo-busqueda-convocatoria input::placeholder {
  color: #8495b5;
}

.campo-busqueda-convocatoria input:hover {
  border-color: #abc5e9;
}

.campo-busqueda-convocatoria input:focus {
  background: white;
  border-color: #1a6df0;

  box-shadow:
    0 0 0 3px rgba(26, 109, 240, 0.08),
    0 4px 12px rgba(51, 91, 151, 0.06);
}

.icono-busqueda {
  position: absolute;
  top: 50%;
  left: 17px;
  z-index: 2;

  width: 20px;
  height: 20px;

  transform: translateY(-50%);
  color: #6682b3;
}


/* ========================================
   MICRÓFONO
======================================== */
.btn-voz {
  position: absolute;
  top: 50%;
  right: 7px;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  transform: translateY(-50%);

  background: transparent;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.btn-voz:hover {
  background: #edf4ff;
}

.btn-voz.activo {
  background: #dbeafe;
}

.icono-microfono {
  width: 22px;
  height: 22px;
  display: block;
  object-fit: contain;
  pointer-events: none;
}


/* ========================================
   BOTÓN BUSCAR
======================================== */
.btn-buscar-convocatoria {
  min-width: 150px;
  height: 48px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  padding: 0 25px;

  background:
    linear-gradient(
      135deg,
      #1974f6,
      #075ee9
    );

  color: white;

  border: 1px solid rgba(5, 84, 205, 0.08);
  border-radius: 8px;

  box-shadow:
    0 6px 14px rgba(17, 103, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  font-size: 14px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.btn-buscar-convocatoria svg {
  width: 21px;
  height: 21px;
}

.btn-buscar-convocatoria:hover {
  transform: translateY(-1px);
  filter: saturate(1.04);

  box-shadow:
    0 8px 18px rgba(17, 103, 235, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn-buscar-convocatoria:active {
  transform: translateY(0);
}


/* ========================================
   MENSAJES
======================================== */
.mensaje-voz {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 10px;

  color: #c82828;
  font-size: 12px;
}

.indicador-escuchando {
  width: 8px;
  height: 8px;

  background: #dc2626;
  border-radius: 50%;

  animation: pulso 1.2s infinite;
}

@keyframes pulso {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.45;
    transform: scale(1.4);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.mensaje-convocatoria {
  margin-top: 10px;
  padding: 9px 12px;

  background: rgba(255, 247, 237, 0.9);
  border: 1px solid #fed7aa;
  border-radius: 7px;

  color: #9a3412;
  font-size: 12px;
}

.ayuda-convocatorias {
  margin: 8px 0 0;
  color: #5d79aa;
  font-size: 11px;
}


/* ========================================
   DECORACIÓN
======================================== */
.decoracion-convocatorias {
  position: absolute;
  z-index: 2;

  top: 10px;
  right: 22px;
  bottom: 0;

  width: 330px;
  pointer-events: none;
}

.burbuja-fondo {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
}

.burbuja-fondo-1 {
  width: 115px;
  height: 115px;
  top: -43px;
  right: 130px;
}

.burbuja-fondo-2 {
  width: 73px;
  height: 73px;
  right: -8px;
  bottom: 2px;
  background: rgba(137, 188, 246, 0.13);
}

.hoja-decorativa {
  position: absolute;
  top: 10px;
  left: 8px;

  width: 150px;
  height: 176px;

  transform: rotate(-11deg);

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98),
      rgba(251, 253, 255, 0.95)
    );

  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 9px;

  box-shadow:
    0 15px 28px rgba(43, 91, 151, 0.12);

  overflow: hidden;
}

.hoja-decorativa::before {
  content: "";
  position: absolute;

  width: 100px;
  height: 100px;
  left: -54px;
  bottom: -63px;

  background:
    radial-gradient(
      circle,
      rgba(203, 226, 254, 0.36),
      transparent 68%
    );

  border-radius: 50%;
}

.doblez-hoja {
  position: absolute;
  top: 0;
  right: 0;

  width: 20px;
  height: 20px;

  background:
    linear-gradient(
      225deg,
      #e3effd 0 49%,
      transparent 50%
    );

  opacity: 0.78;
}

.globo-decorativo {
  position: absolute;
  top: 13px;
  right: 12px;

  width: 45px;
  height: 45px;
  color: #176ff0;
}

.globo-decorativo svg {
  width: 100%;
  height: 100%;
}

.linea-hoja {
  position: absolute;
  left: 18px;

  height: 7px;

  background:
    linear-gradient(
      90deg,
      #dceafb,
      #d2e4fa
    );

  border-radius: 999px;
}

.linea-hoja-1 {
  top: 37px;
  width: 47px;
}

.linea-hoja-2 {
  top: 68px;
  width: 101px;
}

.linea-hoja-3 {
  top: 91px;
  width: 109px;
}

.linea-hoja-4 {
  top: 114px;
  width: 80px;
}

.avion-papel {
  position: absolute;
  right: 12px;
  bottom: 9px;

  width: 45px;
  height: 40px;

  filter:
    drop-shadow(
      0 3px 3px rgba(19, 94, 198, 0.12)
    );
}

.avion-papel svg {
  width: 100%;
  height: 100%;
  display: block;
}

.destello-hoja {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8ab7f5;
  opacity: 0.48;
}

.destello-hoja-1 {
  left: 20px;
  bottom: 21px;
}

.destello-hoja-2 {
  left: 33px;
  bottom: 12px;
  width: 4px;
  height: 4px;
  opacity: 0.34;
}

.mensaje-ilustracion {
  position: absolute;
  top: 39px;
  right: -1px;
  width: 157px;
  height: 126px;
}

.texto-decorativo {
  position: absolute;
  top: 0;
  left: 4px;

  color: #245393;

  font-size: 14px;
  font-weight: 550;
  font-style: italic;
  line-height: 1.42;
  letter-spacing: 0.05px;

  transform: rotate(-7deg);
}

.flecha-decorativa {
  position: absolute;
  right: 2px;
  bottom: 0;

  width: 82px;
  height: 56px;

  color: #3d7fc5;
  opacity: 0.9;
}




/* ========================================
   GUÍA DE USO
======================================== */

.guia-busqueda {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 14px;

  margin-top: 18px;
}


.guia-item {
  position: relative;

  min-height: 112px;

  display: grid;

  grid-template-columns:
    auto
    auto
    minmax(0, 1fr);

  align-items: center;

  gap: 12px;

  padding:
    17px
    18px;

  background:
    rgba(
      255,
      255,
      255,
      0.90
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 12px;

  box-shadow:
    0 4px 17px
    rgba(
      48,
      84,
      137,
      0.04
    );

  overflow: hidden;

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.guia-item::before {
  content: '';

  position: absolute;

  width: 100px;
  height: 100px;

  right: -55px;
  bottom: -65px;

  background:
    radial-gradient(
      circle,
      rgba(
        205,
        226,
        254,
        0.46
      ),
      transparent 68%
    );

  border-radius: 50%;

  pointer-events: none;
}


.guia-item:hover {
  transform:
    translateY(-2px);

  border-color:
    #c8dcf3;

  box-shadow:
    0 9px 22px
    rgba(
      48,
      84,
      137,
      0.08
    );
}


.guia-numero {
  align-self: flex-start;

  min-width: 24px;
  height: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-top: 3px;

  background:
    linear-gradient(
      135deg,
      #e8f2ff,
      #d9eaff
    );

  border:
    1px solid
    #d4e5f8;

  border-radius: 50%;

  color: #4278bd;

  font-size: 10px;
  font-weight: 800;
}


.guia-icono {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e9f3ff,
      #dcecff
    );

  border:
    1px solid
    #d7e7fa;

  border-radius: 10px;

  color: #1468ee;
}


.guia-icono svg {
  width: 22px;
  height: 22px;
}


.guia-item strong {
  display: block;

  margin-bottom: 4px;

  color: #17315d;

  font-size: 13px;
  font-weight: 740;
}


.guia-item p {
  margin: 0;

  color: #667fa7;

  font-size: 11px;

  line-height: 1.45;
}



/* ========================================
   MODO OSCURO
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

  color: #dbeafe;
}



.modo-oscuro .cabecera-pagina {
  background:
    rgba(
      22,
      34,
      53,
      0.94
    );

  border-color:
    #30445f;

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


.modo-oscuro .subtitulo {
  color: #91a8cc;
}


.modo-oscuro .cabecera-pagina h1 {
  color: #edf5ff;
}


.modo-oscuro .descripcion {
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

  box-shadow:
    0 7px 16px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .tarjeta-cabecera {
  background:
    linear-gradient(
      180deg,
      #1b2b42,
      #17263b
    );

  border-color:
    #3a506f;

  box-shadow:
    0 12px 26px
    rgba(
      0,
      0,
      0,
      0.20
    );
}


.modo-oscuro .mini-linea {
  background:
    linear-gradient(
      90deg,
      #39526f,
      #314865
    );
}


.modo-oscuro .icono-cabecera-globo,
.modo-oscuro .mini-avion {
  color: #69a5ff;
}


.modo-oscuro .orbita {
  border-color:
    rgba(
      111,
      159,
      221,
      0.19
    );
}


.modo-oscuro .cabecera-ilustracion::before {
  background:
    radial-gradient(
      ellipse at center,
      rgba(
        75,
        120,
        181,
        0.18
      ),
      transparent 70%
    );
}


.modo-oscuro .destello-cabecera {
  background: #73a8e8;
}


.modo-oscuro .buscador-etiquetas span {
  background:
    rgba(
      26,
      43,
      67,
      0.64
    );

  border-color:
    rgba(
      87,
      126,
      177,
      0.28
    );

  color: #9db5d8;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.025
    );
}


.modo-oscuro .buscador-etiquetas svg {
  color: #69a5ff;
}


.modo-oscuro .guia-item {
  background:
    rgba(
      20,
      31,
      49,
      0.94
    );

  border-color:
    #2f425e;

  box-shadow:
    0 8px 22px
    rgba(
      0,
      0,
      0,
      0.10
    );
}


.modo-oscuro .guia-item:hover {
  border-color:
    #3e5879;

  box-shadow:
    0 12px 26px
    rgba(
      0,
      0,
      0,
      0.17
    );
}


.modo-oscuro .guia-numero {
  background:
    linear-gradient(
      145deg,
      #253a58,
      #29486f
    );

  border-color:
    #36577f;

  color: #9bc1f1;
}


.modo-oscuro .guia-icono {
  background:
    linear-gradient(
      145deg,
      #263c5e,
      #294a78
    );

  border-color:
    #36577f;

  color: #69a5ff;
}


.modo-oscuro .guia-item strong {
  color: #edf5ff;
}


.modo-oscuro .guia-item p {
  color: #9eb2d4;
}



.modo-oscuro .barra-superior {
  background: rgba(20, 31, 49, 0.97);
  border-color: #2f425e;

  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.14);
}


.modo-oscuro 

.modo-oscuro 

.modo-oscuro 

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
    0 4px 12px rgba(0, 0, 0, 0.12);
}


.modo-oscuro .btn-regresar:hover {
  background:
    linear-gradient(
      135deg,
      #223752,
      #1e3049
    );

  border-color: #4f6f99;
  color: #7fb4ff;

  box-shadow:
    0 7px 16px rgba(0, 0, 0, 0.18);
}


.modo-oscuro .buscador-convocatorias {
  background:
    radial-gradient(
      circle at 12% 20%,
      rgba(71, 106, 158, 0.16),
      transparent 24%
    ),
    radial-gradient(
      circle at 72% 0%,
      rgba(49, 92, 153, 0.24),
      transparent 36%
    ),
    linear-gradient(
      112deg,
      #17263d 0%,
      #192a45 48%,
      #1b3151 100%
    );

  border-color: #304665;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.modo-oscuro .buscador-convocatorias:hover {
  border-color: #3c587c;

  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.20),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}


.modo-oscuro .buscador-convocatorias::before {
  background: rgba(100, 146, 211, 0.06);
}

.modo-oscuro .buscador-convocatorias::after {
  background: rgba(57, 101, 163, 0.12);
}

.modo-oscuro .icono-megafono {
  background: linear-gradient(145deg, #263c5e, #294a78);
  border-color: #36577f;
  color: #69a5ff;
}

.modo-oscuro .buscador-convocatorias-titulo h2 {
  color: #edf5ff;
}

.modo-oscuro .buscador-convocatorias-titulo p {
  color: #a5b7d5;
}

.modo-oscuro .ayuda-convocatorias {
  color: #91a7ca;
}

.modo-oscuro .texto-decorativo {
  color: #a9c7f4;
}

.modo-oscuro .flecha-decorativa {
  color: #86afe5;
}

.modo-oscuro .campo-busqueda-convocatoria input {
  background: #111c2e;
  border-color: #3b4d68;
  color: #eef5ff;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.12);
}

.modo-oscuro .campo-busqueda-convocatoria input::placeholder {
  color: #768aa9;
}

.modo-oscuro .campo-busqueda-convocatoria input:hover {
  border-color: #4d6384;
}

.modo-oscuro .campo-busqueda-convocatoria input:focus {
  background: #142138;
  border-color: #5594f1;
  box-shadow: 0 0 0 4px rgba(65, 139, 241, 0.12);
}

.modo-oscuro .icono-busqueda {
  color: #8197ba;
}

.modo-oscuro .btn-voz:hover {
  background: #263b5a;
}

.modo-oscuro .btn-voz.activo {
  background: #304b73;
}

.modo-oscuro .mensaje-convocatoria {
  background: rgba(124, 62, 20, 0.22);
  border-color: rgba(251, 146, 60, 0.34);
  color: #fdba74;
}

.modo-oscuro .hoja-decorativa {
  opacity: 0.88;
  filter: brightness(0.88) saturate(0.9);
}




@media (max-width: 1100px) {

  .cabecera-pagina {
    grid-template-columns:
      minmax(300px, 1fr)
      minmax(250px, 0.55fr);

    gap: 28px;
  }


  .cabecera-ilustracion {
    width: 270px;

    transform:
      scale(0.92);

    transform-origin:
      right center;
  }


  .guia-busqueda {
    grid-template-columns:
      1fr
      1fr;
  }

}


@media (max-width: 900px) {

  .cabecera-pagina {
    grid-template-columns:
      1fr;
  }


  .cabecera-ilustracion {
    position: absolute;

    right: 18px;
    top: 10px;

    opacity: 0.18;

    pointer-events: none;
  }


  .cabecera-texto {
    max-width: 680px;
  }

}


@media (max-width: 700px) {

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


  .guia-busqueda {
    grid-template-columns:
      1fr;
  }


  .buscador-etiquetas {
    gap: 6px;
  }


  .buscador-etiquetas span {
    font-size: 9px;
  }

}



/* ========================================
   RESPONSIVE
======================================== */
@media (max-width: 1100px) {
  .contenido-convocatorias {
    width: 70%;
  }

  .decoracion-convocatorias {
    right: 15px;
    transform: scale(0.9);
    transform-origin: right center;
  }
}

@media (max-width: 950px) {
  .pagina {
    padding: 22px 20px 35px;
  }

  .decoracion-convocatorias {
    display: none;
  }

  .contenido-convocatorias {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .pagina {
    padding: 18px 14px 30px;
  }

  .buscador-convocatorias {
    min-height: 0;
    padding: 18px;
  }

  .encabezado-convocatorias {
    align-items: flex-start;
    gap: 13px;
  }

  .icono-megafono {
    width: 48px;
    height: 48px;
  }

  .icono-megafono svg {
    width: 27px;
    height: 27px;
  }

  .buscador-convocatorias-titulo h2 {
    font-size: 17px;
  }

  .buscador-convocatorias-titulo p {
    font-size: 12px;
  }

  .barra-convocatorias {
    flex-direction: column;
  }

  .campo-busqueda-convocatoria input {
    height: 48px;
    font-size: 16px;
  }

  .btn-buscar-convocatoria {
    width: 100%;
    height: 48px;
  }
}

@media (max-width: 520px) {
  .pagina {
    padding:
      16px
      12px
      26px;
  }

  .buscador-convocatorias {
    padding:
      16px;
  }

  .encabezado-convocatorias {
    gap: 11px;
  }
}

/* ========================================
   ACCESIBILIDAD: REDUCIR MOVIMIENTO
======================================== */
@media (prefers-reduced-motion: reduce) {
  .cabecera-pagina,
  .btn-regresar,
  .btn-regresar svg,
  .buscador-convocatorias,
  .icono-megafono,
  .btn-voz,
  .btn-buscar-convocatoria,
  .guia-item,
  .tarjeta-cabecera {
    transition: none !important;
  }

  .btn-regresar:hover,
  .buscador-convocatorias:hover,
  .btn-buscar-convocatoria:hover,
  .guia-item:hover {
    transform: none !important;
  }

  .indicador-escuchando {
    animation: none !important;
  }
}

</style>
