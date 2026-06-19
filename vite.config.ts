import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes asset paths relative, so the same build works on
// GitHub Pages project sites, Netlify, Vercel, etc. without extra config.
export default defineConfig({
  base: './',
  plugins: [react()],
});
