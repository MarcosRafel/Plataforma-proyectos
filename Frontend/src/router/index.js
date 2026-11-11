import { createRouter, createWebHistory } from 'vue-router'

import { apiFetch } from '../utils/api'

// ========================================
// VISTAS
// ========================================

import LoginView from '../views/LoginView.vue'

import ProyectosView from '../views/ProyectosView.vue'

import MisProyectos from '../views/MisProyectos.vue'

import ProyectosGlobalesView from '../views/ProyectosGlobalesView.vue'

import ProyectosDetalleGlobalesView from '../views/ProyectosDetalleGlobalesView.vue'

import ProyectoNuevoView from '../views/ProyectoNuevoView.vue'

import ProyectoDetalleView from '../views/ProyectoDetalleView.vue'

import ProyectoEditarView from '../views/ProyectoEditarView.vue'

import ConvocatoriasView from '../views/ConvocatoriasView.vue'

import UsuarioView from '../views/UsuarioView.vue'

// ========================================
// VISTAS ADMINISTRATIVAS
// ========================================

import ProyectosAdminView from '../views/ProyectosAdminView.vue'

import GestionProyectosAdminView from '../views/GestionProyectosAdminView.vue'

import ProyectoDetalleAdminView from '../views/ProyectoDetalleAdminView.vue'

import UsuarioAdminView from '../views/UsuarioAdminView.vue'

import GestionUsuariosAdminView from '../views/GestionUsuariosAdminView.vue'

import ReportesAdminView from '../views/ReportesAdminView.vue'

// ========================================
// RUTAS
// ========================================

