import type { Placement } from '@floating-ui/react';
import type { BoxProps } from '../Box';

// ============================================================================
// SELECT CONTEXT
// ============================================================================

export interface SelectContextValue {
  /** Current selected value */
  value: string | string[] | null;
  /** Callback when value changes */
  onChange: (value: string | string[] | null) => void;
  /** Whether multiple selection is allowed */
  multiple: boolean;
  /** Placeholder text when no selection */
  placeholder: string;
}

// ============================================================================
// SELECT PROPS
// ============================================================================

export type SelectProps = BoxProps & {
  /** Selected value(s) */
  value?: string | string[] | null;
  /** Callback when value changes */
  onChange?: (value: string | string[] | null) => void;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state should change */
  onOpenChange?: (open: boolean) => void;
  /** Floating UI placement */
  placement?: Placement;
  /** Offset distance from trigger (in pixels) */
  offset?: number;
  /** Children (SelectTrigger, SelectOption) */
  children: React.ReactNode;
  /** Optional ID for ARIA attributes */
  id?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: 'default' | 'compact' | 'comfortable';
  /** Selection indicator position */
  indicatorPosition?: 'left' | 'right';
};

// ============================================================================
// SELECT TRIGGER PROPS
// ============================================================================

export type SelectTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: React.ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

// ============================================================================
// SELECT OPTION PROPS
// ============================================================================

export type SelectOptionProps = Omit<BoxProps, 'children'> & {
  /** Option value */
  value: string;
  /** Option label (required) */
  label: string | React.ReactNode;
  /** Disable the option */
  disabled?: boolean;
  /** Secondary description text */
  description?: string;
  /** Icon on the left side */
  iconLeft?: import('../Icon').IconNamesList;
  /** Icon on the right side */
  iconRight?: import('../Icon').IconNamesList;
  /** Index for keyboard navigation (managed internally) */
  index?: number;
};
