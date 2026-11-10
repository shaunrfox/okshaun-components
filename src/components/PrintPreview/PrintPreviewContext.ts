import type { printPreview } from '@styled-system/recipes';
import { createContext } from 'react';

import type { PageBox } from './pageGeometry';

/** Shared state from {@link PrintPreview} to its pages. */
export interface PrintPreviewContextValue {
  /** Current scale, or `null` while the preview is still measuring. */
  scale: number | null;
  /** Reports a page's size so the preview can fit the largest page. */
  registerPage: (id: string, size: { width: number; height: number }) => void;
  /** Removes a page that unmounted. */
  unregisterPage: (id: string) => void;
  /** Slot classes computed once by the preview. */
  classes: ReturnType<typeof printPreview>;
}

export const PrintPreviewContext =
  createContext<PrintPreviewContextValue | null>(null);

/** Geometry of one page, shared with its content. */
export interface PrintPageContextValue extends PageBox {
  /** Current scale from the parent preview. `1` outside a preview. */
  scale: number;
}

export const PrintPageContext = createContext<PrintPageContextValue | null>(
  null,
);
