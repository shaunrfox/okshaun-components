/**
 * Baseline every recipe applies to its root-ish slots, ported from the Cetec
 * design system so recipe output matches it structurally.
 *
 * Two deliberate differences, both about okshaun's own type identity:
 *
 * - Cetec sets `fontFamily: 'body'` because Recursive is its UI face. okshaun's
 *   `body` token is Piazzolla, a serif, and its UI face is `sans`. Copying the
 *   token name rather than the meaning would render every component in a serif.
 * - Cetec also sets `fontVariationSettings` from its `fontVariants` map, whose
 *   axes (MONO, CRSV, CASL, slnt) belong to Recursive. IBM Plex Sans and
 *   Piazzolla do not expose them, so there is nothing to set here.
 */
export const globalBaseStyles = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  fontFamily: 'sans',
  fontWeight: 'normal',
  lineHeight: 'default',
  color: 'text.subtlest',
};
