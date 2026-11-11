<template>
  <main class="login-page">

    <!-- ========================================
         PANEL VISUAL
    ========================================= -->
    <section class="panel-visual">

      <div class="contenido-visual">

        <!-- MARCA -->
        <header class="marca">

          <!-- Logo original construido en SVG -->
          <div class="logo-proyectos" aria-hidden="true">
            <svg viewBox="0 0 72 72">
              <defs>
                <linearGradient id="logoCaraA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#60a5fa" />
                  <stop offset="100%" stop-color="#176ff2" />
                </linearGradient>

                <linearGradient id="logoCaraB" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#2d7ef5" />
                  <stop offset="100%" stop-color="#0d57c7" />
                </linearGradient>

                <linearGradient id="logoCaraC" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#9bc8ff" />
                  <stop offset="100%" stop-color="#4b94f5" />
                </linearGradient>
              </defs>

              <!-- Hexágono exterior -->
              <path
                d="M36 5 62 20v32L36 67 10 52V20Z"
                fill="rgba(255,255,255,.25)"
                stroke="rgba(255,255,255,.72)"
                stroke-width="1.4"
              />

              <!-- Símbolo cúbico propio -->
              <path
                d="M36 12 57 24 36 36 15 24Z"
                fill="url(#logoCaraC)"
              />
              <path
                d="M15 24 36 36v24L15 48Z"
                fill="url(#logoCaraA)"
              />
              <path
                d="M57 24 36 36v24l21-12Z"
                fill="url(#logoCaraB)"
              />

              <!-- Vacío central distintivo -->
              <path
                d="M36 20 48 27 36 34 24 27Z"
                fill="var(--logo-centro)"
              />
              <path
                d="M24 27 36 34v14l-12-7Z"
                fill="var(--logo-centro)"
                opacity=".78"
              />
              <path
                d="M48 27 36 34v14l12-7Z"
                fill="var(--logo-centro)"
                opacity=".56"
              />
            </svg>
          </div>

          <div class="marca-texto">
            <h1>Proyectos</h1>
            <p>Gestión y oportunidades</p>
          </div>

        </header>

        <span class="linea-marca"></span>


        <!-- MENSAJE -->
        <div class="mensaje-principal">
          <h2>
            Grandes proyectos<br />
            comienzan con<br />
            <strong>grandes personas</strong>
          </h2>

          <p>
            Una plataforma para impulsar la investigación,
            la innovación y el desarrollo de nuestra
            comunidad académica.
          </p>
        </div>


        <!-- BENEFICIOS -->
        <div class="beneficios">

          <article class="beneficio">
            <div class="icono-beneficio">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20v-2.2C3 15.7 4.7 14 6.8 14h2.4c2.1 0 3.8 1.7 3.8 3.8V20m-1.8-5.2c.6-.5 1.4-.8 2.2-.8h2.8c2.1 0 3.8 1.7 3.8 3.8V20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <strong>Crea</strong>
              <span>Construye proyectos con tu equipo</span>
            </div>
          </article>


          <article class="beneficio">
            <div class="icono-beneficio">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 19V10m7 9V5m7 14v-7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <strong>Organiza</strong>
              <span>Gestiona tus proyectos</span>
            </div>
          </article>


          <article class="beneficio">
            <div class="icono-beneficio">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9.2 17.6h5.6M10 20h4m-7.2-9.3A5.2 5.2 0 1 1 17.2 10.7c0 2-1 3-2.2 4.2-.7.6-1 1.1-1.1 1.8h-3.8c-.1-.7-.4-1.2-1.1-1.8-1.2-1.2-2.2-2.2-2.2-4.2Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <strong>Impulsa</strong>
              <span>Convierte ideas en oportunidades</span>
            </div>
          </article>

        </div>

      </div>


      <!-- ILUSTRACIÓN DETALLADA -->
      <div class="ilustracion-montanas ilustracion-detallada" aria-hidden="true">
        <svg
          class="paisaje-login"
          viewBox="0 110 1100 650"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>

            <!-- CIELO -->
            <linearGradient id="cieloLoginDetallado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--cielo-superior)" />
              <stop offset="58%" stop-color="var(--cielo-medio)" />
              <stop offset="100%" stop-color="var(--cielo-inferior)" />
            </linearGradient>

            <!-- MONTAÑAS -->
            <linearGradient id="montanaFondoLogin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--montana-fondo-a)" />
              <stop offset="100%" stop-color="var(--montana-fondo-b)" />
            </linearGradient>

            <linearGradient id="montanaMediaLogin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--montana-media-a)" />
              <stop offset="100%" stop-color="var(--montana-media-b)" />
            </linearGradient>

            <linearGradient id="montanaPrincipalLogin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--montana-principal-a)" />
              <stop offset="100%" stop-color="var(--montana-principal-b)" />
            </linearGradient>

            <linearGradient id="montanaFrenteLogin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="var(--montana-frente-a)" />
              <stop offset="100%" stop-color="var(--montana-frente-b)" />
            </linearGradient>

            <!-- RÍO -->
            <linearGradient id="rioLoginDetallado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--rio-claro)" />
              <stop offset="100%" stop-color="var(--rio-oscuro)" />
            </linearGradient>

            <!-- SUELO -->
            <linearGradient id="sueloLoginDetallado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--colina-1)" />
              <stop offset="100%" stop-color="var(--colina-2)" />
            </linearGradient>

            <!-- RESPLANDOR -->
            <radialGradient id="resplandorLoginDetallado">
              <stop offset="0%" stop-color="var(--resplandor-centro)" />
              <stop offset="100%" stop-color="var(--resplandor-borde)" />
            </radialGradient>

          </defs>


          <!-- ====================================== -->
          <!-- CIELO -->
          <!-- ====================================== -->

          <rect
            class="paisaje-cielo"
            width="1100"
            height="760"
            fill="url(#cieloLoginDetallado)"
          />

          <circle
            class="paisaje-resplandor"
            cx="770"
            cy="240"
            r="160"
            fill="url(#resplandorLoginDetallado)"
          />


          <!-- ====================================== -->
          <!-- NUBES -->
          <!-- ====================================== -->

          <g class="nubes-login">

            <g class="nube-login nube-login-1">
              <ellipse cx="640" cy="142" rx="63" ry="25" />
              <ellipse cx="685" cy="142" rx="48" ry="21" />
              <ellipse cx="596" cy="149" rx="38" ry="17" />
              <ellipse cx="656" cy="125" rx="38" ry="25" />
            </g>

            <g class="nube-login nube-login-2">
              <ellipse cx="887" cy="199" rx="54" ry="22" />
              <ellipse cx="930" cy="201" rx="39" ry="18" />
              <ellipse cx="849" cy="205" rx="32" ry="15" />
              <ellipse cx="900" cy="185" rx="34" ry="22" />
            </g>

            <g class="nube-login nube-login-3">
              <ellipse cx="458" cy="233" rx="46" ry="18" />
              <ellipse cx="494" cy="236" rx="35" ry="16" />
              <ellipse cx="426" cy="239" rx="27" ry="13" />
            </g>

          </g>


          <!-- ====================================== -->
          <!-- MONTAÑAS DISTANTES -->
          <!-- ====================================== -->

          <g class="capa-paisaje capa-fondo-login">

            <path
              class="montana-fondo-login"
              d="
                M0 500
                86 445
                156 468
                245 396
                322 470
                412 405
                486 465
                586 392
                670 470
                755 409
                839 475
                930 386
                1010 459
                1100 414
                1100 760
                0 760
                Z
              "
              fill="url(#montanaFondoLogin)"
            />

            <path
              class="niebla-montana-login"
              d="
                M0 492
                C160 474 262 490 390 476
                C516 463 635 475 770 460
                C908 444 1000 453 1100 438
                V530
                H0
                Z
              "
            />

          </g>


          <!-- ====================================== -->
          <!-- MONTAÑAS MEDIAS -->
          <!-- ====================================== -->

          <g class="capa-paisaje capa-media-login">

            <path
              class="montana-media-login"
              d="
                M48 560
                265 335
                456 560
                Z
              "
              fill="url(#montanaMediaLogin)"
            />

            <path
              class="sombra-media-login"
              d="
                M265 335
                456 560
                320 560
                268 455
                225 493
                Z
              "
            />

            <path
              class="nieve-login nieve-media-login"
              d="
                M216 385
                265 335
                320 398
                298 390
                278 414
                258 392
                238 410
                Z
              "
            />


            <path
              class="montana-media-login montana-media-secundaria"
              d="
                M650 570
                846 354
                1044 570
                Z
              "
              fill="url(#montanaMediaLogin)"
            />

            <path
              class="sombra-media-login"
              d="
                M846 354
                1044 570
                914 570
                850 472
                814 500
                Z
              "
            />

            <path
              class="nieve-login"
              d="
                M805 400
                846 354
                892 409
                872 399
                854 420
                836 402
                820 417
                Z
              "
            />

          </g>


          <!-- ====================================== -->
          <!-- MONTAÑA CENTRAL -->
          <!-- ====================================== -->

          <g class="capa-paisaje capa-principal-login">

            <path
              class="montana-principal-login"
              d="
                M292 600
                585 228
                875 600
                Z
              "
              fill="url(#montanaPrincipalLogin)"
            />

            <path
              class="cara-montana-login"
              d="
                M585 228
                875 600
                663 600
                598 441
                540 494
                Z
              "
            />

            <path
              class="cara-montana-secundaria"
              d="
                M585 228
                540 494
                486 470
                526 382
                Z
              "
            />

            <path
              class="nieve-login nieve-principal-login"
              d="
                M506 325
                585 228
                671 337
                638 322
                611 355
                583 324
                555 352
                536 326
                Z
              "
            />

            <path
              class="nieve-sombra-login"
              d="
                M585 228
                671 337
                638 322
                611 355
                598 341
                607 294
                Z
              "
            />

          </g>


          <!-- ====================================== -->
          <!-- BANDERA -->
          <!-- ====================================== -->

          <g class="bandera-login-detallada">

            <path
              class="mastil-login"
              d="M586 233V132"
            />

            <circle
              class="punta-mastil-login"
              cx="586"
              cy="129"
              r="5"
            />

            <path
              class="tela-bandera-login"
              d="
                M590 140
                C624 122 655 150 692 132
                V183
                C656 201 625 171 590 190
                Z
              "
            />

          </g>


          <!-- ====================================== -->
          <!-- BOSQUES DE FONDO -->
          <!-- ====================================== -->

          <g class="bosque-distante-login">

            <path
              d="
                M0 585
                C90 550 170 558 250 582
                C340 610 432 602 505 574
                C602 538 704 549 785 582
                C880 620 981 602 1100 558
                V645
                H0
                Z
              "
            />

            <g class="pinos-distantes-login">
              <path d="M70 585l12-27 12 27h-7l9 21H68l9-21Z" />
              <path d="M105 575l9-22 9 22h-6l8 18H101l8-18Z" />
              <path d="M169 590l11-27 11 27h-7l9 20H166l9-20Z" />
              <path d="M425 586l10-23 10 23h-6l8 19H423l8-19Z" />
              <path d="M464 578l8-19 8 19h-5l7 16H460l7-16Z" />
              <path d="M772 590l10-24 10 24h-6l8 18H770l8-18Z" />
              <path d="M814 580l9-21 9 21h-5l7 17H812l7-17Z" />
              <path d="M989 582l11-27 11 27h-7l9 20H986l9-20Z" />
            </g>

          </g>


          <!-- ====================================== -->
          <!-- LAGO / VALLE -->
          <!-- ====================================== -->

          <path
            class="lago-login"
            d="
              M330 598
              C450 565 578 568 700 590
              C792 607 889 603 1002 579
              C925 634 826 654 714 651
              C588 647 464 627 330 598
              Z
            "
          />


          <!-- ====================================== -->
          <!-- COLINAS FRONTALES -->
          <!-- ====================================== -->

          <path
            class="colina-frontal-login colina-frontal-1"
            d="
              M0 575
              C132 536 252 551 367 603
              C483 656 595 665 707 628
              C824 589 946 581 1100 542
              V760
              H0
              Z
            "
          />

          <path
            class="colina-frontal-login colina-frontal-2"
            d="
              M0 643
              C159 598 293 612 430 675
              C561 735 709 716 831 664
              C922 625 1012 620 1100 607
              V760
              H0
              Z
            "
          />


          <!-- ====================================== -->
          <!-- PINOS FRONTALES -->
          <!-- ====================================== -->

          <g class="pinos-frente-login">

            <g class="pino-login pino-login-a">
              <path d="M120 663l26-61 26 61h-17l22 50h-62l22-50Z" />
              <rect x="142" y="707" width="8" height="34" rx="3" />
            </g>

            <g class="pino-login pino-login-b">
              <path d="M191 684l20-48 20 48h-13l17 39h-48l17-39Z" />
              <rect x="208" y="716" width="7" height="29" rx="3" />
            </g>

            <g class="pino-login pino-login-c">
              <path d="M965 650l27-66 27 66h-18l23 53h-64l23-53Z" />
              <rect x="989" y="697" width="8" height="38" rx="3" />
            </g>

            <g class="pino-login pino-login-d">
              <path d="M1027 678l20-48 20 48h-13l17 40h-48l17-40Z" />
              <rect x="1044" y="712" width="7" height="28" rx="3" />
            </g>

            <g class="pino-login pino-login-e">
              <path d="M895 694l16-39 16 39h-10l13 30h-38l13-30Z" />
              <rect x="908" y="720" width="6" height="24" rx="2.5" />
            </g>

          </g>


          <!-- ====================================== -->
          <!-- ROCAS -->
          <!-- ====================================== -->

          <g class="rocas-login">

            <path
              class="roca-login roca-login-1"
              d="
                M901 711
                930 682
                965 687
                984 717
                972 746
                916 749
                Z
              "
            />

            <path
              class="roca-sombra-login"
              d="
                M930 682
                965 687
                984 717
                948 720
                Z
              "
            />

            <path
              class="roca-login roca-login-2"
              d="
                M294 719
                319 697
                348 702
                362 728
                346 747
                303 746
                Z
              "
            />

          </g>


          <!-- ====================================== -->
          <!-- VEGETACIÓN BAJA -->
          <!-- ====================================== -->

          <g class="vegetacion-login">

            <path d="M58 748c18-39 23-43 29-52-1 21-2 31 4 51-14-16-20-23-33-33 8 19 11 27 13 34Z" />
            <path d="M356 758c10-28 16-37 25-48-3 23-2 33 3 48-11-14-17-20-27-27 6 15 8 21 10 27Z" />
            <path d="M728 758c10-31 19-43 29-54-4 26-3 37 4 54-13-16-20-23-31-31 8 17 11 24 13 31Z" />
            <path d="M1060 752c13-34 19-42 26-51-2 23-2 34 4 50-12-14-18-21-28-29 7 17 10 23 12 30Z" />

          </g>


          <!-- ====================================== -->
          <!-- NEBLINA BAJA -->
          <!-- ====================================== -->

          <g class="neblina-login">
            <ellipse cx="420" cy="615" rx="180" ry="27" />
            <ellipse cx="760" cy="624" rx="210" ry="31" />
            <ellipse cx="950" cy="600" rx="135" ry="20" />
          </g>

        </svg>
      </div>
    </section>



    <!-- ========================================
         LOGIN
    ========================================= -->
    <section class="panel-login">

      <div class="login-contenedor">

        <form
          class="tarjeta-login"
          @submit.prevent="iniciarSesion"
        >

          <header class="encabezado-login">
            <h2>Iniciar sesión</h2>

            <p>
              Bienvenido de nuevo a la plataforma de proyectos.
            </p>
          </header>


          <!-- IDENTIFICADOR DE ACCESO -->
          <div class="grupo-campo">

            <label for="identificador">
              Nombre completo o correo electrónico
            </label>

            <div
              class="campo-login"
              :class="{ 'campo-error': errores.identificador }"
            >

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="12"
                  cy="8"
                  r="3.3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />

                <path
                  d="M5.5 19v-1.6c0-3 2.4-5.4 5.4-5.4h2.2c3 0 5.4 2.4 5.4 5.4V19"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>

              <input
                id="identificador"
                v-model.trim="credenciales.identificador"
                type="text"
                autocomplete="username"
                placeholder="Nombre Apellido o correo@ejemplo.com"
                @input="limpiarError('identificador')"
              />

            </div>

            <span
              v-if="errores.identificador"
              class="mensaje-campo"
            >
              {{ errores.identificador }}
            </span>

          </div>



          <!-- CONTRASEÑA -->
          <div class="grupo-campo grupo-contrasena">

            <label for="contrasena">
              Contraseña
            </label>

            <div
              class="campo-login"
              :class="{ 'campo-error': errores.contrasena }"
            >

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="5.5"
                  y="10"
                  width="13"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                />

                <path
                  d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>


              <input
                id="contrasena"
                v-model="credenciales.contrasena"
                :type="mostrarContrasena ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Ingresa tu contraseña"
                @input="limpiarError('contrasena')"
              />


              <button
                type="button"
                class="btn-mostrar"
                :title="
                  mostrarContrasena
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                "
                :aria-label="
                  mostrarContrasena
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                "
                @click="mostrarContrasena = !mostrarContrasena"
              >

                <!-- OJO -->
                <svg
                  v-if="!mostrarContrasena"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="2.3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>


                <!-- OJO OCULTO -->
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4l16 16M9.8 7.2A8.2 8.2 0 0 1 12 7c5.8 0 9 5 9 5a14.6 14.6 0 0 1-2.4 2.8M14.2 16.8A8.4 8.4 0 0 1 12 17c-5.8 0-9-5-9-5a15.4 15.4 0 0 1 3.1-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

              </button>

            </div>

            <span
              v-if="errores.contrasena"
              class="mensaje-campo"
            >
              {{ errores.contrasena }}
            </span>


            <router-link to="/recuperar-contrasena" class="enlace-recuperar">
              ¿Olvidaste tu contraseña?
            </router-link>

          </div>



          <!-- MENSAJE GENERAL -->
          <div
            v-if="mensaje"
            class="mensaje-login"
            :class="{
              error: tipoMensaje === 'error',
              informacion: tipoMensaje === 'informacion'
            }"
          >
            {{ mensaje }}
          </div>



          <!-- INICIAR SESIÓN -->
          <button
            type="submit"
            class="btn-login"
            :disabled="cargando"
          >

            <svg
              v-if="!cargando"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M14 5h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4M10 8l4 4-4 4M14 12H4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>


            <span
              v-if="cargando"
              class="spinner"
              aria-hidden="true"
            ></span>


            {{
              cargando
                ? 'Iniciando sesión...'
                : 'Iniciar sesión'
            }}

          </button>



          <div class="ayuda-login">
            <span>¿Problemas para iniciar sesión?</span>

            <button
              type="button"
              @click="contactarAdministrador"
            >
              Contacta al administrador
            </button>
          </div>

        </form>


        <footer class="pie-login">
          <span>Investigación</span>
          <i>·</i>
          <span>Innovación</span>
          <i>·</i>
          <span>Impacto</span>
          <i>·</i>
          <span>v8.3.2</span>

          <b></b>
        </footer>

      </div>

    </section>

  </main>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch } from '../utils/api'

