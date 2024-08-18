import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/', // Asegúrate de que esta ruta sea correcta
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        acerca: './acerca.html',
        Testimonios: './Testimonios.html',
        Traductor: './Traductor.html',
      }
    }
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        injectData: {
          title: 'BrailleTech'
        }
      }
    })
  ]
});