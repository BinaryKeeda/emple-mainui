import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  server: {
    port: 5173,
    proxy: {

      '/campus-admin': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        ws: true,
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.url === '/campus-admin') {
              proxyReq.path += '/'
            }
          })
        }
      }
    }
  },

}))
