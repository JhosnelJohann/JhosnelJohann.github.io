# -*- coding: utf-8 -*-
"""Comprueba que el CV impreso cumple lo que promete su manual."""
import pathlib
import subprocess
import sys
import pymupdf

AQUI = pathlib.Path(__file__).parent
PDF = AQUI / "_revision" / "cv" / "CV.pdf"

# Regenerar el PDF desde el HTML actual
subprocess.run(["node", str(AQUI / "_cv-paginas.mjs")], check=True, cwd=AQUI)

doc = pymupdf.open(PDF)
fallos = []
ok = lambda m: print("  ok     " + m)
mal = lambda m: (fallos.append(m), print("  FALLO  " + m))

# 1 · Dos paginas exactas
if len(doc) == 2:
    ok("son 2 paginas")
else:
    mal(f"son {len(doc)} paginas, deberian ser 2")

def normalizar(t):
    """El CSS usa letter-spacing en los rotulos, y al extraer el texto eso
    aparece como espacios entre letras: «CO N TAC TO». Comparar sin espacios
    y en minusculas evita falsos negativos."""
    return "".join(t.split()).lower()


p1_crudo = doc[0].get_text()
p2_crudo = doc[1].get_text() if len(doc) > 1 else ""
p1 = normalizar(p1_crudo)
p2 = normalizar(p2_crudo)

# 2 · La pagina 1 se sostiene sola: perfil, puesto actual, competencias, cifras
for texto, que in [
    ("JHOSNEL LAYA", "el nombre"),
    ("Tu Agente de Inmigración", "el puesto actual"),
    ("COMPETENCIAS CLAVE", "las competencias"),
    ("179 de los 211", "la cifra de contribucion"),
    ("soyroas@gmail.com", "el correo"),
    ("jhosneljohann.github.io", "el enlace del portafolio"),
]:
    if normalizar(texto) in p1:
        ok(f"pagina 1 lleva {que}")
    else:
        mal(f"pagina 1 NO lleva {que}: «{texto}»")

# 3 · La pagina 1 termina donde dice el manual
if normalizar("RF Confecciones") in p1:
    ok("pagina 1 llega hasta RF Confecciones")
else:
    mal("pagina 1 no llega hasta RF Confecciones")

# 4 · La pagina 2 empieza y termina donde dice el manual
if normalizar("Asistente de Ventas Online") in p2:
    ok("pagina 2 lleva Asistente de Ventas Online")
else:
    mal("pagina 2 no lleva Asistente de Ventas Online")
if normalizar("Referencias") in p2:
    ok("pagina 2 llega hasta Referencias")
else:
    mal("pagina 2 no llega hasta Referencias")

# 5 · Ningun puesto partido: cada rol aparece en UNA sola pagina
ROLES = [
    "Desarrollador Full-Stack & Automatización",
    "Diseñador Gráfico & Programador Web",
    "Community Manager & Digitalizador",
    "Asistente de Ventas Online & Community Manager",
]
for r in ROLES:
    en1, en2 = normalizar(r) in p1, normalizar(r) in p2
    if en1 and en2:
        mal(f"el puesto «{r}» aparece en LAS DOS paginas: esta partido")
    elif en1 or en2:
        ok(f"«{r[:38]}» entero en la pagina {1 if en1 else 2}")
    else:
        mal(f"el puesto «{r}» NO aparece")

# 6 · La fecha de Duralven, corregida
if normalizar("Jun 2026") in p1 or normalizar("Jun 2026") in p2:
    ok("Duralven termina en Jun 2026")
else:
    mal("no aparece «Jun 2026»: la fecha de Duralven sigue mal")
if normalizar("Presente") in p1 or normalizar("Presente") in p2:
    mal("todavia dice «Presente» en algun sitio")
else:
    ok("no queda ningun «Presente»")

# 7 · La barra lateral llega al pie en las dos paginas
#     Se mide el pixel de la esquina inferior izquierda: debe ser oscuro
for i, pagina in enumerate(doc, 1):
    pix = pagina.get_pixmap(dpi=72)
    r, g, b = pix.pixel(20, pix.height - 20)
    if r + g + b < 200:                       # oscuro
        ok(f"pagina {i}: la barra lateral llega al pie (rgb {r},{g},{b})")
    else:
        mal(f"pagina {i}: la barra lateral NO llega al pie (rgb {r},{g},{b})")

# 8 · El enlace del portafolio es pulsable
enlaces = [l for pg in doc for l in pg.get_links() if "jhosneljohann.github.io" in str(l.get("uri", ""))]
if enlaces:
    ok(f"el enlace del portafolio es pulsable ({enlaces[0]['uri']})")
else:
    mal("el enlace del portafolio NO es pulsable en el PDF")

doc.close()
print("\n" + "=" * 62)
if fallos:
    print(f"{len(fallos)} FALLO(S)")
    sys.exit(1)
print("El CV cumple lo que promete su manual.")
