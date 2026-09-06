import { defineSlotRecipe } from '@pandacss/dev';

import { listDensity } from './list';

export const listItemRecipe = defineSlotRecipe({
  className: 'listItem',
  jsx: ['ListItem'],
  slots: [
    'wrapper',
    'beforeSlot',
    'afterSlot',
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
      '&[data-disabled="true"]': {
        opacity: '0.4',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    beforeSlot: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    afterSlot: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: '0',
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
        wrapper: listDensity.compact.row,
        itemLabel: {
          textStyle: 'sans.md',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.xs',
          lineHeight: 'tight',
        },
        icon: listDensity.compact.icon,
        beforeSlot: listDensity.compact.beforeSlot,
        afterSlot: listDensity.compact.afterSlot,
        divider: listDensity.compact.divider,
      },
      comfortable: {
        wrapper: listDensity.comfortable.row,
        itemLabel: {
          textStyle: 'sans.md',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.xs',
          lineHeight: 'tight',
        },
        icon: listDensity.comfortable.icon,
        beforeSlot: listDensity.comfortable.beforeSlot,
        afterSlot: listDensity.comfortable.afterSlot,
        divider: listDensity.comfortable.divider,
      },
      spacious: {
        wrapper: listDensity.spacious.row,
        itemLabel: {
          textStyle: 'sans.lg',
          color: 'text',
        },
        itemDescription: {
          textStyle: 'sans.sm',
          lineHeight: 'tight',
        },
        icon: listDensity.spacious.icon,
        beforeSlot: listDensity.spacious.beforeSlot,
        afterSlot: listDensity.spacious.afterSlot,
        divider: listDensity.spacious.divider,
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
        beforeSlot: listDensity.compact.beforeSlot,
      },
    },
    {
      density: 'compact',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '5',
        },
        afterSlot: listDensity.compact.afterSlot,
      },
    },
    {
      density: 'compact',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '5',
        },
        beforeSlot: listDensity.compact.beforeSlot,
      },
    },
    {
      density: 'comfortable',
      iconBefore: true,
      css: {
        wrapper: {
          ps: '7',
        },
        beforeSlot: listDensity.comfortable.beforeSlot,
      },
    },
    {
      density: 'comfortable',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '7',
        },
        afterSlot: listDensity.comfortable.afterSlot,
      },
    },
    {
      density: 'comfortable',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '7',
        },
        beforeSlot: listDensity.comfortable.beforeSlot,
      },
    },
    {
      density: 'spacious',
      iconBefore: true,
      css: {
        wrapper: {
          ps: '9',
        },
        beforeSlot: listDensity.spacious.beforeSlot,
      },
    },
    {
      density: 'spacious',
      iconAfter: true,
      css: {
        wrapper: {
          pe: '9',
        },
        afterSlot: listDensity.spacious.afterSlot,
      },
    },
    {
      density: 'spacious',
      variant: 'checkbox',
      css: {
        wrapper: {
          ps: '9',
        },
        beforeSlot: listDensity.spacious.beforeSlot,
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    density: 'compact',
    selected: false,
  },
});
