<template>
  <div
    class="pagina"
    :class="{ 'modo-oscuro': modoOscuro, 'pagina-admin': esEdicionAdministrativa }"
  >
    <div class="contenido">

      <!-- REGRESAR / CABECERA -->
      <header class="cabecera-pagina">
        <div class="cabecera-principal">
          <button type="button" class="btn-regresar" :disabled="guardando || eliminando" @click="intentarSalir">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Regresar
          </button>
          <p class="subtitulo">Edición del proyecto</p>
          <div class="titulo-proyecto-linea">
            <h1>{{ proyecto.nombre || 'Proyecto' }}</h1>
            <span class="estado estado-cabecera" :class="claseEstado(proyecto.estado)">
              <span class="punto-estado"></span>
              {{ proyecto.estado }}
            </span>
          </div>
          <p class="descripcion">Administra y actualiza la información del proyecto.</p>
          <div v-if="!cargando && !errorCarga" class="indicador-cambios" :class="{ activo: hayCambios }">
            <span class="indicador-cambios-punto"></span>
            {{ hayCambios ? 'Hay cambios pendientes por guardar' : 'Toda la información está guardada' }}
          </div>
        </div>

        <!-- RESUMEN SUPERIOR -->
        <div v-if="!cargando && !errorCarga" class="resumen-superior">
          <div class="resumen-icono-principal">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
              <path d="M14 3.5V8h4M9 12h6M9 15.5h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </div>
          <div class="resumen-bloque resumen-estado">
            <span class="resumen-etiqueta">Estado actual</span>
            <span class="estado" :class="claseEstado(proyecto.estado)">
              <span class="punto-estado"></span>
              {{ proyecto.estado }}
            </span>
            <small>Última actualización: {{ formatearFecha(fechaActualizacion) }}</small>
          </div>
          <span class="separador-resumen"></span>
          <div class="resumen-bloque">
            <div class="resumen-dato-linea">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="5.5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7" />
                <path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
              <div>
                <span class="resumen-etiqueta">Periodo</span>
                <strong>{{ proyecto.periodo || 'Sin periodo' }}</strong>
              </div>
            </div>
          </div>
          <span class="separador-resumen"></span>
          <div class="resumen-bloque">
            <div class="resumen-dato-linea">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7" />
                <circle cx="16.5" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7" />
                <path d="M3.8 18c.5-3.4 2.3-5.2 5.2-5.2s4.8 1.8 5.3 5.2M14 13.5c2.8.2 4.6 1.7 5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
              <div>
                <span class="resumen-etiqueta">Colaboradores</span>
                <strong>{{ totalColaboradoresTexto }}</strong>
              </div>
            </div>
          </div>
          <div class="resumen-montanas" aria-hidden="true">
            <svg viewBox="0 0 250 116" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="fondoEdicion" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#eef6ff" />
                  <stop offset="100%" stop-color="#d8eaff" />
                </linearGradient>
                <linearGradient id="hojaEdicion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#f7fbff" />
                </linearGradient>
                <linearGradient id="lapizEdicion" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#3e8cf5" />
                  <stop offset="100%" stop-color="#1769df" />
                </linearGradient>
              </defs>
              <ellipse class="edicion-halo" cx="150" cy="69" rx="94" ry="48" fill="url(#fondoEdicion)" opacity=".78" />
              <circle class="edicion-orbita" cx="196" cy="42" r="32" fill="none" stroke="#a9c9f3" stroke-width="1" stroke-dasharray="3 4" opacity=".55" />
              <circle class="edicion-orbita" cx="196" cy="42" r="22" fill="none" stroke="#b9d5f6" stroke-width="1" opacity=".45" />
              <g class="edicion-documento-atras" transform="translate(65 20) rotate(-8 50 42)">
                <rect x="0" y="0" width="104" height="82" rx="10" fill="#c6ddfb" stroke="#9ec2f3" stroke-width="1" />
                <rect x="14" y="18" width="62" height="7" rx="3.5" fill="#eaf3ff" />
                <rect x="14" y="34" width="74" height="6" rx="3" fill="#dfedff" />
                <rect x="14" y="49" width="55" height="6" rx="3" fill="#e3efff" />
              </g>
              <g class="edicion-documento" transform="translate(103 12) rotate(5 52 44)">
                <rect x="0" y="0" width="108" height="88" rx="11" fill="url(#hojaEdicion)" stroke="#bdd5f4" stroke-width="1.2" />
                <circle cx="87" cy="20" r="10" fill="#e2f4ec" stroke="#c7e8da" stroke-width="1" />
                <path d="m82 20 3 3 6-7" fill="none" stroke="#16956a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="17" y="21" width="51" height="7" rx="3.5" fill="#dceafb" />
                <rect x="17" y="39" width="73" height="6" rx="3" fill="#d7e6f9" />
                <rect x="17" y="55" width="58" height="6" rx="3" fill="#deebfa" />
              </g>
              <g class="edicion-lapiz" transform="translate(169 70) rotate(-34 34 8)">
                <rect x="0" y="1" width="62" height="13" rx="6.5" fill="url(#lapizEdicion)" />
                <path d="M62 1 77 7.5 62 14Z" fill="#f0c98d" />
                <path d="M73 5.8 78 7.5 73 9.2Z" fill="#365d8e" />
                <rect x="4" y="3" width="8" height="9" rx="3" fill="#76adf5" opacity=".85" />
              </g>
              <circle class="edicion-destello" cx="54" cy="35" r="4" fill="#77a9e9" opacity=".58" />
              <circle class="edicion-destello" cx="44" cy="51" r="2.4" fill="#9ec2ef" opacity=".55" />
              <circle class="edicion-destello" cx="228" cy="28" r="3" fill="#8db9ef" opacity=".50" />
            </svg>
          </div>
        </div>
      </header>

      <!-- ESTADOS DE CARGA/ERROR -->
      <div v-if="cargando" class="estado-pagina estado-pagina-carga">
        <div class="spinner"></div>
        <strong>Cargando proyecto...</strong>
        <span>Estamos preparando la información para editarla.</span>
      </div>

      <div v-else-if="errorCarga" class="estado-pagina estado-pagina-error">
        <div class="estado-pagina-icono">!</div>
        <strong>No fue posible cargar el proyecto.</strong>
        <span>{{ errorCarga }}</span>
        <button type="button" class="btn-volver-error" @click="volverAProyectos">Volver a proyectos</button>
      </div>

      <template v-else>
        <div v-if="mensaje" class="mensaje" :class="mensaje.tipo">
          <div class="mensaje-icono">{{ mensaje.tipo === 'error' ? '!' : 'i' }}</div>
          <span>{{ mensaje.texto }}</span>
        </div>

        <!-- DATOS GENERALES -->
        <section class="tarjeta tarjeta-destacada">
          <div class="encabezado-seccion">
            <div class="titulo-con-icono">
              <div class="icono-seccion">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                  <path d="M14 3.5V8h4M9 12h6M9 15.5h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </div>
              <div>
                <h2>Datos generales</h2>
                <p>Información básica del proyecto.</p>
              </div>
            </div>
          </div>
          <div class="datos-generales">
            <div class="campo">
              <label for="nombre-proyecto">Nombre del proyecto</label>
              <div class="control-con-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3.5V8h4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
                <input id="nombre-proyecto" v-model="proyecto.nombre" type="text" />
              </div>
            </div>
            <div class="campo">
              <label for="responsable">Responsable</label>
              <div class="control-con-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                <input id="responsable" v-model="proyecto.responsable" type="text" :readonly="!esEdicionAdministrativa" :title="esEdicionAdministrativa ? 'La administración puede transferir la responsabilidad.' : 'Solo la administración puede transferir la responsabilidad del proyecto.'" />
              </div>
            </div>
            <div class="campo">
              <label for="convocatoria">Convocatoria</label>
              <div class="control-con-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11v2a2 2 0 0 0 2 2h2l1.5 5h2L10 15h1l7 3V6l-7 3H6a2 2 0 0 0-2 2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M20 9v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                <input id="convocatoria" v-model="proyecto.convocatoria" type="text" />
              </div>
            </div>
            <div class="campo">
              <label for="periodo">Periodo</label>
              <div class="control-con-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                <input id="periodo" v-model="proyecto.periodo" type="text" placeholder="Ej. Agosto 2026 - Julio 2027" />
              </div>
            </div>
            <div class="campo">
              <label for="estado">Estado</label>
              <select id="estado" v-model="proyecto.estado">
                <option>En captura</option>
                <option>Sometido</option>
                <option>Con registro</option>
                <option>Financiado</option>
                <option>Rechazado</option>
                <option>Informe pendiente</option>
                <option>Informe en deuda</option>
                <option>Liberado</option>
              </select>
              <div class="estado-visual">
                <span class="estado" :class="claseEstado(proyecto.estado)">
                  <span class="punto-estado"></span>
                  {{ proyecto.estado }}
                </span>
              </div>
            </div>
          </div>
          <div class="decoracion-datos" aria-hidden="true">
            <span class="onda onda-1"></span><span class="onda onda-2"></span><span class="onda onda-3"></span>
          </div>
        </section>

        <!-- COLABORADORES -->
        <section class="tarjeta">
          <div class="titulo-seccion">
            <div class="titulo-con-icono">
              <div class="icono-seccion">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <circle cx="16.5" cy="9" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <path d="M3.8 18c.5-3.4 2.3-5.2 5.2-5.2s4.8 1.8 5.3 5.2M14 13.5c2.8.2 4.6 1.7 5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </div>
              <div>
                <h2>Colaboradores</h2>
                <p>Personas que participan en el proyecto.</p>
              </div>
            </div>
            <button type="button" class="btn-agregar" :disabled="guardando || eliminando" @click="agregarColaborador">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg>
              Agregar colaborador
            </button>
          </div>
          <div v-if="proyecto.colaboradores.length === 0" class="vacio vacio-colaboradores">
            <div class="vacio-icono">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            </div>
            <strong>No hay colaboradores registrados.</strong>
            <span>Puedes agregar personas que participen en el proyecto.</span>
          </div>
          <div v-else class="lista-colaboradores">
            <div v-for="(colaborador, index) in proyecto.colaboradores" :key="index" class="fila-colaborador">
              <div class="avatar-colaborador">{{ obtenerIniciales(colaborador) }}</div>
              <input v-model="proyecto.colaboradores[index]" type="text" placeholder="Nombre completo o correo" />
              <button type="button" class="btn-eliminar" :disabled="guardando || eliminando" @click="eliminarColaborador(index)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8v10M12 8v10M16 8v10M5 6h14M9 6V4h6v2M7 6l1 14h8l1-14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Eliminar
              </button>
            </div>
          </div>
        </section>

        <!-- RECURSOS HUMANOS -->
        <section class="tarjeta">
          <div class="titulo-seccion">
            <div class="titulo-con-icono">
              <div class="icono-seccion">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 9l9-5 9 5-9 5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                  <path d="M7 12v4.5c2.7 2 7.3 2 10 0V12M20 10v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <h2>Recursos humanos</h2>
                <p>Actividades de formación y participación relacionadas con el proyecto.</p>
              </div>
            </div>
            <button type="button" class="btn-agregar" :disabled="guardando || eliminando" @click="agregarRecurso">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg>
              Agregar recurso
            </button>
          </div>
          <div class="tabla-contenedor tabla-recursos-escritorio">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th><th>Nombre</th><th>Nombre de la actividad</th><th>Periodo</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(recurso, index) in recursosHumanos" :key="recurso.id">
                  <td><input v-model="recurso.tipo" type="text" placeholder="Tipo" /></td>
                  <td><input v-model="recurso.nombre" type="text" placeholder="Nombre completo o correo" /></td>
                  <td><input v-model="recurso.actividad" type="text" placeholder="Nombre de la actividad" /></td>
                  <td><input v-model="recurso.periodo" type="text" placeholder="Periodo" /></td>
                  <td><button type="button" class="btn-eliminar btn-eliminar-tabla" :disabled="guardando || eliminando" @click="eliminarRecurso(index)">Eliminar</button></td>
                </tr>
                <tr v-if="recursosHumanos.length === 0">
                  <td colspan="5" class="vacio-tabla"><div class="vacio-tabla-contenido"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>No hay recursos humanos registrados.</div></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="recursos-movil">
            <article v-for="(recurso, index) in recursosHumanos" :key="`recurso-movil-${recurso.id}`" class="tarjeta-movil">
              <div class="encabezado-tarjeta-movil">
                <h3>Recurso humano {{ index + 1 }}</h3>
                <button type="button" class="btn-eliminar btn-eliminar-movil" :disabled="guardando || eliminando" @click="eliminarRecurso(index)">Eliminar</button>
              </div>
              <div class="campos-movil">
                <div class="campo"><label>Tipo</label><input v-model="recurso.tipo" type="text" placeholder="Tipo" /></div>
                <div class="campo"><label>Nombre</label><input v-model="recurso.nombre" type="text" placeholder="Nombre completo o correo" /></div>
                <div class="campo"><label>Nombre de la actividad</label><input v-model="recurso.actividad" type="text" placeholder="Nombre de la actividad" /></div>
                <div class="campo"><label>Periodo</label><input v-model="recurso.periodo" type="text" placeholder="Periodo" /></div>
              </div>
            </article>
            <div v-if="recursosHumanos.length === 0" class="vacio-movil">No hay recursos humanos registrados.</div>
          </div>
        </section>

        <!-- PRODUCTOS ACADÉMICOS -->
        <section class="tarjeta">
          <div class="titulo-seccion">
            <div class="titulo-con-icono">
              <div class="icono-seccion">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                  <path d="M14 3.5V8h4M9 12h6M9 15.5h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
                </svg>
              </div>
              <div>
                <h2>Productos académicos</h2>
                <p>Productos académicos relacionados con el proyecto.</p>
              </div>
            </div>
            <button type="button" class="btn-agregar" :disabled="guardando || eliminando" @click="agregarProducto">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg>Agregar producto
            </button>
          </div>
          <div class="tabla-contenedor tabla-productos-escritorio">
            <table class="tabla-productos">
              <thead>
                <tr>
                  <th>Tipo</th><th>Nombre del producto</th><th>Dónde</th><th>Fecha de envío</th><th>Fecha de publicación</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(producto, index) in productosAcademicos" :key="producto.id">
                  <td><input v-model="producto.tipo" type="text" placeholder="Tipo" /></td>
                  <td><input v-model="producto.nombre" type="text" placeholder="Nombre del producto" /></td>
                  <td><input v-model="producto.donde" type="text" placeholder="Dónde" /></td>
                  <td><input v-model="producto.fechaEnvio" type="date" /></td>
                  <td><input v-model="producto.fechaPublicacion" type="date" /></td>
                  <td>
                    <select v-model="producto.estado">
                      <option>En preparación</option><option>Enviado</option><option>En revisión</option><option>Aceptado</option><option>Publicado</option><option>Rechazado</option>
                    </select>
                  </td>
                  <td><button type="button" class="btn-eliminar btn-eliminar-tabla" :disabled="guardando || eliminando" @click="eliminarProducto(index)">Eliminar</button></td>
                </tr>
                <tr v-if="productosAcademicos.length === 0">
                  <td colspan="7" class="vacio-tabla"><div class="vacio-tabla-contenido"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>No hay productos académicos registrados.</div></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="productos-movil">
            <article v-for="(producto, index) in productosAcademicos" :key="`producto-movil-${producto.id}`" class="tarjeta-movil">
              <div class="encabezado-tarjeta-movil">
                <h3>Producto académico {{ index + 1 }}</h3>
                <button type="button" class="btn-eliminar btn-eliminar-movil" :disabled="guardando || eliminando" @click="eliminarProducto(index)">Eliminar</button>
              </div>
              <div class="campos-movil">
                <div class="campo"><label>Tipo</label><input v-model="producto.tipo" type="text" placeholder="Tipo" /></div>
                <div class="campo"><label>Nombre del producto</label><input v-model="producto.nombre" type="text" placeholder="Nombre del producto" /></div>
                <div class="campo"><label>Dónde</label><input v-model="producto.donde" type="text" placeholder="Dónde" /></div>
                <div class="campo"><label>Fecha de envío</label><input v-model="producto.fechaEnvio" type="date" /></div>
                <div class="campo"><label>Fecha de publicación</label><input v-model="producto.fechaPublicacion" type="date" /></div>
                <div class="campo">
                  <label>Estado</label>
                  <select v-model="producto.estado"><option>En preparación</option><option>Enviado</option><option>En revisión</option><option>Aceptado</option><option>Publicado</option><option>Rechazado</option></select>
                </div>
              </div>
            </article>
            <div v-if="productosAcademicos.length === 0" class="vacio-movil">No hay productos académicos registrados.</div>
          </div>
        </section>

        <div class="acciones-finales">
          <div class="acciones-finales-info">
            <strong>{{ hayCambios ? 'Cambios pendientes' : 'Sin cambios pendientes' }}</strong>
            <span>{{ hayCambios ? 'Guarda para aplicar las modificaciones realizadas.' : 'La información coincide con la última versión guardada.' }}</span>
          </div>
          <div class="acciones-finales-botones">
            <button type="button" class="btn-cancelar" :disabled="guardando || eliminando" @click="intentarSalir">Cancelar</button>
            <button type="button" class="btn-guardar" :class="{ 'sin-cambios': !hayCambios }" :disabled="guardando || eliminando" @click="confirmarGuardado">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4 4L19 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </div>

        <!-- ZONA DE PELIGRO -->
        <section class="zona-peligro">
          <div class="zona-peligro-icono">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8v10M12 8v10M16 8v10M5 6h14M9 6V4h6v2M7 6l1 14h8l1-14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <div class="zona-peligro-informacion">
            <p class="zona-peligro-etiqueta">Zona de peligro</p>
            <h2>Eliminar proyecto</h2>
            <p>Esta acción eliminará permanentemente el proyecto y la información asociada. Una vez eliminado, no podrá recuperarse.</p>
          </div>
          <button type="button" class="btn-eliminar-proyecto" :disabled="guardando || eliminando" @click="confirmarEliminacion">Eliminar proyecto</button>
        </section>

        <!-- MODAL DE CONFIRMACIÓN -->
        <div v-if="modal.visible" class="modal-fondo" @click.self="cerrarModal">
          <div class="modal" role="dialog" aria-modal="true">
            <div class="modal-icono" :class="`modal-icono-${modal.tipo}`">
              <svg v-if="modal.tipo === 'salir'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 9v5M12 17.2v.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
              <svg v-else-if="modal.tipo === 'guardar' || modal.tipo === 'exito'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 12l2.3 2.3 4.9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <svg v-else-if="modal.tipo === 'eliminar' || modal.tipo === 'eliminado'" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8v10M12 8v10M16 8v10M5 6h14M9 6V4h6v2M7 6l1 14h8l1-14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5v6M12 16.5v.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
            </div>
            <h3>{{ modal.titulo }}</h3>
            <p>{{ modal.mensaje }}</p>

            <div v-if="modal.tipo === 'salir'" class="modal-acciones">
              <button type="button" class="btn-modal-secundario" @click="cerrarModal">No, continuar</button>
              <button type="button" class="btn-modal-peligro" @click="salirSinGuardar">Sí, salir</button>
            </div>
            <div v-if="modal.tipo === 'guardar'" class="modal-acciones">
              <button type="button" class="btn-modal-secundario" :disabled="guardando" @click="cerrarModal">Cancelar</button>
              <button type="button" class="btn-modal-guardar" :disabled="guardando" @click="guardarConfirmado">{{ guardando ? 'Guardando...' : 'Sí, guardar cambios' }}</button>
            </div>
            <div v-if="modal.tipo === 'exito'" class="modal-acciones">
              <button type="button" class="btn-modal-guardar" @click="finalizarGuardado">Aceptar</button>
            </div>
            <div v-if="modal.tipo === 'error'" class="modal-acciones">
              <button type="button" class="btn-modal-secundario" @click="cerrarModal">Aceptar</button>
            </div>
            <div v-if="modal.tipo === 'eliminar'" class="confirmacion-eliminacion">
              <div class="proyecto-a-eliminar">
                <span>Proyecto que será eliminado</span>
                <strong>{{ proyecto.nombre }}</strong>
              </div>
              <label for="confirmacion-eliminacion" class="label-confirmacion">Para confirmar, escribe <strong>ELIMINAR</strong></label>
              <input id="confirmacion-eliminacion" v-model="textoConfirmacionEliminacion" type="text" placeholder="Escribe ELIMINAR" autocomplete="off" :disabled="eliminando" />
              <div class="advertencia-eliminacion">
                <strong>Esta acción no se puede deshacer.</strong>
                <span>También se eliminarán los colaboradores, recursos humanos y productos académicos asociados al proyecto.</span>
              </div>
              <div class="modal-acciones">
                <button type="button" class="btn-modal-secundario" :disabled="eliminando" @click="cerrarModal">Cancelar</button>
                <button type="button" class="btn-modal-peligro" :disabled="!puedeEliminarDefinitivamente || eliminando" @click="eliminarProyecto">{{ eliminando ? 'Eliminando...' : 'Eliminar definitivamente' }}</button>
              </div>
            </div>
            <div v-if="modal.tipo === 'eliminado'" class="modal-acciones">
              <button type="button" class="btn-modal-secundario" @click="finalizarEliminacion">Aceptar</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'

