<template>
  <div
    class="pagina"
    :class="{ 'modo-oscuro': modoOscuro }"
  >
    <div class="contenido">

      <!-- ENCABEZADO SUPERIOR -->
      <header class="cabecera-pagina">
        <div class="cabecera-texto">
          <button type="button" class="btn-regresar" @click="intentarSalir">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Regresar
          </button>
          <p class="subtitulo">Registro de proyecto</p>
          <h1>Nuevo proyecto</h1>
          <p class="descripcion">Captura la información necesaria para registrar un nuevo proyecto.</p>
        </div>

        <!-- PASOS DINÁMICOS -->
        <nav class="pasos" aria-label="Secciones del registro">
          <button type="button" class="paso paso-datos-generales" :class="{ 'paso-actual': pasoActual === 1, 'paso-completo': datosGeneralesCompletos }" @click="irASeccion('datos-generales', 1)">
            <span class="paso-numero">1</span>
            <span class="paso-texto">Datos generales</span>
          </button>
          <span class="paso-linea" :class="{ 'paso-linea-activa': colaboradoresConDatos }"></span>
          <button type="button" class="paso" :class="{ 'paso-actual': pasoActual === 2, 'paso-con-datos': colaboradoresConDatos }" @click="irASeccion('colaboradores', 2)">
            <span class="paso-numero">2</span>
            <span class="paso-texto">Colaboradores</span>
          </button>
          <span class="paso-linea" :class="{ 'paso-linea-activa': recursosConDatos }"></span>
          <button type="button" class="paso" :class="{ 'paso-actual': pasoActual === 3, 'paso-con-datos': recursosConDatos }" @click="irASeccion('recursos-humanos', 3)">
            <span class="paso-numero">3</span>
            <span class="paso-texto">Recursos humanos</span>
          </button>
          <span class="paso-linea" :class="{ 'paso-linea-activa': productosConDatos }"></span>
          <button type="button" class="paso" :class="{ 'paso-actual': pasoActual === 4, 'paso-con-datos': productosConDatos }" @click="irASeccion('productos-academicos', 4)">
            <span class="paso-numero">4</span>
            <span class="paso-texto">Productos académicos</span>
          </button>
          <span class="paso-linea" :class="{ 'paso-linea-activa': revisionDisponible }"></span>
          <button type="button" class="paso" :class="{ 'paso-actual': pasoActual === 5, 'paso-con-datos': revisionDisponible, 'paso-revision-lista': revisionDisponible }" @click="irASeccion('acciones-finales', 5)">
            <span class="paso-numero">5</span>
            <span class="paso-texto">Revisión</span>
          </button>
        </nav>
      </header>

      <!-- MENSAJE DE VALIDACIÓN -->
      <div v-if="mensajeValidacion" class="mensaje-validacion">
        <div class="mensaje-validacion-icono">!</div>
        <div>
          <strong>Revisa la información</strong>
          <span>{{ mensajeValidacion }}</span>
        </div>
      </div>

      <!-- LISTA DE USUARIOS PARA AUTOCOMPLETAR -->
      <datalist id="lista-usuarios">
        <option v-for="user in usuariosRegistrados" :key="user.id_usuario || user.id" :value="user.correo">
    {{ user.nombre }} {{ user.apellido }}
        </option>
      </datalist>

      <!-- DISTRIBUCIÓN PRINCIPAL -->
      <div class="layout-principal">
        <main class="columna-principal">

          <!-- DATOS GENERALES -->
          <section id="datos-generales" class="tarjeta seccion-destacada">
            <div class="encabezado-seccion">
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

            <div class="datos-generales">
              <div class="campo">
                <label for="nombre-proyecto">Nombre del proyecto <span class="obligatorio">*</span></label>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3.5V8h4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
                  <input id="nombre-proyecto" v-model="proyecto.nombre" type="text" placeholder="Nombre del proyecto" />
                </div>
              </div>
              <div class="campo">
                <label for="responsable">Responsable <span class="obligatorio">*</span></label>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                  <input id="responsable" v-model="proyecto.responsable" type="text" placeholder="Nombre del responsable" readonly title="El responsable corresponde al usuario que inició sesión." />
                </div>
              </div>
              <div class="campo">
                <label for="convocatoria">Convocatoria <span class="obligatorio">*</span></label>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11v2a2 2 0 0 0 2 2h2l1.5 5h2L10 15h1l7 3V6l-7 3H6a2 2 0 0 0-2 2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M20 9v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                  <input id="convocatoria" v-model="proyecto.convocatoria" type="text" placeholder="Nombre de la convocatoria" />
                </div>
              </div>
              <div class="campo">
                <label for="periodo">Periodo <span class="obligatorio">*</span></label>
                <div class="control-con-icono">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 3.5v4M16 3.5v4M4 9.5h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                  <input id="periodo" v-model="proyecto.periodo" type="text" placeholder="Ej. Agosto 2026 - Julio 2027" />
                </div>
              </div>
              <div class="campo">
                <label>Estado</label>
                <div class="estado-inicial"><span class="punto-estado"></span> En captura</div>
                <small class="ayuda-estado">Los proyectos nuevos se registran inicialmente como “En captura”.</small>
              </div>
            </div>
            <p class="campos-obligatorios"><span>*</span> Campos obligatorios</p>
            <div class="decoracion-datos" aria-hidden="true">
              <span class="onda onda-1"></span><span class="onda onda-2"></span><span class="onda onda-3"></span>
            </div>
          </section>

          <!-- COLABORADORES -->
          <section id="colaboradores" class="tarjeta">
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
                  <p>Personas que participan en el proyecto. Si tienen cuenta, selecciónalos de la lista para vincularlos automáticamente.</p>
                </div>
              </div>
              <button type="button" class="btn-agregar" @click="agregarColaborador">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg> Agregar colaborador
              </button>
            </div>
            <div v-if="proyecto.colaboradores.length === 0" class="vacio vacio-colaboradores">
              <div class="grupo-avatares" aria-hidden="true">
                <span class="avatar-vacio avatar-vacio-secundario"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="currentColor" /><path d="M6 19c.4-3.8 2.4-5.7 6-5.7s5.6 1.9 6 5.7" fill="currentColor" /></svg></span>
                <span class="avatar-vacio avatar-vacio-principal"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="currentColor" /><path d="M6 19c.4-3.8 2.4-5.7 6-5.7s5.6 1.9 6 5.7" fill="currentColor" /></svg></span>
                <span class="avatar-vacio avatar-vacio-secundario"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="currentColor" /><path d="M6 19c.4-3.8 2.4-5.7 6-5.7s5.6 1.9 6 5.7" fill="currentColor" /></svg></span>
              </div>
              <strong>No hay colaboradores registrados.</strong>
              <span>Agrega personas que participarán en este proyecto.</span>
            </div>
            <div v-else class="lista-colaboradores">
              <div v-for="(colaborador, index) in proyecto.colaboradores" :key="index" class="fila-colaborador">
                <div class="numero-elemento">{{ index + 1 }}</div>
                <div class="control-con-icono colaborador-control">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                  <input v-model="proyecto.colaboradores[index]" type="text" placeholder="Nombre completo o correo (escribe para buscar)" list="lista-usuarios" autocomplete="off" />
                </div>
                <button type="button" class="btn-eliminar" @click="eliminarColaborador(index)">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8v10M12 8v10M16 8v10M5 6h14M9 6V4h6v2M7 6l1 14h8l1-14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Eliminar
                </button>
              </div>
            </div>
          </section>

          <!-- RECURSOS HUMANOS -->
          <section id="recursos-humanos" class="tarjeta">
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
              <button type="button" class="btn-agregar" @click="agregarRecurso">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg> Agregar recurso
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
                    <td><input v-model="recurso.nombre" type="text" placeholder="Nombre completo o correo" list="lista-usuarios" autocomplete="off" /></td>
                    <td><input v-model="recurso.actividad" type="text" placeholder="Nombre de la actividad" /></td>
                    <td><input v-model="recurso.periodo" type="text" placeholder="Periodo" /></td>
                    <td><button type="button" class="btn-eliminar btn-eliminar-tabla" @click="eliminarRecurso(index)">Eliminar</button></td>
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
                  <button type="button" class="btn-eliminar btn-eliminar-movil" @click="eliminarRecurso(index)">Eliminar</button>
                </div>
                <div class="campos-movil">
                  <div class="campo"><label>Tipo</label><input v-model="recurso.tipo" type="text" placeholder="Tipo" /></div>
                  <div class="campo"><label>Nombre</label><input v-model="recurso.nombre" type="text" placeholder="Nombre o correo" list="lista-usuarios" autocomplete="off" /></div>
                  <div class="campo"><label>Nombre de la actividad</label><input v-model="recurso.actividad" type="text" placeholder="Nombre de la actividad" /></div>
                  <div class="campo"><label>Periodo</label><input v-model="recurso.periodo" type="text" placeholder="Periodo" /></div>
                </div>
              </article>
              <div v-if="recursosHumanos.length === 0" class="vacio-movil">No hay recursos humanos registrados.</div>
            </div>
          </section>

          <!-- PRODUCTOS ACADÉMICOS -->
          <section id="productos-academicos" class="tarjeta">
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
              <button type="button" class="btn-agregar" @click="agregarProducto">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg> Agregar producto
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
                    <td><button type="button" class="btn-eliminar btn-eliminar-tabla" @click="eliminarProducto(index)">Eliminar</button></td>
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
                  <button type="button" class="btn-eliminar btn-eliminar-movil" @click="eliminarProducto(index)">Eliminar</button>
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

        </main>

        <!-- RESUMEN LATERAL -->
        <aside class="columna-lateral">
          <div class="resumen-proyecto">
            <div class="resumen-encabezado">
              <div class="icono-resumen">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3.5V8h4M9 12h6M9 15.5h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h2>Resumen del proyecto</h2><p>Verifica el avance de tu registro.</p>
              </div>
            </div>
            <div class="resumen-lista">
              <div class="resumen-item">
                <div class="resumen-item-icono"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 12l2.2 2.2 4.8-4.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                <div class="resumen-item-contenido"><span>Estado actual</span><strong class="estado-resumen"><span class="punto-estado"></span>En captura</strong></div>
              </div>
              <div class="resumen-item">
                <div class="resumen-item-icono"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div>
                <div class="resumen-item-contenido"><span>Colaboradores</span><strong>{{ proyecto.colaboradores.length }}</strong></div>
              </div>
              <div class="resumen-item">
                <div class="resumen-item-icono"><svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5-9 5zM7 12v4.5c2.7 2 7.3 2 10 0V12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></div>
                <div class="resumen-item-contenido"><span>Recursos humanos</span><strong>{{ recursosHumanos.length }}</strong></div>
              </div>
              <div class="resumen-item">
                <div class="resumen-item-icono"><svg viewBox="0 0 24 24"><path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3.5V8h4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg></div>
                <div class="resumen-item-contenido"><span>Productos académicos</span><strong>{{ productosAcademicos.length }}</strong></div>
              </div>
            </div>
            <div class="resumen-separador"></div>
            <div class="consejo">
              <div class="icono-consejo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M8.5 15.5c-1.5-1.2-2.5-3-2.5-5a6 6 0 1 1 12 0c0 2-1 3.8-2.5 5-.9.7-1.2 1.3-1.3 2.1H9.8c-.1-.8-.4-1.4-1.3-2.1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <div><strong>Consejo</strong><p>Ten a la mano la información de la convocatoria antes de iniciar el registro.</p></div>
            </div>
          </div>

          <div class="decoracion-lateral">
            <div class="decoracion-lateral-grafica" aria-hidden="true">
              <div class="decoracion-mensaje"><span class="decoracion-etiqueta">IDEAS · IMPACTO</span><p>Grandes proyectos<br>comienzan con<br>grandes personas</p><span class="linea-decorativa"></span></div>
              <span class="decoracion-punto decoracion-punto-1"></span><span class="decoracion-punto decoracion-punto-2"></span><span class="decoracion-punto decoracion-punto-3"></span>
              <svg class="montanas-laterales" viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cieloLateral" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8fbff" /><stop offset="100%" stop-color="#dcecff" /></linearGradient>
                  <linearGradient id="montanaTrasera" x1="0" y1="0" x2="0.9" y2="1"><stop offset="0%" stop-color="#e8f2ff" /><stop offset="100%" stop-color="#cfe2fb" /></linearGradient>
                  <linearGradient id="montanaCentral" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cfe3ff" /><stop offset="100%" stop-color="#9fc3f6" /></linearGradient>
                  <linearGradient id="montanaFrontal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9fc6f8" /><stop offset="100%" stop-color="#6f9fe2" /></linearGradient>
                  <linearGradient id="banderaGradiente" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3d86ee" /><stop offset="100%" stop-color="#75a9f3" /></linearGradient>
                  <filter id="sombraMontanas" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#4f83c7" flood-opacity="0.14" /></filter>
                  <filter id="brilloBandera" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#2671d8" flood-opacity="0.22" /></filter>
                </defs>
                <path class="decor-cielo" d="M0 0H320V230H0Z" fill="url(#cieloLateral)" opacity="0.58" />
                <circle class="decor-sol" cx="250" cy="48" r="22" fill="#c8ddfb" />
                <circle class="decor-destello" cx="279" cy="27" r="4.5" fill="#8cb7f0" opacity="0.55" />
                <circle class="decor-destello" cx="296" cy="46" r="2.8" fill="#9bc3f5" opacity="0.44" />
                <circle class="decor-destello" cx="228" cy="22" r="2.4" fill="#a7caf4" opacity="0.48" />
                <g class="decor-nubes" opacity="0.75">
                  <path d="M28 72c4-10 13-15 23-12 4-8 11-12 19-10 9 2 14 8 15 16 9 0 15 5 17 13H24c0-3 1-5 4-7Z" fill="#ffffff" opacity="0.62" />
                  <path d="M215 91c3-7 9-11 17-9 4-6 10-8 16-6 7 2 10 6 11 12 7 0 12 4 13 10h-61c0-3 1-5 4-7Z" fill="#ffffff" opacity="0.45" />
                </g>
                <g class="decor-contornos" fill="none" stroke="#91b9ed" stroke-width="1.4" opacity="0.28">
                  <path d="M12 122c37-18 66-18 98 2 30 19 59 20 91 5" />
                  <path d="M-8 142c43-22 81-20 116 3 31 20 63 22 101 3" />
                  <path d="M171 112c31-14 68-10 105 12 17 10 32 12 48 9" />
                </g>
                <g filter="url(#sombraMontanas)">
                  <path class="montana montana-trasera" d="M-20 214 86 91 181 214Z" fill="url(#montanaTrasera)" />
                  <path class="montana montana-central" d="M40 214 154 61 271 214Z" fill="url(#montanaCentral)" />
                  <path class="montana montana-derecha" d="M148 214 232 119 332 214Z" fill="#b7d2f8" />
                  <path class="montana montana-frontal" d="M87 214 157 122 229 214Z" fill="url(#montanaFrontal)" />
                </g>
                <path class="nieve nieve-central" d="m154 61 22 30-13-6-10 12-11-9-12 7Z" fill="#f6faff" opacity="0.94" />
                <path class="nieve nieve-derecha" d="m232 119 16 19-10-4-8 8-8-7-9 5Z" fill="#f4f9ff" opacity="0.88" />
                <path class="ladera-sombra" d="m154 61 17 37 58 116h-72l-14-85-31 44Z" fill="#5d94da" opacity="0.13" />
                <path class="ladera-luz" d="m87 214 70-92 22 28-31-10-36 74Z" fill="#ffffff" opacity="0.17" />
                <path class="decor-niebla" d="M-18 202c45-17 85-12 119-1 41 14 84 14 123 1 39-14 73-15 114-3v31H-18Z" fill="#edf5ff" opacity="0.78" />
                <g class="bandera-cima" filter="url(#brilloBandera)">
                  <path class="mastil-bandera" d="M250 72v81" fill="none" stroke="#5d94e3" stroke-width="4.5" stroke-linecap="round" />
                  <path class="tela-bandera" d="M253 76h42l-9 14 9 14h-42Z" fill="url(#banderaGradiente)" />
                  <path class="brillo-bandera" d="M258 80h23l-4 5h-19Z" fill="#ffffff" opacity="0.24" />
                </g>
                <circle class="meta-punto" cx="250" cy="153" r="5" fill="#ffffff" stroke="#6b9fe7" stroke-width="2" opacity="0.9" />
              </svg>
            </div>
            <div id="acciones-finales" class="acciones-finales acciones-finales-lateral">
              <div class="acciones-finales-texto"><strong>¿Todo listo?</strong><span>Revisa los datos antes de crear el proyecto.</span></div>
              <div class="acciones-finales-botones">
                <button type="button" class="btn-cancelar" @click="intentarSalir">Cancelar</button>
                <button type="button" class="btn-crear" :disabled="creandoProyecto" @click="confirmarCreacion">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4 4L19 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  {{ creandoProyecto ? 'Creando...' : 'Crear proyecto' }}
                </button>
              </div>
            </div>
          </div>
        </aside>

      </div>

      <!-- MODAL DE CONFIRMACIÓN -->
      <div v-if="modal.visible" class="modal-fondo" @click.self="cerrarModal">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal-icono" :class="`modal-icono-${modal.tipo}`">
            <svg v-if="modal.tipo === 'salir'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 9v5M12 17.2v.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
            <svg v-else-if="modal.tipo === 'crear' || modal.tipo === 'exito'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 12l2.3 2.3 4.9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5v6M12 16.5v.1" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
          </div>
          <h3>{{ modal.titulo }}</h3>
          <p>{{ modal.mensaje }}</p>

          <div v-if="modal.tipo === 'salir'" class="modal-acciones">
            <button type="button" class="btn-modal-secundario" @click="cerrarModal">No, continuar</button>
            <button type="button" class="btn-modal-peligro" @click="salirSinGuardar">Sí, salir</button>
          </div>
          <div v-if="modal.tipo === 'crear'" class="modal-acciones">
            <button type="button" class="btn-modal-secundario" :disabled="creandoProyecto" @click="cerrarModal">Cancelar</button>
            <button type="button" class="btn-modal-crear" :disabled="creandoProyecto" @click="crearProyecto">{{ creandoProyecto ? 'Creando...' : 'Sí, crear proyecto' }}</button>
          </div>
          <div v-if="modal.tipo === 'exito'" class="modal-acciones">
            <button type="button" class="btn-modal-crear" @click="finalizarCreacion">Aceptar</button>
          </div>
          <div v-if="modal.tipo === 'error'" class="modal-acciones">
            <button type="button" class="btn-modal-secundario" @click="cerrarModal">Aceptar</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'

