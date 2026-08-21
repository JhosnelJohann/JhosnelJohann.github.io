# -*- coding: utf-8 -*-
"""Rasteriza el PDF real del CV, pagina por pagina, y saca el texto de cada una.
Asi se ve DONDE corta el navegador de verdad, no donde yo calculo que corta."""
import pathlib
import pymupdf

PDF = pathlib.Path(r"C:\Users\preparador11\Desktop\jhosnel-laya-web\_revision\cv\CV.pdf")
SALIDA = PDF.parent

doc = pymupdf.open(PDF)
print(f"Paginas: {len(doc)}")

for i, pagina in enumerate(doc, 1):
    # Imagen a 110 dpi, suficiente para leerla
    pix = pagina.get_pixmap(dpi=110)
    destino = SALIDA / f"real-{i}.png"
    pix.save(destino)

    texto = pagina.get_text().strip()
    lineas = [l.strip() for l in texto.splitlines() if l.strip()]

    print(f"\n{'=' * 66}")
    print(f"PAGINA {i}  ·  {pix.width}x{pix.height}px  ·  {len(lineas)} lineas de texto")
    print(f"{'=' * 66}")
    print("  EMPIEZA:")
    for l in lineas[:4]:
        print(f"    {l[:72]}")
    print("  ...")
    print("  TERMINA:")
    for l in lineas[-4:]:
        print(f"    {l[:72]}")

    # Cuanto de la pagina esta ocupado: buscar el bloque de texto mas bajo
    bloques = pagina.get_text("blocks")
    if bloques:
        mas_bajo = max(b[3] for b in bloques)
        print(f"  El contenido llega hasta el {mas_bajo / pagina.rect.height * 100:.0f}% de la altura")

doc.close()
print(f"\nImagenes en {SALIDA}")
