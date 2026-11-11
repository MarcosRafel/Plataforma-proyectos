<template>
  <div class="pagina-proyectos pagina-admin" :class="{ 'modo-oscuro': modoOscuro }">
    <main class="contenedor-principal">
      <!-- BARRA SUPERIOR -->
      <header class="barra-superior">
        <div class="marca-panel">
          <div class="marca-icono" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M16 3 27 9.5v13L16 29 5 22.5v-13Z" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="m16 7 7.5 4.3v8.5L16 24l-7.5-4.2v-8.5Z" fill="currentColor" opacity=".22" />
              <path d="m16 8 6.5 3.7v7.5L16 23l-6.5-3.8v-7.5Z" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>

          <div class="marca-texto">
            <span>PANEL ADMINISTRATIVO</span>
            <strong>Administración de la plataforma</strong>
          </div>
        </div>

        <div
          class="usuario-menu"
          @click.stop
        >

          <button
            type="button"
            class="usuario-chip"
            :class="{ abierto: menuUsuarioAbierto }"
            :aria-expanded="menuUsuarioAbierto"
            aria-haspopup="menu"
            aria-label="Abrir opciones del usuario"
            @click="alternarMenuUsuario"
          >
            <div class="avatar">
              {{ inicialesUsuario }}
            </div>

            <div class="usuario-info">
              <strong>{{ nombreUsuario }}</strong>
              <span>{{ rolUsuario }}</span>
            </div>

            <span
              class="usuario-en-linea"
              title="En línea"
            ></span>

            <svg
              class="usuario-chevron"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="m7 9 5 5 5-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>


          <Transition name="menu-usuario">

            <div
              v-if="menuUsuarioAbierto"
              class="menu-usuario-desplegable"
              role="menu"
            >

              <div class="menu-usuario-cabecera">
                <div class="avatar avatar-menu">
                  {{ inicialesUsuario }}
                </div>

                <div>
                  <strong>{{ nombreUsuario }}</strong>
                  <span>{{ rolUsuario }}</span>
                </div>
              </div>


              <div class="menu-usuario-separador"></div>


              <!-- ====================================== -->
              <!-- MODO DE APARIENCIA -->
              <!-- ====================================== -->

              <div
                class="opcion-modo-usuario"
                role="group"
                aria-label="Modo de apariencia"
              >

                <span class="opcion-modo-texto">
                  <strong>Modo</strong>

                  <small>
                    {{
                      modoOscuro
                        ? 'Oscuro'
                        : 'Claro'
                    }}
                  </small>
                </span>


                <button
                  type="button"
                  class="selector-tema selector-tema-menu"
                  :class="{ activo: modoOscuro }"
                  :title="
                    modoOscuro
                      ? 'Cambiar a modo claro'
                      : 'Cambiar a modo oscuro'
                  "
                  :aria-label="
                    modoOscuro
                      ? 'Cambiar a modo claro'
                      : 'Cambiar a modo oscuro'
                  "
                  @click.stop="alternarTema"
                >
                  <span
                    class="tema-sol"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="3.4"
                        fill="currentColor"
                      />

                      <path
                        d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5 7 7M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span
                    class="tema-luna"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M18.8 15.6A7.9 7.9 0 0 1 8.4 5.2a8 8 0 1 0 10.4 10.4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>

              </div>


              <div class="menu-usuario-separador separador-opciones"></div>


              <button
                type="button"
                class="opcion-usuario"
                role="menuitem"
                @click="irAAjustesUsuario"
              >
                <span class="opcion-usuario-icono">
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

                    <path
                      d="M18 5.8 19.2 7l2.1-2.1"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <span class="opcion-usuario-texto">
                  <strong>Ajustes</strong>
                  <small>Editar información de tu cuenta</small>
                </span>

                <svg
                  class="opcion-flecha"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="m9 6 6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>


              <button
                type="button"
                class="opcion-usuario opcion-cerrar-sesion"
                role="menuitem"
                @click="cerrarSesion"
              >
                <span class="opcion-usuario-icono">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                    />

                    <path
                      d="M13 8l4 4-4 4M17 12H9"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <span class="opcion-usuario-texto">
                  <strong>Cerrar sesión</strong>
                  <small>Salir de la plataforma</small>
                </span>
              </button>

            </div>

          </Transition>

        </div>
      </header>

      <!-- BIENVENIDA -->
      <section class="bienvenida-principal">
        <div class="saludo-bloque">
          <div class="saludo-linea">
            <div class="icono-momento" aria-hidden="true">
              <svg v-if="momentoDia === 'noche'" viewBox="0 0 64 64">
                <path d="M42 10c-13 2-21 12-21 24 0 13 10 21 22 20-11-5-15-15-13-24 2-9 6-15 12-20Z" fill="#f4cc5c" stroke="currentColor" stroke-width="2.4" />
                <circle cx="48" cy="17" r="2" fill="#8db9f4" />
                <circle cx="52" cy="27" r="1.5" fill="#8db9f4" />
              </svg>
              <svg v-else viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="11" fill="#ffc62e" stroke="#e7a912" stroke-width="2" />
                <path d="M32 5v9M32 50v9M5 32h9M50 32h9M13 13l7 7M44 44l7 7M51 13l-7 7M20 44l-7 7" fill="none" stroke="#e7a912" stroke-width="3" stroke-linecap="round" />
              </svg>
            </div>
            <h1>{{ saludo }}, {{ nombreUsuario }}</h1>
          </div>
          <p>
            Supervisa la actividad general de la plataforma y accede a las herramientas administrativas.
          </p>

          <div class="admin-identidad">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3 19 6v5c0 4.7-2.9 8-7 10-4.1-2-7-5.3-7-10V6Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="m9 12 2 2 4-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Acceso administrativo
          </div>
        </div>

        <aside class="frase-dia">
          <div class="frase-contenido">
            <span class="fecha">{{ fechaActual }}</span>
            <Transition
              name="frase"
              mode="out-in"
            >
              <p
                :key="indiceFrase"
                class="frase-motivacional"
                aria-live="polite"
              >
                “{{ fraseActual }}”
              </p>
            </Transition>
            <span class="frase-linea"></span>
          </div>

          <div class="montanas" aria-hidden="true">

            <svg
              class="escena-montana"
              viewBox="0 0 310 126"
              preserveAspectRatio="xMidYMax meet"
            >

              <!-- ====================================== -->
              <!-- CIELO / LUZ -->
              <!-- ====================================== -->

              <ellipse
                class="cielo-luz"
                cx="246"
                cy="27"
                rx="52"
                ry="37"
              />

              <g class="escena-sol">
                <circle
                  class="sol-halo"
                  cx="263"
                  cy="19"
                  r="16"
                />

                <circle
                  class="sol-nucleo"
                  cx="263"
                  cy="19"
                  r="8"
                />
              </g>


              <!-- ====================================== -->
              <!-- PARTÍCULAS -->
              <!-- ====================================== -->

              <g class="particulas">
                <circle
                  class="particula particula-1"
                  cx="215"
                  cy="15"
                  r="1.7"
                />

                <circle
                  class="particula particula-2"
                  cx="287"
                  cy="43"
                  r="1.25"
                />

                <circle
                  class="particula particula-3"
                  cx="230"
                  cy="53"
                  r="1.1"
                />

                <circle
                  class="particula particula-4"
                  cx="296"
                  cy="15"
                  r="1.4"
                />
              </g>


              <!-- ====================================== -->
              <!-- NUBES -->
              <!-- ====================================== -->

              <g class="nube nube-1">
                <ellipse
                  class="nube-forma"
                  cx="210"
                  cy="39"
                  rx="13"
                  ry="4.4"
                />

                <circle
                  class="nube-forma"
                  cx="205"
                  cy="36"
                  r="4.8"
                />

                <circle
                  class="nube-forma"
                  cx="213"
                  cy="35"
                  r="6"
                />
              </g>


              <g class="nube nube-2">
                <ellipse
                  class="nube-forma"
                  cx="274"
                  cy="58"
                  rx="10"
                  ry="3.4"
                />

                <circle
                  class="nube-forma"
                  cx="269"
                  cy="56"
                  r="4"
                />

                <circle
                  class="nube-forma"
                  cx="276"
                  cy="55"
                  r="4.8"
                />
              </g>


              <!-- ====================================== -->
              <!-- MONTAÑAS DE FONDO -->
              <!-- ====================================== -->

              <g class="montana-capa montana-fondo">

                <path
                  class="montana-fondo-1"
                  d="
                    M0 111
                    50 71
                    80 93
                    112 61
                    159 111
                    Z
                  "
                />

                <path
                  class="montana-fondo-2"
                  d="
                    M138 111
                    208 64
                    242 83
                    270 62
                    310 91
                    310 111
                    Z
                  "
                />

              </g>


              <!-- ====================================== -->
              <!-- MONTAÑA PRINCIPAL -->
              <!-- ====================================== -->

              <g class="montana-capa montana-principal">

                <path
                  class="montana-principal-base"
                  d="
                    M52 112
                    143 31
                    231 112
                    Z
                  "
                />

                <path
                  class="montana-principal-sombra"
                  d="
                    M143 31
                    231 112
                    161 112
                    136 70
                    118 80
                    Z
                  "
                />

                <path
                  class="nieve-principal"
                  d="
                    M118 53
                    143 31
                    166 52
                    156 49
                    148 57
                    139 49
                    131 58
                    Z
                  "
                />

                <path
                  class="linea-nieve"
                  d="
                    M119 55
                    131 58
                    139 49
                    148 57
                    156 49
                    166 53
                  "
                />

              </g>


              <!-- ====================================== -->
              <!-- MONTAÑA MEDIA -->
              <!-- ====================================== -->

              <g class="montana-capa montana-media">

                <path
                  class="montana-media-base"
                  d="
                    M111 112
                    191 60
                    270 112
                    Z
                  "
                />

                <path
                  class="montana-media-sombra"
                  d="
                    M191 60
                    270 112
                    210 112
                    181 81
                    166 91
                    Z
                  "
                />

                <path
                  class="nieve-media"
                  d="
                    M177 70
                    191 60
                    205 71
                    199 70
                    194 76
                    187 70
                    183 75
                    Z
                  "
                />

              </g>


              <!-- ====================================== -->
              <!-- MONTAÑA FRONTAL -->
              <!-- ====================================== -->

              <g class="montana-capa montana-frente">

                <path
                  class="montana-frente-base"
                  d="
                    M28 114
                    96 76
                    157 114
                    Z
                  "
                />

                <path
                  class="montana-frente-sombra"
                  d="
                    M96 76
                    157 114
                    112 114
                    87 95
                    76 101
                    Z
                  "
                />

              </g>


              <!-- ====================================== -->
              <!-- CAMINO HACIA LA CIMA -->
              <!-- ====================================== -->

              <path
                class="camino-cima"
                d="
                  M111 112
                  C118 104 126 101 130 94
                  C134 87 129 82 136 75
                  C142 69 145 61 144 54
                "
              />


              <!-- ====================================== -->
              <!-- BANDERA -->
              <!-- ====================================== -->

              <g class="bandera-grupo">

                <path
                  class="bandera-poste"
                  d="
                    M145 56
                    V29
                  "
                />

                <path
                  class="bandera-tela"
                  d="
                    M146 30
                    C157 26 165 34 174 29
                    V41
                    C165 46 157 37 146 42
                    Z
                  "
                />

                <circle
                  class="bandera-punta"
                  cx="145"
                  cy="28"
                  r="2"
                />

              </g>


              <!-- ====================================== -->
              <!-- PINOS -->
              <!-- ====================================== -->

              <g class="pinos">

                <g class="pino pino-1">
                  <path
                    class="pino-copa"
                    d="M54 99 60 87 66 99Z"
                  />
                  <path
                    class="pino-tronco"
                    d="M60 98v9"
                  />
                </g>

                <g class="pino pino-2">
                  <path
                    class="pino-copa"
                    d="M74 103 80 90 86 103Z"
                  />
                  <path
                    class="pino-tronco"
                    d="M80 102v8"
                  />
                </g>

                <g class="pino pino-3">
                  <path
                    class="pino-copa"
                    d="M230 101 236 88 242 101Z"
                  />
                  <path
                    class="pino-tronco"
                    d="M236 100v9"
                  />
                </g>

              </g>


              <!-- ====================================== -->
              <!-- NEBLINA -->
              <!-- ====================================== -->

              <g class="neblina neblina-1">
                <path
                  class="neblina-forma"
                  d="
                    M0 105
                    C45 98 72 108 112 105
                    C155 102 185 97 221 104
                    C256 111 280 101 310 103
                    V126
                    H0
                    Z
                  "
                />
              </g>


              <g class="neblina neblina-2">
                <path
                  class="neblina-forma neblina-forma-2"
                  d="
                    M-10 113
                    C35 105 75 115 118 111
                    C157 107 194 108 236 114
                    C265 118 289 111 320 111
                    V126
                    H-10
                    Z
                  "
                />
              </g>


              <!-- ====================================== -->
              <!-- SUELO -->
              <!-- ====================================== -->

              <path
                class="suelo"
                d="
                  M0 118
                  C54 111 91 117 137 118
                  C188 119 237 112 310 116
                  V126
                  H0
                  Z
                "
              />

            </svg>

          </div>
        </aside>
      </section>

      <!-- ESTADÍSTICAS -->
      <section class="estadisticas" aria-label="Resumen de proyectos">
        <article class="tarjeta-estadistica estadistica-azul">
          <div class="icono-estadistica">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
              <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </div>
          <div class="estadistica-dato">
            <strong>{{ totalProyectos }}</strong>
            <span>Proyectos registrados</span>
          </div>
          <span class="etiqueta etiqueta-azul">Total</span>
        </article>

        <article class="tarjeta-estadistica estadistica-amarillo">
          <div class="icono-estadistica">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M12 7.5v5l3.4 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
          <div class="estadistica-dato">
            <strong>{{ totalEnProceso }}</strong>
            <span>En proceso</span>
          </div>
          <span class="etiqueta etiqueta-amarillo">Activos</span>
        </article>

        <article class="tarjeta-estadistica estadistica-verde">
          <div class="icono-estadistica">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="currentColor" />
              <path d="m8.3 12.1 2.4 2.4 5-5" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="estadistica-dato">
            <strong>{{ totalLiberados }}</strong>
            <span>Liberados</span>
          </div>
          <span class="etiqueta etiqueta-verde">Finalizados</span>
        </article>

        <article class="tarjeta-estadistica estadistica-rojo">
          <div class="icono-estadistica">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="m9 9 6 6m0-6-6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
            </svg>
          </div>
          <div class="estadistica-dato">
            <strong>{{ totalRechazados }}</strong>
            <span>Rechazados</span>
          </div>
          <span class="etiqueta etiqueta-rojo">No aprobados</span>
        </article>
      </section>

      <!-- ACCESOS ADMINISTRATIVOS -->
      <section class="panel-acciones panel-acciones-admin">

        <div class="encabezado-panel-admin">

          <div>
            <span class="eyebrow-admin">
              Herramientas del administrador
            </span>

            <h2>
              ¿Qué deseas administrar?
            </h2>
          </div>


          <span
            class="escudo-admin"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M12 3 19 6v5c0 4.7-2.9 8-7 10-4.1-2-7-5.3-7-10V6Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />

              <path
                d="M8.5 12h7M12 8.5v7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

        </div>


        <div class="acciones-grid acciones-grid-admin">

          <button
            type="button"
            class="accion-card"
            @click="irAGestionProyectos"
          >
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />

                <path
                  d="M3.5 8.5h17M13 13h5M15.5 10.5v5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span class="accion-texto">
              <strong>
                Administrar proyectos
              </strong>

              <small>
                Consulta todos los proyectos y entra a sus controles administrativos.
              </small>
            </span>

            <span class="accion-flecha">
              →
            </span>
          </button>


          <button
            type="button"
            class="accion-card"
            @click="irAUsuariosAdmin"
          >
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="9"
                  cy="8"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />

                <path
                  d="M3.8 19c.7-3.8 2.5-5.7 5.2-5.7 2.8 0 4.6 1.9 5.3 5.7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />

                <path
                  d="M16.5 8.5h4M18.5 6.5v4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span class="accion-texto">
              <strong>
                Gestión de usuarios
              </strong>

              <small>
                Consulta, modifica, activa o desactiva las cuentas del sistema.
              </small>
            </span>

            <span class="accion-flecha">
              →
            </span>
          </button>


          <button
            type="button"
            class="accion-card"
            @click="irAGestionReportes"
          >
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 4.8h8l4 4v10.4A1.8 1.8 0 0 1 16.2 21H7.8A1.8 1.8 0 0 1 6 19.2Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />

                <path
                  d="M14 4.8v4h4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />

                <path
                  d="M9 16.5h6M9 13h6M9 9.5h3.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span class="accion-texto">
              <strong>
                Gestión de reportes
              </strong>

              <small>
                Consulta, organiza y da seguimiento a los reportes administrativos del sistema.
              </small>
            </span>

            <span class="accion-flecha">
              →
            </span>
          </button>

        </div>

      </section>
    </main>
  </div>
