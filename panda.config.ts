import { defineConfig } from '@pandacss/dev';
import { okshaunPreset } from './okshaun-preset';

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
  prefix: 'okshaun',

  presets: ['@pandacss/dev/presets', okshaunPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: ['**/*.css', '**/*.svg'],
});
