import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const json = async (path) => JSON.parse(await read(path));
const [company, services, routes, inquiry, css] = await Promise.all([
  json('src/content/company.json'),
  json('src/content/services.json'),
  json('src/content/routes.json'),
  json('src/contracts/inquiry.schema.json'),
  read('src/styles/tokens.css'),
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
assert.ok(routes.public.some((r) => r.path === '/servicios/[slug]'));
assert.ok(routes.public.some((r) => r.path === '/cotizar'));
for (const route of allRoutes) assert.ok(route.path.startsWith('/'));
for (const route of routes.private) {
  assert.equal(route.indexable, false);
  if (route.path.startsWith('/admin')) assert.equal(route.authenticationRequired, true);
}
assert.match(company.ruc, /^\d{11}$/);
assert.equal(company.operatingSince, 2020);
assert.equal(company.corporateServiceLines, 4, 'Separar líneas corporativas de categorías web');
assert.equal(company.whatsappNumber, null, 'WhatsApp requiere confirmación');
assert.equal(company.inquiryRecipient, null, 'El receptor requiere confirmación');
assert.equal(company.brochurePublicPath, null, 'La descarga requiere revisión');
assert.equal(company.publicationStatus, 'draft');
assert.ok(company.phones.every((phone) => /^\+51\d{9}$/.test(phone)));
for (const color of ['#1c2a39', '#f27d16', '#54b948', '#f4f6f8']) assert.ok(css.includes(color));
assert.ok(css.includes('--text-on-accent: #1c2a39'));
console.log('Arquitectura coherente: 6 servicios, rutas únicas, contrato alineado, inventario en borrador y tokens de marca.');
console.log('Esta comprobación no valida una API, sesiones, permisos en ejecución ni el esquema completo de solicitudes.');
