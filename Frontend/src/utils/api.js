const normalizarBase = valor =>
  String(valor || '')
    .trim()
    .replace(/\/$/, '')

/*
  En desarrollo se usa el backend local. En producción, Vercel
  reenvía /api al backend de Render para conservar cookies same-origin.

  Si se necesita un backend en otro origen,
  define VITE_API_URL.
*/
export const API_URL =
  normalizarBase(
    import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV
        ? 'http://localhost:3000/api'
        : '/api')
  )

export const apiFetch = (
  ruta,
  opciones = {}
) => {
  const rutaTexto =
    String(ruta || '')

  const destino =
    /^https?:\/\//i.test(rutaTexto)
      ? rutaTexto
      : `${API_URL}${rutaTexto}`

  return fetch(
    destino,
    {
      ...opciones,
      credentials:
        opciones.credentials ||
        'include'
    }
  )
}
