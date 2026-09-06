import { defineConfig } from '@pandacss/dev';
import type { RecipeRule } from '@pandacss/types';
import { okshaunPreset } from './src/preset';

import * as regularRecipes from './src/recipes/recipes-regular';
import * as slotRecipes from './src/recipes/recipes-slot';

// Control whether the staticCss is included or not
// because it's not needed for production and
// generates a ton of CSS
const isStatic = process.env.PANDA_STATIC === 'true';

const recipeNames = [
  ...Object.keys(regularRecipes),
  ...Object.keys(slotRecipes),
].map((key) => key.replace(/Recipe$/, ''));

// Static CSS we always want. `responsive: true` is also what makes Panda type
// those variant props as ConditionalValue, so responsive sizes flow from
// FieldContext and SlotContext into the recipes.
const recipeOverrides: Record<string, RecipeRule[]> = {
  avatar: [{ size: ['*'], responsive: true }, { shape: ['*'] }],
  badge: [
    { size: ['*'], responsive: true },
    { standalone: ['*'], dot: ['*'], variant: ['*'] },
  ],
  button: [
    {
      size: ['*'],
      variant: ['*'],
      iconBefore: ['*'],
      iconAfter: ['*'],
      responsive: true,
    },
  ],
  card: [{ variant: ['*'], interactive: ['*'] }],
  chip: [{ size: ['*'], before: ['*'], after: ['*'], responsive: true }],
  calendar: [{ type: ['*'] }],
  segmentedFields: [
    {
      size: ['*'],
      field: ['*'],
      range: ['*'],
      before: ['*'],
      after: ['*'],
      responsive: true,
    },
  ],
  segmentedInputs: [{ size: ['*'], bare: ['*'], responsive: true }],
  divider: [{ direction: ['*'], weight: ['*'] }],
  formField: [{ size: ['*'], layout: ['*'], responsive: true }],
  icon: [{ size: ['*'], responsive: true }],
  iconButton: [{ size: ['*'], variant: ['*'], responsive: true }],
  list: [{ density: ['*'], responsive: true }],
  listItem: [{ density: ['*'], responsive: true }, { selected: ['*'] }],
  listItemGroup: [{ density: ['*'], responsive: true }],
  menu: [
    { density: ['*'], responsive: true },
    { panel: ['*'] },
    // `layer` is chosen at runtime from FloatingLayerContext, so Panda cannot
    // see the value statically and would emit no CSS for it.
    { layer: ['*'] },
  ],
  select: [{ size: ['*'], responsive: true }],
  skeleton: [{ variant: ['*'], animation: ['*'] }],
  spinner: [{ size: ['*'], responsive: true }],
  textarea: [{ size: ['*'], responsive: true }],
  textInput: [
    { size: ['*'], iconBefore: ['*'], iconAfter: ['*'], responsive: true },
  ],
  tooltip: [{ size: ['*'], responsive: true }],
};

const staticCssRecipes: Record<string, RecipeRule[]> = Object.fromEntries(
  recipeNames.map((name) => [name, ['*'] as unknown as RecipeRule[]]),
);

const staticCssCss = [
  {
    properties: {
      background: ['*'],
      color: ['*'],
      border: ['*'],
      fill: ['*'],
      boxShadow: ['*'],
      width: ['*'],
      height: ['*'],
      minWidth: ['*'],
      minHeight: ['*'],
      maxWidth: ['*'],
      maxHeight: ['*'],
      borderRadius: ['*'],
      textStyle: ['*'],
      fontFamily: ['*'],
      fontSize: ['*'],
      fontWeight: ['*'],
      lineHeight: ['*'],
      letterSpacing: ['*'],
    },
    conditions: ['light', 'dark'],
  },
];

const staticCss = {
  staticCss: {
    css: isStatic ? staticCssCss : [],
    recipes: {
      ...(isStatic ? staticCssRecipes : {}),
      ...recipeOverrides,
    },
  },
};

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  jsxFactory: 'styled',
  preflight: false, // do not add Panda's default reset styles
  strictTokens: true,
  // watch: true,

  presets: [okshaunPreset],

  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    './src/storybook/**/*.{js,jsx,mjs,ts,tsx,mdx}',
  ],
  exclude: [],

  prefix: 'oks',
  importMap: '@styled-system',
  outdir: 'src/styled-system',

  hooks: {
    'config:resolved': ({ config, utils }) => {
      return utils.omit(config, ['patterns.box', 'patterns.divider']);
    },
  },

  // hooks: {
  //   'preset:resolved': ({ utils, preset, name }) => {
  //     if (name === 'okshaunPreset') {
  //       return utils.omit(preset, ['patterns.box', 'patterns.divider']);
  //     }
  //     return preset;
  //   },
  // },

  ...staticCss,
});
