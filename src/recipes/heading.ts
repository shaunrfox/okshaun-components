import { defineRecipe } from "@pandacss/dev";
import { text } from './text';

export const heading = defineRecipe({
  className: "heading",
  // Extend the text recipe base styles
  base: {
    fontWeight: "bold", // Override specific properties
  },
  // Use the same variant structure as text
  variants: text.variants,
  defaultVariants: {
    level: 24,
    font: 'sans'
  },
});