const router = useRouter()
const route = useRoute()

const credenciales = reactive({ identificador: '', contrasena: '' })
const errores = reactive({ identificador: '', contrasena: '' })
const mostrarContrasena = ref(false)
const cargando = ref(false)
const mensaje = ref('')
const tipoMensaje = ref('')

const limpiarError = campo => {
  errores[campo] = ''
  if (tipoMensaje.value === 'error') {
    mensaje.value = ''
    tipoMensaje.value = ''
  }
}

const validarFormulario = () => {
  errores.identificador = ''
  errores.contrasena = ''
  let valido = true

  if (credenciales.identificador.trim() === '') {
    errores.identificador = 'Ingresa tu correo electrónico.'
    valido = false
  }
  if (credenciales.contrasena === '') {
    errores.contrasena = 'Ingresa tu contraseña.'
    valido = false
  }
  return valido
}

const obtenerRolUsuario = usuario => {
  if (!usuario) return ''
  const rol = typeof usuario.rol === 'string' ? usuario.rol : usuario?.rol?.nombre || usuario?.nombre_rol || usuario?.tipo_usuario || ''
  return String(rol).trim().toLowerCase()
}

const irADestinoDespuesDelLogin = async usuario => {
  const rol = obtenerRolUsuario(usuario)
  if (rol === 'administrador') {
    if (router.hasRoute('administracion')) {
      await router.replace({ name: 'administracion' })
      return
    }
    mensaje.value = 'El panel administrativo todavía no está registrado en el router.'
    tipoMensaje.value = 'error'
    return
  }

  const destino = route.query.redirect
  if (typeof destino === 'string' && destino.startsWith('/') && !destino.startsWith('//') && !destino.startsWith('/administracion')) {
    await router.replace(destino)
    return
  }
  await router.replace({ name: 'proyectos' })
}

