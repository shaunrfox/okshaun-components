import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const inlineNoteBase = {
  root: {
    ...globalBaseStyles,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4',
    w: 'full',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    minH: '16',
  },
  message: {
    flex: '1',
    minW: '0',
    maxW: 'full',
  },
};

const inlineNoteVariants = {
  /**
   * Semantic tone. An inline note carries no surface of its own, so tone is
   * expressed through the text and icon color tokens the component applies.
   */
  tone: {
    info: {},
    success: {},
    warning: {},
    danger: {},
    neutral: {},
  },
};

export const inlineNoteRecipe = defineSlotRecipe({
  className: 'inlineNote',
  jsx: ['InlineNote'],
  slots: ['root', 'icon', 'message'],
  base: inlineNoteBase,
  variants: inlineNoteVariants,
  defaultVariants: {
    tone: 'info',
  },
});
