import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH is set by the GitHub Pages workflow to "/<repo-name>/".
// Locally it stays "/", so `npm start` works as usual.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
