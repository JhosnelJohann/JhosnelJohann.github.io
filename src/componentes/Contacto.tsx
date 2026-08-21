import { perfil, formacion, certificaciones, idiomas, img, t } from '../contenido'
import Rico from './Rico'
import './Contacto.css'

export default function Contacto() {
  return (
    <section id="contacto" className="cont oscuro">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>{t.cont.num}</b> {t.cont.rotulo}
          </p>
          <h2 className="cab-titulo">{t.cont.titulo}</h2>
        </div>

        <div className="cont-rejilla">
          <div className="cont-izq">
            <h3 className="cont-sub mono">{t.cont.formacion}</h3>

            <div className="form-fila">
              <ul className="estudios">
                {formacion.map((f) => (
                  <li key={f.titulo} className="estudio">
                    <p className="estudio-titulo">
                      {f.titulo}
                      {f.estado === 'egresado' && <span className="et c-verde">{t.cont.egresado}</span>}
                      {f.estado === 'curso' && <span className="et c-amarillo">{t.cont.cursando}</span>}
                    </p>
                    <p className="estudio-centro">{f.centro}</p>
                    <p className="mono estudio-años">{f.años}</p>
                  </li>
                ))}
              </ul>

              <figure className="form-foto">
                <img
                  src={img('jhosnel-iujo.jpg')}
                  alt={t.alt.iujo}
                  loading="lazy"
                  width={900}
                  height={1125}
                />
                <figcaption className="mono">{t.cont.pieFoto}</figcaption>
              </figure>
            </div>

            <h3 className="cont-sub mono">{t.cont.certificaciones}</h3>
            <ul className="estudios">
              {certificaciones.map((c) => (
                <li key={c.titulo} className="estudio">
                  <p className="estudio-titulo">{c.titulo}</p>
                  <p className="estudio-centro">{c.detalle}</p>
                </li>
              ))}
            </ul>

            <h3 className="cont-sub mono">{t.cont.idiomas}</h3>
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
              <a className="btn btn-borde" href={`mailto:${perfil.correo}`}>
                {perfil.correo}
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
                <dt className="mono">{t.datos.correo}</dt>
                <dd>
                  <a className="cont-correo" href={`mailto:${perfil.correo}`}>
                    {perfil.correo}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">{t.datos.ubicacion}</dt>
                <dd>{perfil.ubicacion}</dd>
              </div>
              <div>
                <dt className="mono">{t.datos.nacimiento}</dt>
                {/* Solo la fecha. La edad se deduce de ella, y ponerla escrita
                    convierte un dato neutro en una etiqueta. */}
                <dd>
                  <time dateTime={perfil.nacimiento}>{perfil.nacimientoTexto}</time>
                </dd>
              </div>
              <div>
                <dt className="mono">{t.datos.modalidad}</dt>
                <dd>{perfil.disponibilidad}</dd>
              </div>
              <div>
                <dt className="mono">{t.datos.titulo}</dt>
                <dd>{perfil.tituloCorto}</dd>
              </div>
              <div>
                <dt className="mono">{t.datos.experiencia}</dt>
                <dd>
                  {t.datos.desde} {perfil.experienciaDesde} · {t.datos.sieteAños}
                </dd>
              </div>
            </dl>

            <p className="cont-verificar">
              <Rico texto={t.cont.verificar} />
            </p>
          </div>
        </div>
      </div>

      <footer className="pie">
        <div className="env pie-env">
          <p className="mono">© 2026 Jhosnel Laya · Barquisimeto, Venezuela</p>
          <p className="mono pie-nota">
            {t.cont.pieCodigo}{' '}
            <a href="https://github.com/JhosnelJohann/JhosnelJohann.github.io" target="_blank" rel="noopener noreferrer">
              {t.cont.pieEnlace}
            </a>
            .
          </p>
        </div>
      </footer>
    </section>
  )
}
