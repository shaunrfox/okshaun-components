import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Import Panda CSS layers and fonts
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-color-mode',
    }),
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
