import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Adicione esta linha para permitir acesso externo, se necessário
    port: 5173, // Certifique-se de que a porta está correta
    // Para o BrowserRouter, precisamos adicionar esta configuração:
    middlewareMode: 'ssr',
    watch: {
      usePolling: true,
    },
    rewrite: [
      { from: /^\/.*$/, to: '/index.html' }
    ]
  },
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de saída está correto
  }
});
