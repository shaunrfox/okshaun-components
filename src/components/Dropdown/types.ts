import type { Placement } from '@floating-ui/react';
import type { MenuVariantProps } from '@styled-system/recipes';
import type { ButtonProps } from '../Button';

export type DropdownProps = MenuVariantProps & {
  /** Trigger button label */
  label: string;
  /** Floating UI placement */
  placement?: Placement;
  /** Offset distance from trigger (in pixels) */
  offset?: number;
  /** Children (MenuItem, MenuGroup, MenuDivider, etc.) */
  children: React.ReactNode;
  /** Optional ID for ARIA attributes */
  id?: string;
  /** Disable the dropdown */
  disabled?: boolean;
  /** Props to pass to the trigger Button */
  triggerProps?: Omit<ButtonProps, 'children' | 'disabled'>;
};
