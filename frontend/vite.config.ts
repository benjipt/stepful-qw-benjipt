import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load all env variables, including VITE_*
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_FRONTEND_PORT) || 5173,
      // The proxy option is used to forward API requests from the frontend dev server to the backend server during development.
      // For example, requests to /api/* will be proxied to the backend, avoiding CORS issues.
      proxy: {
        '/api': {
          target: `http://localhost:${env.VITE_BACKEND_PORT ?? 3000}`,
          changeOrigin: true,
        },
      },
    },
  };
});