const routes = [
  // ======================================
  // LOGIN
  // ======================================

  {
    path: '/login',

    name: 'login',

    component: LoginView,

    meta: {
      publica: true,
    },
  },

  // ======================================
  // RAÍZ
  // ======================================

  {
    path: '/',

    redirect: {
      name: 'proyectos',
    },
  },

  // ======================================
  // PANEL PRINCIPAL DEL INVESTIGADOR
  // ======================================

  {
    path: '/proyectos',

    name: 'proyectos',

    component: ProyectosView,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // AJUSTES DEL INVESTIGADOR
  // ======================================

  {
    path: '/usuario',

    name: 'usuario-ajustes',

    component: UsuarioView,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // MIS PROYECTOS
  // ======================================

  {
    path: '/mis-proyectos',

    name: 'mis-proyectos',

    component: MisProyectos,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // PROYECTOS GLOBALES
  // ======================================

  {
    path: '/proyectos-globales',

    name: 'proyectos-globales',

    component: ProyectosGlobalesView,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // DETALLE DE PROYECTO GLOBAL
  // ======================================

  {
    path: '/proyectos-globales/:id',

    name: 'proyecto-detalle-global',

    component: ProyectosDetalleGlobalesView,

    props: true,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // NUEVO PROYECTO
  // ======================================

  {
    path: '/proyectos/nuevo',

    name: 'proyecto-nuevo',

    component: ProyectoNuevoView,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // EDITAR PROYECTO
  // ======================================

  {
    path: '/proyectos/:id/editar',

    name: 'proyecto-editar',

    component: ProyectoEditarView,

    props: true,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // DETALLE DEL PROYECTO
  // ======================================

  {
    path: '/proyectos/:id',

    name: 'proyecto-detalle',

    component: ProyectoDetalleView,

    props: true,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ======================================
  // CONVOCATORIAS
  // ======================================

  {
    path: '/convocatorias',

    name: 'convocatorias',

    component: ConvocatoriasView,

    meta: {
      requiereAutenticacion: true,
    },
  },

  // ========================================
  // ÁREA ADMINISTRATIVA
  // ========================================

  {
  path: '/recuperar-contrasena',
  name: 'recuperar-contrasena',
  component: () => import('../views/RecuperarContrasenaView.vue')
},

{
  path: '/reset-password',
  name: 'reset-password',
  component: () => import('../views/ResetPasswordView.vue')
},
  // ======================================
  // PANEL ADMINISTRATIVO
  // ======================================

  {
    path: '/administracion/proyectos',

    name: 'administracion',

    component: ProyectosAdminView,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // GESTIÓN ADMINISTRATIVA DE PROYECTOS
  // ======================================

  {
    path: '/administracion/proyectos/gestion',

    name: 'admin-proyectos-gestion',

    component: GestionProyectosAdminView,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // AJUSTES DEL ADMINISTRADOR
  // ======================================

  {
    path: '/administracion/usuario',

    name: 'usuario-admin-ajustes',

    component: UsuarioAdminView,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // GESTIÓN DE USUARIOS
  // ======================================

  {
    path: '/administracion/usuarios',

    name: 'admin-usuarios',

    component: GestionUsuariosAdminView,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // GESTIÓN DE REPORTES
  // ======================================

  {
    path: '/administracion/reportes',

    name: 'admin-reportes',

    component: ReportesAdminView,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // EDICIÓN ADMINISTRATIVA DEL PROYECTO
  // ======================================

  {
    path: '/administracion/proyectos/:id/editar',

    name: 'proyecto-editar-admin',

    component: ProyectoEditarView,

    props: true,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // DETALLE ADMINISTRATIVO DEL PROYECTO
  // ======================================

  {
    path: '/administracion/proyectos/:id',

    name: 'proyecto-detalle-admin',

    component: ProyectoDetalleAdminView,

    props: true,

    meta: {
      requiereAutenticacion: true,
      requiereAdministrador: true,
    },
  },

  // ======================================
  // RUTA DESCONOCIDA
  // ======================================

  {
    path: '/:pathMatch(.*)*',

    redirect: {
      name: 'proyectos',
    },
  },
]


// ========================================
// CREAR ROUTER
// ========================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,

  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

// ========================================
// OBTENER USUARIO DE LA SESIÓN REAL
// ========================================

const guardarUsuarioSesion = (usuario) => {
  if (!usuario) {
    sessionStorage.removeItem('usuario-plataforma')

    return
  }

  sessionStorage.setItem('usuario-plataforma', JSON.stringify(usuario))
}

const obtenerUsuarioSesion = async () => {
  try {
    const respuesta = await apiFetch('/me', {
      method: 'GET',
    })

    if (!respuesta.ok) {
      guardarUsuarioSesion(null)
      return null
    }

    const datos = await respuesta.json().catch(() => ({}))

    if (!datos.usuario) {
      guardarUsuarioSesion(null)
      return null
    }

    guardarUsuarioSesion(datos.usuario)

    return datos.usuario
  } catch (error) {
    console.error('No fue posible validar la sesión con el servidor:', error)

    guardarUsuarioSesion(null)

    return null
  }
}

// ========================================
// OBTENER ROL DEL USUARIO
// ========================================

const obtenerRolUsuario = (usuario) => {
  if (!usuario) {
    return ''
  }

  const rol =
    typeof usuario.rol === 'string'
      ? usuario.rol
      : usuario?.rol?.nombre || usuario?.nombre_rol || usuario?.tipo_usuario || ''

  return String(rol).trim().toLowerCase()
}

// ========================================
// PROTECCIÓN DE RUTAS
// ========================================

router.beforeEach(async (to) => {
  // ======================================
  // REQUISITOS DE LA RUTA
  // ======================================

  const requiereAutenticacion = to.matched.some((ruta) => ruta.meta.requiereAutenticacion === true)

  const requiereAdministrador = to.matched.some((ruta) => ruta.meta.requiereAdministrador === true)

  // ======================================
  // SESIÓN
  // ======================================

  const usuario = await obtenerUsuarioSesion()

  const haySesion = Boolean(usuario)

  const rol = obtenerRolUsuario(usuario)

  const esAdministrador = rol === 'administrador'

  // ======================================
  // RUTA PROTEGIDA SIN SESIÓN
  // ======================================

  if (requiereAutenticacion && !haySesion) {
    return {
      name: 'login',

      query: {
        redirect: to.fullPath,
      },
    }
  }

  // ======================================
  // RUTA ADMINISTRATIVA SIN PERMISOS
  // ======================================

  if (requiereAdministrador && !esAdministrador) {
    return {
      name: 'proyectos',
    }
  }

  // ======================================
  // ADMINISTRADOR EN ÁREA DE INVESTIGADOR
  // ======================================

  if (esAdministrador && !requiereAdministrador && to.name !== 'login') {
    return {
      name: to.name === 'usuario-ajustes' ? 'usuario-admin-ajustes' : 'administracion',
    }
  }

  // ======================================
  // USUARIO CON SESIÓN ENTRA AL LOGIN
  // ======================================

  if (to.name === 'login' && haySesion) {
    if (esAdministrador) {
      return {
        name: 'administracion',
      }
    }

    return {
      name: 'proyectos',
    }
  }

  return true
})

// ========================================
// EXPORTAR ROUTER
// ========================================

export default router
