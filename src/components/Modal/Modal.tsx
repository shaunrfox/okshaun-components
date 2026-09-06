import type { ModalVariantProps } from '@styled-system/recipes';

import {
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
  useForm,
} from '@tanstack/react-form';
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
} from 'react';

import { dsComponent } from '~/utils/dsComponent';

import { Button } from '../Button';

import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalWrapper } from './ModalWrapper';

/** TanStack Form instance passed to {@link Modal} children. */
export type ModalFormApi<TFormData extends Record<string, unknown>> =
  ReactFormExtendedApi<
    TFormData,
    FormValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    FormAsyncValidateOrFn<TFormData> | undefined,
    unknown
  >;

/** Context passed to {@link ModalProps.onSubmit}. */
export type ModalSubmitContext<TFormData extends Record<string, unknown>> = {
  /** Validated form values from TanStack Form. */
  value: TFormData;
  /** Requests closing through the modal's `onOpenChange(false)`. */
  close: () => void;
};

/** Props for {@link Modal}, a pre-built form dialog. */
export type ModalProps<TFormData extends Record<string, unknown>> = {
  /** Controlled dialog state. */
  open: boolean;
  /** Called when the dialog requests an open-state change. */
  onOpenChange: (open: boolean) => void;

  /** Visible dialog title rendered in {@link ModalHeader}. */
  title: string;
  /**
   * Default field values passed to TanStack Form. Reseeded via `form.reset`
   * whenever `open` changes. To edit a different record while the dialog stays
   * open, remount with `key={recordId}`.
   */
  defaultValues: TFormData;
  /**
   * Called after TanStack Form validation succeeds. Call `close()` when the
   * action completes and the dialog should dismiss.
   */
  onSubmit: (context: ModalSubmitContext<TFormData>) => void | Promise<void>;
  /** Render prop receiving the modal's TanStack Form instance for field wiring. */
  children: (form: ModalFormApi<TFormData>) => ReactNode;

  /** Label for the default primary submit button. @default 'Submit' */
  submitLabel?: string;
  /** Label for the default cancel button. @default 'Cancel' */
  cancelLabel?: string;
  /** Additional disable flag applied to the default submit button. */
  submitDisabled?: boolean;
  /** Replaces the default cancel/submit footer. Submit wiring is consumer-owned. */
  footer?: ReactNode;

  /** Recipe size forwarded to {@link ModalWrapper}. @default 'md' */
  size?: ModalVariantProps['size'];
  /** Prevents overlay clicks from closing the dialog. @default false */
  preventOverlayClose?: boolean;
  /** Shows the header close button. @default true */
  showCloseButton?: boolean;
};

/**
 * Renders a form modal with a title, TanStack Form wiring, and default footer
 * actions.
 *
 * Validation and error display are consumer-owned: define validators on
 * `form.Field` and map field meta to {@link FormField}. Call `close()` from
 * `onSubmit` when the dialog should dismiss after a successful action. Form
 * values reset to the current `defaultValues` when `open` changes.
 *
 * @example
 * ```tsx
 * <Modal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Create process"
 *   submitLabel="Create"
 *   defaultValues={{ name: '' }}
 *   onSubmit={async ({ value, close }) => {
 *     await createProcess(value.name);
 *     close();
 *   }}
 * >
 *   {(form) => (
 *     <form.Field name="name">
 *       {(field) => (
 *         <FormField label="Name" labelFor="name">
 *           <TextInput
 *             id="name"
 *             value={field.state.value}
 *             onChange={(e) => field.handleChange(e.target.value)}
 *           />
 *         </FormField>
 *       )}
 *     </form.Field>
 *   )}
 * </Modal>
 * ```
 */
export const Modal = <TFormData extends Record<string, unknown>>(
  props: ModalProps<TFormData>,
) => {
  const {
    open,
    onOpenChange,
    title,
    defaultValues,
    onSubmit,
    children,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    submitDisabled = false,
    footer,
    size,
    preventOverlayClose,
    showCloseButton = true,
  } = props;

  const titleId = useId();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit({ value, close });
    },
  });

  // Keyed on `open` so opening seeds the latest defaults and closing clears
  // dirty state, without resetting mid-edit when a parent passes a new
  // defaultValues object on every render. Cetec suppresses this with an
  // eslint-disable comment; okshaun lints with Biome, which needs its own.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset must run only when `open` changes
  useEffect(() => {
    form.reset(defaultValues);
  }, [form, open]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  const formBody = (
    <ModalBody {...dsComponent('ModalBody')}>{children(form)}</ModalBody>
  );

  const defaultFooter = (
    <ModalFooter {...dsComponent('ModalFooter')}>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <>
            <Button type="button" variant="ghost" onClick={close}>
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!canSubmit || submitDisabled}
              loading={isSubmitting}
            >
              {submitLabel}
            </Button>
          </>
        )}
      </form.Subscribe>
    </ModalFooter>
  );

  return (
    <ModalWrapper
      {...dsComponent('Modal')}
      open={open}
      onOpenChange={onOpenChange}
      size={size}
      preventOverlayClose={preventOverlayClose}
      aria-labelledby={titleId}
    >
      <ModalHeader
        title={title}
        titleId={titleId}
        showCloseButton={showCloseButton}
      />
      {footer ? (
        <>
          <form onSubmit={handleFormSubmit}>{formBody}</form>
          <ModalFooter {...dsComponent('ModalFooter')}>{footer}</ModalFooter>
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {formBody}
          {defaultFooter}
        </form>
      )}
    </ModalWrapper>
  );
};