const router = useRouter()
const { modoOscuro } = useTema()

const usuariosRegistrados = ref([])

const obtenerNombreResponsableSesion = () => {
  try {
    const guardado = sessionStorage.getItem('usuario-plataforma')
    if (!guardado) return ''
    const usuario = JSON.parse(guardado)
    const nombreCompleto = [usuario?.nombre, usuario?.apellido].filter(Boolean).join(' ').trim()
    return nombreCompleto || usuario?.usuario || usuario?.correo || ''
  } catch (error) {
    return ''
  }
}

const proyecto = ref({
  nombre: '',
  responsable: '',
  colaboradores: [],
  convocatoria: '',
  periodo: '',
  estado: 'En captura'
})

const recursosHumanos = ref([])
const productosAcademicos = ref([])
const mensajeValidacion = ref('')
const creandoProyecto = ref(false)
const pasoActual = ref(1)

const modal = ref({ visible: false, tipo: '', titulo: '', mensaje: '' })

onMounted(async () => {
  if (proyecto.value.responsable.trim() === '') {
    proyecto.value.responsable = obtenerNombreResponsableSesion()
  }
  try {
    const res = await apiFetch('/usuarios/seleccionables')
    if (res.ok) {
      usuariosRegistrados.value = await res.json()
    }
  } catch (e) {
    console.warn("La lista de usuarios no se pudo cargar para autocompletar.", e)
  }
})