</template>


<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'

const router = useRouter()
const { modoOscuro, alternarTema } = useTema()

const nombreUsuario = ref('Usuario')
const rolUsuario = ref('Administrador')
const ahora = ref(new Date())
const proyectos = ref([])
const cargandoProyectos = ref(false)
const errorProyectos = ref('')
const menuUsuarioAbierto = ref(false)

const frasesMotivacionales = [
  'Una buena administración convierte\nideas en resultados',
  'Cada proyecto merece seguimiento,\nclaridad y dirección',
  'Organizar hoy facilita los grandes\nresultados de mañana',
  'Supervisar también es impulsar\nel crecimiento de cada proyecto',
  'Las decisiones claras fortalecen\nlos proyectos y sus equipos',
  'Administrar es crear las condiciones\npara que las ideas avancen',
  'Un buen seguimiento transforma\nel esfuerzo en resultados',
  'Cada proyecto bien gestionado\nfortalece a toda la institución',
  'La organización convierte múltiples\nproyectos en una misma dirección',
  'Gestionar con claridad permite\nque cada oportunidad avance'
]

const indiceFrase = ref(Math.floor(Math.random() * frasesMotivacionales.length))
const fraseActual = computed(() => frasesMotivacionales[indiceFrase.value])
const cambiarFrase = () => { indiceFrase.value = (indiceFrase.value + 1) % frasesMotivacionales.length }

let temporizadorReloj = null
let temporizadorFrase = null

const inicialesUsuario = computed(() => {
  const partes = nombreUsuario.value.trim().split(/\s+/).filter(Boolean)
  if (!partes.length) return 'U'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase()
})

const cargarUsuarioSesion = () => {
  try {
    const usuarioGuardado = sessionStorage.getItem('usuario-plataforma')
    if (!usuarioGuardado) return
    const usuario = JSON.parse(usuarioGuardado)

    const nombre = usuario?.nombre || usuario?.correo?.split('@')[0] || ''
    const rol = typeof usuario?.rol === 'string' ? usuario.rol : usuario?.rol?.nombre || ''

    if (String(nombre).trim()) nombreUsuario.value = String(nombre).trim()
    if (String(rol).trim()) rolUsuario.value = String(rol).trim()
  } catch (error) {
    console.warn('No fue posible recuperar el usuario de la sesión:', error)
  }
}

const momentoDia = computed(() => {
  const hora = ahora.value.getHours()
  if (hora < 12) return 'manana'
  if (hora < 19) return 'tarde'
  return 'noche'
})

const saludo = computed(() => {
  if (momentoDia.value === 'manana') return 'Buenos días'
  if (momentoDia.value === 'tarde') return 'Buenas tardes'
  return 'Buenas noches'
})

const fechaActual = computed(() => {
  const fecha = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(ahora.value)
  return fecha.charAt(0).toUpperCase() + fecha.slice(1)
})

const cargarProyectos = async () => {
  cargandoProyectos.value = true
  errorProyectos.value = ''

  try {
    // CORRECCIÓN: Quitamos el primer /api/
    const respuesta = await apiFetch('/proyectos', { credentials: 'include' })

    if (!respuesta.ok) {
      throw new Error('No fue posible obtener los proyectos.')
    }

    const datos = await respuesta.json()
    proyectos.value = datos.map(proyecto => ({
      _id: proyecto._id || proyecto.id_proyecto || proyecto.id,
      nombre_proyecto: proyecto.nombre_proyecto || 'Proyecto sin nombre',
      responsable: proyecto.responsable || 'Sin responsable',
      convocatoria: {
        nombre: typeof proyecto.convocatoria === 'object' && proyecto.convocatoria !== null
          ? proyecto.convocatoria.nombre || 'Sin convocatoria'
          : proyecto.convocatoria || 'Sin convocatoria'
      },
      estado: {
        nombre: typeof proyecto.estado === 'object' && proyecto.estado !== null
          ? proyecto.estado.nombre || 'Sin estado'
          : proyecto.estado || proyecto.estado_nombre || 'Sin estado'
      },
      periodo: proyecto.periodo || '',
      fecha_actualizacion: proyecto.fecha_actualizacion || null
    }))
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
    errorProyectos.value = 'No fue posible cargar los proyectos.'
  } finally {
    cargandoProyectos.value = false
  }
}

const totalProyectos = computed(() => proyectos.value.length)
const totalEnProceso = computed(() => {
  const estadosProceso = new Set(['En captura', 'Sometido', 'Con registro', 'Financiado', 'Informe pendiente', 'Informe en deuda'])
  return proyectos.value.filter(p => estadosProceso.has(p.estado.nombre)).length
})
const totalLiberados = computed(() => proyectos.value.filter(p => p.estado.nombre === 'Liberado').length)
const totalRechazados = computed(() => proyectos.value.filter(p => p.estado.nombre === 'Rechazado').length)

const alternarMenuUsuario = () => { menuUsuarioAbierto.value = !menuUsuarioAbierto.value }
const cerrarMenuUsuario = () => { menuUsuarioAbierto.value = false }
const manejarTeclaUsuario = evento => { if (evento.key === 'Escape') cerrarMenuUsuario() }

const irAAjustesUsuario = () => {
  cerrarMenuUsuario()
  router.push({ name: 'usuario-admin-ajustes' })
}

const cerrarSesion = async () => {
  cerrarMenuUsuario()

  try {
    // CORRECCIÓN: Quitamos la ruta duplicada y usamos credenciales
    await apiFetch('/logout', {
      method: 'POST',
      credentials: 'include'
    })
  } catch (error) {
    console.warn('No fue posible notificar el cierre de sesión al servidor:', error)
  }

  sessionStorage.removeItem('usuario-plataforma')
  localStorage.removeItem('usuario-plataforma')
  router.replace({ name: 'login' })
}

const irAGestionProyectos = () => { router.push({ name: 'admin-proyectos-gestion' }) }
const irAUsuariosAdmin = () => { router.push({ name: 'admin-usuarios' }) }
const irAGestionReportes = () => { router.push({ name: 'admin-reportes' }) }

const validarAdministrador = () => {
  const rol = String(rolUsuario.value || '').trim().toLowerCase()
  if (rol !== 'administrador') {
    router.replace({ name: 'proyectos' })
    return false
  }
  return true
}

onMounted(() => {
  cargarUsuarioSesion()
  if (!validarAdministrador()) return
  cargarProyectos()

  document.addEventListener('click', cerrarMenuUsuario)
  document.addEventListener('keydown', manejarTeclaUsuario)

  temporizadorReloj = setInterval(() => { ahora.value = new Date() }, 60000)
  temporizadorFrase = setInterval(cambiarFrase, 8000)
})

onUnmounted(() => {
  document.removeEventListener('click', cerrarMenuUsuario)
  document.removeEventListener('keydown', manejarTeclaUsuario)
  if (temporizadorReloj) clearInterval(temporizadorReloj)
  if (temporizadorFrase) clearInterval(temporizadorFrase)
})
</script>


<style scoped>

/* ========================================
   CONFIGURACIÓN GENERAL
   Misma línea visual que ProyectoNuevo,
   ProyectoEditar y ProyectoDetalle
======================================== */

* {
  box-sizing: border-box;
}


.pagina-proyectos {
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


.contenedor-principal {
  width: 100%;
  max-width: 1650px;

  margin:
    0
    auto;
}



/* ========================================
   BARRA SUPERIOR
======================================== */

.barra-superior {
  min-height: 68px;

  display: grid;

  grid-template-columns:
    1fr
    auto;

  align-items: center;

  gap: 18px;

  margin-bottom: 18px;

  padding:
    10px
    14px;

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

  border-radius: 12px;

  box-shadow:
    0 4px 17px
    rgba(
      48,
      84,
      137,
      0.04
    );
}


.marca-panel {
  display: flex;
  align-items: center;
}


.marca-panel {
  gap: 11px;
}


.marca-icono {
  width: 42px;
  height: 42px;

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


.marca-icono svg {
  width: 27px;
  height: 27px;
}


.marca-texto {
  display: flex;
  flex-direction: column;

  gap: 2px;
}


.marca-texto span {
  color: #617eae;

  font-size: 10px;
  font-weight: 750;

  letter-spacing: 0.08em;
}


.marca-texto strong {
  color: #0a2058;

  font-size: 14px;
  font-weight: 740;
}



/* ========================================
   SELECTOR DE TEMA
======================================== */

.selector-tema {
  position: relative;

  width: 76px;
  height: 38px;

  display: grid;

  grid-template-columns:
    1fr
    1fr;

  align-items: center;

  padding: 3px;

  background:
    #e3e9f1;

  border: none;

  border-radius: 999px;

  cursor: pointer;

  box-shadow:
    inset 0 1px 3px
    rgba(
      57,
      80,
      112,
      0.10
    );

  transition:
    background 0.2s ease;
}


.selector-tema::before {
  content: "";

  position: absolute;

  top: 3px;
  left: 3px;

  width: 32px;
  height: 32px;

  background: white;

  border-radius: 50%;

  box-shadow:
    0 2px 7px
    rgba(
      60,
      83,
      112,
      0.18
    );

  transition:
    transform 0.22s ease;
}


.selector-tema.activo::before {
  transform:
    translateX(38px);
}


.tema-sol,
.tema-luna {
  position: relative;

  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #61738e;
}


.tema-sol svg,
.tema-luna svg {
  width: 18px;
  height: 18px;
}



/* ========================================
   USUARIO / MENÚ DESPLEGABLE
======================================== */

.usuario-menu {
  position: relative;

  justify-self: end;

  z-index: 30;
}


.usuario-chip {
  min-width: 188px;

  display: flex;
  align-items: center;

  gap: 9px;

  padding:
    8px
    10px
    8px
    8px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f4f8fe
    );

  border:
    1px solid
    #d7e3f1;

  border-radius: 999px;

  font-family: inherit;

  cursor: pointer;

  transition:
    transform 0.20s ease,
    box-shadow 0.20s ease,
    border-color 0.20s ease,
    background 0.20s ease;
}


.usuario-chip:hover,
.usuario-chip.abierto {
  transform:
    translateY(-1px);

  border-color:
    #bfd4ed;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #eef5ff
    );

  box-shadow:
    0 7px 17px
    rgba(
      44,
      82,
      139,
      0.09
    );
}


.usuario-chip:focus-visible {
  outline:
    3px solid
    rgba(
      30,
      111,
      240,
      0.16
    );

  outline-offset: 3px;
}


.avatar {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e4f0ff,
      #d8eaff
    );

  border:
    1px solid
    #d0e2f8;

  border-radius: 50%;

  color: #3477cd;

  font-size: 14px;
  font-weight: 750;
}


.usuario-info {
  min-width: 0;

  flex: 1;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 2px;

  text-align: left;
}


