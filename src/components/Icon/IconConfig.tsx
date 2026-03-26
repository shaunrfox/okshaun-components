import type { ReactNode } from 'react';

import {
  defaultIconConfigContextValue,
  IconConfigContext,
} from './IconContext';

export type IconProviderProps = {
  children: ReactNode;
  spritePath?: string;
};

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
