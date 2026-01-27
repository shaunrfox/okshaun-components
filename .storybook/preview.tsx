import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeProvider';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// Import fonts for Storybook
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/400-italic.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/500-italic.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-sans/700-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource-variable/piazzolla/index.css';

// Import Panda CSS layers
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
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
