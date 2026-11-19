# CONSUC SAC

Landing corporativa de ingeniería, construcción, mantenimiento y transporte para minería e industria, desarrollada con Astro, TypeScript y CSS.

## Estado

Primera versión funcional para revisión local. Incluye Inicio, Nosotros, seis servicios con alcance desplegable, compromisos de seguridad/calidad/ambiente, galería referencial y contacto por WhatsApp, teléfono y correo. Menú móvil accesible y fuentes servidas localmente.

WhatsApp confirmado: +51 989 522 797. El brochure no está en la web. Solo se usan logos de `imgs/Logos`; no se publican logos de clientes ni acreditaciones no verificadas. Las fotos de referencia están rotuladas; su procedencia se registra en [Recursos visuales](docs/recursos-visuales.md).

No se ha desplegado en Internet ni enviado al repositorio remoto. El panel, la base de datos y los formularios quedan fuera del alcance.

## Desarrollo local

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

`check` valida tipos de Astro y el inventario. `test` requiere un build previo y comprueba WhatsApp, los seis mensajes por servicio, las anclas, los archivos de imagen y la exclusión de brochure y clientes. La salida estática para alojamiento es `dist/`.

## Contenido y recursos

- `src/content/company.json`: contactos e identidad.
- `src/content/services.json`: servicios, alcance y mensajes de WhatsApp.
- `src/content/media-policy.json`: autorización y tratamiento de referencias.
- `src/components/sections/`: secciones de la landing.
- `src/assets/references/`: fotografías temporales; sustituir por fotos propias autorizadas.
- `src/styles/tokens.css` y `global.css`: diseño compartido y responsive.

El inventario permanece en borrador como control editorial; la landing es la propuesta de revisión. Las notas editoriales internas nunca se renderizan en la interfaz. No guardar consultas, secretos ni adjuntos privados en Git.

## Publicación posterior

Se recomienda Cloudflare Pages: comando `pnpm build`, directorio `dist`. Requiere configurar y autorizar el alojamiento; no hay despliegue automático activado en el repositorio.

La propuesta lleva `noindex,nofollow` por defecto. Antes del lanzamiento, configurar `PUBLIC_SITE_URL` con el dominio aprobado y `PUBLIC_INDEXABLE=true`, y volver a compilar. `.env.example` documenta las variables; Astro solo carga los archivos `.env` y las variables proporcionadas al proceso, por lo que no basta editar el ejemplo. La URL canónica se genera únicamente cuando existe dominio configurado. El favicon está incluido; sitemap e imagen social definitiva se preparan con el dominio y material final.

## Documentación

- [Arquitectura y etapas](docs/arquitectura.md).
- [Fuentes y control editorial](docs/fuentes-y-contenido.md).
- [Recursos visuales](docs/recursos-visuales.md).
- [Datos y flujos futuros](docs/datos-y-flujos.md), fuera de esta landing.
- [Guía de estilo original](guia_estilo_y_disenio.md).
