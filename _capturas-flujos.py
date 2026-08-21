# -*- coding: utf-8 -*-
"""Prepara las capturas de n8n y GHL para el portafolio.

Dos salidas por captura, porque sirven para cosas distintas:

  · GALERIA    el lienzo recuadrado al contenido, para verlo a pantalla completa
  · MINIATURA  un recorte de la zona MAS DENSA, para que se lea en una tarjeta
               de 400 px. Un lienzo entero reducido a ese tamano es una mancha.

El recorte no puede guiarse por "pixel distinto del fondo": el lienzo de n8n y
el de GHL tienen una trama de puntos que se detecta como contenido y hace que
no se recorte nada. Se usa la ENERGIA por fila y columna, que ignora los puntos
sueltos y encuentra donde estan los nodos de verdad.
"""
import pathlib

import numpy as np
from PIL import Image

CACHE = pathlib.Path(
    r"C:\Users\preparador11\.claude\image-cache\a272a751-69a8-4541-bbf1-3acdf9bbeaac"
)
WEB = pathlib.Path(r"C:\Users\preparador11\Desktop\jhosnel-laya-web\public")

# (numero, carpeta, nombre, ¿tema oscuro?, ¿recortar la barra superior?)
CAPTURAS = [
    (22, "n8n", "n8n-setter",            True,  True),
    (24, "n8n", "n8n-seguros-inbound",   True,  True),
    (20, "n8n", "n8n-paula-manhattan",   True,  True),
    (21, "n8n", "n8n-seguimiento-scan",  True,  True),
    (23, "n8n", "n8n-extra",             True,  True),
    (25, "ghl", "ghl-sistema-ventas",    False, True),
    (26, "ghl", "ghl-seguimientos",      False, True),
    (31, "ghl", "ghl-puente-n8n",        False, True),
    (28, "ghl", "ghl-envio-api",         False, True),
    (29, "ghl", "ghl-membresia-bot",     False, True),
    (27, "ghl", "ghl-extra-1",           False, True),
    (30, "ghl", "ghl-extra-2",           False, True),
]

MARGEN = 24
ANCHO_GALERIA = 1500
ANCHO_MINI = 1200
RATIO_MINI = 1600 / 1000       # el mismo que usan las tarjetas del portafolio


def energia(img, oscuro):
    """Mapa de cuanto se aparta cada pixel del fondo del lienzo."""
    g = np.asarray(img.convert("L"), dtype=np.int16)
    # El fondo es el valor mas repetido del lienzo
    fondo = int(np.bincount(g.ravel()).argmax())
    d = np.abs(g - fondo)
    # Umbral alto: la trama de puntos se aparta poco; los nodos, mucho
    return (d > (34 if oscuro else 24)).astype(np.float32)


def recuadrar(img, e):
    """Limites del contenido, ignorando filas y columnas casi vacias."""
    filas, cols = e.sum(axis=1), e.sum(axis=0)
    if filas.max() == 0:
        return (0, 0, img.width, img.height)

    # Se considera "con contenido" lo que supere el 1,5 % del maximo:
    # asi un punto suelto de la trama no cuenta y un nodo si
    uf = filas.max() * 0.015
    uc = cols.max() * 0.015
    yy = np.where(filas > uf)[0]
    xx = np.where(cols > uc)[0]
    if not len(yy) or not len(xx):
        return (0, 0, img.width, img.height)

    return (
        max(0, int(xx[0]) - MARGEN),
        max(0, int(yy[0]) - MARGEN),
        min(img.width, int(xx[-1]) + MARGEN),
        min(img.height, int(yy[-1]) + MARGEN),
    )


