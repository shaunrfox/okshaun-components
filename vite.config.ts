import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components', 'src/hooks', 'src/utils'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: [
      { find: '~', replacement: path.resolve(__dirname, './src') },
      {
        find: '@styled-system',
        replacement: path.resolve(__dirname, './styled-system'),
      },
    ],
  },
  base: '/',
  ...(process.env.GH_REPO
    ? {}
    : {
        build: {
          lib: {
            name: 'okShaunComponents',
            fileName: (format) => `ok-shaun-components.${format}.js`,
            entry: './lib/main.ts',
            formats: ['es', 'cjs', 'umd'],
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
