import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

const localPath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// GitHub Pages serves the same atlas as a static React app, without a server.
export default defineConfig({
  root: localPath('./github-pages/'),
  base: '/fra-flight-atlas/',
  publicDir: localPath('./public/'),
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  build: { outDir: localPath('./dist-pages/'), emptyOutDir: true },
});