const guardarSesion = usuario => {
  sessionStorage.setItem('usuario-plataforma', JSON.stringify(usuario))
}

const iniciarSesionReal = async () => {
  const respuesta = await apiFetch('/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correo: credenciales.identificador.trim(),
      password: credenciales.contrasena
    })
  })

  const datos = await respuesta.json().catch(() => ({}))

  if (!respuesta.ok) {
    throw new Error(datos.error || 'Usuario o contraseña incorrectos.')
  }
  if (!datos.usuario) {
    throw new Error('El servidor no devolvió la información del usuario.')
  }

  guardarSesion(datos.usuario)
  await irADestinoDespuesDelLogin(datos.usuario)
}

const iniciarSesion = async () => {
  mensaje.value = ''
  tipoMensaje.value = ''
  if (!validarFormulario()) return
  cargando.value = true

  try {
    await iniciarSesionReal()
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    mensaje.value = error.message || 'No fue posible iniciar sesión.'
    tipoMensaje.value = 'error'
  } finally {
    cargando.value = false
  }
}

const contactarAdministrador = () => {
  mensaje.value = 'Contacta al administrador de la plataforma para recibir asistencia con tu cuenta.'
  tipoMensaje.value = 'informacion'
}
</script>


<style scoped>

/* ========================================
   VARIABLES
======================================== */

