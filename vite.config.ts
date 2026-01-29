import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode }) => {
  const isGitHubPages = !!process.env.GH_REPO;

  if (isGitHubPages) {
    // GitHub Pages demo build
    return {
      plugins: [react()],
      base: `/${process.env.GH_REPO}/`,
      resolve: {
        alias: {
          '~': resolve(__dirname, './src'),
          '@styled-system': resolve(__dirname, './src/styled-system'),
        },
      },
      build: {
        outDir: 'dist',
      },
    };
  }

  // Library build mode (default)
  return {
    plugins: [
      react(),
      dts({
        include: ['src/**/*'],
        exclude: ['src/**/*.stories.tsx'],
        entryRoot: 'src',
        outDir: 'dist/types',
        rollupTypes: true,
        copyDtsFiles: true,
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/styled-system/specs',
            dest: './',
          },
          {
            src: 'src/styled-system/styles',
            dest: './',
          },
          {
            src: 'src/styled-system/styles.css',
            dest: './',
          },
          {
            src: '.mcp.json',
            dest: './',
          },
          {
            src: 'src/types/index.d.ts',
            dest: './',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '@styled-system': resolve(__dirname, './src/styled-system'),
      },
    },
    build: {
      lib: {
        name: '@okshaun/components',
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          preset: resolve(__dirname, 'src/preset.ts'),
        },
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', '@pandacss/dev'],
        output: {
          preserveModules: false,
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
          externalImportAttributes: false,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      sourcemap: true,
      minify: false, // Keep readable for debugging
    },
  };
});
