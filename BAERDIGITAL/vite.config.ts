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
    },
    {
      name: 'inline-production-css',
      apply: 'build',
      closeBundle() {
        const indexPath = path.resolve(__dirname, 'dist/index.html')
        const html = fs.readFileSync(indexPath, 'utf8')
        const stylesheetPattern = /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/
        const stylesheetMatch = html.match(stylesheetPattern)

        if (!stylesheetMatch) {
          throw new Error('Production stylesheet link was not found in dist/index.html')
        }

        const cssPath = path.resolve(__dirname, 'dist', stylesheetMatch[1].replace(/^\//, ''))
        const css = fs.readFileSync(cssPath, 'utf8')
        const inlinedHtml = html.replace(stylesheetPattern, `<style>${css}</style>`)

        fs.writeFileSync(indexPath, inlinedHtml)
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
