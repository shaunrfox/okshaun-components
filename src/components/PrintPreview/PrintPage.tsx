import { cx } from '@styled-system/css';
import { printPreview } from '@styled-system/recipes';
import {
  type CSSProperties,
  type ReactNode,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
} from 'react';

import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import {
  PrintPageContext,
  type PrintPageContextValue,
  PrintPreviewContext,
} from './PrintPreviewContext';
import { resolvePageBox } from './pageGeometry';

import type { PageMargins, PageOrientation, PageSize } from './pageSizes';

type PrintPageOwnProps = {
  /** Physical page size. Use a `pageSizes` preset or any `PageSize` object. */
  size: PageSize;
  /**
   * Forces the page to be taller (`portrait`) or wider (`landscape`) than it
   * is wide. Leave unset to use `size` as given.
   */
  orientation?: PageOrientation;
  /**
   * Page margins in the unit of `size`. Margins do not pad the content. They
   * set the guide drawn by `showMargins` and the values from `usePrintPage`.
   */
  /** @default 0 */
  margins?: PageMargins;
  /** Stripes the margin area and draws a dashed line at the content edge. */
  /** @default false */
  showMargins?: boolean;
  /**
   * Layer drawn above the content in page space, such as error markers or a
   * selection outline. The layer ignores the pointer. Set `pointerEvents` on
   * its children to make them interactive.
   */
  overlay?: ReactNode;
  /**
   * Page content. It fills the whole sheet at 96 CSS pixels per inch, so an
   * iframe with full width and height lays out as it prints.
   */
  children?: ReactNode;
};

/** Props accepted by {@link PrintPage}. Includes `Box` and native `div` props. */
export type PrintPageProps = Omit<BoxProps, keyof PrintPageOwnProps> &
  PrintPageOwnProps;

/**
 * One printed page at its true proportions.
 *
 * Place inside a `PrintPreview`, which sets the scale. Outside a preview the
 * page renders at scale 1.
 *
 * The sheet is white with dark text in both themes, because paper is white.
 * Design-system components placed directly on the sheet still follow the app
 * theme. Content in an iframe is not affected.
 *
 * Content inside can call `usePrintPage` for the scale and the page geometry.
 *
 * @example
 * ```tsx
 * <PrintPage size={pageSizes.label4x6} orientation="landscape">
 *   <ShippingLabel />
 * </PrintPage>
 * ```
 */
export const PrintPage = (props: PrintPageProps) => {
  const {
    size,
    orientation,
    margins,
    showMargins = false,
    overlay,
    children,
    style,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const preview = useContext(PrintPreviewContext);
  const previewClasses = preview?.classes;
  const classes = useMemo(
    () => previewClasses ?? printPreview(),
    [previewClasses],
  );
  const id = useId();

  // Depend on primitive values, so inline size and margin objects are stable.
  const { width, height, unit } = size;
  const sides =
    typeof margins === 'object'
      ? margins
      : {
          top: margins ?? 0,
          right: margins ?? 0,
          bottom: margins ?? 0,
          left: margins ?? 0,
        };
  const { top, right, bottom, left } = sides;
  const pageBox = useMemo(
    () =>
      resolvePageBox({ width, height, unit }, orientation, {
        top,
        right,
        bottom,
        left,
      }),
    [width, height, unit, orientation, top, right, bottom, left],
  );

  const registerPage = preview?.registerPage;
  const unregisterPage = preview?.unregisterPage;
  useLayoutEffect(() => {
    if (!registerPage || !unregisterPage) return;
    registerPage(id, { width: pageBox.width, height: pageBox.height });
    return () => unregisterPage(id);
  }, [id, pageBox.width, pageBox.height, registerPage, unregisterPage]);

  const measuring = preview !== null && preview.scale === null;
  const scale = preview ? (preview.scale ?? 1) : 1;

  const pageContext = useMemo<PrintPageContextValue>(
    () => ({ ...pageBox, scale }),
    [pageBox, scale],
  );

  const pageStyle = {
    '--print-scale': scale,
    '--print-page-w': `${String(pageBox.width)}px`,
    '--print-page-h': `${String(pageBox.height)}px`,
    '--print-margin-top': `${String(pageBox.margins.top)}px`,
    '--print-margin-right': `${String(pageBox.margins.right)}px`,
    '--print-margin-bottom': `${String(pageBox.margins.bottom)}px`,
    '--print-margin-left': `${String(pageBox.margins.left)}px`,
    ...style,
  } as CSSProperties;

  return (
    <PrintPageContext.Provider value={pageContext}>
      <Box
        {...dsComponent('PrintPage')}
        className={cx(classes.page, className)}
        data-measuring={measuring || undefined}
        style={pageStyle}
        {...otherProps}
      >
        <Box className={classes.sheet}>
          {children}
          {overlay !== undefined && (
            <Box className={classes.overlay}>{overlay}</Box>
          )}
        </Box>
        {showMargins && (
          <>
            <Box className={classes.marginArea} aria-hidden />
            <Box className={classes.margins} aria-hidden />
          </>
        )}
      </Box>
    </PrintPageContext.Provider>
  );
};
