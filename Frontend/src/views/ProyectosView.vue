<template>
  <div class="pagina-proyectos" :class="{ 'modo-oscuro': modoOscuro }">
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
            <span>PANEL PRINCIPAL</span>
            <strong>Gestión de proyectos</strong>
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
          <p>Consulta el panorama general de proyectos y accede rápidamente a los que administras o en los que participas.</p>
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
            <span>Mis proyectos</span>
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

      <!-- ACCESOS RÁPIDOS -->
      <section class="panel-acciones">
        <h2>¿Qué deseas hacer?</h2>

        <div class="acciones-grid">
          <button type="button" class="accion-card accion-mis-proyectos" @click="irAMisProyectos">
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </span>
            <span class="accion-texto">
              <strong>Mis proyectos</strong>
              <small>Consulta y administra los proyectos en los que eres responsable.</small>
            </span>
            <span class="accion-flecha">→</span>
          </button>

          <button type="button" class="accion-card accion-globales" @click="irAProyectosGlobales">
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7" />
                <path d="M3.8 12h16.4M12 3.5c2.4 2.3 3.7 5.1 3.7 8.5S14.4 18.2 12 20.5M12 3.5C9.6 5.8 8.3 8.6 8.3 12s1.3 6.2 3.7 8.5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </span>
            <span class="accion-texto">
              <strong>Proyectos en los que participo</strong>
              <small>Consulta en modo solo lectura los proyectos donde participas como responsable, colaborador o recurso humano.</small>
            </span>
            <span class="accion-flecha">→</span>
          </button>

          <button type="button" class="accion-card accion-convocatorias" @click="irAConvocatorias">
            <span class="accion-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m4 10.5 10-4.2v11.4L4 13.5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                <path d="M14 9.2h2.2a3 3 0 0 1 0 6H14M6.2 14.4l1.2 4.1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
            </span>
            <span class="accion-texto">
              <strong>Buscar nuevas convocatorias</strong>
              <small>Encuentra oportunidades y fuentes de financiamiento disponibles en Internet.</small>
            </span>
            <span class="accion-flecha">→</span>
          </button>
        </div>
      </section>

      <!-- PROYECTOS RECIENTES -->
      <section class="panel-recientes">
        <div class="encabezado-recientes">
          <div class="titulo-recientes">
            <span class="icono-recientes">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                <path d="M3.5 8.5h17" fill="none" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </span>
            <div>
              <h2>Proyectos recientes</h2>
              <p>Un vistazo rápido a los proyectos que administras y se actualizaron recientemente.</p>
            </div>
          </div>

          <button type="button" class="btn-ver-proyectos" @click="irAMisProyectos">
            Ver mis proyectos
            <span>→</span>
          </button>
        </div>

        <div class="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Responsable</th>
                <th>Convocatoria</th>
                <th>Estado</th>
                <th>Actualización</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="cargandoProyectos">
                <td colspan="6" class="mensaje-tabla">Cargando proyectos...</td>
              </tr>

              <tr v-else-if="errorProyectos">
                <td colspan="6" class="mensaje-tabla mensaje-error">{{ errorProyectos }}</td>
              </tr>

              <tr v-else-if="proyectosMostrados.length === 0">
                <td colspan="6" class="mensaje-tabla">No tienes proyectos registrados.</td>
              </tr>

              <template v-else>
                <tr v-for="proyecto in proyectosMostrados" :key="proyecto._id">
                <td>
                  <div class="proyecto-nombre">
                    <span class="mini-carpeta">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <strong>{{ proyecto.nombre_proyecto }}</strong>
                  </div>
                </td>
                <td>{{ proyecto.responsable }}</td>
                <td>{{ proyecto.convocatoria.nombre }}</td>
                <td>
                  <span class="estado-pill" :class="claseEstado(proyecto.estado.nombre)">
                    {{ proyecto.estado.nombre }}
                  </span>
                </td>
                <td>
                  <span class="fecha-proyecto">{{ formatearFecha(proyecto.fecha_actualizacion) }}</span>
                  <small v-if="formatearHora(proyecto.fecha_actualizacion)">{{ formatearHora(proyecto.fecha_actualizacion) }}</small>
                </td>
                <td>
                  <button type="button" class="btn-ver" @click="verProyecto(proyecto._id)">Ver</button>
                </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="tarjetas-movil">
          <div v-if="cargandoProyectos" class="mensaje-movil">Cargando proyectos...</div>
          <div v-else-if="errorProyectos" class="mensaje-movil mensaje-error">{{ errorProyectos }}</div>
          <div v-else-if="proyectosMostrados.length === 0" class="mensaje-movil">No tienes proyectos registrados.</div>

          <template v-else>
            <article v-for="proyecto in proyectosMostrados" :key="`movil-${proyecto._id}`" class="proyecto-movil">
            <div class="proyecto-movil-top">
              <div>
                <strong>{{ proyecto.nombre_proyecto }}</strong>
                <span>{{ proyecto.responsable }}</span>
              </div>
              <span class="estado-pill" :class="claseEstado(proyecto.estado.nombre)">{{ proyecto.estado.nombre }}</span>
            </div>
            <p><b>Convocatoria:</b> {{ proyecto.convocatoria.nombre }}</p>
            <p><b>Actualización:</b> {{ formatearFecha(proyecto.fecha_actualizacion) }}</p>
            <button type="button" class="btn-ver movil" @click="verProyecto(proyecto._id)">Ver proyecto</button>
            </article>
          </template>
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
const rolUsuario = ref('Investigador')
const ahora = ref(new Date())
const proyectos = ref([])
const cargandoProyectos = ref(false)
const errorProyectos = ref('')

