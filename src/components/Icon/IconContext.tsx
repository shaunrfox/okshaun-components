import { createContext, useContext } from 'react';

type IconConfigContextValue = {
  spritePath: string;
};

export const defaultIconConfigContextValue: IconConfigContextValue = {
  spritePath: '/sprite.svg',
};

export const IconConfigContext = createContext<IconConfigContextValue>(
  defaultIconConfigContextValue,
);

export const useIconConfig = () => useContext(IconConfigContext);
