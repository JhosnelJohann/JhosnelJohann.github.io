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
 */
export default function App() {
  useScrollSuave()

  return (
    <>
      <Nav />
      <main>
        <Encabezado />
        <Cinta />
        <Experiencia />
        <Trabajo />
        <Habilidades />
        <Diseno />
        <Contacto />
      </main>
    </>
  )
}
