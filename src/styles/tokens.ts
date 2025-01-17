export const colors = {
  transparent: { value: 'transparent' },
  black: { value: '#000000' },
  white: { value: '#FFFFFF' },
  current: { value: 'currentColor' },
  blue: {
    5: { value: '#E8F5FF' },
    10: { value: '#CFE8FF' },
    20: { value: '#A1D3FF' },
    30: { value: '#58B4FF' },
    40: { value: '#2491FF' },
    50: { value: '#0076DA' },
    60: { value: '#005EA2' },
    70: { value: '#0B4778' },
    80: { value: '#112F4E' },
  },
  gray: {
    0: { value: '#FFFFFF' },
    1: { value: '#FBFCFD' },
    2: { value: '#F7F9FA' },
    3: { value: '#F5F6F7' },
    4: { value: '#F1F3F6' },
    5: { value: '#EDEFF0' },
    10: { value: '#DFE1E2' },
    20: { value: '#C6CACE' },
    30: { value: '#A9AEB1' },
    40: { value: '#8D9297' },
    50: { value: '#71767A' },
    60: { value: '#565C65' },
    70: { value: '#3D4551' },
    80: { value: '#2D2E2F' },
    90: { value: '#1C1D1F' },
    100: { value: '#000000' },
  },
  mint: {
    5: { value: '#D5FBF3' },
    10: { value: '#7EFBE1' },
    20: { value: '#29E1CB' },
    30: { value: '#1DC2AE' },
    40: { value: '#00A398' },
    50: { value: '#008480' },
    60: { value: '#0F6460' },
    70: { value: '#0B4B3F' },
    80: { value: '#123131' },
  },
  red: {
    5: { value: '#FFF3F2' },
    10: { value: '#FDE0DB' },
    20: { value: '#FDB8AE' },
    30: { value: '#FF8D7B' },
    40: { value: '#FB5A47' },
    50: { value: '#E52207' },
    60: { value: '#B50909' },
    70: { value: '#8B0A03' },
    80: { value: '#5C1111' },
  },
  orange: {
    5: { value: '#fef2e4' },
    10: { value: '#fce2c5' },
    20: { value: '#ffbc78' },
    30: { value: '#fa9441' },
    40: { value: '#e66f0e' },
    50: { value: '#c05600' },
    60: { value: '#8c471c' },
    70: { value: '#5f3617' },
    80: { value: '#352313' },
  },
  yellow: {
    5: { value: '#fff5c2' },
    10: { value: '#fee685' },
    20: { value: '#face00' },
    30: { value: '#ddaa01' },
    40: { value: '#b38c00' },
    50: { value: '#947100' },
    60: { value: '#776017' },
    70: { value: '#5c4809' },
    80: { value: '#422d19' },
  },
  green: {
    5: { value: '#ddf9c7' },
    10: { value: '#c5ee93' },
    20: { value: '#98d035' },
    30: { value: '#7fb135' },
    40: { value: '#719f2a' },
    50: { value: '#538200' },
    60: { value: '#466c04' },
    70: { value: '#2f4a0b' },
    80: { value: '#243413' },
  },
  indigo: {
    5: { value: '#f0f0ff' },
    10: { value: '#e0e0ff' },
    20: { value: '#ccceff' },
    30: { value: '#a3a7fa' },
    40: { value: '#8289ff' },
    50: { value: '#656bd7' },
    60: { value: '#4a50c4' },
    70: { value: '#3333a3' },
    80: { value: '#212463' },
  },
};

export const fonts = {
  sans: { value: "'IBM Plex Sans', Geneva, Tahoma, Verdana, sans-serif" },
  serif: { value: "'Piazzolla', Georgia, 'Times New Roman', Times, serif" },
  mono: {
    value:
      "'IBM Plex Mono', Andale Mono, monaco, Consolas, Lucida Console, monospace",
  },
};

export const fontWeights = {
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  bold: { value: 700 },
};

