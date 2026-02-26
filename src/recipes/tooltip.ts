// src/recipes/tooltip.ts
import { defineSlotRecipe } from '@pandacss/dev';

export const tooltipRecipe = defineSlotRecipe({
  className: 'tooltip',
  jsx: ['Tooltip'],
  slots: ['tooltipContent', 'title', 'text'],

  base: {
    tooltipContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      // Inverted surface: dark in light mode, light in dark mode
      bg: { base: 'gray.90', _dark: 'gray.10' },
      color: { base: 'gray.10', _dark: 'gray.90' },
      fontFamily: 'sans',
      fontWeight: 'normal',
      borderRadius: '4',
      maxWidth: '240px',
      boxShadow: 'elevated',
      zIndex: 'tooltip',
      pointerEvents: 'none',
    },
    title: {
      fontWeight: 'bold',
      color: 'text',
    },
    text: {
      // Default — overridden by hasTitle variant
      color: 'text.subtlest',
    },
  },

  variants: {
    size: {
      sm: {
        tooltipContent: { py: '4', px: '8' },
        title:          { fontSize: '12' },
        text:           { fontSize: '12' },
      },
      md: {
        tooltipContent: { py: '8', px: '12' },
        title:          { fontSize: '14' },
        text:           { fontSize: '14' },
      },
      lg: {
        tooltipContent: { py: '12', px: '16' },
        title:          { fontSize: '16' },
        text:           { fontSize: '16' },
      },
    },

    // Controls whether title text uses full contrast (has title = true means
    // the text slot uses subtlest color; already in base, but without a title
    // the text slot should use full text color)
    hasTitle: {
      true:  { text: { color: 'text.subtlest' } },
      false: { text: { color: 'text' } },
    },
  },

  defaultVariants: {
    size: 'md',
    hasTitle: false,
  },
});
