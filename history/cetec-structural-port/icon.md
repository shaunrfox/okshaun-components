# Icon and Sprite Assets

## Current state and Cetec delta

Okshaun Icon accepts generated icon names, size, fill, and Box props. Cetec
derives responsive size/fill from SlotContext and adds `barcode-off` and
`spinner` assets, but lacks okshaun's eight chevron assets.

## Target API and assets

Allow `size` to use the generated responsive Icon recipe type rather than only
a flat literal union. Resolve size and fill from explicit props then
SlotContext.

Add `barcode-off.svg`, `spinner.svg`, metadata, generated name types, sprite
symbols, and Storybook entries. Preserve every existing icon and alias,
especially all chevrons.

## Implementation

Move dimensions into the Icon recipe where needed for conditional values.
Avoid setting a raw `width` attribute that conflicts with responsive classes.
Keep `aria-hidden` behavior for decorative icons and require an accessible name
or surrounding label for meaningful icons.

Regenerate assets through the existing sprite generator rather than manually
editing generated output.

## Recipe changes

Add responsive size variants and slot-derived fill while retaining okshaun icon
tokens. SlotContext may provide fill for selected/inverse composition, but
explicit Icon fill wins.

## Stories and documentation

Add responsive size, inherited slot size/fill, new assets, decorative versus
meaningful icon guidance, and a regression gallery containing the existing
chevrons.

## Verification

Run sprite generation and build. Compare icon-name TypeScript types, metadata,
public sprite symbols, and rendered sizes. Confirm no icon is removed.

## Dependencies and exclusions

Depends on SlotContext, responsive recipes, and packaging. Do not replace
okshaun icon metadata or styling with Cetec's complete generated files.

