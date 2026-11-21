import { useMergeRefs } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { filterField } from '@styled-system/recipes';
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Button } from '~/components/Button';
import { FilterToken, type FilterTokenProps } from '~/components/FilterToken';
import { Icon } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { Kbd } from '~/components/Kbd';
import { useLocale } from '~/system/context/useLocale';
import { useOverflowItems } from '~/system/hooks/useOverflowItems';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/**
 * One token in a {@link FilterField}. The field sets `editor`,
 * `retainFocus` and `disabled`, so values passed for them are replaced.
 */
export type FilterFieldToken = FilterTokenProps & {
  /** Stable key, unique in the field. */
  key: string;
};

type FilterFieldOwnProps = {
  /** Filters shown as tokens, in order. */
  tokens: FilterFieldToken[];
  /** Text in the input. */
  inputValue: string;
  /** Runs when the person types in the input. */
  onInputChange: (value: string) => void;
  /**
   * Attributes for the input, such as `inputProps` from `useFilterMenu`. Its
   * `onKeyDown` runs before the field's own Backspace handling. Call
   * `preventDefault` to skip that handling.
   */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'disabled' | 'placeholder'
  > & { [key: `data-${string}`]: string | boolean | undefined };
  /** Ref to the input. The input moves into a token while it is edited. */
  inputRef?: Ref<HTMLInputElement>;
  /** Placeholder text of the input. */
  placeholder?: string;
  /**
   * Key of the token whose value is edited. The input moves into that token,
   * and the token stays visible when the field overflows.
   */
  editingKey?: string | null;
  /**
   * Runs when the "+N more" button is clicked. Gets the keys of the tokens
   * that do not fit, and the button, to anchor a menu.
   */
  onMoreClick?: (hiddenKeys: string[], anchor: HTMLElement) => void;
  /** Marks the "+N more" button as open while its menu shows. */
  moreOpen?: boolean;
  /**
   * Runs when the clear button is clicked. The button shows only when this
   * is set and the field has a token or text.
   */
  onClearAll?: () => void;
  /**
   * Accessible name of the clear button.
   * @default `labels.clearFilters` (English: "Clear all filters")
   */
  clearLabel?: string;
  /**
   * A key that focuses the input from anywhere on the page, such as "/".
   * It is ignored while another text field has focus. A hint shows whenever
   * the field does not have focus.
   */
  shortcut?: string;
  /** Disables the input, the tokens and the buttons. */
  disabled?: boolean;
};

/** Props for {@link FilterField}. Includes `Box` style props for the frame. */
export type FilterFieldProps = Omit<
  BoxProps,
  keyof FilterFieldOwnProps | 'children'
> &
  FilterFieldOwnProps;

const MORE_BUTTON_RESERVE = 96;

const isTextEntry = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  Boolean(
    target.closest(
      'input, textarea, select, [contenteditable=""], [contenteditable="true"]',
    ),
  );

/**
 * The filter bar's field: the applied filters as tokens, followed by one
 * text input.
 *
 * The field owns layout and a few keys. The app owns the filters and the
 * menus. Tokens that do not fit go behind a "+N more" button. Backspace in
 * an empty input arms the last token, and a second Backspace removes it.
 * The input moves into the token named by `editingKey`, and focus moves
 * with it.
 *
 * Pair it with `FilterMenu` and `useFilterMenu` for the menus.
 *
 * @example
 * ```tsx
 * <FilterField
 *   tokens={filters.map((f) => ({ key: f.id, ...toTokenProps(f) }))}
 *   inputValue={text}
 *   onInputChange={setText}
 *   inputProps={menu.inputProps}
 *   inputRef={setInput}
 *   placeholder="Filter or search…"
 *   onClearAll={clearAll}
 *   shortcut="/"
 * />
 * ```
 */
