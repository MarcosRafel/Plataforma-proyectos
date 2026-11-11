<template>

  <div
    class="pagina pagina-admin"
    :class="{ 'modo-oscuro': modoOscuro }"
  >

    <main class="contenido">

      <!-- ======================================== -->
      <!-- CABECERA -->
      <!-- ======================================== -->

      <header class="cabecera">

        <div class="cabecera-contenido">

          <button
            type="button"
            class="btn-regresar"
            @click="regresar"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
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
            Administración
          </p>

          <h1>
            Gestión de usuarios
          </h1>

          <p class="descripcion">
            Consulta, filtra y administra las cuentas registradas en la plataforma.
          </p>


          <div class="estadisticas-cabecera">

            <article class="mini-estadistica mini-total">

              <span class="mini-icono">
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

                  <circle
                    cx="17"
                    cy="9"
                    r="2.3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />

                  <path
                    d="M15.3 14.2c2.5-.5 4.3.8 4.9 3.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  {{ estadisticas.total }}
                </strong>

                <span>
                  Usuarios registrados
                </span>
              </div>

              <small>
                Total
              </small>

            </article>


            <article class="mini-estadistica mini-admin">

              <span class="mini-icono">
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
              </span>

              <div>
                <strong>
                  {{ estadisticas.administradores }}
                </strong>

                <span>
                  Administradores
                </span>
              </div>

              <small>
                Control
              </small>

            </article>


            <article class="mini-estadistica mini-investigadores">

              <span class="mini-icono">
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
              </span>

              <div>
                <strong>
                  {{ estadisticas.investigadores }}
                </strong>

                <span>
                  Investigadores
                </span>
              </div>

              <small>
                Usuarios
              </small>

            </article>


            <article class="mini-estadistica mini-activos">

              <span class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <path
                    d="m8.5 12 2.2 2.2 4.8-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  {{ estadisticas.activos }}
                </strong>

                <span>
                  Cuentas activas
                </span>
              </div>

              <small>
                Activos
              </small>

            </article>


            <article class="mini-estadistica mini-inactivos">

              <span class="mini-icono">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />

                  <path
                    d="M8.5 12h7"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  {{ estadisticas.inactivos }}
                </strong>

                <span>
                  Cuentas inactivas
                </span>
              </div>

              <small>
                Inactivos
              </small>

            </article>

          </div>

        </div>


        <div
          class="cabecera-ilustracion"
          aria-hidden="true"
        >
          <span class="orbita orbita-1"></span>
          <span class="orbita orbita-2"></span>

          <div class="tarjeta-usuarios-decorativa">

            <div class="avatar-decorativo avatar-uno">
              AD
            </div>

            <div class="avatar-decorativo avatar-dos">
              CH
            </div>

            <div class="lineas-decorativas">
              <span></span>
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
      <!-- PANEL DE USUARIOS -->
      <!-- ======================================== -->

      <section class="panel-principal">

        <div class="panel-encabezado">

          <div class="titulo-panel">

            <span class="titulo-icono">
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

            <div>
              <h2>
                Usuarios registrados
              </h2>

              <p>
                Administra la información, permisos, estado y contraseñas de las cuentas.
              </p>
            </div>

          </div>


          <button
            type="button"
            class="btn-nuevo"
            @click="abrirNuevoUsuario"
          >
            <span>＋</span>
            Nuevo usuario
          </button>

        </div>



        <!-- ====================================== -->
        <!-- FILTROS -->
        <!-- ====================================== -->

        <div class="barra-filtros">

          <label class="control-busqueda">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="11"
                cy="11"
                r="6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              />

              <path
                d="m16 16 4 4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>

            <input
              v-model.trim="filtros.busqueda"
              type="search"
              placeholder="Buscar por nombre o correo..."
            >

          </label>


          <label class="control-select">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h16l-6.2 7v5l-3.6 1.8V13Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>

            <select v-model="filtros.rol">
              <option value="">
                Todos los roles
              </option>

              <option value="Administrador">
                Administrador
              </option>

              <option value="Investigador">
                Investigador
              </option>
            </select>

          </label>


          <label class="control-select">

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />

              <path
                d="M8.5 12h7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>

            <select v-model="filtros.estado">
              <option value="">
                Todos los estados
              </option>

              <option value="activo">
                Activos
              </option>

              <option value="inactivo">
                Inactivos
              </option>
            </select>

          </label>


          <div class="ordenar">

            <span>
              ⇅ Ordenar por
            </span>

            <select v-model="filtros.orden">
              <option value="recientes">
                Más recientes
              </option>

              <option value="nombre">
                Nombre A-Z
              </option>
            </select>

          </div>

        </div>


        <div class="resultado-filtro">

          <span class="filtro-icono">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h16l-6.2 7v5l-3.6 1.8V13Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          Mostrando
          <strong>
            {{ usuariosFiltrados.length }}
          </strong>
          de
          <strong>
            {{ usuarios.length }}
          </strong>
          usuarios

        </div>



        <!-- ====================================== -->
        <!-- ESTADOS -->
        <!-- ====================================== -->

        <div
          v-if="cargando"
          class="estado-panel"
        >
          Cargando usuarios...
        </div>


        <div
          v-else-if="mensajeError"
          class="estado-panel estado-error"
        >
          {{ mensajeError }}
        </div>


        <div
          v-else-if="usuariosFiltrados.length === 0"
          class="estado-panel"
        >
          No se encontraron usuarios con los filtros seleccionados.
        </div>



        <!-- ====================================== -->
        <!-- TABLA DESKTOP -->
        <!-- ====================================== -->

        <div
          v-else
          class="tabla-contenedor"
        >

          <table>

            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Especialidad</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="usuario in usuariosFiltrados"
                :key="usuario.id"
              >

                <td>
                  <div class="usuario-tabla">

                    <span class="avatar-tabla">
                      {{ obtenerIniciales(usuario) }}
                    </span>

                    <div>
                      <strong>
                        {{ nombreCompletoUsuario(usuario) }}
                      </strong>

                      <small>
                        ID {{ usuario.id }}
                        <template v-if="esUsuarioActual(usuario)">
                          · Tu cuenta
                        </template>
                      </small>
                    </div>

                  </div>
                </td>


                <td>
                  <span class="texto-secundario">
                    {{ usuario.correo || 'Sin correo' }}
                  </span>
                </td>


                <td>
                  <span class="texto-secundario">
                    {{ usuario.especialidad || 'Sin especialidad' }}
                  </span>
                </td>


                <td>
                  <span
                    class="rol-pill"
                    :class="claseRol(usuario.rol)"
                  >
                    {{ usuario.rol }}
                  </span>
                </td>


                <td>
                  <span
                    class="estado-pill"
                    :class="{
                      activo: usuario.activo,
                      inactivo: !usuario.activo
                    }"
                  >
                    <span></span>

                    {{
                      usuario.activo
                        ? 'Activo'
                        : 'Inactivo'
                    }}
                  </span>
                </td>


                <td>
                  <div class="fecha-tabla">
                    <strong>
                      {{ formatearFecha(usuario.fecha_registro) }}
                    </strong>

                    <small>
                      {{ formatearHora(usuario.fecha_registro) }}
                    </small>
                  </div>
                </td>


                <td>
                  <div class="acciones-tabla">

                    <button
                      type="button"
                      class="btn-accion btn-editar"
                      @click="abrirEditarUsuario(usuario)"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="m5 16-.7 3.7L8 19l10-10-3-3Z"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linejoin="round"
                        />

                        <path
                          d="m13.5 7.5 3 3"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                        />
                      </svg>

                      Editar
                    </button>


                    <button
                      type="button"
                      class="btn-accion btn-eliminar"
                      :disabled="esUsuarioActual(usuario)"
                      :title="
                        esUsuarioActual(usuario)
                          ? 'No puedes eliminar tu propia cuenta'
                          : 'Desactivar usuario'
                      "
                      @click="solicitarEliminarUsuario(usuario)"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M5 7h14M9 7V4.8h6V7M7.2 7l.7 12h8.2l.7-12"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />

                        <path
                          d="M10 10.5v5M14 10.5v5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>

                      Eliminar
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>

        </div>



        <!-- ====================================== -->
        <!-- TARJETAS MÓVILES -->
        <!-- ====================================== -->

        <div
          v-if="
            !cargando &&
            !mensajeError &&
            usuariosFiltrados.length > 0
          "
          class="usuarios-movil"
        >

          <article
            v-for="usuario in usuariosFiltrados"
            :key="`movil-${usuario.id}`"
            class="usuario-movil"
          >

            <div class="usuario-movil-cabecera">

              <span class="avatar-movil">
                {{ obtenerIniciales(usuario) }}
              </span>

              <div>
                <strong>
                  {{ nombreCompletoUsuario(usuario) }}
                </strong>

                <span>
                  {{ usuario.correo || 'Sin correo' }}
                </span>
              </div>

              <span
                class="estado-pill"
                :class="{
                  activo: usuario.activo,
                  inactivo: !usuario.activo
                }"
              >
                <span></span>

                {{
                  usuario.activo
                    ? 'Activo'
                    : 'Inactivo'
                }}
              </span>

            </div>


            <dl class="usuario-movil-datos">

              <div>
                <dt>Correo</dt>
                <dd>
                  {{ usuario.correo || 'Sin correo' }}
                </dd>
              </div>

              <div>
                <dt>Especialidad</dt>
                <dd>
                  {{ usuario.especialidad || 'Sin especialidad' }}
                </dd>
              </div>

              <div>
                <dt>Rol</dt>
                <dd>
                  {{ usuario.rol }}
                </dd>
              </div>

              <div>
                <dt>Registro</dt>
                <dd>
                  {{ formatearFecha(usuario.fecha_registro) }}
                </dd>
              </div>

            </dl>


            <div class="acciones-movil">

              <button
                type="button"
                class="btn-accion btn-editar"
                @click="abrirEditarUsuario(usuario)"
              >
                Editar
              </button>

              <button
                type="button"
                class="btn-accion btn-eliminar"
                :disabled="esUsuarioActual(usuario)"
                @click="solicitarEliminarUsuario(usuario)"
              >
                Eliminar
              </button>

            </div>

          </article>

        </div>

      </section>

    </main>



    <!-- ======================================== -->
    <!-- MENSAJE DE ÉXITO -->
    <!-- ======================================== -->

    <Transition name="toast">

      <div
        v-if="mensajeExito"
        class="toast-exito"
        role="status"
        aria-live="polite"
      >

        <span class="toast-exito-icono">

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            />

            <path
              d="m8 12 2.5 2.5L16.5 9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

        </span>


        <div>

          <strong>
            Operación realizada
          </strong>

          <span>
            {{ mensajeExito }}
          </span>

        </div>

      </div>

    </Transition>



    <!-- ======================================== -->
    <!-- MODAL CREAR / EDITAR -->
    <!-- ======================================== -->

    <div
      v-if="modalFormularioAbierto"
      class="modal-fondo"
    >

      <section
        class="modal modal-usuario"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="
          modoFormulario === 'crear'
            ? 'titulo-nuevo-usuario'
            : 'titulo-editar-usuario'
        "
      >

        <header class="modal-cabecera">

          <div>

            <span class="modal-eyebrow">
              Administración de usuarios
            </span>

            <h2
              :id="
                modoFormulario === 'crear'
                  ? 'titulo-nuevo-usuario'
                  : 'titulo-editar-usuario'
              "
            >
              {{
                modoFormulario === 'crear'
                  ? 'Nuevo usuario'
                  : 'Editar usuario'
              }}
            </h2>

          </div>


          <button
            type="button"
            class="btn-cerrar-modal"
            aria-label="Cerrar"
            @click="cerrarModalFormulario"
          >
            ×
          </button>

        </header>


        <form @submit.prevent="guardarUsuario">

          <div class="form-grid">

            <label class="campo">
              <span>Nombre(s)</span>

              <input
                v-model.trim="formulario.nombre"
                type="text"
                required
                autocomplete="given-name"
                placeholder="Ej. Juan Carlos"
                @input="normalizarNombreFormulario"
              >
            </label>


            <label class="campo">
              <span>Apellidos</span>

              <input
                v-model.trim="formulario.apellido"
                type="text"
                required
                autocomplete="family-name"
                placeholder="Ej. Lopez Perez"
                @input="normalizarApellidoFormulario"
              >
            </label>



            <label class="campo">
              <span>Correo electrónico</span>

              <input
                v-model.trim="formulario.correo"
                type="email"
                required
                autocomplete="email"
                placeholder="correo@ejemplo.com"
              >
            </label>


            <label class="campo campo-ancho">
              <span>Especialidad</span>

              <input
                v-model.trim="formulario.especialidad"
                type="text"
                placeholder="Ej. Inteligencia artificial"
              >
            </label>


            <label class="campo">
              <span>Rol</span>

              <select
                v-model="formulario.rol"
                required
              >
                <option value="Investigador">
                  Investigador
                </option>

                <option value="Administrador">
                  Administrador
                </option>
              </select>
            </label>


            <label class="campo">
              <span>Estado</span>

              <select v-model="formulario.activo">
                <option :value="true">
                  Activo
                </option>

                <option :value="false">
                  Inactivo
                </option>
              </select>
            </label>


            <label class="campo">
              <span>
                {{
                  modoFormulario === 'crear'
                    ? 'Contraseña temporal'
                    : 'Nueva contraseña (opcional)'
                }}
              </span>

              <input
                v-model="formulario.contrasena"
                type="password"
                :required="modoFormulario === 'crear'"
                autocomplete="new-password"
                minlength="8"
                maxlength="128"
                :placeholder="
                  modoFormulario === 'crear'
                    ? 'Contraseña inicial'
                    : 'Déjala vacía para conservar la actual'
                "
              >

              <small>
                {{
                  modoFormulario === 'crear'
                    ? 'Asigna una contraseña inicial de al menos 8 caracteres.'
                    : 'Si escribes una nueva contraseña, reemplazará la actual y cerrará sus demás sesiones.'
                }}
              </small>
            </label>


            <label class="campo">
              <span>Confirmar contraseña</span>

              <input
                v-model="formulario.confirmarContrasena"
                type="password"
                :required="modoFormulario === 'crear'"
                autocomplete="new-password"
                minlength="8"
                maxlength="128"
                placeholder="Repite la contraseña"
              >

              <small>
                En edición, deja ambos campos vacíos si no deseas cambiar la contraseña.
              </small>
            </label>

          </div>


          <div
            v-if="mensajeFormulario"
            class="mensaje-formulario"
          >
            {{ mensajeFormulario }}
          </div>


          <footer class="modal-acciones">

            <button
              type="button"
              class="btn-modal-secundario"
              @click="cerrarModalFormulario"
            >
              Cancelar
            </button>


            <button
              type="submit"
              class="btn-modal-principal"
              :disabled="guardando"
            >
              {{
                guardando
                  ? 'Guardando...'
                  : (
                      modoFormulario === 'crear'
                        ? 'Crear usuario'
                        : 'Guardar cambios'
                    )
              }}
            </button>

          </footer>

        </form>

      </section>

    </div>



    <!-- ======================================== -->
    <!-- CONFIRMAR CREACIÓN DE USUARIO -->
    <!-- ======================================== -->

    <div
      v-if="modalConfirmarCrearAbierto"
      class="modal-fondo modal-confirmacion-fondo"
    >

      <section
        class="modal modal-confirmacion"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="titulo-confirmar-creacion"
      >

        <span class="confirmacion-icono">

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
              d="M17 14v6M14 17h6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />

          </svg>

        </span>


        <span class="modal-eyebrow">
          Confirmar operación
        </span>


        <h2 id="titulo-confirmar-creacion">
          ¿Crear este usuario?
        </h2>


        <p class="confirmacion-descripcion">
          Revisa la información antes de registrar la nueva cuenta.
        </p>


        <div class="resumen-confirmacion">

          <div>
            <span>Nombre</span>

            <strong>
              {{ formulario.nombre }} {{ formulario.apellido }}
            </strong>
          </div>



          <div>
            <span>Rol</span>

            <strong>
              {{ formulario.rol }}
            </strong>
          </div>


          <div>
            <span>Estado</span>

            <strong>
              {{
                formulario.activo
                  ? 'Activo'
                  : 'Inactivo'
              }}
            </strong>
          </div>


          <div class="resumen-confirmacion-ancho">
            <span>Correo</span>

            <strong>
              {{ formulario.correo || 'Sin correo registrado' }}
            </strong>
          </div>


          <div class="resumen-confirmacion-ancho">
            <span>Especialidad</span>

            <strong>
              {{ formulario.especialidad || 'Sin especialidad registrada' }}
            </strong>
          </div>

        </div>


        <div class="modal-acciones">

          <button
            type="button"
            class="btn-modal-secundario"
            :disabled="guardando"
            @click="cancelarConfirmacionCreacion"
          >
            Revisar datos
          </button>


          <button
            type="button"
            class="btn-modal-principal"
            :disabled="guardando"
            @click="confirmarCreacionUsuario"
          >
            {{
              guardando
                ? 'Creando usuario...'
                : 'Sí, crear usuario'
            }}
          </button>

        </div>

      </section>

    </div>



    <!-- ======================================== -->
    <!-- CONFIRMAR EDICIÓN DE USUARIO -->
    <!-- ======================================== -->

    <div
      v-if="modalConfirmarEditarAbierto"
      class="modal-fondo modal-confirmacion-fondo"
    >

      <section
        class="modal modal-confirmacion"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="titulo-confirmar-edicion"
      >

        <span class="confirmacion-icono confirmacion-icono-editar">

          <svg viewBox="0 0 24 24" aria-hidden="true">

            <path
              d="m5 16-.7 3.7L8 19l10-10-3-3Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />

            <path
              d="m13.5 7.5 3 3"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            />

          </svg>

        </span>


        <span class="modal-eyebrow">
          Confirmar cambios
        </span>


        <h2 id="titulo-confirmar-edicion">
          ¿Guardar estos cambios?
        </h2>


        <p class="confirmacion-descripcion">
          Revisa la información actualizada antes de modificar la cuenta.
        </p>


        <div class="resumen-confirmacion">

          <div>
            <span>Nombre</span>

            <strong>
              {{ formulario.nombre }} {{ formulario.apellido }}
            </strong>
          </div>



          <div>
            <span>Rol</span>

            <strong>
              {{ formulario.rol }}
            </strong>
          </div>


          <div>
            <span>Estado</span>

            <strong>
              {{
                formulario.activo
                  ? 'Activo'
                  : 'Inactivo'
              }}
            </strong>
          </div>


          <div class="resumen-confirmacion-ancho">
            <span>Correo</span>

            <strong>
              {{ formulario.correo || 'Sin correo registrado' }}
            </strong>
          </div>


          <div class="resumen-confirmacion-ancho">
            <span>Especialidad</span>

            <strong>
              {{ formulario.especialidad || 'Sin especialidad registrada' }}
            </strong>
          </div>


          <div
            v-if="formulario.contrasena"
            class="resumen-confirmacion-ancho"
          >
            <span>Contraseña</span>

            <strong>
              Se restablecerá y las sesiones anteriores de esta cuenta dejarán de ser válidas
            </strong>
          </div>

        </div>


        <div class="modal-acciones">

          <button
            type="button"
            class="btn-modal-secundario"
            :disabled="guardando"
            @click="cancelarConfirmacionEdicion"
          >
            Revisar cambios
          </button>


          <button
            type="button"
            class="btn-modal-principal"
            :disabled="guardando"
            @click="confirmarEdicionUsuario"
          >
            {{
              guardando
                ? 'Guardando cambios...'
                : 'Sí, guardar cambios'
            }}
          </button>

        </div>

      </section>

    </div>



    <!-- ======================================== -->
    <!-- MODAL ELIMINAR -->
    <!-- ======================================== -->

    <div
      v-if="modalEliminarAbierto"
      class="modal-fondo"
    >

      <section
        class="modal modal-eliminar"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="titulo-eliminar-usuario"
      >

        <span class="eliminar-icono">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3.5 21 20H3Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />

            <path
              d="M12 9v5M12 17.2v.2"
              fill="none"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
            />
          </svg>
        </span>


        <h2 id="titulo-eliminar-usuario">
          Desactivar usuario
        </h2>


        <p>
          Esta acción desactivará la cuenta de
          <strong>
            {{ nombreCompletoUsuario(usuarioAEliminar || {}) }}
          </strong>.
        </p>


        <div
          v-if="usuarioAEliminar"
          class="resumen-eliminacion"
        >

          <div>
            <span>Correo</span>

            <strong>
              {{ usuarioAEliminar.correo || 'Sin correo registrado' }}
            </strong>
          </div>


          <div>
            <span>Rol</span>

            <strong>
              {{ usuarioAEliminar.rol }}
            </strong>
          </div>

        </div>


        <p class="advertencia-eliminar">
          La cuenta conservará sus relaciones históricas y podrá reactivarse posteriormente desde la edición del usuario.
        </p>


        <div class="modal-acciones">

          <button
            type="button"
            class="btn-modal-secundario"
            @click="cerrarModalEliminar"
          >
            Cancelar
          </button>


          <button
            type="button"
            class="btn-confirmar-eliminar"
            :disabled="eliminando"
            @click="eliminarUsuario"
          >
            {{
              eliminando
                ? 'Desactivando...'
                : 'Desactivar cuenta'
            }}
          </button>

        </div>

      </section>

    </div>

  </div>

