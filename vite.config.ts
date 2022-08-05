import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-movie-app/',
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
});
