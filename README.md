# CONSUC SAC

Landing corporativa de ingeniería, construcción, mantenimiento y transporte para minería e industria, desarrollada con Astro, TypeScript y CSS.

## Estado

Primera versión funcional para revisión local. Incluye Inicio, Nosotros, un carrusel de seis categorías y 30 subservicios ilustrados, compromisos de seguridad/calidad/ambiente, galería, siete clientes y contacto por WhatsApp, teléfono y correo. Menú móvil accesible y fuentes servidas localmente.

WhatsApp confirmado: +51 989 522 797. El brochure no está en la web. Se usan logos corporativos de `imgs/Logos` y siete logos de clientes de `imgs/Clientes`, autorizados por el usuario el 22 de noviembre de 2026. No se publican acreditaciones no verificadas. Las fotos de referencia se muestran sin etiquetas por solicitud del usuario; su procedencia se registra en [Recursos visuales](docs/recursos-visuales.md).

El código está en [Dan1elMon/CONSUC](https://github.com/Dan1elMon/CONSUC). Se incluye un workflow para compartir el avance mediante GitHub Pages; la primera publicación requiere activarlo como se indica abajo. El panel, la base de datos y los formularios quedan fuera del alcance.

## Desarrollo local

Nosotros incluye un carrusel manual con las imágenes Base y Oficinas de `imgs/QuienesSomos`, con flechas, selección directa, teclado y desplazamiento en móvil.

El carrusel de servicios se organiza en Ingeniería, Mantenimiento, Trabajos eléctricos, Servicios misceláneos, Construcción y reparación, y Transporte. Cada módulo muestra fotografías y descripciones de sus subservicios. Navegación por categorías, anterior/siguiente, flechas del teclado sobre el carrusel o deslizamiento en móvil; sin reproducción automática. Los módulos inactivos quedan fuera del recorrido de teclado y la altura se adapta al contenido. Sin JavaScript, los módulos siguen disponibles mediante desplazamiento horizontal.

Requisitos: Node.js 22.12 o posterior y pnpm 11.25.0. Las dependencias se fijan mediante `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abrir la URL que muestra Astro, normalmente `http://127.0.0.1:4321/`.

## Verificación y compilación

```sh
pnpm check
pnpm build
pnpm test
pnpm preview
```

`check` valida tipos de Astro y el inventario. `test` requiere un build previo y comprueba WhatsApp, los seis mensajes por servicio, las anclas, los archivos de imagen y la exclusión del brochure y el orden y enlaces de los clientes. La salida estática para alojamiento es `dist/`.

## Contenido y recursos

- `src/content/company.json`: contactos e identidad.
- `src/content/services.json`: servicios, alcance y mensajes de WhatsApp.
- `src/content/media-policy.json`: autorización y tratamiento de referencias.
- `src/components/sections/`: secciones de la landing.
- `src/assets/references/`: fotografías temporales; sustituir por fotos propias autorizadas.
- `src/styles/tokens.css` y `global.css`: diseño compartido y responsive.

El inventario permanece en borrador como control editorial; la landing es la propuesta de revisión. Las notas editoriales internas nunca se renderizan en la interfaz. No guardar consultas, secretos ni adjuntos privados en Git.

## Mostrar el avance al cliente con GitHub Actions

GitHub Actions compila y publica el sitio; GitHub Pages sirve la página. El cliente recibe el enlace de la web y no necesita instalar nada, abrir el repositorio ni tener cuenta de GitHub.

Archivo preparado: [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Usa Node.js 24, pnpm 11.25.0 y las acciones oficiales de Astro y Pages. Ejecuta tipos, inventario, compilación y seis pruebas; solo publica si todo pasa. Publica únicamente `dist/`, no la carpeta del proyecto, los originales de logos ni la documentación interna.

### Activación inicial

1. Enviar el commit que incluye el workflow a `main`: `git push origin main`.
2. Abrir [Settings → Pages](https://github.com/Dan1elMon/CONSUC/settings/pages) con una cuenta administradora o mantenedora.
3. En **Build and deployment → Source**, seleccionar **GitHub Actions**. No elegir una carpeta `/docs` ni publicar directamente los archivos fuente de Astro.
4. Abrir [Actions](https://github.com/Dan1elMon/CONSUC/actions) y elegir **Publicar avance en GitHub Pages**.
5. Si el primer push ocurrió antes de activar Pages y falló, elegir **Run workflow → main → Run workflow** para iniciarlo otra vez. También puede relanzarse la ejecución fallida.
6. Esperar a que **Verificar y compilar** y **Publicar la vista de revisión** terminen correctamente. La ejecución y Settings → Pages mostrarán el enlace realmente publicado.
7. Abrirlo, revisar menú, imágenes y contactos, y compartir esa URL con el cliente.

Enlace esperado después del primer despliegue exitoso: **[https://dan1elmon.github.io/CONSUC/](https://dan1elmon.github.io/CONSUC/)**. No se considera publicado solo por haber hecho push ni por tener este enlace escrito en el README; comprobar la ejecución de Actions.

GitHub Free admite Pages desde repositorios públicos; los privados requieren un plan compatible. No es necesario crear un token personal ni añadir contraseñas a Secrets para este workflow: la publicación usa los permisos acotados de GitHub Actions. No cambiar la visibilidad del repositorio solo para activar Pages sin revisar lo que expondría.

### Actualizar lo que ve el cliente

```sh
git add <archivos-revisados>
git commit -m "Actualizar propuesta de la landing"
git push origin main
```

Cada push a `main` ejecuta el workflow y reemplaza la versión visible en el mismo enlace. No hay una URL independiente por commit o pull request. Usar ramas de trabajo para cambios que todavía no deban aparecer; enviar a `main` la versión lista para revisión. Si una comprobación falla, el despliegue no se ejecuta y la versión publicada anterior permanece disponible. Para retirar una propuesta errónea, revertir el commit correspondiente y enviar la corrección.

### Rutas y configuración

El workflow establece `PUBLIC_SITE_URL=https://dan1elmon.github.io`, `PUBLIC_BASE_PATH=/CONSUC` y `PUBLIC_INDEXABLE=false`. Astro aplica la ruta base a imágenes y CSS; favicon y 404 también la respetan. En desarrollo local la ruta sigue siendo `/`. Si cambia el usuario o el nombre del repositorio, actualizar esas variables.

Para reproducir la compilación de Pages en PowerShell:

```powershell
$env:PUBLIC_SITE_URL = 'https://dan1elmon.github.io'
$env:PUBLIC_BASE_PATH = '/CONSUC'
$env:PUBLIC_INDEXABLE = 'false'
pnpm check
pnpm build
pnpm test
pnpm preview
```

Abrir `http://127.0.0.1:4321/CONSUC/`. Al volver al desarrollo local normal, quitar las variables de esa sesión (`Remove-Item Env:PUBLIC_SITE_URL, Env:PUBLIC_BASE_PATH, Env:PUBLIC_INDEXABLE -ErrorAction SilentlyContinue`) o abrir una terminal nueva.

### Problemas habituales

| Síntoma | Qué comprobar |
| --- | --- |
| No aparece el workflow | El archivo `.github/workflows/pages.yml` debe estar enviado a `main`; Actions debe estar habilitado para el repositorio. |
| Error de Pages o permisos | Seleccionar Source: GitHub Actions, verificar que el plan admite Pages y revisar las restricciones de la organización o del entorno `github-pages`. |
| Error en instalación | Conservar `package.json` y `pnpm-lock.yaml` sincronizados. No regenerar el lockfile con otro gestor. |
| Error en pruebas | Abrir el job **Verificar y compilar** y leer el primer paso fallido. No saltar las pruebas para publicar. |
| Web 404 | Esperar al resultado de despliegue y usar la URL exacta que devuelve Pages, incluida `/CONSUC/`. |
| CSS, logo o favicon no cargan | Comprobar `PUBLIC_BASE_PATH=/CONSUC`; volver a compilar y desplegar. |

La vista de Pages es pública, aunque se comparta solo con el cliente. `noindex` solicita que los buscadores no la indexen; no proporciona acceso privado. El brochure y los logos de clientes siguen excluidos.

Documentación oficial: [Astro en GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [activar GitHub Actions como fuente de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) y [condiciones y límites de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Pages tiene restricciones para sitios dirigidos a operar negocios o transacciones comerciales; una propuesta no constituye una excepción automática. Mantener Cloudflare Pages como opción para el alojamiento comercial definitivo.

## Alojamiento definitivo

Para Cloudflare Pages: comando `pnpm build`, directorio `dist`, `PUBLIC_BASE_PATH=/` y dominio aprobado en `PUBLIC_SITE_URL`. No reutilizar la base `/CONSUC` al publicar en la raíz de un dominio propio. La cuenta, el dominio y el lanzamiento se coordinan por separado.

La propuesta lleva `noindex,nofollow` por defecto. Antes del lanzamiento definitivo, configurar `PUBLIC_SITE_URL` con el dominio aprobado y `PUBLIC_INDEXABLE=true`, y volver a compilar. `.env.example` documenta las variables; no basta editar el ejemplo. La URL canónica se genera únicamente cuando existe dominio configurado. El favicon está incluido; sitemap e imagen social definitiva se preparan con el dominio y material final.

## Documentación

- [Arquitectura y etapas](docs/arquitectura.md).
- [Fuentes y control editorial](docs/fuentes-y-contenido.md).
- [Recursos visuales](docs/recursos-visuales.md).
- [Datos y flujos futuros](docs/datos-y-flujos.md), fuera de esta landing.
- [Guía de estilo original](guia_estilo_y_disenio.md).


## Clientes · 22 de noviembre de 2026

El usuario solicitó mostrar los logos de imgs/Clientes en este orden: Ferreyros, Unimaq, SNC-Lavalin, Mota-Engil, Marco, SINAR y FH Ingenieros, seguidos de «Entre otros». Esta solicitud sustituye la exclusión anterior de clientes. Los enlaces oficiales se registran en src/content/clients.json; Por solicitud posterior del usuario, SNC-Lavalin se muestra sin enlace ni acción al pulsar su tarjeta. La sección aparece antes de Contacto, con acceso desde el menú. No se crean fichas de proyectos ni se añaden acreditaciones. Avisar al usuario antes de hacer commits o push.
