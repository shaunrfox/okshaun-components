import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode, command }) => {
  const isGitHubPages = !!process.env.GH_REPO;
  const isStorybook = process.env.STORYBOOK === 'true';
  const isLibraryBuild = command === 'build' && !isGitHubPages && !isStorybook;

  if (isGitHubPages) {
    // GitHub Pages build
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

  // Library build mode (default) or development
  return {
    plugins: [
      react(),
      // Only include build-time plugins when actually building the library
      ...(isLibraryBuild
        ? [
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
                  src: 'src/styled-system/styles.css',
                  dest: './',
                },
                {
                  src: '.mcp.json',
                  dest: './',
                },
                {
                  src: 'panda.buildinfo.json',
                  dest: './',
                },
                {
                  src: 'src/types/index.d.ts',
                  dest: './',
                },
              ],
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '@styled-system': resolve(__dirname, './src/styled-system'),
      },
    },
    build: {
      lib: {
        name: 'cetec-design-system',
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
