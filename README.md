# artimpresion

Dos sitios web para el sector de imprenta y publicidad. El primero es una
propuesta hecha para un cliente real; el segundo es la versión genérica que
sirve de plantilla y de muestra de trabajo.

| Carpeta | Qué es | Estado |
|---|---|---|
| [`artdiseno/`](artdiseno/) | Propuesta para **Art Diseño Plus** (CDMX, desde 2002) | Entregada al cliente, sin aprobar |
| [`imprimetodo/`](imprimetodo/) | **Imprime Todo** — plantilla mobile-first con marca ficticia | Lista para adaptar |

Ninguno de los dos usa dependencias ni proceso de compilación. Se abren
directamente en el navegador o se sirve la carpeta tal cual:

```bash
python3 -m http.server 8000 --directory imprimetodo
```

---

## `artdiseno/` — propuesta para Art Diseño Plus

Primera versión, en un solo archivo HTML con los estilos y el script
incrustados. Simula varias páginas mostrando y ocultando secciones con
JavaScript: inicio, cinco páginas de servicio, portafolio filtrable, nosotros
y contacto.

La paleta sale de las tintas CMYK porque el cliente es una imprenta, y la
barra de color aparece como separador entre secciones. El logotipo va
incrustado como SVG, vectorizado a partir del perfil de Instagram del cliente.

Se conserva tal como se entregó, como punto de partida y referencia.

## `imprimetodo/` — plantilla mobile-first

Reescritura completa con marca ficticia, pensada para adaptarse a cualquier
imprenta. Los tres archivos van separados:

| Archivo | Contenido |
|---|---|
| `index.html` | Marcado, una sola página con secciones ancladas |
| `styles.css` | Tokens de color, layout y breakpoints |
| `script.js` | Menú móvil, acordeón, filtro y validación del formulario |

### Criterios

**Mobile-first de verdad.** Las reglas base son las del teléfono y las media
queries sólo añaden lo que hace falta hacia arriba: `40em` para tablet y
`64em` para escritorio. No hay `max-width` en ningún lado.

**Logotipo tipográfico.** `IMPRIME` en peso 900 y `TODO` en 300, junto a un
cuadro de registro de cuatro tintas hecho con CSS. No hay archivo de imagen
que reemplazar: se cambia el texto y listo.

**Paleta CMYK.** Cian `#00AEEF`, magenta `#EC008C`, amarillo `#FFF200` y
negro `#231F20`. Los colores se usan como fondo o como bloque, nunca como
texto pequeño sobre blanco, porque no dan el contraste necesario.

**Accesibilidad.** Contraste AA verificado en todos los textos, objetivos
táctiles de 44 px, navegación por teclado con foco visible, enlace para
saltar al contenido, `aria-expanded` en menú y acordeón, y respeto a
`prefers-reduced-motion`.

El magenta puro con texto blanco encima da 4.25:1 y AA pide 4.5, así que los
fondos que llevan texto usan `--m-deep` (`#DD0082`, 4.78:1). La barra CMYK y
los bloques decorativos sí usan el magenta de proceso.

### Para adaptarla a un cliente

1. Cambiar el texto del logotipo en `index.html` (`.logo__text`).
2. Ajustar los tokens de color al inicio de `styles.css`. Si se sale de la
   paleta CMYK, revisar el contraste otra vez.
3. Sustituir los `div` de marcador de posición del portafolio por fotos
   reales y actualizar los `data-cat` de cada elemento.
4. Conectar el formulario: en `script.js` está marcado el punto donde va el
   `fetch()` al endpoint que reciba la cotización. Hoy sólo valida y muestra
   un mensaje de confirmación.
5. Reemplazar el número de WhatsApp y el correo, que aparecen en el header,
   el formulario, el footer y el botón flotante.

---

## Material de origen

La carpeta `fuentes/` queda fuera del control de versiones: contiene los
audios donde el cliente explica su negocio, el `.ai` original del logotipo y
capturas de referencia. Al no estar en Git tampoco hay respaldo automático,
así que conviene mantener una copia aparte.

## Créditos

Diseño y desarrollo: Valeria Moretto.
Imprime Todo es una marca ficticia creada para esta plantilla.
