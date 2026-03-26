import { defineSlotRecipe } from '@pandacss/dev';

const formFieldBase = {
  container: {
    _disabled: {
      opacity: '0.4',
      pointerEvents: 'none',
    },
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  },
  labelWrapper: {
    alignItems: 'center',
    gap: '2',
  },
};

const formFieldVariants = {
  layout: {
    default: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2',
      },
    },
    inline: {
      container: {
        display: 'grid',
        columnGap: '12',
        rowGap: '2',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto auto',
        alignItems: 'start',
      },
    },
  },
  size: {
    sm: {
      labelWrapper: {
        '& [class=*-label]': {
          fontSize: '14',
          lineHeight: 'tight',
        },
      },
    },
    md: {
      labelWrapper: {
        pt: '6',
      },
    },
    lg: {
      labelWrapper: {
        pt: '10',
      },
    },
    xl: {
      labelWrapper: {
        pt: '12',
      },
    },
  },
};

export const formFieldRecipe = defineSlotRecipe({
  className: 'formField',
  jsx: ['FormField'],
  slots: ['container', 'inputs', 'labelWrapper'],
  base: formFieldBase,
  variants: formFieldVariants,
  defaultVariants: {
    layout: 'default',
    size: 'md',
  },
});
