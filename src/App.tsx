import Nav from './componentes/Nav'
import Encabezado from './componentes/Encabezado'
import Cinta from './componentes/Cinta'
import Experiencia from './componentes/Experiencia'
import Trabajo from './componentes/Trabajo'
import Habilidades from './componentes/Habilidades'
import Diseno from './componentes/Diseno'
import Contacto from './componentes/Contacto'
import { useScrollSuave } from './efectos/movimiento'

/*
 * El recorrido alterna temperatura a propósito: oscuro donde hay espectáculo,
 * claro donde hay que leer. Cada cambio marca un cambio de registro.
 *
 * Portada y Diseño van seguidas y las dos en oscuro: forman un bloque visual
 * de apertura —quién es y qué hace, enseñado, no contado— antes de que la
 * página se abra en claro para lo que hay que leer.
 */
export default function App() {
  useScrollSuave()

  return (
    <>
      <Nav />
      <main>
        <Encabezado />
        <Cinta />
        <Diseno />
        <Experiencia />
        <Trabajo />
        <Habilidades />
        <Contacto />
      </main>
    </>
  )
}
