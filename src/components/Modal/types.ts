import type { BoxProps } from '../Box';
import type { ModalVariantProps } from '@styled-system/recipes';

// ============================================================================
// MODAL CONTEXT
// ============================================================================

export interface ModalContextValue {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Whether overlay clicks should close the modal */
  preventOverlayClose?: boolean;
}

// ============================================================================
// MODAL PROPS
// ============================================================================

export type ModalProps = Omit<BoxProps, keyof ModalVariantProps> &
  ModalVariantProps & {
    /** Controlled open state (REQUIRED) */
    open: boolean;
    /** Callback when open state should change (REQUIRED) */
    onOpenChange: (open: boolean) => void;
    /** Whether clicking the overlay should close the modal */
    preventOverlayClose?: boolean;
    /** Children (ModalHeader, ModalBody, ModalFooter) */
    children: React.ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
  };

// ============================================================================
// MODAL HEADER PROPS
// ============================================================================

export type ModalHeaderProps = Omit<BoxProps, 'children'> & {
  /** Title text */
  title?: string | React.ReactNode;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Children (custom header content) */
  children?: React.ReactNode;
};

// ============================================================================
// MODAL BODY PROPS
// ============================================================================

export type ModalBodyProps = Omit<BoxProps, 'children'> & {
  /** Body content */
  children: React.ReactNode;
};

// ============================================================================
// MODAL FOOTER PROPS
// ============================================================================

export type ModalFooterProps = Omit<BoxProps, 'children'> & {
  /** Footer content (typically action buttons) */
  children: React.ReactNode;
};
