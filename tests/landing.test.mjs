import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { whatsappUrl, formatPhone } from '../src/lib/whatsapp.mjs';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const base = `/${(process.env.PUBLIC_BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
const services = JSON.parse(await readFile(new URL('../src/content/services.json', import.meta.url), 'utf8'));

test('WhatsApp usa el contacto confirmado y conserva acentos y caracteres del mensaje', () => {
  const message = 'Cotización: ingeniería & diseño, Apurímac + planos';
  const url = new URL(whatsappUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/51989522797');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(formatPhone('+51989522797'), '989 522 797');
});

test('cada servicio tiene una vista con imagen, descripción y consulta específica', () => {
  for (const service of services) {
    assert.ok(html.includes(`id="servicio-${service.slug}"`), service.title);
    assert.ok(html.includes(whatsappUrl(service.whatsappMessage)), `Falta el contacto de ${service.title}`);
    const article = html.split(`id="servicio-${service.slug}"`)[1]?.split('</article>')[0];
    assert.ok(article, service.title);
    const preview = article.match(/<details\b[^>]*class="service-preview"[^>]*>([\s\S]*?)<\/details>/)?.[1];
    assert.ok(preview, `Falta la vista de ${service.title}`);
    assert.ok(preview.includes(`aria-label="Ver imagen y descripción: ${service.title}"`));
    assert.match(preview, /<img\b[^>]*loading="lazy"/);
    assert.match(preview, /<p\b[^>]*>[^<]{30,}<\/p>/);
  }
});

test('las anclas internas apuntan a elementos existentes y los IDs son únicos', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor), anchor);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});

test('la propuesta no publica brochure ni formularios', async () => {
  assert.doesNotMatch(html, /<form\b|href="[^"]*\.pdf|<iframe\b/i);
  assert.doesNotMatch(html, /brochure/i);
  const files = await readdir(new URL('../dist/', import.meta.url), { recursive: true });
  assert.ok(!files.some(file => /\.pdf$/i.test(file)));
  assert.ok(html.includes('noindex,nofollow'), 'La propuesta no debe indexarse por defecto');
});

test('imágenes locales disponibles, con texto alternativo y sin etiquetas referenciales', async () => {
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  assert.ok(images.length >= 5);
  for (const image of images) {
    assert.match(image, /\balt="[^"]+"/);
    const path = image.match(/\bsrc="([^"?]+)(?:\?[^"]*)?"/)?.[1];
    assert.ok(path?.startsWith(`${base}/_astro/`), 'Las imágenes deben respetar la ruta base del alojamiento');
    await access(new URL(`../dist${path.slice(base.length)}`, import.meta.url));
    assert.match(image, /\bwidth="\d+"/);
    assert.match(image, /\bheight="\d+"/);
  }
  assert.doesNotMatch(html, /referencial/i);
});

test('clientes autorizados aparecen en el orden solicitado y enlazan sus sitios oficiales', () => {
  const section = html.match(/<section\b[^>]*id="clientes"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section, 'Falta la sección de clientes');
  const cards = [...section.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)];
  const expected = [
    ['Ferreyros', 'https://www.ferreyros.com.pe/'],
    ['Unimaq', 'https://www.unimaq.com.pe/'],
    ['SNC-Lavalin', null],
    ['Mota-Engil', 'https://www.mota-engil.pe/'],
    ['Marco', 'https://www.marco.com.pe/'],
    ['SINAR', 'https://sinar.com.pe/'],
    ['FH Ingenieros', 'https://fhingenieros.com.pe/'],
  ];
  assert.equal(cards.length, expected.length);
  cards.forEach(([, content], index) => {
    const [name, url] = expected[index];
    assert.ok(content.includes(`alt="${name}"`), name);
    if (!url) {
      assert.doesNotMatch(content, /<a\b|\bhref=|\btarget=|↗/);
      return;
    }
    const attributes = content.match(/<a\b([^>]*)>/)?.[1];
    assert.ok(attributes, name);
    assert.ok(attributes.includes(`href="${url}"`), name);
    assert.match(attributes, /target="_blank"/);
    assert.match(attributes, /rel="noopener noreferrer"/);
  });
  assert.ok(section.includes('Entre otros.'));
  assert.ok(html.includes('href="#clientes"'));
});

test('favicon, recursos y regreso desde 404 respetan la ruta base', async () => {
  const notFound = await readFile(new URL('../dist/404.html', import.meta.url), 'utf8');
  assert.ok(html.includes(`href="${base}/favicon.svg"`));
  assert.ok(notFound.includes(`href="${base}/">Ir al inicio</a>`));
  for (const [, asset] of html.matchAll(/(?:src|href)="([^"#]+\.(?:css|js|svg))"/g)) {
    assert.ok(asset.startsWith(`${base}/`), `Ruta incorrecta: ${asset}`);
    await access(new URL(`../dist${asset.slice(base.length)}`, import.meta.url));
  }
  if (process.env.PUBLIC_SITE_URL) {
    const expected = new URL(`${base}/`, process.env.PUBLIC_SITE_URL).href;
    assert.ok(html.includes(`rel="canonical" href="${expected}"`));
  }
});
