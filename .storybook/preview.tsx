import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider, Global } from "@emotion/react";
import { getTheme } from "../src/utils/theme";
import GlobalStyles from "../src/utils/styles";
import StoryWrapper from "./StoryWrapper";

// Create theme instances
const themes = {
  light: getTheme("light"),
  dark: getTheme("dark"),
} as const;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    theme: "light", // default theme
  },
  decorators: [
    (Story, context) => {
      const { theme: themeKey = "light" } = context.parameters;
      const selectedTheme = themes[themeKey as keyof typeof themes];

      return (
        <ThemeProvider theme={selectedTheme}>
          <Global styles={GlobalStyles(selectedTheme)} />
          <StoryWrapper>
            <Story />
          </StoryWrapper>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
