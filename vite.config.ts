import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

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
          '@styled-system': resolve(__dirname, './styled-system'),
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
        include: ['src/**/*', 'preset.ts'],
        exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
        rollupTypes: true,
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
        '@styled-system': resolve(__dirname, './styled-system'),
      },
    },
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          preset: resolve(__dirname, 'preset.ts'),
        },
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', '@pandacss/dev'],
        output: {
          preserveModules: false,
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
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
