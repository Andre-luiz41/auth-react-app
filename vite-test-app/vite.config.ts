import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ou 'localhost'
    port: 5173,
    middlewareMode: 'ssr',
    watch: {
      usePolling: true,
    },
    rewrite: [
      { from: /^\/.*$/, to: '/index.html' }
    ]
  },
  build: {
    outDir: 'dist',
  }
});