.usuario-info strong {
  max-width: 92px;

  overflow: hidden;

  color: #17315d;

  font-size: 17px;
  font-weight: 720;

  line-height: 1.2;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.usuario-info span {
  max-width: 92px;

  overflow: hidden;

  color: #7489a8;

  font-size: 13px;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.usuario-en-linea {
  width: 7px;
  height: 7px;

  flex-shrink: 0;

  margin-left: 1px;

  background: #25b978;

  border:
    2px solid
    #e4f8ef;

  border-radius: 50%;

  box-sizing: content-box;
}


.usuario-chevron {
  width: 15px;
  height: 15px;

  flex-shrink: 0;

  color: #7187a7;

  transition:
    transform 0.20s ease,
    color 0.20s ease;
}


.usuario-chip.abierto .usuario-chevron {
  transform:
    rotate(180deg);

  color: #1768dc;
}


/* ========================================
   PANEL DESPLEGABLE
======================================== */

.menu-usuario-desplegable {
  position: absolute;

  top: calc(100% + 10px);
  right: 0;

  width: 300px;

  padding:
    8px;

  background:
    rgba(
      255,
      255,
      255,
      0.985
    );

  border:
    1px solid
    #d7e3f1;

  border-radius: 13px;

  box-shadow:
    0 18px 40px
    rgba(
      37,
      71,
      123,
      0.15
    ),
    0 3px 10px
    rgba(
      37,
      71,
      123,
      0.05
    );

  overflow: hidden;
}


.menu-usuario-desplegable::before {
  content: '';

  position: absolute;

  width: 105px;
  height: 105px;

  top: -68px;
  right: -44px;

  background:
    radial-gradient(
      circle,
      rgba(
        209,
        229,
        255,
        0.54
      ),
      transparent 68%
    );

  border-radius: 50%;

  pointer-events: none;
}


.menu-usuario-cabecera {
  position: relative;

  display: flex;
  align-items: center;

  gap: 10px;

  padding:
    9px
    9px
    10px;
}


.avatar-menu {
  width: 42px;
  height: 42px;

  box-shadow:
    0 4px 10px
    rgba(
      44,
      82,
      139,
      0.07
    );
}


.menu-usuario-cabecera > div:last-child {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
}


.menu-usuario-cabecera strong {
  overflow: hidden;

  color: #16315d;

  font-size: 15px;
  font-weight: 730;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.menu-usuario-cabecera span {
  color: #7589a8;

  font-size: 12px;
}


.menu-usuario-separador {
  height: 1px;

  margin:
    1px
    5px
    6px;

  background:
    #e9eff7;
}


.separador-opciones {
  margin-top: 5px;
}


.opcion-modo-usuario {
  position: relative;

  min-height: 62px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 14px;

  padding:
    8px
    9px;

  border-radius: 9px;
}


.opcion-modo-texto {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
}


.opcion-modo-texto strong {
  color: #19355f;

  font-size: 14px;
  font-weight: 720;
}


.opcion-modo-texto small {
  color: #7b8eaa;

  font-size: 11px;
}


.selector-tema-menu {
  flex-shrink: 0;
}


.opcion-usuario {
  position: relative;

  width: 100%;
  min-height: 62px;

  display: grid;

  grid-template-columns:
    auto
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 10px;

  padding:
    8px
    9px;

  background: transparent;

  border: none;

  border-radius: 9px;

  font-family: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    background 0.18s ease,
    transform 0.18s ease;
}


.opcion-usuario:hover {
  background:
    #f3f8ff;

  transform:
    translateX(1px);
}


.opcion-usuario:focus-visible {
  outline:
    2px solid
    rgba(
      36,
      116,
      232,
      0.22
    );

  outline-offset: -2px;
}


.opcion-usuario-icono {
  width: 34px;
  height: 34px;

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

  border-radius: 9px;

  color: #176be3;
}


.opcion-usuario-icono svg {
  width: 19px;
  height: 19px;
}


.opcion-usuario-texto {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
}


.opcion-usuario-texto strong {
  color: #19355f;

  font-size: 14px;
  font-weight: 720;
}


.opcion-usuario-texto small {
  overflow: hidden;

  color: #7b8eaa;

  font-size: 11px;

  text-overflow: ellipsis;
  white-space: nowrap;
}


.opcion-flecha {
  width: 15px;
  height: 15px;

  color: #91a2ba;
}


.opcion-cerrar-sesion {
  margin-top: 2px;
}


.opcion-cerrar-sesion .opcion-usuario-icono {
  color: #d94b5b;

  background:
    linear-gradient(
      145deg,
      #fff0f2,
      #ffe5e9
    );

  border-color:
    #f5d8dd;
}


.opcion-cerrar-sesion .opcion-usuario-texto strong {
  color: #b93e4c;
}


.opcion-cerrar-sesion:hover {
  background: #fff5f6;
}


/* ========================================
   ANIMACIÓN DEL MENÚ
======================================== */

.menu-usuario-enter-active,
.menu-usuario-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}


.menu-usuario-enter-from,
.menu-usuario-leave-to {
  opacity: 0;

  transform:
    translateY(-6px)
    scale(0.985);
}


/* ========================================
   BIENVENIDA
======================================== */

.bienvenida-principal {
  min-height: 112px;

  display: grid;

  grid-template-columns:
    minmax(360px, 1fr)
    500px;

  align-items: center;

  gap: 34px;

  margin-bottom: 16px;
}


.saludo-linea {
  display: flex;
  align-items: center;

  gap: 11px;
}


.icono-momento {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  color: #f59e0b;
}


.icono-momento svg {
  width: 100%;
  height: 100%;
}


.saludo-bloque h1 {
  margin: 0;

  color: #10245d;

  font-size: 36px;
  font-weight: 750;
  font-style: italic;

  line-height: 1.15;

  letter-spacing: -0.7px;
}


.saludo-bloque > p {
  margin:
    6px
    0
    0;

  color: #49679e;

  font-size: 16px;

  line-height: 1.45;
}



/* ========================================
   FRASE / MONTAÑAS
======================================== */

.frase-dia {
  position: relative;

  min-height: 112px;

  display: flex;
  align-items: center;

  overflow: hidden;

  padding:
    11px
    0
    0
    12px;

  border-radius:
    0
    0
    12px
    12px;
}


.frase-dia::after {
  content: "";

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  height: 32px;

  z-index: 0;

  background:
    linear-gradient(
      180deg,
      rgba(220, 234, 255, 0),
      rgba(213, 230, 255, 0.78)
    );

  border-radius:
    0
    0
    12px
    12px;

  pointer-events: none;
}


.frase-contenido {
  position: relative;

  z-index: 2;

  min-width: 220px;

  padding-bottom: 13px;
}


.frase-contenido .fecha {
  display: inline-block;

  color: #48679f;

  font-size: 12.5px;
  font-weight: 650;

  letter-spacing: 0.05px;
}


.frase-contenido p {
  margin:
    8px
    0
    10px;

  color: #4e699d;

  font-size: 13px;
  font-weight: 550;
  font-style: italic;

  line-height: 1.46;
}


.frase-motivacional {
  min-height: 38px;

  white-space: pre-line;
}


.frase-enter-active,
.frase-leave-active {
  transition:
    opacity 0.42s ease,
    transform 0.42s ease;
}


.frase-enter-from {
  opacity: 0;

  transform:
    translateY(7px);
}


.frase-leave-to {
  opacity: 0;

  transform:
    translateY(-7px);
}


.frase-linea {
  display: block;

  width: 29px;
  height: 3px;

  background:
    linear-gradient(
      90deg,
      #1976f3,
      #4a91f6
    );

  border-radius: 999px;

  box-shadow:
    0 1px 3px
    rgba(
      25,
      118,
      243,
      0.18
    );
}


.montanas {
  position: absolute;

  z-index: 1;

  right: -5px;
  bottom: 0;

  width: 310px;
  height: 126px;

  overflow: hidden;

  pointer-events: none;
}


.escena-montana {
  width: 100%;
  height: 100%;

  display: block;

  overflow: visible;

  transform-origin:
    center
    bottom;

  transition:
    transform .5s ease,
    filter .5s ease;
}


.frase-dia:hover .escena-montana {
  transform:
    scale(1.018);

  filter:
    saturate(1.04);
}


/* ========================================
   CIELO
======================================== */

.cielo-luz {
  fill: #e4f0ff;

  opacity: .72;
}


.escena-sol {
  transform-box: fill-box;
  transform-origin: center;

  animation:
    sol-flotante
    6.5s
    ease-in-out
    infinite;
}


.sol-halo {
  fill: #bcd9ff;

  opacity: .22;

  transform-box: fill-box;
  transform-origin: center;

  animation:
    pulso-halo
    4.8s
    ease-in-out
    infinite;
}


.sol-nucleo {
  fill: #8ebaf4;

  opacity: .92;
}


/* ========================================
   PARTÍCULAS
======================================== */

.particula {
  fill: #78a9e8;

  opacity: .5;

  transform-box: fill-box;
  transform-origin: center;

  animation:
    particula-flotante
    5.8s
    ease-in-out
    infinite;
}


.particula-2 {
  animation-delay: -1.7s;
}


.particula-3 {
  animation-delay: -3.1s;
}


.particula-4 {
  animation-delay: -4.2s;
}


/* ========================================
   NUBES
======================================== */

.nube {
  opacity: .72;

  transform-box: fill-box;
  transform-origin: center;

  animation:
    nube-flotante
    10s
    ease-in-out
    infinite;
}


.nube-2 {
  opacity: .52;

  animation-duration: 12s;
  animation-delay: -4s;
}


.nube-forma {
  fill: #f6faff;
}


/* ========================================
   MONTAÑAS
======================================== */

.montana-capa {
  transform-box: fill-box;
  transform-origin:
    center
    bottom;
}


.montana-fondo {
  animation:
    montana-fondo-viva
    11s
    ease-in-out
    infinite;
}


.montana-principal {
  animation:
    montana-principal-viva
    9s
    ease-in-out
    infinite;
}


.montana-media {
  animation:
    montana-media-viva
    10.5s
    ease-in-out
    infinite;
}


.montana-frente {
  animation:
    montana-frente-viva
    8.5s
    ease-in-out
    infinite;
}


.montana-fondo-1 {
  fill: #d8e9ff;
}


.montana-fondo-2 {
  fill: #c4dcfb;
}


.montana-principal-base {
  fill: #4e84dc;
}


.montana-principal-sombra {
  fill: #356fc7;

  opacity: .94;
}


.nieve-principal {
  fill: #edf6ff;
}


.linea-nieve {
  fill: none;

  stroke: #cfe2fa;

  stroke-width: 1;

  stroke-linecap: round;

  opacity: .92;
}


.montana-media-base {
  fill: #729ee5;
}


.montana-media-sombra {
  fill: #4f80cf;

  opacity: .92;
}


.nieve-media {
  fill: #e7f1ff;
}


.montana-frente-base {
  fill: #3d76ce;
}


.montana-frente-sombra {
  fill: #2f66b9;

  opacity: .88;
}


/* ========================================
   CAMINO
======================================== */

.camino-cima {
  fill: none;

  stroke: #dcecff;

  stroke-width: 1.35;

  stroke-linecap: round;

  stroke-dasharray:
    3
    4;

  opacity: .82;

  animation:
    camino-activo
    8s
    linear
    infinite;
}


/* ========================================
   BANDERA
======================================== */

.bandera-poste {
  fill: none;

  stroke: #315d9c;

  stroke-width: 1.4;

  stroke-linecap: round;
}


.bandera-punta {
  fill: #2b65b9;
}


.bandera-tela {
  fill: #2478ec;

  transform-box: fill-box;
  transform-origin:
    left
    center;

  animation:
    bandera-onda
    2.7s
    ease-in-out
    infinite;
}


/* ========================================
   PINOS
======================================== */

.pino {
  transform-box: fill-box;
  transform-origin:
    center
    bottom;

  animation:
    pino-brisa
    5s
    ease-in-out
    infinite;
}


.pino-2 {
  animation-delay: -1.7s;
}


.pino-3 {
  animation-delay: -3.2s;
}


.pino-copa {
  fill: #2e69ba;

  opacity: .72;
}


.pino-tronco {
  fill: none;

  stroke: #315f9f;

  stroke-width: 1.2;

  stroke-linecap: round;

  opacity: .7;
}


/* ========================================
   NEBLINA
======================================== */

.neblina {
  transform-box: fill-box;
  transform-origin: center;

  animation:
    neblina-movimiento
    12s
    ease-in-out
    infinite;
}


.neblina-2 {
  animation-duration: 15s;
  animation-delay: -5s;
}


.neblina-forma {
  fill: #d9eaff;

  opacity: .66;
}


.neblina-forma-2 {
  fill: #cfe3fb;

  opacity: .48;
}


.suelo {
  fill: #c7def9;

  opacity: .84;
}


/* ========================================
   ANIMACIONES DE LA ESCENA
======================================== */

@keyframes sol-flotante {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-3px);
  }

}


@keyframes pulso-halo {

  0%,
  100% {
    transform:
      scale(.92);

    opacity: .18;
  }

  50% {
    transform:
      scale(1.12);

    opacity: .31;
  }

}


@keyframes particula-flotante {

  0%,
  100% {
    transform:
      translateY(0)
      scale(.92);

    opacity: .32;
  }

  50% {
    transform:
      translateY(-6px)
      scale(1.08);

    opacity: .66;
  }

}


@keyframes nube-flotante {

  0%,
  100% {
    transform:
      translateX(-2px)
      translateY(0);
  }

  50% {
    transform:
      translateX(5px)
      translateY(-1.5px);
  }

}


@keyframes montana-fondo-viva {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(1.2px);
  }

}


@keyframes montana-principal-viva {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-1px);
  }

}


@keyframes montana-media-viva {

  0%,
  100% {
    transform:
      translateX(0);
  }

  50% {
    transform:
      translateX(1.3px);
  }

}


@keyframes montana-frente-viva {

  0%,
  100% {
    transform:
      translateX(0);
  }

  50% {
    transform:
      translateX(-1px);
  }

}


