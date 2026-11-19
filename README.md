# CONSUC SAC

Base del sitio corporativo de ingeniería, construcción, mantenimiento y transporte para minería e industria.

## Estado actual

Primera entrega: arquitectura y base de contenido. Todavía no hay interfaz web, servidor, base de datos ni panel ejecutables. No se realizan envíos, cargas de archivos o publicaciones. Los contactos y servicios importados del brochure permanecen en borrador para revisión.

## Documentación

- [Arquitectura y mapa del sitio](docs/arquitectura.md): decisiones técnicas, estructura futura, diseño y etapas.
- [Fuentes y contenido](docs/fuentes-y-contenido.md): trazabilidad al brochure, categorías y pendientes editoriales.
- [Datos y flujos futuros](docs/datos-y-flujos.md): referencia de ampliación con cotizaciones y panel, fuera de la landing.
- [Guía de estilo original](guia_estilo_y_disenio.md): identidad visual entregada por el usuario.

## Base incorporada

```text
docs/                          Arquitectura y especificaciones
scripts/check-architecture.mjs  Comprobación de integridad del inventario
src/content/                   Empresa, seis servicios y mapa de rutas
src/contracts/                 Contrato JSON Schema de consultas
src/styles/tokens.css          Variables visuales de la marca
```

## Verificar

Con Node.js instalado, sin dependencias externas:

```sh
node scripts/check-architecture.mjs
```

También se define `npm run check:architecture`. La comprobación verifica JSON, unicidad de rutas/slugs, coincidencia del catálogo con el contrato y límites del inventario inicial. No es una validación completa de JSON Schema ni sustituye pruebas de la futura aplicación.

## Siguiente etapa

Inicializar Astro con TypeScript en este repositorio y fijar las versiones en un archivo de bloqueo. Construir una landing estática con secciones de empresa, seis servicios, contenido visual aprobado, contacto por WhatsApp y brochure descargable. Usar CSS y los tokens existentes. El alojamiento recomendado es Cloudflare Pages; el dominio y el despliegue se configuran cuando se confirme su publicación.

La primera versión no incluye backend, base de datos, formularios, panel ni páginas independientes de servicio. El esquema de consultas queda como referencia futura. Ver requisitos de inicio y criterios de entrega en la arquitectura.

No subir secretos ni adjuntos privados a Git. Los archivos `.env*` y los temporales están excluidos. Cada avance se guarda en un commit acotado; no se ha publicado ni enviado el repositorio remoto como parte de esta primera entrega.