export const sizes = {
  0: { value: '0' },
  1: { value: '0.0625rem' },
  2: { value: '0.125rem' },
  4: { value: '0.25rem' },
  6: { value: '0.375rem' },
  8: { value: '0.5rem' },
  10: { value: '0.625rem' },
  12: { value: '0.75rem' },
  14: { value: '0.875rem' },
  16: { value: '1rem' },
  20: { value: '1.25rem' },
  24: { value: '1.5rem' },
  32: { value: '2rem' },
  40: { value: '2.5rem' },
  48: { value: '3rem' },
  56: { value: '3.5rem' },
  64: { value: '4rem' },
  72: { value: '4.5rem' },
  80: { value: '5rem' },
  96: { value: '6rem' },
  full: { value: '100%' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
  xs: { value: '20rem' }, // 320px
  sm: { value: '24rem' }, // 384px
  md: { value: '28rem' }, // 448px
  lg: { value: '32rem' }, // 512px
  xl: { value: '36rem' }, // 576px
  '2xl': { value: '42rem' }, // 672px
  '3xl': { value: '48rem' }, // 768px
  '4xl': { value: '56rem' }, // 896px
  '5xl': { value: '64rem' }, // 1024px
  '6xl': { value: '72rem' }, // 1152px
  '7xl': { value: '80rem' }, // 1280px
  '8xl': { value: '90rem' }, // 1440px
  prose: { value: '65ch' }, // 1040px
};

export const fontSizes = {
  12: { value: '0.75rem' },
  14: { value: '0.875rem' },
  16: { value: '1rem' },
  20: { value: '1.25rem' },
  24: { value: '1.5rem' },
  32: { value: '2rem' },
  40: { value: '2.5rem' },
  48: { value: '3rem' },
  64: { value: '4rem' },
  72: { value: '4.5rem' },
  80: { value: '5rem' },
  96: { value: '6rem' },
};

export const radii = {
  0: { value: '0' },
  1: { value: '0.0625rem' },
  2: { value: '0.125rem' },
  4: { value: '0.25rem' },
  8: { value: '0.5rem' },
  16: { value: '1rem' },
  100: { value: '100%' },
};

// export const textStyles: TextStyles = {
//   xs: {
//     value: {
//       fontSize: '0.75rem',
//       lineHeight: '1rem',
//     },
//   },
//   sm: {
//     value: {
//       fontSize: '0.875rem',
//       lineHeight: '1.25rem',
//     },
//   },
//   md: {
//     value: {
//       fontSize: '1rem',
//       lineHeight: '1.5rem',
//     },
//   },
//   lg: {
//     value: {
//       fontSize: '1.125rem',
//       lineHeight: '1.75rem',
//     },
//   },
//   xl: {
//     value: {
//       fontSize: '1.25rem',
//       lineHeight: '1.75rem',
//     },
//   },
//   '2xl': {
//     value: {
//       fontSize: '1.5rem',
//       lineHeight: '2rem',
//     },
//   },
//   '3xl': {
//     value: {
//       fontSize: '1.875rem',
//       lineHeight: '2.25rem',
//     },
//   },
//   '4xl': {
//     value: {
//       fontSize: '2.25rem',
//       lineHeight: '2.5rem',
//     },
//   },
//   '5xl': {
//     value: {
//       fontSize: '3rem',
//       lineHeight: '1',
//     },
//   },
//   '6xl': {
//     value: {
//       fontSize: '3.75rem',
//       lineHeight: '1',
//     },
//   },
//   '7xl': {
//     value: {
//       fontSize: '4.5rem',
//       lineHeight: '1',
//     },
//   },
//   '8xl': {
//     value: {
//       fontSize: '6rem',
//       lineHeight: '1',
//     },
//   },
//   '9xl': {
//     value: {
//       fontSize: '8rem',
//       lineHeight: '1',
//     },
//   },
// };

// https://github.com/chakra-ui/panda/tree/4b70f29a14e98d9a0b450273704d2565e3f2d0bd/packages/preset-panda/src

// export const borders = {
//   none: {
//     value: 'none',
//   },
// };

// export const aspectRatios = {
//   square: {
//     value: '1 / 1',
//   },
//   landscape: {
//     value: '4 / 3',
//   },
//   portrait: {
//     value: '3 / 4',
//   },
//   wide: {
//     value: '16 / 9',
//   },
//   ultrawide: {
//     value: '18 / 5',
//   },
//   golden: {
//     value: '1.618 / 1',
//   },
// };

// export const shadows = {
//   xs: {
//     value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
//   },
//   sm: {
//     value:
//       '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
//   },
//   md: {
//     value:
//       '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
//   },
//   lg: {
//     value:
//       '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
//   },
//   xl: {
//     value:
//       '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1), 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
//   },
//   '2xl': {
//     value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
//   },
//   inner: {
//     value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
//   },
// };

// export const easings = {
//   default: {
//     value: 'cubic-bezier(0.4, 0, 0.2, 1)',
//   },
//   linear: {
//     value: 'linear',
//   },
//   in: {
//     value: 'cubic-bezier(0.4, 0, 1, 1)',
//   },
//   out: {
//     value: 'cubic-bezier(0, 0, 0.2, 1)',
//   },
//   'in-out': {
//     value: 'cubic-bezier(0.4, 0, 0.2, 1)',
//   },
// };

// export const durations = {
//   fastest: {
//     value: '50ms',
//   },
//   faster: {
//     value: '100ms',
//   },
//   fast: {
//     value: '150ms',
//   },
//   normal: {
//     value: '200ms',
//   },
//   slow: {
//     value: '300ms',
//   },
//   slower: {
//     value: '400ms',
//   },
//   slowest: {
//     value: '500ms',
//   },
// };

// export const letterSpacings = {
//   tighter: {
//     value: '-0.05em',
//   },
//   tight: {
//     value: '-0.025em',
//   },
//   normal: {
//     value: '0em',
//   },
//   wide: {
//     value: '0.025em',
//   },
//   wider: {
//     value: '0.05em',
//   },
//   widest: {
//     value: '0.1em',
//   },
// };

// export const lineHeight = {
//   none: {
//     value: '1',
//   },
//   tight: {
//     value: '1.25',
//   },
//   snug: {
//     value: '1.375',
//   },
//   normal: {
//     value: '1.5',
//   },
//   relaxed: {
//     value: '1.625',
//   },
//   loose: {
//     value: '2',
//   },
// };

// export const blurs = {
//   sm: {
//     value: '4px',
//   },
//   base: {
//     value: '8px',
//   },
//   md: {
//     value: '12px',
//   },
//   lg: {
//     value: '16px',
//   },
//   xl: {
//     value: '24px',
//   },
//   '2xl': {
//     value: '40px',
//   },
//   '3xl': {
//     value: '64px',
//   },
// };

// export const animations = {
//   spin: {
//     value: 'spin 1s linear infinite',
//   },
//   ping: {
//     value: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
//   },
//   pulse: {
//     value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//   },
//   bounce: {
//     value: 'bounce 1s infinite',
//   },
// };

// export const breakpoints = {
//   xs: {
//     value: '480px',
//   },
//   sm: {
//     value: '640px',
//   },
//   md: {
//     value: '768px',
//   },
//   lg: {
//     value: '1024px',
//   },
//   xl: {
//     value: '1280px',
//   },
//   '2xl': {
//     value: '1536px',
//   },
// };