@keyframes camino-activo {

  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -28;
  }

}


@keyframes bandera-onda {

  0%,
  100% {
    transform:
      skewY(0deg)
      scaleX(1);
  }

  50% {
    transform:
      skewY(-4deg)
      scaleX(.94);
  }

}


@keyframes pino-brisa {

  0%,
  100% {
    transform:
      rotate(0deg);
  }

  50% {
    transform:
      rotate(.8deg);
  }

}


@keyframes neblina-movimiento {

  0%,
  100% {
    transform:
      translateX(-4px);
  }

  50% {
    transform:
      translateX(6px);
  }

}



/* ========================================
   ESTADÍSTICAS
======================================== */

.estadisticas {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 16px;

  margin-bottom: 18px;
}


.tarjeta-estadistica {
  position: relative;

  min-height: 93px;

  display: flex;
  align-items: center;

  gap: 16px;

  padding:
    17px
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
    #e1eaf8;

  border-radius: 11px;

  box-shadow:
    0 4px 18px
    rgba(
      51,
      92,
      160,
      0.04
    );

  overflow: hidden;

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}


.tarjeta-estadistica:hover {
  transform: translateY(-3px);

  border-color: #cddcf0;

  box-shadow:
    0 10px 26px
    rgba(
      40,
      83,
      148,
      0.10
    );
}


.tarjeta-estadistica:hover .icono-estadistica {
  transform: scale(1.045);
}


.tarjeta-estadistica::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  height: 3px;

  background:
    var(--acento);
}


.estadistica-azul {
  --acento: #4b99ef;
  --fondo-icono: #dfeeff;
  --color-icono: #176df2;
}


.estadistica-amarillo {
  --acento: #eab84b;
  --fondo-icono: #fff2d2;
  --color-icono: #e0a121;
}


.estadistica-verde {
  --acento: #52c5a2;
  --fondo-icono: #def5ed;
  --color-icono: #0b9e70;
}


.estadistica-rojo {
  --acento: #e86f7b;
  --fondo-icono: #ffe5e8;
  --color-icono: #ef3f54;
}


.icono-estadistica {
  width: 54px;
  height: 54px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    var(--fondo-icono);

  border-radius: 12px;

  color:
    var(--color-icono);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}


.icono-estadistica svg {
  width: 29px;
  height: 29px;
}


.estadistica-dato {
  display: flex;
  flex-direction: column;

  gap: 4px;
}


.estadistica-dato strong {
  color: #071c52;

  font-size: 24px;
  font-weight: 750;

  line-height: 1;
}


.estadistica-dato span {
  color: #3f5f99;

  font-size: 13px;
}


.etiqueta {
  position: absolute;

  top: 23px;
  right: 18px;

  padding:
    4px
    7px;

  border-radius: 12px;

  font-size: 11px;
  font-weight: 650;
}


.etiqueta-azul {
  background: #e6f1ff;
  color: #1769d5;
}


.etiqueta-amarillo {
  background: #fff2d7;
  color: #ba7d08;
}


.etiqueta-verde {
  background: #e0f7ee;
  color: #07865f;
}


.etiqueta-rojo {
  background: #ffe7e9;
  color: #dd3047;
}



/* ========================================
   ACCESOS RÁPIDOS
======================================== */

.panel-acciones {
  margin-bottom: 18px;

  padding:
    18px;

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

  border-radius: 12px;

  box-shadow:
    0 4px 17px
    rgba(
      48,
      84,
      137,
      0.04
    );
}


.panel-acciones h2 {
  margin:
    0
    0
    14px;

  color: #0a2058;

  font-size: 20px;
  font-weight: 740;
}


.acciones-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 14px;
}


.accion-card {
  min-width: 0;
  min-height: 84px;

  display: grid;

  grid-template-columns:
    auto
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 13px;

  padding:
    13px
    14px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fbfdff
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 10px;

  color: inherit;

  font-family: inherit;
  text-align: left;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}


.accion-card:hover {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f2f7ff
    );

  border-color: #bed5f4;

  box-shadow:
    0 7px 18px
    rgba(
      33,
      91,
      171,
      0.08
    );

  transform:
    translateY(-3px);
}


.accion-card:hover .accion-icono {
  transform: scale(1.045);
}


.accion-icono {
  width: 45px;
  height: 45px;

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

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}


.accion-globales .accion-icono {
  background:
    linear-gradient(
      145deg,
      #e7f6ff,
      #d9efff
    );

  border-color: #d5e9f8;

  color: #1789c9;
}


.accion-convocatorias .accion-icono {
  background:
    linear-gradient(
      145deg,
      #f0eaff,
      #e7ddff
    );

  border-color: #e3d7fb;

  color: #8153df;
}


.accion-icono svg {
  width: 25px;
  height: 25px;
}


.accion-texto {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 4px;
}


.accion-texto strong {
  color: #16345f;

  font-size: 14px;
  font-weight: 720;
}


.accion-texto small {
  color: #6a82a7;

  font-size: 11.5px;

  line-height: 1.4;
}


.accion-flecha {
  align-self: start;

  margin-top: 3px;

  color: #5b82b8;

  font-size: 16px;

  transition:
    transform 0.2s ease,
    color 0.2s ease;
}


.accion-card:hover .accion-flecha {
  color: #176ef0;

  transform:
    translateX(3px);
}



/* ========================================
   PROYECTOS RECIENTES
======================================== */

.panel-recientes {
  scroll-margin-top: 20px;

  padding:
    18px;

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
}


.encabezado-recientes {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 14px;
}


.titulo-recientes {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 13px;
}


.icono-recientes {
  width: 43px;
  height: 43px;

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


.icono-recientes svg {
  width: 24px;
  height: 24px;
}


.titulo-recientes h2 {
  margin: 0;

  color: #0a2058;

  font-size: 18px;
  font-weight: 740;
}


.titulo-recientes p {
  margin:
    3px
    0
    0;

  color: #617da9;

  font-size: 13px;

  line-height: 1.45;
}


.btn-ver-proyectos {
  min-height: 40px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding:
    0
    14px;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #eef5ff
    );

  color: #1264df;

  border:
    1px solid
    #bfd3ef;

  border-radius: 9px;

  box-shadow:
    0 4px 11px
    rgba(
      28,
      91,
      178,
      0.07
    );

  font-family: inherit;
  font-size: 12px;
  font-weight: 700;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.btn-ver-proyectos:hover {
  color: white;

  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #1569ee;

  box-shadow:
    0 6px 16px
    rgba(
      21,
      105,
      238,
      0.20
    );

  transform:
    translateY(-1px);
}



/* ========================================
   TABLA
======================================== */

.tabla-contenedor {
  overflow-x: auto;

  border:
    1px solid
    #dfe8f4;

  border-radius: 10px;
}


table {
  width: 100%;

  border-collapse: collapse;

  min-width: 980px;

  background: white;
}


thead {
  background:
    linear-gradient(
      180deg,
      #f8fbff,
      #f1f6fc
    );
}


th {
  padding:
    12px
    14px;

  color: #28466f;

  border-bottom:
    1px solid
    #dce6f2;

  font-size: 12px;
  font-weight: 720;

  text-align: left;
}


td {
  padding:
    13px
    14px;

  color: #536e96;

  border-bottom:
    1px solid
    #edf2f8;

  font-size: 12px;

  vertical-align: middle;
}


tbody tr:last-child td {
  border-bottom: none;
}


tbody tr {
  transition:
    background 0.18s ease;
}


tbody tr:hover {
  background: #f8fbff;
}


.proyecto-nombre {
  display: flex;
  align-items: center;

  gap: 9px;
}


.proyecto-nombre strong {
  max-width: 290px;

  color: #17315d;

  font-size: 12px;
  font-weight: 700;

  line-height: 1.35;

  overflow-wrap: anywhere;
}


.mini-carpeta {
  width: 31px;
  height: 31px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e6f1ff;

  border-radius: 8px;

  color: #1269ee;
}


.mini-carpeta svg {
  width: 18px;
  height: 18px;
}


.estado-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 88px;

  padding:
    5px
    8px;

  border:
    1px solid
    transparent;

  border-radius: 999px;

  font-size: 10.5px;
  font-weight: 700;

  white-space: nowrap;
}


.estado-captura {
  background: #eef4ff;
  color: #326dbb;
  border-color: #d7e5fa;
}


.estado-sometido {
  background: #edf3ff;
  color: #5d64bc;
  border-color: #dcdffd;
}


.estado-registro {
  background: #e9f7ff;
  color: #1376aa;
  border-color: #d0ebf8;
}


.estado-financiado {
  background: #e7f8ef;
  color: #16825d;
  border-color: #cceedd;
}


.estado-rechazado {
  background: #fff0f2;
  color: #d43d50;
  border-color: #f5d8dd;
}


.estado-informe-pendiente {
  background: #fff6df;
  color: #a87513;
  border-color: #f2e5bd;
}


.estado-informe-deuda {
  background: #fff0e8;
  color: #bd6434;
  border-color: #f2d8c9;
}


.estado-liberado {
  background: #e6f8f0;
  color: #0f8a63;
  border-color: #ccecdf;
}


.estado-default {
  background: #f1f4f8;
  color: #67768c;
  border-color: #dde3eb;
}


.fecha-proyecto {
  display: block;

  color: #39577f;

  font-weight: 650;
}


td small {
  display: block;

  margin-top: 3px;

  color: #8598b2;

  font-size: 10px;
}


.btn-ver {
  min-height: 32px;

  padding:
    0
    12px;

  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  color: white;

  border:
    1px solid
    #1569ee;

  border-radius: 8px;

  box-shadow:
    0 4px 10px
    rgba(
      21,
      105,
      238,
      0.16
    );

  font-family: inherit;
  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}


.btn-ver:hover {
  transform:
    translateY(-1px);

  box-shadow:
    0 6px 14px
    rgba(
      21,
      105,
      238,
      0.23
    );

  filter:
    brightness(1.02);
}


.mensaje-tabla {
  height: 126px;

  color: #7186a7;

  text-align: center;
}


.mensaje-error {
  color: #c73a4b !important;
}



/* ========================================
   TARJETAS MÓVIL
======================================== */

.tarjetas-movil {
  display: none;
}


.proyecto-movil {
  padding:
    14px;

  background: white;

  border:
    1px solid
    #dfe8f4;

  border-radius: 10px;

  box-shadow:
    0 3px 12px
    rgba(
      48,
      84,
      137,
      0.04
    );

  transition:
    transform 0.20s ease,
    box-shadow 0.20s ease,
    border-color 0.20s ease;
}


.proyecto-movil:hover {
  transform: translateY(-2px);

  border-color: #cddcf0;

  box-shadow:
    0 9px 22px
    rgba(
      38,
      78,
      139,
      0.09
    );
}


.proyecto-movil-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 12px;

  margin-bottom: 10px;
}


.proyecto-movil-top > div {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 3px;
}


.proyecto-movil-top strong {
  color: #17315d;

  font-size: 13px;

  line-height: 1.35;
}


.proyecto-movil-top span:not(.estado-pill) {
  color: #7489a8;

  font-size: 11px;
}


.proyecto-movil p {
  margin:
    7px
    0;

  color: #61799c;

  font-size: 11.5px;

  line-height: 1.45;
}


.btn-ver.movil {
  width: 100%;

  margin-top: 7px;
}


.mensaje-movil {
  padding:
    30px
    12px;

  color: #7186a7;

  text-align: center;
}



/* ========================================
   MODO OSCURO
======================================== */

.modo-oscuro {
  --fondo-oscuro: #0f1726;
  --fondo-oscuro-secundario: #111c2d;
  --superficie-oscura: #172338;
  --superficie-oscura-2: #1a2940;
  --borde-oscuro: #2d3d56;
  --borde-oscuro-fuerte: #3b506f;
  --texto-oscuro-principal: #eef5ff;
  --texto-oscuro-secundario: #a0b3d0;
  --texto-oscuro-suave: #8298ba;

  background:
    radial-gradient(
      circle at 7% 3%,
      rgba(48, 88, 148, 0.25),
      transparent 28%
    ),
    radial-gradient(
      circle at 94% 2%,
      rgba(38, 76, 134, 0.22),
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #101827 0%,
      #111b2d 48%,
      #0e1726 100%
    );

  color:
    var(--texto-oscuro-principal);
}


.modo-oscuro .barra-superior,
.modo-oscuro .panel-acciones,
.modo-oscuro .panel-recientes,
.modo-oscuro .tarjeta-estadistica {
  background:
    linear-gradient(
      180deg,
      #19263a,
      #162236
    );

  border-color:
    #2d405c;

  box-shadow:
    0 10px 28px
    rgba(
      0,
      0,
      0,
      0.16
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.025
    );
}


.modo-oscuro .tarjeta-estadistica:hover {
  border-color: #45668e;

  box-shadow:
    0 14px 30px
    rgba(
      0,
      0,
      0,
      0.24
    );
}


.modo-oscuro .marca-icono,
.modo-oscuro .accion-icono,
.modo-oscuro .icono-recientes {
  background:
    linear-gradient(
      145deg,
      #20395c,
      #1b3151
    );

  border-color: #345176;

  color: #74abff;
}


.modo-oscuro .accion-globales .accion-icono {
  background:
    linear-gradient(
      145deg,
      #17394a,
      #173244
    );

  border-color: #315469;

  color: #69c7ed;
}


.modo-oscuro .accion-convocatorias .accion-icono {
  background:
    linear-gradient(
      145deg,
      #30264d,
      #2b2344
    );

  border-color: #50406e;

  color: #b7a0ff;
}


.modo-oscuro .marca-texto span,
.modo-oscuro .saludo-bloque > p,
.modo-oscuro .titulo-recientes p,
.modo-oscuro .accion-texto small {
  color:
    var(--texto-oscuro-secundario);
}