const menuUsuarioAbierto =
  ref(false)



// ========================================
// FRASES MOTIVACIONALES
// ========================================

const frasesMotivacionales = [

  'Grandes proyectos comienzan\ncon grandes oportunidades',

  'Toda gran idea comienza\ncon un primer paso',

  'Cada proyecto es una oportunidad\npara crear algo nuevo',

  'Las mejores oportunidades nacen\nde una buena idea',

  'Una buena planificación convierte\nideas en resultados',

  'Los grandes resultados comienzan\ncon pequeñas decisiones',

  'Transforma tus ideas en proyectos\nque generen impacto',

  'El mejor momento para comenzar\nun proyecto es ahora',

  'Una idea bien construida puede\nconvertirse en un gran proyecto',

  'Cada nuevo proyecto abre la puerta\na nuevas posibilidades'

]


const indiceFrase =
  ref(
    Math.floor(
      Math.random() *
      frasesMotivacionales.length
    )
  )


const fraseActual =
  computed(
    () =>
      frasesMotivacionales[
        indiceFrase.value
      ]
  )


const cambiarFrase = () => {

  indiceFrase.value =
    (
      indiceFrase.value +
      1
    ) %
    frasesMotivacionales.length

}



let temporizadorReloj = null

let temporizadorFrase = null

const inicialesUsuario = computed(() => {
  const partes = nombreUsuario.value.trim().split(/\s+/).filter(Boolean)

  if (!partes.length) return 'U'

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase()
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase()
})

const cargarUsuarioSesion = () => {
  try {
    const usuarioGuardado =
      sessionStorage.getItem('usuario-plataforma')

    if (!usuarioGuardado) return

    const usuario = JSON.parse(usuarioGuardado)

    const nombre =
      usuario?.nombre ||
      usuario?.nombre_completo ||
      usuario?.nombre_usuario ||
      usuario?.usuario ||
      usuario?.correo?.split('@')[0] ||
      ''

    const rol =
      typeof usuario?.rol === 'string'
        ? usuario.rol
        : usuario?.rol?.nombre ||
          usuario?.nombre_rol ||
          usuario?.tipo_usuario ||
          ''

    if (String(nombre).trim()) {
      nombreUsuario.value = String(nombre).trim()
    }

    if (String(rol).trim()) {
      rolUsuario.value = String(rol).trim()
    }
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
  const fecha = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(ahora.value)

  return fecha.charAt(0).toUpperCase() + fecha.slice(1)
})

const cargarProyectos = async () => {
  cargandoProyectos.value = true
  errorProyectos.value = ''

  try {
    const respuesta = await apiFetch('/proyectos/mios')

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
          : proyecto.convocatoria || proyecto.convocatoria_nombre || 'Sin convocatoria'
      },
      estado: {
        nombre: typeof proyecto.estado === 'object' && proyecto.estado !== null
          ? proyecto.estado.nombre || 'Sin estado'
          : proyecto.estado || proyecto.estado_nombre || 'Sin estado'
      },
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

const totalProyectos = computed(() => proyectos.value.length)

const totalEnProceso = computed(() => {
  const estadosProceso = new Set([
    'En captura',
    'Sometido',
    'Con registro',
    'Financiado',
    'Informe pendiente',
    'Informe en deuda'
  ])

  return proyectos.value.filter(proyecto => estadosProceso.has(proyecto.estado.nombre)).length
})

const totalLiberados = computed(() =>
  proyectos.value.filter(proyecto => proyecto.estado.nombre === 'Liberado').length
)

const totalRechazados = computed(() =>
  proyectos.value.filter(proyecto => proyecto.estado.nombre === 'Rechazado').length
)

const valorFecha = fecha => {
  if (!fecha) return 0

  const texto = String(fecha).trim()
  const normalizada = texto.includes(' ') && !texto.includes('T')
    ? texto.replace(' ', 'T')
    : texto

  const fechaConvertida = new Date(normalizada)
  if (!Number.isNaN(fechaConvertida.getTime())) return fechaConvertida.getTime()

  const coincidencia = texto.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!coincidencia) return 0

  return new Date(
    Number(coincidencia[1]),
    Number(coincidencia[2]) - 1,
    Number(coincidencia[3])
  ).getTime()
}

