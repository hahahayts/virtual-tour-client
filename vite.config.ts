import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import htmlConfig from "vite-plugin-html-config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    htmlConfig({
      metas: [{ name: "Name", content: "Defualt description" }],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    allowedHosts: ["virtual-tour-client-1ln9.onrender.com","tubigontourism.com"],
  },
});
