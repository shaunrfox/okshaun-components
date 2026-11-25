// biome-ignore-all lint/a11y/useSemanticElements: the token is a span that groups its parts; a fieldset would add form semantics it does not have
import { cx } from '@styled-system/css';
import { filterToken } from '@styled-system/recipes';
import {
  type MouseEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon } from '~/components/Icon';
import { Tooltip } from '~/components/Tooltip';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/**
 * Where a filter token is in the edit cycle.
 *
 * - `applied`: the results include this filter.
 * - `editing`: a menu for this token is open.
 * - `pending`: added or changed, and waits for Apply.
 * - `removing`: removed, and waits for Apply. Shown struck through.
 * - `armed`: the next Backspace removes it.
 */
export type FilterTokenState =
  | 'applied'
  | 'editing'
  | 'pending'
  | 'removing'
  | 'armed';

/** Visual tone of a filter token. `exclude` marks a negated operator, such as "is not". */
export type FilterTokenTone = 'default' | 'exclude';

/**
 * Watches a value's text and reports whether its max width cuts it off.
 * The check runs again when `text` or `mode` changes, and on resize.
 */
const useClipped = (text: unknown, mode: unknown) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [clipped, setClipped] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: text and mode change the rendered width, so they re-run the check
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      setClipped(false);
      return;
    }
    const check = () => setClipped(node.scrollWidth > node.clientWidth);
    check();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(check);
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, mode]);
  return [ref, clipped] as const;
};

/** Number of list values shown before the rest collapse into `+N`. */
const MAX_VISIBLE_VALUES = 2;

/**
 * A second operator and value joined to the first, for a filter that mixes
 * exact picks with typed text: "Part is any of A, B or contains “water”".
 */
export type FilterTokenJoined = {
  /** Operator text, including the joining word, such as "or contains". */
  operator: string;
  /** Value text, such as "“water”". */
  value: string;
};

type FilterTokenOwnProps = {
  /** Name of the filtered field, such as "Stage". */
  field: string;
  /** Operator text, such as "is", "is any of" or "is between". */
  operator: string;
  /**
   * The filter value. A string shows as is, such as "Sep 1 – Sep 30". A list
   * shows its first two items, then `+N` for the rest, and a tooltip lists
   * every item. A value cut off by the width limit also shows the tooltip,
   * so the full text can be read on hover or focus. An empty
   * string or list shows "…" for a filter that has no value yet. Omit it for
   * an operator that takes no value, such as "is empty".
   */
  value?: string | string[];
  /**
   * A second operator and value after the first. The operator part opens the
   * operator menu (`onOperatorClick`), and the value part opens the value
   * menu (`onValueClick`), as the first ones do.
   */
  joined?: FilterTokenJoined;
  /** @default "applied" */
  state?: FilterTokenState;
  /** @default "default" */
  tone?: FilterTokenTone;
  /**
   * Renders the operator as text, not as a button. Use it when the field
   * supports only one operator.
   */
  operatorLocked?: boolean;
  /**
   * Content that replaces the value button while the token is edited in
   * place, usually a text input. Every value stays before it, with no `+N`
   * count, so the person sees the whole list they are editing.
   */
  editor?: ReactNode;
  /** Disables every part of the token, the `editor` included. */
  disabled?: boolean;
  /**
   * Keeps focus where it is when a part is clicked with a pointer. A filter
   * field sets this so focus stays in its input, as in a combobox.
   */
  retainFocus?: boolean;
  /**
   * Runs when the field part is clicked. Falls back to `onValueClick` when
   * absent, because the field and the value both open the value menu.
   */
  onFieldClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Runs when the operator part is clicked. Not called when `operatorLocked` is true. */
  onOperatorClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Runs when the value part is clicked. */
  onValueClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Runs when the remove button is clicked. The button is not shown when this
   * is absent or when `state` is `removing`.
   */
  onRemove?: () => void;
  /**
   * Accessible name for the remove button.
   * @default `labels.removeFilter` (English: `Remove filter: ${field} ${operator} ${values}`), with every value
   */
  removeLabel?: string;
};

/** Props for {@link FilterToken}. Includes `Box` style props for the root. */
export type FilterTokenProps = Omit<
  BoxProps,
  keyof FilterTokenOwnProps | 'children'
> &
  FilterTokenOwnProps;

/**
 * One filter in a filter field, read as a sentence: field, operator, value.
 *
 * Each part is its own click target, and the remove button ends the token.
 * A part with no click handler renders as text. Use `Chip` for a label with
 * one action. The root renders a `span` with `role="group"` and an
 * accessible name made from the sentence.
 *
 * In `removing` state, the parts stay clickable so the consumer can restore
 * the filter, and the remove button is hidden.
 *
 * @example
 * ```tsx
 * <FilterToken
 *   field="Stage"
 *   operator="is any of"
 *   value="Open, In progress"
 *   onValueClick={openValues}
 *   onRemove={() => remove('stage')}
 * />
 * ```
 */
