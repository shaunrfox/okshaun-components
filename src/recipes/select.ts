import { defineSlotRecipe } from '@pandacss/dev';

const selectBase = {
  // The trigger button container
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    width: 'full',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '4',
    bg: 'bg.input',
    color: 'text',
    fontFamily: 'body',
    cursor: 'pointer',
    outline: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, color, outline-color',
    transitionTimingFunction: 'default',
    _hover: {
      bg: 'bg.input.hovered',
    },
    _focus: {
      borderColor: 'border.focused',
      outlineWidth: '2',
      outlineOffset: '-1',
      outlineStyle: 'solid',
      outlineColor: 'border.focused',
    },
    _disabled: {
      bg: 'bg.disabled',
      borderColor: 'border.disabled',
      color: 'text.disabled',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    _error: {
      bg: 'bg.danger',
      borderColor: 'border.danger',
      _hover: {
        bg: 'bg.danger.hovered',
      },
      _focus: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
  },

  // The value/placeholder text display
  value: {
    flex: 1,
    textAlign: 'left',
    truncate: true,
    color: 'text',
    _placeholder: {
      color: 'text.subtlest',
    },
  },

  // Placeholder styling (when no value selected)
  placeholder: {
    color: 'text.subtlest',
  },

  // The chevron/arrow icon
  icon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: 'icon.decorative',
    transitionDuration: 'normal',
    transitionProperty: 'transform',
    transitionTimingFunction: 'default',
    '&[data-open="true"]': {
      transform: 'rotate(180deg)',
    },
  },
};

const selectVariants = {
  size: {
    compact: {
      trigger: {
        py: '4',
        px: '8',
        fontSize: '14',
        minHeight: '32',
      },
      icon: {
        w: '16',
        h: '16',
      },
    },
    default: {
      trigger: {
        py: '8',
        px: '12',
        fontSize: '16',
        minHeight: '40',
      },
      icon: {
        w: '20',
        h: '20',
      },
    },
    comfortable: {
      trigger: {
        py: '12',
        px: '16',
        fontSize: '16',
        minHeight: '48',
      },
      icon: {
        w: '24',
        h: '24',
      },
    },
  },
};

export const selectRecipe = defineSlotRecipe({
  className: 'select',
  jsx: ['Select', 'SelectTrigger'],
  slots: ['trigger', 'value', 'placeholder', 'icon'],
  base: selectBase,
  variants: selectVariants,
  defaultVariants: {
    size: 'default',
  },
});
