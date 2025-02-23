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
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  define: {
    "process.env.REACT_APP_REST_HOST": JSON.stringify(
      process.env.REACT_APP_REST_HOST
    ),
    "process.env.REACT_APP_REST_AUTH": JSON.stringify(
      process.env.REACT_APP_REST_AUTH
    ),
    "process.env.REACT_APP_REST_TESTI": JSON.stringify(
      process.env.REACT_APP_REST_TESTI
    ),
    "process.env.REACT_APP_REST_DRIVERS": JSON.stringify(
      process.env.REACT_APP_REST_DRIVERS
    ),
  },
});