.modo-oscuro .marca-texto strong,
.modo-oscuro .saludo-bloque h1,
.modo-oscuro .panel-acciones h2,
.modo-oscuro .titulo-recientes h2,
.modo-oscuro .accion-texto strong,
.modo-oscuro .estadistica-dato strong {
  color:
    var(--texto-oscuro-principal);
}


.modo-oscuro .selector-tema {
  background: #24344a;
}


.modo-oscuro .selector-tema::before {
  background: #dbe7f6;

  box-shadow:
    0 2px 8px
    rgba(
      0,
      0,
      0,
      0.28
    );
}


.modo-oscuro .usuario-chip {
  background:
    linear-gradient(
      135deg,
      #1b293e,
      #17243a
    );

  border-color: #334b6a;
}


.modo-oscuro .usuario-chip:hover,
.modo-oscuro .usuario-chip.abierto {
  background:
    linear-gradient(
      135deg,
      #20314a,
      #1a2940
    );

  border-color: #45668e;

  box-shadow:
    0 8px 18px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .usuario-chevron {
  color: #8599b7;
}


.modo-oscuro .usuario-chip.abierto .usuario-chevron {
  color: #84b4fa;
}


.modo-oscuro .menu-usuario-desplegable {
  background:
    rgba(
      21,
      33,
      51,
      0.985
    );

  border-color: #334963;

  box-shadow:
    0 18px 42px
    rgba(
      0,
      0,
      0,
      0.30
    );
}


.modo-oscuro .menu-usuario-desplegable::before {
  background:
    radial-gradient(
      circle,
      rgba(
        62,
        103,
        159,
        0.18
      ),
      transparent 68%
    );
}


.modo-oscuro .menu-usuario-cabecera strong {
  color: #edf5ff;
}


.modo-oscuro .menu-usuario-cabecera span {
  color: #91a7c9;
}


.modo-oscuro .menu-usuario-separador {
  background: #2c4059;
}


.modo-oscuro .opcion-modo-texto strong {
  color: #dce9f8;
}


.modo-oscuro .opcion-modo-texto small {
  color: #8ea3c1;
}


.modo-oscuro .opcion-usuario:hover {
  background: #1d304a;
}


.modo-oscuro .opcion-usuario-icono {
  color: #7eb2fa;

  background:
    linear-gradient(
      145deg,
      #253d5e,
      #213653
    );

  border-color: #355578;
}


.modo-oscuro .opcion-usuario-texto strong {
  color: #dce9f8;
}


.modo-oscuro .opcion-usuario-texto small {
  color: #8ea3c1;
}


.modo-oscuro .opcion-flecha {
  color: #6f86a5;
}


.modo-oscuro .opcion-cerrar-sesion:hover {
  background: #39242d;
}


.modo-oscuro .opcion-cerrar-sesion .opcion-usuario-icono {
  color: #f08b98;

  background:
    linear-gradient(
      145deg,
      #452832,
      #38232b
    );

  border-color: #673944;
}


.modo-oscuro .opcion-cerrar-sesion .opcion-usuario-texto strong {
  color: #f2a0aa;
}



.modo-oscuro .avatar {
  background:
    linear-gradient(
      145deg,
      #20395c,
      #1b3151
    );

  border-color: #345176;

  color: #8ebaff;
}


.modo-oscuro .usuario-info strong {
  color: #edf5ff;
}


.modo-oscuro .usuario-info span {
  color: #91a7c9;
}


.modo-oscuro .frase-dia::after {
  background:
    linear-gradient(
      180deg,
      rgba(30, 48, 73, 0),
      rgba(31, 50, 77, 0.84)
    );
}


.modo-oscuro .frase-contenido .fecha,
.modo-oscuro .frase-contenido p {
  color: #9fb5d6;
}


.modo-oscuro .cielo-luz {
  fill: #264261;

  opacity: .36;
}


.modo-oscuro .sol-halo {
  fill: #7aa8e9;

  opacity: .13;
}


.modo-oscuro .sol-nucleo {
  fill: #8db6ee;

  opacity: .76;
}


.modo-oscuro .particula {
  fill: #9cc5fb;

  opacity: .52;
}


.modo-oscuro .nube-forma {
  fill: #5e7899;
}


.modo-oscuro .montana-fondo-1 {
  fill: #263d5d;
}


.modo-oscuro .montana-fondo-2 {
  fill: #2c4669;
}


.modo-oscuro .montana-principal-base {
  fill: #365f99;
}


.modo-oscuro .montana-principal-sombra {
  fill: #294d7e;
}


.modo-oscuro .nieve-principal,
.modo-oscuro .nieve-media {
  fill: #9db7d8;
}


.modo-oscuro .linea-nieve {
  stroke: #7697bd;
}


.modo-oscuro .montana-media-base {
  fill: #405f8c;
}


.modo-oscuro .montana-media-sombra {
  fill: #304e79;
}


.modo-oscuro .montana-frente-base {
  fill: #2c5285;
}


.modo-oscuro .montana-frente-sombra {
  fill: #23456f;
}


.modo-oscuro .camino-cima {
  stroke: #a8c5e7;

  opacity: .65;
}


.modo-oscuro .bandera-poste {
  stroke: #8ba9cb;
}


.modo-oscuro .bandera-punta {
  fill: #8bb8f3;
}


.modo-oscuro .bandera-tela {
  fill: #5795eb;
}


.modo-oscuro .pino-copa {
  fill: #24466f;
}


.modo-oscuro .pino-tronco {
  stroke: #547ba9;
}


.modo-oscuro .neblina-forma {
  fill: #2a4569;

  opacity: .56;
}


.modo-oscuro .neblina-forma-2 {
  fill: #253c5b;

  opacity: .49;
}


.modo-oscuro .suelo {
  fill: #294461;

  opacity: .82;
}


.modo-oscuro .accion-card {
  background:
    linear-gradient(
      135deg,
      #1a2940,
      #17253a
    );

  border-color: #2e435f;
}


.modo-oscuro .accion-card:hover {
  background:
    linear-gradient(
      135deg,
      #20314a,
      #1b2b42
    );

  border-color: #45668e;

  box-shadow:
    0 8px 20px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .accion-flecha {
  color: #83a9d9;
}


.modo-oscuro .btn-ver-proyectos {
  background:
    linear-gradient(
      135deg,
      #1c2b42,
      #17243a
    );

  color: #83b5ff;

  border-color: #395474;

  box-shadow:
    0 5px 14px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .btn-ver-proyectos:hover {
  color: white;

  background:
    linear-gradient(
      135deg,
      #2c7af2,
      #1163df
    );

  border-color: #367fef;
}


.modo-oscuro .tabla-contenedor {
  border-color: #2d405c;
}


.modo-oscuro table {
  background: #172338;
}


.modo-oscuro thead {
  background:
    linear-gradient(
      180deg,
      #1c2b42,
      #18263a
    );
}


.modo-oscuro th {
  color: #c4d3e8;

  border-bottom-color: #30445f;
}


.modo-oscuro td {
  color: #a2b4cf;

  border-bottom-color: #253750;
}


.modo-oscuro tbody tr:hover {
  background: #1b2a40;
}


.modo-oscuro .proyecto-nombre strong,
.modo-oscuro .fecha-proyecto {
  color: #e8f1fd;
}


.modo-oscuro .mini-carpeta {
  background: #20395c;
  color: #74abff;
}


.modo-oscuro td small,
.modo-oscuro .mensaje-tabla,
.modo-oscuro .mensaje-movil {
  color: #8298ba;
}


.modo-oscuro .proyecto-movil {
  background:
    linear-gradient(
      180deg,
      #19263a,
      #162236
    );

  border-color: #2d405c;

  box-shadow:
    0 8px 22px
    rgba(
      0,
      0,
      0,
      0.14
    );
}


.modo-oscuro .proyecto-movil:hover {
  border-color: #45668e;

  box-shadow:
    0 12px 26px
    rgba(
      0,
      0,
      0,
      0.22
    );
}


.modo-oscuro .proyecto-movil-top strong {
  color: #edf5ff;
}


.modo-oscuro .proyecto-movil-top span:not(.estado-pill),
.modo-oscuro .proyecto-movil p {
  color: #9eb2d2;
}


.modo-oscuro .estado-captura {
  background: #203350;
  color: #91b9f3;
  border-color: #35527a;
}


.modo-oscuro .estado-sometido {
  background: #2b2f4d;
  color: #b4b9ff;
  border-color: #444b74;
}


.modo-oscuro .estado-registro {
  background: #173847;
  color: #72c6e8;
  border-color: #2d5667;
}


.modo-oscuro .estado-financiado,
.modo-oscuro .estado-liberado {
  background: #18372f;
  color: #7ad2ae;
  border-color: #2c5848;
}


.modo-oscuro .estado-rechazado {
  background: #45242d;
  color: #ff8998;
  border-color: #673641;
}


.modo-oscuro .estado-informe-pendiente {
  background: #3d321d;
  color: #efc66f;
  border-color: #5c4d2d;
}


.modo-oscuro .estado-informe-deuda {
  background: #442c21;
  color: #eda27a;
  border-color: #624233;
}


.modo-oscuro .estado-default {
  background: #283448;
  color: #aebdd2;
  border-color: #3b4a61;
}



/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 1180px) {

  .bienvenida-principal {
    grid-template-columns:
      1fr
      420px;
  }


  .estadisticas {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .acciones-grid {
    grid-template-columns:
      1fr;
  }

}


@media (max-width: 900px) {

  .pagina-proyectos {
    padding:
      20px
      18px
      34px;
  }


  .barra-superior {
    grid-template-columns:
      1fr
      auto;
  }


  .usuario-menu {
    justify-self: end;
  }


  .usuario-chip {
    border-radius: 999px;
  }


  .bienvenida-principal {
    grid-template-columns:
      1fr;

    gap: 10px;
  }


  .frase-dia {
    width: 100%;
  }


  .estadisticas {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .tabla-contenedor {
    display: none;
  }


  .tarjetas-movil {
    display: grid;

    gap: 10px;
  }

}


@media (max-width: 620px) {

  .usuario-chip {
    min-width: 0;

    padding-right: 7px;
  }


  .usuario-info {
    display: none;
  }


  .usuario-en-linea {
    margin-left: -4px;
  }


  .menu-usuario-desplegable {
    width:
      min(
        270px,
        calc(100vw - 32px)
      );
  }


  .pagina-proyectos {
    padding:
      16px
      12px
      28px;
  }


  .barra-superior {
    padding:
      9px
      10px;
  }


  .marca-texto span {
    font-size: 9px;
  }


  .marca-texto strong {
    font-size: 12px;
  }


  .selector-tema {
    width: 70px;
  }


  .selector-tema.activo::before {
    transform:
      translateX(32px);
  }


  .saludo-bloque h1 {
    font-size: 28px;
  }


  .saludo-bloque > p {
    font-size: 14px;
  }


  .frase-dia {
    min-height: 100px;
  }


  .montanas {
    width: 238px;
    height: 104px;

    opacity: .78;
  }


  .estadisticas {
    grid-template-columns:
      1fr;

    gap: 10px;
  }


  .tarjeta-estadistica {
    min-height: 82px;
  }


  .panel-acciones,
  .panel-recientes {
    padding:
      14px;
  }


  .accion-card {
    grid-template-columns:
      auto
      minmax(0, 1fr);
  }


  .accion-flecha {
    display: none;
  }


  .encabezado-recientes {
    align-items: flex-start;
    flex-direction: column;
  }


  .btn-ver-proyectos {
    width: 100%;
  }


  .proyecto-movil-top {
    flex-direction: column;
  }

}


/* ========================================
   ACCESIBILIDAD: REDUCIR ANIMACIONES
======================================== */

@media (prefers-reduced-motion: reduce) {

  .escena-sol,
  .sol-halo,
  .particula,
  .nube,
  .montana-fondo,
  .montana-principal,
  .montana-media,
  .montana-frente,
  .camino-cima,
  .bandera-tela,
  .pino,
  .neblina {
    animation: none !important;
  }


  .escena-montana {
    transition: none !important;
  }


  .frase-dia:hover .escena-montana {
    transform: none !important;

    filter: none !important;
  }


  .frase-enter-active,
  .frase-leave-active {
    transition: none !important;
  }


  .frase-enter-from,
  .frase-leave-to {
    transform: none !important;
  }


  .tarjeta-estadistica,
  .icono-estadistica,
  .accion-card,
  .accion-icono,
  .accion-flecha,
  .proyecto-movil,
  .usuario-chip,
  .usuario-chevron,
  .selector-tema,
  .menu-usuario-desplegable,
  .opcion-usuario,
  .btn-ver,
  .btn-ver-proyectos,
  tbody tr {
    transition: none !important;
  }

  .tarjeta-estadistica:hover,
  .accion-card:hover,
  .proyecto-movil:hover,
  .usuario-chip:hover,
  .opcion-usuario:hover,
  .btn-ver:hover {
    transform: none !important;
  }

}




/* ==========================================================
   IDENTIDAD ADMINISTRATIVA · DORADO / AMARILLO
========================================================== */

.pagina-admin {
  --admin-oro: #d99a13;
  --admin-oro-fuerte: #b97800;
  --admin-oro-claro: #f6c453;
  --admin-oro-suave: #fff2c9;
  --admin-borde: #ead7a2;
  --admin-texto: #49350c;
  --admin-texto-suave: #7c6634;

  background:
    radial-gradient(
      circle at 7% 3%,
      rgba(255, 231, 160, .68),
      transparent 25%
    ),
    radial-gradient(
      circle at 94% 2%,
      rgba(255, 239, 188, .62),
      transparent 25%
    ),
    #fffdf7;

  color: var(--admin-texto);
}


/* BARRA SUPERIOR */

.pagina-admin .barra-superior {
  border-color: #eadfbd;

  box-shadow:
    0 4px 17px
    rgba(122, 86, 11, .06);
}


.pagina-admin .marca-icono {
  color: #b87b05;

  background:
    linear-gradient(
      145deg,
      #fff3c9,
      #ffe7a2
    );

  border-color: #efd99a;
}


.pagina-admin .marca-texto span {
  color: #a27010;
}


.pagina-admin .marca-texto strong {
  color: #513b0d;
}


/* USUARIO */

.pagina-admin .usuario-chip {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fff9e9
    );

  border-color: #e9d8a6;
}


.pagina-admin .usuario-chip:hover,
.pagina-admin .usuario-chip.abierto {
  border-color: #dfbd68;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fff4d2
    );

  box-shadow:
    0 7px 17px
    rgba(128, 89, 11, .10);
}


.pagina-admin .avatar {
  color: #ad7507;

  background:
    linear-gradient(
      145deg,
      #fff2c7,
      #ffe5a0
    );

  border-color: #ecd79a;
}


.pagina-admin .usuario-info strong {
  color: #513b0d;
}


.pagina-admin .usuario-info span {
  color: #8b713b;
}


.pagina-admin .usuario-chip.abierto .usuario-chevron {
  color: #b77a06;
}


.pagina-admin .menu-usuario-desplegable {
  border-color: #e8d8ac;

  box-shadow:
    0 18px 40px
    rgba(100, 69, 9, .14);
}


.pagina-admin .menu-usuario-desplegable::before {
  background:
    radial-gradient(
      circle,
      rgba(255, 226, 139, .52),
      transparent 68%
    );
}


.pagina-admin .menu-usuario-cabecera strong,
.pagina-admin .opcion-modo-texto strong,
.pagina-admin .opcion-usuario-texto strong {
  color: #513b0d;
}


.pagina-admin .menu-usuario-cabecera span,
.pagina-admin .opcion-modo-texto small,
.pagina-admin .opcion-usuario-texto small {
  color: #8c7545;
}


.pagina-admin .opcion-usuario:hover {
  background: #fff8e5;
}


.pagina-admin .opcion-usuario-icono {
  color: #b67b08;

  background:
    linear-gradient(
      145deg,
      #fff3cb,
      #ffe8aa
    );

  border-color: #efdcaa;
}


.pagina-admin .opcion-flecha {
  color: #ac8a43;
}


.pagina-admin .selector-tema {
  background: #eee3c8;
}


.pagina-admin .selector-tema.activo {
  background: #47391d;
}


.pagina-admin .tema-sol {
  color: #c98b0c;
}


/* BIENVENIDA */

.pagina-admin .saludo-bloque h1 {
  color: #51380a;
}


.pagina-admin .saludo-bloque > p {
  color: #7d6637;
}


.admin-identidad {
  min-height: 30px;

  display: inline-flex;
  align-items: center;

  gap: 7px;

  margin-top: 11px;

  padding:
    0
    10px;

  color: #8e5f05;

  background:
    linear-gradient(
      135deg,
      #fff5d6,
      #ffeab1
    );

  border:
    1px solid
    #ead18d;

  border-radius: 999px;

  font-size: 11px;
  font-weight: 720;
}


.admin-identidad svg {
  width: 16px;
  height: 16px;
}


/* FRASE E ILUSTRACIÓN */

.pagina-admin .frase-contenido .fecha {
  color: #8b6c2d;
}


.pagina-admin .frase-contenido p {
  color: #7d6738;
}


.pagina-admin .frase-linea {
  background:
    linear-gradient(
      90deg,
      #c88c12,
      transparent
    );
}


.pagina-admin .frase-dia::after {
  background:
    linear-gradient(
      180deg,
      rgba(255, 240, 193, 0),
      rgba(255, 231, 159, .68)
    );
}


.pagina-admin .cielo-luz {
  fill: #fff0bc;
}


.pagina-admin .sol-halo {
  fill: #ffd568;
}


.pagina-admin .sol-nucleo {
  fill: #f3b72e;
}


.pagina-admin .particula {
  fill: #d49a22;
}


.pagina-admin .montana-fondo-1 {
  fill: #f5e2ae;
}


.pagina-admin .montana-fondo-2 {
  fill: #ead098;
}


.pagina-admin .montana-principal-base {
  fill: #d8a232;
}


.pagina-admin .montana-principal-sombra {
  fill: #b98118;
}


.pagina-admin .montana-media-base {
  fill: #e4b95b;
}


.pagina-admin .montana-media-sombra {
  fill: #c79128;
}


.pagina-admin .montana-frente-base {
  fill: #c38a1d;
}


.pagina-admin .montana-frente-sombra {
  fill: #a86f0c;
}


.pagina-admin .nieve-principal,
.pagina-admin .nieve-media {
  fill: #fff6dc;
}


.pagina-admin .linea-nieve {
  stroke: #f0d996;
}


.pagina-admin .camino-cima {
  stroke: #fff2c8;
}


.pagina-admin .bandera-poste {
  stroke: #73500b;
}


.pagina-admin .bandera-punta {
  fill: #a76d00;
}


.pagina-admin .bandera-tela {
  fill: #efaa16;
}


.pagina-admin .pino-copa {
  fill: #8d6417;
}


.pagina-admin .pino-tronco {
  stroke: #765317;
}


.pagina-admin .neblina-forma {
  fill: #f5dfaa;
}


.pagina-admin .neblina-forma-2 {
  fill: #edd296;
}


.pagina-admin .suelo {
  fill: #e7c980;
}


/* ESTADÍSTICAS */

.pagina-admin .tarjeta-estadistica {
  border-color: #eadfbd;

  box-shadow:
    0 4px 17px
    rgba(114, 78, 8, .05);
}


.pagina-admin .tarjeta-estadistica:hover {
  border-color: #dec173;

  box-shadow:
    0 10px 26px
    rgba(114, 78, 8, .10);
}


.pagina-admin .estadistica-azul {
  --acento: #dba127;
  --fondo-icono: #fff0c4;
  --color-icono: #b97900;
}


.pagina-admin .estadistica-amarillo {
  --acento: #edbd4b;
  --fondo-icono: #fff3d1;
  --color-icono: #c58a0f;
}


.pagina-admin .estadistica-dato strong {
  color: #4d380c;
}


.pagina-admin .estadistica-dato span {
  color: #806a3a;
}


.pagina-admin .etiqueta-azul,
.pagina-admin .etiqueta-amarillo {
  color: #956308;

  background: #fff1c7;
}


/* ACCIONES */

.pagina-admin .panel-acciones,
.pagina-admin .panel-recientes {
  border-color: #eadfbd;

  box-shadow:
    0 4px 17px
    rgba(114, 78, 8, .05);
}


.encabezado-panel-admin {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 18px;

  margin-bottom: 15px;
}


.eyebrow-admin {
  display: block;

  margin-bottom: 3px;

  color: #a5720c;

  font-size: 10px;
  font-weight: 760;

  letter-spacing: .07em;

  text-transform: uppercase;
}


.pagina-admin .panel-acciones h2 {
  margin: 0;

  color: #51390c;
}


.escudo-admin {
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #a96f04;

  background:
    linear-gradient(
      145deg,
      #fff3cb,
      #ffe3a0
    );

  border:
    1px solid
    #e9d18d;

  border-radius: 11px;
}


.escudo-admin svg {
  width: 24px;
  height: 24px;
}


.acciones-grid-admin {
  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );
}


.pagina-admin .accion-card {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fffaf0
    );

  border-color: #e9dfc1;
}


