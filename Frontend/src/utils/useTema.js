import { ref } from 'vue'


// ========================================
// TEMA GLOBAL DE LA PLATAFORMA
// ========================================

const temaGuardado =
  localStorage.getItem(
    'tema-plataforma'
  )


const modoOscuro =
  ref(
    temaGuardado === 'oscuro'
  )



// ========================================
// GUARDAR Y APLICAR TEMA
// ========================================

const establecerTema =
  oscuro => {

    modoOscuro.value =
      oscuro


    localStorage.setItem(
      'tema-plataforma',
      oscuro
        ? 'oscuro'
        : 'claro'
    )


    document.documentElement
      .classList.toggle(
        'tema-oscuro',
        oscuro
      )

  }



// ========================================
// ALTERNAR TEMA
// ========================================

const alternarTema = () => {

  establecerTema(
    !modoOscuro.value
  )

}



// ========================================
// APLICAR TEMA GUARDADO
// ========================================

const aplicarTemaGuardado = () => {

  document.documentElement
    .classList.toggle(
      'tema-oscuro',
      modoOscuro.value
    )

}



// ========================================
// COMPOSABLE
// ========================================

export const useTema = () => {

  return {

    modoOscuro,

    establecerTema,

    alternarTema,

    aplicarTemaGuardado

  }

}