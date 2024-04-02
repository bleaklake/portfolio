import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteDeno from "https://deno.land/x/vite_deno_plugin/mod.ts";
import denoResolve from "https://deno.land/x/vite_plugin_deno_resolve/mod.ts";

import "vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteDeno({ importMapFilename: "./deno.json" }),
    vue(),
    denoResolve(),
  ],
  base: "/", // ./
  build: {
    outDir: "./dist", // ./docs
  },
});
