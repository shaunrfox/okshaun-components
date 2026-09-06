import { defineSlotRecipe } from '@pandacss/dev';

const textInputBase = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    bg: 'surface',
    borderWidth: '{sizes.1}',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '{sizes.4}',
    outlineWidth: '{sizes.1}',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    overflow: 'hidden',
    lineHeight: 'none',
    _focusWithin: {
      outlineColor: 'border.focused',
      borderColor: 'border.focused',
    },
    _error: {
      borderColor: 'border.danger',
      _focusWithin: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
    _disabled: {
      opacity: '40%',
      cursor: 'not-allowed',
      _focusWithin: {
        outlineColor: 'transparent',
        borderColor: 'border.input',
      },
    },
    _groupDisabled: {
      opacity: 1, // let FormField handle disabled state opacity
    },
  },
  slot: {
    display: 'inline-flex',
    alignItems: 'center',
    transitionDuration: 'fast',
    transitionProperty: 'all',
    transitionTimingFunction: 'default',
    flex: '0 0 auto',
    fill: 'icon.decorative.subtle',
    pointerEvents: 'none',
    zIndex: 1,
  },
  buttonSlot: {
    display: 'inline-flex',
    alignItems: 'center',
    flex: '0 0 auto',
    px: '0',
    zIndex: 1,
    m: '-1',
  },
  input: {
    width: 'full',
    bg: 'surface',
    color: 'text',
    lineHeight: 'default',
    fontFamily: 'sans',
    border: 'none',
    outline: 'none',
    _placeholder: {
      color: 'text.placeholder',
    },
  },
  icon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fill: 'icon.decorative.subtle',
    mixBlendMode: { base: 'multiply', _dark: 'screen' },
    pointerEvents: 'none',
    zIndex: 1,
  },
};

const textInputVariants = {
  size: {
    sm: {
      input: {
        py: '0',
        px: '{sizes.8}',
        fontSize: '{sizes.14}',
      },
      slot: {
        w: '16',
        h: '16',
        px: '4',
      },
      icon: {
        mx: '2',
        w: '{sizes.22}',
      },
    },
    md: {
      input: {
        py: '3',
        px: '{sizes.10}',
        fontSize: '{sizes.16}',
      },
      slot: {
        w: '20',
        h: '20',
        px: '6',
      },
      icon: {
        mx: '3',
        w: '{sizes.24}',
      },
    },
    lg: {
      input: {
        py: '7',
        px: '{sizes.12}',
        fontSize: '{sizes.16}',
      },
      slot: {
        w: '24',
        h: '24',
        px: '8',
      },
      icon: {
        mx: '5',
        w: '{sizes.24}',
      },
    },
    xl: {
      input: {
        py: '9',
        px: '{sizes.16}',
        fontSize: '{sizes.20}',
      },
      slot: {
        w: '28',
        h: '28',
        px: '10',
      },
      icon: {
        mx: '7',
        w: '{sizes.28}',
      },
    },
  },
  iconBefore: {
    true: {
      icon: {
        left: '0',
      },
    },
  },
  iconAfter: {
    true: {
      icon: {
        right: '0',
      },
    },
  },
  autoSize: {
    true: {
      input: {
        fieldSizing: 'content',
        maxW: 'full',
      },
    },
  },
};

const textInputCompoundVariants: NonNullable<
  Parameters<typeof defineSlotRecipe>[0]['compoundVariants']
> = [
  {
    size: 'sm',
    iconBefore: true,
    css: {
      input: { ps: '[calc({sizes.24} + {sizes.2})]' },
    },
  },
  {
    size: 'sm',
    iconAfter: true,
    css: {
      input: { pe: '[calc({sizes.24} + {sizes.2})]' },
    },
  },
  {
    size: 'md',
    iconBefore: true,
    css: {
      input: { ps: '[calc({sizes.24} + {sizes.7})]' },
    },
  },
  {
    size: 'md',
    iconAfter: true,
    css: {
      input: { pe: '[calc({sizes.24} + {sizes.7})]' },
    },
  },
  {
    size: 'lg',
    iconBefore: true,
    css: {
      input: { ps: '[calc({sizes.24} + {sizes.10})]' },
    },
  },
  {
    size: 'lg',
    iconAfter: true,
    css: {
      input: { pe: '[calc({sizes.24} + {sizes.10})]' },
    },
  },
  {
    size: 'xl',
    iconBefore: true,
    css: {
      input: { ps: '[calc({sizes.32} + {sizes.10})]' },
    },
  },
  {
    size: 'xl',
    iconAfter: true,
    css: {
      input: { pe: '[calc({sizes.32} + {sizes.10})]' },
    },
  },
];

export const textInputRecipe = defineSlotRecipe({
  className: 'textInput',
  jsx: ['TextInput', 'Textinput'],
  slots: ['container', 'input', 'slot', 'buttonSlot', 'icon'],
  base: textInputBase,
  variants: textInputVariants,
  compoundVariants: textInputCompoundVariants,
  defaultVariants: {
    size: 'md',
  },
});
