import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const json = async (path) => JSON.parse(await read(path));
const [company, services, routes, inquiry, css, mediaPolicy] = await Promise.all([
  json('src/content/company.json'),
  json('src/content/services.json'),
  json('src/content/routes.json'),
  json('src/contracts/inquiry.schema.json'),
  read('src/styles/tokens.css'),
  json('src/content/media-policy.json'),
]);
const unique = (values, name) => assert.equal(new Set(values).size, values.length, `${name}: valores duplicados`);
assert.equal(services.length, 6, 'Deben existir seis categorías web');
unique(services.map((s) => s.id), 'IDs de servicios');
unique(services.map((s) => s.slug), 'Slugs de servicios');
unique(services.map((s) => s.order), 'Orden de servicios');
for (const s of services) {
  assert.match(s.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(s.title && s.summary && s.scope.length > 0, `Contenido incompleto: ${s.id}`);
  assert.ok(s.order >= 1 && s.order <= 6);
  assert.equal(s.publicationStatus, 'draft', 'El inventario inicial debe permanecer en borrador');
  assert.ok(s.sourcePages.length > 0);
  assert.ok(s.sourcePages.every((p) => Number.isInteger(p) && p >= 1 && p <= 6));
  assert.ok(s.whatsappMessage.length > 20);
  assert.deepEqual(s.media, [], 'No agregar fotos sin revisión al inventario inicial');
  assert.deepEqual(s.projectIds, [], 'No inventar proyectos en el inventario inicial');
}
assert.deepEqual([...inquiry.properties.serviceSlug.enum].sort(), services.map((s) => s.slug).sort(), 'El contrato debe coincidir con el catálogo');
assert.equal(inquiry.additionalProperties, false);
assert.equal(inquiry.properties.privacyAccepted.const, true);
assert.ok(inquiry.required.includes('privacyVersion'));
assert.equal(inquiry.allOf[0].if.properties.type.const, 'quote');
assert.deepEqual(inquiry.allOf[0].then.required, ['serviceSlug', 'location']);
const allRoutes = [...routes.public, ...routes.private];
unique(allRoutes.map((r) => r.path), 'Rutas');
assert.deepEqual(routes.public.map((r) => r.path), ['/'], 'La landing solo tiene una ruta principal');
assert.deepEqual(routes.private, [], 'La landing no incluye panel ni acceso privado');
unique(routes.sections.map((section) => section.anchor), 'Anclas');
for (const section of routes.sections) {
  assert.match(section.anchor, /^[a-z]+(?:-[a-z]+)*$/);
  assert.equal(typeof section.optional, 'boolean');
}
for (const anchor of ['inicio', 'nosotros', 'servicios', 'contacto']) {
  assert.ok(routes.sections.some((section) => section.anchor === anchor && !section.optional));
}
for (const route of allRoutes) assert.ok(route.path.startsWith('/'));
const futureRoutes = [...routes.future.public, ...routes.future.private];
unique(futureRoutes.map((r) => r.path), 'Rutas futuras');
for (const route of futureRoutes) assert.ok(route.path.startsWith('/'));
for (const route of routes.future.private) {
  assert.equal(route.indexable, false);
  if (route.path.startsWith('/admin')) assert.equal(route.authenticationRequired, true);
}
assert.match(company.ruc, /^\d{11}$/);
assert.equal(company.operatingSince, 2020);
assert.equal(company.corporateServiceLines, 4, 'Separar líneas corporativas de categorías web');
assert.equal(company.whatsappNumber, '+51989522797', 'Usar el WhatsApp confirmado por el usuario');
assert.ok(company.phones.includes(company.whatsappNumber));
assert.deepEqual(company.contactConfirmation.fields, ['phones', 'emails', 'whatsappNumber']);
assert.equal(company.inquiryRecipient, null, 'El receptor requiere confirmación');
assert.equal(company.brochureEnabled, false, 'El brochure está excluido de la web por instrucción del usuario');
assert.equal(company.brochurePublicPath, null, 'No debe existir una descarga pública del brochure');
assert.equal(mediaPolicy.authorizedLogoDirectory, 'imgs/Logos');
assert.equal(mediaPolicy.clientLogosAuthorized, true);
assert.equal(mediaPolicy.authorizedClientLogoDirectory, 'imgs/Clientes');
assert.equal(mediaPolicy.photographyMode, 'reference_until_client_originals');
assert.ok(mediaPolicy.referenceLabel);
assert.equal(company.publicationStatus, 'draft');
assert.ok(company.phones.every((phone) => /^\+51\d{9}$/.test(phone)));
for (const color of ['#1c2a39', '#f27d16', '#54b948', '#f4f6f8']) assert.ok(css.includes(color));
assert.ok(css.includes('--text-on-accent: #1c2a39'));
console.log('Arquitectura coherente: landing con anclas únicas, 6 servicios, ampliaciones separadas, contrato futuro alineado y tokens de marca.');
console.log('Esta comprobación no valida una API, sesiones, permisos en ejecución ni el esquema completo de solicitudes.');
