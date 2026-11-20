// biome-ignore-all lint/a11y/useSemanticElements: the combobox and listbox are composed from Box and List rather than native select markup, so the roles are applied explicitly
import {
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { menu, type SelectVariantProps, select } from '@styled-system/recipes';
import {
  Children,
  type HTMLProps,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { MenuDensity } from '~/components/Menu/context/menuContext';
import { useLocale } from '~/system/context/useLocale';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import {
  availableHeightMiddleware,
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { dsPart } from '~/utils/dsPart';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box/Box';
import { Chip } from '../Chip/Chip';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';
import { DsChainScope } from '../DsChainScope/DsChainScope';
import { Icon } from '../Icon/Icon';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';

import { SelectContext } from './SelectContext';
import { SelectOption, type SelectOptionProps } from './SelectOption';

type SelectValue = string | string[] | null;

const defaultDensity: MenuDensity = 'compact';
const chipSizeBySelectSize = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'md',
} as const;

const resolveChipSize = (size: SelectProps['size']): 'sm' | 'md' => {
  if (!size || typeof size === 'string') {
    return chipSizeBySelectSize[size ?? 'md'];
  }

  const values = Array.isArray(size)
    ? (size as Array<string | null>)
    : Object.values(size as Record<string, unknown>);

  const firstSize = values.find(
    (value): value is keyof typeof chipSizeBySelectSize =>
      typeof value === 'string' && value in chipSizeBySelectSize,
  );

  return firstSize ? chipSizeBySelectSize[firstSize] : 'sm';
};

const isSelectOptionElement = (
  child: ReactNode,
): child is ReactElement<SelectOptionProps> => {
  return isValidElement(child) && child.type === SelectOption;
};

const getOptionText = (option: ReactElement<SelectOptionProps>) => {
  return option.props.label;
};

const NAVIGATION_KEYS = new Set(['ArrowUp', 'ArrowDown', 'Home', 'End']);

// Keys floating-ui treats as moving through the list: arrows, Home/End, and
// printable characters (typeahead). Modifiers, Tab and the like don't count.
const isNavigationKey = (event: KeyboardEvent<HTMLElement>) =>
  NAVIGATION_KEYS.has(event.key) ||
  (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey);

const getSelectedDisplay = (
  options: ReactElement<SelectOptionProps>[],
  value: SelectValue,
  multiple: boolean,
  placeholder: string,
) => {
  if (value === null || value === undefined || value === '') {
    return placeholder;
  }

  if (multiple) {
    const selectedValues = Array.isArray(value)
      ? value
      : ([value].filter(Boolean) as string[]);
    const selectedValueSet = new Set(selectedValues);
    const selectedOptions = options.filter((option) =>
      selectedValueSet.has(option.props.value),
    );

    if (selectedOptions.length === 0) {
      return placeholder;
    }

    return selectedOptions.map(getOptionText).join(', ');
  }

  const selectedOption = options.find((option) => option.props.value === value);
  return selectedOption ? getOptionText(selectedOption) : placeholder;
};

const getSelectedOptions = (
  options: ReactElement<SelectOptionProps>[],
  value: SelectValue,
  multiple: boolean,
) => {
  if (!multiple) {
    return [];
  }

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selectedValueSet = new Set(selectedValues);
  return options.filter((option) => selectedValueSet.has(option.props.value));
};

/** Props for {@link Select}, an ARIA listbox-based single or multiple select. */
export type SelectProps = Omit<
  BoxProps,
  keyof SelectVariantProps | 'children' | 'onChange' | 'type' | 'value'
> &
  SelectVariantProps & {
    /** Controlled selected value. Use a string for single selection or a string array for multiple selection, with `onChange` to accept changes. */
    value?: SelectValue;
    /**
     * Initial selected value for an uncontrolled select. It is used only on first render.
     * @default null
     */
    defaultValue?: SelectValue;
    /** Called when the user selects, deselects, or clears an option. In controlled mode, update `value` with the supplied value. */
    onChange?: (value: SelectValue) => void;
    /**
     * Allows several options to be selected and renders selected options as removable chips.
     * @default false
     */
    multiple?: boolean;
    /**
     * Text shown while no option is selected.
     * @default 'Select...'
     */
    placeholder?: string;
    /** Controlled popup state. Pair with `onOpenChange`; omit it to use `defaultOpen`. */
    open?: boolean;
    /**
     * Initial popup state for an uncontrolled select. It is used only on first render.
     * @default false
     */
    defaultOpen?: boolean;
    /** Called when user interaction requests that the popup open or close. */
    onOpenChange?: (open: boolean) => void;
    /**
     * Floating UI placement for the listbox relative to the trigger.
     * @default 'bottom-start'
     */
    placement?: Placement;
    /**
     * Gap between the trigger and listbox, in pixels.
     * @default 4
     */
    offset?: number;
    /** Metadata-only `SelectOption` children used to build the listbox. Other children are ignored. */
    children?: ReactNode;
    /** Identifier for the combobox trigger. A generated identifier is used when omitted. */
    id?: string;
    /** Form field name. Each selected value is submitted through a hidden input. */
    name?: string;
    /**
     * Prevents opening, selection, and hidden-input submission.
     * @default false
     */
    disabled?: boolean;
    /**
     * Marks the combobox as invalid with `aria-invalid` and error styling.
     * @default false
     */
    error?: boolean;
    /**
     * Density applied to the popup options.
     * @default 'compact'
     */
    density?: MenuDensity;
    /**
     * Shrinks the trigger to its content instead of using the standard select width.
     * @default false
     */
    autoSize?: boolean;
    /**
     * Decorative content, such as an `Avatar` or a colored `Icon`, shown in
     * the trigger before the selected value. When omitted, a single select
     * shows the selected option's `before` instead.
     */
    before?: ReactNode;
    /**
     * Lets the user clear a single selection by choosing the selected option
     * again or by pressing Backspace or Delete. Set it to `false` for a field
     * that must always hold a value, such as a status. It has no effect when
     * `multiple` is set.
     * @default true
     */
    clearable?: boolean;
  };

/**
 * Chooses one or more values from metadata-only {@link SelectOption} children.
 *
 * The trigger uses combobox/listbox semantics. Arrow keys, Enter, and Space open
 * it; typeahead and arrow keys navigate options; Escape or outside press closes
 * it. Focus stays on the trigger when the non-modal popup opens.
 *
 * Use `before` on the `Select` or on each `SelectOption` to show an avatar or
 * a status icon beside the value. Set `clearable={false}` when the field must
 * always hold a value.
 *
 * @example
 * ```tsx
 * <Select defaultValue="draft" name="status">
 *   <SelectOption value="draft" label="Draft" />
 *   <SelectOption value="published" label="Published" />
 * </Select>
 * ```
 */
export const Select = (props: SelectProps) => {
  const { labels } = useLocale();
  const floatingLayer = useFloatingLayer();
  const {
    value: controlledValue,
    defaultValue = null,
    onChange,
    multiple = false,
    placeholder = labels.selectPlaceholder,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    offset = 4,
    children,
    id,
    name,
    disabled = false,
    error = false,
    size = 'md',
    density = defaultDensity,
    autoSize = false,
    before,
    clearable = true,
    'data-ds-component': dsComponentName,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  // Read, do not remove. `data-testid` stays on the combobox trigger, which is
  // the element a test drives and the element existing selectors already
  // target. The chain scope it needs to open is a separate concern, handled
  // below the return: the trigger is a sibling of the portal that renders the
  // listbox, so a scope opened by the trigger's own `Box` could never enclose
  // it, but a scope opened above the root does.
  const testId = otherProps['data-testid'];

  const generatedId = useId();
  const triggerId = id ?? `select-${generatedId}`;
  const labelId = `${triggerId}-label`;
  const listboxId = `${triggerId}-listbox`;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState<SelectValue>(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);

  const isOpenControlled = controlledOpen !== undefined;
  const isOpen = isOpenControlled ? controlledOpen : internalOpen;
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  const options = useMemo(() => {
    return Children.toArray(children).filter(isSelectOptionElement);
  }, [children]);

  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    return typeof value === 'string' ? [value] : [];
  }, [multiple, value]);
  const selectedValueSet = useMemo(
    () => new Set(selectedValues),
    [selectedValues],
  );

  const selectedIndex = useMemo(() => {
    return options.findIndex((option) => {
      if (multiple) {
        return selectedValueSet.has(option.props.value);
      }

      return option.props.value === value;
    });
  }, [multiple, options, selectedValueSet, value]);

  const firstEnabledIndex = useMemo(() => {
    return options.findIndex((option) => !option.props.disabled);
  }, [options]);

  const disabledIndices = useMemo(() => {
    return options.flatMap((option, index) =>
      option.props.disabled ? index : [],
    );
  }, [options]);

  const initialActiveIndex =
    selectedIndex >= 0
      ? selectedIndex
      : firstEnabledIndex >= 0
        ? firstEnabledIndex
        : null;
  // Each open or close starts a fresh interaction, whether the user caused it
  // or a controlling parent changed `open` directly. Reset during render
  // rather than in `setOpenState`, which that second path never reaches. Only
  // opening from the keyboard starts out as navigated, so its selected row
  // shows the clear icon right away.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    setActiveIndex(isOpen ? initialActiveIndex : null);
    setHasNavigated(isOpen && openedByKeyboard);
    setOpenedByKeyboard(false);
  }

  // Until the user has navigated, the selected row stands in as the active
  // one. After that, a null `activeIndex` is real (the pointer left the
  // options), and must reach floating-ui as null so the next arrow key moves
  // focus to a row instead of re-activating the one it already thinks is active.
  const resolvedActiveIndex = isOpen
    ? (activeIndex ?? (hasNavigated ? null : initialActiveIndex))
    : null;

  const activeOptionId =
    resolvedActiveIndex !== null
      ? `${triggerId}-option-${resolvedActiveIndex}`
      : undefined;

  const setOpenState = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  const handleValueChange = useCallback(
    (nextValue: SelectValue) => {
      if (controlledValue === undefined) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [controlledValue, onChange],
  );

  const floating = useOverlayFloating({
    open: isOpen,
    onOpenChange: (nextOpen) => {
      if (!disabled) {
        setOpenState(nextOpen);
      }
    },
    placement,
    middleware: createOverlayMiddleware({
      offset,
      extras: [
        // Floating UI only positions the listbox; without a height cap a long
        // option list overflows the viewport on whichever side flip() picks.
        // The `menu` recipe's `scrollable` variant applies the cap.
        availableHeightMiddleware({ matchReferenceWidth: true }),
      ],
    }),
  });

  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  // Focus stays on the trigger when the listbox opens, so nothing scrolls the
  // initially active option into view. Wait for positioning so the height cap
  // is in place before scrolling within the capped listbox.
  const { isPositioned } = floating;
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs only on open; later navigation scrolls via useListNavigation
  useLayoutEffect(() => {
    if (!isOpen || !isPositioned || initialActiveIndex === null) {
      return;
    }

    itemRefs.current[initialActiveIndex]?.scrollIntoView({ block: 'nearest' });
    // Only on open; later navigation scrolls via useListNavigation.
  }, [isOpen, isPositioned]);

  const click = useClick(floating.context, {
    enabled: !disabled,
  });
  const dismiss = useDismiss(floating.context, {
    enabled: !disabled,
  });
  const role = useRole(floating.context, { role: 'listbox' });
  const listNavigation = useListNavigation(floating.context, {
    listRef: itemRefs,
    activeIndex: resolvedActiveIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    disabledIndices,
  });
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex: resolvedActiveIndex,
    onMatch: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  );

  const displayValue = getSelectedDisplay(
    options,
    value,
    multiple,
    placeholder,
  );
  const selectedOptions = getSelectedOptions(options, value, multiple);
  const resolvedBefore =
    before ??
    (multiple
      ? undefined
      : options.find((option) => option.props.value === value)?.props.before);
  const hasBefore =
    resolvedBefore !== undefined &&
    resolvedBefore !== null &&
    resolvedBefore !== false;
  const classes = select({ size, multiple, autoSize, before: hasBefore });
  const menuClasses = menu({
    density,
    layer: floatingLayer,
    scrollable: true,
  });
  const hasValue = value !== null && value !== undefined && value !== '';
  const chipSize = resolveChipSize(size);
  const accessibleName =
    typeof displayValue === 'string' && displayValue.length > 0
      ? displayValue
      : placeholder;

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (
      !isOpen &&
      (event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'Enter' ||
        event.key === ' ')
    ) {
      event.preventDefault();
      setOpenedByKeyboard(true);
      setOpenState(true);
    }

    if (
      !multiple &&
      clearable &&
      hasValue &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      event.preventDefault();
      handleValueChange(null);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const nextValues = currentValues.includes(optionValue)
        ? currentValues.filter((currentValue) => currentValue !== optionValue)
        : [...currentValues, optionValue];

      handleValueChange(nextValues.length > 0 ? nextValues : null);
      return;
    }

    if (value === optionValue) {
      if (clearable) {
        handleValueChange(null);
      }
      setOpenState(false);
      return;
    }

    handleValueChange(optionValue);
    setOpenState(false);
  };

  const handleChipDismiss = (optionValue: string) => {
    if (!multiple) {
      return;
    }

    const currentValues = Array.isArray(value) ? value : value ? [value] : [];
    const nextValues = currentValues.filter(
      (currentValue) => currentValue !== optionValue,
    );

    handleValueChange(nextValues.length > 0 ? nextValues : null);
  };

  // okshaun keeps SelectContext public (useSelectContext), so the provider
  // wraps the DS structure.
  const contextValue = useMemo(
    () => ({
      value,
      onChange: handleValueChange,
      multiple,
      placeholder,
    }),
    [handleValueChange, multiple, placeholder, value],
  );

  const root = (
    <SelectContext value={contextValue}>
      <Box {...dsComponent('Select', dsComponentName)} className={classes.root}>
        {name &&
          selectedValues.map((selectedValue) => (
            <Box
              key={selectedValue}
              as="input"
              type="hidden"
              name={name}
              value={selectedValue}
              disabled={disabled}
            />
          ))}

        {/*
        `data-ds-part` gives the trigger a stable query handle now that
        `data-testid` is written on the root. It is internal instrumentation,
        not a supported prop, and the chain reads `data-testid` only, so it adds
        no chain node.
      */}
        <Box
          as="div"
          {...dsPart('trigger')}
          id={triggerId}
          ref={floating.refs.setReference}
          className={`${cx(classes.trigger, className)} peer`}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={labelId}
          aria-label={accessibleName}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={isOpen ? activeOptionId : undefined}
          aria-disabled={disabled}
          aria-invalid={error || undefined}
          data-disabled={disabled || undefined}
          data-error={error || undefined}
          data-open={isOpen || undefined}
          {...(getReferenceProps({
            onKeyDown: handleTriggerKeyDown,
          }) as Record<string, unknown>)}
          {...otherProps}
        >
          {hasBefore && (
            <Box className={classes.before} aria-hidden>
              {resolvedBefore}
            </Box>
          )}
          {multiple && selectedOptions.length > 0 ? (
            <Box className={cx(classes.content, classes.chips)}>
              {selectedOptions.map((option) => (
                <Box
                  key={option.props.value}
                  onMouseDown={(event: MouseEvent<HTMLElement>) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={(event: MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                  }}
                >
                  <Chip
                    size={chipSize}
                    dismissable
                    onDismiss={() => handleChipDismiss(option.props.value)}
                  >
                    {option.props.label}
                  </Chip>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              className={cx(
                classes.content,
                hasValue ? classes.value : classes.placeholder,
              )}
            >
              {displayValue}
            </Box>
          )}
        </Box>
        <Box
          as="span"
          className={classes.icon}
          data-open={isOpen || undefined}
          aria-hidden
        >
          <Icon name="caret-down" />
        </Box>

        {isOpen && !disabled && (
          <FloatingPortal>
            <DsChainPortalRoot reference={floating.elements.domReference}>
              <FloatingFocusManager
                context={floating.context}
                modal={false}
                initialFocus={-1}
              >
                {/* validate-ignore: useSemanticElements — custom select popup uses ARIA listbox semantics on a non-native container */}
                <List
                  ref={floating.refs.setFloating}
                  id={listboxId}
                  role="listbox"
                  aria-labelledby={triggerId}
                  aria-multiselectable={multiple || undefined}
                  density={density}
                  className={menuClasses.wrapper}
                  style={floating.floatingStyles}
                  {...(getFloatingProps({
                    // floating-ui also reports `onNavigate` while opening, so
                    // only real input on the list counts as the user pointing
                    // at a row. Option events bubble here, and the listbox
                    // itself holds focus after the pointer leaves the options.
                    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
                      if (isNavigationKey(event)) {
                        setHasNavigated(true);
                      }
                    },
                    onPointerMove: (event: PointerEvent<HTMLElement>) => {
                      if (event.pointerType !== 'touch') {
                        setHasNavigated(true);
                      }
                    },
                  }) as Record<string, unknown>)}
                >
                  {options.map((option, index) => {
                    const optionLabel = getOptionText(option);
                    const isSelected = multiple
                      ? selectedValueSet.has(option.props.value)
                      : value === option.props.value;
                    // The selected row is made active as soon as the list opens,
                    // so `activeIndex` alone can't tell whether the user is
                    // pointing at it. Once the list has seen pointer or key
                    // input, the active row is the one being pointed at.
                    const isPointed =
                      !option.props.disabled &&
                      hasNavigated &&
                      activeIndex === index;
                    const showClearIcon = clearable && isSelected && isPointed;
                    const optionBefore = option.props.before;
                    // A `before` slot takes the leading position, so the
                    // selection check moves to the end of the row.
                    const hasOptionBefore =
                      optionBefore !== undefined &&
                      optionBefore !== null &&
                      optionBefore !== false;
                    const selectionIcon = showClearIcon ? 'x' : 'check';

                    return (
                      <ListItem
                        key={option.props.value}
                        id={`${triggerId}-option-${index}`}
                        ref={(node: HTMLElement | null) => {
                          itemRefs.current[index] = node;
                          labelsRef.current[index] = optionLabel;
                        }}
                        disabled={option.props.disabled}
                        selected={isSelected}
                        variant={multiple ? 'checkbox' : 'default'}
                        label={optionLabel}
                        description={option.props.description}
                        before={hasOptionBefore ? optionBefore : undefined}
                        iconBefore={
                          hasOptionBefore
                            ? undefined
                            : !multiple
                              ? showClearIcon
                                ? 'x'
                                : (option.props.iconLeft ?? 'check')
                              : option.props.iconLeft
                        }
                        iconBeforeFill={
                          hasOptionBefore
                            ? undefined
                            : !multiple
                              ? isSelected
                                ? 'icon'
                                : option.props.iconLeft
                                  ? undefined
                                  : 'transparent'
                              : undefined
                        }
                        iconAfter={
                          hasOptionBefore && !multiple
                            ? selectionIcon
                            : option.props.iconRight
                        }
                        iconAfterFill={
                          hasOptionBefore && !multiple
                            ? isSelected
                              ? 'icon'
                              : 'transparent'
                            : undefined
                        }
                        {...(getItemProps({
                          onClick: () => {
                            if (!option.props.disabled) {
                              handleOptionSelect(option.props.value);
                            }
                          },
                        } as HTMLProps<HTMLElement>) as Record<
                          string,
                          unknown
                        >)}
                      />
                    );
                  })}
                </List>
              </FloatingFocusManager>
            </DsChainPortalRoot>
          </FloatingPortal>
        )}
      </Box>
    </SelectContext>
  );

  // The scope is opened above the root rather than by the element carrying the
  // id, because only the root encloses the portal's position in the React tree.
  // The trigger's own `Box` opens a second scope with the same id; the repeat
  // is collapsed in `extendDsChain`, so content inside the trigger resolves the
  // same chain as content outside it.
  return typeof testId === 'string' && testId.length > 0 ? (
    <DsChainScope testId={testId}>{root}</DsChainScope>
  ) : (
    root
  );
};