</template>


<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTema } from '../utils/useTema'
import { apiFetch } from '../utils/api'

const router = useRouter()
const { modoOscuro } = useTema()

const usuarios = ref([])
const cargando = ref(false)
const guardando = ref(false)
const eliminando = ref(false)
const mensajeError = ref('')
const mensajeFormulario = ref('')
const modalFormularioAbierto = ref(false)
const modalConfirmarCrearAbierto = ref(false)
const modalConfirmarEditarAbierto = ref(false)
const modalEliminarAbierto = ref(false)
const mensajeExito = ref('')
let temporizadorMensajeExito = null
const modoFormulario = ref('crear')
const usuarioEditandoId = ref(null)
const usuarioAEliminar = ref(null)

const filtros = reactive({ busqueda: '', rol: '', estado: '', orden: 'recientes' })

const formulario = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  especialidad: '',
  rol: 'Investigador',
  activo: true,
  contrasena: '',
  confirmarContrasena: ''
})

const obtenerUsuarioActual = () => {
  try {
    const guardado = sessionStorage.getItem('usuario-plataforma')
    if (!guardado) return null
    return JSON.parse(guardado)
  } catch (error) {
    return null
  }
}

const usuarioActual = computed(() => obtenerUsuarioActual())

const obtenerRol = usuario => {
  return String(typeof usuario?.rol === 'string' ? usuario.rol : usuario?.rol?.nombre || usuario?.nombre_rol || usuario?.tipo_usuario || '').trim().toLowerCase()
}