const router = useRouter()
const route = useRoute()
const { modoOscuro } = useTema()

const esEdicionAdministrativa = computed(() => route.name === 'proyecto-editar-admin')
const irAlDetalleActual = () => {
  router.push({
    name: esEdicionAdministrativa.value ? 'proyecto-detalle-admin' : 'proyecto-detalle',
    params: { id: idProyecto.value }
  })
}

const idProyecto = computed(() => Number(route.params.id))
const copiar = dato => JSON.parse(JSON.stringify(dato))

const cargando = ref(true)
const guardando = ref(false)
const eliminando = ref(false)
const errorCarga = ref('')

const proyecto = ref({
  id: null, nombre: '', responsable: '', colaboradores: [], convocatoria: '', periodo: '', estado: 'En captura'
})
const fechaActualizacion = ref(null)
const recursosHumanos = ref([])
const productosAcademicos = ref([])
const mensaje = ref(null)
const datosOriginales = ref(null)
const modal = ref({ visible: false, tipo: '', titulo: '', mensaje: '' })
const textoConfirmacionEliminacion = ref('')

const totalColaboradoresTexto = computed(() => {
  const total = proyecto.value.colaboradores.filter(c => typeof c === 'string' && c.trim() !== '').length
  return total === 1 ? '1 persona' : `${total} personas`
})