.pagina-admin .accion-card:hover {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fff3d4
    );

  border-color: #ddb95f;

  box-shadow:
    0 7px 18px
    rgba(125, 87, 11, .10);
}


.pagina-admin .accion-icono,
.pagina-admin .accion-globales .accion-icono,
.pagina-admin .accion-convocatorias .accion-icono {
  color: #b77b08;

  background:
    linear-gradient(
      145deg,
      #fff3cc,
      #ffe5a5
    );

  border-color: #edda9f;
}


.pagina-admin .accion-texto strong {
  color: #563e0d;
}


.pagina-admin .accion-texto small {
  color: #806b3f;
}


.pagina-admin .accion-flecha {
  color: #a47b29;
}


.pagina-admin .accion-card:hover .accion-flecha {
  color: #b87900;
}


/* TABLA */

.pagina-admin .icono-recientes,
.pagina-admin .mini-carpeta {
  color: #b77905;

  background:
    linear-gradient(
      145deg,
      #fff2c6,
      #ffe5a3
    );

  border-color: #ecd89c;
}


.pagina-admin .titulo-recientes h2 {
  color: #51390c;
}


.pagina-admin .titulo-recientes p {
  color: #826d40;
}


.pagina-admin .btn-ver-proyectos,
.pagina-admin .btn-ver {
  color: #3c2a08;

  background:
    linear-gradient(
      135deg,
      #f6c654,
      #dda01b
    );

  border-color: #d69812;

  box-shadow:
    0 5px 13px
    rgba(174, 116, 5, .18);
}


.pagina-admin .btn-ver-proyectos:hover,
.pagina-admin .btn-ver:hover {
  color: #2f2107;

  background:
    linear-gradient(
      135deg,
      #ffd875,
      #e6aa24
    );

  border-color: #c98909;

  box-shadow:
    0 7px 17px
    rgba(174, 116, 5, .25);
}


.pagina-admin .tabla-contenedor {
  border-color: #e9dfc3;
}


.pagina-admin thead {
  background:
    linear-gradient(
      180deg,
      #fffdf7,
      #fff7e2
    );
}


.pagina-admin th {
  color: #654b18;

  border-bottom-color: #eadcb8;
}


.pagina-admin td {
  color: #75633d;

  border-bottom-color: #f0e8d4;
}


.pagina-admin tbody tr:hover {
  background: #fffaf0;
}


.pagina-admin .proyecto-nombre strong,
.pagina-admin .fecha-proyecto {
  color: #594316;
}


.pagina-admin td small {
  color: #99865d;
}


.pagina-admin .proyecto-movil {
  border-color: #eadfbd;
}


.pagina-admin .proyecto-movil:hover {
  border-color: #ddc379;
}


.pagina-admin .proyecto-movil-top strong {
  color: #55400f;
}


.pagina-admin .proyecto-movil-top span:not(.estado-pill),
.pagina-admin .proyecto-movil p {
  color: #806e45;
}


/* ==========================================================
   MODO OSCURO ADMIN
========================================================== */

.pagina-admin.modo-oscuro {
  --fondo-oscuro: #17130b;
  --fondo-oscuro-secundario: #1b160d;
  --superficie-oscura: #211b10;
  --superficie-oscura-2: #292113;
  --borde-oscuro: #4a3c20;
  --borde-oscuro-fuerte: #665127;
  --texto-oscuro-principal: #fff7df;
  --texto-oscuro-secundario: #d5c49a;
  --texto-oscuro-suave: #ad996c;

  background:
    radial-gradient(
      circle at 6% 0%,
      rgba(120, 86, 21, .24),
      transparent 28%
    ),
    radial-gradient(
      circle at 97% 0%,
      rgba(143, 96, 12, .17),
      transparent 26%
    ),
    linear-gradient(
      180deg,
      #17130b,
      #1a160d 48%,
      #141108
    );
}


.pagina-admin.modo-oscuro .barra-superior,
.pagina-admin.modo-oscuro .panel-acciones,
.pagina-admin.modo-oscuro .panel-recientes,
.pagina-admin.modo-oscuro .tarjeta-estadistica,
.pagina-admin.modo-oscuro .proyecto-movil {
  background:
    rgba(
      34,
      28,
      16,
      .96
    );

  border-color: #4a3c21;

  box-shadow:
    0 7px 22px
    rgba(0, 0, 0, .15);
}


.pagina-admin.modo-oscuro .marca-icono,
.pagina-admin.modo-oscuro .avatar,
.pagina-admin.modo-oscuro .accion-icono,
.pagina-admin.modo-oscuro .icono-recientes,
.pagina-admin.modo-oscuro .mini-carpeta,
.pagina-admin.modo-oscuro .escudo-admin {
  color: #f0bd50;

  background:
    linear-gradient(
      145deg,
      #493716,
      #3c2d12
    );

  border-color: #665025;
}


.pagina-admin.modo-oscuro .marca-texto span,
.pagina-admin.modo-oscuro .eyebrow-admin {
  color: #ddb257;
}


.pagina-admin.modo-oscuro .marca-texto strong,
.pagina-admin.modo-oscuro .saludo-bloque h1,
.pagina-admin.modo-oscuro .panel-acciones h2,
.pagina-admin.modo-oscuro .titulo-recientes h2,
.pagina-admin.modo-oscuro .accion-texto strong,
.pagina-admin.modo-oscuro .proyecto-nombre strong,
.pagina-admin.modo-oscuro .fecha-proyecto,
.pagina-admin.modo-oscuro .proyecto-movil-top strong {
  color: #fff5d8;
}


.pagina-admin.modo-oscuro .saludo-bloque > p,
.pagina-admin.modo-oscuro .titulo-recientes p,
.pagina-admin.modo-oscuro .accion-texto small,
.pagina-admin.modo-oscuro .proyecto-movil p,
.pagina-admin.modo-oscuro .proyecto-movil-top span:not(.estado-pill) {
  color: #c8b88f;
}


.pagina-admin.modo-oscuro .admin-identidad {
  color: #efc66d;

  background: #382b13;

  border-color: #654d20;
}


.pagina-admin.modo-oscuro .usuario-chip {
  background:
    linear-gradient(
      135deg,
      #2a2214,
      #211b10
    );

  border-color: #534326;
}


.pagina-admin.modo-oscuro .usuario-chip:hover,
.pagina-admin.modo-oscuro .usuario-chip.abierto {
  background:
    linear-gradient(
      135deg,
      #342917,
      #292113
    );

  border-color: #785f2d;
}


.pagina-admin.modo-oscuro .usuario-info strong,
.pagina-admin.modo-oscuro .menu-usuario-cabecera strong,
.pagina-admin.modo-oscuro .opcion-modo-texto strong,
.pagina-admin.modo-oscuro .opcion-usuario-texto strong {
  color: #fff4d5;
}


