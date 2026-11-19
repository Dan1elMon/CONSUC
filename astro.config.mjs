import { defineConfig } from 'astro/config';

// Local review by default. Set PUBLIC_SITE_URL only for an approved domain.
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || undefined,
});
