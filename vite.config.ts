import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import * as path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('src/components/**/*.d.ts', 'index.d.ts'),
        content,
      }),
      include: ['src/components/**/*.tsx'],
      outDir: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
  base: '/',
  ...(process.env.GH_REPO
    ? {}
    : {
        build: {
          lib: {
            name: 'okShaunComponents',
            fileName: (format) => `ok-shaun-components.${format}.js`,
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
        },
      }),
});
