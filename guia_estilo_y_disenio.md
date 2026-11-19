# Guía de Estilo y Diseño Web — CONSUC SAC

Este documento define la identidad visual, paleta de colores, tipografía y lineamientos de diseño extraídos del brochure corporativo de **CONSUC SAC**, adaptados para el desarrollo de su sitio web oficial.

---

## 1. Concepto y Estilo Visual

* **Personalidad de Marca:** Industrial, corporativa, técnica, confiable y comprometida con la seguridad y el medio ambiente.
* **Dirección de Arte:** Diseño limpio y estructurado basado en bloques modulares. Combina fondos oscuros de alto impacto para encabezados y secciones clave con fondos claros (blanco/gris muy tenue) para garantizar una lectura técnica cómoda y profesional.
* **Recursos Gráficos Clave:**
  * **Numeración de secciones:** Uso de números con cero a la izquierda (`01`, `02`, `03`) en color naranja vibrante sobre los títulos principales.
  * **Acentos geométricos:** Líneas horizontales cortas y gruesas debajo de los títulos (en verde o naranja) y barras verticales naranjas a la izquierda de las etiquetas de fotografía.
  * **Fotografía:** Imágenes reales de operaciones en campo (minería, metalmecánica, mantenimiento eléctrico, transporte) con bordes ligeramente redondeados (`8px` - `12px`) y etiquetas identificadoras superpuestas en la esquina inferior izquierda.

---

## 2. Paleta de Colores

La paleta combina la solidez del azul oscuro industrial con la energía y seguridad del naranja (casco de construcción) y el compromiso ambiental del verde (hojas en el isotipo).

### Colores Principales
| Rol | Nombre | HEX | RGB | Uso Recomendado en Web |
| :--- | :--- | :--- | :--- | :--- |
| **Primario (Oscuro)** | Azul Pizarra Industrial | `#1C2A39` | `rgb(28, 42, 57)` | Fondos de Hero, Header, Footer, etiquetas sobre fotos y textos principales. |
| **Secundario (Acento)** | Naranja Seguridad | `#F27D16` | `rgb(242, 125, 22)` | Botones CTA (Llamados a la acción), numeración de secciones (`01`), viñetas cuadradas y bordes de acento. |
| **Terciario (Sostenibilidad)** | Verde Ecológico | `#54B948` | `rgb(84, 185, 72)` | Subrayados de títulos principales, detalles de seguridad/medio ambiente e íconos de certificación. |

### Colores Neutros y de Soporte
| Rol | Nombre | HEX | RGB | Uso Recomendado en Web |
| :--- | :--- | :--- | :--- | :--- |
| **Fondo Principal** | Blanco Puro | `#FFFFFF` | `rgb(255, 255, 255)` | Fondo general de las secciones de contenido y tarjetas. |
| **Fondo Alternativo** | Gris Hielo | `#F4F6F8` | `rgb(244, 246, 248)` | Fondos de secciones alternas (ej. Nuestros Clientes, Misión/Visión) para dar contraste sutil. |
| **Texto Cuerpo** | Gris Carbón | `#334155` | `rgb(51, 65, 85)` | Párrafos descriptivos y listas de servicios. |
| **Texto Secundario** | Gris Acero | `#64748B` | `rgb(100, 116, 139)` | Subtítulos, pies de foto, RUC y datos legales en el footer. |
| **Overlay Oscuro** | Azul Profundo (85%) | `rgba(28, 42, 57, 0.85)` | — | Capa oscura sobre fotografías de fondo en banners y encabezados. |

---

## 3. Tipografía

El brochure utiliza una tipografía **Sans-Serif geométrica**, robusta para los títulos y muy legible para textos técnicos.

* **Familia Tipográfica Recomendada (Google Fonts):**
  * **Títulos y Encabezados:** `Montserrat` o `Plus Jakarta Sans` (Pesos: `700 Bold`, `800 ExtraBold`).
  * **Cuerpo de Texto y Listas:** `Inter` o `Roboto` (Pesos: `400 Regular`, `500 Medium`, `600 SemiBold`).

