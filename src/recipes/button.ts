import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

// A button with a `disabledReason` takes pointer events so its tooltip can
// open on hover. These selectors keep hover and press styles off it.
const enabled = ":not([aria-disabled='true'])";
const hoverEnabled = `&:is(:hover, [data-hover=true])${enabled}`;
const activeEnabled = `&:is(:active, [data-active=true])${enabled}`;
const groupHoverEnabled = `.group:is(:hover, [data-hover=true])${enabled} &`;
const groupActiveEnabled = `.group:is(:active, [data-active=true])${enabled} &`;

// Ported from the Cetec design system: slots, the custom-property sizing
// mechanism, the size variant and the style-variant set. The recipe's
// before/after variants are internal, computed from Button's props, so the
// public before, after, iconBefore and iconAfter props are unchanged.

const buttonBaseStyles = {
  container: {
    ...globalBaseStyles,
    '--main-py': 'token(sizes.3)',
    '--main-px': 'token(sizes.10)',
    '--main-slot-side-padding': 'token(sizes.0)',
    '--main-fs': 'token(sizes.16)',
    '--slot-size': 'token(sizes.20)',
    '--slot-px': 'token(sizes.6)',
    position: 'relative',
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    minWidth: '0',
    width: 'fit',
    height: 'fit',
    flexShrink: 0,
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    verticalAlign: 'middle',
    fontWeight: 'medium',
    fontFamily: 'sans',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: '4',
    outlineWidth: '2',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    outlineOffset: '1',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.3',
    },
    _loading: {
      cursor: 'not-allowed',
      opacity: '0.3',
    },
    _focusVisible: {
      outlineColor: 'border.focused',
    },
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit',
    height: 'fit',
    py: 'var(--main-py)',
    px: 'var(--main-px)',
    fontSize: 'var(--main-fs)',
    // On the label, not the container, so `default` resolves against the
    // label's own font size instead of the container's.
    lineHeight: 'default',
  },
  slot: {
    display: 'inline-flex',
    alignItems: 'center',
    transitionDuration: 'fast',
    transitionProperty: 'all',
    transitionTimingFunction: 'default',
    flex: '0 0 var(--slot-size)',
    px: 'var(--slot-px)',
  },
};

// Variants only hold color-related styles
const buttonVariants = {
  variant: {
    standard: {
      container: {
        bg: 'bg.neutral',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'bg.neutral.hovered',
        },
        [activeEnabled]: {
          bg: 'bg.neutral.pressed',
        },
      },
      mainContent: {
        color: 'text',
      },
      slot: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        [groupHoverEnabled]: { fill: 'current' },
        [groupActiveEnabled]: { fill: 'current' },
      },
    },
    primary: {
      container: {
        bg: 'bg.neutral.boldest',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'bg.neutral.bold.hovered',
        },
        [activeEnabled]: {
          bg: 'bg.neutral.bold.pressed',
        },
      },
      mainContent: {
        color: 'text.inverse',
      },
      slot: {
        fill: 'icon.decorative.inverse',
        mixBlendMode: { base: 'screen', _dark: 'multiply' },
        [groupHoverEnabled]: { fill: 'icon.decorative.inverse.hovered' },
        [groupActiveEnabled]: { fill: 'icon.decorative.inverse.hovered' },
        _groupDisabled: {
          fill: 'icon.decorative.inverse',
        },
      },
    },
    hollow: {
      container: {
        bg: 'bg.neutral.subtle',
        borderColor: 'border',
        [hoverEnabled]: {
          bg: 'bg.neutral.subtle.hovered',
        },
        [activeEnabled]: {
          bg: 'bg.neutral.subtle.pressed',
        },
      },
      mainContent: {
        color: 'text',
      },
      slot: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        [groupHoverEnabled]: { fill: 'current' },
        [groupActiveEnabled]: { fill: 'current' },
      },
    },
    ghost: {
      container: {
        bg: 'bg.neutral.subtle',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'bg.neutral.subtle.hovered',
        },
        [activeEnabled]: {
          bg: 'bg.neutral.subtle.pressed',
        },
      },
      mainContent: {
        color: 'text',
      },
      slot: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        [groupHoverEnabled]: { fill: 'current' },
        [groupActiveEnabled]: { fill: 'current' },
      },
    },
    danger: {
      container: {
        bg: 'red.50',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'red.40',
        },
        [activeEnabled]: {
          bg: 'red.60',
        },
      },
      mainContent: {
        color: 'neutral.0',
      },
      // The red background and white label are the same in both themes, so
      // the icon is too. The inverse icon tokens turn dark in dark mode, and
      // a dark icon screened on red does not show.
      slot: {
        fill: 'neutral.30',
        mixBlendMode: 'screen',
        [groupHoverEnabled]: { fill: 'neutral.0' },
        [groupActiveEnabled]: { fill: 'neutral.0' },
        _groupDisabled: {
          fill: 'neutral.30',
        },
      },
    },
    selected: {
      container: {
        bg: 'bg.selected',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'bg.selected.hovered',
          color: 'text.selected',
        },
        [activeEnabled]: {
          bg: 'bg.selected.pressed',
          color: 'text.selected',
        },
      },
      mainContent: {
        color: 'text.selected',
      },
      slot: {
        fill: 'icon.selected',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        [groupHoverEnabled]: { fill: 'icon.selected' },
        [groupActiveEnabled]: { fill: 'icon.selected' },
        _groupDisabled: {
          fill: 'icon.selected',
        },
      },
    },
    selectedBold: {
      container: {
        bg: 'bg.selected.bold',
        borderColor: 'transparent',
        [hoverEnabled]: {
          bg: 'bg.selected.bold.hovered',
        },
        [activeEnabled]: {
          bg: 'bg.selected.bold.pressed',
        },
      },
      mainContent: {
        color: 'text.inverse',
      },
      slot: {
        fill: 'icon.decorative.inverse',
        mixBlendMode: { base: 'screen', _dark: 'multiply' },
        [groupHoverEnabled]: { fill: 'icon.decorative.inverse.hovered' },
        [groupActiveEnabled]: { fill: 'icon.decorative.inverse.hovered' },
        _groupDisabled: {
          fill: 'icon.decorative.inverse',
        },
      },
    },
  },
};