export const FilterToken = (props: FilterTokenProps) => {
  const {
    field,
    operator,
    value,
    joined,
    state = 'applied',
    tone = 'default',
    operatorLocked,
    editor,
    disabled,
    retainFocus,
    onFieldClick,
    onOperatorClick,
    onValueClick,
    onRemove,
    removeLabel,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = filterToken();
  const { labels } = useLocale();

  const values = Array.isArray(value) ? value : undefined;
  const fullValue = Array.isArray(value) ? value.join(', ') : value;
  // While edited in place, every value shows, so nothing hides behind +N.
  const maxVisible = editor !== undefined ? Infinity : MAX_VISIBLE_VALUES;
  const hidden = values ? Math.max(0, values.length - maxVisible) : 0;
  const shownValue = values ? values.slice(0, maxVisible).join(', ') : value;
  const sentence = [field, operator, fullValue, joined?.operator, joined?.value]
    .filter(Boolean)
    .join(' ');
  const keepFocus = retainFocus
    ? (e: MouseEvent) => e.preventDefault()
    : undefined;

  // A value cut off by its max width gets the tooltip too, not only `+N`.
  const [valueTextRef, clipped] = useClipped(shownValue, editor);
  const [joinedTextRef, joinedClipped] = useClipped(joined?.value, editor);

  const part = (
    slot: string,
    content: ReactNode,
    onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined,
    extra?: Record<string, unknown>,
  ) =>
    onClick ? (
      <Box
        as="button"
        type="button"
        className={cx(classes.part, slot)}
        disabled={disabled}
        onMouseDown={keepFocus}
        onClick={onClick}
        {...extra}
      >
        {content}
      </Box>
    ) : (
      <Box as="span" className={cx(classes.part, slot)} {...extra}>
        {content}
      </Box>
    );

  // With a +N count, screen readers get the full list instead of the short one.
  const valueContent = (
    <>
      <Box
        as="span"
        ref={valueTextRef}
        className={classes.valueText}
        aria-hidden={hidden > 0 || undefined}
      >
        {shownValue || '…'}
      </Box>
      {hidden > 0 && (
        <>
          <Box as="span" className={classes.count} aria-hidden>
            {`+${hidden}`}
          </Box>
          <Box as="span" srOnly>
            {fullValue}
          </Box>
        </>
      )}
    </>
  );

  const joinedOperator =
    joined &&
    part(
      classes.operator,
      joined.operator,
      operatorLocked ? undefined : onOperatorClick,
      operatorLocked ? { 'data-locked': true } : undefined,
    );

  // The joined value truncates like the first value.
  const joinedContent = joined && (
    <Box as="span" ref={joinedTextRef} className={classes.valueText}>
      {joined.value}
    </Box>
  );

  return (
    <Box
      {...dsComponent('FilterToken')}
      as="span"
      role="group"
      aria-label={sentence}
      className={cx(classes.root, className)}
      data-state={state}
      data-tone={tone}
      data-disabled={disabled || undefined}
      {...otherProps}
    >
      {part(classes.field, field, onFieldClick ?? onValueClick)}
      {part(
        classes.operator,
        operator,
        operatorLocked ? undefined : onOperatorClick,
        operatorLocked ? { 'data-locked': true } : undefined,
      )}
      {editor !== undefined ? (
        // `inert` keeps a disabled token's editor out of the tab order.
        <Box
          as="span"
          className={cx(classes.part, classes.editor)}
          inert={disabled || undefined}
        >
          {shownValue && (
            <Box as="span" className={classes.value}>
              {valueContent}
            </Box>
          )}
          {/* While the editor is open, the joined parts are text, like the
              first value. They are part of the value being edited. */}
          {joined && (
            <>
              {part(classes.operator, joined.operator, undefined)}
              <Box as="span" className={classes.value}>
                {joinedContent}
              </Box>
            </>
          )}
          {editor}
        </Box>
      ) : (
        <>
          {value !== undefined && (
            <Tooltip text={fullValue ?? ''} disabled={hidden === 0 && !clipped}>
              {part(classes.value, valueContent, onValueClick)}
            </Tooltip>
          )}
          {joined && (
            <>
              {joinedOperator}
              <Tooltip text={joined.value} disabled={!joinedClipped}>
                {part(classes.value, joinedContent, onValueClick)}
              </Tooltip>
            </>
          )}
        </>
      )}
      {onRemove && state !== 'removing' && (
        <Box
          as="button"
          type="button"
          className={classes.remove}
          aria-label={removeLabel ?? labels.removeFilter(sentence)}
          disabled={disabled}
          onMouseDown={keepFocus}
          onClick={onRemove}
        >
          <Icon name="x" size="16" aria-hidden />
        </Box>
      )}
    </Box>
  );
};