.pagina-admin.modo-oscuro .usuario-info span,
.pagina-admin.modo-oscuro .menu-usuario-cabecera span,
.pagina-admin.modo-oscuro .opcion-modo-texto small,
.pagina-admin.modo-oscuro .opcion-usuario-texto small {
  color: #c4b184;
}


.pagina-admin.modo-oscuro .menu-usuario-desplegable {
  background:
    rgba(
      34,
      28,
      17,
      .99
    );

  border-color: #554426;
}


.pagina-admin.modo-oscuro .opcion-usuario:hover {
  background: #342917;
}


.pagina-admin.modo-oscuro .opcion-usuario-icono {
  color: #efbd55;

  background: #3a2d15;

  border-color: #5d4922;
}


.pagina-admin.modo-oscuro .tabla-contenedor {
  border-color: #493b22;
}


.pagina-admin.modo-oscuro table {
  background: #1d180f;
}


.pagina-admin.modo-oscuro thead {
  background:
    linear-gradient(
      180deg,
      #282113,
      #211b10
    );
}


.pagina-admin.modo-oscuro th {
  color: #dfc98e;

  border-bottom-color: #493b21;
}


.pagina-admin.modo-oscuro td {
  color: #c5b48a;

  border-bottom-color: #332a19;
}


.pagina-admin.modo-oscuro tbody tr:hover {
  background: #2b2314;
}


.pagina-admin.modo-oscuro .cielo-luz {
  fill: #5a451d;
}


.pagina-admin.modo-oscuro .sol-halo {
  fill: #d4a33d;
}


.pagina-admin.modo-oscuro .sol-nucleo {
  fill: #e7b64c;
}


.pagina-admin.modo-oscuro .montana-fondo-1 {
  fill: #3b311d;
}


.pagina-admin.modo-oscuro .montana-fondo-2 {
  fill: #493a1d;
}


.pagina-admin.modo-oscuro .montana-principal-base {
  fill: #79571c;
}


.pagina-admin.modo-oscuro .montana-principal-sombra {
  fill: #5e4214;
}


.pagina-admin.modo-oscuro .montana-media-base {
  fill: #745820;
}


.pagina-admin.modo-oscuro .montana-media-sombra {
  fill: #5a431a;
}


.pagina-admin.modo-oscuro .montana-frente-base {
  fill: #654916;
}


.pagina-admin.modo-oscuro .montana-frente-sombra {
  fill: #4c3711;
}


.pagina-admin.modo-oscuro .nieve-principal,
.pagina-admin.modo-oscuro .nieve-media {
  fill: #bdaa79;
}


.pagina-admin.modo-oscuro .bandera-tela {
  fill: #e0a929;
}


.pagina-admin.modo-oscuro .neblina-forma {
  fill: #44361b;
}


.pagina-admin.modo-oscuro .neblina-forma-2 {
  fill: #382d18;
}


.pagina-admin.modo-oscuro .suelo {
  fill: #3e321b;
}


/* RESPONSIVE */

@media (max-width: 1180px) {

  .acciones-grid-admin {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

}


@media (max-width: 650px) {

  .acciones-grid-admin {
    grid-template-columns:
      1fr;
  }


  .encabezado-panel-admin {
    align-items: flex-start;
  }


  .escudo-admin {
    width: 38px;
    height: 38px;
  }

}




/* ==========================================================
   CONSISTENCIA VISUAL ADMIN
   MISMO LENGUAJE DE PROYECTOSVIEW + PALETA MORADA
========================================================== */

/* ==========================================================
   MODO CLARO
========================================================== */

.pagina-admin {
  background:
    radial-gradient(
      circle at 8% 4%,
      rgba(236, 229, 255, 0.72),
      transparent 24%
    ),
    radial-gradient(
      circle at 92% 2%,
      rgba(245, 240, 255, 0.82),
      transparent 24%
    ),
    linear-gradient(
      180deg,
      #f8f5ff 0%,
      #f4f0fb 48%,
      #efeaf8 100%
    ) !important;
}


.pagina-admin .barra-superior,
.pagina-admin .panel-acciones,
.pagina-admin .panel-recientes,
.pagina-admin .tarjeta-estadistica,
.pagina-admin .proyecto-movil {
  background:
    rgba(
      255,
      255,
      255,
      0.97
    ) !important;

  border:
    1px solid
    #ddd4f1 !important;

  border-radius: 12px !important;

  box-shadow:
    0 4px 17px
    rgba(
      84,
      58,
      140,
      0.05
    ) !important;
}


.pagina-admin .barra-superior {
  box-shadow:
    0 4px 17px
    rgba(
      84,
      58,
      140,
      0.04
    ) !important;
}


/* marca superior */

.pagina-admin .marca-icono {
  background:
    linear-gradient(
      145deg,
      #efe8ff,
      #e2d4ff
    ) !important;

  border:
    1px solid
    #d5c5f4 !important;

  color: #7b39e0 !important;
}


.pagina-admin .marca-texto span {
  color: #7f6aa6 !important;
}


.pagina-admin .marca-texto strong {
  color: #2a1c49 !important;
}


/* usuario */

.pagina-admin .usuario-chip {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fbf9ff
    ) !important;

  border-color: #d8cdf1 !important;
}


.pagina-admin .usuario-chip:hover,
.pagina-admin .usuario-chip.abierto {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f4eeff
    ) !important;

  border-color: #c1adeb !important;

  box-shadow:
    0 8px 18px
    rgba(
      99,
      66,
      164,
      0.10
    ) !important;
}


.pagina-admin .avatar {
  color: #7c3aed !important;

  background:
    linear-gradient(
      145deg,
      #ede5ff,
      #ddceff
    ) !important;

  border-color: #ccb8f2 !important;
}


.pagina-admin .usuario-info strong,
.pagina-admin .menu-usuario-cabecera strong,
.pagina-admin .opcion-modo-texto strong,
.pagina-admin .opcion-usuario-texto strong {
  color: #2e1f4b !important;
}


.pagina-admin .usuario-info span,
.pagina-admin .menu-usuario-cabecera span,
.pagina-admin .opcion-modo-texto small,
.pagina-admin .opcion-usuario-texto small {
  color: #7d6a97 !important;
}


.pagina-admin .usuario-chevron,
.pagina-admin .opcion-flecha {
  color: #8b77a8 !important;
}


.pagina-admin .usuario-chip.abierto .usuario-chevron {
  color: #8850ea !important;
}


.pagina-admin .menu-usuario-desplegable {
  background:
    rgba(
      255,
      255,
      255,
      0.985
    ) !important;

  border-color: #d8ccf1 !important;

  box-shadow:
    0 18px 42px
    rgba(
      66,
      45,
      116,
      0.16
    ) !important;
}


.pagina-admin .menu-usuario-desplegable::before {
  background:
    radial-gradient(
      circle,
      rgba(
        140,
        103,
        212,
        0.12
      ),
      transparent 68%
    ) !important;
}


.pagina-admin .menu-usuario-separador {
  background: #e6ddf7 !important;
}


.pagina-admin .opcion-usuario:hover {
  background: #f5f0ff !important;
}


.pagina-admin .opcion-usuario-icono {
  color: #7f44e2 !important;

  background:
    linear-gradient(
      145deg,
      #eee6ff,
      #dfd0ff
    ) !important;

  border-color: #d0bff4 !important;
}


.pagina-admin .opcion-cerrar-sesion:hover {
  background: #fff1f4 !important;
}


.pagina-admin .opcion-cerrar-sesion .opcion-usuario-icono {
  color: #ef5b71 !important;

  background:
    linear-gradient(
      145deg,
      #fff0f3,
      #ffe2e8
    ) !important;

  border-color: #f4c2cc !important;
}


.pagina-admin .selector-tema {
  background: #e7e0f2 !important;
}


.pagina-admin .selector-tema::before {
  background: #ffffff !important;

  box-shadow:
    0 2px 7px
    rgba(
      75,
      56,
      119,
      0.18
    ) !important;
}


.pagina-admin .tema-sol,
.pagina-admin .tema-luna {
  color: #7a6c92 !important;
}


/* bienvenida */

.pagina-admin .saludo-bloque h1 {
  color: #2b1d49 !important;
}


.pagina-admin .saludo-bloque > p {
  color: #64557f !important;
}


.pagina-admin .admin-identidad {
  color: #6d34c7 !important;

  background:
    linear-gradient(
      135deg,
      #f0e9ff,
      #e6daff
    ) !important;

  border-color: #ccb8f3 !important;
}


.pagina-admin .frase-contenido .fecha {
  color: #766390 !important;
}


.pagina-admin .frase-contenido p {
  color: #67577f !important;
}


.pagina-admin .frase-linea {
  background:
    linear-gradient(
      90deg,
      #8c58ef,
      transparent
    ) !important;
}


.pagina-admin .frase-dia::after {
  background:
    linear-gradient(
      180deg,
      rgba(
        184,
        161,
        235,
        0
      ),
      rgba(
        184,
        161,
        235,
        0.32
      )
    ) !important;
}


/* stats */

.pagina-admin .tarjeta-estadistica:hover {
  transform: translateY(-3px);

  border-color: #cfc0ec !important;

  box-shadow:
    0 10px 26px
    rgba(
      89,
      61,
      150,
      0.10
    ) !important;
}


/* solo la tarjeta "azul" se vuelve morada; las demás
   semánticas se conservan para mantener significado */
.pagina-admin .estadistica-azul {
  --acento: #8a56ef;
  --fondo-icono: #ebe2ff;
  --color-icono: #7a39e0;
}


.pagina-admin .estadistica-amarillo {
  --acento: #eab84b;
  --fondo-icono: #fff2d2;
  --color-icono: #e0a121;
}


.pagina-admin .estadistica-verde {
  --acento: #52c5a2;
  --fondo-icono: #def5ed;
  --color-icono: #0b9e70;
}


.pagina-admin .estadistica-rojo {
  --acento: #e86f7b;
  --fondo-icono: #ffe5e8;
  --color-icono: #ef3f54;
}


.pagina-admin .estadistica-dato strong {
  color: #2a1c49 !important;
}


.pagina-admin .estadistica-dato span {
  color: #5e5180 !important;
}


.pagina-admin .etiqueta-azul {
  background: #ede5ff !important;
  color: #6f35d2 !important;
}


/* acciones rápidas */

.pagina-admin .panel-acciones h2 {
  color: #2b1d49 !important;
}


.pagina-admin .eyebrow-admin {
  color: #7f58c0 !important;
}


.pagina-admin .escudo-admin {
  color: #7a3ee0 !important;

  background:
    linear-gradient(
      145deg,
      #efe8ff,
      #dfd1ff
    ) !important;

  border-color: #d2c0f4 !important;
}


.pagina-admin .accion-card {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #fbf9ff
    ) !important;

  border:
    1px solid
    #ddd4f1 !important;

  border-radius: 10px !important;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease !important;
}


.pagina-admin .accion-card:hover {
  background:
    linear-gradient(
      135deg,
      #ffffff,
      #f4eeff
    ) !important;

  border-color: #c8b7ed !important;

  box-shadow:
    0 7px 18px
    rgba(
      93,
      65,
      160,
      0.08
    ) !important;

  transform:
    translateY(-3px) !important;
}


.pagina-admin .accion-icono,
.pagina-admin .accion-globales .accion-icono,
.pagina-admin .accion-convocatorias .accion-icono {
  background:
    linear-gradient(
      145deg,
      #ede5ff,
      #ddceff
    ) !important;

  border-color: #ccb8f2 !important;

  color: #7d3be3 !important;
}


.pagina-admin .accion-texto strong {
  color: #2e1f4b !important;
}


.pagina-admin .accion-texto small {
  color: #72638e !important;
}


.pagina-admin .accion-flecha {
  color: #946fe0 !important;
}


/* tabla */

.pagina-admin .icono-recientes,
.pagina-admin .mini-carpeta {
  background:
    linear-gradient(
      145deg,
      #ede5ff,
      #ddceff
    ) !important;

  border-color: #ccb8f2 !important;

  color: #7c3aed !important;
}


.pagina-admin .titulo-recientes h2 {
  color: #2b1d49 !important;
}


.pagina-admin .titulo-recientes p {
  color: #65567f !important;
}


.pagina-admin .btn-ver-proyectos,
.pagina-admin .btn-ver {
  color: #ffffff !important;

  background:
    linear-gradient(
      135deg,
      #8e5cf5,
      #7136d8
    ) !important;

  border-color: #733dd5 !important;

  box-shadow:
    0 5px 13px
    rgba(
      113,
      54,
      216,
      0.22
    ) !important;
}


.pagina-admin .btn-ver-proyectos:hover,
.pagina-admin .btn-ver:hover {
  background:
    linear-gradient(
      135deg,
      #9e75f7,
      #7d45df
    ) !important;

  border-color: #8048e1 !important;

  box-shadow:
    0 7px 17px
    rgba(
      113,
      54,
      216,
      0.26
    ) !important;
}


.pagina-admin .tabla-contenedor {
  border-color: #ddd4f1 !important;
}


.pagina-admin thead {
  background:
    linear-gradient(
      180deg,
      #fdfcff,
      #f7f3ff
    ) !important;
}


.pagina-admin th {
  color: #5e4a80 !important;

  border-bottom-color: #dfd4f0 !important;
}


.pagina-admin td {
  color: #63567f !important;

  border-bottom-color: #eee8f8 !important;
}


.pagina-admin tbody tr:hover {
  background: #faf7ff !important;
}


.pagina-admin .proyecto-nombre strong,
.pagina-admin .fecha-proyecto {
  color: #2e1f4b !important;
}


.pagina-admin td small {
  color: #8f80a8 !important;
}


.pagina-admin .proyecto-movil:hover {
  border-color: #cfc0ec !important;

  box-shadow:
    0 10px 24px
    rgba(
      89,
      61,
      150,
      0.09
    ) !important;
}


/* ilustración clara */

.pagina-admin .cielo-luz {
  fill: #efe8ff !important;
}

.pagina-admin .sol-halo {
  fill: #d8c4ff !important;
}

