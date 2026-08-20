import { perfil, formacion, certificaciones, idiomas } from '../datos/perfil'
import './Contacto.css'

export default function Contacto() {
  return (
    <section id="contacto" className="cont oscuro">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>06</b> Formación y contacto
          </p>
          <h2 className="cab-titulo">Hablemos.</h2>
        </div>

        <div className="cont-rejilla">
          <div className="cont-izq">
            <h3 className="cont-sub mono">Formación académica</h3>

            <div className="form-fila">
              <ul className="estudios">
                {formacion.map((f) => (
                  <li key={f.titulo} className="estudio">
                    <p className="estudio-titulo">
                      {f.titulo}
                      {f.estado === 'egresado' && <span className="et c-verde">Egresado</span>}
                      {f.estado === 'curso' && <span className="et c-amarillo">Cursando</span>}
                    </p>
                    <p className="estudio-centro">{f.centro}</p>
                    <p className="mono estudio-años">{f.años}</p>
                  </li>
                ))}
              </ul>

              <figure className="form-foto">
                <img
                  src="jhosnel-iujo.jpg"
                  alt="Jhosnel Laya durante su etapa de estudiante en el IUJO"
                  loading="lazy"
                  width={900}
                  height={1125}
                />
                <figcaption className="mono">
                  Etapa de estudiante en el IUJO, donde empecé a tomar mis primeros encargos de
                  diseño y edición.
                </figcaption>
              </figure>
            </div>

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
                className="btn btn-borde"
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
                <dt className="mono">Modalidad</dt>
                <dd>{perfil.disponibilidad}</dd>
              </div>
              <div>
                <dt className="mono">Título</dt>
                <dd>TSU en Informática · IUJO Barquisimeto</dd>
              </div>
              <div>
                <dt className="mono">Experiencia</dt>
                <dd>Desde 2019 · siete años</dd>
              </div>
            </dl>

            <p className="cont-verificar">
              <b>Todo lo que digo aquí es comprobable.</b> Lo que afirmo sobre mi trabajo en Tu
              Agente de Inmigración se verifica contra la bitácora del servidor de producción, y mi
              antiguo empleador puede confirmarlo.
            </p>
          </div>
        </div>
      </div>

      <footer className="pie">
        <div className="env pie-env">
          <p className="mono">© 2026 Jhosnel Laya · Barquisimeto, Venezuela</p>
          <p className="mono pie-nota">
            Esta página la hice yo, en React y Vite. El código está{' '}
            <a href="https://github.com/JhosnelJohann/JhosnelJohann.github.io" target="_blank" rel="noopener noreferrer">
              abierto en GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </section>
  )
}
