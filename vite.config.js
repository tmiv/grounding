import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/grounding/',
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '*.png'],
      manifest: {
        name: 'grounding',
        short_name: 'Grounding',
        description: '54321 Grounding',
        theme_color: '#ffffff',
        start_url: '/grounding/',
        icons: [
          {
            src: '/grounding/favicon.ico',
            sizes: '16x16 32x32 64x64',
            type: 'image/x-icon'
          },
          {
            src: '/grounding/grounding-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/grounding/grounding-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/grounding/grounding-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })
  ]
})
