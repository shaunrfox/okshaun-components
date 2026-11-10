import type {
  PageMargins,
  PageOrientation,
  PageSize,
  PageUnit,
} from './pageSizes';

// CSS defines 1in as 96px, so a page at scale 1 lays out exactly as print does.
const CSS_PIXELS_PER_UNIT: Record<PageUnit, number> = {
  in: 96,
  mm: 96 / 25.4,
  pt: 96 / 72,
};

/** Page margins in CSS pixels. */
export type PageMarginBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/** A page resolved to CSS pixels at scale 1. */
export type PageBox = {
  width: number;
  height: number;
  margins: PageMarginBox;
};

const toCssPixels = (value: number, unit: PageUnit) =>
  value * CSS_PIXELS_PER_UNIT[unit];

/** Resolves a page size, orientation, and margins to CSS pixels. */
export const resolvePageBox = (
  size: PageSize,
  orientation?: PageOrientation,
  margins: PageMargins = 0,
): PageBox => {
  let width = toCssPixels(size.width, size.unit);
  let height = toCssPixels(size.height, size.unit);

  const isLandscape = width > height;
  if (
    (orientation === 'landscape' && !isLandscape) ||
    (orientation === 'portrait' && isLandscape)
  ) {
    [width, height] = [height, width];
  }

  const sides =
    typeof margins === 'number'
      ? { top: margins, right: margins, bottom: margins, left: margins }
      : margins;

  return {
    width,
    height,
    margins: {
      top: toCssPixels(sides.top, size.unit),
      right: toCssPixels(sides.right, size.unit),
      bottom: toCssPixels(sides.bottom, size.unit),
      left: toCssPixels(sides.left, size.unit),
    },
  };
};

/** Fit mode for {@link PrintPreview}. */
export type PrintPreviewFit = 'page' | 'width' | number;

/**
 * Returns the scale that fits the largest page into the available area, or
 * `null` while the area or the pages are not measured yet.
 */
export const computeScale = (
  fit: PrintPreviewFit,
  available: { width: number; height: number } | null,
  largestPage: { width: number; height: number } | null,
): number | null => {
  if (typeof fit === 'number') return fit;
  if (!available || !largestPage) return null;
  if (available.width <= 0 || largestPage.width <= 0) return null;

  const widthScale = available.width / largestPage.width;
  if (fit === 'width') return widthScale;

  const heightScale = available.height / largestPage.height;
  return Math.min(widthScale, heightScale);
};
