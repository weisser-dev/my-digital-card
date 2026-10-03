import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

// Relative base so the card works under any URL (GitHub Pages, static-sites, local).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {outDir: 'build', emptyOutDir: true},
  test: {environment: 'jsdom', globals: true},
});
