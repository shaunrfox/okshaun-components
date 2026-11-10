/** Unit used by a {@link PageSize} and its margins. */
export type PageUnit = 'in' | 'mm' | 'pt';

/**
 * Physical size of a printed page.
 *
 * Pass one of the {@link pageSizes} presets or any object of this shape, such
 * as a size read from a template's `@page` rule.
 *
 * @example
 * ```ts
 * const shippingLabel: PageSize = { width: 4, height: 6, unit: 'in' };
 * ```
 */
export type PageSize = {
  /** Page width in `unit`. */
  width: number;
  /** Page height in `unit`. */
  height: number;
  /** Unit for `width`, `height`, and the page margins. */
  unit: PageUnit;
};

/**
 * Page margins in the page's `unit`. A number applies the same margin to all
 * four sides.
 */
export type PageMargins =
  | number
  | {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };

/**
 * Page orientation. `portrait` makes the page taller than it is wide and
 * `landscape` makes it wider than it is tall, whichever way the size is given.
 */
export type PageOrientation = 'portrait' | 'landscape';

/**
 * Common page and label stock sizes.
 *
 * Presets are plain {@link PageSize} values. Use an object literal for any size
 * not listed here.
 *
 * @example
 * ```tsx
 * <PrintPage size={pageSizes.a4} />
 * ```
 */
export const pageSizes = {
  letter: { width: 8.5, height: 11, unit: 'in' },
  legal: { width: 8.5, height: 14, unit: 'in' },
  tabloid: { width: 11, height: 17, unit: 'in' },
  halfLetter: { width: 5.5, height: 8.5, unit: 'in' },
  a3: { width: 297, height: 420, unit: 'mm' },
  a4: { width: 210, height: 297, unit: 'mm' },
  a5: { width: 148, height: 210, unit: 'mm' },
  a6: { width: 105, height: 148, unit: 'mm' },
  postcard: { width: 4, height: 6, unit: 'in' },
  card5x7: { width: 5, height: 7, unit: 'in' },
  label4x6: { width: 4, height: 6, unit: 'in' },
  label4x3: { width: 4, height: 3, unit: 'in' },
  label4x2: { width: 4, height: 2, unit: 'in' },
  label3x2: { width: 3, height: 2, unit: 'in' },
  label2x1: { width: 2, height: 1, unit: 'in' },
} as const satisfies Record<string, PageSize>;
