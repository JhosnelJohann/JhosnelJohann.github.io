import Nav from './componentes/Nav'
import Encabezado from './componentes/Encabezado'
import Experiencia from './componentes/Experiencia'
import Trabajo from './componentes/Trabajo'
import Habilidades from './componentes/Habilidades'
import Diseno from './componentes/Diseno'
import Contacto from './componentes/Contacto'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Encabezado />
        <Experiencia />
        <Trabajo />
        <Habilidades />
        <Diseno />
        <Contacto />
      </main>
    </>
  )
}