const proyectosOrdenados = computed(() =>
  [...proyectos.value].sort(
    (a, b) => valorFecha(b.fecha_actualizacion) - valorFecha(a.fecha_actualizacion)
  )
)

const proyectosMostrados = computed(() =>
  proyectosOrdenados.value.slice(0, 5)
)

const formatearFecha = fecha => {
  if (!fecha) return 'Sin fecha'
  const texto = String(fecha).trim()
  const coincidencia = texto.match(/^(\d{4})-(\d{2})-(\d{2})/)

  let fechaConvertida

  if (coincidencia) {
    fechaConvertida = new Date(
      Number(coincidencia[1]),
      Number(coincidencia[2]) - 1,
      Number(coincidencia[3])
    )
  } else {
    fechaConvertida = new Date(fecha)
  }

  if (Number.isNaN(fechaConvertida.getTime())) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(fechaConvertida)
}

const formatearHora = fecha => {
  if (!fecha) return ''
  const texto = String(fecha).trim()
  if (!/[T\s]\d{2}:\d{2}/.test(texto)) return ''

  const normalizada = texto.includes(' ') && !texto.includes('T')
    ? texto.replace(' ', 'T')
    : texto

  const fechaConvertida = new Date(normalizada)
  if (Number.isNaN(fechaConvertida.getTime())) return ''

  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(fechaConvertida)
}

const claseEstado = estado => {
  switch (estado) {
    case 'En captura': return 'estado-captura'
    case 'Sometido': return 'estado-sometido'
    case 'Con registro': return 'estado-registro'
    case 'Financiado': return 'estado-financiado'
    case 'Rechazado': return 'estado-rechazado'
    case 'Informe pendiente': return 'estado-informe-pendiente'
    case 'Informe en deuda': return 'estado-informe-deuda'
    case 'Liberado': return 'estado-liberado'
    default: return 'estado-default'
  }
}

// ========================================
// MENÚ DE USUARIO
// ========================================

const alternarMenuUsuario = () => {

  menuUsuarioAbierto.value =
    !menuUsuarioAbierto.value

}


const cerrarMenuUsuario = () => {

  menuUsuarioAbierto.value =
    false

}


const manejarTeclaUsuario = evento => {

  if (
    evento.key === 'Escape'
  ) {

    cerrarMenuUsuario()

  }

}


const irAAjustesUsuario = () => {

  cerrarMenuUsuario()

  router.push({
    name: 'usuario-ajustes'
  })

}


const cerrarSesion = async () => {

  cerrarMenuUsuario()


  try {

    await apiFetch(
      '/logout',
      {
        method: 'POST'
      }
    )

  } catch (error) {

    console.warn(
      'No fue posible notificar el cierre de sesión al servidor:',
      error
    )

  }


  sessionStorage.removeItem(
    'usuario-plataforma'
  )

  localStorage.removeItem(
    'usuario-plataforma'
  )

  router.replace({
    name: 'login'
  })

}



const verProyecto = id => {
  router.push({ name: 'proyecto-detalle', params: { id } })
}

const irAMisProyectos = () => {
  router.push('/mis-proyectos')
}

const irAProyectosGlobales = () => {
  router.push('/proyectos-globales')
}

const irAConvocatorias = () => {
  router.push('/convocatorias')
}

onMounted(() => {

  cargarUsuarioSesion()

  cargarProyectos()


  document.addEventListener(
    'click',
    cerrarMenuUsuario
  )

  document.addEventListener(
    'keydown',
    manejarTeclaUsuario
  )


  temporizadorReloj =
    setInterval(
      () => {

        ahora.value =
          new Date()

      },
      60000
    )


  temporizadorFrase =
    setInterval(
      cambiarFrase,
      8000
    )

})


onUnmounted(() => {

  document.removeEventListener(
    'click',
    cerrarMenuUsuario
  )

  document.removeEventListener(
    'keydown',
    manejarTeclaUsuario
  )


  if (
    temporizadorReloj
  ) {

    clearInterval(
      temporizadorReloj
    )

  }


  if (
    temporizadorFrase
  ) {

    clearInterval(
      temporizadorFrase
    )

  }

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

</style>
