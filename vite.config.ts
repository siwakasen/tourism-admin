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
  build: {
    minify: 'esbuild',
    rollupOptions:{
        output: {
            manualChunks(id) {
            if (id.includes("node_modules")) {
                return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
            },

        },

    }
}
});