// Función para encontrar el ID del usuario al escribir su nombre
const buscarUsuario = (texto) => {
  if (!texto) return null;
  const t = texto.trim().toLowerCase();
  return usuariosRegistrados.value.find(u => {
    const nombreBase = u.nombre ? u.nombre.toLowerCase() : '';
    const apellidoBase = u.apellido ? u.apellido.toLowerCase() : '';
    const nombreCompleto = `${nombreBase} ${apellidoBase}`.trim();
    return (
      (u.correo && u.correo.toLowerCase() === t) ||
      nombreCompleto === t ||
      nombreBase === t
    )
  });
}

const datosGeneralesCompletos = computed(() => {
  return proyecto.value.nombre.trim() !== '' && proyecto.value.responsable.trim() !== '' && proyecto.value.convocatoria.trim() !== '' && proyecto.value.periodo.trim() !== ''
})

const colaboradoresConDatos = computed(() => {
  return proyecto.value.colaboradores.some(c => typeof c === 'string' && c.trim() !== '')
})

const recursosConDatos = computed(() => {
  return recursosHumanos.value.some(r => r.tipo.trim() !== '' || r.nombre.trim() !== '' || r.actividad.trim() !== '' || r.periodo.trim() !== '')
})

const productosConDatos = computed(() => {
  return productosAcademicos.value.some(p => p.tipo.trim() !== '' || p.nombre.trim() !== '' || p.donde.trim() !== '' || p.fechaEnvio !== '' || p.fechaPublicacion !== '')
})

const revisionDisponible = computed(() => datosGeneralesCompletos.value)

const hayDatosCapturados = computed(() => {
  return datosGeneralesCompletos.value || proyecto.value.colaboradores.length > 0 || recursosHumanos.value.length > 0 || productosAcademicos.value.length > 0
})

