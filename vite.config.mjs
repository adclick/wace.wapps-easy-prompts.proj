import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*']
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        '**/*'
      ],
      manifest: {
        name: 'EasyPrompts',
        short_name: 'EasyPrompts',
        description: 'Power up your AI experience',
        theme_color: '#1a1b1e',
        background_color: "#1a1b1e",
        icons: [
          {
            src: "/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        screenshots: [
          {
            src: "/screenshot-desktop.jpg",
            sizes: "640x320",
            type: "image/jpg",
            form_factor: "wide",
            label: "EasyPrompts"
          },
          {
            src: "/screenshot-mobile.jpg",
            sizes: "435x786",
            type: "image/jpg",
            form_factor: "narrow",
            label: "EasyPrompts"
          }
        ]
      }
    })
  ],
});
