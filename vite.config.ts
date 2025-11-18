import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  css: {
    devSourcemap: true,
  },
  build: {
    cssMinify: 'esbuild',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks', 'preact/compat'],
        },
      },
    },
  },
});
