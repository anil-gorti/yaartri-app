import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import htmlIncludes from './vite-plugin-html-includes.js'

export default defineConfig({
  plugins: [htmlIncludes(), react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
        'how-it-works': resolve(__dirname, 'how-it-works.html'),
        safety: resolve(__dirname, 'safety.html'),
        about: resolve(__dirname, 'about.html'),
        cities: resolve(__dirname, 'cities.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
})