const validarAdministrador = () => {
  return obtenerRol(usuarioActual.value) === 'administrador'
}

const estadisticas = computed(() => {
  const lista = usuarios.value
  return {
    total: lista.length,
    administradores: lista.filter(usuario => usuario.rol === 'Administrador').length,
    investigadores: lista.filter(usuario => usuario.rol === 'Investigador').length,
    activos: lista.filter(usuario => Boolean(Number(usuario.activo))).length,
    inactivos: lista.filter(usuario => !Boolean(Number(usuario.activo))).length
  }
})

const normalizarTexto = valor => {
  return String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

const usuariosFiltrados = computed(() => {
  let resultado = [...usuarios.value]
  const busqueda = normalizarTexto(filtros.busqueda)

  if (busqueda) {
    resultado = resultado.filter(usuario => {
      const contenido = normalizarTexto([usuario.nombre, usuario.apellido, usuario.correo, usuario.especialidad, usuario.rol].join(' '))
      return contenido.includes(busqueda)
    })
  }
  if (filtros.rol) {
    resultado = resultado.filter(usuario => usuario.rol === filtros.rol)
  }
  if (filtros.estado) {
    const activo = filtros.estado === 'activo'
    resultado = resultado.filter(usuario => Boolean(Number(usuario.activo)) === activo)
  }

  if (filtros.orden === 'nombre') {
    resultado.sort((a, b) => nombreCompletoUsuario(a).localeCompare(nombreCompletoUsuario(b), 'es'))
  } else if (filtros.orden === 'correo') {
    resultado.sort((a, b) => String(a.correo).localeCompare(String(b.correo), 'es'))
  } else {
    resultado.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
  }
  return resultado
})

const mostrarMensajeExito = texto => {
  mensajeExito.value = texto
  if (temporizadorMensajeExito) clearTimeout(temporizadorMensajeExito)
  temporizadorMensajeExito = setTimeout(() => { mensajeExito.value = '' }, 4200)
}

const nombreCompletoUsuario = usuario => {
  return [usuario?.nombre, usuario?.apellido].map(valor => String(valor || '').trim()).filter(Boolean).join(' ') || 'Usuario'
}

const obtenerIniciales = usuario => {
  const nombre = String(usuario?.nombre || '').trim()
  const apellido = String(usuario?.apellido || '').trim()
  if (nombre && apellido) {
    return (nombre[0] + apellido[0]).toUpperCase()
  }
  return String(usuario?.correo || nombre || 'U').slice(0, 2).toUpperCase()
}

const claseRol = rol => {
  return rol === 'Administrador' ? 'rol-administrador' : 'rol-investigador'
}

const formatearFecha = fecha => {
  if (!fecha) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(fecha))
}

const formatearHora = fecha => {
  if (!fecha) return ''
  return new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(new Date(fecha))
}

const esUsuarioActual = usuario => {
  const actual = usuarioActual.value
  if (!actual) return false
  if (actual.id_usuario != null && usuario.id != null && Number(actual.id_usuario) > 0) {
    return Number(actual.id_usuario) === Number(usuario.id)
  }
  return normalizarTexto(actual.correo) === normalizarTexto(usuario.correo)
}

const cargarUsuariosReal = async () => {
  const respuesta = await apiFetch('/usuarios', { credentials: 'include' })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.mensaje || 'No fue posible cargar los usuarios.')
  usuarios.value = Array.isArray(datos) ? datos : datos.usuarios || []
}

const cargarUsuarios = async () => {
  cargando.value = true
  mensajeError.value = ''
  try {
    await cargarUsuariosReal()
  } catch (error) {
    mensajeError.value = error.message || 'No fue posible cargar los usuarios.'
  } finally {
    cargando.value = false
  }
}

const limpiarFormulario = () => {
  formulario.nombre = ''
  formulario.apellido = ''
  formulario.correo = ''
  formulario.especialidad = ''
  formulario.rol = 'Investigador'
  formulario.activo = true
  formulario.contrasena = ''
  formulario.confirmarContrasena = ''
  mensajeFormulario.value = ''
}

