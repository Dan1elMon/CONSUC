# Datos, permisos y flujos

Especificación de implementación. No hay una base de datos, API ni panel desplegados todavía.

## Entidades

Todas las entidades persistidas usan ID opaco, fechas de creación/actualización y relaciones con claves foráneas. Los slugs públicos son únicos. Publicar requiere autorización del servidor y revisión editorial.

| Entidad | Campos principales y relaciones |
| --- | --- |
| CompanyProfile | Razón social, RUC, dirección, teléfonos, correos, año de inicio, misión, visión; revisión editorial y fuente. |
| Service | Slug único, título, resumen, alcance, orden, estado editorial, metadatos SEO; relación con proyectos y medios. |
| Project | Slug único, título, resumen, alcance, sector, ubicación autorizada, fechas opcionales, resultados sustentados, cliente opcional, servicios, galería y estado editorial. |
| Client | Nombre, logo opcional, permiso de nombre/logo, evidencia privada y estado editorial. No confundir con los usuarios del futuro portal. |
| Credential | Tipo, título, emisor, norma/edición si procede, alcance, documento, emisión y vencimiento si aplica, estado de verificación y revisión. No todas son certificaciones. |
| MediaAsset | Clave de objeto, nombre original, MIME detectado, tamaño, checksum, visibilidad, estado de análisis, texto alternativo, procedencia y permiso. |
| Inquiry | Tipo contacto/cotización, número público no secuencial, servicio opcional, nombre, empresa opcional, correo, teléfono opcional, ubicación, fecha deseada opcional, mensaje, estado, responsable y versión de privacidad aceptada. |
| InquiryAttachment | Consulta, archivo privado, fecha y resultado de revisión; no URL pública. |
| InquiryEvent | Consulta, autor, tipo, cambio de estado/nota/asignación y fecha. Historial interno. |
| User / Session | Identidad del proveedor, rol, activo, sesión con caducidad; usuarios por invitación. |
| AuditEvent | Actor, acción, recurso, ID y fecha; excluir contenido completo de consultas y secretos. |
| NotificationOutbox | Consulta, tipo, destinatario configurado, estado, intentos y próxima ejecución. Creada en la misma transacción que la consulta. |

Relaciones: Service N:M Project; Client 1:N Project; Project N:M MediaAsset con orden y pie; Inquiry N:1 Service; Inquiry 1:N InquiryAttachment y InquiryEvent; Inquiry N:1 User responsable. Referencias a servicios archivados se conservan para el historial. No borrar consultas ni activos referenciados desde una acción editorial genérica.

Los JSON de `src/content/` son un inventario inicial, no contienen consultas ni usuarios. El contrato `src/contracts/inquiry.schema.json` describe la entrada pública; los valores internos (estado, responsable, rol) nunca son controlados por el visitante.

## Roles

| Acción | Público | Editor | Comercial | Administrador |
| --- | --- | --- | --- | --- |
| Leer contenido publicado / enviar consulta | Sí | Sí | Sí | Sí |
| Editar borradores, fotos y proyectos | No | Sí | No | Sí |
| Publicar contenido revisado | No | Sí | No | Sí |
| Leer consultas y descargar sus adjuntos | No | No | Sí | Sí |
| Asignar consultas, cambiar estado y añadir notas | No | No | Sí | Sí |
| Gestionar usuarios, contactos receptores y permisos | No | No | No | Sí |

Editor y administrador deben registrar evidencia de publicación en clientes/acreditaciones. El control se aplica en cada operación del servidor, no solo en el menú. Sesiones mediante cookies HttpOnly, Secure en producción y SameSite; caducidad, cierre y revocación. Mutaciones autenticadas con protección CSRF/origen. Un usuario desactivado pierde acceso.

## Cotización con archivos

1. El visitante llega a `/cotizar?servicio=<slug>`; se preselecciona solo un slug válido. Si no existe se solicita elegirlo, sin aceptar valores desconocidos.
2. Completa datos, ubicación y requerimiento; acepta la versión publicada de privacidad. Fecha deseada opcional en formato ISO; validar que no esté en el pasado según America/Lima.
3. Los archivos se envían como multipart al servidor. Límite inicial: cinco archivos, 10 MiB por archivo y 25 MiB en total; tipos permitidos PDF, JPEG y PNG. Otros formatos técnicos se coordinan por contacto hasta implementar su revisión.
4. El servidor valida campos, longitud, MIME real y límites; aplica rate limit y protección automatizada de abuso. Los adjuntos se guardan en cuarentena privada con claves generadas. Nunca confiar en nombre, extensión o MIME declarado por el navegador.
5. Analizar archivos antes de permitir descargas; si el servicio de análisis falla permanecen bloqueados. Borrar huérfanos de envíos incompletos mediante tarea de limpieza. El proveedor de análisis se configura en implementación.
6. Persistir consulta, referencias y aviso pendiente en una transacción; usar clave de idempotencia para que un reintento no duplique la consulta. Ante fallo de base de datos, no mostrar éxito y limpiar objetos huérfanos.
7. Responder con número de referencia, sin reflejar datos privados. El correo interno incluye enlace al panel autenticado, nunca adjuntos ni enlaces de acceso público.
8. Procesar el aviso desde outbox, con reintentos y registro visible de fallos. El fallo de correo no elimina la consulta ni induce al visitante a enviarla otra vez.

