// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://sinack.es",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
  vite: {
    ssr: {
      noExternal: ["@keystatic/core", "@keystatic/astro"],
    },
  },
});
