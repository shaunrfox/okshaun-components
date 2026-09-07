import { cx } from '@styled-system/css';
import { type TextInputVariantProps, textInput } from '@styled-system/recipes';
import type { ReactNode } from 'react';
import { isValidElement } from 'react';

import { Button } from '~/components/Button';
import { Icon, type IconNamesList } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { useFieldContext } from '~/system/context/FieldContext';
import { SlotContext, type SlotPlacement } from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { mergeAriaDescribedBy } from '~/utils/mergeAriaDescribedBy';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';

/** Props for {@link TextInput}, a single-line native input with optional slots. */
export type TextInputProps = Omit<BoxProps, keyof TextInputVariantProps> &
  Omit<TextInputVariantProps, 'before' | 'after'> & {
    /** Form field name submitted with the input value. */
    name: string;
    /** Identifier used to associate a visible `Label` with this input. */
    id?: string;
    /** Content rendered before the native input. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content rendered after the native input. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Decorative icon rendered before the input when `before` is omitted. */
    iconBefore?: IconNamesList;
    /** Decorative icon rendered after the input when `after` is omitted. */
    iconAfter?: IconNamesList;
    /** Applies error styling. The local value takes precedence over field context. */
    error?: boolean;
    /** Disables the native input. The local value takes precedence over slot and field context. */
    disabled?: boolean;
    /** Applies valid styling without changing native constraint validation. */
    valid?: boolean;
    /** Marks the native input invalid with `aria-invalid` and applies invalid styling. */
    invalid?: boolean;
    type?:
      | 'text'
      | 'number'
      | 'email'
      | 'password'
      | 'search'
      | 'tel'
      | 'url'
      | 'date'
      | 'time'
      | 'datetime-local'
      | 'month'
      | 'week';
  };

/**
 * Renders a single-line native input with optional leading and trailing slots.
 *
 * Use a `Label` or `FormField` to provide an accessible name. `before` and
 * `after` can contain controls; they inherit size and state through slot
 * context. Explicit slots take precedence over `iconBefore` and `iconAfter`.
 *
 * @example
 * ```tsx
 * <TextInput id="email" name="email" type="email" iconBefore="mail" />
 * ```
 */
export const TextInput = (props: TextInputProps) => {
  const fieldContext = useFieldContext();
  const {
    name,
    id,
    before,
    after,
    iconBefore,
    iconAfter,
    error,
    disabled,
    valid,
    invalid: invalidProp,
    type = 'text',
    size: sizeProp,
    autoSize = false,
    autoComplete = 'off',
    ...rest
  } = props;
  const resolvedSize =
    sizeProp ??
    (fieldContext?.size as TextInputVariantProps['size'] | undefined);
  const resolvedError = error ?? fieldContext?.error;
  const resolvedInvalid = invalidProp ?? fieldContext?.invalid;
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const classes = textInput({
    size: resolvedSize,
    before: Boolean(before || iconBefore),
    after: Boolean(after || iconAfter),
    autoSize,
  });
  const [className, otherProps] = splitProps(rest);
  const { 'aria-describedby': ariaDescribedBy, ...inputProps } =
    otherProps as typeof otherProps & { 'aria-describedby'?: string };
  const describedBy = mergeAriaDescribedBy(
    fieldContext?.describedBy,
    ariaDescribedBy,
  );

  if (import.meta.env.DEV) {
    if (before && iconBefore) {
      console.warn(
        'TextInput received both "before" and "iconBefore". "before" takes precedence.',
      );
    }

    if (after && iconAfter) {
      console.warn(
        'TextInput received both "after" and "iconAfter". "after" takes precedence.',
      );
    }
  }

  const isButtonLikeSlot = (slot: ReactNode) =>
    isValidElement(slot) && (slot.type === Button || slot.type === IconButton);

  const renderSlot = (slot: ReactNode, placement: SlotPlacement) => {
    if (!slot) {
      return null;
    }

    return (
      <SlotContext.Provider
        value={{
          owner: 'TextInput',
          placement,
          size: resolvedSize,
          disabled: resolvedDisabled,
          error: resolvedError,
          invalid: resolvedInvalid,
        }}
      >
        <Box
          className={isButtonLikeSlot(slot) ? classes.buttonSlot : classes.slot}
        >
          {slot}
        </Box>
      </SlotContext.Provider>
    );
  };

  const renderIconSlot = (name: IconNamesList, placement: SlotPlacement) => {
    return (
      <SlotContext.Provider
        value={{
          owner: 'TextInput',
          placement,
          size: resolvedSize,
          disabled: resolvedDisabled,
          error: resolvedError,
          invalid: resolvedInvalid,
        }}
      >
        <Box className={classes.slot}>
          <Icon name={name} aria-hidden />
        </Box>
      </SlotContext.Provider>
    );
  };

  return (
    <Box
      {...dsComponent('TextInput')}
      className={cx(classes.container, className)}
      aria-disabled={resolvedDisabled}
      data-disabled={resolvedDisabled || undefined}
      data-error={resolvedError || undefined}
      data-invalid={resolvedInvalid || undefined}
      data-valid={valid || undefined}
      aria-invalid={resolvedInvalid || undefined}
    >
      {before
        ? renderSlot(before, 'before')
        : iconBefore
          ? renderIconSlot(iconBefore, 'before')
          : null}
      <Box
        as="input"
        id={id}
        name={name}
        type={type}
        disabled={resolvedDisabled}
        data-error={resolvedError || undefined}
        data-valid={valid || undefined}
        data-invalid={resolvedInvalid || undefined}
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        className={cx(classes.input, className)}
        autoComplete={autoComplete}
        {...inputProps}
      />
      {after
        ? renderSlot(after, 'after')
        : iconAfter
          ? renderIconSlot(iconAfter, 'after')
          : null}
    </Box>
  );
};
