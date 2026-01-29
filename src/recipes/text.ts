import { defineRecipe } from '@pandacss/dev';
import {
  fontSizes as fontSizeTokens,
  fontWeights as fontWeightTokens,
} from '../styles/primitives';

const textBase = {
  margin: '0',
  lineHeight: 'default',
  fontWeight: 'normal',
  fontSize: '16',
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
  allcaps: {
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
  allcaps: {
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
  color: { base: 'blue.70', _dark: 'blue.40' },
  backgroundImage: 'linear-gradient(90deg, transparent 0% 100%)',
  backgroundSize: '100% 1px',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '100%',
  width: 'fit-content',
  cursor: 'pointer',
  textDecoration: 'none',
  _hover: {
    color: { base: 'blue.60', _dark: 'blue.40' },
    backgroundColor: { base: 'blue.10', _dark: 'blue.100' },
    backgroundImage: 'linear-gradient(90deg, currentColor 0% 100%)',
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
  fontSize: '14',
  fontWeight: 'normal',
  lineHeight: 'tight',
  cursor: 'default',
};

//Copied linkvarients, don't have styles defined for this yet
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
