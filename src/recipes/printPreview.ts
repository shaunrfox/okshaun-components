import { defineSlotRecipe } from '@pandacss/dev';

/**
 * Print preview geometry comes from CSS variables that the components set:
 * `--print-scale`, `--print-page-w`, `--print-page-h`, and
 * `--print-margin-{top,right,bottom,left}`. Lengths are page-space pixels.
 */
export const printPreviewRecipe = defineSlotRecipe({
  className: 'printPreview',
  jsx: ['PrintPreview', 'PrintPage'],
  slots: ['root', 'stack', 'page', 'sheet', 'overlay', 'marginArea', 'margins'],
  base: {
    root: {
      position: 'relative',
      w: 'full',
      h: 'full',
      overflow: 'auto',
      // A scrollbar that appears would change the width and the fit scale.
      scrollbarGutter: 'stable',
      bg: 'surface.sunken',
      p: '24',
      _focusVisible: {
        outlineWidth: '2',
        outlineStyle: 'solid',
        outlineColor: 'border.focused',
        outlineOffset: '-2',
      },
    },
    stack: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '24',
      w: 'max-content',
      minW: 'full',
    },
    page: {
      position: 'relative',
      flexShrink: 0,
      // Auto margins center the page without clipping it when it overflows.
      mx: 'auto',
      w: 'calc(var(--print-page-w) * var(--print-scale))',
      h: 'calc(var(--print-page-h) * var(--print-scale))',
      boxShadow: 'raised',
      '&[data-measuring=true]': {
        visibility: 'hidden',
      },
    },
    sheet: {
      position: 'absolute',
      top: '0',
      left: '0',
      w: 'var(--print-page-w)',
      h: 'var(--print-page-h)',
      overflow: 'hidden',
      // Paper is white in both themes. The token system has no light scope to
      // reset semantic colors inside dark mode, so these are primitives.
      bg: 'neutral.0',
      color: 'neutral.110',
      transform: 'scale(var(--print-scale))',
      transformOrigin: 'top left',
    },
    overlay: {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    },
    // Stripes fill the margins. The padding is the margin, and the mask cuts
    // out the content box. Drawn outside the scaled sheet, so stripe width and
    // spacing stay the same at any zoom.
    marginArea: {
      position: 'absolute',
      inset: '0',
      pt: 'calc(var(--print-margin-top) * var(--print-scale))',
      pr: 'calc(var(--print-margin-right) * var(--print-scale))',
      pb: 'calc(var(--print-margin-bottom) * var(--print-scale))',
      pl: 'calc(var(--print-margin-left) * var(--print-scale))',
      bgImage:
        'repeating-linear-gradient(-45deg, token(colors.border.info) 0 token(sizes.1), transparent token(sizes.1) token(sizes.8))',
      opacity: '0.3',
      // validate-ignore: no-hardcoded-design-values-in-recipes — mask alpha only, never painted
      mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
      maskComposite: 'exclude',
      // biome-ignore lint/style/useNamingConvention: vendor-prefixed CSS property
      WebkitMaskComposite: 'xor',
      pointerEvents: 'none',
    },
    // Drawn outside the scaled sheet so the guide stays one pixel wide.
    margins: {
      position: 'absolute',
      top: 'calc(var(--print-margin-top) * var(--print-scale))',
      right: 'calc(var(--print-margin-right) * var(--print-scale))',
      bottom: 'calc(var(--print-margin-bottom) * var(--print-scale))',
      left: 'calc(var(--print-margin-left) * var(--print-scale))',
      borderWidth: '1',
      borderStyle: 'dashed',
      borderColor: 'border.info',
      pointerEvents: 'none',
    },
  },
});
