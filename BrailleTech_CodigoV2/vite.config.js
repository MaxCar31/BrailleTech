import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',  
  root: '.',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        acerca: './acerca.html',
        Testimonios: './Testimonios.html',
        Traductor: './Traductor.html',
      }
    }
  }
});