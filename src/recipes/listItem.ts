import { defineSlotRecipe } from '@pandacss/dev';

export const listItemRecipe = defineSlotRecipe({
  className: 'listItem',
  jsx: ['ListItem'],
  slots: [
    'wrapper',
    'icon',
    'itemMain',
    'itemLabel',
    'itemDescription',
    'divider',
  ],
  base: {
    wrapper: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'start',
      gap: '4',
      width: 'full',
      textAlign: 'left',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'transparent',
      color: 'text',
      cursor: 'pointer',
      outline: '[2px solid transparent]',
      outlineOffset: '-2',
      bg: 'transparent',
      scrollSnapAlign: 'start',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        bg: 'bg.neutral.hovered',
      },
      '&:is(:active)': {
        bg: 'bg.neutral.hovered',
      },
      _focus: {
        bg: 'bg.neutral.hovered',
      },
      '&[data-active="true"]': {
        bg: 'bg.neutral.hovered',
      },
      _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    divider: {
      width: 'full',
    },
    icon: {
      aspectRatio: 'square',
      transitionDuration: 'fast',
      transitionProperty: 'fill',
      transitionTimingFunction: 'default',
      flexShrink: '0',
    },
    itemMain: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      minWidth: '0',
    },
    itemLabel: {
      color: 'text',
    },
    itemDescription: {
      color: 'text.subtlest',
      lineHeight: 'tight',
    },
  },
  variants: {
    variant: {
      default: {},
      checkbox: {
        wrapper: {
          _hover: {
            bg: 'bg.neutral.hovered',
          },
          _focus: {
            bg: 'bg.neutral.hovered',
          },
          '&:is(:active), &:is([data-active="true"]):hover': {
            bg: 'bg.neutral.hovered',
          },
          _selected: {
            bg: 'surface',
            _hover: {
              bg: 'surface',
            },
            _focus: {
              bg: 'bg.neutral.hovered',
            },
          },
        },
      },
      toggle: {
        wrapper: {
          _hover: {
            bg: 'bg.neutral.hovered',
          },
          _focus: {
            bg: 'bg.neutral.hovered',
          },
          '&:is(:active), &:is([data-active="true"]):hover': {
            bg: 'bg.neutral.hovered',
          },
          _selected: {
            bg: 'surface',
            _hover: {
              bg: 'surface',
            },
            _focus: {
              bg: 'bg.neutral.hovered',
            },
          },
        },
      },
      divider: {},
    },
    density: {
      compact: {
        wrapper: {
          py: '3',
          px: '10',
        },
        itemLabel: {
          textStyle: 'sans.md',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.xs',
          lineHeight: 'tight',
        },
        icon: {
          w: '24',
          h: '24',
        },
        divider: {
          py: '3',
          px: '10',
        },
      },
      comfortable: {
        wrapper: {
          py: '7',
          px: '12',
        },
        itemLabel: {
          textStyle: 'sans.md',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.xs',
          lineHeight: 'tight',
        },
        icon: {
          w: '24',
          h: '24',
        },
        divider: {
          py: '7',
          px: '12',
        },
      },
      spacious: {
        wrapper: {
          py: '9',
          px: '16',
        },
        itemLabel: {
          textStyle: 'sans.lg',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.sm',
          lineHeight: 'tight',
        },
        icon: {
          w: '28',
          h: '28',
        },
        divider: {
          py: '9',
          px: '16',
        },
      },
    },
    selected: {
      true: {
        wrapper: {
          bg: 'surface.selected',
          '&[data-active="true"]': {
            bg: 'surface.selected.hovered',
          },
          _hover: {
            bg: 'surface.selected.hovered',
          },
          '&:is(:active)': {
            bg: 'surface.selected.pressed',
          },
          _focusVisible: {
            bg: 'surface.selected.hovered',
          },
        },
      },
      false: {},
    },
    iconBefore: {
      true: {},
      false: {},
    },
    iconAfter: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      density: 'compact',
      iconBefore: true,
      css: {
        wrapper: {
          ps: '5',
        },
      },
    },
    {
      density: 'compact',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '5',
        },
      },
    },
    {
      density: 'compact',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '5',
        },
      },
    },
    {
      density: 'comfortable',
      iconBefore: true,
      css: {
        wrapper: {
          ps: '7',
        },
      },
    },
    {
      density: 'comfortable',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '7',
        },
      },
    },
    {
      density: 'comfortable',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '7',
        },
      },
    },
    {
      density: 'spacious',
      iconBefore: true,
      css: {
        wrapper: {
          ps: '9',
        },
      },
    },
    {
      density: 'spacious',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '9',
        },
      },
    },
    {
      density: 'spacious',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '9',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    density: 'compact',
    selected: false,
  },
});
