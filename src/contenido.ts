/**
 * Punto único desde el que los componentes leen el contenido.
 *
 * El idioma sale de la dirección: `/en/` sirve el inglés y cualquier otra cosa
 * el español. Así cada versión tiene su propia URL para mandar por correo y
 * Google puede indexar las dos por separado — con una sola compilación y un
 * solo paquete.
 */
import * as esPerfil from './datos/perfil'
import * as esTrabajo from './datos/trabajo'
import * as esHabilidades from './datos/habilidades'
import * as esMarcas from './datos/marcas'

import * as esVideo from './datos/video'

import * as enPerfil from './datos/en/perfil'
import * as enTrabajo from './datos/en/trabajo'
import * as enHabilidades from './datos/en/habilidades'
import * as enMarcas from './datos/en/marcas'
import * as enVideo from './datos/en/video'

import { ui, type Idioma, type Textos } from './datos/ui'
import type { Categoria } from './datos/trabajo'

function detectar(): Idioma {
  if (typeof window === 'undefined') return 'es'
  return /^\/en(\/|$)/.test(window.location.pathname) ? 'en' : 'es'
}

export const idioma: Idioma = detectar()
const en = idioma === 'en'

export const t: Textos = ui[idioma] as unknown as Textos

export const perfil = en ? enPerfil.perfil : esPerfil.perfil
export const cifras = en ? enPerfil.cifras : esPerfil.cifras
export const experiencia = en ? enPerfil.experiencia : esPerfil.experiencia
export const formacion = en ? enPerfil.formacion : esPerfil.formacion
export const certificaciones = en ? enPerfil.certificaciones : esPerfil.certificaciones
export const idiomas = en ? enPerfil.idiomas : esPerfil.idiomas

export const trabajo = en ? enTrabajo.trabajo : esTrabajo.trabajo
export const categorias = en ? enTrabajo.categorias : esTrabajo.categorias

export const paneles = en ? enHabilidades.paneles : esHabilidades.paneles
export const marcas = en ? enMarcas.marcas : esMarcas.marcas
export const canales = en ? enMarcas.canales : esMarcas.canales

export const video = en ? enVideo.video : esVideo.video
export { duracion, duracionTotal } from './datos/video'
export type { Pieza as PiezaVideo } from './datos/video'

export { ANCHO_NIVEL } from './datos/habilidades'
export type { Habilidad, Nivel, Panel } from './datos/habilidades'
export type { Pieza, Categoria } from './datos/trabajo'
export type { Marca } from './datos/marcas'
export type { Puesto, Modalidad } from './datos/perfil'

/** Las categorías son la misma clave en los dos idiomas; solo cambia la etiqueta. */
export const etiquetaCategoria = (c: Categoria): string =>
  en ? enTrabajo.etiquetaCategoria[c] : c

/** Edad a partir de la fecha de nacimiento, para que no se quede desfasada. */
export function edad(hoy = new Date()): number {
  const n = new Date(perfil.nacimiento)
  let a = hoy.getFullYear() - n.getFullYear()
  const m = hoy.getMonth() - n.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < n.getDate())) a--
  return a
}

/** Sustituye {n} en las plantillas de texto. */
export const con = (plantilla: string, n: string | number) =>
  plantilla.replace('{n}', String(n))

/**
 * Ruta de una imagen de `public/`.
 *
 * Tiene que ser absoluta: la versión inglesa se sirve desde `/en/`, y una ruta
 * relativa como `foto.jpg` allí se resolvería contra `/en/` y daría 404.
 */
export const img = (ruta: string) => `${import.meta.env.BASE_URL}${ruta}`
