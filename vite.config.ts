import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all local IPs
    port: 5173,
    watch: {
      usePolling: true, // Required for Docker/WSL/Network drives
    },
    hmr: {
      overlay: true, // Show errors in browser
    },
  },
});
