import { defineUtility } from '@pandacss/dev';

import { filterAutoValue } from './filters';
import {
  type DropShadowName,
  elevationShadowDefinitions,
} from './shadowDefinitions';

const dropShadowValues = {
  zero: 'zero',
  raised: 'raised',
  elevated: 'elevated',
  overlay: 'overlay',
} satisfies Record<DropShadowName, DropShadowName>;

const resolveDropShadowValue = (
  value: DropShadowName,
  token: (path: string) => string | undefined,
) =>
  elevationShadowDefinitions[value]
    .map((layer) => {
      const x = token(`sizes.${layer.x}`);
      const y = token(`sizes.${layer.y}`);
      const blur = token(`sizes.${layer.blur}`);
      const color = token(layer.color);

      if (!x || !y || !blur || !color) {
        throw new Error(`Unable to resolve dropShadow token for ${value}`);
      }

      return `drop-shadow(${x} ${y} ${blur} ${color})`;
    })
    .join(' ');

/**
 * Replaces Panda's built-in dropShadow utility so drop shadows use the same
 * layer definitions as the boxShadow tokens. Writing through `--drop-shadow`
 * keeps the value composable with the other filter slots.
 */
export const dropShadowProperty = defineUtility({
  className: 'drop-shadow',
  group: 'Effect',
  values: dropShadowValues,
  transform(value: DropShadowName, ctx) {
    return {
      filter: filterAutoValue,
      '--drop-shadow': resolveDropShadowValue(value, ctx.token),
    };
  },
});