.login-page {
  --fondo-login: #f5f9ff;

  /* Fondo sutil para separar el texto del paisaje */
  --zona-lectura: rgba(234, 245, 255, 0.94);
  --zona-lectura-suave: rgba(234, 245, 255, 0.70);

  --texto-principal: #081b54;
  --texto-secundario: #496a9f;
  --texto-suave: #7390b9;

  --azul: #0968ee;
  --azul-hover: #075bd0;

  --tarjeta: rgba(255, 255, 255, 0.96);
  --campo: #ffffff;
  --borde: #cbd9eb;
  --borde-hover: #adc4e2;

  --sombra:
    0 22px 55px
    rgba(33, 75, 137, 0.10);

  --logo-centro: #eaf4ff;

  --cielo-superior: #dbeeff;
  --cielo-inferior: #8abafa;

  --resplandor: rgba(191, 219, 254, .70);
  --nubes: #eef7ff;

  --montana-1a: #8dbafa;
  --montana-1b: #326fc5;

  --montana-2a: #9ec7fc;
  --montana-2b: #4e87da;

  --montana-3a: #6b9fe9;
  --montana-3b: #2f65b7;

  --cara-montana: #3263ad;
  --nieve: #eff7ff;

  --colina-1: #245aa5;
  --colina-2: #153f7d;

  --rio: #b9dcff;
  --pinos: #164788;

  --bandera: #1976f3;
  --bandera-mastil: #0b2f64;

  /* Paisaje detallado */
  --cielo-medio: #bfdcff;

  --resplandor-centro: rgba(210, 230, 255, .74);
  --resplandor-borde: rgba(181, 214, 252, 0);

  --montana-fondo-a: #c8e0fb;
  --montana-fondo-b: #87b4ec;

  --montana-media-a: #9bc5fb;
  --montana-media-b: #4d86d7;

  --montana-principal-a: #83b3f4;
  --montana-principal-b: #3972c5;

  --montana-frente-a: #6c9fe7;
  --montana-frente-b: #2e63ae;

  --cara-montana-secundaria: #5d8fd6;
  --nieve-sombra: #d6e8fb;

  --niebla-montana: rgba(225, 239, 255, .44);
  --bosque-distante: #3567a8;
  --pinos-distantes: #27568f;

  --lago: #9cc9f7;

  --roca: #2b5c99;
  --roca-sombra: #1e477d;

  --vegetacion: #16427b;
  --neblina-baja: rgba(214, 233, 255, .46);
}



/* ========================================
   CONFIGURACIÓN GENERAL
======================================== */

* {
  box-sizing: border-box;
}


.login-page {
  width: 100%;
  min-height: 100vh;

  display: grid;

  grid-template-columns:
    minmax(470px, 1fr)
    minmax(500px, 1fr);

  background:
    var(--fondo-login);

  color:
    var(--texto-principal);

  overflow: hidden;
}



/* ========================================
   PANEL VISUAL
======================================== */

.panel-visual {
  position: relative;

  min-height: 100vh;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      #eaf5ff,
      #b9d9ff
    );
}


.contenido-visual {
  position: relative;

  z-index: 5;

  width: min(
    560px,
    calc(100% - 84px)
  );

  padding:
    54px
    0
    210px
    60px;
}



/* ========================================
   MARCA
======================================== */

.marca {
  display: flex;
  align-items: center;

  gap: 18px;
}


.logo-proyectos {
  width: 70px;
  height: 70px;

  flex-shrink: 0;

  filter:
    drop-shadow(
      0 8px 15px
      rgba(
        24,
        103,
        219,
        0.15
      )
    );
}


.logo-proyectos svg {
  width: 100%;
  height: 100%;

  display: block;
}


.marca-texto h1 {
  margin: 0;

  color:
    var(--texto-principal);

  font-size: 37px;
  font-weight: 780;

  letter-spacing: -0.8px;
}


.marca-texto p {
  margin:
    2px
    0
    0;

  color:
    var(--texto-secundario);

  font-size: 19px;
}


.linea-marca {
  display: block;

  width: 48px;
  height: 4px;

  margin-top: 22px;

  background:
    linear-gradient(
      90deg,
      #0968ee,
      #4e9af6
    );

  border-radius: 999px;
}



/* ========================================
   MENSAJE PRINCIPAL
======================================== */

.mensaje-principal {
  margin-top: 42px;
}


.mensaje-principal h2 {
  margin: 0;

  color:
    var(--texto-principal);

  font-size:
    clamp(
      30px,
      2.7vw,
      43px
    );

  font-weight: 780;

  line-height: 1.13;

  letter-spacing: -0.7px;
}


.mensaje-principal h2 strong {
  color:
    #0b6cf0;

  font-weight: inherit;
}


.mensaje-principal > p {
  width: 420px;
  max-width: 100%;

  margin:
    22px
    0
    0;

  color:
    var(--texto-secundario);

  font-size: 16px;

  line-height: 1.48;
}



/* ========================================
   BENEFICIOS
======================================== */

.beneficios {
  display: flex;
  flex-direction: column;

  gap: 18px;

  margin-top: 32px;
}


.beneficio {
  display: flex;
  align-items: center;

  gap: 14px;
}


.icono-beneficio {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    rgba(
      231,
      242,
      255,
      0.92
    );

  border:
    1px solid
    rgba(
      158,
      196,
      242,
      0.38
    );

  border-radius: 14px;

  color:
    #0a6ef1;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.80
    );
}


.icono-beneficio svg {
  width: 27px;
  height: 27px;
}


.beneficio > div:last-child {
  display: flex;
  flex-direction: column;

  gap: 2px;
}


.beneficio strong {
  color:
    var(--texto-principal);

  font-size: 16px;
}


.beneficio span {
  color:
    var(--texto-secundario);

  font-size: 13px;
}



/* ========================================
   ILUSTRACIÓN
======================================== */

.ilustracion-montanas {
  position: absolute;

  z-index: 2;

  left: 0;
  right: 0;
  bottom: 0;

  height: 63%;

  pointer-events: none;
}


.ilustracion-montanas svg {
  width: 100%;
  height: 100%;

  display: block;
}


/* ========================================
   PAISAJE DETALLADO
======================================== */

.ilustracion-detallada {
  height: 69%;
}


.paisaje-login {
  /* Mantiene completo el dibujo incluso cuando el navegador aplica zoom. */
  overflow: hidden;
}


.paisaje-resplandor {
  transform-box: fill-box;
  transform-origin: center;

  animation:
    resplandor-login-pulso
    8s
    ease-in-out
    infinite;
}


/* Nubes */

.nube-login {
  fill: var(--nubes);

  opacity: .78;

  transform-box: fill-box;
  transform-origin: center;
}


.nube-login-1 {
  animation:
    nube-login-mover-a
    15s
    ease-in-out
    infinite;
}


.nube-login-2 {
  animation:
    nube-login-mover-b
    18s
    ease-in-out
    infinite;
}


