import { defineConfig } from 'astro/config';

// Root locally or on a custom domain; /CONSUC/ for the GitHub Pages preview.
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || undefined,
  base: process.env.PUBLIC_BASE_PATH || '/',
  trailingSlash: 'always',
});