### Jerarquía Tipográfica Web
* **H1 (Hero Principal):** `48px` (3rem) | ExtraBold (`800`) | Mayúsculas | Tracking: `+0.02em` | Color: `#FFFFFF`
* **H2 (Títulos de Sección):** `36px` (2.25rem) | Bold (`700`) | Mayúsculas | Color: `#1C2A39` (o `#FFFFFF` en fondo oscuro)
* **Prefijo Numérico (`01`, `02`):** `18px` (1.125rem) | Bold (`700`) | Color: `#F27D16`
* **H3 (Subtítulos de Servicios):** `22px` (1.375rem) | Bold (`700`) | Color: `#1C2A39`
* **Párrafos y Viñetas:** `16px` (1rem) | Regular (`400`) | Interlineado: `1.6` | Color: `#334155`

---

## 4. Componentes UI y Elementos de Diseño

Para mantener total coherencia con el brochure, aplica los siguientes estilos a los elementos de la interfaz:

### A. Encabezados de Sección
Cada sección principal debe seguir este patrón:
1. Número de sección en naranja (`01`, `02`, `03`).
2. Título en mayúsculas y negrita (`¿QUIÉNES SOMOS?`, `NUESTROS SERVICIOS`).
3. Línea decorativa inferior de `60px` de ancho por `4px` de alto en verde (`#54B948`) o naranja (`#F27D16`).

### B. Listas de Servicios (Viñetas)
* Reemplazar los puntos redondos tradicionales por **cuadrados pequeños (`6px x 6px`)** de color Naranja Seguridad (`#F27D16`), tal como se muestran en las páginas 3 y 4 del brochure.

### C. Tarjetas de Fotografía con Etiqueta
* Las imágenes de proyectos deben tener bordes redondeados (`border-radius: 10px`).
* En la esquina inferior izquierda, incluir una etiqueta flotante con fondo Azul Pizarra (`#1C2A39`), texto blanco en mayúsculas y un **borde izquierdo grueso (`4px`) en color Naranja (`#F27D16`)**.

### D. Botones (CTAs)
* **Botón Primario:** Fondo `#F27D16`, texto `#FFFFFF` en negrita, `border-radius: 6px`, padding `12px 24px`. *Hover:* `#D96B0B`.
* **Botón Secundario (Outline):** Borde `2px solid #1C2A39` (o `#FFFFFF` en fondos oscuros), texto del mismo color, `border-radius: 6px`.

### E. Indicadores de Confianza (KPIs / Badges)
* Destacar datos clave en bloques limpios con números grandes en `#1C2A39` y descripción corta debajo:
  * **2020** (Operando desde)
  * **4** (Líneas de servicio)
  * **AWS** (Norma en soldadura)
  * **SGS** (Proveedor Homologado)
  * **Código Vendor:** `215571`

---

## 5. Variables CSS Listas para Usar

Puedes copiar y pegar este bloque directamente en tu hoja de estilos (`styles.css` o configuración de Tailwind):

```css
:root {
  /* Colores de Marca */
  --color-primary: #1C2A39;
  --color-primary-dark: #111A24;
  --color-accent-orange: #F27D16;
  --color-accent-orange-hover: #D96B0B;
  --color-accent-green: #54B948;

  /* Fondos y Superficies */
  --bg-main: #FFFFFF;
  --bg-alt: #F4F6F8;
  --bg-overlay: rgba(28, 42, 57, 0.85);

  /* Textos */
  --text-heading: #1C2A39;
  --text-body: #334155;
  --text-muted: #64748B;
  --text-inverse: #FFFFFF;

  /* Tipografía */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Bordes y Sombras */
  --radius-sm: 6px;
  --radius-md: 10px;
  --shadow-card: 0 4px 20px rgba(28, 42, 57, 0.08);
}
```