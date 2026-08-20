import type { Panel } from '../habilidades'

export const paneles: Panel[] = [
  {
    clave: 'desarrollo',
    titulo: 'Engineering & infrastructure',
    intro:
      'Seven of these were not in my toolkit in July 2025. The route was: landing pages → ' +
      'automation → databases → systems architecture → applied AI.',
    color: 'azul',
    bloques: [
      {
        grupo: 'Languages',
        items: [
          { nombre: 'SQL', nivel: 'Avanzado', nota: 'DDL across five schemas, migrations, column-level grants, upserts, JSONB' },
          { nombre: 'JavaScript · Node.js', nivel: 'Avanzado', nota: 'All the agent logic and the CRM backend' },
          { nombre: 'TypeScript', nivel: 'Intermedio-alto', nota: 'CRM frontend and API, landing pages, maintenance scripts' },
          { nombre: 'Python', nivel: 'Intermedio', nota: 'The conformance harness and the FastAPI AI service' },
          { nombre: 'HTML5 · CSS3', nivel: 'Avanzado', nota: 'Responsive verified at 320, 390 and 1280 px' },
          { nombre: 'SVG', nivel: 'Avanzado', nota: 'Animated vector components written by hand, not exported' },
          { nombre: 'Bash', nivel: 'Intermedio', nota: 'Verification scripts with precondition checks' },
        ],
      },
      {
        grupo: 'Databases',
        items: [
          { nombre: 'PostgreSQL', nivel: 'Avanzado', nota: '131 tables designed · engine migration with no data loss' },
          { nombre: 'Modelling & migrations', nivel: 'Avanzado', nota: 'Numbered, idempotent, with their own control table' },
          { nombre: 'Supabase', nivel: 'Intermedio', nota: 'Full self-hosted platform' },
          { nombre: 'Redis', nivel: 'Intermedio', nota: 'Job queue for the scaled execution mode' },
        ],
      },
      {
        grupo: 'Frontend & backend',
        items: [
          { nombre: 'React', nivel: 'Intermedio-alto', nota: 'A complete CRM interface and conversion landing pages' },
          { nombre: 'Next.js', nivel: 'Intermedio-alto', nota: 'App Router and standalone mode, across four applications' },
          { nombre: 'Express', nivel: 'Intermedio-alto', nota: 'The CRM API, with authorisation verified server-side' },
          { nombre: 'FastAPI', nivel: 'Intermedio', nota: 'AI service isolated from everything else' },
        ],
      },
      {
        grupo: 'Automation & integration',
        items: [
          { nombre: 'n8n', nivel: 'Avanzado', nota: 'Queue mode, sub-workflows, state machines, error flows' },
          { nombre: 'GoHighLevel', nivel: 'Avanzado', nota: 'Full API, approved WhatsApp templates, quota management' },
          { nombre: 'Meta Conversions API', nivel: 'Avanzado', nota: 'Deduplication by event_id and SHA-256 hashing' },
          { nombre: 'REST APIs & webhooks', nivel: 'Avanzado', nota: 'With retries, deduplication and error handling' },
        ],
      },
      {
        grupo: 'Artificial intelligence',
        items: [
          { nombre: 'Claude Code', nivel: 'Avanzado', nota: 'I built the entire CRM with it, under a plan-and-audit method' },
          { nombre: 'Google Vertex AI · Gemini', nivel: 'Intermedio-alto', nota: 'Router + generator, with a HIPAA BAA in place' },
          { nombre: 'Shadow-mode rollout', nivel: 'Intermedio-alto', nota: 'The AI runs without acting until there is data on whether it is right' },
        ],
      },
      {
        grupo: 'Infrastructure & DevOps',
        items: [
          { nombre: 'Linux · Ubuntu Server', nivel: 'Intermedio', nota: '29 containers, 19 processes, 22 domains' },
          { nombre: 'Docker · Compose', nivel: 'Intermedio', nota: 'With pinned versions, networks and volumes' },
          { nombre: 'nginx · certbot', nivel: 'Intermedio', nota: 'Reverse proxy and TLS, including diagnosing coverage failures' },
          { nombre: 'Git · GitHub Actions', nivel: 'Intermedio-alto', nota: 'CI/CD deploying over SSH with concurrency locking' },
          { nombre: 'cPanel · DNS · SPF/DKIM', nivel: 'Intermedio', nota: 'Domains and mail across BanaHosting, Namecheap and Cloudflare' },
        ],
      },
      {
        grupo: 'From my degree, not used in production',
        items: [
          { nombre: 'Java', nivel: 'Formación' },
          { nombre: 'JavaFX', nivel: 'Formación' },
          { nombre: 'PHP', nivel: 'Formación' },
          { nombre: 'C++', nivel: 'Formación' },
          { nombre: 'C#', nivel: 'Formación' },
        ],
      },
    ],
  },
  {
    clave: 'diseno',
    titulo: 'Graphic design & editing',
    intro:
      'This is where I come from, and I have seven years in it. I have not dropped it: it is the ' +
      'reason I understand the whole commercial funnel and not just the code holding it up.',
    color: 'amarillo',
    bloques: [
      {
        grupo: 'Graphic design',
        items: [
          { nombre: 'Adobe Photoshop', nivel: 'Avanzado', nota: 'Composition, retouching and product montage since 2019' },
          { nombre: 'Adobe Illustrator', nivel: 'Avanzado', nota: 'Brand identity, vectorisation, graphic systems' },
          { nombre: 'Art direction', nivel: 'Avanzado', nota: 'Seven brands, each with its own graphic system' },
          { nombre: 'Brand systems', nivel: 'Avanzado', nota: 'Palette, type and application across catalogue and campaign' },
          { nombre: 'Embroidery design', nivel: 'Intermedio', nota: 'Digitising from sketch to production file' },
        ],
      },
      {
        grupo: 'Video editing',
        items: [
          { nombre: 'Adobe Premiere Pro', nivel: 'Avanzado', nota: 'Vertical video for social, scripted' },
          { nombre: 'Wondershare Filmora', nivel: 'Avanzado', nota: 'Fast turnaround on short pieces and channel content' },
          { nombre: 'Scripting & publishing', nivel: 'Avanzado', nota: 'From script to publication, for Instagram and YouTube' },
          { nombre: 'Product photography', nivel: 'Intermedio-alto', nota: 'Fashion campaigns and automotive catalogue' },
        ],
      },
      {
        grupo: 'Marketing & measurement',
        items: [
          { nombre: 'Meta Ads Manager', nivel: 'Avanzado', nota: 'Building campaigns and reading the results' },
          { nombre: 'Ad attribution', nivel: 'Avanzado', nota: 'Pixel + CAPI with deduplication; I caught a real double-count' },
          { nombre: 'Conversion funnels', nivel: 'Avanzado', nota: 'Maze Funnels certified · from the ad to the CRM' },
          { nombre: 'Lucidchart · diagramming', nivel: 'Avanzado', nota: '26 diagrams with a written legend and conventions' },
        ],
      },
    ],
  },
]

export const declarados = ['Java', 'JavaFX', 'PHP', 'C++', 'C#']