export const buttonRecipe = defineSlotRecipe({
  className: 'button',
  jsx: ['Button'],
  slots: ['container', 'mainContent', 'slot'],
  base: buttonBaseStyles,
  variants: {
    ...buttonVariants,
    size: {
      sm: {
        container: {
          '--main-py': 'token(sizes.0)',
          '--main-px': 'token(sizes.8)',
          '--main-slot-side-padding': 'token(sizes.0)',
          '--main-fs': 'token(sizes.14)',
          '--slot-size': 'token(sizes.16)',
          '--slot-px': 'token(sizes.4)',
        },
      },
      md: {
        container: {
          '--main-py': 'token(sizes.3)',
          '--main-px': 'token(sizes.10)',
          '--main-slot-side-padding': 'token(sizes.0)',
          '--main-fs': 'token(sizes.16)',
          '--slot-size': 'token(sizes.20)',
          '--slot-px': 'token(sizes.6)',
        },
      },
      lg: {
        container: {
          '--main-py': 'token(sizes.7)',
          '--main-px': 'token(sizes.12)',
          '--main-slot-side-padding': 'token(sizes.0)',
          '--main-fs': 'token(sizes.16)',
          '--slot-size': 'token(sizes.24)',
          '--slot-px': 'token(sizes.8)',
        },
      },
      xl: {
        container: {
          '--main-py': 'token(sizes.9)',
          '--main-px': 'token(sizes.16)',
          '--main-slot-side-padding': 'token(sizes.0)',
          '--main-fs': 'token(sizes.20)',
          '--slot-size': 'token(sizes.28)',
          '--slot-px': 'token(sizes.10)',
        },
      },
    },
    before: {
      true: {
        mainContent: {
          ps: '0',
        },
      },
    },
    after: {
      true: {
        mainContent: {
          pe: '0',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'md',
  },
});

export const iconButtonRecipe = defineSlotRecipe({
  className: 'iconButton',
  jsx: ['IconButton'],
  slots: ['container', 'mainContent', 'slot'],
  base: {
    ...buttonBaseStyles,
    mainContent: {
      w: 'calc(var(--slot-size) + (var(--slot-px) * 2))',
      h: 'calc(var(--slot-size) + (var(--slot-px) * 2))',
      p: 'var(--slot-px)',
    },
    slot: {
      w: 'var(--slot-size)',
      h: 'var(--slot-size)',
    },
  },
  variants: {
    ...buttonVariants,
    size: {
      sm: {
        container: {
          '--slot-size': 'token(sizes.16)',
          '--slot-px': 'token(sizes.3)',
        },
      },
      md: {
        container: {
          '--slot-size': 'token(sizes.20)',
          '--slot-px': 'token(sizes.5)',
        },
      },
      lg: {
        container: {
          '--slot-size': 'token(sizes.24)',
          '--slot-px': 'token(sizes.7)',
        },
      },
      xl: {
        container: {
          '--slot-size': 'token(sizes.28)',
          '--slot-px': 'token(sizes.9)',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'md',
  },
});
