import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",  // Your backend port
        // changeOrigin: true,// you can maybe add this later to this proxy. its a safe default to make the request look like it came from localhost:3000
      },
    },
  },
});