const formatearFecha = fecha => {
  if (!fecha) return 'Sin fecha registrada'
  const texto = String(fecha).trim()
  const coincidencia = texto.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (coincidencia) {
    return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(Number(coincidencia[1]), Number(coincidencia[2]) - 1, Number(coincidencia[3])))
  }
  const convertida = new Date(fecha)
  return Number.isNaN(convertida.getTime()) ? 'Sin fecha registrada' : new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(convertida)
}

const obtenerIniciales = nombre => {
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') return '?'
  const partes = nombre.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase()
  return (partes[0][0] + partes[1][0]).toUpperCase()
}

const formatearFechaInput = fecha => {
  if (!fecha) return ''
  return String(fecha).trim().split('T')[0].split(' ')[0]
}

const cargarProyecto = async () => {
  cargando.value = true
  errorCarga.value = ''
  mensaje.value = null

  try {
    if (!Number.isInteger(idProyecto.value) || idProyecto.value <= 0) throw new Error('El identificador del proyecto no es válido.')
    
    
    const respuesta = await apiFetch(`/proyectos/${idProyecto.value}`, { credentials: 'include' })
    const datos = await respuesta.json()
    
    if (!respuesta.ok) throw new Error(datos.mensaje || datos.error || 'No fue posible obtener el proyecto.')

    
    proyecto.value = {
      id: datos.generales.id,
      nombre: datos.generales.nombre_proyecto || '',
      responsable: datos.generales.responsable || '',
      colaboradores: Array.isArray(datos.colaboradores) ? datos.colaboradores.map(c => c.nombre_colaborador || c.nombre || c) : [],
      convocatoria: datos.generales.convocatoria_nombre || '',
      periodo: datos.generales.periodo || '',
      estado: datos.generales.estado_nombre || 'En captura'
    }
    fechaActualizacion.value = datos.generales.fecha_actualizacion || null

    recursosHumanos.value = Array.isArray(datos.recursosHumanos) ? datos.recursosHumanos.map(r => ({ id: r.id || Math.random(), id_usuario: r.id_usuario || null, tipo: r.tipo || '', nombre: r.nombre_participante || r.nombre || '', actividad: r.nombre_actividad || r.actividad || '', periodo: r.periodo || '' })) : []
    productosAcademicos.value = Array.isArray(datos.productos) ? datos.productos.map(p => ({ id: p.id || Math.random(), tipo: p.tipo || '', nombre: p.nombre_producto || p.nombre || '', donde: p.donde || p.lugar || '', fechaEnvio: formatearFechaInput(p.fecha_envio || p.fechaEnvio) || '', fechaPublicacion: formatearFechaInput(p.fecha_publicacion || p.fechaPublicacion) || '', estado: p.estado || 'En preparación' })) : []

    datosOriginales.value = copiar({ proyecto: proyecto.value, recursosHumanos: recursosHumanos.value, productosAcademicos: productosAcademicos.value })
  } catch (error) {
    errorCarga.value = error.message || 'No fue posible cargar el proyecto.'
  } finally {
    cargando.value = false
  }
}

watch(() => route.params.id, () => { cargarProyecto() }, { immediate: true })

const hayCambios = computed(() => {
  if (cargando.value || !datosOriginales.value) return false
  const datosActuales = { proyecto: proyecto.value, recursosHumanos: recursosHumanos.value, productosAcademicos: productosAcademicos.value }
  return JSON.stringify(datosActuales) !== JSON.stringify(datosOriginales.value)
})

const puedeEliminarDefinitivamente = computed(() => textoConfirmacionEliminacion.value.trim() === 'ELIMINAR')

