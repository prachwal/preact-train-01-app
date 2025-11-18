import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Use VITE_BASE_URL from environment, fallback to '/' for local development
const baseUrl = process.env.VITE_BASE_URL || '/';

export default defineConfig({
  plugins: [preact()],
  base: baseUrl,
  server: {
    hmr: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    cssMinify: 'esbuild',
    minify: 'esbuild',
    cssCodeSplit: true, // Enable CSS code splitting
    reportCompressedSize: true, // Show gzipped sizes in build output
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks', 'preact/compat'],
          // Split large dependencies
          'lucide-icons': ['lucide-react'],
        },
      },
    },
  },
});
