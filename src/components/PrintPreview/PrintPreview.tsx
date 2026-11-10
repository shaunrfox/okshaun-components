import { cx } from '@styled-system/css';
import { printPreview } from '@styled-system/recipes';
import {
  type ReactNode,
  type Ref,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import {
  PrintPreviewContext,
  type PrintPreviewContextValue,
} from './PrintPreviewContext';
import { computeScale, type PrintPreviewFit } from './pageGeometry';

type PrintPreviewOwnProps = {
  /**
   * How pages scale to the preview area. `page` fits the whole largest page.
   * `width` fits its width and scrolls vertically. A number is a fixed zoom,
   * where `1` lays the page out at 96 CSS pixels per inch.
   */
  /** @default "page" */
  fit?: PrintPreviewFit;
  /** One or more `PrintPage` elements. */
  children?: ReactNode;
  /** Ref to the scrolling root element. */
  ref?: Ref<HTMLDivElement>;
};

/** Props accepted by {@link PrintPreview}. Includes `Box` and native `div` props. */
export type PrintPreviewProps = Omit<BoxProps, keyof PrintPreviewOwnProps> &
  PrintPreviewOwnProps;

type Size = { width: number; height: number };

/**
 * Shows printed pages at their true proportions, scaled to fit the area.
 *
 * Wrap one or more `PrintPage` elements. The preview measures itself and
 * applies one scale to every page, chosen by `fit`. Pages stack vertically
 * and the preview scrolls when they do not fit.
 *
 * The preview does not know what is on the page. Page size comes from each
 * `PrintPage`'s `size` prop, so it works for server-rendered HTML in an iframe,
 * an editable canvas, or a rendered PDF page.
 *
 * Renders a focusable `div` so keyboard users can scroll it. Give it an
 * `aria-label` that names what is previewed.
 *
 * @example
 * ```tsx
 * <PrintPreview aria-label="Document preview">
 *   <PrintPage size={pageSizes.letter} margins={0.5} showMargins>
 *     <iframe title="Document" srcDoc={html} />
 *   </PrintPage>
 * </PrintPreview>
 * ```
 */
export const PrintPreview = (props: PrintPreviewProps) => {
  const { fit = 'page', children, ref, ...rest } = props;
  const [className, otherProps] = splitProps(rest);

  const classes = useMemo(() => printPreview(), []);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [available, setAvailable] = useState<Size | null>(null);
  const [pages, setPages] = useState<Map<string, Size>>(() => new Map());

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const measure = () => {
      const style = getComputedStyle(node);
      const width =
        node.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      const height =
        node.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom);
      setAvailable((current) =>
        current?.width === width && current.height === height
          ? current
          : { width, height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const registerPage = useCallback((id: string, size: Size) => {
    setPages((current) => {
      const existing = current.get(id);
      if (existing?.width === size.width && existing.height === size.height) {
        return current;
      }
      const next = new Map(current);
      next.set(id, size);
      return next;
    });
  }, []);

  const unregisterPage = useCallback((id: string) => {
    setPages((current) => {
      if (!current.has(id)) return current;
      const next = new Map(current);
      next.delete(id);
      return next;
    });
  }, []);

  const largestPage = useMemo<Size | null>(() => {
    if (pages.size === 0) return null;
    let width = 0;
    let height = 0;
    pages.forEach((size) => {
      width = Math.max(width, size.width);
      height = Math.max(height, size.height);
    });
    return { width, height };
  }, [pages]);

  const scale = computeScale(fit, available, largestPage);

  const contextValue = useMemo<PrintPreviewContextValue>(
    () => ({ scale, registerPage, unregisterPage, classes }),
    [scale, registerPage, unregisterPage, classes],
  );

  return (
    <PrintPreviewContext.Provider value={contextValue}>
      <Box
        {...dsComponent('PrintPreview')}
        ref={setRootRef}
        tabIndex={0}
        className={cx(classes.root, className)}
        {...otherProps}
      >
        <Box className={classes.stack}>{children}</Box>
      </Box>
    </PrintPreviewContext.Provider>
  );
};
