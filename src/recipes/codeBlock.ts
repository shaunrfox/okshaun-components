import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

// Every part renders through `Box`, which applies the body font and a subtle
// text color. Inner parts restate inheritance so the block's own font and tone
// color reach the code.
const inheritText = {
  fontFamily: 'inherit',
  fontVariationSettings: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit',
};

const focusRing = {
  outlineWidth: '2',
  outlineStyle: 'solid',
  outlineColor: 'border.focused',
  outlineOffset: '-2',
};

const codeBlockBase = {
  root: {
    ...globalBaseStyles,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    w: 'full',
    minW: '0',
    borderWidth: '1',
    borderStyle: 'solid',
    rounded: '8',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    minH: '32',
    pl: '16',
    pr: '4',
    borderBottomWidth: '1',
    borderBottomStyle: 'solid',
  },
  title: {
    flex: '1',
    minW: '0',
    fontFamily: 'mono',
    fontSize: '12',
    lineHeight: 'tight',
    color: 'inherit',
    truncate: true,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    flex: 'none',
  },
  floatingActions: {
    position: 'absolute',
    top: '4',
    right: '4',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
    gap: '2',
  },
  content: {
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'auto',
    fontFamily: 'mono',
    fontWeight: 'normal',
    lineHeight: 'loose',
    color: 'inherit',
    _focusVisible: focusRing,
  },
  pre: {
    ...inheritText,
    m: '0',
    py: '12',
    px: '16',
    minW: 'full',
    w: 'fit-content',
    bg: 'transparent',
    tabSize: '2',
  },
  // Also resets global `code` styles from the host page, such as a tint or
  // padding meant for inline code.
  code: {
    ...inheritText,
    display: 'block',
    m: '0',
    p: '0',
    rounded: '0',
    bg: 'transparent',
    whiteSpace: 'inherit',
    overflowWrap: 'inherit',
    mixBlendMode: 'normal',
  },
  line: {
    ...inheritText,
    display: 'block',
    position: 'relative',
    // An empty line has no text, so it needs an explicit one-line height.
    minH: '1lh',
  },
  lineNumber: {
    ...inheritText,
    position: 'absolute',
    left: '0',
    w: 'var(--code-block-gutter)',
    textAlign: 'right',
    userSelect: 'none',
    pointerEvents: 'none',
    _before: {
      content: 'attr(data-line)',
    },
  },
  expand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
    w: 'full',
    minH: '32',
    px: '16',
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    fontSize: '12',
    fontWeight: 'medium',
    cursor: 'pointer',
    _focusVisible: focusRing,
  },
};

const codeBlockVariants = {
  /**
   * Surface treatment. `default` sits on the page as a sunken panel.
   * `inverse` uses the inverse surface for setup and integration snippets that
   * must stand apart from the surrounding page; it follows the theme, so it is
   * dark in the light theme and light in the dark theme.
   */
  tone: {
    default: {
      root: {
        bg: 'surface.sunken',
        borderColor: 'border',
        color: 'text',
      },
      header: {
        borderColor: 'border',
        color: 'text.subtle',
      },
      lineNumber: {
        color: 'text.subtlest',
      },
      expand: {
        bg: 'surface.sunken',
        borderColor: 'border',
        color: 'text.subtle',
        _hover: { bg: 'surface.hovered', color: 'text' },
      },
    },
    inverse: {
      root: {
        bg: 'bg.neutral.inverse',
        borderColor: 'transparent',
        color: 'text.inverse',
      },
      header: {
        borderColor: 'bg.neutral.inverse.subtle',
        color: 'text.inverse.subtlest',
      },
      lineNumber: {
        color: 'text.inverse.subtlest',
      },
      expand: {
        bg: 'bg.neutral.inverse',
        borderColor: 'bg.neutral.inverse.subtle',
        color: 'text.inverse.subtlest',
        _hover: { color: 'text.inverse' },
      },
    },
  },
  size: {
    sm: {
      content: { fontSize: '12' },
    },
    md: {
      content: { fontSize: '14' },
    },
  },
  /** Wraps long lines instead of scrolling horizontally. */
  wrap: {
    true: {
      pre: {
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
        w: 'auto',
      },
    },
    false: {
      pre: {
        whiteSpace: 'pre',
      },
    },
  },
  /** Reserves a gutter on each line for the line number. */
  lineNumbers: {
    true: {
      line: {
        pl: 'calc(var(--code-block-gutter) + token(spacing.16))',
      },
    },
    false: {},
  },
  /**
   * Limits the visible height to the first `--code-block-max-lines` source
   * lines. The component measures the bottom of the last visible line into
   * `--code-block-collapsed-h`, so a wrapped line shows in full. The `calc`
   * is the fallback before measurement, and it is exact when lines do not
   * wrap.
   */
  collapsed: {
    true: {
      content: {
        maxH: 'var(--code-block-collapsed-h, calc(var(--code-block-max-lines) * 1lh + token(spacing.24)))',
        overflowY: 'hidden',
      },
    },
    false: {},
  },
  /**
   * Reserves a gutter on the right of the code for the floating copy button,
   * so the button never covers code. Set when there is no header.
   */
  actionGutter: {
    true: {
      content: {
        mr: '32',
      },
    },
    false: {},
  },
};

export const codeBlockRecipe = defineSlotRecipe({
  className: 'codeBlock',
  jsx: ['CodeBlock'],
  slots: [
    'root',
    'header',
    'title',
    'actions',
    'floatingActions',
    'content',
    'pre',
    'code',
    'line',
    'lineNumber',
    'expand',
  ],
  base: codeBlockBase,
  variants: codeBlockVariants,
  defaultVariants: {
    tone: 'default',
    size: 'md',
    wrap: false,
    lineNumbers: false,
    collapsed: false,
    actionGutter: false,
  },
});
