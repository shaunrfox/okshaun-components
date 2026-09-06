import { createContext, useContext } from 'react';

export type FloatingLayer = 'elevated' | 'modalFloating';

/** Semantic z-index layer inherited by floating content in this React subtree. */
export const FloatingLayerContext = createContext<FloatingLayer>('elevated');

/** Returns the semantic z-index layer for floating content in this subtree. */
export const useFloatingLayer = () => useContext(FloatingLayerContext);
