import { useContext } from 'react';

import { LocaleContext } from './locale-context';

/**
 * Returns the active locale and built-in labels.
 *
 * Works without a {@link LocaleProvider}: it then returns `en-US` and the
 * English defaults.
 *
 * @example
 * ```tsx
 * const { locale, labels } = useLocale();
 * ```
 */
export function useLocale() {
  return useContext(LocaleContext);
}
