import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5174, // Use your working port
    strictPort: true,
    watch: {
      usePolling: true, // Fixes HMR not working on mobile
    },
    hmr: {
      clientPort: 5174, // Ensure WebSocket connects properly
    },
  },
});
