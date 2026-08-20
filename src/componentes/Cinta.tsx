import { t } from '../contenido'
import './Cinta.css'

const TECNOLOGIAS = [
  'PostgreSQL', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Express',
  'FastAPI', 'n8n', 'Docker', 'nginx', 'GitHub Actions', 'Vertex AI', 'Claude Code',
  'GoHighLevel', 'Meta CAPI', 'LiveKit', 'Cloudflare R2', 'Linux', 'Redis',
  'Photoshop', 'Illustrator', 'Premiere Pro', 'Meta Ads',
]

/** Marquesina infinita. Dos pistas idénticas para que el bucle no salte. */
export default function Cinta() {
  const pista = (clave: string) => (
    <div className="cinta-pista" key={clave} aria-hidden={clave === 'b'}>
      {TECNOLOGIAS.map((t) => (
        <span className="cinta-item" key={t}>
          <span className="cinta-punto" aria-hidden="true" />
          {t}
        </span>
      ))}
    </div>
  )

  return (
    <div className="cinta-marco oscuro">
      <div className="cinta" aria-label={t.cinta}>
        {pista('a')}
        {pista('b')}
      </div>
    </div>
  )
}
