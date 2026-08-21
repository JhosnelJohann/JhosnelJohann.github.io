# -*- coding: utf-8 -*-
"""Compara calidad entre el master en 4K y la version comprimida.

No basta con que ffmpeg no diera error: hay que ver si la compresion se nota.
Se usa VMAF si esta disponible; si no, PSNR y SSIM, que ffmpeg trae siempre.
"""
import pathlib
import re
import subprocess

BASE = (r"C:\Users\preparador11\AppData\Local\Microsoft\WinGet\Packages"
        r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin")
FFMPEG = BASE + r"\ffmpeg.exe"

ORIGEN = pathlib.Path(r"C:\Users\preparador11\Desktop\_video-origen")
WEB = pathlib.Path(r"C:\Users\preparador11\Desktop\jhosnel-laya-web\public\video")

PARES = [
    ("ManhattanLife ADS 2 DEF CON_HEADLINE.mp4", "manhattanlife-headline"),
    ("Ciudadania Problem Aware V1.mp4",          "ciudadania-problem-aware"),
    ("Video 3 ganador + CTA new.mp4",            "video-3-ganador"),
]

print("Compara 20 s de cada uno. El master se reduce a 1080 para que la")
print("comparacion sea justa: se mide la perdida por COMPRESION, no por escala.\n")
print(f"{'video':<28} {'PSNR':>8} {'SSIM':>8}  veredicto")
print("-" * 62)

for orig, web in PARES:
    o, w = ORIGEN / orig, WEB / f"{web}.mp4"
    if not (o.exists() and w.exists()):
        print(f"{web:<28}  falta un archivo")
        continue

    r = subprocess.run(
        [FFMPEG, "-hide_banner", "-t", "20", "-i", str(w), "-t", "20", "-i", str(o),
         "-filter_complex",
         "[1:v]scale=1080:-2:flags=lanczos,format=yuv420p[ref];"
         "[0:v]format=yuv420p[dis];"
         "[dis][ref]ssim=stats_file=-;[dis][ref]psnr",
         "-f", "null", "-"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    salida = r.stderr

    mp = re.search(r"PSNR .*average:([\d.]+)", salida)
    ms = re.search(r"SSIM .*All:([\d.]+)", salida)
    if not (mp and ms):
        # Los filtros duplicados a veces no se pueden encadenar: uno cada vez
        def medir(filtro, patron):
            rr = subprocess.run(
                [FFMPEG, "-hide_banner", "-t", "20", "-i", str(w), "-t", "20", "-i", str(o),
                 "-filter_complex",
                 f"[1:v]scale=1080:-2:flags=lanczos,format=yuv420p[ref];"
                 f"[0:v]format=yuv420p[dis];[dis][ref]{filtro}",
                 "-f", "null", "-"],
                capture_output=True, text=True, encoding="utf-8", errors="replace",
            )
            m = re.search(patron, rr.stderr)
            return float(m.group(1)) if m else None

        psnr = medir("psnr", r"average:([\d.]+)")
        ssim = medir("ssim", r"All:([\d.]+)")
    else:
        psnr, ssim = float(mp.group(1)), float(ms.group(1))

    if psnr is None or ssim is None:
        print(f"{web:<28}  no se pudo medir")
        continue

    # Referencias habituales: SSIM > 0,95 y PSNR > 38 dB se consideran
    # visualmente indistinguibles en material de video
    if ssim >= 0.95 and psnr >= 38:
        v = "indistinguible"
    elif ssim >= 0.92 and psnr >= 34:
        v = "muy buena"
    elif ssim >= 0.88:
        v = "aceptable"
    else:
        v = "SE NOTA - revisar"
    print(f"{web:<28} {psnr:>7.1f}dB {ssim:>8.4f}  {v}")

print("-" * 62)
