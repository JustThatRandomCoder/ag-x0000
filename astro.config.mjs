// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      allowedHosts: ['ag.x0000.de'],
    },
    preview: {
      allowedHosts: ['ag.x0000.de'],
    },
  },
});