const irASeccion = (id, numeroPaso) => {
  pasoActual.value = numeroPaso
  const elemento = document.getElementById(id)
  if (elemento) elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const cerrarModal = () => { if (!creandoProyecto.value) modal.value.visible = false }

const intentarSalir = () => {
  if (creandoProyecto.value) return
  mensajeValidacion.value = ''
  if (!hayDatosCapturados.value) { router.push('/proyectos'); return }
  modal.value = { visible: true, tipo: 'salir', titulo: 'Datos sin guardar', mensaje: 'Se han capturado datos que todavía no se han guardado. ¿Deseas salir y descartar la información?' }
}

const salirSinGuardar = () => { cerrarModal(); router.push('/proyectos') }

const capitalizarPalabras = valor => {
  return String(valor || '').toLocaleLowerCase('es-MX').replace(/(^|[\s'’-])(\p{L})/gu, (_, separador, letra) => separador + letra.toLocaleUpperCase('es-MX'))
}

// ======================================
// ADAPTACIÓN AL FORMATO DE LA VERSIÓN 4
// ======================================
const agregarColaborador = () => { proyecto.value.colaboradores.push('') } // Se empuja un texto vacío, no un objeto
const eliminarColaborador = index => { proyecto.value.colaboradores.splice(index, 1) }

const agregarRecurso = () => { recursosHumanos.value.push({ id: `${Date.now()}-${Math.random()}`, tipo: '', nombre: '', actividad: '', periodo: '' }) }
const eliminarRecurso = index => { recursosHumanos.value.splice(index, 1) }

const agregarProducto = () => { productosAcademicos.value.push({ id: `${Date.now()}-${Math.random()}`, tipo: '', nombre: '', donde: '', fechaEnvio: '', fechaPublicacion: '', estado: 'En preparación' }) }
const eliminarProducto = index => { productosAcademicos.value.splice(index, 1) }

const validarFormulario = () => {
  mensajeValidacion.value = ''
  if (proyecto.value.nombre.trim() === '') { mensajeValidacion.value = 'Debes ingresar el nombre del proyecto.'; return false }
  if (proyecto.value.responsable.trim() === '') { mensajeValidacion.value = 'Debes ingresar el responsable del proyecto.'; return false }
  if (proyecto.value.convocatoria.trim() === '') { mensajeValidacion.value = 'Debes ingresar el nombre de la convocatoria.'; return false }
  if (proyecto.value.periodo.trim() === '') { mensajeValidacion.value = 'Debes ingresar el periodo del proyecto.'; return false }
  return true
}

const confirmarCreacion = () => {
  if (creandoProyecto.value) return
  if (!validarFormulario()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  modal.value = { visible: true, tipo: 'crear', titulo: 'Crear proyecto', mensaje: '¿Deseas crear el proyecto con los datos capturados?' }
}

const crearProyecto = async () => {
  if (creandoProyecto.value) return
  creandoProyecto.value = true

  try {
    // 1. COLABORADORES: Tomamos el texto, lo capitalizamos y buscamos el ID
    const colaboradoresLimpios = proyecto.value.colaboradores
      .filter(c => typeof c === 'string' && c.trim() !== '')
      .map(c => {
        const texto = capitalizarPalabras(c.trim())
        const match = buscarUsuario(texto)
        return match ? { id_usuario: match.id_usuario || match.id } : { nombre: texto }
      })

    // 2. RECURSOS HUMANOS: Igual, usamos el campo único de nombre
    const recursosLimpios = recursosHumanos.value
      .filter(r => r.tipo.trim() !== '' || r.nombre.trim() !== '' || r.actividad.trim() !== '' || r.periodo.trim() !== '')
      .map(r => {
        const texto = capitalizarPalabras(r.nombre.trim())
        const match = buscarUsuario(texto)
        return {
          id_usuario: match ? (match.id_usuario || match.id) : null,
          nombre: match ? null : texto,
          tipo: r.tipo.trim(),
          actividad: r.actividad.trim(),
          periodo: r.periodo.trim()
        }
      })

    const productosLimpios = productosAcademicos.value
      .filter(p => p.tipo.trim() !== '' || p.nombre.trim() !== '' || p.donde.trim() !== '' || p.fechaEnvio !== '' || p.fechaPublicacion !== '')
      .map(p => ({
        tipo: p.tipo.trim(),
        nombre: p.nombre.trim(),
        lugar: p.donde.trim(),
        fecha_envio: p.fechaEnvio || null,
        fecha_publicacion: p.fechaPublicacion || null,
        estado: p.estado
      }))

    const datosGenerales = {
      nombre_proyecto: proyecto.value.nombre.trim(),
      responsable: proyecto.value.responsable.trim(),
      nombre_convocatoria: proyecto.value.convocatoria.trim(),
      periodo: proyecto.value.periodo.trim()
    }

    const respuesta = await apiFetch('/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        generales: datosGenerales,
        colaboradores: colaboradoresLimpios,
        recursosHumanos: recursosLimpios,
        productos: productosLimpios
      })
    })

    const resultado = await respuesta.json()
    if (!respuesta.ok) throw new Error(resultado.mensaje || 'No fue posible crear el proyecto.')

    modal.value = { visible: true, tipo: 'exito', titulo: 'Proyecto creado', mensaje: 'El proyecto se ha creado correctamente y su estado inicial es "En captura".' }
  } catch (error) {
    modal.value = { visible: true, tipo: 'error', titulo: 'Error al crear proyecto', mensaje: error.message || 'No fue posible crear el proyecto.' }
  } finally {
    creandoProyecto.value = false
  }
}

const finalizarCreacion = () => {
  cerrarModal()
  router.push('/proyectos')
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
      circle at 5% 0%,
      rgba(219, 234, 254, 0.72),
      transparent 27%
    ),
    radial-gradient(
      circle at 95% 8%,
      rgba(219, 234, 254, 0.62),
      transparent 25%
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
  position: relative;
  isolation: isolate;

  display: grid;

  grid-template-columns:
    minmax(300px, 0.95fr)
    minmax(650px, 1.8fr);

  align-items: center;

  gap: 44px;

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

  width: 420px;
  height: 170px;

  top: -92px;
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

  width: 150px;
  height: 150px;

  right: -58px;
  bottom: -85px;

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


.subtitulo {
  margin: 0 0 3px;

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
  margin:
    7px
    0
    0;

  color: #5875a6;

  font-size: 14px;

  line-height: 1.5;
}



/* ========================================
   PASOS
======================================== */

.pasos {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
}


.paso {
  width: 112px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;

  padding: 0;

  background: transparent;

  border: none;

  color: #6782ad;

  cursor: pointer;

  font-family: inherit;
}


.paso-numero {
  position: relative;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      180deg,
      #e6eef9,
      #dce7f6
    );

  border:
    1px solid
    #d6e1ef;

  border-radius: 50%;

  color: #48658f;

  box-shadow:
    0 3px 8px
    rgba(
      48,
      88,
      146,
      0.08
    );

  font-size: 13px;
  font-weight: 750;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.paso:hover .paso-numero {
  transform:
    translateY(-2px);

  box-shadow:
    0 5px 12px
    rgba(
      48,
      88,
      146,
      0.12
    );
}


.paso-texto {
  color: #607ca9;

  font-size: 13px;
  font-weight: 550;

  line-height: 1.3;

  text-align: center;
}


.paso-actual .paso-numero {
  border-color: #79aaf0;

  box-shadow:
    0 0 0 4px
    rgba(
      30,
      111,
      240,
      0.08
    ),
    0 4px 11px
    rgba(
      48,
      88,
      146,
      0.10
    );
}


.paso-actual .paso-texto {
  color: #244e8a;

  font-weight: 700;
}


.paso-con-datos .paso-numero {
  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  border-color: #1569ee;

  color: white;

  box-shadow:
    0 5px 14px
    rgba(
      21,
      105,
      238,
      0.23
    );
}


.paso-con-datos .paso-texto {
  color: #0d2c68;

  font-weight: 700;
}


.paso-completo .paso-numero,
.paso-revision-lista .paso-numero {
  background:
    linear-gradient(
      135deg,
      #1474f3,
      #0759d8
    );
}


.paso-completo .paso-numero::after {
  content: '';

  position: absolute;

  right: -3px;
  bottom: -2px;

  width: 10px;
  height: 10px;

  background: #16a673;

  border:
    2px solid
    #f7faff;

  border-radius: 50%;
}


.paso-linea {
  flex: 1;

  min-width: 36px;
  max-width: 92px;

  height: 2px;

  margin-top: 16px;

  background:
    linear-gradient(
      90deg,
      #d5e1f1,
      #cbd9eb
    );

  border-radius: 20px;

  transition:
    background 0.25s ease,
    box-shadow 0.25s ease;
}


.paso-linea-activa {
  background:
    linear-gradient(
      90deg,
      #77abf3,
      #2a78eb
    );

  box-shadow:
    0 1px 5px
    rgba(
      42,
      120,
      235,
      0.16
    );
}





/* ========================================
   PASO 1: DATOS GENERALES
   El indicador permanece neutral hasta que
   los cuatro campos obligatorios estén completos.
======================================== */

.paso-datos-generales.paso-actual:not(.paso-completo) .paso-numero {
  background:
    linear-gradient(
      180deg,
      #e6eef9,
      #dce7f6
    );

  border-color:
    #d6e1ef;

  color:
    #48658f;

  box-shadow:
    0 4px 11px
    rgba(
      48,
      88,
      146,
      0.10
    );
}


.paso-datos-generales.paso-actual:not(.paso-completo) .paso-texto {
  color:
    #607ca9;

  font-weight:
    700;
}


.paso-datos-generales.paso-completo .paso-numero {
  background:
    linear-gradient(
      135deg,
      #1474f3,
      #0759d8
    );

  border-color:
    #1569ee;

  color:
    white;

  box-shadow:
    0 5px 14px
    rgba(
      21,
      105,
      238,
      0.23
    );
}


.paso-datos-generales.paso-completo .paso-texto {
  color:
    #0d2c68;

  font-weight:
    700;
}


/* ========================================
   VALIDACIÓN
======================================== */

.mensaje-validacion {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 18px;

  padding:
    13px
    15px;

  background: #fff4f4;

  border:
    1px solid
    #ffd3d3;

  border-left:
    4px solid
    #e54747;

  border-radius: 10px;

  color: #9f2727;

  box-shadow:
    0 4px 14px
    rgba(
      181,
      50,
      50,
      0.05
    );
}


.mensaje-validacion-icono {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffe0e0;

  border-radius: 50%;

  font-size: 16px;
  font-weight: 800;
}


.mensaje-validacion > div:last-child {
  display: flex;
  flex-direction: column;

  gap: 2px;
}


.mensaje-validacion strong {
  font-size: 14px;
}


.mensaje-validacion span {
  font-size: 13px;

  line-height: 1.4;
}



/* ========================================
   LAYOUT PRINCIPAL
======================================== */

.layout-principal {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    310px;

  align-items: start;

  gap: 22px;
}


.columna-principal {
  min-width: 0;
}


.columna-lateral {
  position: sticky;

  top: 18px;

  min-width: 0;
}



/* ========================================
   TARJETAS
======================================== */

.tarjeta {
  position: relative;

  margin-bottom: 16px;

  padding:
    20px
    20px
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

  border-radius: 13px;

  box-shadow:
    0 5px 20px
    rgba(
      48,
      84,
      137,
      0.045
    );

  scroll-margin-top: 20px;

  overflow: hidden;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}


.tarjeta:hover {
  border-color: #d2e0f1;

  box-shadow:
    0 8px 24px
    rgba(
      48,
      84,
      137,
      0.065
    );
}


.seccion-destacada {
  min-height: 250px;
}



/* ========================================
   ENCABEZADOS DE SECCIÓN
======================================== */

.encabezado-seccion,
.titulo-con-icono {
  display: flex;
  align-items: center;

  gap: 14px;
}


.encabezado-seccion {
  position: relative;

  z-index: 2;

  margin-bottom: 17px;
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
      #e6f1ff,
      #d7e9ff
    );

  border:
    1px solid
    #d7e7fb;

  border-radius: 10px;

  color: #1269ee;

  box-shadow:
    inset
    0 1px 0
    rgba(
      255,
      255,
      255,
      0.9
    );
}


.icono-seccion svg {
  width: 25px;
  height: 25px;
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

  color: #607ca9;

  font-size: 14px;

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
    16px
    18px;
}


.campo {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 7px;
}


.campo label {
  color: #4e6b99;

  font-size: 14px;
  font-weight: 600;
}


.obligatorio {
  color: #dc3f45;
}


.campos-obligatorios {
  position: relative;

  z-index: 2;

  margin:
    15px
    0
    0;

  color: #7388aa;

  font-size: 12.5px;
}


.campos-obligatorios span {
  color: #dc3f45;
}



/* ========================================
   CONTROLES
======================================== */

input,
select {
  width: 100%;
  min-width: 0;
  height: 42px;

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
  font-size: 14px;

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

  min-width: 0;
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
   ESTADO INICIAL
======================================== */

.estado-inicial {
  min-height: 42px;

  display: flex;
  align-items: center;

  gap: 8px;

  padding:
    0
    12px;

  background:
    linear-gradient(
      180deg,
      #f1f6fc,
      #edf3fa
    );

  border:
    1px solid
    #d4dfec;

  border-radius: 7px;

  color: #57739d;

  font-size: 14px;
  font-weight: 600;
}


.punto-estado {
  width: 8px;
  height: 8px;

  flex-shrink: 0;

  background: #6988b7;

  border-radius: 50%;
}


.ayuda-estado {
  color: #7890b4;

  font-size: 12px;

  line-height: 1.4;
}



/* ========================================
   DECORACIÓN DE DATOS GENERALES
======================================== */

.decoracion-datos {
  position: absolute;

  top: 0;
  right: 0;

  width: 240px;
  height: 105px;

  pointer-events: none;

  opacity: 0.72;
}


.onda {
  position: absolute;

  right: -45px;

  width: 230px;
  height: 85px;

  border-radius:
    0
    0
    0
    80px;

  transform:
    rotate(-5deg);
}


.onda-1 {
  top: -40px;

  background:
    rgba(
      228,
      239,
      255,
      0.62
    );
}


.onda-2 {
  top: -22px;
  right: -75px;

  background:
    rgba(
      211,
      229,
      255,
      0.55
    );
}


.onda-3 {
  top: -2px;
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
   TÍTULOS DE SECCIÓN
======================================== */

.titulo-seccion {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 18px;

  margin-bottom: 13px;
}



/* ========================================
   BOTÓN AGREGAR
======================================== */

.btn-agregar {
  min-height: 40px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    16px;

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
      0.17
    );

  font-family: inherit;
  font-size: 13.5px;
  font-weight: 650;

  white-space: nowrap;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}


.btn-agregar svg {
  width: 17px;
  height: 17px;
}


.btn-agregar:hover {
  transform:
    translateY(-1px);

  box-shadow:
    0 7px 16px
    rgba(
      17,
      103,
      235,
      0.24
    );
}



/* ========================================
   COLABORADORES
======================================== */

.vacio-colaboradores {
  min-height: 96px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding:
    13px
    18px;

  background:
    linear-gradient(
      180deg,
      #fbfdff,
      #f9fbfe
    );

  border:
    1px dashed
    #bfd2eb;

  border-radius: 9px;

  text-align: center;
}


.grupo-avatares {
  display: flex;
  align-items: center;

  margin-bottom: 7px;
}


.avatar-vacio {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: -5px;

  background: #e7f0fd;

  border:
    3px solid
    white;

  border-radius: 50%;

  color: #98b9e7;
}


.avatar-vacio:first-child {
  margin-left: 0;
}


.avatar-vacio svg {
  width: 20px;
  height: 20px;
}


.avatar-vacio-principal {
  width: 42px;
  height: 42px;

  z-index: 2;

  background: #dbeaff;

  color: #176ef1;

  box-shadow:
    0 3px 10px
    rgba(
      23,
      110,
      241,
      0.12
    );
}


.avatar-vacio-principal svg {
  width: 24px;
  height: 24px;
}


.vacio-colaboradores strong {
  color: #17315d;

  font-size: 13px;
  font-weight: 700;
}


.vacio-colaboradores > span {
  margin-top: 2px;

  color: #7187ab;

  font-size: 12.5px;
}


.lista-colaboradores {
  display: flex;
  flex-direction: column;

  gap: 9px;
}


.fila-colaborador {
  display: grid;

  grid-template-columns:
    34px
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 10px;

  padding:
    8px
    10px;

  background: #fbfdff;

  border:
    1px solid
    #e0e9f5;

  border-radius: 9px;
}


.numero-elemento {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e7f1ff;

  border-radius: 50%;

  color: #1768df;

  font-size: 13px;
  font-weight: 700;
}


.colaborador-control input {
  height: 40px;
}



/* ========================================
   BOTÓN ELIMINAR
======================================== */

.btn-eliminar {
  min-height: 36px;

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
    #f0c5c9;

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


.btn-eliminar:hover {
  background: #fff4f5;

  border-color: #e7aeb4;

  transform:
    translateY(-1px);
}



/* ========================================
   TABLAS
======================================== */

.tabla-contenedor {
  width: 100%;

  overflow-x: auto;

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

  font-size: 12.5px;
  font-weight: 720;

  white-space: nowrap;
}


td {
  color: #17315d;

  font-size: 13px;

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

  font-size: 14px;
}


.btn-eliminar-tabla {
  min-height: 34px;
}



/* ========================================
   VACÍOS EN TABLA
======================================== */

.vacio-tabla {
  padding:
    17px
    20px;

  color: #6e85aa;

  text-align: center;
}


.vacio-tabla-contenido {
  display: inline-flex;
  align-items: center;

  gap: 9px;

  font-size: 14px;
}


.vacio-tabla-contenido svg {
  width: 20px;
  height: 20px;

  color: #86a3cc;
}



/* ========================================
   TARJETAS MÓVILES
======================================== */

.recursos-movil,
.productos-movil {
  display: none;
}


.tarjeta-movil {
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
   RESUMEN LATERAL
======================================== */

.resumen-proyecto {
  padding:
    18px
    16px;

  background:
    rgba(
      255,
      255,
      255,
      0.95
    );

  border:
    1px solid
    #dce6f3;

  border-radius: 13px;

  box-shadow:
    0 7px 24px
    rgba(
      45,
      83,
      137,
      0.055
    );
}


.resumen-encabezado {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  margin-bottom: 17px;
}


.icono-resumen {
  width: 41px;
  height: 41px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      145deg,
      #e6f1ff,
      #d9eaff
    );

  border-radius: 9px;

  color: #1268ee;
}


.icono-resumen svg {
  width: 23px;
  height: 23px;
}


.resumen-encabezado h2 {
  margin: 0;

  color: #0a2058;

  font-size: 16px;
  font-weight: 740;
}


.resumen-encabezado p {
  margin:
    4px
    0
    0;

  color: #6b82a8;

  font-size: 12.5px;

  line-height: 1.45;
}


.resumen-lista {
  display: flex;
  flex-direction: column;

  gap: 7px;
}


.resumen-item {
  display: flex;
  align-items: center;

  gap: 10px;

  min-height: 48px;

  padding:
    8px
    9px;

  border-radius: 8px;

  transition:
    background 0.2s ease;
}


.resumen-item:hover {
  background: #f6f9fd;
}


.resumen-item-icono {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #6484b2;
}


.resumen-item-icono svg {
  width: 20px;
  height: 20px;
}


.resumen-item-contenido {
  min-width: 0;

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
}


.resumen-item-contenido > span {
  color: #56729d;

  font-size: 14px;
}


.resumen-item-contenido > strong {
  color: #16305e;

  font-size: 13px;
  font-weight: 700;
}


.estado-resumen {
  display: inline-flex !important;
  align-items: center;

  gap: 6px;

  padding:
    5px
    9px;

  background: #e8f1fb;

  border-radius: 20px;

  color: #4d6d99 !important;

  font-size: 12px !important;
  font-weight: 600 !important;

  white-space: nowrap;
}


.estado-resumen .punto-estado {
  width: 7px;
  height: 7px;
}


.resumen-separador {
  height: 1px;

  margin:
    14px
    0;

  background: #e2e9f3;
}


.consejo {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  padding:
    13px;

  background:
    linear-gradient(
      135deg,
      #edf5ff,
      #e3efff
    );

  border:
    1px solid
    #d8e8fb;

  border-radius: 9px;
}


.icono-consejo {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  color: #1169ed;
}


.icono-consejo svg {
  width: 100%;
  height: 100%;
}


.consejo strong {
  color: #125ed0;

  font-size: 14px;
}


.consejo p {
  margin:
    3px
    0
    0;

  color: #5d78a4;

  font-size: 12px;

  line-height: 1.5;
}



/* ========================================
   DECORACIÓN LATERAL
======================================== */

.decoracion-lateral {
  position: relative;
  isolation: isolate;

  min-height: 485px;

  margin-top: 18px;

  overflow: hidden;

  border:
    1px solid
    #d7e6f8;

  border-radius: 14px;

  background:
    radial-gradient(
      circle at 82% 15%,
      rgba(255, 255, 255, 0.82),
      transparent 25%
    ),
    radial-gradient(
      circle at 7% 64%,
      rgba(185, 215, 252, 0.28),
      transparent 37%
    ),
    linear-gradient(
      145deg,
      #f1f7ff 0%,
      #e6f1ff 56%,
      #dcecff 100%
    );

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.82
    ),
    0 8px 24px
    rgba(
      48,
      84,
      137,
      0.06
    );

  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}


.decoracion-lateral:hover {
  transform:
    translateY(-2px);

  border-color:
    #cadff7;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.90
    ),
    0 13px 30px
    rgba(
      48,
      84,
      137,
      0.09
    );
}


.decoracion-lateral::before {
  content: '';

  position: absolute;
  z-index: 0;

  width: 230px;
  height: 150px;

  top: -55px;
  right: -70px;

  background:
    rgba(
      255,
      255,
      255,
      0.48
    );

  border-radius:
    0
    0
    0
    130px;

  transform:
    rotate(-8deg);

  pointer-events: none;
}


.decoracion-lateral::after {
  content: '';

  position: absolute;
  z-index: 0;

  width: 185px;
  height: 185px;

  left: -86px;
  bottom: 90px;

  background:
    radial-gradient(
      circle,
      rgba(122, 169, 235, 0.14),
      transparent 68%
    );

  border-radius: 50%;

  pointer-events: none;
}


.decoracion-lateral-grafica {
  position: absolute;
  z-index: 1;

  top: 0;
  right: 0;
  bottom: 132px;
  left: 0;

  overflow: hidden;

  pointer-events: none;
}


.decoracion-lateral-grafica::before {
  content: '';

  position: absolute;
  z-index: 0;

  width: 250px;
  height: 125px;

  top: -52px;
  right: -72px;

  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.62),
      rgba(219, 235, 255, 0.13)
    );

  border-radius:
    0
    0
    0
    120px;

  transform:
    rotate(-8deg);
}