const abrirNuevoUsuario = () => {
  modoFormulario.value = 'crear'
  usuarioEditandoId.value = null
  limpiarFormulario()
  modalFormularioAbierto.value = true
}

const abrirEditarUsuario = usuario => {
  modoFormulario.value = 'editar'
  usuarioEditandoId.value = usuario.id
  formulario.nombre = usuario.nombre || ''
  formulario.apellido = usuario.apellido || ''
  formulario.correo = usuario.correo || ''
  formulario.especialidad = usuario.especialidad || ''
  formulario.rol = usuario.rol || 'Investigador'
  formulario.activo = Boolean(usuario.activo)
  formulario.contrasena = ''
  formulario.confirmarContrasena = ''
  mensajeFormulario.value = ''
  modalFormularioAbierto.value = true
}

const cerrarModalFormulario = () => {
  if (guardando.value) return
  modalFormularioAbierto.value = false
  modalConfirmarCrearAbierto.value = false
  modalConfirmarEditarAbierto.value = false
  limpiarFormulario()
}

const validarFormularioUsuario = () => {
  if (!formulario.nombre.trim() || !formulario.apellido.trim() || !formulario.correo.trim()) {
    mensajeFormulario.value = 'Nombre, apellido y correo son obligatorios.'
    return false
  }

  const hayContrasena = Boolean(formulario.contrasena)
  const hayConfirmacion = Boolean(formulario.confirmarContrasena)

  if (modoFormulario.value === 'crear' && (!hayContrasena || !hayConfirmacion)) {
    mensajeFormulario.value = 'Asigna y confirma una contraseña temporal al nuevo usuario.'
    return false
  }

  if (hayContrasena || hayConfirmacion) {
    if (!hayContrasena || !hayConfirmacion) {
      mensajeFormulario.value = 'Escribe y confirma la nueva contraseña.'
      return false
    }
    if (formulario.contrasena.length < 8) {
      mensajeFormulario.value = 'La contraseña debe tener al menos 8 caracteres.'
      return false
    }
    if (formulario.contrasena !== formulario.confirmarContrasena) {
      mensajeFormulario.value = 'La contraseña y su confirmación no coinciden.'
      return false
    }
  }

  if (formulario.correo) {
    const correoDuplicado = usuarios.value.some(usuario =>
      normalizarTexto(usuario.correo) === normalizarTexto(formulario.correo) && Number(usuario.id) !== Number(usuarioEditandoId.value)
    )
    if (correoDuplicado) {
      mensajeFormulario.value = 'Ese correo electrónico ya está registrado.'
      return false
    }
  }

  mensajeFormulario.value = ''
  return true
}

const guardarUsuarioReal = async () => {
  const editando = modoFormulario.value === 'editar'
  const url = editando ? `/usuarios/${usuarioEditandoId.value}` : '/usuarios'

  const respuesta = await apiFetch(url, {
    method: editando ? 'PUT' : 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      correo: formulario.correo.trim(),
      especialidad: formulario.especialidad.trim(),
      rol: formulario.rol,
      activo: Boolean(formulario.activo),
      ...(formulario.contrasena ? { contrasena: formulario.contrasena, confirmarContrasena: formulario.confirmarContrasena } : {})
    })
  })

  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.mensaje || 'No fue posible guardar el usuario.')

  if (editando && datos.usuario && esUsuarioActual(datos.usuario)) {
    sessionStorage.setItem('usuario-plataforma', JSON.stringify(datos.usuario))
  }
  await cargarUsuariosReal()
}

const ejecutarGuardadoUsuario = async () => {
  const eraCreacion = modoFormulario.value === 'crear'
  guardando.value = true
  try {
    await guardarUsuarioReal()
    modalConfirmarCrearAbierto.value = false
    modalConfirmarEditarAbierto.value = false
    modalFormularioAbierto.value = false
    limpiarFormulario()
    mostrarMensajeExito(eraCreacion ? 'Usuario creado exitosamente.' : 'Usuario editado exitosamente.')
  } catch (error) {
    mensajeFormulario.value = error.message || 'No fue posible guardar el usuario.'
    modalConfirmarCrearAbierto.value = false
    modalConfirmarEditarAbierto.value = false
  } finally {
    guardando.value = false
  }
}

const guardarUsuario = async () => {
  if (!validarFormularioUsuario()) return
  if (modoFormulario.value === 'crear') {
    modalConfirmarCrearAbierto.value = true
    return
  }
  modalConfirmarEditarAbierto.value = true
}

const cancelarConfirmacionCreacion = () => { if (!guardando.value) modalConfirmarCrearAbierto.value = false }
const confirmarCreacionUsuario = async () => { await ejecutarGuardadoUsuario() }
const cancelarConfirmacionEdicion = () => { if (!guardando.value) modalConfirmarEditarAbierto.value = false }
const confirmarEdicionUsuario = async () => { await ejecutarGuardadoUsuario() }

const solicitarEliminarUsuario = usuario => {
  if (esUsuarioActual(usuario)) return
  usuarioAEliminar.value = usuario
  modalEliminarAbierto.value = true
}

const cerrarModalEliminar = () => {
  if (eliminando.value) return
  modalEliminarAbierto.value = false
  usuarioAEliminar.value = null
}

const eliminarUsuarioReal = async () => {
  const id = usuarioAEliminar.value?.id
  const respuesta = await apiFetch(`/usuarios/${id}`, { method: 'DELETE', credentials: 'include' })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.mensaje || 'No fue posible eliminar el usuario.')
  await cargarUsuariosReal()
}

const eliminarUsuario = async () => {
  if (!usuarioAEliminar.value || esUsuarioActual(usuarioAEliminar.value)) return
  eliminando.value = true
  try {
    await eliminarUsuarioReal()
    modalEliminarAbierto.value = false
    usuarioAEliminar.value = null
    mostrarMensajeExito('Usuario eliminado exitosamente.')
  } catch (error) {
    mensajeError.value = error.message || 'No fue posible eliminar el usuario.'
  } finally {
    eliminando.value = false
  }
}

const regresar = () => { router.push({ name: 'administracion' }) }

onMounted(() => {
  if (!validarAdministrador()) {
    router.replace({ name: 'proyectos' })
    return
  }
  cargarUsuarios()
})

onBeforeUnmount(() => {
  if (temporizadorMensajeExito) clearTimeout(temporizadorMensajeExito)
})
</script>


<style scoped>

/* ==========================================================
   BASE
========================================================== */

* {
  box-sizing: border-box;
}


button,
input,
select {
  font: inherit;
}


button,
select {
  cursor: pointer;
}


button:disabled {
  cursor: not-allowed;
}


.pagina {
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
      rgba(232, 223, 255, 0.45),
      transparent 24%
    ),
    #f7faff;

  color: #0b1f50;

  transition:
    background .25s ease,
    color .25s ease;
}


.contenido {
  width: 100%;
  max-width: 1650px;

  margin: 0 auto;
}


/* ==========================================================
   CABECERA
========================================================== */

.cabecera {
  position: relative;

  min-height: 244px;

  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    390px;
  align-items: stretch;

  gap: 20px;

  padding:
    18px
    20px;

  background:
    rgba(
      255,
      255,
      255,
      .95
    );

  border:
    1px solid
    #dce7f5;

  border-radius: 14px;

  box-shadow:
    0 6px 22px
    rgba(
      48,
      84,
      137,
      .055
    );

  overflow: hidden;
}


.cabecera::before {
  content: '';

  position: absolute;

  width: 420px;
  height: 220px;

  top: -100px;
  right: 110px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(212, 195, 250, .58),
      rgba(212, 195, 250, .09) 64%,
      transparent 72%
    );

  pointer-events: none;
}


.cabecera-contenido {
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
      #f3eeff
    );

  color: #7138d2;

  border:
    1px solid
    #cbb8ef;

  border-radius: 9px;

  box-shadow:
    0 4px 12px
    rgba(
      96,
      56,
      161,
      .10
    );

  font-size: 15px;
  font-weight: 700;

  transition:
    transform .2s ease,
    background .2s ease,
    border-color .2s ease,
    box-shadow .2s ease;
}


.btn-regresar svg {
  width: 18px;
  height: 18px;
}


.btn-regresar:hover {
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

  transform:
    translateX(-2px)
    translateY(-1px);
}


.subtitulo {
  margin:
    0
    0
    5px;

  color: #816aa7;

  font-size: 13px;
}


.cabecera h1 {
  margin: 0;

  color: #31204e;

  font-size:
    clamp(
      30px,
      3vw,
      43px
    );

  line-height: 1;
}


.descripcion {
  max-width: 760px;

  margin:
    10px
    0
    16px;

  color: #715f8e;

  font-size: 14px;
}


/* ==========================================================
   ESTADÍSTICAS DE CABECERA
========================================================== */

.estadisticas-cabecera {
  display: grid;
  grid-template-columns:
    repeat(
      5,
      minmax(0, 1fr)
    );

  gap: 9px;

  max-width: 850px;
}


