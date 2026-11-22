# Recursos visuales de la primera propuesta

Los logos corporativos se importan de `imgs/Logos`. La variante utilizada es `LOGO CONSUC PNG.png`, sin modificar el original. El pie usa una presentación monocromática mediante CSS. Los siete logos de clientes se importan de `imgs/Clientes`, por solicitud del usuario del 22 de noviembre de 2026. Se conservan los originales y se generan derivados WebP.

Las fotografías descargadas se conservan en `src/assets/references/` y Astro genera versiones WebP optimizadas. Son referencias visuales y no representan proyectos, instalaciones ni personal de CONSUC. Por solicitud del usuario del 20 de noviembre de 2026, se retiraron de la web las etiquetas y los textos «imagen referencial», incluidos los textos alternativos. Se conserva aquí el registro de procedencia.

| Archivo | Autor y fuente | Condiciones |
| --- | --- | --- |
| `mineria.jpg` | Volker Braun, [Pexels](https://www.pexels.com/photo/aerial-view-of-industrial-open-pit-mining-operation-33122148/) | [Licencia Pexels](https://www.pexels.com/license/), descarga gratuita. |
| `soldadura.jpg` | Kiefer Likens, [Unsplash](https://unsplash.com/photos/man-in-blue-and-black-jacket-smoking-cigarette-sUPiWeqqLt4) | [Licencia Unsplash](https://unsplash.com/license), imagen gratuita. La descripción de la fuente identifica una operación de soldadura industrial. |
| `construccion.jpg` | Jan Huber, [Unsplash](https://unsplash.com/photos/a-construction-site-with-a-crane-in-the-background-kO8f82u73Es) | [Licencia Unsplash](https://unsplash.com/license), imagen gratuita. |

Fuentes tipográficas: paquetes `@fontsource-variable/inter` y `@fontsource-variable/montserrat`, servidos localmente, con sus licencias incluidas en los paquetes. No se hacen solicitudes a Google Fonts al visitar la página.

Para reemplazar las referencias, añadir los originales aprobados y actualizar los imports de Hero, About y Gallery y sus textos alternativos. No convertir la galería en casos de éxito sin información verificable.

El brochure sigue excluido de los archivos públicos y de los enlaces de la landing.


## Clientes · 22 de noviembre de 2026

El usuario solicitó mostrar los logos de imgs/Clientes en este orden: Ferreyros, Unimaq, SNC-Lavalin, Mota-Engil, Marco, SINAR y FH Ingenieros, seguidos de «Entre otros». Esta solicitud sustituye la exclusión anterior de clientes. Los enlaces oficiales se registran en src/content/clients.json; SNC-Lavalin enlaza a AtkinsRéalis, su nombre actual. La sección aparece antes de Contacto, con acceso desde el menú. No se crean fichas de proyectos ni se añaden acreditaciones. Avisar al usuario antes de hacer commits o push.
