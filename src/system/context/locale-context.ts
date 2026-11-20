import { createContext } from 'react';

import { defaultLocaleLabels, type LocaleLabels } from './locale-labels';

/** Value returned by {@link useLocale} and provided by {@link LocaleProvider}. */
export interface LocaleContextType {
  /**
   * BCP 47 locale tag, such as `en-US` or `fr-FR`, for `Intl` formatting in
   * date components.
   */
  locale: string;
  /** Built-in component text, with every entry resolved. */
  labels: LocaleLabels;
}

/** Locale used when no {@link LocaleProvider} is present. */
export const DEFAULT_LOCALE = 'en-US';

/**
 * Context backing {@link LocaleProvider}; prefer {@link useLocale} in
 * components. Defaults to `en-US` and English labels, so components work
 * without a provider.
 */
export const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  labels: defaultLocaleLabels,
});
