import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const popoverBase = {
  content: {
    ...globalBaseStyles,
    display: 'flex',
    flexDirection: 'column',
    bg: 'surface.overlay',
    color: 'text',
    borderRadius: '8',
    border: 'default',
    boxShadow: 'overlay',
    outline: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '8',
    px: '12',
    pt: '12',
    pb: '4',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '6',
    fontWeight: 'bold',
    color: 'text',
    lineHeight: 'tight',
    minW: '0',
    flex: '1',
  },
  titleIcon: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
  },
  description: {
    color: 'text.subtle',
    lineHeight: 'default',
    px: '12',
    pb: '4',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    px: '12',
    py: '8',
    color: 'text',
    lineHeight: 'default',
  },
  // Content can't clip overflow without clipping the arrow, so media rounds
  // its own corners when it sits at the top or bottom edge of the panel.
  media: {
    display: 'block',
    width: 'full',
    overflow: 'hidden',
    _first: { borderTopRadius: '8' },
    _last: { borderBottomRadius: '8' },
    '& img': {
      display: 'block',
      width: 'full',
      height: 'auto',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: '8',
    px: '12',
    pt: '4',
    pb: '12',
  },
  close: {
    flex: 'none',
    ms: 'auto',
  },
  // Applied only to the fallback element PopoverTrigger renders for plain
  // content, never to a consumer's cloned child. Reads as an inline
  // dashed-underline phrase whether it renders a button or a span.
  trigger: {
    appearance: 'none',
    display: 'inline',
    width: 'fit',
    p: '0',
    m: '0',
    bg: 'transparent',
    borderWidth: '0',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationThickness: '[0.0625em]',
    textUnderlineOffset: '[0.15625em]',
    textDecorationSkipInk: 'all',
    cursor: 'pointer',
    _focusVisible: {
      borderRadius: '2',
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'border.focused',
    },
  },
};

const popoverVariants = {
  interaction: {
    definition: { trigger: { cursor: 'help' } },
    rich: {},
  },
  /** z-index layer inherited from FloatingLayerContext (raised inside modals). */
  layer: {
    elevated: { content: { zIndex: 'elevated' } },
    modalFloating: { content: { zIndex: 'modalFloating' } },
  },
  size: {
    sm: {
      content: { maxW: '280', fontSize: '12' },
      title: { fontSize: '12' },
      description: { fontSize: '12' },
      body: { fontSize: '12' },
    },
    md: {
      content: { maxW: 'xs', fontSize: '14' },
      title: { fontSize: '14' },
      description: { fontSize: '14' },
      body: { fontSize: '14' },
    },
    lg: {
      content: { maxW: 'sm', fontSize: '14' },
      title: { fontSize: '16' },
      description: { fontSize: '14' },
      body: { fontSize: '14' },
    },
  },
  /**
   * Visual tone for handbook-style notes. Quiet chrome only: left accent bar +
   * soft title tint. Surface stays neutral (surface.overlay). Never maps to
   * role="alert".
   */
  tone: {
    note: {
      content: { borderLeft: 'default', borderLeftWidth: '4' },
      title: { color: 'text.subtle' },
    },
    tip: {
      content: { borderLeft: 'info', borderLeftWidth: '4' },
      title: { color: 'text.subtle' },
    },
    warning: {
      content: { borderLeft: 'warning', borderLeftWidth: '4' },
      title: { color: 'text.warning' },
    },
    important: {
      content: { borderLeft: 'danger', borderLeftWidth: '4' },
      title: { color: 'text.danger' },
    },
    caution: {
      content: { borderLeft: 'warning', borderLeftWidth: '4' },
      title: { color: 'text.warning' },
    },
  },
};

export const popoverRecipe = defineSlotRecipe({
  className: 'popover',
  jsx: [
    'Popover',
    'PopoverTrigger',
    'PopoverContent',
    'PopoverHeader',
    'PopoverTitle',
    'PopoverDescription',
    'PopoverBody',
    'PopoverMedia',
    'PopoverFooter',
    'PopoverClose',
    'PopoverArrow',
  ],
  slots: [
    'content',
    'header',
    'title',
    'titleIcon',
    'description',
    'body',
    'media',
    'footer',
    'close',
    'trigger',
  ],
  base: popoverBase,
  variants: popoverVariants,
  defaultVariants: {
    size: 'md',
    interaction: 'rich',
    layer: 'elevated',
  },
});