export const FilterField = (props: FilterFieldProps) => {
  const {
    tokens,
    inputValue,
    onInputChange,
    inputProps,
    inputRef,
    placeholder,
    editingKey = null,
    onMoreClick,
    moreOpen,
    onClearAll,
    clearLabel,
    shortcut,
    disabled,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = filterField();
  const { labels } = useLocale();

  const [armedKey, setArmedKey] = useState<string | null>(null);
  const [hasFocus, setHasFocus] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const tokenElements = useRef(new Map<string, HTMLElement>());

  // The input remounts when it moves into a token or back. React detaches
  // the old node's ref before it leaves the DOM, so focus can be noted there
  // and given to the new node.
  const refocus = useRef(false);
  const trackInput = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      inputElement.current = node;
      if (refocus.current) {
        refocus.current = false;
        node.focus();
      }
      return;
    }
    if (
      inputElement.current &&
      inputElement.current === inputElement.current.ownerDocument.activeElement
    ) {
      refocus.current = true;
    }
  }, []);
  const mergedInputRef = useMergeRefs([trackInput, inputRef]);

  const focusInput = useCallback(() => inputElement.current?.focus(), []);

  // A token that is no longer last, or no longer removable, cannot stay armed.
  const removable = tokens.filter(
    (token) => token.onRemove && token.state !== 'removing',
  );
  const lastRemovable = removable[removable.length - 1];
  const armed =
    armedKey !== null && lastRemovable?.key === armedKey ? armedKey : null;

  const keys = tokens.map((token) => token.key);
  const getItemElement = useCallback(
    (key: string) => tokenElements.current.get(key) ?? null,
    [],
  );
  const { visible, overflow } = useOverflowItems({
    items: keys,
    containerRef: sizerRef,
    getItemElement,
    activeItem: editingKey ?? armed,
    reserve: MORE_BUTTON_RESERVE,
    reserveRef: moreRef,
  });
  const hiddenKeys = overflow.filter((key) => keys.includes(key));
  const hiddenTokens = tokens.filter((token) => hiddenKeys.includes(token.key));
  const visibleKeys = new Set(visible);

  // The page-wide shortcut focuses the input, unless someone is typing.
  useEffect(() => {
    if (!shortcut || disabled) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (
        event.key !== shortcut ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.defaultPrevented ||
        isTextEntry(event.target)
      ) {
        return;
      }
      event.preventDefault();
      focusInput();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut, disabled, focusInput]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key !== 'Backspace') {
      setArmedKey(null);
      return;
    }
    if (inputValue !== '' || editingKey !== null || !lastRemovable) return;
    event.preventDefault();
    if (armed === lastRemovable.key) {
      setArmedKey(null);
      lastRemovable.onRemove?.();
    } else {
      setArmedKey(lastRemovable.key);
    }
  };

  // A click on a token part moves focus to the input, so the menu the app
  // opens can take keys at once.
  const withFocus = <Args extends unknown[]>(
    handler: ((...args: Args) => void) | undefined,
  ) =>
    handler &&
    ((...args: Args) => {
      focusInput();
      handler(...args);
    });

  const input = (inline: boolean) => (
    <input
      type="text"
      autoComplete="off"
      spellCheck={false}
      aria-label={labels.filterOrSearch}
      aria-keyshortcuts={shortcut}
      {...inputProps}
      ref={mergedInputRef}
      className={cx(classes.input, inputProps?.className)}
      data-inline={inline || undefined}
      size={inline ? Math.max(inputValue.length, 1) : undefined}
      value={inputValue}
      placeholder={inline ? undefined : placeholder}
      disabled={disabled}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setArmedKey(null);
        onInputChange(event.target.value);
      }}
      onKeyDown={onKeyDown}
    />
  );

  const editingVisible = editingKey !== null && visibleKeys.has(editingKey);
  const showClear =
    Boolean(onClearAll) &&
    !disabled &&
    (tokens.length > 0 || inputValue !== '');

  return (
    <Box
      {...dsComponent('FilterField')}
      ref={rootRef}
      className={cx(classes.root, className)}
      data-disabled={disabled || undefined}
      data-has-clear={showClear || undefined}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (rootRef.current?.contains(event.relatedTarget as Node | null)) {
          return;
        }
        setHasFocus(false);
        setArmedKey(null);
      }}
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
        // A click on empty space puts the cursor in the input.
        if (disabled || event.target !== event.currentTarget) return;
        event.preventDefault();
        focusInput();
      }}
      {...otherProps}
    >
      <Icon
        name="search"
        size="20"
        fill={disabled ? 'icon.disabled' : 'icon.subtle'}
        className={classes.icon}
        aria-hidden
      />
      <Box
        className={classes.values}
        onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
          if (disabled || event.target !== event.currentTarget) return;
          event.preventDefault();
          focusInput();
        }}
      >
        <Box ref={sizerRef} className={classes.sizer} aria-hidden />
        {tokens.map(({ key, ...token }) => {
          const overflowed = !visibleKeys.has(key);
          const editing = key === editingKey && !overflowed;
          return (
            <Box
              as="span"
              key={key}
              ref={(node: HTMLElement | null) => {
                if (node) tokenElements.current.set(key, node);
                else tokenElements.current.delete(key);
              }}
              className={classes.token}
              data-overflowed={overflowed || undefined}
              inert={overflowed || undefined}
            >
              <FilterToken
                {...token}
                state={key === armed ? 'armed' : token.state}
                disabled={disabled}
                retainFocus
                editor={editing ? input(true) : undefined}
                onFieldClick={withFocus(token.onFieldClick)}
                onOperatorClick={withFocus(token.onOperatorClick)}
                onValueClick={withFocus(token.onValueClick)}
                onRemove={withFocus(token.onRemove)}
              />
            </Box>
          );
        })}
        {hiddenTokens.length > 0 && (
          <Button
            ref={moreRef}
            size="sm"
            variant="hollow"
            iconAfter="caret-down"
            className={classes.more}
            disabled={disabled}
            aria-expanded={onMoreClick ? Boolean(moreOpen) : undefined}
            data-open={moreOpen || undefined}
            data-pending={
              hiddenTokens.some(
                (token) =>
                  token.state === 'pending' || token.state === 'removing',
              ) || undefined
            }
            onMouseDown={(event: MouseEvent) => event.preventDefault()}
            onClick={(event: MouseEvent<HTMLElement>) => {
              focusInput();
              onMoreClick?.(hiddenKeys, event.currentTarget);
            }}
          >
            {labels.moreFilters(hiddenTokens.length)}
          </Button>
        )}
        {!editingVisible && input(false)}
      </Box>
      {shortcut && !hasFocus && !disabled && (
        <Kbd keys={[shortcut]} className={classes.shortcut} />
      )}
      {showClear && (
        <IconButton
          variant="ghost"
          size="sm"
          iconName="x"
          altText={clearLabel ?? labels.clearFilters}
          className={classes.clear}
          onMouseDown={(event: MouseEvent<HTMLElement>) =>
            event.preventDefault()
          }
          onClick={() => {
            setArmedKey(null);
            focusInput();
            onClearAll?.();
          }}
        />
      )}
    </Box>
  );
};
