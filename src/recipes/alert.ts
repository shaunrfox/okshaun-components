import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const alertBase = {
  root: {
    ...globalBaseStyles,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8',
    w: 'full',
    p: '12',
    borderRadius: '4',
    border: 'default',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    minH: '20',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    flex: '1',
    minW: '0',
  },
  title: {
    maxW: 'full',
  },
  message: {
    maxW: 'full',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8',
    mt: '4',
  },
  dismiss: {
    flex: 'none',
  },
};

const alertVariants = {
  /**
   * Semantic tone. Drives surface and border tokens; the component maps the
   * same tone to text/icon color tokens and to the tone icon.
   */
  tone: {
    info: {
      root: { bg: 'bg.info', border: 'info' },
    },
    success: {
      root: { bg: 'bg.success', border: 'success' },
    },
    warning: {
      root: { bg: 'bg.warning', border: 'warning' },
    },
    danger: {
      root: { bg: 'bg.danger', border: 'danger' },
    },
    neutral: {
      root: { bg: 'bg.neutral', border: 'default' },
    },
  },
};

export const alertRecipe = defineSlotRecipe({
  className: 'alert',
  jsx: ['Alert'],
  slots: ['root', 'icon', 'content', 'title', 'message', 'actions', 'dismiss'],
  base: alertBase,
  variants: alertVariants,
  defaultVariants: {
    tone: 'info',
  },
});
