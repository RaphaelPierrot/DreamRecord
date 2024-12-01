import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "DreamRecord",
        short_name: "DreamRecord",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4A90E2",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ts,scss}"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["aos"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/global.scss" as *;
          @use "@/scss/variables.scss" as *;
          @use "@/scss/mixins.scss" as *;
        `,
      },
    },
  },
});
