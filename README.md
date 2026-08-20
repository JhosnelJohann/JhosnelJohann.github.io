# Jhosnel Laya — perfil profesional

Página personal de **Jhosnel Laya**, desarrollador full-stack y especialista en automatización.
De editor de vídeo a responsable técnico de una plataforma en producción, en trece meses.

**React 19 · Vite · TypeScript · Motion** · salida estática, sin backend.

---

## La idea de diseño

La paleta no es decorativa: **es la leyenda de color de sus propios 26 diagramas técnicos**, donde
cada color responde a una pregunta.

| Color | Significa |
|---|---|
| 🟢 Verde | Camino feliz |
| 🔴 Rojo | Fallo |
| 🟡 Amarillo | Espera o intervención humana |
| 🔵 Azul | Sistema externo |
| ⚪ Gris | Persistencia |

Cada proyecto de la web lleva la franja del color de lo que es. Las portadas están **compuestas en
código** con el material real de cada sistema —el mapa de procesos, la máquina de estados, la
rejilla de comprobación del arnés— porque los proyectos son internos y publicar capturas expondría
datos de clientes.

## Estructura

```
src/
  datos/         perfil · proyectos · bitácora · marcas
  componentes/   Nav · Hero · Proporcion · Trayectoria · Proyectos ·
                 Portada · Stack · Diseno · Contacto
  estilos/       tokens y base, con tema claro y oscuro
public/
  foto.jpg       retrato
  diseno/        hojas de muestra de trabajo gráfico
  og.jpg         tarjeta de vista previa al compartir
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
node _revisar.mjs   # auditoría responsive a 320 / 390 / 1280 px, ambos temas
```

`_revisar.mjs` comprueba lo mismo que Jhosnel comprueba en sus propias landings: que no haya
desbordes horizontales en ningún ancho, que las imágenes carguen, que no queden elementos
invisibles y que la consola esté limpia. Falla con código distinto de cero si algo se rompe.

## Despliegue

GitHub Actions reconstruye y publica en cada `push` a `main` (`.github/workflows/pages.yml`).

Para un repositorio de proyecto (no `usuario.github.io`), define la variable de repositorio
`VITE_BASE` con el valor `/nombre-del-repo/`.

## Contacto

📞 [WhatsApp +58 414-5355728](https://wa.me/584145355728) ·
📷 [@jhosneljohann](https://instagram.com/jhosneljohann) ·
📍 Barquisimeto, Venezuela · remoto internacional o presencial