.nube-login-3 {
  opacity: .58;

  animation:
    nube-login-mover-c
    13s
    ease-in-out
    infinite;
}


/* Capas de montaña */

.capa-paisaje {
  transform-box: fill-box;
  transform-origin:
    center
    bottom;
}


.capa-fondo-login {
  animation:
    capa-login-fondo
    13s
    ease-in-out
    infinite;
}


.capa-media-login {
  animation:
    capa-login-media
    11s
    ease-in-out
    infinite;
}


.capa-principal-login {
  animation:
    capa-login-principal
    9s
    ease-in-out
    infinite;
}


.niebla-montana-login {
  fill:
    var(--niebla-montana);
}


.sombra-media-login {
  fill:
    var(--montana-frente-b);

  opacity: .66;
}


.cara-montana-login {
  fill:
    var(--cara-montana);

  opacity: .76;
}


.cara-montana-secundaria {
  fill:
    var(--cara-montana-secundaria);

  opacity: .72;
}


.nieve-login {
  fill:
    var(--nieve);
}


.nieve-sombra-login {
  fill:
    var(--nieve-sombra);

  opacity: .82;
}


/* Bandera */

.bandera-login-detallada {
  transform-box: fill-box;
  transform-origin:
    center
    bottom;

  animation:
    bandera-login-flotar
    5s
    ease-in-out
    infinite;
}


.mastil-login {
  fill: none;

  stroke:
    var(--bandera-mastil);

  stroke-width: 5;

  stroke-linecap: round;
}


.punta-mastil-login {
  fill:
    var(--bandera-mastil);
}


.tela-bandera-login {
  fill:
    var(--bandera);

  transform-box: fill-box;
  transform-origin:
    left
    center;

  animation:
    bandera-login-ondear
    2.5s
    ease-in-out
    infinite;
}


/* Bosque */

.bosque-distante-login > path:first-child {
  fill:
    var(--bosque-distante);
}


.pinos-distantes-login {
  fill:
    var(--pinos-distantes);

  opacity: .86;
}


/* Lago */

.lago-login {
  fill:
    var(--lago);

  opacity: .76;
}


/* Colinas */

.colina-frontal-1 {
  fill:
    var(--colina-1);
}


.colina-frontal-2 {
  fill:
    var(--colina-2);
}


/* Pinos */

.pinos-frente-login {
  fill:
    var(--pinos);
}


.pino-login {
  transform-box: fill-box;
  transform-origin:
    center
    bottom;

  animation:
    pino-login-brisa
    7s
    ease-in-out
    infinite;
}


.pino-login-b {
  animation-delay: -1.8s;
}


.pino-login-c {
  animation-delay: -3.1s;
}


.pino-login-d {
  animation-delay: -4.2s;
}


.pino-login-e {
  animation-delay: -2.4s;
}


/* Rocas */

.roca-login {
  fill:
    var(--roca);
}


.roca-sombra-login {
  fill:
    var(--roca-sombra);
}


/* Vegetación */

.vegetacion-login {
  fill:
    var(--vegetacion);

  opacity: .88;
}


/* Neblina */

.neblina-login {
  fill:
    var(--neblina-baja);

  animation:
    neblina-login-flotar
    12s
    ease-in-out
    infinite;
}


/* ========================================
   ANIMACIONES DEL PAISAJE
======================================== */

@keyframes resplandor-login-pulso {

  0%,
  100% {
    transform:
      scale(.96);

    opacity: .80;
  }

  50% {
    transform:
      scale(1.05);

    opacity: 1;
  }

}


@keyframes nube-login-mover-a {

  0%,
  100% {
    transform:
      translateX(-8px);
  }

  50% {
    transform:
      translateX(13px);
  }

}


@keyframes nube-login-mover-b {

  0%,
  100% {
    transform:
      translateX(9px);
  }

  50% {
    transform:
      translateX(-16px);
  }

}


@keyframes nube-login-mover-c {

  0%,
  100% {
    transform:
      translateX(-6px);
  }

  50% {
    transform:
      translateX(10px);
  }

}


@keyframes capa-login-fondo {

  0%,
  100% {
    transform:
      translateY(2px);
  }

  50% {
    transform:
      translateY(0);
  }

}


@keyframes capa-login-media {

  0%,
  100% {
    transform:
      translateY(1px);
  }

  50% {
    transform:
      translateY(-1.5px);
  }

}


@keyframes capa-login-principal {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-1.5px);
  }

}


@keyframes bandera-login-flotar {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-2px);
  }

}


@keyframes bandera-login-ondear {

  0%,
  100% {
    transform:
      skewY(0deg)
      scaleX(1);
  }

  50% {
    transform:
      skewY(-5deg)
      scaleX(.95);
  }

}


@keyframes pino-login-brisa {

  0%,
  100% {
    transform:
      rotate(0deg);
  }

  50% {
    transform:
      rotate(.6deg);
  }

}


@keyframes neblina-login-flotar {

  0%,
  100% {
    transform:
      translateX(-8px);
  }

  50% {
    transform:
      translateX(12px);
  }

}


/* ========================================
   PANEL LOGIN
======================================== */

.panel-login {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    42px
    58px;

  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(
        219,
        234,
        254,
        0.75
      ),
      transparent 34%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(
        222,
        236,
        255,
        0.48
      ),
      transparent 32%
    ),
    var(--fondo-login);
}


.login-contenedor {
  width: 100%;
  max-width: 610px;
}


.tarjeta-login {
  width: 100%;

  padding:
    48px
    48px
    42px;

  background:
    var(--tarjeta);

  border:
    1px solid
    rgba(
      210,
      222,
      238,
      0.82
    );

  border-radius: 18px;

  box-shadow:
    var(--sombra);

  backdrop-filter:
    blur(12px);
}



/* ========================================
   ENCABEZADO LOGIN
======================================== */

.encabezado-login {
  margin-bottom: 37px;
}


.encabezado-login h2 {
  margin: 0;

  color:
    var(--texto-principal);

  font-size:
    clamp(
      32px,
      3vw,
      42px
    );

  font-weight: 780;

  line-height: 1.1;

  letter-spacing: -0.8px;
}


.encabezado-login p {
  margin:
    8px
    0
    0;

  color:
    var(--texto-secundario);

  font-size: 16px;

  line-height: 1.45;
}



/* ========================================
   CAMPOS
======================================== */

.grupo-campo {
  margin-bottom: 24px;
}


.grupo-campo label {
  display: block;

  margin-bottom: 9px;

  color:
    var(--texto-principal);

  font-size: 14px;
  font-weight: 680;
}


