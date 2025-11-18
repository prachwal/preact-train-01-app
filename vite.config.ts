import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Detect if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] || 'preact-train-01-app';
const baseUrl = isGitHubPages ? `/${repoName}/` : '/';

export default defineConfig({
  plugins: [preact()],
  base: baseUrl, // Dynamic base URL for routing
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