La aceptación de privacidad no implica consentimiento comercial. No registrar contenido del formulario, teléfonos ni archivos en analítica. Configurar conservación y borrado junto con el responsable de la empresa antes de producción; no inventar un plazo legal.

## Contratos de endpoints previstos

| Método y ruta | Acceso | Entrada / resultado |
| --- | --- | --- |
| `POST /api/consultas` | Público con límites de abuso | Multipart: `payload` JSON conforme al esquema y hasta cinco `files`. Cabecera `Idempotency-Key`. Devuelve 201 con referencia tras persistencia. |
| `GET /api/admin/consultas` | Comercial/admin | Paginación por cursor, filtros de estado/servicio; devuelve resultados acotados. |
| `GET /api/admin/consultas/:id` | Comercial/admin | Detalle, metadatos de adjuntos e historial. |
| `PATCH /api/admin/consultas/:id` | Comercial/admin | Transición o asignación validada; control de concurrencia mediante versión. |
| `POST /api/admin/consultas/:id/notas` | Comercial/admin | Nota interna con autor de sesión; no enviada automáticamente al cliente. |
| `GET /api/admin/consultas/:id/adjuntos/:archivoId` | Comercial/admin | Comprueba relación y análisis; entrega descarga privada temporal o stream con `no-store` y `Content-Disposition: attachment`. |
| `POST /api/admin/proyectos` | Editor/admin | Crea borrador. |
| `PATCH /api/admin/proyectos/:id` | Editor/admin | Edición validada y con control de concurrencia. |
| `POST /api/admin/proyectos/:id/publicar` | Editor/admin | Revisa datos/fotos, publica y actualiza caché y sitemap. |
| `POST /api/admin/proyectos/:id/archivar` | Editor/admin | Retira de la web y actualiza caché; no destruye referencias. |
| `POST /api/admin/medios` | Editor/admin | Fotografía/documento en borrador; límite y análisis previo a publicación. |

Servicios, clientes y acreditaciones siguen el mismo flujo editorial y autorización de proyectos. Ninguna ruta pública expone borradores ni contactos de consultas. Búsquedas internas usan parámetros y acceso a base de datos seguro.

Errores JSON: `{ "error": { "code": "VALIDATION_ERROR", "message": "Revisa los campos indicados.", "fields": {} } }`. Usar 400 para entrada mal formada, 422 para errores de campos, 401/403 para acceso, 404 para recurso inexistente, 409 para conflicto/idempotencia, 413 para tamaño, 415 para tipo, 429 para exceso y 500 para fallo interno sin detalles sensibles. Los formularios mantienen lo escrito y muestran errores asociados a cada campo. La respuesta correcta no afirma entrega de correo.

## Estados

Editorial: `draft → in_review → published → archived`. Una publicación requiere revisión; cambios posteriores vuelven a borrador y conservan la última versión pública hasta aprobar el reemplazo. Retirada explícita cuando el contenido deba dejar de mostrarse. Para implementarlo se necesita contenido versionado, no mutar directamente el registro público con ediciones pendientes.

Consultas: `new → in_review → contacted → quoted → closed`. `new`, `in_review`, `contacted` y `quoted` pueden pasar a `discarded` con motivo. Reapertura de `closed`/`discarded` a `in_review` con motivo. Toda transición agrega evento con actor y fecha. Esta secuencia no equivale a enviar correos ni a crear presupuestos comerciales automáticamente.

Acreditaciones: estado editorial y verificación independientes. Solo mostrar la condición vigente cuando exista evidencia revisada y no haya vencido. Comprobar vigencia al leer y programar invalidación de caché en la fecha de expiración.

## Ampliaciones

La bolsa laboral necesita entidad Application y archivos CV privados independientes de Inquiry, roles y conservación específicos. El portal de clientes necesita Organization, Membership y ProjectAccess; comprobar pertenencia por cada recurso, archivo y descarga. No basta con compartir un enlace privado ni reutilizar el rol comercial como cliente.
