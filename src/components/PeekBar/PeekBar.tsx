import { useMergeRefs } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { peekBar } from '@styled-system/recipes';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Button } from '~/components/Button';
import { DrawerContext } from '~/components/Drawer/DrawerContext';
import { Icon } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props for {@link PeekBar}. */
export type PeekBarProps = Omit<BoxProps, 'children'> & {
  /** What the list holds, singular, such as "Case" or "Order". Used in the position text and button names. */
  noun: string;
  /** Position of the open record in the list, starting at 1. */
  index: number;
  /** Number of records in the list. */
  total: number;
  /** Opens the previous record. The button is disabled on the first record or when this is not set. */
  onPrevious?: () => void;
  /** Opens the next record. The button is disabled on the last record or when this is not set. */
  onNext?: () => void;
  /** Link to the record's full page. Shows the "Open" button. */
  openHref?: string;
  /** Opens the record's full page. Shows the "Open" button. Ignored when `openHref` is set. */
  onOpen?: () => void;
  /**
   * Closes the peek. Inside a `Drawer`, it defaults to the drawer's close.
   * The close button is hidden when there is no close action.
   */
  onClose?: () => void;
  /**
   * Turns on the keyboard shortcuts: "," opens the previous record and "."
   * opens the next. They work while focus is in the bar, or anywhere in its
   * `Drawer`, except while a text field has focus or a modifier key is held.
   *
   * @default true
   */
  shortcuts?: boolean;
};

/** Key that opens the previous record. */
const PREVIOUS_KEY = ',';
/** Key that opens the next record. */
const NEXT_KEY = '.';

const isTextEntry = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    Boolean(target.closest('input, textarea, select')));

/**
 * Drawer chrome for a record opened from a list: position, previous and next,
 * open full page, and close.
 *
 * Place it at the top of a `Drawer`, above the record's page header. The
 * position text ("Case 3 of 40") is announced when it changes. "," and "."
 * open the previous and next records while focus is in the bar or its drawer.
 * All text comes
 * from `LocaleProvider` (`peekPosition`, `previousItem`, `nextItem`,
 * `openFullPage`, and `closeDrawer`).
 *
 * @example
 * ```tsx
 * <PeekBar noun="Case" index={3} total={40} onPrevious={prev} onNext={next} openHref="/case/3" />
 * ```
 */
export const PeekBar = (props: PeekBarProps) => {
  const {
    noun,
    index,
    total,
    onPrevious,
    onNext,
    openHref,
    onOpen,
    onClose: onCloseProp,
    shortcuts = true,
    ref,
    ...rest
  } = props;
  const rootRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergeRefs([rootRef, ref]);
  const { labels } = useLocale();
  const drawer = useContext(DrawerContext);
  const onClose = onCloseProp ?? drawer?.onClose;
  const classes = peekBar();
  const [className, otherProps] = splitProps(rest);
  const showOpen = Boolean(openHref || onOpen);
  const canPrevious = Boolean(onPrevious) && index > 1;
  const canNext = Boolean(onNext) && index < total;
  const drawerPanelRef = drawer?.panelRef;

  // The bar's buttons show a tooltip on keyboard focus, which would take the
  // first Escape. Registering makes a modal drawer focus its panel on open.
  const registerHeaderCloseButton = drawer?.registerHeaderCloseButton;
  useLayoutEffect(
    () => registerHeaderCloseButton?.(),
    [registerHeaderCloseButton],
  );

  // Single-key shortcuts are active only while focus is in the bar or its
  // drawer, so a user can always step away from them (WCAG 2.1.4).
  useEffect(() => {
    if (!shortcuts) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const scope = drawerPanelRef?.current ?? rootRef.current;
      if (
        !(event.target instanceof Node) ||
        !scope?.contains(event.target) ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.defaultPrevented ||
        isTextEntry(event.target)
      ) {
        return;
      }
      if (event.key === PREVIOUS_KEY && canPrevious) {
        event.preventDefault();
        onPrevious?.();
      } else if (event.key === NEXT_KEY && canNext) {
        event.preventDefault();
        onNext?.();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcuts, drawerPanelRef, canPrevious, canNext, onPrevious, onNext]);

  return (
    <Box
      {...dsComponent('PeekBar')}
      ref={mergedRef}
      className={cx(classes.root, className)}
      {...otherProps}
    >
      <Box as="span" className={classes.position} aria-live="polite">
        {labels.peekPosition({ noun, index, total })}
      </Box>
      <Box className={classes.controls}>
        <IconButton
          variant="ghost"
          size="sm"
          iconName="arrow-left"
          altText={labels.previousItem(noun)}
          disabled={!canPrevious}
          onClick={onPrevious}
          aria-keyshortcuts={shortcuts ? PREVIOUS_KEY : undefined}
        />
        <IconButton
          variant="ghost"
          size="sm"
          iconName="arrow-right"
          altText={labels.nextItem(noun)}
          disabled={!canNext}
          onClick={onNext}
          aria-keyshortcuts={shortcuts ? NEXT_KEY : undefined}
        />
        {showOpen && (
          <Button
            size="sm"
            after={<Icon name="arrow-square-out" aria-hidden />}
            {...(openHref ? { href: openHref } : { onClick: onOpen })}
          >
            {labels.openFullPage}
          </Button>
        )}
        {onClose && (
          <IconButton
            variant="ghost"
            size="sm"
            iconName="x"
            altText={labels.closeDrawer}
            onClick={onClose}
          />
        )}
      </Box>
    </Box>
  );
};
