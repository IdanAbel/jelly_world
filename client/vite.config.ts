import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["@mui/icons-material/Home"],
    },
    outDir: "dist",
  },
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
