import { useCallback, useEffect, useRef, useState } from 'react';

/** Options accepted by {@link useClipboard}. */
export type UseClipboardOptions = {
  /**
   * Milliseconds that `copied` stays `true` after a successful copy.
   *
   * @default 2000
   */
  timeout?: number;
};

/** Value returned by {@link useClipboard}. */
export type UseClipboardReturn = {
  /**
   * Writes the text to the system clipboard. Resolves `true` on success and
   * `false` when the browser denies access or has no Clipboard API.
   */
  copy: (text: string) => Promise<boolean>;
  /** `true` for `timeout` milliseconds after the last successful copy. */
  copied: boolean;
  /** `true` when the last copy attempt failed. Cleared by the next attempt. */
  failed: boolean;
};

/**
 * Copies text to the clipboard and reports a short-lived `copied` state for
 * feedback.
 *
 * Uses `navigator.clipboard.writeText`, which requires a secure context
 * (HTTPS or localhost) and a user gesture. The hook does not announce the
 * result; pair `copied` with visible feedback and a polite live region, as
 * `CodeBlock` does.
 *
 * @example
 * ```tsx
 * const { copy, copied } = useClipboard();
 * <Button onClick={() => copy(secret)}>{copied ? 'Copied' : 'Copy'}</Button>
 * ```
 */
export function useClipboard(
  options: UseClipboardOptions = {},
): UseClipboardReturn {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Counts copy attempts so a slow, older attempt cannot overwrite the
  // result of a newer one.
  const attemptRef = useRef(0);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      const attempt = ++attemptRef.current;
      if (timerRef.current) clearTimeout(timerRef.current);
      setFailed(false);

      try {
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
          throw new Error('Clipboard API is not available.');
        }
        await navigator.clipboard.writeText(text);
      } catch {
        if (attempt !== attemptRef.current) return false;
        setCopied(false);
        setFailed(true);
        return false;
      }

      if (attempt !== attemptRef.current) return true;
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeout);
      return true;
    },
    [timeout],
  );

  return { copy, copied, failed };
}