.pagina-admin .sol-nucleo {
  fill: #ae89f2 !important;
}

.pagina-admin .particula {
  fill: #9b69ef !important;
}

.pagina-admin .montana-fondo-1 {
  fill: #e7defb !important;
}

.pagina-admin .montana-fondo-2 {
  fill: #d7c8f3 !important;
}

.pagina-admin .montana-principal-base {
  fill: #8d61df !important;
}

.pagina-admin .montana-principal-sombra {
  fill: #6d46bd !important;
}

.pagina-admin .montana-media-base {
  fill: #a07de8 !important;
}

.pagina-admin .montana-media-sombra {
  fill: #815ece !important;
}

.pagina-admin .montana-frente-base {
  fill: #7a53c9 !important;
}

.pagina-admin .montana-frente-sombra {
  fill: #5f3da9 !important;
}

.pagina-admin .nieve-principal,
.pagina-admin .nieve-media {
  fill: #f9f6ff !important;
}

.pagina-admin .linea-nieve {
  stroke: #d7c8f2 !important;
}

.pagina-admin .camino-cima {
  stroke: #ecdefe !important;
}

.pagina-admin .bandera-poste {
  stroke: #574170 !important;
}

.pagina-admin .bandera-punta {
  fill: #7b43d8 !important;
}

.pagina-admin .bandera-tela {
  fill: #915cf0 !important;
}

.pagina-admin .pino-copa {
  fill: #6a4c9b !important;
}

.pagina-admin .pino-tronco {
  stroke: #574170 !important;
}

.pagina-admin .neblina-forma {
  fill: #e4d8fa !important;
}

.pagina-admin .neblina-forma-2 {
  fill: #d5c8f0 !important;
}

.pagina-admin .suelo {
  fill: #d4c5ee !important;
}


/* ==========================================================
   MODO OSCURO
   Mismo comportamiento visual de ProyectosView
   pero con morados en lugar de azules
========================================================== */

.pagina-admin.modo-oscuro {
  background:
    radial-gradient(
      circle at 12% 0%,
      rgba(88, 60, 145, 0.24),
      transparent 26%
    ),
    radial-gradient(
      circle at 90% 2%,
      rgba(76, 49, 132, 0.24),
      transparent 24%
    ),
    linear-gradient(
      180deg,
      #171327,
      #151223 48%,
      #120f1e
    ) !important;
}


.pagina-admin.modo-oscuro .barra-superior,
.pagina-admin.modo-oscuro .panel-acciones,
.pagina-admin.modo-oscuro .panel-recientes,
.pagina-admin.modo-oscuro .tarjeta-estadistica,
.pagina-admin.modo-oscuro .proyecto-movil {
  background:
    linear-gradient(
      180deg,
      #201a34,
      #1b162e
    ) !important;

  border-color: #3f325e !important;

  box-shadow:
    0 10px 28px
    rgba(
      0,
      0,
      0,
      0.16
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.025
    ) !important;
}


.pagina-admin.modo-oscuro .tarjeta-estadistica:hover {
  border-color: #69509a !important;

  box-shadow:
    0 14px 30px
    rgba(
      0,
      0,
      0,
      0.24
    ) !important;
}


.pagina-admin.modo-oscuro .marca-icono,
.pagina-admin.modo-oscuro .accion-icono,
.pagina-admin.modo-oscuro .icono-recientes {
  background:
    linear-gradient(
      145deg,
      #35284f,
      #2e2345
    ) !important;

  border-color: #544078 !important;

  color: #c39cff !important;
}


.pagina-admin.modo-oscuro .accion-globales .accion-icono {
  background:
    linear-gradient(
      145deg,
      #203a45,
      #1c3340
    ) !important;

  border-color: #345162 !important;

  color: #69c7ed !important;
}


.pagina-admin.modo-oscuro .accion-convocatorias .accion-icono {
  background:
    linear-gradient(
      145deg,
      #33284f,
      #2d2446
    ) !important;

  border-color: #544078 !important;

  color: #c39cff !important;
}


.pagina-admin.modo-oscuro .marca-texto span,
.pagina-admin.modo-oscuro .saludo-bloque > p,
.pagina-admin.modo-oscuro .titulo-recientes p,
.pagina-admin.modo-oscuro .accion-texto small {
  color: #cabede !important;
}


.pagina-admin.modo-oscuro .marca-texto strong,
.pagina-admin.modo-oscuro .saludo-bloque h1,
.pagina-admin.modo-oscuro .panel-acciones h2,
.pagina-admin.modo-oscuro .titulo-recientes h2,
.pagina-admin.modo-oscuro .accion-texto strong,
.pagina-admin.modo-oscuro .estadistica-dato strong,
.pagina-admin.modo-oscuro .usuario-info strong,
.pagina-admin.modo-oscuro .menu-usuario-cabecera strong,
.pagina-admin.modo-oscuro .opcion-modo-texto strong,
.pagina-admin.modo-oscuro .opcion-usuario-texto strong,
.pagina-admin.modo-oscuro .proyecto-nombre strong,
.pagina-admin.modo-oscuro .fecha-proyecto,
.pagina-admin.modo-oscuro th {
  color: #f4efff !important;
}


.pagina-admin.modo-oscuro .selector-tema {
  background: #312746 !important;
}


.pagina-admin.modo-oscuro .selector-tema::before {
  background: #eee7fb !important;

  box-shadow:
    0 2px 8px
    rgba(
      0,
      0,
      0,
      0.28
    ) !important;
}


.pagina-admin.modo-oscuro .tema-sol,
.pagina-admin.modo-oscuro .tema-luna {
  color: #aa9ac5 !important;
}


.pagina-admin.modo-oscuro .usuario-chip {
  background:
    linear-gradient(
      135deg,
      #221b37,
      #1d1730
    ) !important;

  border-color: #4b3b6c !important;
}


.pagina-admin.modo-oscuro .usuario-chip:hover,
.pagina-admin.modo-oscuro .usuario-chip.abierto {
  background:
    linear-gradient(
      135deg,
      #2a2142,
      #221a38
    ) !important;

  border-color: #6a5398 !important;

  box-shadow:
    0 8px 18px
    rgba(
      0,
      0,
      0,
      0.18
    ) !important;
}


.pagina-admin.modo-oscuro .usuario-chevron {
  color: #978bb2 !important;
}


.pagina-admin.modo-oscuro .usuario-chip.abierto .usuario-chevron {
  color: #c7a9ff !important;
}


.pagina-admin.modo-oscuro .menu-usuario-desplegable {
  background:
    rgba(
      25,
      20,
      40,
      0.985
    ) !important;

  border-color: #483964 !important;

  box-shadow:
    0 18px 42px
    rgba(
      0,
      0,
      0,
      0.30
    ) !important;
}


.pagina-admin.modo-oscuro .menu-usuario-desplegable::before {
  background:
    radial-gradient(
      circle,
      rgba(
        118,
        88,
        181,
        0.18
      ),
      transparent 68%
    ) !important;
}


.pagina-admin.modo-oscuro .menu-usuario-cabecera span,
.pagina-admin.modo-oscuro .usuario-info span,
.pagina-admin.modo-oscuro .opcion-modo-texto small,
.pagina-admin.modo-oscuro .opcion-usuario-texto small,
.pagina-admin.modo-oscuro .frase-contenido p,
.pagina-admin.modo-oscuro td,
.pagina-admin.modo-oscuro td small,
.pagina-admin.modo-oscuro .proyecto-movil p,
.pagina-admin.modo-oscuro .proyecto-movil-top span:not(.estado-pill),
.pagina-admin.modo-oscuro .estadistica-dato span {
  color: #cbbfe0 !important;
}


.pagina-admin.modo-oscuro .menu-usuario-separador {
  background: #3c3055 !important;
}


.pagina-admin.modo-oscuro .opcion-usuario:hover {
  background: #261d3c !important;
}


.pagina-admin.modo-oscuro .opcion-usuario-icono {
  color: #c9aaff !important;

  background:
    linear-gradient(
      145deg,
      #382b54,
      #302447
    ) !important;

  border-color: #534074 !important;
}


.pagina-admin.modo-oscuro .opcion-flecha {
  color: #9f92ba !important;
}


.pagina-admin.modo-oscuro .opcion-cerrar-sesion:hover {
  background: #39242d !important;
}


.pagina-admin.modo-oscuro .opcion-cerrar-sesion .opcion-usuario-icono {
  color: #f08b98 !important;

  background:
    linear-gradient(
      145deg,
      #4f2835,
      #432430
    ) !important;

  border-color: #704050 !important;
}


.pagina-admin.modo-oscuro .admin-identidad {
  color: #e7dbff !important;

  background:
    linear-gradient(
      135deg,
      rgba(112, 81, 176, 0.24),
      rgba(96, 67, 156, 0.20)
    ) !important;

  border-color: #6a4f99 !important;
}


.pagina-admin.modo-oscuro .frase-contenido .fecha {
  color: #c5b8da !important;
}


.pagina-admin.modo-oscuro .frase-linea {
  background:
    linear-gradient(
      90deg,
      #a779ff,
      transparent
    ) !important;
}


.pagina-admin.modo-oscuro .frase-dia::after {
  background:
    linear-gradient(
      180deg,
      rgba(116, 85, 179, 0),
      rgba(116, 85, 179, 0.22)
    ) !important;
}


.pagina-admin.modo-oscuro .accion-card {
  background:
    linear-gradient(
      135deg,
      #201a34,
      #1b162e
    ) !important;

  border-color: #3f325e !important;
}


.pagina-admin.modo-oscuro .accion-card:hover {
  background:
    linear-gradient(
      135deg,
      #251e3b,
      #1f1832
    ) !important;

  border-color: #65509a !important;

  box-shadow:
    0 7px 18px
    rgba(
      0,
      0,
      0,
      0.18
    ) !important;
}


.pagina-admin.modo-oscuro .accion-flecha {
  color: #c7a8ff !important;
}


.pagina-admin.modo-oscuro .btn-ver-proyectos,
.pagina-admin.modo-oscuro .btn-ver {
  color: #ffffff !important;

  background:
    linear-gradient(
      135deg,
      #8f61f8,
      #6e35d7
    ) !important;

  border-color: #8048e1 !important;
}


.pagina-admin.modo-oscuro .btn-ver-proyectos:hover,
.pagina-admin.modo-oscuro .btn-ver:hover {
  background:
    linear-gradient(
      135deg,
      #a27af8,
      #8453ea
    ) !important;

  border-color: #8e61ee !important;
}


.pagina-admin.modo-oscuro .tabla-contenedor {
  border-color: #3f325e !important;
}


.pagina-admin.modo-oscuro table {
  background: transparent !important;
}


.pagina-admin.modo-oscuro thead {
  background:
    linear-gradient(
      180deg,
      #261f3a,
      #211a33
    ) !important;
}


.pagina-admin.modo-oscuro th {
  border-bottom-color: #3f325e !important;
}


.pagina-admin.modo-oscuro td {
  border-bottom-color: #302645 !important;
}


.pagina-admin.modo-oscuro tbody tr:hover {
  background: rgba(143, 97, 248, 0.08) !important;
}


/* ilustración oscura */

.pagina-admin.modo-oscuro .cielo-luz {
  fill: #413357 !important;
}

.pagina-admin.modo-oscuro .sol-halo {
  fill: #7f64af !important;
}

.pagina-admin.modo-oscuro .sol-nucleo {
  fill: #b291ef !important;
}

.pagina-admin.modo-oscuro .particula {
  fill: #ccb2ff !important;
}

.pagina-admin.modo-oscuro .montana-fondo-1 {
  fill: #302644 !important;
}

.pagina-admin.modo-oscuro .montana-fondo-2 {
  fill: #3c2f56 !important;
}

.pagina-admin.modo-oscuro .montana-principal-base {
  fill: #614a92 !important;
}

.pagina-admin.modo-oscuro .montana-principal-sombra {
  fill: #49386f !important;
}

.pagina-admin.modo-oscuro .montana-media-base {
  fill: #6b54a0 !important;
}

.pagina-admin.modo-oscuro .montana-media-sombra {
  fill: #533f7e !important;
}

.pagina-admin.modo-oscuro .montana-frente-base {
  fill: #5c458b !important;
}

.pagina-admin.modo-oscuro .montana-frente-sombra {
  fill: #443468 !important;
}

.pagina-admin.modo-oscuro .nieve-principal,
.pagina-admin.modo-oscuro .nieve-media {
  fill: #d8caf4 !important;
}

.pagina-admin.modo-oscuro .linea-nieve {
  stroke: #b9a5db !important;
}

.pagina-admin.modo-oscuro .camino-cima {
  stroke: #cdb9ee !important;
}

.pagina-admin.modo-oscuro .bandera-poste {
  stroke: #a78fd1 !important;
}

.pagina-admin.modo-oscuro .bandera-punta {
  fill: #c1a1ff !important;
}

.pagina-admin.modo-oscuro .bandera-tela {
  fill: #955ff3 !important;
}

.pagina-admin.modo-oscuro .pino-copa {
  fill: #4f3c71 !important;
}

.pagina-admin.modo-oscuro .pino-tronco {
  stroke: #806aa9 !important;
}

.pagina-admin.modo-oscuro .neblina-forma {
  fill: #392c52 !important;
  opacity: 0.58 !important;
}

.pagina-admin.modo-oscuro .neblina-forma-2 {
  fill: #2f2446 !important;
  opacity: 0.53 !important;
}

.pagina-admin.modo-oscuro .suelo {
  fill: #34284d !important;
  opacity: 0.9 !important;
}




/* ==========================================================
   AJUSTE DE CINTA ADMINISTRATIVA
   Solo tres acciones visibles
========================================================== */

.acciones-grid-admin {
  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    ) !important;
}


@media (max-width: 1180px) {
  .acciones-grid-admin {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      ) !important;
  }
}


@media (max-width: 650px) {
  .acciones-grid-admin {
    grid-template-columns:
      1fr !important;
    }
}

</style>
