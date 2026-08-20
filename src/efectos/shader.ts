/**
 * Malla de gradiente iridiscente en WebGL, escrita a mano.
 *
 * Sin librerías: un quad a pantalla completa y un fragment shader con ruido
 * simplex en dos capas. Pesa unos 6 KB y corre a 60 fps.
 *
 * Se degrada solo, en este orden:
 *   1. Si el visitante pide menos animación  -> no arranca
 *   2. Si no hay WebGL                       -> no arranca (queda el CSS de respaldo)
 *   3. Si la pestaña no está visible         -> pausa
 *   4. Si el lienzo sale de pantalla         -> pausa
 */

const VERT = `
attribute vec2 pos;
void main() { gl_Position = vec4(pos, 0.0, 1.0); }
`

const FRAG = `
/* mediump no da: el ruido simplex y el hash del grano desbordan su rango y
   devuelven NaN, que se pinta BLANCO. Pedimos highp siempre que exista. */
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uRaton;

/* Ruido simplex 2D — Ashima Arts, dominio público. */
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865, 0.366025404, -0.577350269, 0.024390244);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p  = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);

  /* El cursor arrastra el campo con suavidad */
  vec2 r = (uRaton - 0.5) * 0.55;
  float t = uTime * 0.055;

  /* Dos capas de ruido a escalas distintas: una lenta y ancha, otra fina */
  float n1 = snoise(p * 1.35 + vec2(t, -t * 0.7) + r);
  float n2 = snoise(p * 2.9 - vec2(t * 1.3, t * 0.4) - r * 0.6);
  float n  = n1 * 0.68 + n2 * 0.32;

  /* Paleta: azul de marca -> violeta -> verde señal, sobre casi negro */
  vec3 fondo   = vec3(0.027, 0.039, 0.071);
  vec3 azul    = vec3(0.365, 0.608, 1.000);
  vec3 violeta = vec3(0.478, 0.322, 0.925);
  vec3 verde   = vec3(0.239, 0.863, 0.518);

  float m1 = smoothstep(-0.25, 0.85, n);
  float m2 = smoothstep(0.15, 1.05, n + 0.28 * snoise(p * 0.8 + t * 1.6));

  vec3 col = mix(fondo, azul, m1 * 0.62);
  col = mix(col, violeta, m2 * 0.42);
  col += verde * pow(max(n, 0.0), 5.0) * 0.30;

  /* Halo que sigue al cursor */
  float halo = 1.0 - smoothstep(0.0, 0.62, length(p - r * 1.6));
  col += azul * halo * 0.14;

  /* Viñeta y desvanecido hacia abajo, para que el texto respire */
  float vin = 1.0 - smoothstep(0.32, 1.15, length(p));
  col *= 0.38 + 0.62 * vin;
  col *= smoothstep(-0.12, 0.62, 1.0 - uv.y) * 0.55 + 0.45;

  /* Grano fino contra el bandeado. Hash de rango acotado: nada de multiplicar
     por 43758.0, que en precisión baja se va a NaN. */
  float grano = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 137.51);
  col += (grano - 0.5) * 0.016;

  /* Red de seguridad: si algo saliera fuera de rango, se recorta en vez de
     pintar blanco. */
  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`

export interface Shader {
  destruir(): void
}

function compilar(gl: WebGLRenderingContext, tipo: number, fuente: string) {
  const s = gl.createShader(tipo)
  if (!s) return null
  gl.shaderSource(s, fuente)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('shader: fallo al compilar —', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export function montarShader(lienzo: HTMLCanvasElement): Shader | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  const gl =
    (lienzo.getContext('webgl', { antialias: false, alpha: false, depth: false }) ||
      lienzo.getContext('experimental-webgl')) as WebGLRenderingContext | null
  if (!gl) return null

  const vs = compilar(gl, gl.VERTEX_SHADER, VERT)
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const attr = gl.getAttribLocation(prog, 'pos')
  gl.enableVertexAttribArray(attr)
  gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'uRes')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uRaton = gl.getUniformLocation(prog, 'uRaton')

  /* Media resolución: el shader es suave, no se nota, y ahorra la mitad del relleno. */
  const escala = Math.min(window.devicePixelRatio || 1, 1.5) * 0.62

  const medir = () => {
    const w = Math.max(1, Math.round(lienzo.clientWidth * escala))
    const h = Math.max(1, Math.round(lienzo.clientHeight * escala))
    if (lienzo.width !== w || lienzo.height !== h) {
      lienzo.width = w
      lienzo.height = h
      gl.viewport(0, 0, w, h)
    }
    gl.uniform2f(uRes, lienzo.width, lienzo.height)
  }

  const objetivo = { x: 0.5, y: 0.5 }
  const actual = { x: 0.5, y: 0.5 }

  const alMover = (e: PointerEvent) => {
    const r = lienzo.getBoundingClientRect()
    objetivo.x = (e.clientX - r.left) / r.width
    objetivo.y = 1 - (e.clientY - r.top) / r.height
  }

  let visible = true
  let corriendo = true
  let cuadro = 0
  let pintado = false
  const t0 = performance.now()

  /* El lienzo arranca invisible. Solo se muestra cuando hay un fotograma
     dibujado de verdad: si WebGL existe pero no pinta —pasa con los
     renderizadores por software—, queda el degradado CSS de la sección en
     lugar de un rectángulo en blanco tapándolo todo. */
  gl.clearColor(0.027, 0.039, 0.071, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  const bucle = () => {
    if (!corriendo) return
    cuadro = requestAnimationFrame(bucle)
    if (!visible || document.hidden) return
    medir()
    // Persecución suave del cursor: el campo se arrastra, no salta
    actual.x += (objetivo.x - actual.x) * 0.045
    actual.y += (objetivo.y - actual.y) * 0.045
    gl.uniform2f(uRaton, actual.x, actual.y)
    gl.uniform1f(uTime, (performance.now() - t0) / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 3)

    if (!pintado) {
      pintado = true
      /* No nos fiamos de que «WebGL existe» signifique «WebGL pinta bien».
         Leemos un píxel del propio búfer: si sale casi blanco o transparente,
         el controlador está devolviendo basura y el lienzo NO se muestra —
         queda el degradado de la sección, que es correcto. */
      const px = new Uint8Array(4)
      gl.readPixels(
        Math.floor(lienzo.width / 2), Math.floor(lienzo.height / 2),
        1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px,
      )
      const casiBlanco = px[0] > 236 && px[1] > 236 && px[2] > 236
      const vacio = px[3] === 0
      if (casiBlanco || vacio) {
        console.warn('shader: el controlador devuelve un búfer inválido; se usa el degradado')
        corriendo = false
        cancelAnimationFrame(cuadro)
        return
      }
      lienzo.classList.add('listo')
    }
  }

  const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
  obs.observe(lienzo)

  window.addEventListener('pointermove', alMover, { passive: true })
  window.addEventListener('resize', medir)
  medir()
  bucle()

  return {
    destruir() {
      corriendo = false
      cancelAnimationFrame(cuadro)
      obs.disconnect()
      window.removeEventListener('pointermove', alMover)
      window.removeEventListener('resize', medir)
      /* CRÍTICO: hay que quitar la clase. En desarrollo React monta el efecto
         dos veces; si se pierde el contexto y el lienzo sigue marcado como
         listo, queda un lienzo muerto —blanco— tapando la sección entera. */
      lienzo.classList.remove('listo')
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
