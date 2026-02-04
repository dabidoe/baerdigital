import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-assets',
      apply: 'build',
      writeBundle() {
        const src = path.resolve(__dirname, 'assets/src/assets')
        const dest = path.resolve(__dirname, 'dist/assets')
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true })
        }
        fs.cpSync(src, dest, { recursive: true, force: true })
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
