import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