.campo-login {
  position: relative;

  width: 100%;
  height: 54px;

  display: flex;
  align-items: center;

  background:
    var(--campo);

  border:
    1px solid
    var(--borde);

  border-radius: 9px;

  color:
    #2e5fa4;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}


.campo-login:focus-within {
  border-color:
    #2978eb;

  box-shadow:
    0 0 0 4px
    rgba(
      41,
      120,
      235,
      0.09
    );
}


.campo-login > svg {
  width: 22px;
  height: 22px;

  flex-shrink: 0;

  margin-left: 16px;
}


.campo-login input {
  width: 100%;
  height: 100%;

  padding:
    0
    15px;

  background:
    transparent;

  border: none;

  color:
    var(--texto-principal);

  font: inherit;
  font-size: 15px;

  outline: none;
}


.campo-login input::placeholder {
  color:
    #8096b7;
}


.campo-login.campo-error {
  border-color:
    #dc6b78;
}


.mensaje-campo {
  display: block;

  margin-top: 6px;

  color:
    #c64050;

  font-size: 12px;
}



/* ========================================
   CONTRASEÑA
======================================== */

.grupo-contrasena {
  margin-bottom: 26px;
}


.btn-mostrar {
  width: 47px;
  height: 100%;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  background:
    transparent;

  border: none;

  color:
    #597ba9;

  cursor: pointer;
}


.btn-mostrar:hover {
  color:
    var(--azul);
}


.btn-mostrar svg {
  width: 21px;
  height: 21px;
}


.enlace-recuperar {
  display: block;

  margin:
    9px
    0
    0
    auto;

  padding: 0;

  background:
    transparent;

  border: none;

  color:
    var(--azul);

  font-size: 13px;
  font-weight: 560;

  cursor: pointer;
}


.enlace-recuperar:hover {
  text-decoration:
    underline;
}



/* ========================================
   MENSAJE LOGIN
======================================== */

.mensaje-login {
  margin:
    -5px
    0
    18px;

  padding:
    10px
    12px;

  border-radius: 8px;

  font-size: 12.5px;

  line-height: 1.4;
}


.mensaje-login.error {
  background:
    #fff0f1;

  border:
    1px solid
    #f5c6cc;

  color:
    #a72c3a;
}


.mensaje-login.informacion {
  background:
    #edf5ff;

  border:
    1px solid
    #cfe2fb;

  color:
    #315f9a;
}



/* ========================================
   BOTÓN LOGIN
======================================== */

.btn-login {
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  background:
    linear-gradient(
      135deg,
      #0a72f5,
      #0861e4
    );

  border:
    1px solid
    rgba(
      7,
      85,
      207,
      0.18
    );

  border-radius: 9px;

  box-shadow:
    0 8px 18px
    rgba(
      10,
      105,
      237,
      0.22
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.24
    );

  color: white;

  font-size: 16px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}


.btn-login:not(:disabled):hover {
  transform:
    translateY(-1px);

  filter:
    saturate(1.05);

  box-shadow:
    0 11px 23px
    rgba(
      10,
      105,
      237,
      0.28
    );
}


.btn-login:disabled {
  opacity: 0.68;

  cursor:
    wait;
}


.btn-login svg {
  width: 22px;
  height: 22px;
}


.spinner {
  width: 19px;
  height: 19px;

  border:
    2px solid
    rgba(
      255,
      255,
      255,
      0.38
    );

  border-top-color:
    white;

  border-radius: 50%;

  animation:
    girar 0.8s linear infinite;
}


@keyframes girar {

  to {
    transform:
      rotate(360deg);
  }

}



/* ========================================
   AYUDA
======================================== */

.ayuda-login {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;

  gap: 5px;

  margin-top: 29px;

  color:
    var(--texto-secundario);

  font-size: 12px;
}


.ayuda-login button {
  padding: 0;

  background:
    transparent;

  border: none;

  color:
    var(--azul);

  font: inherit;
  font-weight: 650;

  cursor: pointer;
}


.ayuda-login button:hover {
  text-decoration:
    underline;
}



/* ========================================
   PIE LOGIN
======================================== */

.pie-login {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  flex-wrap: wrap;

  margin-top: 34px;

  color:
    var(--texto-secundario);

  font-size: 12px;
}


.pie-login i {
  opacity: 0.62;

  font-style: normal;
}


.pie-login b {
  display: block;

  width: 39px;
  height: 3px;

  flex-basis: 39px;

  margin:
    4px
    calc(50% - 20px)
    0;

  background:
    var(--azul);

  border-radius: 999px;
}



/* ========================================
   MODO OSCURO AUTOMÁTICO
   Sigue la preferencia del navegador/SO
======================================== */

@media (prefers-color-scheme: dark) {

  .login-page {
    --fondo-login: #0e1726;

    --zona-lectura: rgba(24, 45, 72, 0.94);
    --zona-lectura-suave: rgba(24, 45, 72, 0.68);

    --texto-principal: #edf4ff;
    --texto-secundario: #a0b4d3;
    --texto-suave: #8298bb;

    --tarjeta:
      rgba(
        22,
        34,
        53,
        0.97
      );

    --campo: #101c2d;

    --borde: #364a68;
    --borde-hover: #4a6285;

    --sombra:
      0 25px 60px
      rgba(
        0,
        0,
        0,
        0.32
      );

    --logo-centro: #14233a;

    --cielo-superior: #1e3554;
    --cielo-inferior: #172a46;

    --resplandor:
      rgba(
        75,
        119,
        178,
        .22
      );

    --nubes: #637da1;

    --montana-1a: #4c79b8;
    --montana-1b: #254f88;

    --montana-2a: #426da7;
    --montana-2b: #234875;

    --montana-3a: #345f99;
    --montana-3b: #173a68;

    --cara-montana: #17365f;
    --nieve: #afc8e8;

    --colina-1: #173a68;
    --colina-2: #0c294d;

    --rio: #608fc6;
    --pinos: #0a2443;

    --bandera: #55a0ff;
    --bandera-mastil: #b2cae8;

    /* Paisaje detallado en modo oscuro */
    --cielo-medio: #1a304e;

    --resplandor-centro: rgba(103, 143, 199, .24);
    --resplandor-borde: rgba(69, 104, 153, 0);

    --montana-fondo-a: #395f91;
    --montana-fondo-b: #23466f;

    --montana-media-a: #466faa;
    --montana-media-b: #234b7e;

    --montana-principal-a: #527fba;
    --montana-principal-b: #285489;

    --montana-frente-a: #365f99;
    --montana-frente-b: #173d6f;

    --cara-montana-secundaria: #315d95;
    --nieve-sombra: #8eaed0;

    --niebla-montana: rgba(91, 121, 158, .18);
    --bosque-distante: #183d68;
    --pinos-distantes: #102f54;

    --lago: #356694;

    --roca: #183b67;
    --roca-sombra: #0f2b4d;

    --vegetacion: #0b2848;
    --neblina-baja: rgba(83, 112, 148, .24);
  }


  .panel-visual {
    background:
      linear-gradient(
        180deg,
        #182d48,
        #11243d
      );
  }


  .mensaje-principal h2 strong {
    color:
      #62a4ff;
  }


  .icono-beneficio {
    background:
      rgba(
        31,
        55,
        85,
        0.92
      );

    border-color:
      rgba(
        89,
        129,
        180,
        0.32
      );

    color:
      #69a8ff;

    box-shadow:
      inset 0 1px 0
      rgba(
        255,
        255,
        255,
        0.04
      );
  }


  .panel-login {
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(
          46,
          79,
          124,
          0.20
        ),
        transparent 34%
      ),
      radial-gradient(
        circle at 0% 100%,
        rgba(
          41,
          70,
          111,
          0.16
        ),
        transparent 32%
      ),
      var(--fondo-login);
  }


  .tarjeta-login {
    border-color:
      #283951;

    box-shadow:
      var(--sombra);
  }


  .campo-login input::placeholder {
    color:
      #7086a7;
  }


  .btn-mostrar {
    color:
      #8299ba;
  }


  .mensaje-login.error {
    background:
      #3a2028;

    border-color:
      #67323c;

    color:
      #f2a2ad;
  }


  .mensaje-login.informacion {
    background:
      #172c47;

    border-color:
      #294a70;

    color:
      #9bc3f5;
  }


  @media (max-width: 900px) {

    .panel-visual {
      background:
        linear-gradient(
          180deg,
          #182d48,
          #11243d
        );
    }

  }


  @media (max-width: 600px) {

    .tarjeta-login {
      box-shadow:
        0 15px 38px
        rgba(
          0,
          0,
          0,
          0.24
        );
    }

  }

}



