import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const pageBannerBase = {
  root: {
    ...globalBaseStyles,
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    w: 'full',
    px: '24',
    py: '12',
    borderRadius: '0',
    borderBottom: 'default',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    minH: '20',
  },
  content: {
    display: 'flex',
    flex: '1',
    minW: '0',
  },
  message: {
    maxW: 'full',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8',
    flex: 'none',
  },
};

/**
 * Emphasis is applied through `data-emphasis` inside each tone rather than as a
 * second recipe variant. Pairing two variants would need `compoundVariants`,
 * which `standards/recipes/conditional-variants.md` disallows.
 */
const pageBannerVariants = {
  /** Semantic tone. `data-emphasis="bold"` switches to the filled treatment. */
  tone: {
    info: {
      root: {
        bg: 'bg.info',
        borderBottom: 'info',
        '&[data-emphasis="bold"]': {
          bg: 'bg.info.bold',
          borderBottomColor: 'bg.info.bold',
        },
      },
    },
    success: {
      root: {
        bg: 'bg.success',
        borderBottom: 'success',
        '&[data-emphasis="bold"]': {
          bg: 'bg.success.bold',
          borderBottomColor: 'bg.success.bold',
        },
      },
    },
    warning: {
      root: {
        bg: 'bg.warning',
        borderBottom: 'warning',
        '&[data-emphasis="bold"]': {
          bg: 'bg.warning.bold',
          borderBottomColor: 'bg.warning.bold',
        },
      },
    },
    danger: {
      root: {
        bg: 'bg.danger',
        borderBottom: 'danger',
        '&[data-emphasis="bold"]': {
          bg: 'bg.danger.bold',
          borderBottomColor: 'bg.danger.bold',
        },
      },
    },
    neutral: {
      root: {
        bg: 'bg.neutral',
        borderBottom: 'default',
        '&[data-emphasis="bold"]': {
          bg: 'bg.neutral.bold',
          borderBottomColor: 'bg.neutral.bold',
        },
      },
    },
  },
};

export const pageBannerRecipe = defineSlotRecipe({
  className: 'pageBanner',
  jsx: ['PageBanner'],
  slots: ['root', 'icon', 'content', 'message', 'actions'],
  base: pageBannerBase,
  variants: pageBannerVariants,
  defaultVariants: {
    tone: 'info',
  },
});
