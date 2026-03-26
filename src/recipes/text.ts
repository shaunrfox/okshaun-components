import { defineRecipe } from '@pandacss/dev';

import {
  fontSizes as fontSizeTokens,
  fontWeights as fontWeightTokens,
} from '../styles/primitives';

const textBase = {
  margin: '0',
  lineHeight: 'default',
  fontWeight: 'normal',
  fontSize: '{sizes.16}',
  color: 'text.subtlest',
  maxWidth: 'prose',
};

type FontSizeKey = keyof typeof fontSizeTokens;
const fontSizes = (Object.keys(fontSizeTokens) as FontSizeKey[]).reduce(
  (accumulator, currentKey) => {
    accumulator[currentKey] = { fontSize: fontSizeTokens[currentKey].value };
    return accumulator;
  },
  {} as Record<FontSizeKey, Record<'fontSize', string>>,
);

type FontWeightKey = keyof typeof fontWeightTokens;
const fontWeights = (Object.keys(fontWeightTokens) as FontWeightKey[]).reduce(
  (accumulator, currentKey) => {
    accumulator[currentKey] = {
      fontWeight: fontWeightTokens[currentKey].value,
    };
    return accumulator;
  },
  {} as Record<FontWeightKey, Record<'fontWeight', number>>,
);

const textVariants = {
  family: {
    heading: { fontFamily: 'heading' },
    body: { fontFamily: 'body' },
    sans: { fontFamily: 'sans' },
    serif: { fontFamily: 'serif' },
    mono: { fontFamily: 'mono' },
    inherit: { fontFamily: 'inherit' },
  },
  bold: {
    true: {
      fontWeight: 'bold',
    },
  },
  italic: {
    true: {
      fontStyle: 'italic',
    },
  },
  underline: {
    true: {
      textDecoration: 'underline',
    },
  },
  truncate: {
    true: {
      width: 'full',
      maxWidth: 'full',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  allCaps: {
    true: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: 'widest',
    },
  },
  size: fontSizes,
  weight: fontWeights,
};

const headingBase = {
  fontFamily: 'heading',
  fontWeight: 'black',
  color: 'text.bold',
  lineHeight: 'default',
};

const headingVariants = {
  level: {
    h1: { textStyle: 'heading.lg' },
    h2: { textStyle: 'heading.md' },
    h3: { textStyle: 'heading.sm' },
    h4: { textStyle: 'heading.xs' },
  },
  allCaps: {
    true: {
      textTransform: 'uppercase',
      letterSpacing: 'widest',
    },
  },
};

const linkBase = {
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 'medium',
  gap: '1',
  color: 'link',
  textDecoration: 'none',
  backgroundImage: 'linear-gradient(90deg, transparent 0% 100%)',
  backgroundSize: '100% {sizes.1}',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '100%',
  outlineWidth: '2',
  outlineStyle: 'solid',
  outlineColor: 'transparent',
  outlineOffset: '1',
  width: 'fit-content',
  cursor: 'pointer',
  _hover: {
    color: 'link',
    backgroundImage: 'linear-gradient(90deg, currentColor 0% 100%)',
  },
  _focusVisible: {
    borderRadius: '{sizes.4}',
    outlineColor: 'border.focused',
  },
  'p &': {
    backgroundImage: 'linear-gradient(90deg, currentColor 0% 100%)',
  },
};

const linkVariants = {
  ...textVariants,
  _disabled: {
    true: {
      cursor: 'not-allowed',
      color: 'text.disabled',
      pointerEvents: 'none',
    },
  },
};

const labelBase = {
  fontSize: '{sizes.16}',
  fontWeight: 'normal',
  lineHeight: 'tight',
  cursor: 'default',
  color: 'text',
};

const labelVariants = {
  ...textVariants,
  _disabled: {
    true: {
      cursor: 'not-allowed',
      color: 'text.disabled',
      pointerEvents: 'none',
    },
  },
};

export const textRecipe = defineRecipe({
  className: 'text',
  jsx: ['Text'],
  base: textBase,
  variants: textVariants,
  defaultVariants: {
    family: 'inherit',
  },
});

export const headingRecipe = defineRecipe({
  className: 'heading',
  jsx: ['Heading'],
  base: headingBase,
  variants: headingVariants,
  defaultVariants: {
    level: 'h2',
  },
});

export const linkRecipe = defineRecipe({
  className: 'link',
  jsx: ['Link'],
  base: linkBase,
  variants: linkVariants,
  defaultVariants: {
    family: 'inherit',
  },
});

export const labelRecipe = defineRecipe({
  className: 'label',
  jsx: ['Label'],
  base: labelBase,
  variants: labelVariants,
  defaultVariants: {
    family: 'sans',
  },
});
