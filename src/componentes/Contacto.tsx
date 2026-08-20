import { perfil, formacion, certificaciones, idiomas } from '../datos/perfil'
import './Contacto.css'

export default function Contacto() {
  return (
    <section id="contacto" className="cont">
      <div className="env">
        <p className="rotulo"><b>06</b> Formación y contacto</p>

        <div className="cont-rejilla">
          <div className="cont-formacion">
            <h3 className="cont-sub mono">Formación</h3>
            <ul className="estudios">
              {formacion.map((f) => (
                <li key={f.titulo} className="estudio">
                  <p className="estudio-titulo">
                    {f.titulo}
                    {f.estado === 'egresado' && <span className="sello mono">Egresado</span>}
                    {f.estado === 'curso' && <span className="sello sello-curso mono">Cursando</span>}
                  </p>
                  <p className="estudio-centro">{f.centro}</p>
                  <p className="mono estudio-años">{f.años}</p>
                </li>
              ))}
            </ul>

            <h3 className="cont-sub mono">Certificaciones</h3>
            <ul className="estudios">
              {certificaciones.map((c) => (
                <li key={c.titulo} className="estudio">
                  <p className="estudio-titulo">{c.titulo}</p>
                  <p className="estudio-centro">{c.detalle}</p>
                </li>
              ))}
            </ul>

            <h3 className="cont-sub mono">Idiomas</h3>
            <ul className="idiomas">
              {idiomas.map((i) => (
                <li key={i.idioma}>
                  <b>{i.idioma}</b>
                  <span className="mono">{i.nivel}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cont-caja">
            <h2 className="cont-titulo">Hablemos.</h2>
            <p className="cont-texto">{perfil.disponibilidadLarga}</p>

            <div className="cont-botones">
              <a
                className="btn btn-primario"
                href={`https://wa.me/${perfil.telefonoWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp · {perfil.telefono}
              </a>
              <a
                className="btn btn-secundario"
                href={`https://instagram.com/${perfil.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram · @{perfil.instagram}
              </a>
            </div>

            <dl className="cont-datos">
              <div>
                <dt className="mono">Ubicación</dt>
                <dd>{perfil.ubicacion}</dd>
              </div>
              <div>
                <dt className="mono">Disponibilidad</dt>
                <dd>{perfil.disponibilidad}</dd>
              </div>
              <div>
                <dt className="mono">Título</dt>
                <dd>TSU en Informática · IUJO Barquisimeto</dd>
              </div>
            </dl>

            <p className="cont-verificar">
              <b>Todo lo que dice esta página es comprobable.</b> Las afirmaciones sobre el trabajo
              en Tu Agente de Inmigración se verifican contra la bitácora del servidor de
              producción, y su antiguo empleador puede confirmarlas.
            </p>
          </div>
        </div>
      </div>

      <footer className="pie">
        <div className="env pie-env">
          <p className="mono">
            © 2026 Jhosnel Laya · Barquisimeto, Venezuela
          </p>
          <p className="mono pie-nota">
            Hecho con React y Vite. La paleta de esta página es la leyenda de color de sus propios
            diagramas técnicos.
          </p>
        </div>
      </footer>
    </section>
  )
}
