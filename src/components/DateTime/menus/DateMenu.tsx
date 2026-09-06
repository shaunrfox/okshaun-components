import { Box } from '~/components/Box';
import { Calendar } from '~/components/Calendar';
import { Menu, type MenuProps } from '~/components/Menu';
import { useControllableState } from '~/system/hooks/useControllableState';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import type { DateValue } from '../helpers/types';

type ViewDate = { year: number; month: number };

/** Props for {@link DateMenu}, a Calendar presented through Menu behavior. */
export type DateMenuProps = Omit<
  MenuProps,
  'children' | 'onChange' | 'value'
> & {
  /** Selected date shown by the calendar. */
  value?: DateValue | null;
  /** Commits immediately on day selection, then closes the menu. */
  onChange?: (value: DateValue | null) => void;
  /** Earliest selectable date. */
  minDate?: DateValue;
  /** Latest selectable date. */
  maxDate?: DateValue;
  /** Controlled visible calendar month. */
  viewDate?: ViewDate;
  /** Initial visible month when `viewDate` is not provided. */
  defaultViewDate?: ViewDate;
  /** Runs when calendar navigation requests a new visible month. */
  onViewDateChange?: (viewDate: ViewDate) => void;
  /** Prevents opening or selection and returns only the trigger. */
  disabled?: boolean;
  /** Accessible label passed to the calendar grid. */
  label?: string;
};

/**
 * Presents a calendar in a Menu and commits a selected day immediately.
 *
 * Supply a `trigger`, or set inherited `inline` to render the calendar in
 * normal flow. Selecting an enabled date calls `onChange` and closes a
 * triggered menu.
 *
 * @example
 * ```tsx
 * <DateMenu trigger={<Button>Choose date</Button>} onChange={setDate} />
 * ```
 */
export const DateMenu = (props: DateMenuProps) => {
  const {
    trigger,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    value,
    onChange,
    minDate,
    maxDate,
    viewDate,
    defaultViewDate,
    onViewDateChange,
    disabled = false,
    label,
    ...rest
  } = props;
  const isInline = rest.inline === true;
  const [className, otherProps] = splitProps(rest);

  const [isOpen, setOpenState] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const menuOpen = isInline ? true : isOpen;

  if (disabled) {
    return trigger;
  }

  return (
    <Menu
      {...dsComponent('DateMenu')}
      className={className}
      {...otherProps}
      trigger={trigger}
      open={menuOpen}
      onOpenChange={setOpenState}
      placement={placement}
      closeOnSelect={false}
    >
      <Box>
        <Calendar
          value={value}
          onChange={(date) => {
            onChange?.(date);
            setOpenState(false);
          }}
          minDate={minDate}
          maxDate={maxDate}
          viewDate={viewDate}
          defaultViewDate={defaultViewDate}
          onViewDateChange={onViewDateChange}
          disabled={disabled}
          label={label}
        />
      </Box>
    </Menu>
  );
};