.mini-estadistica {
  --acento: #8f5cf4;
  --fondo-icono: #eee6ff;
  --color-icono: #7439dc;

  position: relative;

  min-height: 74px;

  display: grid;
  grid-template-columns:
    38px
    minmax(0, 1fr)
    auto;
  align-items: center;

  gap: 9px;

  padding:
    10px;

  background: #ffffff;

  border:
    1px solid
    #ddd3f2;

  border-radius: 11px;

  overflow: hidden;
}


.mini-estadistica::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background:
    var(--acento);
}


.mini-icono {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  color:
    var(--color-icono);

  background:
    var(--fondo-icono);

  border-radius: 9px;
}


.mini-icono svg {
  width: 21px;
  height: 21px;
}


.mini-estadistica > div {
  min-width: 0;
}


.mini-estadistica strong {
  display: block;

  color: #2e1f4b;

  font-size: 19px;
}


.mini-estadistica div span {
  display: block;

  margin-top: 2px;

  color: #715f8e;

  font-size: 10px;
}


.mini-estadistica small {
  padding:
    4px
    7px;

  color: #6f35d1;

  background: #efe7ff;

  border-radius: 999px;

  font-size: 9px;
  font-weight: 700;
}


.mini-admin {
  --acento: #e5ad26;
  --fondo-icono: #fff5d9;
  --color-icono: #a76b0b;
}


.mini-investigadores {
  --acento: #6f9fe9;
  --fondo-icono: #e9f2ff;
  --color-icono: #3979d1;
}


.mini-activos {
  --acento: #53c6a0;
  --fondo-icono: #ddf5ec;
  --color-icono: #109d71;
}


.mini-inactivos {
  --acento: #ef5365;
  --fondo-icono: #ffe8ed;
  --color-icono: #d63048;
}


/* ==========================================================
   ILUSTRACIÓN
========================================================== */

.cabecera-ilustracion {
  position: relative;

  min-height: 200px;
}


.tarjeta-usuarios-decorativa {
  position: absolute;

  z-index: 2;

  top: 50%;
  left: 50%;

  width: 220px;
  height: 115px;

  transform:
    translate(
      -50%,
      -48%
    )
    rotate(-4deg);

  background:
    linear-gradient(
      145deg,
      #ffffff,
      #f2edff
    );

  border:
    1px solid
    #d7c6f4;

  border-radius: 18px;

  box-shadow:
    0 16px 30px
    rgba(
      91,
      55,
      143,
      .13
    );
}


.avatar-decorativo {
  position: absolute;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #7139ce;

  background:
    linear-gradient(
      145deg,
      #ede4ff,
      #ddcdff
    );

  border:
    1px solid
    #ccb6f3;

  border-radius: 50%;

  font-size: 12px;
  font-weight: 800;
}


.avatar-uno {
  top: 30px;
  left: 23px;
}


.avatar-dos {
  top: 45px;
  left: 58px;

  transform: scale(.83);

  opacity: .72;
}


.lineas-decorativas {
  position: absolute;

  top: 32px;
  right: 24px;

  width: 100px;
}


.lineas-decorativas span {
  display: block;

  height: 8px;

  margin-bottom: 9px;

  background: #e0d4f5;

  border-radius: 999px;
}


.lineas-decorativas span:nth-child(2) {
  width: 76%;
}


.lineas-decorativas span:nth-child(3) {
  width: 52%;
}


.orbita {
  position: absolute;

  border:
    1px solid
    rgba(
      132,
      91,
      204,
      .20
    );

  border-radius: 50%;
}


.orbita-1 {
  width: 112px;
  height: 112px;

  top: 18px;
  right: 18px;
}


.orbita-2 {
  width: 78px;
  height: 78px;

  top: 35px;
  right: 35px;

  border-style: dashed;
}


.destello {
  position: absolute;

  width: 6px;
  height: 6px;

  background: #a277e9;

  border-radius: 50%;
}


.destello-1 {
  top: 40px;
  left: 45px;
}


.destello-2 {
  top: 72px;
  left: 28px;

  width: 4px;
  height: 4px;
}


.destello-3 {
  right: 21px;
  bottom: 28px;

  width: 5px;
  height: 5px;
}


/* ==========================================================
   PANEL
========================================================== */

.panel-principal {
  margin-top: 20px;

  padding:
    20px;

  background:
    rgba(
      255,
      255,
      255,
      .96
    );

  border:
    1px solid
    #ddd3f4;

  border-radius: 14px;

  box-shadow:
    0 6px 22px
    rgba(
      84,
      55,
      142,
      .06
    );
}


.panel-encabezado {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 18px;

  padding-bottom: 17px;

  border-bottom:
    1px solid
    #ebe3f7;
}


.titulo-panel {
  display: flex;
  align-items: center;

  gap: 12px;
}


.titulo-icono {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #7b3ce0;

  background:
    linear-gradient(
      145deg,
      #eee6ff,
      #dfd0ff
    );

  border:
    1px solid
    #d0bdf3;

  border-radius: 11px;
}


.titulo-icono svg {
  width: 25px;
  height: 25px;
}


.titulo-panel h2 {
  margin: 0;

  color: #31204e;

  font-size: 21px;
}


.titulo-panel p {
  margin:
    4px
    0
    0;

  color: #79688f;

  font-size: 12px;
}


.btn-nuevo {
  min-height: 46px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  padding:
    0
    18px;

  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #925ff4,
      #7138d2
    );

  border:
    1px solid
    #7c43db;

  border-radius: 9px;

  box-shadow:
    0 7px 17px
    rgba(
      113,
      56,
      210,
      .22
    );

  font-size: 13px;
  font-weight: 700;

  transition:
    transform .2s ease,
    box-shadow .2s ease,
    background .2s ease;
}


.btn-nuevo span {
  font-size: 19px;
}


.btn-nuevo:hover {
  background:
    linear-gradient(
      135deg,
      #a174f6,
      #8249df
    );

  box-shadow:
    0 9px 21px
    rgba(
      113,
      56,
      210,
      .28
    );

  transform:
    translateY(-2px);
}


/* ==========================================================
   FILTROS
========================================================== */

.barra-filtros {
  display: grid;
  grid-template-columns:
    minmax(190px, 1.35fr)
    minmax(180px, .8fr)
    minmax(180px, .8fr)
    auto;
  align-items: center;

  gap: 10px;

  margin-top: 18px;
  padding:
    10px;

  background: #faf8ff;

  border:
    1px solid
    #e0d7f2;

  border-radius: 10px;
}


.control-busqueda,
.control-select {
  position: relative;

  min-width: 0;
}


.control-busqueda svg,
.control-select svg {
  position: absolute;

  z-index: 1;

  top: 50%;
  left: 13px;

  width: 18px;
  height: 18px;

  color: #856da8;

  transform:
    translateY(-50%);

  pointer-events: none;
}


.control-busqueda input,
.control-select select,
.ordenar select {
  width: 100%;
  height: 43px;

  padding:
    0
    13px
    0
    41px;

  color: #4a3862;

  background: #ffffff;

  border:
    1px solid
    #d5cae7;

  border-radius: 8px;

  outline: none;

  transition:
    border-color .2s ease,
    box-shadow .2s ease;
}


.control-busqueda input:focus,
.control-select select:focus,
.ordenar select:focus {
  border-color: #9361eb;

  box-shadow:
    0 0 0 3px
    rgba(
      147,
      97,
      235,
      .10
    );
}


.control-busqueda input::placeholder {
  color: #9a8cac;
}


.control-select select {
  appearance: auto;
}


.ordenar {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 9px;

  color: #76618f;

  white-space: nowrap;
}


.ordenar span {
  font-size: 11px;
  font-weight: 650;
}


.ordenar select {
  min-width: 150px;

  padding-left: 12px;
}


.resultado-filtro {
  display: flex;
  align-items: center;

  gap: 5px;

  margin:
    11px
    2px;

  color: #7f6d98;

  font-size: 11px;
}


.filtro-icono {
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 2px;

  color: #7140c3;

  background: #eee7ff;

  border:
    1px solid
    #dacaf7;

  border-radius: 8px;
}


.filtro-icono svg {
  width: 15px;
  height: 15px;
}


/* ==========================================================
   TABLA
========================================================== */

.tabla-contenedor {
  width: 100%;

  overflow-x: auto;

  border:
    1px solid
    #dfd6ee;

  border-radius: 11px;
}


table {
  width: 100%;

  border-collapse: collapse;

  background: #ffffff;
}


th {
  padding:
    13px
    12px;

  color: #5b4775;

  background: #faf8ff;

  border-bottom:
    1px solid
    #dfd5f0;

  text-align: left;

  font-size: 10px;
}


td {
  padding:
    13px
    12px;

  color: #665579;

  border-bottom:
    1px solid
    #efe9f7;

  font-size: 10px;

  vertical-align: middle;
}


tbody tr:last-child td {
  border-bottom: none;
}


tbody tr {
  transition:
    background .2s ease;
}


tbody tr:hover {
  background: #fbf8ff;
}


