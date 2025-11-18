import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Use VITE_BASE_URL from environment, fallback to '/'
const baseUrl = process.env.VITE_BASE_URL || '/';
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [preact()],
  base: baseUrl, // Dynamic base URL for routing
  server: {
    hmr: isDev ? undefined : false, // Disable HMR in production
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
      external: isDev ? [] : ['/@vite/client'], // Remove HMR client in production
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