const cerrarModal = () => {
  if (guardando.value || eliminando.value) return
  modal.value.visible = false
  textoConfirmacionEliminacion.value = ''
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

const agregarColaborador = () => { proyecto.value.colaboradores.push('') }
const eliminarColaborador = index => { proyecto.value.colaboradores.splice(index, 1) }

const generarIdTemporal = prefijo => `${prefijo}-${Date.now()}-${Math.random()}`

const agregarRecurso = () => { recursosHumanos.value.push({ id: generarIdTemporal('recurso'), tipo: '', nombre: '', actividad: '', periodo: '' }) }
const eliminarRecurso = index => { recursosHumanos.value.splice(index, 1) }

const agregarProducto = () => { productosAcademicos.value.push({ id: generarIdTemporal('producto'), tipo: '', nombre: '', donde: '', fechaEnvio: '', fechaPublicacion: '', estado: 'En preparación' }) }
const eliminarProducto = index => { productosAcademicos.value.splice(index, 1) }

const validarProyecto = () => {
  mensaje.value = null
  if (proyecto.value.nombre.trim() === '') { mensaje.value = { tipo: 'error', texto: 'Debes ingresar el nombre del proyecto.' }; return false }
  if (proyecto.value.responsable.trim() === '') { mensaje.value = { tipo: 'error', texto: 'Debes ingresar el responsable del proyecto.' }; return false }
  if (proyecto.value.convocatoria.trim() === '') { mensaje.value = { tipo: 'error', texto: 'Debes ingresar la convocatoria del proyecto.' }; return false }
  if (proyecto.value.periodo.trim() === '') { mensaje.value = { tipo: 'error', texto: 'Debes ingresar el periodo del proyecto.' }; return false }
  return true
}

const intentarSalir = () => {
  if (guardando.value || eliminando.value) return
  mensaje.value = null
  if (!hayCambios.value) { irAlDetalleActual(); return }
  modal.value = { visible: true, tipo: 'salir', titulo: 'Cambios sin guardar', mensaje: 'Se han realizado cambios que todavía no se han guardado. ¿Deseas salir y descartar los cambios?' }
}

const salirSinGuardar = () => {
  if (datosOriginales.value) {
    proyecto.value = copiar(datosOriginales.value.proyecto)
    recursosHumanos.value = copiar(datosOriginales.value.recursosHumanos)
    productosAcademicos.value = copiar(datosOriginales.value.productosAcademicos)
  }
  cerrarModal()
  irAlDetalleActual()
}

const confirmarGuardado = () => {
  mensaje.value = null
  if (!validarProyecto()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  if (!hayCambios.value) { mensaje.value = { tipo: 'informacion', texto: 'No se han realizado cambios en el proyecto.' }; window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  modal.value = { visible: true, tipo: 'guardar', titulo: 'Guardar cambios', mensaje: '¿Deseas guardar los datos y los cambios realizados en el proyecto?' }
}

//const obtenerColaboradoresLimpios = () => proyecto.value.colaboradores.filter(c => typeof c === 'string').map(c => c.trim()).filter(c => c !== '')
const obtenerColaboradoresLimpios = () => proyecto.value.colaboradores.filter(c => typeof c === 'string').map(c => c.trim()).filter(c => c !== '').map(c => ({ nombre: c }))

const obtenerRecursosLimpios = () => recursosHumanos.value.filter(r => r.tipo.trim() !== '' || r.nombre.trim() !== '' || r.actividad.trim() !== '' || r.periodo.trim() !== '').map(r => ({ tipo: r.tipo.trim(), nombre: r.nombre.trim(), actividad: r.actividad.trim(), periodo: r.periodo.trim() }))

const obtenerProductosLimpios = () => productosAcademicos.value.filter(p => p.tipo.trim() !== '' || p.nombre.trim() !== '' || p.donde.trim() !== '' || p.fechaEnvio !== '' || p.fechaPublicacion !== '').map(p => ({ 
  tipo: p.tipo.trim(), 
  nombre: p.nombre.trim(), 
  lugar: p.donde.trim(), 
  fecha_envio: p.fechaEnvio || null, 
  fecha_publicacion: p.fechaPublicacion || null, 
  estado: p.estado 
}))

const guardarConfirmado = async () => {
  if (guardando.value) return
  guardando.value = true
  try {
    const payload = {
      generales: {
        nombre_proyecto: proyecto.value.nombre.trim(), 
        responsable: proyecto.value.responsable.trim(), 
        convocatoria: proyecto.value.convocatoria.trim(), 
        periodo: proyecto.value.periodo.trim(), 
        estado: proyecto.value.estado
      },
      colaboradores: obtenerColaboradoresLimpios(),
      recursosHumanos: obtenerRecursosLimpios(),
      productos: obtenerProductosLimpios() // backend espera "productos"
    }

    const respuesta = await apiFetch(`/proyectos/${idProyecto.value}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload) 
    })
    
    const resultado = await respuesta.json()
    if (!respuesta.ok) throw new Error(resultado.mensaje || resultado.error || 'No fue posible actualizar el proyecto.')
    
    datosOriginales.value = copiar({ proyecto: proyecto.value, recursosHumanos: recursosHumanos.value, productosAcademicos: productosAcademicos.value })
    fechaActualizacion.value = new Date().toISOString()
    modal.value = { visible: true, tipo: 'exito', titulo: 'Cambios guardados', mensaje: 'Los datos se han guardado correctamente.' }
  } catch (error) {
    modal.value = { visible: true, tipo: 'error', titulo: 'No fue posible guardar', mensaje: error.message || 'Ocurrió un error al guardar los cambios.' }
  } finally {
    guardando.value = false
  }
}

const finalizarGuardado = () => { cerrarModal(); irAlDetalleActual() }

const confirmarEliminacion = () => {
  if (guardando.value || eliminando.value) return
  mensaje.value = null; textoConfirmacionEliminacion.value = ''
  modal.value = { visible: true, tipo: 'eliminar', titulo: 'Eliminar proyecto', mensaje: 'Estás a punto de eliminar este proyecto permanentemente. Revisa la información antes de continuar.' }
}

const eliminarProyecto = async () => {
  if (!puedeEliminarDefinitivamente.value || eliminando.value) return
  eliminando.value = true
  try {
    const respuesta = await apiFetch(`/proyectos/${idProyecto.value}`, { method: 'DELETE' })
    const resultado = await respuesta.json()
    if (!respuesta.ok) throw new Error(resultado.mensaje || 'No fue posible eliminar el proyecto.')
    textoConfirmacionEliminacion.value = ''
    modal.value = { visible: true, tipo: 'eliminado', titulo: 'Proyecto eliminado', mensaje: 'El proyecto y toda su información asociada se han eliminado correctamente.' }
  } catch (error) {
    modal.value = { visible: true, tipo: 'error', titulo: 'No fue posible eliminar', mensaje: error.message || 'Ocurrió un error al eliminar el proyecto.' }
  } finally {
    eliminando.value = false
  }
}

const finalizarEliminacion = () => {
  cerrarModal()
  router.push({ name: esEdicionAdministrativa.value ? 'admin-proyectos-gestion' : 'proyectos' })
}

const volverAProyectos = () => {
  router.push({ name: esEdicionAdministrativa.value ? 'admin-proyectos-gestion' : 'proyectos' })
}
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
    26px
    28px
    38px;

  background:
    radial-gradient(
      circle at 5% 0%,
      rgba(219, 234, 254, 0.72),
      transparent 26%
    ),
    radial-gradient(
      circle at 95% 7%,
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
   CABECERA
======================================== */

.cabecera-pagina {
  display: grid;

  grid-template-columns:
    minmax(320px, 0.75fr)
    minmax(680px, 1.25fr);

  align-items: center;

  gap: 30px;

  margin-bottom: 18px;
}


.cabecera-principal {
  min-width: 0;
}


.btn-regresar {
  min-height: 40px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    14px;

  margin-bottom: 8px;

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
      0.08
    );

  font-family: inherit;
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.btn-regresar svg {
  width: 19px;
  height: 19px;
}


.btn-regresar:hover:not(:disabled) {
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


.titulo-proyecto-linea {
  display: flex;
  align-items: center;

  gap: 12px;

  min-width: 0;
}


.titulo-proyecto-linea h1 {
  min-width: 0;

  margin: 0;

  color: #0a2058;

  font-size: 34px;
  font-weight: 760;

  line-height: 1.15;

  letter-spacing: -0.5px;

  overflow-wrap: anywhere;
}


.descripcion {
  margin:
    6px
    0
    0;

  color: #5875a6;

  font-size: 14px;

  line-height: 1.5;
}


.indicador-cambios {
  width: fit-content;

  display: inline-flex;
  align-items: center;

  gap: 7px;

  margin-top: 8px;

  padding:
    5px
    9px;

  background: #eef6f2;

  border-radius: 20px;

  color: #477565;

  font-size: 11.5px;
  font-weight: 600;
}


.indicador-cambios.activo {
  background: #fff4df;

  color: #a7670d;
}


.indicador-cambios-punto {
  width: 7px;
  height: 7px;

  background: currentColor;

  border-radius: 50%;
}



/* ========================================
   RESUMEN SUPERIOR
======================================== */

.resumen-superior {
  position: relative;

  min-height: 104px;

  display: grid;

  grid-template-columns:
    54px
    minmax(170px, 1.15fr)
    1px
    minmax(130px, 0.8fr)
    1px
    minmax(130px, 0.8fr);

  align-items: center;

  gap: 18px;

  padding:
    13px
    190px
    13px
    16px;

  background:
    linear-gradient(
      110deg,
      rgba(255, 255, 255, 0.97),
      rgba(244, 249, 255, 0.96)
    );

  border:
    1px solid
    #d8e5f5;

  border-radius: 12px;

  box-shadow:
    0 5px 19px
    rgba(
      45,
      84,
      140,
      0.045
    );

  overflow: hidden;
}


.resumen-icono-principal {
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e6f1ff,
      #d7e9ff
    );

  border:
    1px solid
    #d4e5fb;

  border-radius: 11px;

  color: #1269ee;
}


.resumen-icono-principal svg {
  width: 29px;
  height: 29px;
}


.resumen-bloque {
  position: relative;

  z-index: 2;

  min-width: 0;
}


.resumen-etiqueta {
  display: block;

  margin-bottom: 3px;

  color: #637da7;

  font-size: 11.5px;
}


.resumen-estado small {
  display: block;

  margin-top: 5px;

  color: #7187aa;

  font-size: 10.5px;

  white-space: nowrap;
}


.resumen-dato-linea {
  display: flex;
  align-items: center;

  gap: 10px;

  min-width: 0;
}


.resumen-dato-linea > svg {
  width: 29px;
  height: 29px;

  flex-shrink: 0;

  color: #6385b8;
}


.resumen-dato-linea strong {
  display: block;

  color: #15305f;

  font-size: 12.5px;
  font-weight: 700;

  overflow-wrap: anywhere;
}


.separador-resumen {
  width: 1px;
  height: 40px;

  background: #cfdbeb;
}


.resumen-montanas {
  position: absolute;

  right: -10px;
  bottom: -5px;

  width: 200px;
  height: 94px;

  opacity: 0.85;
}


.resumen-montanas svg {
  width: 100%;
  height: 100%;
}



/* ========================================
   CARGA / ERROR
======================================== */

.estado-pagina {
  min-height: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 30px;

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


.estado-pagina strong {
  color: #17315d;

  font-size: 15px;
}


.estado-pagina span {
  color: #6d84a9;

  font-size: 13px;
}


.spinner {
  width: 32px;
  height: 32px;

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
  width: 42px;
  height: 42px;

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
  min-height: 39px;

  margin-top: 10px;

  padding:
    0
    15px;

  background: white;

  color: #b52d38;

  border:
    1px solid
    #edb9bf;

  border-radius: 7px;

  font-weight: 600;

  cursor: pointer;
}



/* ========================================
   MENSAJES
======================================== */

.mensaje {
  display: flex;
  align-items: center;

  gap: 10px;

  margin-bottom: 16px;

  padding:
    12px
    14px;

  border-radius: 9px;

  font-size: 13px;

  line-height: 1.5;
}


.mensaje-icono {
  width: 26px;
  height: 26px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-weight: 800;
}


.mensaje.informacion {
  background: #eef6ff;

  border:
    1px solid
    #c7ddf9;

  color: #315f9d;
}


.mensaje.informacion .mensaje-icono {
  background: #dcecff;

  color: #1768e8;
}


.mensaje.error {
  background: #fff2f2;

  border:
    1px solid
    #f3c5c5;

  color: #a52c35;
}


.mensaje.error .mensaje-icono {
  background: #ffe0e2;

  color: #d83240;
}



/* ========================================
   TARJETAS
======================================== */

.tarjeta {
  position: relative;

  margin-bottom: 14px;

  padding:
    18px
    18px
    16px;

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

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.tarjeta:hover {
  border-color: #d2e0f1;

  box-shadow:
    0 7px 21px
    rgba(
      48,
      84,
      137,
      0.06
    );
}


.tarjeta-destacada {
  min-height: 240px;
}



/* ========================================
   TÍTULOS DE SECCIÓN
======================================== */

.encabezado-seccion,
.titulo-seccion {
  position: relative;

  z-index: 2;
}


.titulo-seccion {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 18px;

  margin-bottom: 13px;
}


.titulo-con-icono {
  display: flex;
  align-items: center;

  gap: 13px;
}


.icono-seccion {
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


.icono-seccion svg {
  width: 24px;
  height: 24px;
}


.encabezado-seccion h2,
.titulo-seccion h2 {
  margin: 0;

  color: #0a2058;

  font-size: 18px;
  font-weight: 740;
}


.encabezado-seccion p,
.titulo-seccion p {
  margin:
    3px
    0
    0;

  color: #617da9;

  font-size: 13px;

  line-height: 1.45;
}



/* ========================================
   DATOS GENERALES
======================================== */

.datos-generales {
  position: relative;

  z-index: 2;

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap:
    15px
    18px;

  margin-top: 15px;
}


.campo {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 7px;
}


.campo label {
  color: #506d9a;

  font-size: 13px;
  font-weight: 600;
}



/* ========================================
   INPUTS / SELECTS
======================================== */

input,
select {
  width: 100%;
  min-width: 0;
  height: 41px;

  padding:
    0
    12px;

  background:
    rgba(
      255,
      255,
      255,
      0.98
    );

  border:
    1px solid
    #cbd9ec;

  border-radius: 7px;

  color: #17315d;

  font-family: inherit;
  font-size: 13px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}


input::placeholder {
  color: #8799b7;
}


input:hover,
select:hover {
  border-color: #b6c9e2;
}


input:focus,
select:focus {
  background: white;

  border-color: #1b6ff0;

  box-shadow:
    0 0 0 3px
    rgba(
      27,
      111,
      240,
      0.08
    );
}


.control-con-icono {
  position: relative;
}


.control-con-icono > svg {
  position: absolute;

  top: 50%;
  left: 12px;

  z-index: 2;

  width: 18px;
  height: 18px;

  transform:
    translateY(-50%);

  color: #6685b5;

  pointer-events: none;
}


.control-con-icono input {
  padding-left: 40px;
}



/* ========================================
   DECORACIÓN DATOS GENERALES
======================================== */

.decoracion-datos {
  position: absolute;

  top: 0;
  right: 0;

  width: 250px;
  height: 100px;

  pointer-events: none;

  opacity: 0.7;
}


.onda {
  position: absolute;

  right: -45px;

  width: 240px;
  height: 80px;

  border-radius:
    0
    0
    0
    80px;

  transform:
    rotate(-5deg);
}


.onda-1 {
  top: -38px;

  background:
    rgba(
      228,
      239,
      255,
      0.62
    );
}


.onda-2 {
  top: -20px;
  right: -75px;

  background:
    rgba(
      211,
      229,
      255,
      0.53
    );
}


.onda-3 {
  top: 0;
  right: -105px;

  background:
    rgba(
      194,
      218,
      253,
      0.42
    );
}



/* ========================================
   ESTADOS
======================================== */

.estado-visual {
  margin-top: 1px;
}


.estado {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  width: fit-content;

  padding:
    6px
    11px;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 650;

  white-space: nowrap;
}


.estado-cabecera {
  flex-shrink: 0;

  font-size: 12.5px;
}


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
   BOTÓN AGREGAR
======================================== */

.btn-agregar {
  min-height: 39px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    15px;

  background:
    linear-gradient(
      135deg,
      #1974f6,
      #0860e9
    );

  color: white;

  border: none;
  border-radius: 7px;

  box-shadow:
    0 5px 12px
    rgba(
      17,
      103,
      235,
      0.16
    );

  font-family: inherit;
  font-size: 12.5px;
  font-weight: 650;

  white-space: nowrap;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.btn-agregar svg {
  width: 17px;
  height: 17px;
}


.btn-agregar:hover:not(:disabled) {
  transform:
    translateY(-1px);

  box-shadow:
    0 7px 16px
    rgba(
      17,
      103,
      235,
      0.23
    );
}



/* ========================================
   COLABORADORES
======================================== */

.lista-colaboradores {
  display: flex;
  flex-direction: column;

  gap: 8px;
}


.fila-colaborador {
  display: grid;

  grid-template-columns:
    38px
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 10px;

  padding:
    7px
    10px;

  background:
    linear-gradient(
      180deg,
      #fbfdff,
      #f8fbff
    );

  border:
    1px solid
    #e0e9f5;

  border-radius: 9px;
}


.avatar-colaborador {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e1edff;

  border:
    1px solid
    #c9dcf6;

  border-radius: 50%;

  color: #1768dc;

  font-size: 10.5px;
  font-weight: 750;
}


.fila-colaborador input {
  height: 38px;
}


.vacio-colaboradores {
  min-height: 95px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3px;

  padding:
    15px;

  background: #fbfdff;

  border:
    1px dashed
    #c3d5ec;

  border-radius: 9px;

  text-align: center;
}


.vacio-icono {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 4px;

  background: #e8f2ff;

  border-radius: 50%;

  color: #176de9;
}


.vacio-icono svg {
  width: 21px;
  height: 21px;
}


.vacio-colaboradores strong {
  color: #17315d;

  font-size: 13px;
}


.vacio-colaboradores span {
  color: #7187aa;

  font-size: 11.5px;
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

  border-radius: 8px;

  -webkit-overflow-scrolling:
    touch;
}


table {
  width: 100%;

  min-width: 900px;

  border-collapse: collapse;
}


.tabla-productos {
  min-width: 1180px;
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
    10px
    11px;

  text-align: left;

  border-bottom:
    1px solid
    #e2e9f3;
}


th {
  color: #18315d;

  font-size: 12px;
  font-weight: 720;

  white-space: nowrap;
}


td {
  color: #17315d;

  font-size: 12.5px;

  vertical-align: middle;
}


tbody tr:last-child td {
  border-bottom: none;
}


tbody tr:not(:has(.vacio-tabla)):hover {
  background: #fbfdff;
}


td input,
td select {
  height: 36px;

  font-size: 12.5px;
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
  background: #a8bad0;

  border-radius: 20px;
}


.tabla-contenedor::-webkit-scrollbar-thumb:hover {
  background: #8fa5c0;
}



/* ========================================
   VACÍOS
======================================== */

.vacio,
.vacio-tabla {
  color: #6d84a9;

  font-size: 12.5px;
}


.vacio-tabla {
  padding:
    17px
    20px;

  text-align: center;
}


.vacio-tabla-contenido {
  display: inline-flex;
  align-items: center;

  gap: 8px;
}


.vacio-tabla-contenido svg {
  width: 20px;
  height: 20px;

  color: #86a3cc;
}



/* ========================================
   BOTÓN ELIMINAR
======================================== */

.btn-eliminar {
  min-height: 35px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding:
    0
    12px;

  background: white;

  color: #d23c47;

  border:
    1px solid
    #efbfc4;

  border-radius: 6px;

  font-family: inherit;
  font-size: 11.5px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}


.btn-eliminar svg {
  width: 15px;
  height: 15px;
}


.btn-eliminar:hover:not(:disabled) {
  background: #fff3f4;

  border-color: #e5a9b0;

  transform:
    translateY(-1px);
}


.btn-eliminar-tabla {
  min-height: 33px;
}



/* ========================================
   TARJETAS MÓVILES
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;

  margin-bottom: 16px;

  padding-bottom: 12px;

  border-bottom:
    1px solid
    #e5ebf4;
}


.encabezado-tarjeta-movil h3 {
  margin: 0;

  color: #0f285b;

  font-size: 15px;
}


.campos-movil {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


.vacio-movil {
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
   ACCIONES FINALES
======================================== */

.acciones-finales {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin:
    3px
    0
    13px;

  padding:
    13px
    16px;

  background:
    rgba(
      255,
      255,
      255,
      0.96
    );

  border:
    1px solid
    #dce6f3;

  border-radius: 11px;

  box-shadow:
    0 4px 15px
    rgba(
      48,
      84,
      137,
      0.04
    );
}


.acciones-finales-info {
  display: flex;
  flex-direction: column;

  gap: 2px;
}


.acciones-finales-info strong {
  color: #15305f;

  font-size: 12.5px;
}


.acciones-finales-info span {
  color: #7187aa;

  font-size: 11.5px;
}


.acciones-finales-botones {
  display: flex;
  align-items: center;

  gap: 10px;
}


.btn-guardar,
.btn-cancelar {
  min-height: 41px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    17px;

  border-radius: 7px;

  font-family: inherit;
  font-size: 12.5px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}


.btn-guardar {
  background:
    linear-gradient(
      135deg,
      #20a45f,
      #16884e
    );

  color: white;

  border: none;

  box-shadow:
    0 5px 12px
    rgba(
      22,
      136,
      78,
      0.16
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
    0 7px 16px
    rgba(
      22,
      136,
      78,
      0.23
    );
}


.btn-guardar.sin-cambios {
  background:
    linear-gradient(
      135deg,
      #4ba97b,
      #3c926b
    );
}


.btn-cancelar {
  background: white;

  color: #3a5b85;

  border:
    1px solid
    #c9d6e7;
}


.btn-cancelar:hover:not(:disabled) {
  background: #f5f8fc;

  transform:
    translateY(-1px);
}



/* ========================================
   ZONA DE PELIGRO
======================================== */

.zona-peligro {
  display: grid;

  grid-template-columns:
    44px
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 14px;

  margin-bottom: 24px;

  padding:
    13px
    16px;

  background:
    linear-gradient(
      90deg,
      #fff7f7,
      #fffafa
    );

  border:
    1px solid
    #f1aeb5;

  border-radius: 10px;
}


.zona-peligro-icono {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffe8ea;

  border-radius: 9px;

  color: #dc2e3b;
}


.zona-peligro-icono svg {
  width: 22px;
  height: 22px;
}


.zona-peligro-informacion {
  min-width: 0;
}


.zona-peligro-etiqueta {
  margin:
    0
    0
    2px;

  color: #d42937;

  font-size: 10px;
  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.05em;
}


.zona-peligro h2 {
  margin:
    0
    0
    3px;

  color: #aa2430;

  font-size: 15px;
}


.zona-peligro-informacion > p:last-child {
  margin: 0;

  color: #687fa3;

  font-size: 11.5px;

  line-height: 1.45;
}


.btn-eliminar-proyecto {
  min-height: 39px;

  flex-shrink: 0;

  padding:
    0
    15px;

  background: white;

  color: #d92f3c;

  border:
    1px solid
    #e84b57;

  border-radius: 7px;

  font-family: inherit;
  font-size: 11.5px;
  font-weight: 650;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}


.btn-eliminar-proyecto:hover:not(:disabled) {
  background: #d93643;

  color: white;

  transform:
    translateY(-1px);
}



/* ========================================
   DESHABILITADOS
======================================== */

button:disabled {
  opacity: 0.62;

  cursor: not-allowed;

  transform: none !important;
}



/* ========================================
   MODAL
======================================== */

.modal-fondo {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background:
    rgba(
      8,
      25,
      58,
      0.48
    );

  backdrop-filter:
    blur(3px);
}


.modal {
  width: 100%;
  max-width: 470px;

  max-height:
    calc(
      100vh - 40px
    );

  overflow-y: auto;

  padding:
    26px
    26px
    23px;

  background: white;

  border:
    1px solid
    #dce5f1;

  border-radius: 15px;

  box-shadow:
    0 24px 60px
    rgba(
      5,
      27,
      66,
      0.22
    );

  text-align: center;
}


.modal-icono {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin:
    0
    auto
    14px;

  border-radius: 50%;
}


.modal-icono svg {
  width: 27px;
  height: 27px;
}


.modal-icono-salir {
  background: #fff1df;
  color: #d37d13;
}


.modal-icono-guardar,
.modal-icono-exito {
  background: #e3f5ed;
  color: #0d9368;
}


.modal-icono-error,
.modal-icono-eliminar,
.modal-icono-eliminado {
  background: #ffe7e9;
  color: #d93d4b;
}


.modal h3 {
  margin:
    0
    0
    9px;

  color: #0b2558;

  font-size: 20px;
  font-weight: 740;
}


.modal > p {
  margin: 0;

  color: #5e759d;

  font-size: 13px;

  line-height: 1.6;
}


.modal-acciones {
  display: flex;
  justify-content: center;

  gap: 10px;

  margin-top: 23px;
}



/* ========================================
   CONFIRMACIÓN DE ELIMINACIÓN
======================================== */

.confirmacion-eliminacion {
  margin-top: 20px;

  text-align: left;
}


.proyecto-a-eliminar {
  display: flex;
  flex-direction: column;

  gap: 4px;

  margin-bottom: 18px;

  padding:
    12px
    14px;

  background: #f7f9fc;

  border:
    1px solid
    #e0e7f1;

  border-radius: 8px;
}


.proyecto-a-eliminar span {
  color: #7186a8;

  font-size: 11.5px;
}


.proyecto-a-eliminar strong {
  color: #17305d;

  font-size: 13px;

  overflow-wrap: anywhere;
}


.label-confirmacion {
  display: block;

  margin-bottom: 7px;

  color: #38577f;

  font-size: 12.5px;
}


.confirmacion-eliminacion input {
  min-height: 41px;
}


.advertencia-eliminacion {
  display: flex;
  flex-direction: column;

  gap: 4px;

  margin-top: 13px;

  padding:
    11px
    13px;

  background: #fff1f2;

  border:
    1px solid
    #f2c3c7;

  border-radius: 8px;

  color: #9e2c35;

  font-size: 11.5px;

  line-height: 1.5;
}



/* ========================================
   BOTONES MODAL
======================================== */

.btn-modal-secundario,
.btn-modal-guardar,
.btn-modal-peligro {
  min-height: 40px;

  padding:
    0
    16px;

  border-radius: 7px;

  font-family: inherit;
  font-size: 12.5px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}


.btn-modal-secundario {
  background: white;

  color: #3d5d88;

  border:
    1px solid
    #cbd8e8;
}


.btn-modal-secundario:hover:not(:disabled) {
  background: #f5f8fc;
}


.btn-modal-guardar {
  background:
    linear-gradient(
      135deg,
      #20a45f,
      #16884e
    );

  color: white;

  border: none;
}


.btn-modal-guardar:hover:not(:disabled) {
  transform:
    translateY(-1px);
}


.btn-modal-peligro {
  background: #dd3c49;

  color: white;

  border: none;
}


.btn-modal-peligro:hover:not(:disabled) {
  background: #c82f3d;

  transform:
    translateY(-1px);
}


.btn-modal-peligro:disabled {
  background: #ccd5e1;

  color: #718096;
}



/* ========================================
   PC / LAPTOP MEDIANA
======================================== */

@media (max-width: 1350px) {

  .cabecera-pagina {
    grid-template-columns:
      minmax(290px, 0.72fr)
      minmax(620px, 1.28fr);

    gap: 22px;
  }


  .resumen-superior {
    padding-right: 140px;

    grid-template-columns:
      48px
      minmax(155px, 1fr)
      1px
      minmax(120px, 0.75fr)
      1px
      minmax(120px, 0.75fr);

    gap: 13px;
  }


  .resumen-montanas {
    width: 155px;
  }


  .datos-generales {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}



/* ========================================
   TABLET
======================================== */

@media (max-width: 1050px) {

  .pagina {
    padding:
      23px
      20px
      34px;
  }


  .cabecera-pagina {
    grid-template-columns:
      1fr;

    gap: 17px;
  }


  .resumen-superior {
    grid-template-columns:
      48px
      minmax(160px, 1fr)
      1px
      minmax(140px, 0.85fr)
      1px
      minmax(140px, 0.85fr);

    padding-right: 150px;
  }


  .titulo-proyecto-linea h1 {
    font-size: 31px;
  }


  .datos-generales {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  table {
    min-width: 850px;
  }


  .tabla-productos {
    min-width: 1120px;
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
      27px;
  }


  .btn-regresar {
    min-height: 42px;

    font-size: 14px;
  }


  .titulo-proyecto-linea {
    align-items: flex-start;

    flex-direction: column;

    gap: 7px;
  }


  .titulo-proyecto-linea h1 {
    font-size: 28px;
  }


  .descripcion {
    font-size: 13px;
  }


  .resumen-superior {
    grid-template-columns:
      48px
      minmax(0, 1fr);

    gap:
      10px
      12px;

    padding:
      14px;

    min-height: 0;
  }


  .resumen-icono-principal {
    grid-row:
      span
      3;

    align-self: start;
  }


  .separador-resumen,
  .resumen-montanas {
    display: none;
  }


  .resumen-bloque {
    grid-column: 2;
  }


  .resumen-dato-linea > svg {
    display: none;
  }


  .tarjeta {
    padding:
      16px
      13px;

    border-radius: 11px;
  }


  .tarjeta-destacada {
    min-height: 0;
  }


  .datos-generales {
    grid-template-columns:
      1fr;

    gap: 14px;
  }


  .decoracion-datos {
    display: none;
  }


  input,
  select {
    min-height: 46px;

    font-size: 16px;
  }


  .campo label {
    font-size: 13px;
  }


  .titulo-seccion {
    flex-direction: column;

    align-items: stretch;

    gap: 12px;
  }


  .titulo-con-icono {
    align-items: flex-start;
  }


  .btn-agregar {
    width: 100%;

    min-height: 46px;

    font-size: 14px;
  }


  .fila-colaborador {
    grid-template-columns:
      38px
      minmax(0, 1fr);

    gap: 9px;
  }


  .fila-colaborador .btn-eliminar {
    grid-column:
      1
      / -1;

    width: 100%;

    min-height: 42px;
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


  .acciones-finales {
    flex-direction: column;

    align-items: stretch;
  }


  .acciones-finales-botones {
    display: grid;

    grid-template-columns:
      1fr
      1fr;
  }


  .btn-guardar,
  .btn-cancelar {
    width: 100%;

    min-height: 47px;

    font-size: 14px;
  }


  .zona-peligro {
    grid-template-columns:
      42px
      minmax(0, 1fr);

    align-items: start;
  }


  .btn-eliminar-proyecto {
    grid-column:
      1
      / -1;

    width: 100%;

    min-height: 46px;

    font-size: 13px;
  }


  .modal-fondo {
    padding: 14px;
  }


  .modal {
    max-width: 100%;

    padding:
      23px
      17px
      20px;
  }


  .modal-acciones {
    flex-direction: column-reverse;
  }


  .modal-acciones button {
    width: 100%;

    min-height: 46px;
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
      23px;
  }


  .titulo-proyecto-linea h1 {
    font-size: 25px;
  }


  .tarjeta {
    padding:
      14px
      11px;
  }


  .icono-seccion {
    width: 40px;
    height: 40px;
  }


  .encabezado-seccion h2,
  .titulo-seccion h2 {
    font-size: 17px;
  }


  .acciones-finales-botones {
    grid-template-columns:
      1fr;
  }


  .zona-peligro {
    padding:
      13px;
  }


  .modal {
    padding:
      21px
      15px
      18px;
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
   MODO OSCURO GLOBAL
   El tema se controla desde ProyectosView.vue
   y se comparte mediante useTema.js
======================================== */

.pagina.modo-oscuro {
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
      circle at 5% 0%,
      rgba(48, 88, 148, 0.25),
      transparent 28%
    ),
    radial-gradient(
      circle at 95% 7%,
      rgba(38, 76, 134, 0.22),
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #101827 0%,
      #111b2d 48%,
      #0e1726 100%
    );

  color: var(--texto-oscuro-principal);
}


/* ========================================
   CABECERA
======================================== */

.modo-oscuro .btn-regresar {
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
    rgba(0, 0, 0, 0.18),
    inset 0 1px 0
    rgba(255, 255, 255, 0.03);
}


.modo-oscuro .btn-regresar:hover:not(:disabled) {
  color: white;

  background:
    linear-gradient(
      135deg,
      #2c7af2,
      #1163df
    );

  border-color: #367fef;
}


.modo-oscuro .subtitulo {
  color: #91a7c9;
}


.modo-oscuro .titulo-proyecto-linea h1 {
  color: #f1f6ff;

  text-shadow:
    0 4px 18px
    rgba(0, 0, 0, 0.22);
}


.modo-oscuro .descripcion {
  color: #9baecc;
}


.modo-oscuro .indicador-cambios {
  background: #18352f;
  color: #81d0b0;

  border:
    1px solid
    rgba(94, 196, 154, 0.18);
}


.modo-oscuro .indicador-cambios.activo {
  background: #3a2d17;
  color: #f1c36d;

  border-color:
    rgba(235, 183, 80, 0.22);
}


/* ========================================
   RESUMEN SUPERIOR
======================================== */

.modo-oscuro .resumen-superior {
  background:
    radial-gradient(
      circle at 86% 15%,
      rgba(66, 116, 184, 0.12),
      transparent 32%
    ),
    linear-gradient(
      110deg,
      rgba(25, 38, 59, 0.98),
      rgba(22, 35, 55, 0.98)
    );

  border-color: #2e405b;

  box-shadow:
    0 8px 24px
    rgba(0, 0, 0, 0.16),
    inset 0 1px 0
    rgba(255, 255, 255, 0.025);
}


.modo-oscuro .resumen-icono-principal,
.modo-oscuro .icono-seccion {
  background:
    linear-gradient(
      145deg,
      #203755,
      #294b75
    );

  border-color: #35597f;
  color: #70aaff;

  box-shadow:
    0 6px 16px
    rgba(0, 0, 0, 0.12),
    inset 0 1px 0
    rgba(255, 255, 255, 0.035);
}


.modo-oscuro .resumen-etiqueta,
.modo-oscuro .resumen-estado small {
  color: #8fa5c5;
}


.modo-oscuro .resumen-dato-linea > svg {
  color: #7598c8;
}


.modo-oscuro .resumen-dato-linea strong {
  color: #e2ecf9;
}


.modo-oscuro .separador-resumen {
  background: #34445b;
}


/*
  La ilustración conserva sus cinco capas.
  No reducimos la opacidad del SVG completo;
  recoloreamos cada forma para mantener profundidad.
*/
.modo-oscuro .resumen-montanas {
  opacity: 1;

  filter:
    drop-shadow(
      0 8px 10px
      rgba(0, 0, 0, 0.16)
    );
}


.modo-oscuro .resumen-montanas circle {
  fill: #385f91;
}


.modo-oscuro .resumen-montanas path:nth-of-type(1) {
  fill: #29486f;
}


.modo-oscuro .resumen-montanas path:nth-of-type(2) {
  fill: #31598a;
}


.modo-oscuro .resumen-montanas path:nth-of-type(3) {
  fill: #3b689d;
}


.modo-oscuro .resumen-montanas path:nth-of-type(4) {
  fill: #4777ae;
}


.modo-oscuro .resumen-montanas path:nth-of-type(5) {
  fill: #b8d3f2;
}


/* ========================================
   CARGA / ERROR
======================================== */

.modo-oscuro .estado-pagina {
  background: #172338;

  border-color: #2d3d56;

  box-shadow:
    0 7px 22px
    rgba(0, 0, 0, 0.17);
}


.modo-oscuro .estado-pagina strong {
  color: #e8f1fd;
}


.modo-oscuro .estado-pagina span {
  color: #91a6c5;
}


.modo-oscuro .spinner {
  border-color: #2b4262;
  border-top-color: #6ca8ff;
}


.modo-oscuro .estado-pagina-icono {
  background: #43232b;
  color: #ff7d88;
}


.modo-oscuro .btn-volver-error {
  background: #1c293d;
  color: #ff8d97;
  border-color: #77434b;
}


.modo-oscuro .btn-volver-error:hover {
  background: #2a3447;
}


/* ========================================
   MENSAJES
======================================== */

.modo-oscuro .mensaje.informacion {
  background: #172d49;
  border-color: #2d527d;
  color: #a9c9f4;
}


.modo-oscuro .mensaje.informacion .mensaje-icono {
  background: #23466f;
  color: #83b8ff;
}


.modo-oscuro .mensaje.error {
  background: #3b2229;
  border-color: #70404a;
  color: #f2a1a8;
}


.modo-oscuro .mensaje.error .mensaje-icono {
  background: #562b34;
  color: #ff818d;
}


/* ========================================
   TARJETAS / SECCIONES
======================================== */

.modo-oscuro .tarjeta {
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(65, 103, 157, 0.055),
      transparent 24%
    ),
    rgba(23, 35, 56, 0.98);

  border-color: #2d3d56;

  box-shadow:
    0 7px 22px
    rgba(0, 0, 0, 0.14),
    inset 0 1px 0
    rgba(255, 255, 255, 0.02);
}


.modo-oscuro .tarjeta:hover {
  border-color: #3a506f;

  box-shadow:
    0 10px 28px
    rgba(0, 0, 0, 0.20);
}


.modo-oscuro .encabezado-seccion h2,
.modo-oscuro .titulo-seccion h2 {
  color: #edf4ff;
}


.modo-oscuro .encabezado-seccion p,
.modo-oscuro .titulo-seccion p {
  color: #91a6c5;
}


/* ========================================
   CAMPOS
======================================== */

.modo-oscuro .campo label {
  color: #9eb2d0;
}


.modo-oscuro input,
.modo-oscuro select {
  background: #111c2d;
  border-color: #394b64;
  color: #e8f0fb;
  color-scheme: dark;

  box-shadow:
    inset 0 1px 0
    rgba(255, 255, 255, 0.015);
}


.modo-oscuro input::placeholder {
  color: #7185a4;
}


.modo-oscuro input:hover,
.modo-oscuro select:hover {
  border-color: #4a607f;
}


.modo-oscuro input:focus,
.modo-oscuro select:focus {
  background: #142238;
  border-color: #5797f3;

  box-shadow:
    0 0 0 3px
    rgba(74, 145, 241, 0.13),
    0 5px 14px
    rgba(0, 0, 0, 0.09);
}


.modo-oscuro .control-con-icono > svg {
  color: #7895bd;
}


/* ========================================
   DECORACIÓN DATOS GENERALES
======================================== */

.modo-oscuro .decoracion-datos {
  opacity: 1;
}


.modo-oscuro .onda-1 {
  background:
    rgba(53, 87, 133, 0.34);
}


.modo-oscuro .onda-2 {
  background:
    rgba(47, 79, 122, 0.29);
}


.modo-oscuro .onda-3 {
  background:
    rgba(41, 69, 108, 0.25);
}


/* ========================================
   ESTADOS
   Se mantienen los colores semánticos,
   adaptados para fondos oscuros.
======================================== */

.modo-oscuro .estado {
  border:
    1px solid
    rgba(255, 255, 255, 0.055);

  box-shadow:
    0 2px 7px
    rgba(0, 0, 0, 0.10);
}


.modo-oscuro .estado-captura {
  background: #26364b;
  color: #a3b7d3;
}


.modo-oscuro .estado-sometido {
  background: #20385d;
  color: #83b4ff;
}


.modo-oscuro .estado-registro {
  background: #332a55;
  color: #c2a6ff;
}


.modo-oscuro .estado-financiado {
  background: #193c31;
  color: #7bd5ab;
}


.modo-oscuro .estado-rechazado {
  background: #48272e;
  color: #ff8994;
}


.modo-oscuro .estado-informe-pendiente {
  background: #42331d;
  color: #f4c36f;
}


.modo-oscuro .estado-informe-deuda {
  background: #442634;
  color: #efa0bd;
}


.modo-oscuro .estado-liberado {
  background: #173a37;
  color: #79d2c4;
}


.modo-oscuro .estado-default {
  background: #263446;
  color: #a0aec0;
}


/* ========================================
   COLABORADORES
======================================== */

.modo-oscuro .fila-colaborador {
  background:
    linear-gradient(
      180deg,
      #19273b,
      #162338
    );

  border-color: #30425c;
}


.modo-oscuro .avatar-colaborador {
  background: #243e62;
  border-color: #385b84;
  color: #85b8ff;

  box-shadow:
    inset 0 1px 0
    rgba(255, 255, 255, 0.025);
}


.modo-oscuro .vacio-colaboradores,
.modo-oscuro .vacio-movil {
  background: #142136;
  border-color: #405575;
  color: #91a6c5;
}


.modo-oscuro .vacio-icono {
  background: #203c60;
  color: #78adfa;
}


.modo-oscuro .vacio-colaboradores strong {
  color: #dce8f7;
}


.modo-oscuro .vacio-colaboradores span {
  color: #879dbc;
}


/* ========================================
   TABLAS
======================================== */

.modo-oscuro .tabla-contenedor {
  background: #111b2c;
  border-color: #2d3d55;

  box-shadow:
    0 5px 16px
    rgba(0, 0, 0, 0.12);
}


.modo-oscuro table {
  background: #111b2c;
}


.modo-oscuro thead {
  background:
    linear-gradient(
      180deg,
      #202d42,
      #1b283b
    );
}


.modo-oscuro th {
  color: #dce8f8;
}


.modo-oscuro td {
  color: #cbd8e9;
  border-bottom-color: #29374b;
}


.modo-oscuro tbody tr:not(:has(.vacio-tabla)):hover {
  background: #18263b;
}


.modo-oscuro .vacio,
.modo-oscuro .vacio-tabla {
  color: #8da3c3;
}


.modo-oscuro .vacio-tabla-contenido svg {
  color: #7596c0;
}


/* ========================================
   SCROLL DE TABLAS
======================================== */

.modo-oscuro .tabla-contenedor::-webkit-scrollbar-track {
  background: #172337;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb {
  background: #435873;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb:hover {
  background: #58708f;
}


/* ========================================
   BOTONES SECUNDARIOS / ELIMINAR
======================================== */

.modo-oscuro .btn-eliminar {
  background: #1d293c;
  color: #f38b94;
  border-color: #70444b;
}


.modo-oscuro .btn-eliminar:hover:not(:disabled) {
  background: #35242b;
  border-color: #9b515b;
}


/* ========================================
   TARJETAS MÓVILES
======================================== */

.modo-oscuro .tarjeta-movil {
  background: #172338;
  border-color: #2e3f58;

  box-shadow:
    0 7px 20px
    rgba(0, 0, 0, 0.16);
}


.modo-oscuro .encabezado-tarjeta-movil {
  border-bottom-color: #2c3b51;
}


.modo-oscuro .encabezado-tarjeta-movil h3 {
  color: #eaf2fd;
}


/* ========================================
   ACCIONES FINALES
======================================== */

.modo-oscuro .acciones-finales {
  background:
    rgba(23, 35, 55, 0.98);

  border-color: #2d3d55;

  box-shadow:
    0 6px 19px
    rgba(0, 0, 0, 0.14),
    inset 0 1px 0
    rgba(255, 255, 255, 0.02);
}


.modo-oscuro .acciones-finales-info strong {
  color: #dce8f7;
}


.modo-oscuro .acciones-finales-info span {
  color: #8da3c3;
}


.modo-oscuro .btn-cancelar {
  background: #1a283d;
  color: #a9c3e7;
  border-color: #3a506d;
}


.modo-oscuro .btn-cancelar:hover:not(:disabled) {
  background: #23344c;
}


/* ========================================
   ZONA DE PELIGRO
======================================== */

.modo-oscuro .zona-peligro {
  background:
    radial-gradient(
      circle at 0% 50%,
      rgba(154, 58, 70, 0.14),
      transparent 28%
    ),
    linear-gradient(
      90deg,
      #2a2028,
      #241d25
    );

  border-color: #70424b;
}


.modo-oscuro .zona-peligro-icono {
  background: #48272e;
  color: #ff7e8a;
}


.modo-oscuro .zona-peligro-etiqueta {
  color: #ff818c;
}


.modo-oscuro .zona-peligro h2 {
  color: #f2a1a8;
}


.modo-oscuro .zona-peligro-informacion > p:last-child {
  color: #9caec9;
}


.modo-oscuro .btn-eliminar-proyecto {
  background: #241e26;
  color: #ff8791;
  border-color: #b64f5b;
}


.modo-oscuro .btn-eliminar-proyecto:hover:not(:disabled) {
  background: #d83c49;
  color: white;
}


/* ========================================
   MODAL
======================================== */

.modo-oscuro .modal-fondo {
  background:
    rgba(3, 10, 22, 0.68);

  backdrop-filter:
    blur(4px);
}


.modo-oscuro .modal {
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(63, 102, 157, 0.08),
      transparent 27%
    ),
    #172338;

  border-color: #31435d;

  box-shadow:
    0 28px 70px
    rgba(0, 0, 0, 0.42),
    inset 0 1px 0
    rgba(255, 255, 255, 0.02);
}


.modo-oscuro .modal-icono-salir {
  background: #40301c;
  color: #efbb69;
}


.modo-oscuro .modal-icono-guardar,
.modo-oscuro .modal-icono-exito {
  background: #193b31;
  color: #79d1aa;
}


.modo-oscuro .modal-icono-error,
.modo-oscuro .modal-icono-eliminar,
.modo-oscuro .modal-icono-eliminado {
  background: #47252d;
  color: #ff8590;
}


.modo-oscuro .modal h3 {
  color: #edf4ff;
}


.modo-oscuro .modal > p {
  color: #9aafcd;
}


.modo-oscuro .proyecto-a-eliminar {
  background: #131f31;
  border-color: #304158;
}


.modo-oscuro .proyecto-a-eliminar span {
  color: #8499b8;
}


.modo-oscuro .proyecto-a-eliminar strong {
  color: #dce8f7;
}


.modo-oscuro .label-confirmacion {
  color: #9eb5d5;
}


.modo-oscuro .advertencia-eliminacion {
  background: #3a2229;
  border-color: #6e4049;
  color: #efabb1;
}


.modo-oscuro .btn-modal-secundario {
  background: #1b293d;
  color: #aac3e5;
  border-color: #3c516e;
}


.modo-oscuro .btn-modal-secundario:hover:not(:disabled) {
  background: #24354d;
}


.modo-oscuro .btn-modal-peligro:disabled {
  background: #344154;
  color: #8290a4;
}


/* ========================================
   DETALLES FINALES DE CONTRASTE
======================================== */

.modo-oscuro .btn-agregar,
.modo-oscuro .btn-guardar,
.modo-oscuro .btn-modal-guardar,
.modo-oscuro .btn-modal-peligro {
  box-shadow:
    0 6px 15px
    rgba(0, 0, 0, 0.16),
    inset 0 1px 0
    rgba(255, 255, 255, 0.10);
}


.modo-oscuro .btn-agregar:hover:not(:disabled),
.modo-oscuro .btn-guardar:hover:not(:disabled),
.modo-oscuro .btn-modal-guardar:hover:not(:disabled),
.modo-oscuro .btn-modal-peligro:hover:not(:disabled) {
  box-shadow:
    0 8px 19px
    rgba(0, 0, 0, 0.22),
    inset 0 1px 0
    rgba(255, 255, 255, 0.12);
}



/* ==========================================================
   REFINAMIENTO VISUAL 2026
   Misma línea gráfica que ProyectosView, MisProyectos,
   ConvocatoriasView y ProyectoNuevoView.
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
   CABECERA PRINCIPAL
======================================== */

.cabecera-pagina {
  position: relative;
  isolation: isolate;

  min-height: 172px;

  grid-template-columns:
    minmax(330px, 0.82fr)
    minmax(660px, 1.18fr);

  gap: 36px;

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

  width: 470px;
  height: 190px;

  top: -108px;
  right: 10%;

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

  width: 168px;
  height: 168px;

  right: -62px;
  bottom: -94px;

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


.cabecera-principal {
  position: relative;
  z-index: 3;
}


/* ========================================
   BOTÓN REGRESAR
   Igual al utilizado en ProyectoNuevoView
======================================== */

.btn-regresar {
  min-height: 42px;

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

  font-size: 15px;
  font-weight: 700;
}


.btn-regresar svg {
  width: 20px;
  height: 20px;
}


.btn-regresar:hover:not(:disabled) {
  box-shadow:
    0 7px 17px
    rgba(
      21,
      105,
      238,
      0.22
    );
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
   TÍTULO / CAMBIOS
======================================== */

.subtitulo {
  color: #617eae;

  font-size: 14px;
}


.titulo-proyecto-linea {
  gap: 10px;
}


.titulo-proyecto-linea h1 {
  color: #0a2058;

  font-size: 34px;
  font-weight: 760;

  letter-spacing: -0.5px;
}


.descripcion {
  max-width: 620px;

  margin-top: 7px;

  color: #5875a6;

  font-size: 14px;
}


.indicador-cambios {
  min-height: 29px;

  gap: 7px;

  margin-top: 12px;

  padding:
    0
    10px;

  background:
    rgba(
      232,
      247,
      241,
      0.92
    );

  border:
    1px solid
    #d5eadf;

  border-radius: 999px;

  color: #477565;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.72
    );

  font-size: 11px;
}


.indicador-cambios.activo {
  background:
    rgba(
      255,
      246,
      225,
      0.95
    );

  border-color:
    #efdfba;

  color: #a7670d;
}


/* ========================================
   RESUMEN SUPERIOR
======================================== */

.resumen-superior {
  min-height: 122px;

  grid-template-columns:
    50px
    minmax(155px, 1.05fr)
    1px
    minmax(130px, 0.80fr)
    1px
    minmax(130px, 0.80fr);

  gap: 15px;

  padding:
    15px
    184px
    15px
    15px;

  background:
    linear-gradient(
      112deg,
      rgba(248, 252, 255, 0.88),
      rgba(237, 246, 255, 0.82)
    );

  border:
    1px solid
    #d8e6f7;

  border-radius: 13px;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.78
    ),
    0 5px 16px
    rgba(
      45,
      84,
      140,
      0.035
    );
}


.resumen-superior::before {
  content: '';

  position: absolute;

  width: 190px;
  height: 190px;

  top: -118px;
  right: 75px;

  background:
    rgba(
      255,
      255,
      255,
      0.40
    );

  border-radius: 50%;

  pointer-events: none;
}


.resumen-icono-principal {
  width: 48px;
  height: 48px;

  border-radius: 10px;

  box-shadow:
    0 5px 13px
    rgba(
      43,
      91,
      151,
      0.06
    );
}


.resumen-icono-principal svg {
  width: 27px;
  height: 27px;
}


.resumen-etiqueta {
  color: #637da7;

  font-size: 10.5px;
  font-weight: 650;
}


.resumen-dato-linea strong {
  color: #15305f;

  font-size: 12px;
}


.separador-resumen {
  height: 36px;

  background:
    #d5e0ee;
}


/* ========================================
   ILUSTRACIÓN DE EDICIÓN
======================================== */

.resumen-montanas {
  right: -4px;
  bottom: 0;

  width: 184px;
  height: 112px;

  opacity: 1;

  filter:
    drop-shadow(
      0 8px 13px
      rgba(
        49,
        94,
        158,
        0.08
      )
    );
}


.resumen-montanas svg {
  overflow: visible;
}


.edicion-documento-atras,
.edicion-documento,
.edicion-lapiz {
  transform-box: fill-box;
  transform-origin: center;

  transition:
    transform 0.22s ease;
}


.resumen-superior:hover .edicion-documento-atras {
  transform:
    translateY(-1px)
    rotate(-1deg);
}


.resumen-superior:hover .edicion-documento {
  transform:
    translateY(-2px)
    rotate(1deg);
}


.resumen-superior:hover .edicion-lapiz {
  transform:
    translateX(2px)
    translateY(-1px);
}


/* ========================================
   ESTADOS
======================================== */

.estado {
  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.72
    );

  box-shadow:
    0 2px 6px
    rgba(
      35,
      73,
      126,
      0.035
    );
}


/* ========================================
   TARJETAS DE CONTENIDO
======================================== */

.tarjeta {
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

  transition:
    transform 0.20s ease,
    border-color 0.20s ease,
    box-shadow 0.20s ease;
}


.tarjeta::before {
  content: '';

  position: absolute;

  width: 145px;
  height: 145px;

  top: -92px;
  right: -74px;

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


.tarjeta:hover {
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
  width: 44px;
  height: 44px;

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


.tarjeta:hover .icono-seccion {
  transform:
    scale(1.035);
}


.encabezado-seccion h2,
.titulo-seccion h2 {
  font-size: 18px;
}


.encabezado-seccion p,
.titulo-seccion p {
  color: #617da9;
}


/* ========================================
   CAMPOS
======================================== */

input,
select {
  height: 42px;

  border-color: #cbd9ec;

  border-radius: 8px;

  box-shadow:
    0 2px 7px
    rgba(
      47,
      80,
      130,
      0.02
    );
}


input:focus,
select:focus {
  box-shadow:
    0 0 0 3px
    rgba(
      27,
      111,
      240,
      0.08
    ),
    0 4px 11px
    rgba(
      51,
      91,
      151,
      0.04
    );
}


/* ========================================
   LISTAS Y TABLAS
======================================== */

.fila-colaborador {
  border-radius: 10px;

  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}


.fila-colaborador:hover {
  transform:
    translateY(-1px);

  border-color:
    #cfdef0;

  box-shadow:
    0 5px 12px
    rgba(
      44,
      80,
      132,
      0.045
    );
}


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
   BOTONES
======================================== */

.btn-agregar,
.btn-guardar {
  border-radius: 8px;
}


.btn-agregar {
  min-height: 40px;

  box-shadow:
    0 6px 14px
    rgba(
      17,
      103,
      235,
      0.17
    );
}


.btn-eliminar {
  border-radius: 8px;
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

  border-color:
    #cadcef;

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
   ACCIONES FINALES
======================================== */

.acciones-finales {
  border-radius: 14px;

  box-shadow:
    0 6px 20px
    rgba(
      48,
      84,
      137,
      0.05
    );
}


/* ========================================
   ZONA DE PELIGRO
======================================== */

.zona-peligro {
  border-radius: 14px;

  box-shadow:
    0 5px 18px
    rgba(
      145,
      49,
      61,
      0.04
    );
}


/* ========================================
   MODO OSCURO: REFINAMIENTO
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


.modo-oscuro .btn-regresar:hover:not(:disabled) {
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


.modo-oscuro .resumen-superior {
  background:
    radial-gradient(
      circle at 84% 20%,
      rgba(70, 116, 178, 0.13),
      transparent 33%
    ),
    linear-gradient(
      112deg,
      rgba(26, 41, 63, 0.92),
      rgba(23, 37, 58, 0.88)
    );

  border-color: #30445f;
}


.modo-oscuro .resumen-superior::before {
  background:
    rgba(
      86,
      124,
      175,
      0.07
    );
}


.modo-oscuro .edicion-halo {
  fill: #29486f;

  opacity: .52;
}


.modo-oscuro .edicion-orbita {
  stroke: #5d8fc8;

  opacity: .30;
}


.modo-oscuro .edicion-documento-atras rect:first-child {
  fill: #315982;
  stroke: #4976a6;
}


.modo-oscuro .edicion-documento-atras rect:not(:first-child) {
  fill: #496d98;
}


.modo-oscuro .edicion-documento rect:first-child {
  fill: #1c2d45;
  stroke: #46617f;
}


.modo-oscuro .edicion-documento rect:not(:first-child) {
  fill: #39516e;
}


.modo-oscuro .edicion-documento circle {
  fill: #1d4438;
  stroke: #326654;
}


.modo-oscuro .edicion-documento path {
  stroke: #78d2a6;
}


.modo-oscuro .edicion-destello {
  fill: #78a9e8;
}


.modo-oscuro .tarjeta:hover {
  border-color: #45668e;
}


.modo-oscuro .fila-colaborador:hover {
  border-color: #415b7b;

  box-shadow:
    0 7px 15px
    rgba(
      0,
      0,
      0,
      0.12
    );
}


/* ========================================
   RESPONSIVE DEL REFINAMIENTO
======================================== */

@media (max-width: 1180px) {

  .cabecera-pagina {
    grid-template-columns:
      1fr;

    gap: 16px;
  }


  .resumen-superior {
    width: 100%;
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


  .titulo-proyecto-linea h1 {
    font-size: 29px;
  }


  .btn-regresar {
    min-height: 40px;

    font-size: 14px;
  }


  .resumen-superior {
    border-radius: 11px;
  }


  .tarjeta {
    border-radius: 12px;
  }

}


@media (prefers-reduced-motion: reduce) {

  .tarjeta,
  .tarjeta-movil,
  .fila-colaborador,
  .icono-seccion,
  .edicion-documento-atras,
  .edicion-documento,
  .edicion-lapiz,
  .btn-regresar {
    transition: none !important;
  }


  .tarjeta:hover,
  .tarjeta-movil:hover,
  .fila-colaborador:hover,
  .tarjeta:hover .icono-seccion,
  .resumen-superior:hover .edicion-documento-atras,
  .resumen-superior:hover .edicion-documento,
  .resumen-superior:hover .edicion-lapiz,
  .btn-regresar:hover {
    transform: none !important;
  }

}

</style>