.decoracion-mensaje {
  position: absolute;
  z-index: 4;

  top: 30px;
  left: 28px;

  width: 185px;
}


.decoracion-etiqueta {
  display: inline-flex;
  align-items: center;

  min-height: 22px;

  padding:
    0
    8px;

  margin-bottom: 8px;

  background:
    rgba(
      255,
      255,
      255,
      0.68
    );

  border:
    1px solid
    rgba(
      162,
      195,
      237,
      0.40
    );

  border-radius: 999px;

  color:
    #5f82b4;

  font-size: 8px;
  font-weight: 800;

  letter-spacing: 0.12em;

  box-shadow:
    0 3px 9px
    rgba(
      55,
      99,
      157,
      0.05
    );
}


.decoracion-lateral-grafica p {
  margin: 0;

  color:
    #315e9f;

  font-size: 15px;
  font-style: italic;
  font-weight: 680;

  line-height: 1.5;

  letter-spacing: 0.1px;

  text-shadow:
    0 1px 0
    rgba(
      255,
      255,
      255,
      0.82
    );
}


.linea-decorativa {
  display: block;

  width: 42px;
  height: 4px;

  margin-top: 10px;

  background:
    linear-gradient(
      90deg,
      #1971ef,
      #5b9cf5
    );

  border-radius: 20px;

  box-shadow:
    0 2px 6px
    rgba(
      25,
      113,
      239,
      0.16
    );
}


.decoracion-punto {
  position: absolute;
  z-index: 3;

  display: block;

  border-radius: 50%;

  background:
    rgba(
      83,
      142,
      221,
      0.45
    );
}


.decoracion-punto-1 {
  width: 8px;
  height: 8px;

  top: 32px;
  right: 27px;
}


.decoracion-punto-2 {
  width: 4px;
  height: 4px;

  top: 53px;
  right: 44px;
}


