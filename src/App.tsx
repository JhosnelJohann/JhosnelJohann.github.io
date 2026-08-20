import Nav from './componentes/Nav'
import Hero from './componentes/Hero'
import Proporcion from './componentes/Proporcion'
import Trayectoria from './componentes/Trayectoria'
import Proyectos from './componentes/Proyectos'
import Stack from './componentes/Stack'
import Diseno from './componentes/Diseno'
import Contacto from './componentes/Contacto'

export default function App() {
  return (
    <>
      <Nav />
      <main id="inicio">
        <Hero />
        <Proporcion />
        <Trayectoria />
        <Proyectos />
        <Stack />
        <Diseno />
        <Contacto />
      </main>
    </>
  )
}
