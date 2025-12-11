import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  sserver: {
    proxy: {
      "/api": {
        target: "http://localhost:5678",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5678",
        changeOrigin: true,
      },
    },
  },
});
