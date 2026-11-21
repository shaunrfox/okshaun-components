import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ToastApi,
  ToastOptions,
  ToastRecord,
} from './context/toastContext';
import { ToastApiProvider } from './context/toastContext';
import { ToastViewport } from './ToastViewport';

/** Milliseconds a toast stays on screen when the caller does not say otherwise. */
const DEFAULT_DURATION = 5000;

/**
 * Toasts visible at once. A newer toast evicts the oldest rather than growing
 * the stack.
 */
const DEFAULT_LIMIT = 3;

/** Matches the `fast` duration token driving the toast exit animation. */
const EXIT_ANIMATION_MS = 150;

/** Props accepted by {@link ToastProvider}. */
export type ToastProviderProps = {
  /** Application subtree that may queue toasts with `useToast`. */
  children: ReactNode;
  /**
   * Default lifetime in milliseconds for toasts that do not set `duration`.
   * `danger` toasts ignore it and never time out.
   *
   * @default 5000
   */
  duration?: number;
  /**
   * Largest number of toasts shown at once. Queueing beyond this removes the
   * oldest toast immediately.
   *
   * @default 3
   */
  limit?: number;
};

/**
 * Hosts the toast stack and provides the imperative API that `useToast`
 * returns.
 *
 * Mount it once near the root of the application, around everything that may
 * raise a toast. It renders a fixed bottom-right viewport through a portal, so
 * it needs no layout position of its own.
 *
 * The provider — not the calling code — enforces the two rules that keep the
 * stack predictable: a `danger` toast never auto-dismisses, and no more than
 * `limit` toasts are on screen at once.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider = (props: ToastProviderProps) => {
  const {
    children,
    duration = DEFAULT_DURATION,
    limit = DEFAULT_LIMIT,
  } = props;

  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  // The ref is the authoritative queue. Reading it instead of the state value
  // keeps every mutation deterministic when several toasts are raised in one
  // tick, and keeps side effects out of state updater functions.
  const toastsRef = useRef<ToastRecord[]>([]);
  const nextIdRef = useRef(0);
  const exitTimersRef = useRef(
    new Map<string, ReturnType<typeof setTimeout>>(),
  );
  const defaultDurationRef = useRef(duration);
  const limitRef = useRef(limit);

  defaultDurationRef.current = duration;
  limitRef.current = limit;

  useEffect(() => {
    const timers = exitTimersRef.current;

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const commit = useCallback((next: ToastRecord[]) => {
    toastsRef.current = next;
    setToasts(next);
  }, []);

  const clearExitTimer = useCallback((id: string) => {
    const timer = exitTimersRef.current.get(id);

    if (timer) {
      clearTimeout(timer);
      exitTimersRef.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      const entry = toastsRef.current.find((item) => item.id === id);

      if (!entry || entry.closing) {
        return;
      }

      commit(
        toastsRef.current.map((item) =>
          item.id === id ? { ...item, closing: true } : item,
        ),
      );

      exitTimersRef.current.set(
        id,
        setTimeout(() => {
          exitTimersRef.current.delete(id);
          commit(toastsRef.current.filter((item) => item.id !== id));
          entry.onDismiss?.();
        }, EXIT_ANIMATION_MS),
      );
    },
    [commit],
  );

  const dismissAll = useCallback(() => {
    toastsRef.current.forEach((entry) => {
      dismiss(entry.id);
    });
  }, [dismiss]);

  const push = useCallback(
    (message: ReactNode, options: ToastOptions = {}): string => {
      nextIdRef.current += 1;
      const id = `toast-${String(nextIdRef.current)}`;
      const tone = options.tone ?? 'neutral';

      const record: ToastRecord = {
        ...options,
        id,
        tone,
        message,
        // A danger toast reports something the reader has to act on, so it is
        // pinned open here rather than left to each call site to remember.
        duration:
          tone === 'danger'
            ? null
            : (options.duration ?? defaultDurationRef.current),
        closing: false,
      };

      const queued = [...toastsRef.current, record];
      const overflow = queued.length - Math.max(1, limitRef.current);
      const evicted = overflow > 0 ? queued.slice(0, overflow) : [];

      evicted.forEach((entry) => clearExitTimer(entry.id));
      commit(overflow > 0 ? queued.slice(overflow) : queued);
      evicted.forEach((entry) => entry.onDismiss?.());

      return id;
    },
    [clearExitTimer, commit],
  );

  const api = useMemo<ToastApi>(() => {
    const trigger = (message: ReactNode, options?: ToastOptions): string =>
      push(message, options);

    return Object.assign(trigger, {
      info: (message: ReactNode, options?: Omit<ToastOptions, 'tone'>) =>
        push(message, { ...options, tone: 'info' as const }),
      success: (message: ReactNode, options?: Omit<ToastOptions, 'tone'>) =>
        push(message, { ...options, tone: 'success' as const }),
      warning: (message: ReactNode, options?: Omit<ToastOptions, 'tone'>) =>
        push(message, { ...options, tone: 'warning' as const }),
      danger: (message: ReactNode, options?: Omit<ToastOptions, 'tone'>) =>
        push(message, { ...options, tone: 'danger' as const }),
      neutral: (message: ReactNode, options?: Omit<ToastOptions, 'tone'>) =>
        push(message, { ...options, tone: 'neutral' as const }),
      dismiss,
      dismissAll,
    });
  }, [dismiss, dismissAll, push]);

  return (
    <ToastApiProvider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastApiProvider>
  );
};
