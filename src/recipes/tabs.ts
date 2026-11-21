import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

export const tabsRecipe = defineSlotRecipe({
  className: 'tabs',
  jsx: ['Tabs'],
  slots: ['root', 'strip', 'list', 'tab', 'badge', 'overflow', 'menu', 'panel'],
  base: {
    root: {
      ...globalBaseStyles,
      display: 'flex',
      flexDirection: 'column',
      minWidth: '0',
      width: 'full',
    },
    strip: {
      ...globalBaseStyles,
      position: 'relative',
      minWidth: '0',
      width: 'full',
    },
    list: {
      ...globalBaseStyles,
      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      // Figma `Tabs` tablist: 8px between tabs, with each tab carrying 6px of
      // its own inline padding so the underline hugs the label.
      gap: '8',
      minWidth: '0',
      width: 'full',
      // The 1px rule the strip sits on. Each tab's 2px underline overlaps it.
      borderBottomWidth: '1',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border',
    },
    tab: {
      ...globalBaseStyles,
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6',
      flexShrink: '0',
      whiteSpace: 'nowrap',
      appearance: 'none',
      bg: 'transparent',
      cursor: 'pointer',
      px: '6',
      // 8px above and below the 22px line box, plus the 2px underline, makes
      // the 40px tab in Figma `_TabsTab`. The 20px badge sits inside the line
      // box, so showing it never changes the tab's height.
      py: '8',
      fontSize: '14',
      lineHeight: 'default',
      color: 'text.subtlest',
      borderWidth: '0',
      borderBottomWidth: '2',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      // Pull the 2px underline on top of the list's 1px rule.
      marginBottom: '-1',
      transitionProperty: 'color, border-color',
      transitionDuration: 'fast',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'text',
        borderBottomColor: 'border',
      },
      _selected: {
        color: 'text',
        borderBottomColor: 'border.bold',
        // The selected underline does not react to hover.
        _hover: {
          borderBottomColor: 'border.bold',
        },
      },
      _focusVisible: {
        outlineWidth: '2',
        outlineStyle: 'solid',
        outlineColor: 'border.focused',
        outlineOffset: '-2',
      },
      _disabled: {
        color: 'text.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'text.disabled',
          borderBottomColor: 'transparent',
        },
      },
      _motionReduce: {
        transitionDuration: 'fastest',
      },
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
      // Keep the badge from adding a line box of its own to the tab.
      lineHeight: 'none',
    },
    overflow: {
      position: 'absolute',
      insetInlineEnd: '0',
      top: '0',
      bottom: '0',
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    menu: {
      minWidth: '160',
    },
    panel: {
      ...globalBaseStyles,
      color: 'text',
      fontSize: '14',
      minWidth: '0',
      _focusVisible: {
        outlineWidth: '2',
        outlineStyle: 'solid',
        outlineColor: 'border.focused',
        outlineOffset: '2',
      },
    },
  },
  variants: {
    hasOverflow: {
      false: {
        overflow: {
          visibility: 'hidden',
          pointerEvents: 'none',
        },
      },
      true: {
        overflow: {
          visibility: 'visible',
          pointerEvents: 'auto',
        },
      },
    },
    /** Keeps an overflowed tab measurable while removing it from the strip. */
    overflowed: {
      true: {
        tab: {
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          insetInlineStart: '0',
          top: '0',
        },
      },
    },
  },
  defaultVariants: {
    hasOverflow: false,
  },
});