.usuario-tabla {
  min-width: 150px;

  display: flex;
  align-items: center;

  gap: 9px;
}


.avatar-tabla {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #7140ca;

  background:
    linear-gradient(
      145deg,
      #ede6ff,
      #dfd2ff
    );

  border:
    1px solid
    #d3c2f4;

  border-radius: 50%;

  font-size: 10px;
  font-weight: 800;
}


.usuario-tabla strong,
.nombre-tabla strong,
.fecha-tabla strong {
  display: block;

  color: #342450;

  font-size: 10px;
}


.usuario-tabla small,
.nombre-tabla small,
.fecha-tabla small {
  display: block;

  margin-top: 3px;

  color: #9081a1;

  font-size: 8.5px;
}


.texto-secundario {
  color: #6f6080;
}


.rol-pill,
.estado-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 24px;

  padding:
    0
    9px;

  border-radius: 999px;

  font-size: 8.5px;
  font-weight: 750;

  white-space: nowrap;
}


.rol-administrador {
  color: #6b34c4;

  background: #eee6ff;

  border:
    1px solid
    #d4c2f5;
}


.rol-investigador {
  color: #2968b7;

  background: #eaf3ff;

  border:
    1px solid
    #c9def8;
}


.estado-pill {
  gap: 5px;
}


.estado-pill > span {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}


.estado-pill.activo {
  color: #15815d;

  background: #e4f7f0;

  border:
    1px solid
    #c4eada;
}


.estado-pill.activo > span {
  background: #23ad7c;
}


.estado-pill.inactivo {
  color: #a04d5c;

  background: #fff0f2;

  border:
    1px solid
    #f1cfd5;
}


.estado-pill.inactivo > span {
  background: #df6b7d;
}


.acciones-tabla {
  display: flex;
  align-items: center;

  gap: 6px;

  min-width: 155px;
}


.btn-accion {
  min-height: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding:
    0
    10px;

  border-radius: 8px;

  font-size: 9px;
  font-weight: 700;

  transition:
    transform .2s ease,
    background .2s ease,
    border-color .2s ease,
    box-shadow .2s ease;
}


.btn-accion svg {
  width: 14px;
  height: 14px;
}


.btn-editar {
  color: #7139d1;

  background: #ffffff;

  border:
    1px solid
    #cbb8ee;
}


.btn-editar:hover {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #925ff4,
      #7138d2
    );

  border-color: #7c43db;

  box-shadow:
    0 5px 12px
    rgba(
      113,
      56,
      210,
      .20
    );

  transform:
    translateY(-1px);
}


.btn-eliminar {
  color: #cb465e;

  background: #ffffff;

  border:
    1px solid
    #efb9c4;
}


.btn-eliminar:hover:not(:disabled) {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #ef7184,
      #d9465e
    );

  border-color: #dc5168;

  box-shadow:
    0 5px 12px
    rgba(
      217,
      70,
      94,
      .18
    );

  transform:
    translateY(-1px);
}


.btn-eliminar:disabled {
  opacity: .38;
}


/* ==========================================================
   ESTADOS DEL PANEL
========================================================== */

.estado-panel {
  min-height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    20px;

  color: #76658b;

  background: #faf8ff;

  border:
    1px dashed
    #d8ccec;

  border-radius: 10px;

  text-align: center;
}


.estado-error {
  color: #ae4355;

  background: #fff3f5;

  border-color: #efc6cd;
}


/* ==========================================================
   MOBILE
========================================================== */

.usuarios-movil {
  display: none;
}


.usuario-movil {
  padding: 14px;

  background: #ffffff;

  border:
    1px solid
    #ddd3f1;

  border-radius: 11px;

  box-shadow:
    0 4px 14px
    rgba(
      84,
      55,
      142,
      .05
    );
}


.usuario-movil-cabecera {
  display: grid;
  grid-template-columns:
    42px
    minmax(0, 1fr)
    auto;
  align-items: center;

  gap: 10px;
}


.avatar-movil {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #7139ce;

  background:
    linear-gradient(
      145deg,
      #ede5ff,
      #ddceff
    );

  border:
    1px solid
    #d0bcf2;

  border-radius: 50%;

  font-size: 11px;
  font-weight: 800;
}


.usuario-movil-cabecera strong {
  display: block;

  color: #32224e;

  font-size: 12px;
}


.usuario-movil-cabecera > div > span {
  display: block;

  margin-top: 3px;

  color: #8a799f;

  font-size: 10px;
}


.usuario-movil-datos {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    12px
    16px;

  margin:
    14px
    0;
}


.usuario-movil-datos div {
  min-width: 0;
}


.usuario-movil-datos dt {
  margin-bottom: 4px;

  color: #9484a7;

  font-size: 8px;
  font-weight: 700;

  text-transform: uppercase;
}


.usuario-movil-datos dd {
  margin: 0;

  color: #55436c;

  font-size: 10px;

  overflow-wrap: anywhere;
}


.acciones-movil {
  display: grid;
  grid-template-columns:
    1fr
    1fr;

  gap: 8px;
}


/* ==========================================================
   MODALES
========================================================== */

.modal-fondo {
  position: fixed;

  z-index: 1000;

  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 18px;

  background:
    rgba(
      26,
      18,
      42,
      .48
    );

  backdrop-filter:
    blur(4px);
}


.modal {
  width: min(
    720px,
    100%
  );

  max-height: calc(
    100vh - 36px
  );

  overflow-y: auto;

  padding: 20px;

  background: #ffffff;

  border:
    1px solid
    #d8caee;

  border-radius: 14px;

  box-shadow:
    0 24px 58px
    rgba(
      30,
      20,
      50,
      .24
    );
}


.modal-cabecera {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 16px;

  padding-bottom: 15px;

  border-bottom:
    1px solid
    #ebe4f5;
}


.modal-eyebrow {
  display: block;

  margin-bottom: 3px;

  color: #8561bd;

  font-size: 9px;
  font-weight: 750;

  letter-spacing: .07em;

  text-transform: uppercase;
}


.modal h2 {
  margin: 0;

  color: #30204b;

  font-size: 22px;
}


.btn-cerrar-modal {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #826f99;

  background: #f8f5fc;

  border:
    1px solid
    #ddd3eb;

  border-radius: 9px;

  font-size: 23px;
  line-height: 1;
}


.btn-cerrar-modal:hover {
  color: #6f35ce;

  background: #f0e9ff;

  border-color: #cbb8ec;
}


.form-grid {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    15px
    14px;

  padding:
    18px
    0;
}


.campo {
  display: flex;
  flex-direction: column;

  gap: 6px;
}


.campo-ancho {
  grid-column:
    1
    / -1;
}


.campo > span {
  color: #594171;

  font-size: 10px;
  font-weight: 700;
}


.campo input,
.campo select {
  width: 100%;
  min-height: 42px;

  padding:
    0
    12px;

  color: #443158;

  background: #ffffff;

  border:
    1px solid
    #d6cae6;

  border-radius: 8px;

  outline: none;
}


.campo input:focus,
.campo select:focus {
  border-color: #9867ea;

  box-shadow:
    0 0 0 3px
    rgba(
      152,
      103,
      234,
      .10
    );
}


.campo small {
  color: #8a7a9c;

  font-size: 9px;
  line-height: 1.5;
}


.mensaje-formulario {
  padding:
    10px
    12px;

  color: #a34758;

  background: #fff2f4;

  border:
    1px solid
    #efc8cf;

  border-radius: 8px;

  font-size: 10px;
}


.modal-acciones {
  display: flex;
  justify-content: flex-end;

  gap: 9px;

  margin-top: 5px;
  padding-top: 15px;

  border-top:
    1px solid
    #ebe4f5;
}


.btn-modal-secundario,
.btn-modal-principal,
.btn-confirmar-eliminar {
  min-height: 41px;

  padding:
    0
    14px;

  border-radius: 8px;

  font-size: 10px;
  font-weight: 700;
}


.btn-modal-secundario {
  color: #725f87;

  background: #ffffff;

  border:
    1px solid
    #d6cbe6;
}


.btn-modal-principal {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #915df1,
      #7036d0
    );

  border:
    1px solid
    #7740d4;

  box-shadow:
    0 6px 15px
    rgba(
      112,
      54,
      208,
      .20
    );
}


.btn-confirmar-eliminar {
  color: #ffffff;

  background:
    linear-gradient(
      135deg,
      #ee7285,
      #d7465e
    );

  border:
    1px solid
    #dc5068;
}


.modal-eliminar {
  width:
    min(
      460px,
      100%
    );

  text-align: center;
}


.eliminar-icono {
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin:
    0
    auto
    13px;

  color: #d7475d;

  background: #ffedf0;

  border:
    1px solid
    #f4c5ce;

  border-radius: 50%;
}


.eliminar-icono svg {
  width: 29px;
  height: 29px;
}


.modal-eliminar p {
  color: #746283;

  line-height: 1.6;
}


.advertencia-eliminar {
  color: #c23f56 !important;

  font-weight: 700;
}


