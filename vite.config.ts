import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Load file .env

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias untuk folder src
    },
  },
  define: {
    "process.env.REACT_APP_REST_HOST": JSON.stringify(
      process.env.REACT_APP_REST_HOST
    ),
  },
});
