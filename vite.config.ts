import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ include: '**/*.svg?react' }),
    visualizer({
      filename: './dist/report.html',
      open: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
