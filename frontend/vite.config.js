// vite.config.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default {
  // Other Vite configuration...

  server: {
    proxy: createProxyMiddleware('/api', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    }),
  },
};
