/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/_variables" as *;
          @use "@/styles/_fonts" as *;
          @use "@/styles/_mixins" as *;
        `,
      },
    },
  },
  plugins: [vue(), Components()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    clearMocks: true,
    coverage: {
      reporter: ['lcov'],
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.spec.ts'],
  },
});