def zona_densa(e, ancho, alto):
    """Ventana de tamano (ancho, alto) con mas contenido dentro.

    Se calcula con la suma acumulada en 2D, que da la suma de cualquier
    rectangulo en tiempo constante.
    """
    al, an = e.shape
    ancho, alto = min(ancho, an), min(alto, al)
    ii = np.pad(e, ((1, 0), (1, 0))).cumsum(axis=0).cumsum(axis=1)

    paso = max(8, min(an, al) // 90)
    mejor, mx, my = -1.0, 0, 0
    for y in range(0, al - alto + 1, paso):
        for x in range(0, an - ancho + 1, paso):
            s = (ii[y + alto, x + ancho] - ii[y, x + ancho]
                 - ii[y + alto, x] + ii[y, x])
            if s > mejor:
                mejor, mx, my = s, x, y
    return mx, my, mx + ancho, my + alto


def guardar(img, ruta, ancho, calidad=86):
    if img.width > ancho:
        img = img.resize((ancho, round(img.height * ancho / img.width)), Image.LANCZOS)
    img.convert("RGB").save(ruta, "JPEG", quality=calidad, optimize=True, progressive=True)
    return ruta.stat().st_size / 1024


def main():
    for c in ("n8n", "ghl"):
        (WEB / c).mkdir(parents=True, exist_ok=True)

    print(f"{'archivo':<24} {'original':>11} {'galeria':>11} {'miniatura':>11} {'KB':>7}")
    print("-" * 70)
    total = 0

    for num, carpeta, nombre, oscuro, quitar_barra in CAPTURAS:
        origen = CACHE / f"{num}.png"
        if not origen.exists():
            print(f"{nombre:<24} FALTA")
            continue

        img = Image.open(origen)
        antes = img.size

        # La barra superior es interfaz, no contenido: estorba al recuadrar
        if quitar_barra:
            corte = int(img.height * (0.09 if oscuro else 0.10))
            barra = img.crop((0, 0, img.width, corte))
            img = img.crop((0, corte, img.width, img.height))
        else:
            barra = None

        e = energia(img, oscuro)
        caja = recuadrar(img, e)
        lienzo = img.crop(caja)

        # La galeria lleva de vuelta la barra: da contexto de en que herramienta es
        if barra is not None:
            comp = Image.new("RGB", (lienzo.width, barra.height + lienzo.height))
            comp.paste(barra.convert("RGB").resize((lienzo.width, barra.height), Image.LANCZOS), (0, 0))
            comp.paste(lienzo.convert("RGB"), (0, barra.height))
            galeria = comp
        else:
            galeria = lienzo

        # La galeria va en su carpeta (public/n8n, public/ghl)
        kb1 = guardar(galeria, WEB / carpeta / f"{nombre}.jpg", ANCHO_GALERIA)

        # Miniatura: la zona mas densa, con ZOOM de verdad.
        # La ventana se toma al 55 % del ancho: si fuera casi tan ancha como
        # la imagen no podria desplazarse y no ampliaria nada, que es lo que
        # pasaba antes.
        e2 = energia(lienzo, oscuro)
        ancho_v = int(lienzo.width * 0.55)
        alto_v = int(ancho_v / RATIO_MINI)
        if alto_v > lienzo.height:                 # lienzos muy apaisados
            alto_v = lienzo.height
            ancho_v = min(lienzo.width, int(alto_v * RATIO_MINI))
        zx1, zy1, zx2, zy2 = zona_densa(e2, ancho_v, alto_v)
        mini = lienzo.crop((zx1, zy1, zx2, zy2))

        # La miniatura es la PORTADA de la tarjeta del portafolio, y el
        # componente la busca en public/trabajo/ con el par escritorio+movil
        # que ya usa el resto de fichas.
        (WEB / "trabajo").mkdir(exist_ok=True)
        kb2 = guardar(mini, WEB / "trabajo" / f"{nombre}.jpg", ANCHO_MINI)
        kb2 += guardar(mini, WEB / "trabajo" / f"{nombre}-movil.jpg", 760, calidad=82)

        total += kb1 + kb2
        print(f"{nombre:<24} {antes[0]:>5}x{antes[1]:<5} "
              f"{galeria.width:>5}x{galeria.height:<5} "
              f"{ancho_v:>5}x{alto_v:<5} {kb1 + kb2:>6.0f}")

    print("-" * 70)
    print(f"Total: {total / 1024:.2f} MB  ·  {len(CAPTURAS) * 2} archivos")


if __name__ == "__main__":
    main()
