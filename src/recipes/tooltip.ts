// src/recipes/tooltip.ts
import { defineSlotRecipe } from "@pandacss/dev";

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  jsx: ["Tooltip"],
  slots: ["tooltipContent", "title", "text"],

  base: {
    tooltipContent: {
      display: "flex",
      flexDirection: "column",
      // Inverted surface: dark in light mode, light in dark mode
      bg: "bg.neutral.inverse",
      color: "text.inverse",
      fontFamily: "sans",
      fontWeight: "normal",
      borderRadius: "4",
      maxWidth: "240",
      boxShadow: "elevated",
      zIndex: "tooltip",
      pointerEvents: "none",
    },
    title: {
      fontWeight: "bold",
      color: "text.inverse",
      lineHeight: "tight",
    },
    text: {
      // Default — overridden by hasTitle variant
      color: "text.inverse.subtlest",
      lineHeight: "tight",
    },
  },

  variants: {
    size: {
      sm: {
        tooltipContent: { py: "2", px: "6" },
        title: { fontSize: "10" },
        text: { fontSize: "10" },
      },
      md: {
        tooltipContent: { py: "4", px: "8" },
        title: { fontSize: "12" },
        text: { fontSize: "12" },
      },
      lg: {
        tooltipContent: { py: "6", px: "12" },
        title: { fontSize: "14" },
        text: { fontSize: "14" },
      },
    },

    // Controls whether title text uses full contrast (has title = true means
    // the text slot uses subtlest color; already in base, but without a title
    // the text slot should use full text color)
    hasTitle: {
      true: { text: { color: "text.inverse.subtlest" } },
      false: { text: { color: "text.inverse" } },
    },
  },

  defaultVariants: {
    size: "md",
    hasTitle: false,
  },
});
