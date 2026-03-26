import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import { IconProvider } from '../src/components/Icon';
import DocTemplate from '../src/storybook/doctemplate.mdx';

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
import './story-docs-style.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      const pathname =
        typeof window === 'undefined' ? '/' : window.location.pathname;
      const basePath = pathname.endsWith('.html')
        ? pathname.slice(0, pathname.lastIndexOf('/') + 1)
        : pathname;
      const normalizedPath = basePath.endsWith('/') ? basePath : `${basePath}/`;
      const spritePath = `${normalizedPath}sprite.svg`;

      return (
        <IconProvider spritePath={spritePath}>
          <Story />
        </IconProvider>
      );
    },
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-color-mode',
    }),
  ],
  initialGlobals: {},
  parameters: {
    backgrounds: { disable: true },
    controls: {
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Intro',
          'Tokens',
          ['Overview', 'Colors', 'Typography', 'Sizes', 'Shadows', '*'],
          'Components',
          'Docs',
          '*',
        ],
      },
    },
    docs: {
      page: DocTemplate,
      toc: {
        headingSelector: 'h2, h3, h4',
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
