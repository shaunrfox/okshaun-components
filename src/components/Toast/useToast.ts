import { type ToastApi, useToastApi } from './context/toastContext';

/**
 * Returns the imperative toast API for the nearest `ToastProvider`.
 *
 * Call the returned value directly for full control, or use a tone shorthand.
 * Every queueing call returns the new toast's id, which `dismiss` accepts.
 * Queueing during render is not supported; call it from an event handler or an
 * effect.
 *
 * @throws When called outside a `ToastProvider`.
 *
 * @example
 * ```tsx
 * const toast = useToast();
 * const id = toast.danger('Could not save', { primaryAction: <Button onClick={retry}>Retry</Button> });
 * ```
 */
export const useToast = (): ToastApi => useToastApi();
