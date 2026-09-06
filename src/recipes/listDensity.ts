/**
 * Density is one variant that publishes a full set of custom properties on the
 * list wrapper; every other slot, ListItemGroup and Menu read them. Ported from
 * the Cetec design system, which is where the abstraction comes from: expressing
 * density as compound variants instead makes every variant prop on the recipe
 * non-responsive, because Panda types variant props as plain literals rather
 * than ConditionalValue on any recipe declaring compoundVariants.
 */
export type ListDensityValue = 'compact' | 'comfortable' | 'spacious';

export const listDensityVars = {
  compact: {
    '--list-item-slot-margin': 'token(sizes.5)',
    '--list-item-padding-y': 'token(sizes.3)',
    '--list-item-padding-x': 'token(sizes.10)',
    '--list-item-icon-size': 'token(sizes.24)',
    '--list-item-label-size': 'token(sizes.16)',
    '--list-item-description-size': 'token(sizes.12)',
    '--list-group-label-padding-x': 'token(sizes.10)',
    '--list-group-label-padding-top': 'token(sizes.8)',
    '--list-group-label-padding-bottom': 'token(sizes.2)',
    '--list-group-label-size': 'token(sizes.12)',
    '--list-group-divider-margin-y': 'token(sizes.4)',
    '--list-group-divider-margin-x': 'token(sizes.10)',
  },
  comfortable: {
    '--list-item-slot-margin': 'token(sizes.7)',
    '--list-item-padding-y': 'token(sizes.7)',
    '--list-item-padding-x': 'token(sizes.12)',
    '--list-item-icon-size': 'token(sizes.24)',
    '--list-item-label-size': 'token(sizes.16)',
    '--list-item-description-size': 'token(sizes.12)',
    '--list-group-label-padding-x': 'token(sizes.12)',
    '--list-group-label-padding-top': 'token(sizes.12)',
    '--list-group-label-padding-bottom': 'token(sizes.4)',
    '--list-group-label-size': 'token(sizes.14)',
    '--list-group-divider-margin-y': 'token(sizes.6)',
    '--list-group-divider-margin-x': 'token(sizes.12)',
  },
  spacious: {
    '--list-item-slot-margin': 'token(sizes.9)',
    '--list-item-padding-y': 'token(sizes.9)',
    '--list-item-padding-x': 'token(sizes.16)',
    '--list-item-icon-size': 'token(sizes.28)',
    '--list-item-label-size': 'token(sizes.20)',
    '--list-item-description-size': 'token(sizes.14)',
    '--list-group-label-padding-x': 'token(sizes.16)',
    '--list-group-label-padding-top': 'token(sizes.16)',
    '--list-group-label-padding-bottom': 'token(sizes.6)',
    '--list-group-label-size': 'token(sizes.16)',
    '--list-group-divider-margin-y': 'token(sizes.8)',
    '--list-group-divider-margin-x': 'token(sizes.16)',
  },
} as const;

export const listDensityWrapperVars = {
  compact: {
    wrapper: listDensityVars.compact,
  },
  comfortable: {
    wrapper: listDensityVars.comfortable,
  },
  spacious: {
    wrapper: listDensityVars.spacious,
  },
} as const;
