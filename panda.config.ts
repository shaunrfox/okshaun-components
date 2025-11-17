import { defineConfig } from '@pandacss/dev';
import { okShaunPreset } from './preset';

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  jsxFactory: 'styled',
  watch: true,
  preflight: true,
  strictTokens: true,
  importMap: '@styled-system',
  outdir: 'styled-system',

  presets: ['@pandacss/dev/presets', okShaunPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: ['**/*.css', '**/*.svg'],
});
