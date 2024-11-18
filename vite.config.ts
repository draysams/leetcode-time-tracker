import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
        {
          src: 'src/background/background.js', // The source background script
          dest: 'background', // The target folder in the build output
        },
        {
          src: 'src/contentScript.js', // The source background script
          dest: '.', // The target folder in the build output
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        background: 'src/background/background.ts',
      },
      output: {
        format: 'es',
      },
    },
  },
  resolve: {
    alias: {
      'webextension-polyfill': 'webextension-polyfill/dist/browser-polyfill.js',
    },
  },
});