/* ==========================================================
   MODO OSCURO
========================================================== */

.pagina.modo-oscuro {
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
    );

  color: #f3ecff;
}


.modo-oscuro .cabecera,
.modo-oscuro .panel-principal,
.modo-oscuro .mini-estadistica,
.modo-oscuro .usuario-movil,
.modo-oscuro .modal {
  background:
    linear-gradient(
      180deg,
      rgba(34, 27, 51, .98),
      rgba(29, 23, 44, .98)
    );

  border-color: #52406d;

  box-shadow:
    0 12px 30px
    rgba(
      0,
      0,
      0,
      .20
    ),
    inset 0 1px 0
    rgba(
      255,
      255,
      255,
      .025
    );
}


.modo-oscuro .cabecera::before {
  background:
    radial-gradient(
      circle,
      rgba(127, 94, 194, .23),
      rgba(127, 94, 194, .05) 62%,
      transparent 71%
    );
}


.modo-oscuro .cabecera h1,
.modo-oscuro .titulo-panel h2,
.modo-oscuro .mini-estadistica strong,
.modo-oscuro .usuario-tabla strong,
.modo-oscuro .nombre-tabla strong,
.modo-oscuro .fecha-tabla strong,
.modo-oscuro .usuario-movil-cabecera strong,
.modo-oscuro .modal h2 {
  color: #fcf9ff;
}


.modo-oscuro .subtitulo,
.modo-oscuro .descripcion,
.modo-oscuro .titulo-panel p,
.modo-oscuro .mini-estadistica div span,
.modo-oscuro .texto-secundario,
.modo-oscuro td,
.modo-oscuro .usuario-movil-datos dd,
.modo-oscuro .modal-eliminar p {
  color: #d0c3e0;
}


.modo-oscuro .mini-estadistica {
  background:
    linear-gradient(
      180deg,
      #241c35,
      #20192f
    );
}


.modo-oscuro .tarjeta-usuarios-decorativa {
  background:
    linear-gradient(
      145deg,
      #302440,
      #281e37
    );

  border-color: #634b80;

  box-shadow:
    0 16px 30px
    rgba(
      0,
      0,
      0,
      .24
    );
}


.modo-oscuro .avatar-decorativo,
.modo-oscuro .titulo-icono,
.modo-oscuro .avatar-tabla,
.modo-oscuro .avatar-movil,
.modo-oscuro .filtro-icono {
  background:
    linear-gradient(
      145deg,
      #493460,
      #3b2a51
    );

  border-color: #745496;

  color: #d5b8ff;
}


.modo-oscuro .lineas-decorativas span {
  background:
    linear-gradient(
      90deg,
      #66507f,
      #4d3c65
    );
}


.modo-oscuro .orbita {
  border-color:
    rgba(
      188,
      156,
      237,
      .24
    );
}


.modo-oscuro .destello {
  background: #c19cfb;
}


.modo-oscuro .panel-encabezado,
.modo-oscuro .modal-cabecera,
.modo-oscuro .modal-acciones {
  border-color: #463757;
}


.modo-oscuro .barra-filtros,
.modo-oscuro .estado-panel {
  background: #1e172d;

  border-color: #49385e;
}


.modo-oscuro .control-busqueda input,
.modo-oscuro .control-select select,
.modo-oscuro .ordenar select,
.modo-oscuro .campo input,
.modo-oscuro .campo select {
  color: #f6f0fd;

  background:
    linear-gradient(
      180deg,
      #191323,
      #171120
    );

  border-color: #56436e;

  color-scheme: dark;
}


.modo-oscuro .control-busqueda input::placeholder,
.modo-oscuro .campo input::placeholder {
  color: #786b88;
}


.modo-oscuro .control-busqueda input:focus,
.modo-oscuro .control-select select:focus,
.modo-oscuro .ordenar select:focus,
.modo-oscuro .campo input:focus,
.modo-oscuro .campo select:focus {
  border-color: #a06cf3;

  box-shadow:
    0 0 0 3px
    rgba(
      160,
      108,
      243,
      .14
    );
}


.modo-oscuro .ordenar,
.modo-oscuro .resultado-filtro,
.modo-oscuro .campo > span,
.modo-oscuro .campo small,
.modo-oscuro .usuario-tabla small,
.modo-oscuro .nombre-tabla small,
.modo-oscuro .fecha-tabla small,
.modo-oscuro .usuario-movil-cabecera > div > span,
.modo-oscuro .usuario-movil-datos dt {
  color: #b6a5c8;
}


.modo-oscuro .tabla-contenedor {
  border-color: #463757;
}


.modo-oscuro table {
  background: #1d172c;
}


.modo-oscuro th {
  color: #ddd0ec;

  background: #251d36;

  border-bottom-color: #463757;
}


.modo-oscuro td {
  border-bottom-color: #352943;
}


.modo-oscuro tbody tr:hover {
  background:
    rgba(
      145,
      93,
      241,
      .07
    );
}


.modo-oscuro .rol-administrador {
  color: #d5bcff;

  background:
    rgba(
      125,
      77,
      206,
      .20
    );

  border-color:
    rgba(
      157,
      113,
      229,
      .38
    );
}


.modo-oscuro .rol-investigador {
  color: #b4d7ff;

  background:
    rgba(
      52,
      101,
      160,
      .20
    );

  border-color:
    rgba(
      91,
      143,
      204,
      .36
    );
}


.modo-oscuro .estado-pill.activo {
  color: #b7e6cf;

  background:
    rgba(
      25,
      119,
      78,
      .22
    );

  border-color:
    rgba(
      66,
      167,
      116,
      .38
    );
}


.modo-oscuro .estado-pill.inactivo {
  color: #f2b7c0;

  background:
    rgba(
      143,
      52,
      68,
      .20
    );

  border-color:
    rgba(
      202,
      91,
      108,
      .36
    );
}


.modo-oscuro .btn-editar {
  color: #d6bcff;

  background: #241b34;

  border-color: #654d83;
}


.modo-oscuro .btn-eliminar {
  color: #f2aab6;

  background: #2d1d28;

  border-color: #744250;
}


.modo-oscuro .btn-cerrar-modal,
.modo-oscuro .btn-modal-secundario {
  color: #d8c8ec;

  background: #261d34;

  border-color: #58456f;
}


.modo-oscuro .estado-error,
.modo-oscuro .mensaje-formulario {
  color: #f0b0bb;

  background:
    rgba(
      136,
      44,
      61,
      .18
    );

  border-color:
    rgba(
      196,
      80,
      99,
      .35
    );
}


.modo-oscuro .eliminar-icono {
  color: #f08b9c;

  background:
    rgba(
      142,
      52,
      69,
      .20
    );

  border-color:
    rgba(
      206,
      91,
      111,
      .38
    );
}


/* ==========================================================
   RESPONSIVE
========================================================== */

@media (max-width: 1250px) {

  .cabecera {
    grid-template-columns:
      minmax(0, 1fr)
      300px;
  }


  .estadisticas-cabecera {
    grid-template-columns:
      repeat(
        3,
        minmax(0, 1fr)
      );
  }


  .barra-filtros {
    grid-template-columns:
      1fr
      1fr
      1fr;
  }


  .ordenar {
    grid-column:
      1
      / -1;

    justify-content: flex-end;
  }

}


@media (max-width: 900px) {

  .cabecera {
    grid-template-columns:
      1fr;

    min-height: 0;
  }


  .cabecera-ilustracion {
    display: none;
  }


  .tabla-contenedor {
    display: none;
  }


  .usuarios-movil {
    display: grid;

    gap: 11px;
  }


  .barra-filtros {
    grid-template-columns:
      1fr
      1fr;
  }


  .ordenar {
    grid-column:
      1
      / -1;
  }

}


@media (max-width: 650px) {

  .pagina {
    padding:
      10px;
  }


  .cabecera,
  .panel-principal {
    padding:
      15px;
  }


  .cabecera h1 {
    font-size: 30px;
  }


  .estadisticas-cabecera {
    grid-template-columns:
      1fr
      1fr;
  }


  .mini-estadistica {
    grid-template-columns:
      36px
      minmax(0, 1fr);

    min-height: 68px;
  }


  .mini-estadistica small {
    display: none;
  }


  .panel-encabezado {
    align-items: stretch;
    flex-direction: column;
  }


  .btn-nuevo {
    width: 100%;
  }


  .barra-filtros {
    grid-template-columns:
      1fr;
  }


  .ordenar {
    grid-column: auto;

    align-items: stretch;
    flex-direction: column;
  }


  .ordenar select {
    width: 100%;
  }


  .usuario-movil-cabecera {
    grid-template-columns:
      42px
      minmax(0, 1fr);
  }


  .usuario-movil-cabecera > .estado-pill {
    grid-column:
      1
      / -1;

    justify-self: start;
  }


  .usuario-movil-datos {
    grid-template-columns:
      1fr;
  }


  .form-grid {
    grid-template-columns:
      1fr;
  }


  .campo-ancho {
    grid-column: auto;
  }


  .modal-acciones {
    display: grid;
    grid-template-columns:
      1fr;
  }


  .btn-modal-secundario,
  .btn-modal-principal,
  .btn-confirmar-eliminar {
    width: 100%;
  }

}


