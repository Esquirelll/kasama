import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// On GitHub Pages the site lives at /<repo-name>/, so the build is given that base (see .github/workflows/deploy.yml).
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'framer-motion', 'd3-geo'] },
})