/* ========================================
   AJUSTE VISUAL DEL PAISAJE EN ESCRITORIO
   Evita que las montañas compitan con el texto.
======================================== */

@media (min-width: 901px) {

  .ilustracion-detallada {
    /*
      El paisaje vuelve a ocupar todo el panel para evitar
      el corte vertical que producía left: 32%.
      La máscara hace que aparezca progresivamente desde
      la zona del texto hacia la derecha.
    */
    left: 0;
    right: -6%;
    height: 58%;

    opacity: 0.97;

    -webkit-mask-image:
      linear-gradient(
        90deg,
        transparent 0%,
        transparent 8%,
        rgba(0, 0, 0, 0.16) 22%,
        rgba(0, 0, 0, 0.58) 36%,
        #000 48%,
        #000 100%
      );

    mask-image:
      linear-gradient(
        90deg,
        transparent 0%,
        transparent 8%,
        rgba(0, 0, 0, 0.16) 22%,
        rgba(0, 0, 0, 0.58) 36%,
        #000 48%,
        #000 100%
      );
  }


  .ilustracion-detallada > svg {
    transform:
      translateX(3%)
      scaleX(1.03);

    transform-origin:
      right bottom;
  }


  .beneficios {
    width: min(365px, 100%);

    padding:
      10px
      18px
      10px
      0;

    border-radius: 16px;

    background:
      linear-gradient(
        90deg,
        var(--zona-lectura) 0%,
        var(--zona-lectura-suave) 58%,
        transparent 100%
      );
  }

}



/* ========================================
   LAPTOP / TABLET HORIZONTAL
======================================== */

@media (max-width: 1180px) {

  .login-page {
    grid-template-columns:
      minmax(390px, 0.88fr)
      minmax(470px, 1.12fr);
  }


  .contenido-visual {
    width:
      calc(100% - 48px);

    padding:
      40px
      0
      215px
      36px;
  }


  .logo-proyectos {
    width: 60px;
    height: 60px;
  }


  .marca-texto h1 {
    font-size: 32px;
  }


  .marca-texto p {
    font-size: 16px;
  }


  .mensaje-principal {
    margin-top: 34px;
  }


  .mensaje-principal h2 {
    font-size: 32px;
  }


  .mensaje-principal > p {
    width: 365px;

    font-size: 14px;
  }


  .beneficios {
    gap: 14px;

    margin-top: 25px;
  }


  .icono-beneficio {
    width: 43px;
    height: 43px;
  }


  .panel-login {
    padding:
      34px
      32px;
  }


  .tarjeta-login {
    padding:
      40px
      36px
      36px;
  }

}



/* ========================================
   TABLET VERTICAL
   La ilustración pasa arriba y el login abajo.
======================================== */

@media (max-width: 900px) {

  .login-page {
    display: block;

    min-height: 100vh;

    overflow-x: hidden;
    overflow-y: auto;
  }


  .panel-visual {
    min-height: 310px;

    background:
      linear-gradient(
        180deg,
        #eaf5ff,
        #b6d7ff
      );
  }


  .contenido-visual {
    width: 100%;

    padding:
      30px
      34px
      115px;
  }


  .marca {
    gap: 13px;
  }


  .logo-proyectos {
    width: 52px;
    height: 52px;
  }


  .marca-texto h1 {
    font-size: 28px;
  }


  .marca-texto p {
    font-size: 14px;
  }


  .linea-marca {
    width: 40px;

    margin-top: 13px;
  }


  .mensaje-principal {
    margin-top: 20px;
  }


  .mensaje-principal h2 {
    font-size: 30px;

    line-height: 1.12;
  }


  /*
    En tablet conservamos una parte del mensaje
    para no perder la identidad visual, pero
    ocultamos elementos secundarios que harían
    demasiado alto el encabezado.
  */
  .mensaje-principal > p,
  .beneficios {
    display: none;
  }


  .ilustracion-montanas {
    left: auto;

    width: 65%;
    height: 94%;

    opacity: 0.94;
  }


  .panel-login {
    min-height: auto;

    align-items: flex-start;

    padding:
      30px
      28px
      42px;
  }


  .login-contenedor {
    max-width: 650px;

    margin:
      0
      auto;
  }


  .tarjeta-login {
    padding:
      38px
      38px
      34px;

    border-radius: 17px;
  }


  .encabezado-login {
    margin-bottom: 31px;
  }


  .encabezado-login h2 {
    font-size: 35px;
  }


  .pie-login {
    margin-top: 27px;
  }

}



/* ========================================
   CELULAR
======================================== */

@media (max-width: 600px) {

  .panel-visual {
    min-height: 225px;
  }


  .contenido-visual {
    padding:
      22px
      20px
      80px;
  }


  .marca {
    gap: 10px;
  }


  .logo-proyectos {
    width: 44px;
    height: 44px;
  }


  .marca-texto h1 {
    font-size: 24px;
  }


  .marca-texto p {
    margin-top: 0;

    font-size: 12px;
  }


  .linea-marca {
    width: 33px;
    height: 3px;

    margin-top: 10px;
  }


  .mensaje-principal {
    margin-top: 16px;
  }


  .mensaje-principal h2 {
    font-size: 23px;

    letter-spacing: -0.35px;
  }


  /*
    En móviles el dibujo se mantiene como
    elemento de marca sin competir con el texto.
  */
  .ilustracion-montanas {
    width: 69%;
    height: 85%;

    opacity: 0.82;
  }


  .panel-login {
    padding:
      18px
      14px
      30px;

    background:
      var(--fondo-login);
  }


  .login-contenedor {
    max-width: 520px;
  }


  .tarjeta-login {
    padding:
      28px
      20px
      25px;

    border-radius: 15px;

    box-shadow:
      0 12px 32px
      rgba(
        33,
        75,
        137,
        0.09
      );
  }


  .encabezado-login {
    margin-bottom: 26px;
  }


  .encabezado-login h2 {
    font-size: 29px;
  }


  .encabezado-login p {
    margin-top: 6px;

    font-size: 13px;
  }


  .grupo-campo {
    margin-bottom: 20px;
  }


  .grupo-campo label {
    font-size: 13px;
  }


  /*
    54px y 16px ayudan a que los controles
    sean cómodos al tacto y evitan zoom
    automático en navegadores móviles.
  */
  .campo-login {
    height: 54px;
  }


  .campo-login input {
    font-size: 16px;
  }


  .campo-login > svg {
    margin-left: 14px;
  }


  .enlace-recuperar {
    margin-top: 10px;

    font-size: 13px;
  }


  .btn-login {
    min-height: 54px;

    font-size: 15px;
  }


  .ayuda-login {
    margin-top: 23px;

    line-height: 1.45;

    text-align: center;
  }


  .pie-login {
    margin-top: 23px;

    gap: 6px;
  }

}



/* ========================================
   CELULARES PEQUEÑOS
======================================== */

