import react from '@vitejs/plugin-react@4.4.1';
import { defineConfig } from 'vite@6.3.5';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        assetInlineLimit: 4096,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['*.gltf', '*.glb'],
  define: {
    'process.env.VITE_WEBSOCKET_URL': JSON.stringify(process.env.VITE_WEBSOCKET_URL),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'process.env.VITE_DEBUG_MODE': JSON.stringify(process.env.VITE_DEBUG_MODE),
  },
});