.decoracion-punto-3 {
  width: 6px;
  height: 6px;

  top: 72px;
  right: 22px;

  opacity: 0.60;
}


.montanas-laterales {
  position: absolute;

  right: -18px;
  bottom: -5px;

  width: 116%;
  height: auto;

  filter:
    drop-shadow(
      0 10px 16px
      rgba(
        83,
        135,
        209,
        0.08
      )
    );
}


.bandera-cima {
  transform-origin:
    250px
    78px;

  animation:
    banderaSuave
    4.8s
    ease-in-out
    infinite;
}


.meta-punto {
  animation:
    metaPulso
    2.8s
    ease-in-out
    infinite;
}


@keyframes banderaSuave {

  0%,
  100% {
    transform:
      rotate(0deg);
  }

  50% {
    transform:
      rotate(1.2deg);
  }

}


@keyframes metaPulso {

  0%,
  100% {
    opacity: 0.72;
  }

  50% {
    opacity: 1;
  }

}


/* ========================================
   ACCIONES FINALES
======================================== */

.acciones-finales {
  scroll-margin-top: 20px;
}


.acciones-finales-lateral {
  position: absolute;

  z-index: 5;

  right: 12px;
  bottom: 12px;
  left: 12px;

  display: flex;
  flex-direction: column;

  gap: 12px;

  padding:
    14px;

  background:
    rgba(
      255,
      255,
      255,
      0.98
    );

  border:
    1px solid
    #c8d9ee;

  border-radius: 11px;

  box-shadow:
    0 9px 24px
    rgba(
      43,
      82,
      140,
      0.12
    );

  backdrop-filter:
    blur(5px);
}


.acciones-finales-texto {
  display: flex;
  flex-direction: column;

  gap: 3px;
}


.acciones-finales-texto strong {
  color: #0c275a;

  font-size: 14px;
}


.acciones-finales-texto span {
  color: #6d84a8;

  font-size: 12.5px;
}


.acciones-finales-botones {
  display: grid;

  grid-template-columns:
    minmax(0, 0.8fr)
    minmax(0, 1.25fr);

  gap: 9px;
}


.btn-crear,
.btn-cancelar {
  min-height: 42px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  padding:
    0
    18px;

  border-radius: 7px;

  font-family: inherit;
  font-size: 13.5px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}


.btn-crear {
  background:
    linear-gradient(
      135deg,
      #1974f6,
      #075ee9
    );

  color: white;

  border: none;

  box-shadow:
    0 5px 13px
    rgba(
      17,
      103,
      235,
      0.18
    );
}


.btn-crear svg {
  width: 18px;
  height: 18px;
}


.btn-crear:hover:not(:disabled) {
  transform:
    translateY(-1px);

  box-shadow:
    0 7px 17px
    rgba(
      17,
      103,
      235,
      0.25
    );
}


.btn-cancelar {
  background: white;

  color: #355782;

  border:
    1px solid
    #c9d7e8;
}


.btn-cancelar:hover {
  background: #f5f8fc;

  transform:
    translateY(-1px);
}



/* ========================================
   BOTONES DESHABILITADOS
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
  max-width: 440px;

  max-height:
    calc(
      100vh - 40px
    );

  overflow-y: auto;

  padding:
    27px
    27px
    24px;

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
  background: #fff2df;
  color: #d68115;
}


.modal-icono-crear,
.modal-icono-exito {
  background: #e3f5ed;
  color: #0d9368;
}


.modal-icono-error {
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


.modal p {
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


.btn-modal-secundario,
.btn-modal-crear,
.btn-modal-peligro {
  min-height: 40px;

  padding:
    0
    16px;

  border-radius: 7px;

  font-family: inherit;
  font-size: 13.5px;
  font-weight: 650;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
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


.btn-modal-crear {
  background:
    linear-gradient(
      135deg,
      #1974f6,
      #075ee9
    );

  color: white;

  border: none;

  box-shadow:
    0 5px 12px
    rgba(
      17,
      103,
      235,
      0.18
    );
}


.btn-modal-crear:hover:not(:disabled) {
  transform:
    translateY(-1px);
}


.btn-modal-peligro {
  background: #dd3c49;

  color: white;

  border: none;
}


.btn-modal-peligro:hover {
  background: #c82f3d;

  transform:
    translateY(-1px);
}



/* ========================================
   PC MEDIANA
======================================== */

