import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // rewrite removes "/api" from the path before sending to the backend
        // So fetch("/api/boards") becomes http://localhost:3000/boards
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});