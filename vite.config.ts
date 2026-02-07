import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const enablePwaInDev = mode === 'development' && env.VITE_PWA_DEV === 'true'

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['pwa.svg', 'pwa-192.png', 'pwa-512.png'],
        devOptions: {
          enabled: enablePwaInDev,
        },
        manifest: {
          name: 'Cerberus',
          short_name: 'Cerberus',
          description: 'Cerberus coaching web app',
          theme_color: '#064092',
          background_color: '#FFFFFF',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'pwa.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: 'pwa.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
            {
              src: 'pwa-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
