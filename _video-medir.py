# -*- coding: utf-8 -*-
"""Mide los videos originales antes de tocarlos.

Sin esto no se puede presupuestar la compresion: 935 MB pueden ser dos
minutos a bitrate brutal o veinte minutos normales, y la estrategia cambia.
"""
import json
import pathlib
import subprocess

ORIGEN = pathlib.Path(r"C:\Users\preparador11\Desktop\_video-origen")
FFPROBE = (r"C:\Users\preparador11\AppData\Local\Microsoft\WinGet\Packages"
           r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
           r"\ffmpeg-9.0-full_build\bin\ffprobe.exe")


def medir(ruta):
    out = subprocess.run(
        [FFPROBE, "-v", "error", "-print_format", "json",
         "-show_format", "-show_streams", str(ruta)],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if out.returncode != 0:
        return None
    d = json.loads(out.stdout)
    v = next((s for s in d["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in d["streams"] if s["codec_type"] == "audio"), None)
    dur = float(d["format"]["duration"])
    tam = int(d["format"]["size"])
    fr = v.get("r_frame_rate", "0/1")
    num, den = (int(x) for x in fr.split("/"))
    return {
        "dur": dur,
        "mb": tam / 1024 / 1024,
        "an": v["width"], "al": v["height"],
        "codec": v["codec_name"],
        "fps": round(num / den, 2) if den else 0,
        "mbps": tam * 8 / dur / 1_000_000,
        "audio": a["codec_name"] if a else "sin audio",
        "vertical": v["height"] > v["width"],
    }


print(f"{'archivo':<44} {'dur':>7} {'resolucion':>11} {'fps':>5} {'Mbps':>7} {'MB':>7}")
print("-" * 92)

total_dur = total_mb = 0
datos = {}
for p in sorted(ORIGEN.glob("*.mp4")):
    m = medir(p)
    if not m:
        print(f"{p.name:<44}  NO SE PUDO LEER")
        continue
    datos[p.name] = m
    total_dur += m["dur"]
    total_mb += m["mb"]
    mm, ss = divmod(int(m["dur"]), 60)
    marca = " V" if m["vertical"] else ""
    print(f"{p.name[:44]:<44} {mm:>4}:{ss:02d} "
          f"{m['an']:>5}x{m['al']:<5}{marca} {m['fps']:>5.0f} "
          f"{m['mbps']:>7.1f} {m['mb']:>7.0f}")

print("-" * 92)
mm, ss = divmod(int(total_dur), 60)
print(f"{'TOTAL':<44} {mm:>4}:{ss:02d} {'':>18} {total_mb:>15.0f} MB")

# Presupuesto: 250 MB para todo, repartido por duracion
PRESUPUESTO_MB = 250
print(f"\nPresupuesto: {PRESUPUESTO_MB} MB para {mm}:{ss:02d} de video")
print(f"Bitrate medio disponible: {PRESUPUESTO_MB * 8 * 1024 / total_dur:>.0f} kbps")
print(f"Reduccion necesaria: {total_mb / PRESUPUESTO_MB:.1f}x")

json.dump(datos, open(ORIGEN / "_medidas.json", "w", encoding="utf-8"),
          indent=2, ensure_ascii=False)
print(f"\nMedidas guardadas en {ORIGEN / '_medidas.json'}")