@media (max-width: 1300px) {

  .cabecera-pagina {
    grid-template-columns:
      minmax(280px, 0.85fr)
      minmax(620px, 1.65fr);

    gap: 28px;
  }


  .layout-principal {
    grid-template-columns:
      minmax(0, 1fr)
      280px;
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
      24px
      20px
      36px;
  }


  .cabecera-pagina {
    grid-template-columns:
      1fr;

    gap: 22px;
  }


  .pasos {
    justify-content: flex-start;

    overflow-x: auto;

    padding-bottom: 6px;

    -webkit-overflow-scrolling:
      touch;
  }


  .paso {
    flex-shrink: 0;
  }


  .paso-linea {
    flex:
      0
      0
      45px;
  }


  .layout-principal {
    grid-template-columns:
      1fr;
  }


  .columna-lateral {
    position: static;

    display: grid;

    grid-template-columns:
      1fr
      1fr;

    gap: 16px;
  }


  .decoracion-lateral {
    min-height: 430px;

    margin-top: 0;
  }


  .datos-generales {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}



/* ========================================
   CELULAR
======================================== */

@media (max-width: 700px) {

  .pagina {
    padding:
      18px
      13px
      28px;
  }


  .cabecera-pagina {
    margin-bottom: 17px;
  }


  .cabecera-pagina h1 {
    font-size: 29px;
  }


  .descripcion {
    font-size: 13px;
  }


  .pasos {
    gap: 0;
  }


  .paso {
    width: 92px;
  }


  .paso-numero {
    width: 31px;
    height: 31px;
  }


  .paso-texto {
    font-size: 10.5px;
  }


  .paso-linea {
    flex-basis: 28px;

    min-width: 28px;
  }


  .tarjeta {
    padding:
      17px
      14px;

    border-radius: 11px;
  }


  .datos-generales {
    grid-template-columns:
      1fr;

    gap: 15px;
  }


  .decoracion-datos {
    display: none;
  }


  .titulo-seccion {
    flex-direction: column;

    align-items: stretch;

    gap: 13px;
  }


  .titulo-con-icono {
    align-items: flex-start;
  }


  .btn-agregar {
    width: 100%;

    min-height: 46px;

    font-size: 14px;
  }


  input,
  select {
    min-height: 46px;

    font-size: 16px;
  }


  .estado-inicial {
    min-height: 46px;

    font-size: 14px;
  }


  .campo label {
    font-size: 13px;
  }


  .fila-colaborador {
    grid-template-columns:
      34px
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


  .columna-lateral {
    grid-template-columns:
      1fr;
  }


  .decoracion-lateral {
    min-height: 0;

    margin-top: 0;

    overflow: visible;

    background: transparent;
  }


  .decoracion-lateral-grafica,
  .decoracion-lateral::before {
    display: none;
  }


  .acciones-finales-lateral {
    position: relative;

    inset: auto;

    width: 100%;

    padding: 15px;

    background: white;
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


  .btn-crear,
  .btn-cancelar {
    width: 100%;

    min-height: 47px;

    font-size: 14px;
  }


  .modal-fondo {
    padding: 14px;
  }


  .modal {
    max-width: 100%;

    padding:
      24px
      18px
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
      15px
      10px
      24px;
  }


  .cabecera-pagina h1 {
    font-size: 26px;
  }


  .pasos {
    padding-bottom: 8px;
  }


  .tarjeta {
    padding:
      15px
      12px;
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


  .resumen-proyecto {
    padding:
      16px
      13px;
  }


  .modal {
    padding:
      22px
      16px
      18px;
  }

}




/* ========================================
   MODO OSCURO - BASE GENERAL
======================================== */

.pagina.modo-oscuro {
  --azul-principal: #5b9cff;
  --azul-profundo: #dbeafe;
  --azul-suave: #16243d;
  --borde-suave: #293955;

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



/* ========================================
   CABECERA
======================================== */

.modo-oscuro .subtitulo {
  color: #91a8cb;
}


.modo-oscuro .cabecera-pagina h1 {
  color: #f1f5ff;

  text-shadow:
    0 4px 18px
    rgba(
      0,
      0,
      0,
      0.24
    );
}


.modo-oscuro .descripcion {
  color: #9eb2d4;
}


.modo-oscuro .btn-regresar {
  background:
    linear-gradient(
      135deg,
      #1a2a42,
      #213957
    );

  color: #8fbcff;

  border-color: #3a5679;

  box-shadow:
    0 4px 12px
    rgba(
      0,
      0,
      0,
      0.16
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

  border-color: #2d7cf4;

  box-shadow:
    0 7px 17px
    rgba(
      14,
      91,
      208,
      0.30
    );
}



/* ========================================
   PASOS DEL REGISTRO
======================================== */

.modo-oscuro .paso {
  color: #8397b7;
}


.modo-oscuro .paso-numero {
  background:
    linear-gradient(
      180deg,
      #26354b,
      #202e43
    );

  border-color: #354760;

  color: #9db1cf;

  box-shadow:
    0 3px 8px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .paso:hover .paso-numero {
  box-shadow:
    0 5px 12px
    rgba(
      0,
      0,
      0,
      0.24
    );
}


.modo-oscuro .paso-texto {
  color: #91a5c4;
}


.modo-oscuro .paso-actual .paso-numero {
  border-color: #6d9ee5;

  box-shadow:
    0 0 0 4px rgba(69, 132, 226, 0.13),
    0 4px 11px rgba(0, 0, 0, 0.18);
}


.modo-oscuro .paso-actual .paso-texto {
  color: #b9d2f5;
}


.modo-oscuro .paso-con-datos .paso-numero,
.modo-oscuro .paso-completo .paso-numero,
.modo-oscuro .paso-revision-lista .paso-numero {
  background:
    linear-gradient(
      135deg,
      #3281ef,
      #0d63dd
    );

  border-color: #3b87f0;

  color: white;

  box-shadow:
    0 5px 14px
    rgba(
      4,
      70,
      165,
      0.30
    );
}


.modo-oscuro .paso-con-datos .paso-texto {
  color: #c1d8f8;
}


.modo-oscuro .paso-completo .paso-numero::after {
  background: #24b984;

  border-color: #111b2d;

  box-shadow:
    0 0 7px
    rgba(
      36,
      185,
      132,
      0.34
    );
}


.modo-oscuro .paso-linea {
  background:
    linear-gradient(
      90deg,
      #34465f,
      #2b3d55
    );
}


.modo-oscuro .paso-linea-activa {
  background:
    linear-gradient(
      90deg,
      #5d91da,
      #2d79e5
    );

  box-shadow:
    0 1px 7px
    rgba(
      45,
      121,
      229,
      0.24
    );
}



/* ========================================
   MENSAJE DE VALIDACIÓN
======================================== */

.modo-oscuro .mensaje-validacion {
  background:
    linear-gradient(
      135deg,
      #35232a,
      #2c2028
    );

  border-color: #603742;
  border-left-color: #ee6470;

  color: #f2b5bb;

  box-shadow:
    0 5px 16px
    rgba(
      0,
      0,
      0,
      0.16
    );
}


.modo-oscuro .mensaje-validacion-icono {
  background: #62303a;

  color: #ffd2d6;
}



/* ========================================
   TARJETAS PRINCIPALES
======================================== */

.modo-oscuro .tarjeta {
  background:
    radial-gradient(
      circle at 96% 3%,
      rgba(61, 100, 154, 0.08),
      transparent 24%
    ),
    rgba(
      24,
      36,
      55,
      0.97
    );

  border-color: #2c3c55;

  box-shadow:
    0 8px 24px
    rgba(
      0,
      0,
      0,
      0.14
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.02
    );
}


.modo-oscuro .tarjeta:hover {
  border-color: #3a506e;

  box-shadow:
    0 11px 30px
    rgba(
      0,
      0,
      0,
      0.20
    );
}



/* ========================================
   ENCABEZADOS E ICONOS DE SECCIÓN
======================================== */

.modo-oscuro .icono-seccion,
.modo-oscuro .icono-resumen {
  background:
    linear-gradient(
      145deg,
      #203654,
      #29486f
    );

  border-color: #355778;

  color: #69a6ff;

  box-shadow:
    0 6px 15px
    rgba(
      0,
      0,
      0,
      0.12
    ),
    inset 0 1px 0
    rgba(
      194,
      219,
      250,
      0.06
    );
}


.modo-oscuro .encabezado-seccion h2,
.modo-oscuro .titulo-seccion h2 {
  color: #edf4ff;
}


.modo-oscuro .encabezado-seccion p,
.modo-oscuro .titulo-seccion p {
  color: #97aaca;
}



/* ========================================
   CAMPOS Y CONTROLES
======================================== */

.modo-oscuro .campo label {
  color: #b0c0da;
}


.modo-oscuro .campos-obligatorios {
  color: #8fa4c4;
}


.modo-oscuro input,
.modo-oscuro select {
  background:
    rgba(
      16,
      27,
      44,
      0.98
    );

  border-color: #3a4d68;

  color: #e7effa;

  color-scheme: dark;

  box-shadow:
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.018
    );
}


.modo-oscuro input::placeholder {
  color: #7488a8;
}


.modo-oscuro input:hover,
.modo-oscuro select:hover {
  border-color: #506885;
}


.modo-oscuro input:focus,
.modo-oscuro select:focus {
  background: #132039;

  border-color: #5594f1;

  box-shadow:
    0 0 0 3px rgba(77, 145, 239, 0.13),
    0 4px 12px rgba(0, 0, 0, 0.10);
}


.modo-oscuro .control-con-icono > svg {
  color: #8198bc;
}



/* ========================================
   ESTADO INICIAL
======================================== */

.modo-oscuro .estado-inicial {
  background:
    linear-gradient(
      180deg,
      #1e2d43,
      #1a293e
    );

  border-color: #34475f;

  color: #a5b8d5;
}


.modo-oscuro .punto-estado {
  background: #77a7e8;

  box-shadow:
    0 0 7px
    rgba(
      119,
      167,
      232,
      0.24
    );
}


.modo-oscuro .ayuda-estado {
  color: #879cbc;
}



/* ========================================
   DECORACIÓN DE DATOS GENERALES
   Conservamos las tres capas visibles
======================================== */

.modo-oscuro .decoracion-datos {
  opacity: 0.92;

  filter:
    drop-shadow(
      0 8px 15px
      rgba(
        0,
        0,
        0,
        0.08
      )
    );
}


.modo-oscuro .onda-1 {
  background:
    rgba(
      70,
      101,
      145,
      0.28
    );

  box-shadow:
    inset 0 1px 0
    rgba(
      169,
      199,
      239,
      0.05
    );
}


.modo-oscuro .onda-2 {
  background:
    rgba(
      58,
      92,
      139,
      0.34
    );
}


.modo-oscuro .onda-3 {
  background:
    rgba(
      49,
      88,
      138,
      0.38
    );

  box-shadow:
    0 0 18px
    rgba(
      53,
      104,
      169,
      0.08
    );
}



/* ========================================
   BOTONES
======================================== */

.modo-oscuro .btn-agregar,
.modo-oscuro .btn-crear,
.modo-oscuro .btn-modal-crear {
  background:
    linear-gradient(
      135deg,
      #247cff,
      #0960eb
    );

  color: white;

  box-shadow:
    0 6px 16px
    rgba(
      7,
      81,
      191,
      0.28
    );
}


.modo-oscuro .btn-agregar:hover,
.modo-oscuro .btn-crear:hover:not(:disabled),
.modo-oscuro .btn-modal-crear:hover:not(:disabled) {
  box-shadow:
    0 8px 20px
    rgba(
      7,
      81,
      191,
      0.36
    );
}


.modo-oscuro .btn-cancelar,
.modo-oscuro .btn-modal-secundario {
  background: #19273b;

  color: #a9c6ef;

  border-color: #3b526e;
}


.modo-oscuro .btn-cancelar:hover,
.modo-oscuro .btn-modal-secundario:hover:not(:disabled) {
  background: #23344c;

  border-color: #54749b;
}


.modo-oscuro .btn-eliminar {
  background: #251d28;

  color: #f28b96;

  border-color: #623a43;
}


.modo-oscuro .btn-eliminar:hover {
  background: #38232a;

  border-color: #80505a;
}



/* ========================================
   COLABORADORES Y ESTADOS VACÍOS
======================================== */

.modo-oscuro .vacio-colaboradores,
.modo-oscuro .vacio-movil {
  background:
    linear-gradient(
      180deg,
      #172438,
      #152135
    );

  border-color: #3c526f;

  color: #91a6c5;
}


.modo-oscuro .avatar-vacio {
  background: #21344f;

  border-color: #172338;

  color: #7798c7;
}


.modo-oscuro .avatar-vacio-principal {
  background:
    linear-gradient(
      145deg,
      #234466,
      #285381
    );

  color: #79adf7;

  box-shadow:
    0 3px 11px
    rgba(
      0,
      0,
      0,
      0.18
    );
}


.modo-oscuro .vacio-colaboradores strong {
  color: #dbe8f8;
}


.modo-oscuro .vacio-colaboradores > span {
  color: #8fa4c4;
}


.modo-oscuro .fila-colaborador {
  background:
    linear-gradient(
      180deg,
      #18263a,
      #162337
    );

  border-color: #2f415a;
}


.modo-oscuro .numero-elemento {
  background: #223b5d;

  color: #7eb0f4;

  box-shadow:
    inset 0 0 0 1px
    rgba(
      132,
      178,
      238,
      0.06
    );
}



/* ========================================
   TABLAS
======================================== */

.modo-oscuro .tabla-contenedor {
  background: #111b2c;

  border-color: #2c3a50;

  box-shadow:
    0 5px 15px
    rgba(
      0,
      0,
      0,
      0.15
    );
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
}


.modo-oscuro td {
  color: #cedaeb;

  border-bottom-color: #29364a;
}


.modo-oscuro tbody tr:not(:has(.vacio-tabla)):hover {
  background:
    linear-gradient(
      90deg,
      #18253a,
      #1a2940
    );
}


.modo-oscuro .vacio-tabla {
  color: #91a6c6;
}


.modo-oscuro .vacio-tabla-contenido svg {
  color: #7194c6;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar {
  height: 8px;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-track {
  background: #172236;

  border-radius: 20px;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb {
  background: #43556f;

  border-radius: 20px;
}


.modo-oscuro .tabla-contenedor::-webkit-scrollbar-thumb:hover {
  background: #566b88;
}



/* ========================================
   TARJETAS MÓVILES
======================================== */

.modo-oscuro .tarjeta-movil {
  background:
    linear-gradient(
      180deg,
      #18263a,
      #162337
    );

  border-color: #2e4058;

  box-shadow:
    0 6px 18px
    rgba(
      0,
      0,
      0,
      0.15
    );
}


.modo-oscuro .encabezado-tarjeta-movil {
  border-bottom-color: #2c3b51;
}


.modo-oscuro .encabezado-tarjeta-movil h3 {
  color: #edf4ff;
}



/* ========================================
   RESUMEN LATERAL
======================================== */

.modo-oscuro .resumen-proyecto {
  background:
    radial-gradient(
      circle at 92% 4%,
      rgba(61, 100, 154, 0.08),
      transparent 26%
    ),
    rgba(
      24,
      36,
      55,
      0.96
    );

  border-color: #2d3e56;

  box-shadow:
    0 9px 26px
    rgba(
      0,
      0,
      0,
      0.16
    );
}


.modo-oscuro .resumen-encabezado h2 {
  color: #edf4ff;
}


.modo-oscuro .resumen-encabezado p {
  color: #94a9c8;
}


.modo-oscuro .resumen-item:hover {
  background: #1d2d43;
}


.modo-oscuro .resumen-item-icono {
  color: #7fa3d5;
}


.modo-oscuro .resumen-item-contenido > span {
  color: #a2b5d2;
}


.modo-oscuro .resumen-item-contenido > strong {
  color: #e1ebf8;
}


.modo-oscuro .estado-resumen {
  background: #223650;

  color: #a9c6ee !important;

  border:
    1px solid
    rgba(
      107,
      151,
      210,
      0.14
    );
}


.modo-oscuro .resumen-separador {
  background: #2c3a50;
}


.modo-oscuro .consejo {
  background:
    radial-gradient(
      circle at 90% 10%,
      rgba(83, 137, 207, 0.13),
      transparent 34%
    ),
    linear-gradient(
      135deg,
      #1c304a,
      #203b5c
    );

  border-color: #355374;

  box-shadow:
    inset 0 1px 0
    rgba(
      184,
      211,
      245,
      0.05
    );
}


.modo-oscuro .icono-consejo {
  color: #75aaff;

  filter:
    drop-shadow(
      0 3px 6px
      rgba(
        37,
        103,
        198,
        0.18
      )
    );
}


.modo-oscuro .consejo strong {
  color: #83b5ff;
}


.modo-oscuro .consejo p {
  color: #a3b6d3;
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


.modo-oscuro .paso-datos-generales.paso-actual:not(.paso-completo) .paso-numero {
  background:
    linear-gradient(
      180deg,
      #26364d,
      #223248
    );

  border-color:
    #3b506d;

  color:
    #9db3d1;

  box-shadow:
    0 4px 11px
    rgba(
      0,
      0,
      0,
      0.12
    );
}


.modo-oscuro .paso-datos-generales.paso-actual:not(.paso-completo) .paso-texto {
  color:
    #9fb2ce;
}


/* ========================================
   DECORACIÓN LATERAL EN MODO OSCURO
======================================== */

.modo-oscuro .decoracion-lateral {
  background:
    radial-gradient(
      circle at 76% 15%,
      rgba(111, 157, 217, 0.12),
      transparent 25%
    ),
    radial-gradient(
      circle at 10% 70%,
      rgba(51, 100, 164, 0.10),
      transparent 35%
    ),
    linear-gradient(
      145deg,
      rgba(28, 45, 69, 0.88),
      rgba(25, 48, 78, 0.94)
    );

  border-color:
    rgba(
      68,
      94,
      130,
      0.55
    );

  box-shadow:
    inset 0 1px 0
    rgba(
      184,
      211,
      245,
      0.035
    ),
    0 9px 25px
    rgba(
      0,
      0,
      0,
      0.10
    );
}


.modo-oscuro .decoracion-lateral:hover {
  border-color:
    #45668e;

  box-shadow:
    0 14px 30px
    rgba(
      0,
      0,
      0,
      0.22
    );
}


.modo-oscuro .decoracion-lateral::before,
.modo-oscuro .decoracion-lateral-grafica::before {
  background:
    linear-gradient(
      135deg,
      rgba(106, 147, 203, 0.13),
      rgba(72, 115, 172, 0.05)
    );
}


.modo-oscuro .decoracion-lateral::after {
  background:
    radial-gradient(
      circle,
      rgba(74, 127, 198, 0.15),
      transparent 68%
    );
}


.modo-oscuro .decoracion-etiqueta {
  color:
    #9dbbe2;

  background:
    rgba(
      31,
      51,
      79,
      0.64
    );

  border-color:
    rgba(
      92,
      132,
      182,
      0.34
    );
}


.modo-oscuro .decoracion-lateral-grafica p {
  color: #b4cef2;

  text-shadow:
    0 1px 0 rgba(7, 18, 34, 0.70),
    0 5px 12px rgba(0, 0, 0, 0.18);
}


.modo-oscuro .linea-decorativa {
  background:
    linear-gradient(
      90deg,
      #4e9aff,
      #70b2ff
    );

  box-shadow:
    0 0 10px
    rgba(
      78,
      154,
      255,
      0.20
    );
}


.modo-oscuro .decoracion-punto {
  background:
    rgba(
      113,
      164,
      228,
      0.46
    );
}


.modo-oscuro .montanas-laterales {
  opacity: 1;

  filter:
    saturate(1.04)
    brightness(0.90)
    drop-shadow(
      0 12px 18px
      rgba(
        0,
        0,
        0,
        0.20
      )
    );
}


.modo-oscuro .decor-cielo {
  fill:
    #19304e;

  opacity:
    0.70;
}


.modo-oscuro .decor-sol {
  fill:
    #769fd5;
}


.modo-oscuro .decor-destello {
  fill:
    #79a8e6;
}


.modo-oscuro .decor-nubes {
  opacity:
    0.18;
}


.modo-oscuro .decor-contornos {
  stroke:
    #5f8fc9;

  opacity:
    0.22;
}


.modo-oscuro .montana-trasera {
  fill:
    #29466d;
}


.modo-oscuro .montana-central {
  fill:
    #35629a;
}


.modo-oscuro .montana-derecha {
  fill:
    #4779b7;
}


.modo-oscuro .montana-frontal {
  fill:
    #2f5f9d;
}


.modo-oscuro .nieve-central {
  fill:
    #b7d0f0;
}


.modo-oscuro .nieve-derecha {
  fill:
    #c5daf4;
}


.modo-oscuro .ladera-sombra {
  fill:
    #18395f;

  opacity:
    0.28;
}


.modo-oscuro .ladera-luz {
  fill:
    #8db5e8;

  opacity:
    0.10;
}


.modo-oscuro .decor-niebla {
  fill:
    #29486f;

  opacity:
    0.70;
}


.modo-oscuro .mastil-bandera {
  stroke:
    #75a9ed;
}


.modo-oscuro .tela-bandera {
  fill:
    #75a9ed;
}


.modo-oscuro .meta-punto {
  fill:
    #d8e7fa;

  stroke:
    #75a9ed;
}


/* ========================================
   ACCIONES FINALES
======================================== */

.modo-oscuro .acciones-finales-lateral {
  background:
    rgba(
      22,
      34,
      52,
      0.96
    );

  border-color: #34475f;

  box-shadow:
    0 10px 27px
    rgba(
      0,
      0,
      0,
      0.24
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.025
    );

  backdrop-filter:
    blur(8px);
}


.modo-oscuro .acciones-finales-texto strong {
  color: #edf4ff;
}


.modo-oscuro .acciones-finales-texto span {
  color: #99adcc;
}



/* ========================================
   MODAL
======================================== */

.modo-oscuro .modal-fondo {
  background:
    rgba(
      3,
      10,
      22,
      0.68
    );

  backdrop-filter:
    blur(4px);
}


.modo-oscuro .modal {
  background:
    radial-gradient(
      circle at 85% 5%,
      rgba(58, 94, 145, 0.11),
      transparent 28%
    ),
    #182439;

  border-color: #34465e;

  box-shadow:
    0 28px 70px
    rgba(
      0,
      0,
      0,
      0.42
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      0.025
    );
}


.modo-oscuro .modal h3 {
  color: #edf4ff;
}


.modo-oscuro .modal p {
  color: #a2b4d0;
}


.modo-oscuro .modal-icono-salir {
  background: #49351d;

  color: #f4b95e;
}


.modo-oscuro .modal-icono-crear,
.modo-oscuro .modal-icono-exito {
  background: #183c34;

  color: #5bd0a5;
}


.modo-oscuro .modal-icono-error {
  background: #48272e;

  color: #f37b86;
}




/* ========================================
   AJUSTES RESPONSIVE DEL REDISEÑO
======================================== */

@media (max-width: 1100px) {

  .cabecera-pagina {
    padding:
      17px
      18px;
  }

}


@media (max-width: 700px) {

  .cabecera-pagina {
    padding:
      16px;

    border-radius:
      12px;
  }


  .decoracion-mensaje {
    top:
      24px;

    left:
      22px;
  }

}


@media (prefers-reduced-motion: reduce) {

  .decoracion-lateral,
  .bandera-cima,
  .meta-punto {
    animation:
      none !important;

    transition:
      none !important;
  }


  .decoracion-lateral:hover {
    transform:
      none;
  }

}

</style>
