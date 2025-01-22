import { defineRecipe } from '@pandacss/dev';

const sansStyles = {
  fontFamily: 'sans',
  color: 'gray.90',
  _osDark: { color: 'gray.5' },
};

const serifStyles = {
  fontFamily: 'serif',
  color: 'gray.70',
  _osDark: { color: 'gray.20' },
};

const monoStyles = {
  fontFamily: 'mono',
  color: 'gray.70',
  _osDark: { color: 'gray.20' },
};

export const textStyles = {
  display: {
    lg: {
      value: {
        ...sansStyles,
        fontSize: '72',
        lineHeight: '64',
        fontWeight: 'bold',
      },
    },
    md: {
      value: {
        ...sansStyles,
        fontSize: '64',
        lineHeight: '64',
        fontWeight: 'bold',
      },
    },
    sm: {
      value: {
        ...sansStyles,
        fontSize: '56',
        lineHeight: '56',
        fontWeight: 'bold',
      },
    },
    xs: {
      value: {
        ...sansStyles,
        fontSize: '48',
        lineHeight: '56',
        fontWeight: 'bold',
      },
    },
  },
  heading: {
    lg: {
      ...sansStyles,
      fontSize: '40',
      lineHeight: '40',
      fontWeight: 'bold',
    },
    md: {
      value: {
        ...sansStyles,
        fontSize: '32',
        lineHeight: '32',
        fontWeight: 'bold',
      },
    },
    sm: {
      value: {
        ...sansStyles,
        fontSize: '24',
        lineHeight: '24',
        fontWeight: 'bold',
      },
    },
    xs: {
      value: {
        ...sansStyles,
        fontSize: '20',
        lineHeight: '24',
        fontWeight: 'bold',
      },
    },
  },
  body: {
    lg: {
      value: {
        ...serifStyles,
        fontSize: '20',
        lineHeight: '24',
      },
    },
    md: {
      value: {
        ...serifStyles,
        fontSize: '16',
        lineHeight: '20',
      },
    },
    sm: {
      value: {
        ...serifStyles,
        fontSize: '14',
        lineHeight: '20',
      },
    },
    xs: {
      ...serifStyles,
      value: {
        fontSize: '12',
        lineHeight: '16',
      },
    },
  },
  mono: {
    lg: {
      value: {
        ...monoStyles,
        fontSize: '20',
        lineHeight: '24',
      },
    },
    md: {
      value: {
        ...monoStyles,
        fontSize: '16',
        lineHeight: '20',
      },
    },
    sm: {
      value: {
        ...monoStyles,
        fontSize: '14',
        lineHeight: '20',
      },
    },
    xs: {
      value: {
        ...monoStyles,
        fontSize: '12',
        lineHeight: '16',
      },
    },
  },
};

export const text = defineRecipe({
  className: 'text',
  jsx: ['Text'],
  base: {
    margin: '0',
    lineHeight: 'normal',
    fontWeight: 'normal',
    color: { base: 'gray.70', _osDark: 'gray.20' },
  },
  variants: {
    as: {
      h1: { ...textStyles.heading.lg },
      h2: { ...textStyles.heading.md },
      h3: { ...textStyles.heading.sm },
      h4: { ...textStyles.heading.xs },
    },
    level: {
      12: { fontSize: 12 },
      14: { fontSize: 14 },
      16: { fontSize: 16 },
      20: { fontSize: 20 },
      24: { fontSize: 24 },
      32: { fontSize: 32 },
      40: { fontSize: 40 },
      48: { fontSize: 48 },
      64: { fontSize: 64 },
      72: { fontSize: 72 },
      80: { fontSize: 80 },
      96: { fontSize: 96 },
    },
    font: {
      sans: { fontFamily: 'sans' },
      serif: { fontFamily: 'serif' },
      mono: { fontFamily: 'mono' },
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
  },
  defaultVariants: {
    level: 16,
    font: 'sans',
  },
});

// export type TextVariantProps = typeof text.variantProps;
