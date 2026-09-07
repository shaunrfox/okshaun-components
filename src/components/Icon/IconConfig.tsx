import type { ReactNode } from 'react';

import {
  defaultIconConfigContextValue,
  IconConfigContext,
} from './IconContext';

/** Props for {@link IconProvider}. */
export type IconProviderProps = {
  /** Components that should resolve sprite symbols from this provider. */
  children: ReactNode;
  /**
   * URL or path to the SVG sprite file. This provider value applies to all
   * descendant `Icon` components.
   *
   * @default '/sprite.svg'
   */
  spritePath?: string;
};

/**
 * Configures the SVG sprite used by descendant {@link Icon} components.
 *
 * Use it at an application or embedded-library boundary when the default
 * `/sprite.svg` location is not available. Nested providers override the
 * sprite path for their own descendants.
 *
 * @example
 * ```tsx
 * <IconProvider spritePath="/assets/icons.svg">
 *   <App />
 * </IconProvider>
 * ```
 */
export const IconProvider = ({ children, spritePath }: IconProviderProps) => {
  return (
    <IconConfigContext.Provider
      value={{
        spritePath: spritePath ?? defaultIconConfigContextValue.spritePath,
      }}
    >
      {children}
    </IconConfigContext.Provider>
  );
};
