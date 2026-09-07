// biome-ignore-all lint/a11y/useSemanticElements: the combobox and listbox are composed from Box and List rather than native select markup, so the roles are applied explicitly
import {
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import type { AutocompleteVariantProps } from '@styled-system/recipes';
import type { HTMLProps, ReactNode } from 'react';

import type { MenuDensity } from '~/components/Menu';
import { dsComponent } from '~/utils/dsComponent';
import { dsPart } from '~/utils/dsPart';

import { Box, type BoxProps } from '../Box/Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';
import { Spinner } from '../Spinner/Spinner';

import { AutocompleteListbox } from './AutocompleteListbox';
import { AutocompleteToken } from './AutocompleteToken';
import type {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteOpenChangeReason,
  AutocompleteValue,
} from './types';
import { useAutocompleteController } from './useAutocompleteController';

type AutocompleteBaseProps = Omit<
  BoxProps,
  | keyof AutocompleteVariantProps
  | 'children'
  | 'defaultValue'
  | 'onChange'
  | 'value'
> &
  AutocompleteVariantProps & {
    /** Controlled text displayed in the input. */
    inputValue?: string;
    /** Initial input text when `inputValue` is not provided. */
    defaultInputValue?: string;
    /** Runs when typing, selection, or clearing changes the input text. */
    onInputValueChange?: (
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void;
    /**
     * Runs when the input text changes.
     *
     * @deprecated Use `onInputValueChange`.
     */
    onInputChange?: (
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void;
    /** Controlled listbox visibility. Pair with `onOpenChange`. */
    open?: boolean;
    /**
     * Initial listbox visibility when `open` is not provided.
     *
     * @default false
     */
    defaultOpen?: boolean;
    /** Runs when interaction requests that the listbox open or close. */
    onOpenChange?: (
      open: boolean,
      reason: AutocompleteOpenChangeReason,
    ) => void;
    /**
     * Offers the current input as a selectable option when it has no exact
     * match.
     *
     * @default false
     */
    allowCustomValue?: boolean;
    /** Creates the visible label for a custom-value option. */
    getCreateOptionLabel?: (inputValue: string) => string;
    /**
     * Maximum selected chips shown while an unfocused multiple Autocomplete
     * is collapsed. Negative values and `undefined` show every chip.
     */
    limitTags?: number;
    /**
     * Input hint shown while no value is selected.
     *
     * @default 'Select...'
     */
    placeholder?: string;
    /**
     * Floating UI placement of the listbox relative to the control.
     *
     * @default 'bottom-start'
     */
    placement?: Placement;
    /**
     * Gap between the control and listbox, in pixels.
     *
     * @default 4
     */
    offset?: number;
    /** Metadata-only `Option` children used to populate the listbox. */
    children?: ReactNode;
    /** Identifier for the combobox input. A generated identifier is used when omitted. */
    id?: string;
    /** Form field name used by hidden inputs for selected values. */
    name?: string;
    /** Prevents focus and interaction. Overrides field context when provided. */
    disabled?: boolean;
    /** Allows focus and text selection while preventing value changes. */
    readOnly?: boolean;
    /** Applies error styling and `aria-invalid`. Overrides field context when provided. */
    error?: boolean;
    /** Applies valid styling to the control. */
    valid?: boolean;
    /** Applies invalid styling and `aria-invalid`. Overrides field context when provided. */
    invalid?: boolean;
    /** Spacing density used by listbox options. */
    density?: MenuDensity;
    /**
     * Shows a loading indicator and replaces an empty list with `loadingText`.
     *
     * @default false
     */
    loading?: boolean;
    /**
     * Shows `loadingText` after the current options during incremental loading.
     *
     * @default false
     */
    loadingMore?: boolean;
    /** Indicates that scrolling can request another page of options. */
    hasMore?: boolean;
    /** Runs near the end of the list when more options are available. */
    onLoadMore?: () => void;
    /**
     * Status content shown while options are loading.
     *
     * @default 'Loading options…'
     */
    loadingText?: ReactNode;
    /**
     * Status content shown when filtering produces no options.
     *
     * @default 'No options'
     */
    noOptionsText?: ReactNode;
  };

/** Props for a single-selection {@link Autocomplete}. */
export type SingleAutocompleteProps = AutocompleteBaseProps & {
  /** Selects at most one value. */
  multiple?: false;
  /** Controlled selected value. Pair with `onValueChange`. */
  value?: AutocompleteValue<false>;
  /** Initial selected value when `value` is not provided. */
  defaultValue?: AutocompleteValue<false>;
  /** Runs when selection, removal, clearing, or creation requests a new value. */
  onValueChange?: (
    value: AutocompleteValue<false>,
    reason: AutocompleteChangeReason,
  ) => void;
  /**
   * Runs when the selected value changes.
   *
   * @deprecated Use `onValueChange`.
   */
  onChange?: (
    value: AutocompleteValue<false>,
    reason: AutocompleteChangeReason,
  ) => void;
};

/** Props for a multiple-selection {@link Autocomplete}. */
export type MultipleAutocompleteProps = AutocompleteBaseProps & {
  /** Enables multiple selection. Selected values render as chips. */
  multiple: true;
  /** Controlled selected values. Pair with `onValueChange`. */
  value?: AutocompleteValue<true>;
  /** Initial selected values when `value` is not provided. */
  defaultValue?: AutocompleteValue<true>;
  /** Runs when selection, removal, clearing, or creation requests new values. */
  onValueChange?: (
    value: AutocompleteValue<true>,
    reason: AutocompleteChangeReason,
  ) => void;
  /**
   * Runs when the selected values change.
   *
   * @deprecated Use `onValueChange`.
   */
  onChange?: (
    value: AutocompleteValue<true>,
    reason: AutocompleteChangeReason,
  ) => void;
};

/** Props accepted by {@link Autocomplete}, discriminated by `multiple`. */
export type AutocompleteProps<Multiple extends boolean = boolean> =
  Multiple extends true
    ? MultipleAutocompleteProps
    : Multiple extends false
      ? SingleAutocompleteProps
      : SingleAutocompleteProps | MultipleAutocompleteProps;

/**
 * Filters and selects one or more metadata-only `Option` values.
 *
 * Use controlled `value` and `onValueChange`, or initialize uncontrolled state
 * with `defaultValue`. The input uses combobox semantics; arrow keys navigate,
 * Enter selects, and Escape closes the listbox. Supply `aria-label` or
 * `aria-labelledby` when no external label is associated with the input.
 * Selected values render as dismissible chips in both single- and
 * multiple-selection modes.
 *
 * @example
 * ```tsx
 * <Autocomplete defaultValue="active" aria-label="Status">
 *   <Option value="active" label="Active" />
 *   <Option value="archived" label="Archived" />
 * </Autocomplete>
 * ```
 */
export const Autocomplete = (props: AutocompleteProps) => {
  const controller = useAutocompleteController(props);
  const {
    activeIndex,
    announcement,
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaRequired,
    baseId,
    chipSize,
    classes,
    className,
    currentInputValue,
    currentValue,
    density,
    disabled,
    error,
    floating,
    getFloatingProps,
    getItemProps,
    getReferenceProps,
    handleBlurCapture,
    handleControlMouseDown,
    handleFocusCapture,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleListScroll,
    handleOptionSelect,
    handleTokenDismiss,
    handleTokenKeyDown,
    hiddenTagCount,
    inputId,
    inputRef,
    invalid,
    isOpen,
    listboxId,
    loading,
    loadingMore,
    loadingText,
    multiple,
    name,
    navigationItems,
    noOptionsText,
    otherProps,
    placeholder,
    readOnly,
    rootRef,
    selectedLabels,
    selectedOptions,
    selectedValues,
    setFloatingRef,
    setItemRef,
    setTokenRef,
    valid,
    visibleSelectedValues,
  } = controller;

  return (
    <Box
      {...dsComponent('Autocomplete')}
      ref={rootRef}
      className={cx(classes.root, className)}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      {...otherProps}
    >
      {name &&
        selectedValues.map((selectedValue) => (
          <Box
            key={`hidden-${selectedValue}`}
            as="input"
            type="hidden"
            name={name}
            value={selectedValue}
            disabled={disabled}
          />
        ))}

      <Box
        ref={floating.refs.setReference}
        className={classes.control}
        data-open={isOpen || undefined}
        data-disabled={disabled || undefined}
        data-error={error || undefined}
        data-valid={valid || undefined}
        data-invalid={invalid || undefined}
        onMouseDown={handleControlMouseDown}
      >
        <Box className={classes.valueContainer}>
          {visibleSelectedValues.map((selectedValue, index) => {
            const label = selectedLabels[index] ?? selectedValue;

            return (
              <AutocompleteToken
                key={selectedValue}
                className={classes.token}
                size={chipSize}
                label={label}
                isNew={selectedOptions[index]?.created}
                disabled={disabled || readOnly}
                dismissButtonRef={(node) => setTokenRef(index, node)}
                onDismiss={() => handleTokenDismiss(selectedValue, label)}
                onKeyDown={(event) =>
                  handleTokenKeyDown(event, index, selectedValue, label)
                }
              />
            );
          })}

          {hiddenTagCount > 0 && (
            <Box
              as="span"
              className={classes.overflowIndicator}
              aria-label={`${hiddenTagCount} more selected`}
            >
              {`+${hiddenTagCount}`}
            </Box>
          )}

          {/*
            `data-ds-part` gives the combobox input a stable query handle;
            `data-testid` stays on the root so the chain scope it opens encloses
            the portaled listbox. It is internal instrumentation, not a
            supported prop, and the chain reads `data-testid` only, so it adds
            no chain node.
          */}
          <Box
            as="input"
            {...dsPart('trigger')}
            id={inputId}
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              isOpen && activeIndex !== null
                ? `${baseId}-option-${activeIndex}`
                : undefined
            }
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-required={ariaRequired}
            aria-disabled={disabled || undefined}
            aria-invalid={error || invalid || undefined}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={selectedValues.length === 0 ? placeholder : undefined}
            value={currentInputValue}
            className={classes.input}
            onChange={handleInputChange}
            {...(getReferenceProps({
              onFocus: handleInputFocus,
              onKeyDown: handleInputKeyDown,
            }) as Record<string, unknown>)}
            autoComplete="off"
          />
        </Box>

        {loading && (
          <Box as="span" className={classes.loadingIndicator} aria-hidden>
            <Spinner size="sm" />
          </Box>
        )}
      </Box>

      <Box
        as="span"
        className={classes.liveRegion}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </Box>

      {isOpen && !disabled && !readOnly && (
        <FloatingPortal>
          <DsChainPortalRoot reference={floating.elements.domReference}>
            <FloatingFocusManager
              context={floating.context}
              modal={false}
              initialFocus={-1}
            >
              <AutocompleteListbox
                activeIndex={activeIndex}
                baseId={baseId}
                density={density}
                floatingProps={getFloatingProps() as Record<string, unknown>}
                floatingRef={setFloatingRef}
                floatingStyles={floating.floatingStyles}
                getItemProps={(itemProps: HTMLProps<HTMLElement>) =>
                  getItemProps(itemProps) as Record<string, unknown>
                }
                items={navigationItems}
                listboxClassName={classes.listbox}
                listboxId={listboxId}
                loading={loading}
                loadingMore={loadingMore}
                loadingText={loadingText}
                multiple={Boolean(multiple)}
                noOptionsText={noOptionsText}
                onScroll={handleListScroll}
                onSelect={handleOptionSelect}
                query={currentInputValue.trim()}
                selectedValues={selectedValues}
                setItemRef={setItemRef}
                statusClassName={classes.status}
                value={currentValue}
              />
            </FloatingFocusManager>
          </DsChainPortalRoot>
        </FloatingPortal>
      )}
    </Box>
  );
};
