import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/components/*/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    backgroundsStoryGlobals: false,
  },
  docs: {
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins?.filter(
      (plugin) =>
        !plugin?.name?.includes('dts') &&
        !plugin?.name?.includes('static-copy'),
    );

    if (config.build) {
      delete config.build.lib;
    }

    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_PATH ?? '/',
      optimizeDeps: {
        exclude: ['@pandacss/dev'],
      },
    });
  },
};

export default config;
