import { useContext } from 'react';

import { PrintPageContext } from './PrintPreviewContext';

/**
 * Returns the geometry of the closest parent {@link PrintPage}.
 *
 * All lengths are CSS pixels at scale 1, which is page space: 96 per inch.
 * Divide a screen distance by `scale` to get a page distance, for example to
 * map a pointer position to a block on the page.
 *
 * Call only inside a `PrintPage`; it throws when no page is present.
 *
 * @example
 * ```tsx
 * const { scale, margins } = usePrintPage();
 * const pageX = (event.clientX - rect.left) / scale;
 * ```
 */
export const usePrintPage = () => {
  const context = useContext(PrintPageContext);
  if (!context) {
    throw new Error('usePrintPage must be used within a <PrintPage>');
  }
  return context;
};
