import { defineTokens } from '@pandacss/dev';

export const fonts = defineTokens.fonts({
  heading: { value: "'IBM Plex Sans', Geneva, Tahoma, Verdana, sans-serif" },
  sans: { value: "'IBM Plex Sans', Geneva, Tahoma, Verdana, sans-serif" },
  body: {
    value:
      "'Piazzolla Variable', 'Piazzolla', Georgia, 'Times New Roman', Times, serif",
  },
  serif: {
    value:
      "'Piazzolla Variable', 'Piazzolla', Georgia, 'Times New Roman', Times, serif",
  },
  mono: {
    value:
      "'IBM Plex Mono', Andale Mono, monaco, Consolas, Lucida Console, monospace",
  },
});
