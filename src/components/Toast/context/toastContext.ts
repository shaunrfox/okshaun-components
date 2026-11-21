import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { AlertTone } from '~/components/Alert';

/** Options accepted when queueing a toast through {@link useToast}. */
export type ToastOptions = {
  /**
   * Semantic tone. `danger` is never auto-dismissed, whatever `duration` says.
   *
   * @default "neutral"
   */
  tone?: AlertTone;
  /**
   * Milliseconds the toast stays on screen before it dismisses itself. The
   * countdown pauses while the toast is hovered or holds focus. Ignored for
   * `tone: 'danger'`, which the provider always pins open.
   *
   * @default 5000
   */
  duration?: number;
  /** Leading action, normally a `Button`. */
  primaryAction?: ReactNode;
  /** Trailing action, normally a lower-emphasis `Button`. */
  secondaryAction?: ReactNode;
  /**
   * Shows the close control.
   *
   * @default true
   */
  dismissible?: boolean;
  /** Accessible label for the close control. @default "Dismiss" */
  dismissLabel?: string;
  /** Runs once the toast leaves the stack, whether it timed out or was closed. */
  onDismiss?: () => void;
};

/** A queued toast as the provider stores it. */
export type ToastRecord = Omit<ToastOptions, 'duration' | 'tone'> & {
  /** Identifier returned by the queueing call and accepted by `toast.dismiss`. */
  id: string;
  /** Resolved tone. */
  tone: AlertTone;
  /** Message content. */
  message: ReactNode;
  /** Resolved lifetime in milliseconds, or `null` when the toast never times out. */
  duration: number | null;
  /** True once the exit animation has started and the toast is leaving. */
  closing: boolean;
};

/** Queues a toast and returns its identifier. */
export type ToastTrigger = (
  message: ReactNode,
  options?: Omit<ToastOptions, 'tone'>,
) => string;

/**
 * Imperative toast API returned by {@link useToast}.
 *
 * Call it directly for full control, or use a tone shorthand. Every queueing
 * call returns the new toast's id.
 */
export type ToastApi = {
  (message: ReactNode, options?: ToastOptions): string;
  /** Queues an `info` toast. */
  info: ToastTrigger;
  /** Queues a `success` toast. */
  success: ToastTrigger;
  /** Queues a `warning` toast. */
  warning: ToastTrigger;
  /** Queues a `danger` toast. Danger toasts never auto-dismiss. */
  danger: ToastTrigger;
  /** Queues a `neutral` toast, which uses the info icon and a neutral surface. */
  neutral: ToastTrigger;
  /** Starts the exit animation for one toast. Unknown ids are ignored. */
  dismiss: (id: string) => void;
  /** Starts the exit animation for every toast currently on screen. */
  dismissAll: () => void;
};

const ToastApiContext = createContext<ToastApi | null>(null);

/** Internal provider for the imperative toast API. */
export const ToastApiProvider = ToastApiContext.Provider;

/**
 * Returns the imperative toast API for the nearest `ToastProvider`.
 *
 * @throws When called outside a `ToastProvider`.
 */
export const useToastApi = (): ToastApi => {
  const api = useContext(ToastApiContext);

  if (!api) {
    throw new Error('useToast must be called inside a <ToastProvider>.');
  }

  return api;
};
