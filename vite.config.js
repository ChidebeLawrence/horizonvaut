// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
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
    // host: "192.168.56.1",
    // port: 3000,
    host: '0.0.0.0',  // Listen on all interfaces
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
        rewrite: (path) => path.replace(/^\/horizon/, ''),
      },
    },
  },
});