@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;

    transition: none !important;

    animation: none !important;
  }

}



/* ==========================================================
   LEGIBILIDAD · TEXTO MÁS GRANDE
========================================================== */

.pagina {
  font-size: 15px;
}


.subtitulo {
  font-size: 14px;
}


.descripcion {
  font-size: 15px;
  line-height: 1.55;
}


.mini-estadistica strong {
  font-size: 21px;
}


.mini-estadistica div span {
  font-size: 12px;
}


.mini-estadistica small {
  font-size: 10.5px;
}


.titulo-panel h2 {
  font-size: 24px;
}


.titulo-panel p {
  font-size: 14px;
  line-height: 1.5;
}


.btn-nuevo {
  font-size: 14px;
}


.control-busqueda input,
.control-select select,
.ordenar select {
  font-size: 13px;
}


.ordenar span,
.resultado-filtro {
  font-size: 12px;
}


th {
  font-size: 12px;
}


td {
  font-size: 12px;
}


.usuario-tabla strong,
.nombre-tabla strong,
.fecha-tabla strong {
  font-size: 12px;
}


.usuario-tabla small,
.nombre-tabla small,
.fecha-tabla small {
  font-size: 10px;
}


.rol-pill,
.estado-pill {
  font-size: 10.5px;
}


.btn-accion {
  font-size: 11px;
}


.usuario-movil-cabecera strong {
  font-size: 14px;
}


.usuario-movil-cabecera > div > span {
  font-size: 11.5px;
}


.usuario-movil-datos dt {
  font-size: 10px;
}


.usuario-movil-datos dd {
  font-size: 12px;
}


.modal-eyebrow {
  font-size: 10.5px;
}


.modal h2 {
  font-size: 25px;
}


.campo > span {
  font-size: 12px;
}


.campo input,
.campo select {
  font-size: 13px;
}


.campo small {
  font-size: 10.5px;
}


.mensaje-formulario {
  font-size: 12px;
}


.btn-modal-secundario,
.btn-modal-principal,
.btn-confirmar-eliminar {
  font-size: 12px;
}


.modal-eliminar p {
  font-size: 13px;
}


/* ==========================================================
   CONFIRMACIÓN DE CREACIÓN
========================================================== */

.modal-confirmacion-fondo {
  z-index: 1200;
}


.modal-confirmacion {
  width:
    min(
      560px,
      100%
    );

  text-align: center;
}


.confirmacion-icono {
  width: 66px;
  height: 66px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin:
    0
    auto
    14px;

  color: #7b3dde;

  background:
    linear-gradient(
      145deg,
      #f0e9ff,
      #e2d4ff
    );

  border:
    1px solid
    #d0bbf4;

  border-radius: 50%;

  box-shadow:
    0 8px 20px
    rgba(
      113,
      56,
      210,
      .12
    );
}


.confirmacion-icono svg {
  width: 33px;
  height: 33px;
}


.confirmacion-descripcion {
  margin:
    8px
    0
    17px;

  color: #75648a;

  font-size: 13.5px;
  line-height: 1.55;
}


.resumen-confirmacion {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 9px;

  margin-bottom: 7px;

  text-align: left;
}


.resumen-confirmacion > div {
  min-width: 0;

  padding:
    11px
    12px;

  background: #faf8ff;

  border:
    1px solid
    #e1d7f0;

  border-radius: 9px;
}


.resumen-confirmacion-ancho {
  grid-column:
    1
    / -1;
}


.resumen-confirmacion span {
  display: block;

  margin-bottom: 4px;

  color: #8c7b9f;

  font-size: 10.5px;
  font-weight: 750;

  text-transform: uppercase;
}


.resumen-confirmacion strong {
  display: block;

  color: #3c2a54;

  font-size: 13px;

  overflow-wrap: anywhere;
}


/* ==========================================================
   MENSAJE DE ÉXITO
========================================================== */

.toast-exito {
  position: fixed;

  z-index: 1600;

  top: 22px;
  right: 22px;

  width:
    min(
      390px,
      calc(100vw - 44px)
    );

  display: flex;
  align-items: center;

  gap: 12px;

  padding:
    13px
    15px;

  color: #146747;

  background:
    rgba(
      239,
      253,
      247,
      .98
    );

  border:
    1px solid
    #9fd9c1;

  border-radius: 12px;

  box-shadow:
    0 14px 32px
    rgba(
      31,
      92,
      69,
      .16
    );

  backdrop-filter:
    blur(8px);
}


.toast-exito-icono {
  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #15986b;

  background: #daf4e9;

  border:
    1px solid
    #a8dec8;

  border-radius: 50%;
}


.toast-exito-icono svg {
  width: 24px;
  height: 24px;
}


.toast-exito strong {
  display: block;

  margin-bottom: 2px;

  color: #135d42;

  font-size: 13.5px;
}


.toast-exito > div > span {
  display: block;

  color: #34775f;

  font-size: 12.5px;
}


.toast-enter-active,
.toast-leave-active {
  transition:
    opacity .22s ease,
    transform .22s ease;
}


.toast-enter-from,
.toast-leave-to {
  opacity: 0;

  transform:
    translateY(-10px);
}


/* ==========================================================
   CONFIRMACIÓN / TOAST · MODO OSCURO
========================================================== */

.modo-oscuro .confirmacion-icono {
  color: #d4b7ff;

  background:
    linear-gradient(
      145deg,
      #493460,
      #39284e
    );

  border-color: #76559a;
}


.modo-oscuro .confirmacion-descripcion {
  color: #d0c3e0;
}


.modo-oscuro .resumen-confirmacion > div {
  background:
    linear-gradient(
      180deg,
      #241c35,
      #20192f
    );

  border-color: #4d3c64;
}


.modo-oscuro .resumen-confirmacion span {
  color: #aa9abb;
}


.modo-oscuro .resumen-confirmacion strong {
  color: #f4effb;
}


.modo-oscuro .toast-exito {
  color: #c7eadb;

  background:
    rgba(
      24,
      55,
      43,
      .98
    );

  border-color:
    rgba(
      77,
      164,
      123,
      .55
    );

  box-shadow:
    0 14px 34px
    rgba(
      0,
      0,
      0,
      .28
    );
}


.modo-oscuro .toast-exito-icono {
  color: #85dfb8;

  background:
    rgba(
      29,
      116,
      78,
      .30
    );

  border-color:
    rgba(
      86,
      186,
      137,
      .48
    );
}


.modo-oscuro .toast-exito strong {
  color: #d8f5e9;
}


.modo-oscuro .toast-exito > div > span {
  color: #add9c6;
}


/* ==========================================================
   RESPONSIVE DE LOS NUEVOS ELEMENTOS
========================================================== */

@media (max-width: 650px) {

  .toast-exito {
    top: 12px;
    right: 12px;

    width:
      calc(
        100vw - 24px
      );
  }


  .resumen-confirmacion {
    grid-template-columns:
      1fr;
  }


  .resumen-confirmacion-ancho {
    grid-column: auto;
  }


  th,
  td {
    font-size: 11px;
  }

}




/* ==========================================================
   CONFIRMACIÓN DE EDICIÓN
========================================================== */

.confirmacion-icono-editar {
  color: #356fc1;

  background:
    linear-gradient(
      145deg,
      #edf5ff,
      #ddeaff
    );

  border-color: #c3d9f5;
}


.modo-oscuro .confirmacion-icono-editar {
  color: #b9d8ff;

  background:
    linear-gradient(
      145deg,
      #29405d,
      #24364f
    );

  border-color: #426285;
}


/* ==========================================================
   RESUMEN DE ELIMINACIÓN
========================================================== */

.resumen-eliminacion {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 8px;

  margin:
    15px
    0;
}


.resumen-eliminacion > div {
  padding:
    10px
    12px;

  background: #fff7f8;

  border:
    1px solid
    #f0d5da;

  border-radius: 9px;

  text-align: left;
}


.resumen-eliminacion span {
  display: block;

  margin-bottom: 3px;

  color: #a57882;

  font-size: 10.5px;
  font-weight: 750;

  text-transform: uppercase;
}


.resumen-eliminacion strong {
  display: block;

  color: #693944;

  font-size: 13px;

  overflow-wrap: anywhere;
}


.modo-oscuro .resumen-eliminacion > div {
  background:
    rgba(
      104,
      42,
      56,
      .20
    );

  border-color:
    rgba(
      178,
      76,
      96,
      .36
    );
}


.modo-oscuro .resumen-eliminacion span {
  color: #d29ba7;
}


.modo-oscuro .resumen-eliminacion strong {
  color: #f4d6dc;
}


@media (max-width: 650px) {

  .resumen-eliminacion {
    grid-template-columns:
      1fr;
  }

}



/* Tarjetas de estadísticas en teléfonos especialmente estrechos */
@media (max-width: 380px) {
  .estadisticas-cabecera {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
