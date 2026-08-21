# -*- coding: utf-8 -*-
"""Comprime los 10 videos del portafolio para la web.

Origen: 4K vertical (2160x3840) a 28-79 Mbps. 4,7 GB en total.
Destino: 1080 vertical, H.264, por debajo de 250 MB en total.

Decisiones:
  · 1080 de ancho. En 4K nadie los va a ver dentro de una tarjeta de la web,
    y el peso se multiplica por cuatro.
  · CRF en vez de bitrate fijo: da calidad constante. Los planos quietos
    ocupan poco y los movidos, lo que necesiten.
  · -movflags +faststart mueve el indice al principio del archivo. Sin eso
    el navegador no empieza a reproducir hasta descargarlo entero.
  · Portada extraida a los 1,5 s: en el fotograma 0 muchos anuncios estan aun
    en negro.
"""
import json
import pathlib
import subprocess
import sys
import time

BASE = (r"C:\Users\preparador11\AppData\Local\Microsoft\WinGet\Packages"
        r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin")
FFMPEG = BASE + r"\ffmpeg.exe"
FFPROBE = BASE + r"\ffprobe.exe"

ORIGEN = pathlib.Path(r"C:\Users\preparador11\Desktop\_video-origen")
DESTINO = pathlib.Path(r"C:\Users\preparador11\Desktop\jhosnel-laya-web\public\video")
DESTINO.mkdir(parents=True, exist_ok=True)

ANCHO = 1080
CRF = 25
PRESUPUESTO_MB = 250

# archivo original -> nombre en la web (sin extension)
NOMBRES = {
    "ManhattanLife ADS 2 DEF CON_HEADLINE.mp4":  "manhattanlife-headline",
    "Medicare ADS 05.mp4":                       "medicare-05",
    "Medicare ADS 02 V1 POST.mp4":               "medicare-02",
    "Ciudadania Problem Aware V1.mp4":           "ciudadania-problem-aware",
    "Video 004 271025 Tipos de Asilo CTA 1.mp4": "tipos-de-asilo",
    "PR AW CDDN 01 DEF.mp4":                     "ciudadania-pr-aw",
    "SLT AW CDDN 02.mp4":                        "ciudadania-slt-aw",
    "Secuencia 01_2.mp4":                        "secuencia-01",
    "HOOK 7 + CTA 5.mp4":                        "hook-7-cta-5",
    "Video 3 ganador + CTA new.mp4":             "video-3-ganador",
}


def duracion(ruta):
    r = subprocess.run(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(ruta)],
        capture_output=True, text=True,
    )
    return float(r.stdout.strip()) if r.returncode == 0 else 0.0


def comprimir(entrada, salida):
    cmd = [
        FFMPEG, "-y", "-i", str(entrada),
        # Ancho fijo, alto par calculado: -2 evita alturas impares que rompen H.264
        "-vf", f"scale={ANCHO}:-2:flags=lanczos",
        "-c:v", "libx264", "-preset", "slow", "-crf", str(CRF),
        "-maxrate", "5M", "-bufsize", "10M",     # techo para los planos movidos
        "-profile:v", "high", "-level", "4.1",   # compatible con moviles
        "-pix_fmt", "yuv420p",                   # sin esto, Safari no reproduce
        "-c:a", "aac", "-b:a", "128k", "-ac", "2",
        "-movflags", "+faststart",
        str(salida),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.returncode == 0, r.stderr[-600:] if r.returncode else ""


def portada(entrada, salida, seg=1.5):
    r = subprocess.run(
        [FFMPEG, "-y", "-ss", str(seg), "-i", str(entrada),
         "-frames:v", "1", "-vf", f"scale={ANCHO // 2}:-2",
         "-q:v", "4", str(salida)],
        capture_output=True, text=True,
    )
    return r.returncode == 0


def main():
    pendientes = [p for p in sorted(ORIGEN.glob("*.mp4")) if p.name in NOMBRES]
    if len(pendientes) != len(NOMBRES):
        faltan = set(NOMBRES) - {p.name for p in pendientes}
        print("FALTAN ORIGINALES: " + ", ".join(faltan))
        sys.exit(1)

    print(f"{'salida':<26} {'antes':>8} {'despues':>9} {'ratio':>7} {'dur':>7} {'seg':>6}")
    print("-" * 72)

    fallos, total_mb, t0 = [], 0.0, time.time()

    for p in pendientes:
        nombre = NOMBRES[p.name]
        mp4 = DESTINO / f"{nombre}.mp4"
        jpg = DESTINO / f"{nombre}.jpg"

        d_orig = duracion(p)
        mb_orig = p.stat().st_size / 1024 / 1024
        t = time.time()

        ok, err = comprimir(p, mp4)
        if not ok:
            fallos.append((nombre, "ffmpeg fallo: " + err[:200]))
            print(f"{nombre:<26}  FALLO")
            continue

        # Verificar el EFECTO: que dure lo mismo, no que ffmpeg dijera que si
        d_new = duracion(mp4)
        if abs(d_new - d_orig) > 0.5:
            fallos.append((nombre, f"duracion {d_new:.1f}s frente a {d_orig:.1f}s del original"))

        if not portada(p, jpg):
            fallos.append((nombre, "no se pudo extraer la portada"))

        mb_new = mp4.stat().st_size / 1024 / 1024
        total_mb += mb_new
        mm, ss = divmod(int(d_new), 60)
        print(f"{nombre:<26} {mb_orig:>7.0f}M {mb_new:>8.1f}M "
              f"{mb_orig / mb_new:>6.1f}x {mm:>4}:{ss:02d} {time.time() - t:>6.0f}")

    mb_jpg = sum(p.stat().st_size for p in DESTINO.glob("*.jpg")) / 1024 / 1024
    print("-" * 72)
    print(f"{'TOTAL':<26} {'4737M':>8} {total_mb:>8.1f}M "
          f"{4737 / total_mb:>6.1f}x  + {mb_jpg:.1f}M de portadas")
    print(f"Tiempo: {(time.time() - t0) / 60:.0f} min")

    if total_mb + mb_jpg > PRESUPUESTO_MB:
        fallos.append((f"presupuesto", f"{total_mb + mb_jpg:.0f} MB pasa de {PRESUPUESTO_MB} MB"))

    print()
    if fallos:
        print(f"{len(fallos)} PROBLEMA(S):")
        for n, e in fallos:
            print(f"  {n}: {e}")
        sys.exit(1)
    print(f"Los 10 comprimidos, {total_mb + mb_jpg:.0f} MB de {PRESUPUESTO_MB} permitidos.")


if __name__ == "__main__":
    main()
