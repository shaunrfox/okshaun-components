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
      before: ['*'],
      after: ['*'],
      responsive: true,
    },
  ],
  card: [{ variant: ['*'], interactive: ['*'] }],
  chip: [
    {
      size: ['*'],
      before: ['*'],
      after: ['*'],
      dismissable: ['*'],
      responsive: true,
    },
  ],
  // `layer` comes from FloatingLayerContext at runtime, so Panda cannot see the
  // value statically and would emit the class with no rule behind it.
  autocomplete: [{ size: ['*'], responsive: true }, { layer: ['*'] }],
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
  segmentedInputs: [{ size: ['*'], responsive: true }],
  divider: [{ direction: ['*'], weight: ['*'] }],
  formField: [{ size: ['*'], layout: ['*'], responsive: true }],
  icon: [{ size: ['*'], responsive: true }],
  iconButton: [{ size: ['*'], variant: ['*'], responsive: true }],
  list: [{ density: ['*'], responsive: true }],
  listItem: [
    {
      density: ['*'],
      variant: ['*'],
      iconBefore: ['*'],
      iconAfter: ['*'],
      responsive: true,
    },
    { selected: ['*'] },
  ],
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
  spinner: [{ size: ['*'], centered: ['*'], inverse: ['*'], responsive: true }],
  textarea: [{ size: ['*'], responsive: true }, { autoSize: ['*'] }],
  textInput: [
    {
      size: ['*'],
      before: ['*'],
      after: ['*'],
      autoSize: ['*'],
      responsive: true,
    },
  ],
  tooltip: [{ size: ['*'], responsive: true }, { hasTitle: ['*'] }],
  // Matches Cetec's entry. ⚠️ It does not actually work here: tag holds all of
  // its colour in compoundVariants over empty variant bodies, and Panda emits
  // nothing for either, with '*' or with explicit values. Tag renders
  // uncoloured until the recipe is restructured the way ecl.11 restructured the
  // other six recipes.
  tag: [
    { variant: ['*'], hue: ['*'] },
    // Boolean(iconBefore) etc. are computed in Tag.tsx, so Panda cannot see
    // them statically. Naming `tag` above replaces the default coverage, so
    // these have to be listed or their padding rules disappear.
    { iconBefore: ['*'], iconAfter: ['*'], hasIcon: ['*'] },
  ],
};

/**
 * Guard: every key in `recipeOverrides` must name a real variant on that recipe.
 *
 * `recipeOverrides` REPLACES the default `['*']` coverage for a recipe, so a key
 * that no longer exists does not fall back - it silently removes the real
 * variant's CSS. Panda emits the variant class onto the element and no rule
 * behind it, which typechecks, builds, and renders wrong.
 *
 * This has happened twice: ecl.11 renamed button's and textInput's
 * `iconBefore`/`iconAfter` variants to `before`/`after` and left this config
 * naming the old ones, so icon padding silently stopped applying in both.
 * Both values are computed at runtime, so Panda could never see them
 * statically either.
 */
const recipeVariantKeys = new Map<string, Set<string>>(
  [...Object.entries(regularRecipes), ...Object.entries(slotRecipes)].map(
    ([exportName, recipe]) => [
      exportName.replace(/Recipe$/, ''),
      new Set(
        Object.keys(
          (recipe as { variants?: Record<string, unknown> }).variants ?? {},
        ),
      ),
    ],
  ),
);

const NON_VARIANT_RULE_KEYS = new Set(['responsive', 'conditions']);
const staticCssErrors: string[] = [];
const staticCssWarnings: string[] = [];

for (const [recipe, rules] of Object.entries(recipeOverrides)) {
  const known = recipeVariantKeys.get(recipe);

  if (!known) {
    staticCssErrors.push(
      `  ${recipe}: not a recipe. Known recipes: ${[...recipeVariantKeys.keys()].join(', ')}`,
    );
    continue;
  }

  const covered = new Set<string>();
  for (const rule of rules) {
    if (typeof rule === 'string') continue;
    for (const key of Object.keys(rule as Record<string, unknown>)) {
      if (NON_VARIANT_RULE_KEYS.has(key)) continue;
      covered.add(key);
      if (!known.has(key)) {
        staticCssErrors.push(
          `  ${recipe}.${key}: not a variant. Real variants: ${[...known].join(', ') || '(none)'}`,
        );
      }
    }
  }

  const uncovered = [...known].filter((key) => !covered.has(key));
  if (uncovered.length > 0) {
    staticCssWarnings.push(`  ${recipe}: ${uncovered.join(', ')}`);
  }
}

if (staticCssWarnings.length > 0) {
  console.warn(
    [
      'staticCss: variants with no recipeOverrides coverage.',
      'Safe when every value is written literally in the source; a variant whose',
      'value is computed at runtime needs an entry here or it emits no CSS.',
      ...staticCssWarnings,
      '',
    ].join('\n'),
  );
}

if (staticCssErrors.length > 0) {
  throw new Error(
    [
      '',
      'staticCss: recipeOverrides names variants that do not exist.',
      'These silently remove CSS rather than failing, because recipeOverrides',
      'replaces the default coverage for the recipe it names.',
      '',
      ...staticCssErrors,
      '',
    ].join('\n'),
  );
}

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
