import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
  server: {
    // host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/api": {
        target: "https://api.coingecko.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      '/horizon': {
        target: 'https://api.horizonvaut.com',
        changeOrigin: true,
         secure: false,
        // rewrite: (path) => path.replace(/^\/horizon/, ''),
      },
    },
  },
});
