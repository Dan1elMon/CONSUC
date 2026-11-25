# Recursos visuales de la primera propuesta

Los logos corporativos se importan de `imgs/Logos`. La variante utilizada es `LOGO CONSUC PNG.png`, sin modificar el original. El pie usa una presentación monocromática mediante CSS. Los siete logos de clientes se importan de `imgs/Clientes`, por solicitud del usuario del 22 de noviembre de 2026. Se conservan los originales y se generan derivados WebP.

Las fotografías descargadas se conservan en `src/assets/references/` y Astro genera versiones WebP optimizadas. Son referencias visuales y no representan proyectos, instalaciones ni personal de CONSUC. Por solicitud del usuario del 20 de noviembre de 2026, se retiraron de la web las etiquetas y los textos «imagen referencial», incluidos los textos alternativos. Se conserva aquí el registro de procedencia.

| Archivo | Autor y fuente | Condiciones |
| --- | --- | --- |
| `mineria.jpg` | Volker Braun, [Pexels](https://www.pexels.com/photo/aerial-view-of-industrial-open-pit-mining-operation-33122148/) | [Licencia Pexels](https://www.pexels.com/license/), descarga gratuita. |
| `soldadura.jpg` | Kiefer Likens, [Unsplash](https://unsplash.com/photos/man-in-blue-and-black-jacket-smoking-cigarette-sUPiWeqqLt4) | [Licencia Unsplash](https://unsplash.com/license), imagen gratuita. La descripción de la fuente identifica una operación de soldadura industrial. |
| `construccion.jpg` | Jan Huber, [Unsplash](https://unsplash.com/photos/a-construction-site-with-a-crane-in-the-background-kO8f82u73Es) | [Licencia Unsplash](https://unsplash.com/license), imagen gratuita. |
| `ingenieria.jpg` | Yaroslav Shuraev, [Pexels](https://www.pexels.com/photo/person-holding-a-pencil-6282085/) | [Licencia Pexels](https://www.pexels.com/license), descarga gratuita. |
| `electricidad.jpg` | Toolmash Expo, [Unsplash](https://unsplash.com/photos/electrician-testing-electrical-panel-with-multimeter-PkHf7BUWbtk) | [Licencia Unsplash](https://unsplash.com/license), imagen gratuita. |
| `almacen.jpg` | Maor Attias, [Pexels](https://www.pexels.com/photo/boxes-on-shelves-inside-a-warehouse-5156696/) | [Licencia Pexels](https://www.pexels.com/license), descarga gratuita. |
| `transporte.jpg` | Boris Hamer, [Pexels](https://www.pexels.com/photo/a-truck-on-an-expressway-15595843/) | [Licencia Pexels](https://www.pexels.com/license), descarga gratuita. |
| `topografia.jpg` | Khoiru Ummah Kendari 24, [Pexels](https://www.pexels.com/photo/high-precision-construction-surveying-equipment-outdoors-36930873/) | Licencia Pexels, descarga gratuita. |
| `drywall.jpg` | Antoni Shkraba, [Pexels](https://www.pexels.com/photo/a-man-fixing-the-wall-4981812/) | Licencia Pexels, descarga gratuita. |
| `baldosas.jpg` | Sergei Starostin, [Pexels](https://www.pexels.com/photo/construction-worker-laying-tile-in-renovation-project-29181494/) | Licencia Pexels, descarga gratuita. |
| `parquet.jpg` | Ivan Babydov, [Pexels](https://www.pexels.com/photo/wooden-floor-tiles-7789867/) | Licencia Pexels, descarga gratuita. |
| `pintura.jpg` | Miguel Cuenca, [Pexels](https://www.pexels.com/photo/man-painting-building-wall-21327832/) | Licencia Pexels, descarga gratuita. |
| `excavaciones.jpg` | Robert So, [Pexels](https://www.pexels.com/photo/excavator-at-construction-site-20296265/) | Licencia Pexels, descarga gratuita. |
| `senalizacion.jpg` | Connor Scott McManus, [Pexels](https://www.pexels.com/photo/construction-site-warning-with-traffic-cones-34806519/) | Licencia Pexels, descarga gratuita. |
| `cableado.jpg` | Jonathan Cooper, [Pexels](https://www.pexels.com/photo/close-up-of-wires-in-machine-10290624/) | Licencia Pexels, descarga gratuita. |
| `nave-industrial.jpg` | Wenxin Dong, [Pexels](https://www.pexels.com/photo/interior-of-an-empty-warehouse-16924265/) | Licencia Pexels, descarga gratuita. |

Fuentes tipográficas: paquetes `@fontsource-variable/inter` y `@fontsource-variable/montserrat`, servidos localmente, con sus licencias incluidas en los paquetes. No se hacen solicitudes a Google Fonts al visitar la página.

Para reemplazar las referencias, añadir los originales aprobados y actualizar los imports de Hero, About, Gallery y Services y sus textos alternativos. No convertir la galería en casos de éxito sin información verificable.

El 24 de noviembre de 2026 el usuario sustituyó las vistas al pasar el puntero por un carrusel de seis módulos. Sus 29 subservicios tienen imagen, título y descripción siempre visibles dentro de su módulo. La navegación permite elegir categoría, usar anterior/siguiente, flechas del teclado o deslizar en móvil; no cambia automáticamente. Las fotografías se sirven localmente y no muestran etiquetas referenciales, conforme a la solicitud previa del usuario. Algunas fotos ilustran el ámbito general de actividades relacionadas y se reutilizan; no documentan la ejecución del subservicio por CONSUC.

El brochure sigue excluido de los archivos públicos y de los enlaces de la landing.


## Clientes · 22 de noviembre de 2026

El usuario solicitó mostrar los logos de imgs/Clientes en este orden: Ferreyros, Unimaq, SNC-Lavalin, Mota-Engil, Marco, SINAR y FH Ingenieros, seguidos de «Entre otros». Esta solicitud sustituye la exclusión anterior de clientes. Los enlaces oficiales se registran en src/content/clients.json; Por solicitud posterior del usuario, SNC-Lavalin se muestra sin enlace ni acción al pulsar su tarjeta. La sección aparece antes de Contacto, con acceso desde el menú. No se crean fichas de proyectos ni se añaden acreditaciones. Avisar al usuario antes de hacer commits o push.
