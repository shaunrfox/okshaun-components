import { cx } from '@styled-system/css';
import { type KeyFactVariantProps, keyFact } from '@styled-system/recipes';
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { IconButton } from '~/components/IconButton';
import { Link } from '~/components/Link';
import { TextInput, type TextInputProps } from '~/components/TextInput';
import { Tooltip } from '~/components/Tooltip';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props for {@link KeyFact}. */
export type KeyFactProps = Omit<
  BoxProps,
  keyof KeyFactVariantProps | 'children'
> &
  KeyFactVariantProps & {
    /** Name of the fact, such as "Owner" or "Due". */
    label: string;
    /** Value of the fact. A value wider than the space it has truncates and shows the full value in a tooltip. */
    value: string;
    /** Makes the value a link, such as to the related record. Ignored while `editing`. */
    href?: string;
    /**
     * `horizontal` reads "Label: Value" on one line, for a page header aside.
     * `vertical` stacks the label over a larger value, for a facts strip.
     * Takes a conditional value, such as `{ base: 'vertical', md: 'horizontal' }`.
     * A conditional value without `base` starts as `horizontal`.
     *
     * @default 'horizontal'
     */
    layout?: KeyFactVariantProps['layout'];
    /**
     * Replaces the value with a text input labeled by `label`. The input starts
     * with `value`. On its own, `editing` has no save or cancel: put the
     * KeyFact in a form with its own Save, or set `editMode="confirm"`.
     *
     * @default false
     */
    editing?: boolean;
    /**
     * How the value is changed while `editing`.
     * `input` shows the text input alone, for a form with its own Save.
     * `confirm` adds save and cancel buttons, for a single fact saved on its
     * own. In `confirm`, Enter saves and Escape cancels.
     *
     * @default 'input'
     */
    editMode?: 'input' | 'confirm';
    /** Called with the new value when the user saves. Called only in `editMode="confirm"`. */
    onSave?: (value: string) => void;
    /** Called when the user cancels. Called only in `editMode="confirm"`. */
    onCancel?: () => void;
    /** Props for the text input shown while `editing`, such as `name` and `onChange`. Pass `name` when the KeyFact is in a form. */
    inputProps?: Partial<Omit<TextInputProps, 'id'>>;
  };

/** Fills in the default `horizontal` below the first breakpoint of a conditional layout. */
const withBaseLayout = (
  layout: KeyFactProps['layout'],
): KeyFactProps['layout'] => {
  if (layout == null) return 'horizontal';
  if (Array.isArray(layout)) {
    const [first, ...rest] = layout;
    return [first ?? 'horizontal', ...rest];
  }
  if (typeof layout === 'object') {
    return { ...layout, base: layout.base ?? 'horizontal' };
  }
  return layout;
};

/**
 * Shows one short fact about a record as a label and a value.
 *
 * Use up to three horizontal key facts in a page header aside. Use the vertical
 * layout in a strip of facts under the title. A horizontal label ends in the
 * `keyFactLabel` text from `LocaleProvider` ("Owner:" in English). Set `editing`
 * to change the value in place. With `editMode="confirm"`, the fact gets its
 * own save and cancel buttons.
 *
 * @example
 * ```tsx
 * <KeyFact label="Customer" value="Acme Corp" href="/customer/42" />
 * ```
 */
export const KeyFact = (props: KeyFactProps) => {
  const {
    label,
    value,
    href,
    layout,
    editing = false,
    editMode = 'input',
    onSave,
    onCancel,
    inputProps,
    ...rest
  } = props;
  const confirm = editing && editMode === 'confirm';
  const [draft, setDraft] = useState(value);
  const { labels } = useLocale();
  const inputId = useId();
  const textRef = useRef<HTMLElement>(null);
  const [truncated, setTruncated] = useState(false);
  const classes = keyFact({ layout: withBaseLayout(layout), editing });
  const [className, otherProps] = splitProps(rest);
  const isLink = Boolean(href);
  const labelText = (
    <>
      <Box as="span" className={classes.labelWithColon}>
        {labels.keyFactLabel(label)}
      </Box>
      <Box as="span" className={classes.labelPlain}>
        {label}
      </Box>
    </>
  );

  if (import.meta.env.DEV && editMode !== 'confirm' && (onSave || onCancel)) {
    console.warn(
      'KeyFact received "onSave" or "onCancel" without editMode="confirm". They are called only in confirm mode.',
    );
  }

  // Each edit starts from the current value.
  useEffect(() => {
    if (editing) setDraft(value);
  }, [editing, value]);

  const save = () => onSave?.(draft);
  const cancel = () => {
    setDraft(value);
    onCancel?.();
  };

  const confirmInputProps = confirm
    ? {
        value: draft,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          inputProps?.onChange?.(event);
          setDraft(event.target.value);
        },
        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
          inputProps?.onKeyDown?.(event);
          if (event.defaultPrevented || event.nativeEvent.isComposing) return;
          if (event.key === 'Enter') {
            event.preventDefault();
            save();
          } else if (event.key === 'Escape') {
            event.preventDefault();
            cancel();
          }
        },
      }
    : { defaultValue: value };

  // biome-ignore lint/correctness/useExhaustiveDependencies: editing, value, and isLink swap or resize the text element, so they re-run the check
  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const measure = () =>
      setTruncated(element.scrollWidth > element.clientWidth);
    measure();

    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
    // `isLink` swaps the span for a link, so the new element is observed.
  }, [editing, value, isLink]);

  return (
    <Box
      {...dsComponent('KeyFact')}
      className={cx(classes.root, className)}
      {...otherProps}
    >
      {editing ? (
        <>
          <Box as="label" htmlFor={inputId} className={classes.label}>
            {labelText}
          </Box>
          <Box className={classes.value}>
            <TextInput
              name=""
              size="sm"
              {...inputProps}
              {...confirmInputProps}
              id={inputId}
            />
            {confirm && (
              <Box className={classes.actions}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  iconName="check"
                  altText={labels.save}
                  onClick={save}
                />
                <IconButton
                  variant="ghost"
                  size="sm"
                  iconName="x"
                  altText={labels.cancel}
                  onClick={cancel}
                />
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box as="span" className={classes.label}>
            {labelText}
          </Box>
          <Box className={classes.value}>
            <Tooltip text={value} placement="top" disabled={!truncated}>
              {href ? (
                <Link ref={textRef} href={href} className={classes.text}>
                  {value}
                </Link>
              ) : (
                <Box
                  as="span"
                  ref={textRef}
                  // Focusable while truncated, so keyboard and touch users can
                  // open the tooltip with the full value.
                  tabIndex={truncated ? 0 : undefined}
                  className={classes.text}
                  color="text"
                >
                  {value}
                </Box>
              )}
            </Tooltip>
          </Box>
        </>
      )}
    </Box>
  );
};