@media (max-width: 390px) {

  .panel-visual {
    min-height: 205px;
  }


  .contenido-visual {
    padding:
      18px
      15px
      70px;
  }


  .logo-proyectos {
    width: 40px;
    height: 40px;
  }


  .marca-texto h1 {
    font-size: 22px;
  }


  .marca-texto p {
    font-size: 11px;
  }


  .mensaje-principal h2 {
    font-size: 21px;
  }


  .ilustracion-montanas {
    width: 72%;
  }


  .panel-login {
    padding:
      12px
      9px
      24px;
  }


  .tarjeta-login {
    padding:
      24px
      16px
      22px;

    border-radius: 13px;
  }


  .encabezado-login h2 {
    font-size: 27px;
  }


  .ayuda-login {
    flex-direction: column;

    gap: 4px;
  }


  .pie-login {
    font-size: 11px;
  }

}



/* ========================================
   PANTALLAS BAJAS / MÓVIL HORIZONTAL
======================================== */

@media (max-height: 600px) and (min-width: 601px) {

  .contenido-visual {
    padding-top: 25px;
  }


  .mensaje-principal {
    margin-top: 24px;
  }


  .beneficios {
    display: none;
  }


  .panel-login {
    padding-top: 20px;
    padding-bottom: 20px;
  }


  .tarjeta-login {
    padding-top: 30px;
    padding-bottom: 28px;
  }

}



/* ========================================
   REDUCIR MOVIMIENTO
======================================== */

@media (prefers-reduced-motion: reduce) {

  .paisaje-resplandor,
  .nube-login,
  .capa-fondo-login,
  .capa-media-login,
  .capa-principal-login,
  .bandera-login-detallada,
  .tela-bandera-login,
  .pino-login,
  .neblina-login {
    animation: none !important;
  }


  .btn-login,
  .campo-login {
    transition: none;
  }


  .spinner {
    animation-duration: 1.5s;
  }

}



/* ============================================================
   CORRECCION DE ZOOM Y DISEÑO ADAPTABLE (Windows / navegadores)
   El paisaje tiene su propia fila: no flota sobre el texto.
   La columna del login se convierte en bloque visible al apilar.
   ============================================================ */

/* En escritorio: el contenido y el paisaje se distribuyen en vertical. */
.login-page {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  overflow-x: clip;
  overflow-y: visible;
}

.panel-visual {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.contenido-visual {
  width: 100%;
  max-width: 650px;
  flex: 0 0 auto;
  padding: clamp(25px, 3.8vw, 54px) clamp(24px, 4vw, 60px) 0;
}

.mensaje-principal h2 {
  overflow-wrap: break-word;
  font-size: clamp(27px, 2.7vw, 43px);
}

.mensaje-principal > p {
  width: auto;
  max-width: 420px;
}

/* El cielo se integra con el degradado del panel para evitar
   un rectangulo de color detras de las montanas. */
.paisaje-cielo { opacity: 0; }

/* El SVG deja de estar posicionado de forma absoluta. Esto
   reserva un espacio real y mantiene separada la bandera. */
.ilustracion-montanas.ilustracion-detallada {
  position: relative;
  inset: auto;
  flex: 1 0 250px;
  width: 100%;
  height: auto;
  min-height: 250px;
  margin-top: 22px;
  opacity: 1;
  overflow: hidden;
  -webkit-mask-image: none;
  mask-image: none;
  pointer-events: none;
}

.ilustracion-montanas.ilustracion-detallada > svg {
  width: 100%;
  height: 100%;
  display: block;
  transform: none;
}

.panel-login {
  min-width: 0;
}

.login-contenedor, .tarjeta-login, .marca-texto {
  min-width: 0;
}

/* Tablet / zoom: el login pasa DEBAJO de un encabezado corto.
   No se oculta: la pagina puede desplazarse verticalmente. */
@media (max-width: 1060px) {
  .login-page {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    overflow-x: clip;
    overflow-y: visible;
  }

  .panel-visual {
    min-height: 0;
    flex: 0 0 auto;
  }

  .contenido-visual {
    max-width: none;
    width: 100%;
    padding: 24px clamp(20px, 5vw, 45px) 0;
  }

  .mensaje-principal {
    margin-top: 20px;
  }

  .mensaje-principal h2 {
    font-size: clamp(25px, 3.5vw, 34px);
    line-height: 1.13;
  }

  /* Los elementos secundarios no alejan el formulario hacia abajo. */
  .mensaje-principal > p,
  .beneficios {
    display: none;
  }

  .ilustracion-montanas.ilustracion-detallada {
    flex: none;
    width: 100%;
    height: clamp(130px, 19vw, 200px);
    min-height: 0;
    margin-top: 6px;
  }

  .panel-login {
    flex: 1 0 auto;
    width: 100%;
    min-height: 0;
    padding: 22px clamp(14px, 4vw, 45px) 38px;
    align-items: flex-start;
    background: var(--fondo-login);
  }

  .login-contenedor {
    margin: 0 auto;
    max-width: 650px;
  }
}

@media (max-width: 600px) {
  .contenido-visual {
    padding: 18px 18px 0;
  }

  .marca {
    gap: 10px;
  }

  .mensaje-principal {
    margin-top: 14px;
  }

  .mensaje-principal h2 {
    font-size: clamp(22px, 5.4vw, 28px);
    letter-spacing: -0.35px;
  }

  /* El dibujo sigue disponible pero ocupa una banda controlada. */
  .ilustracion-montanas.ilustracion-detallada {
    width: 100%;
    height: clamp(95px, 24vw, 130px);
    margin-top: 3px;
  }

  .panel-login {
    padding: 12px 12px 28px;
  }

  .tarjeta-login {
    padding: 27px 20px 25px;
  }
}

@media (max-width: 390px) {
  .contenido-visual {
    padding: 16px 14px 0;
  }
  .mensaje-principal h2 {
    font-size: clamp(20px, 5.8vw, 23px);
  }
  .ilustracion-montanas.ilustracion-detallada {
    height: 88px;
  }
}


/* ============================================================
   PAISAJE A ANCHO COMPLETO - ENCUADRE ESTABLE CON ZOOM
   La banda gráfica es independiente del texto y del formulario.
   ============================================================ */
.panel-visual {
  min-height: 100dvh;
}

/* La imagen no crece sin límite al alejar el zoom. */
.ilustracion-montanas.ilustracion-detallada {
  flex: 0 0 auto;
  align-self: stretch;
  width: 100%;
  height: clamp(240px, 40vh, 420px);
  min-height: 0;
  margin-top: auto;
  overflow: hidden;
  -webkit-mask-image: none;
  mask-image: none;
}

/* El dibujo se extiende a ambos lados sin perder proporciones.
   Su viewBox se centra en montañas y bandera, no en cielo vacío. */
.ilustracion-montanas.ilustracion-detallada > svg {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  transform: none;
}

/* A partir de aquí el login baja a su propia sección. */
@media (max-width: 1060px) {
  .panel-visual {
    min-height: 0;
  }
  .ilustracion-montanas.ilustracion-detallada {
    height: clamp(145px, 23vw, 230px);
    margin-top: 20px;
  }
}
@media (max-width: 600px) {
  .ilustracion-montanas.ilustracion-detallada {
    height: clamp(115px, 35vw, 180px);
    margin-top: 12px;
  }
}
@media (max-width: 390px) {
  .ilustracion-montanas.ilustracion-detallada {
    height: 120px;
  }
}

</style>


<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>