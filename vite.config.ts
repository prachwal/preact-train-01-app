import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Use VITE_BASE_URL from environment, fallback to '/'
const baseUrl = process.env.VITE_BASE_URL || '/';

export default defineConfig({
  plugins: [preact()],
  base: baseUrl, // Dynamic base URL for routing
  define: {
    __DEFINES__: JSON.stringify({}),
    __HMR_CONFIG_NAME__: JSON.stringify('vite-hmr'),
    __HMR_PROTOCOL__: JSON.stringify('ws'),
    __HMR_HOSTNAME__: JSON.stringify('localhost'),
    __HMR_PORT__: JSON.stringify('24678'),
    __HMR_TIMEOUT__: JSON.stringify('30000'),
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
