import type { ModalVariantProps } from '@styled-system/recipes';
import { useCallback, useId, useRef } from 'react';

import { dsComponent } from '~/utils/dsComponent';

import { Button } from '../Button';
import { Text } from '../Text';

import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalWrapper } from './ModalWrapper';

/** Visual intent for {@link ConfirmationModal} footer actions. */
export type ConfirmationModalType = 'default' | 'delete';

/** Props for {@link ConfirmationModal}, a non-form confirm/cancel dialog. */
export type ConfirmationModalProps = {
  /** Controlled dialog state. */
  open: boolean;
  /** Called when the dialog requests an open-state change. */
  onOpenChange: (open: boolean) => void;

  /** Alert dialog title rendered in {@link ModalHeader}. */
  title: string;
  /** Supporting message describing the action or consequence. */
  description: string;

  /** Label for the confirm action button. */
  confirmLabel: string;
  /** Label for the cancel button. @default 'Cancel' */
  cancelLabel?: string;
  /**
   * Visual treatment for the confirm action.
   * @default 'default'
   */
  type?: ConfirmationModalType;

  /**
   * Called when the user activates the confirm button. Async work, error
   * handling, and `confirmLoading` are consumer-owned — catch rejections and
   * clear loading in `finally` so the button does not stay stuck.
   */
  onConfirm: () => void | Promise<void>;
  /** Shows a loading state on the confirm button. */
  confirmLoading?: boolean;
  /** Disables the confirm button. */
  confirmDisabled?: boolean;

  /**
   * Prevents overlay clicks from closing the dialog.
   * Defaults to `false` for `default` and `true` for `delete`.
   */
  preventOverlayClose?: boolean;
  /**
   * Shows the header close button.
   * Defaults to `true` for `default` and `false` for `delete`.
   */
  showCloseButton?: boolean;
  /** Recipe size forwarded to {@link ModalWrapper}. @default 'sm' */
  size?: ModalVariantProps['size'];
};

const typeDefaults: Record<
  ConfirmationModalType,
  { preventOverlayClose: boolean; showCloseButton: boolean }
> = {
  default: {
    preventOverlayClose: false,
    showCloseButton: true,
  },
  delete: {
    preventOverlayClose: true,
    showCloseButton: false,
  },
};

/**
 * Renders a confirmation alert dialog with cancel and confirm actions.
 *
 * Dismiss paths (Cancel, Escape, overlay, close button) call
 * `onOpenChange(false)` only. They do not invoke `onConfirm`. Call
 * `onOpenChange(false)` from `onConfirm` when the action completes.
 *
 * For async confirms, catch errors and clear `confirmLoading` in `finally`.
 * This component does not swallow rejections from `onConfirm`.
 *
 * @example
 * ```tsx
 * <ConfirmationModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete item"
 *   description="This action cannot be undone."
 *   confirmLabel="Delete"
 *   type="delete"
 *   confirmLoading={confirmLoading}
 *   onConfirm={async () => {
 *     setConfirmLoading(true);
 *     try {
 *       await deleteItem();
 *       setOpen(false);
 *     } finally {
 *       setConfirmLoading(false);
 *     }
 *   }}
 * />
 * ```
 */
export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    open,
    onOpenChange,
    title,
    description,
    confirmLabel,
    cancelLabel = 'Cancel',
    type = 'default',
    onConfirm,
    confirmLoading = false,
    confirmDisabled = false,
    preventOverlayClose,
    showCloseButton,
    size = 'sm',
  } = props;

  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const defaults = typeDefaults[type];
  const resolvedPreventOverlayClose =
    preventOverlayClose ?? defaults.preventOverlayClose;
  const resolvedShowCloseButton = showCloseButton ?? defaults.showCloseButton;
  const confirmButtonVariant = type === 'delete' ? 'danger' : 'primary';

  const dismiss = useCallback(() => onOpenChange(false), [onOpenChange]);

  const handleConfirm = () => {
    void onConfirm();
  };

  return (
    <ModalWrapper
      {...dsComponent('ConfirmationModal')}
      open={open}
      onOpenChange={onOpenChange}
      size={size}
      preventOverlayClose={resolvedPreventOverlayClose}
      initialFocus={type === 'delete' ? cancelRef : undefined}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <ModalHeader
        title={title}
        titleId={titleId}
        showCloseButton={resolvedShowCloseButton}
      />
      <ModalBody {...dsComponent('ModalBody')}>
        <Text id={descriptionId}>{description}</Text>
      </ModalBody>
      <ModalFooter {...dsComponent('ModalFooter')}>
        <Button
          ref={cancelRef}
          type="button"
          variant="ghost"
          onClick={dismiss}
          disabled={confirmLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={confirmButtonVariant}
          onClick={handleConfirm}
          disabled={confirmDisabled || confirmLoading}
          loading={confirmLoading}
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
};
