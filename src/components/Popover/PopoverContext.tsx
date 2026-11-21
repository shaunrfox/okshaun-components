import type {
  FloatingContext,
  Placement,
  ReferenceType,
} from '@floating-ui/react';
import {
  type CSSProperties,
  createContext,
  type Dispatch,
  type MutableRefObject,
  type RefCallback,
  type SetStateAction,
  useContext,
} from 'react';

/** Handbook-style visual tones. Visual only — never maps to `role="alert"`. */
export type PopoverTone = 'note' | 'tip' | 'warning' | 'important' | 'caution';

/** How the popover opens and manages focus. */
export type PopoverInteraction = 'definition' | 'rich';

/** Content size. Wider than Tooltip (`240`). */
export type PopoverSize = 'sm' | 'md' | 'lg';

/** Shared state for {@link Popover} compound parts. */
export type PopoverContextValue = {
  /** Whether the floating content is open. */
  open: boolean;
  /** Updates open state for controlled or uncontrolled usage. */
  setOpen: (open: boolean) => void;
  /**
   * Interaction mode.
   * - `definition`: hover + focus, no focus trap
   * - `rich`: click, focus trap + restore focus
   */
  interaction: PopoverInteraction;
  /** Preferred placement relative to the reference. */
  placement: Placement;
  /** Gap between reference and content, in pixels. */
  offset: number;
  /** Whether the arrow is rendered inside content. */
  showArrow: boolean;
  /** Recipe size for the content panel. */
  size: PopoverSize;
  /** Optional visual tone for the content panel. */
  tone?: PopoverTone;
  /** Floating UI context for interactions and focus management. */
  floatingContext: FloatingContext;
  /** Floating UI refs used by Trigger, Anchor, and Content. */
  refs: {
    setReference: (node: ReferenceType | null) => void;
    setFloating: (node: HTMLElement | null) => void;
    setPositionReference: (node: ReferenceType | null) => void;
  };
  /** Position styles for the floating content. */
  floatingStyles: CSSProperties;
  /** DOM reference element used for portal ancestry. */
  domReference: Element | null;
  /** Interaction props for the trigger. */
  getReferenceProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  /** Interaction props for the floating content. */
  getFloatingProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  /** Ref for the Floating UI arrow element. */
  arrowRef: MutableRefObject<SVGSVGElement | null>;
  /** Optional id for the title (`aria-labelledby`). */
  titleId: string | undefined;
  setTitleId: Dispatch<SetStateAction<string | undefined>>;
  /** Optional id for the description (`aria-describedby`). */
  descriptionId: string | undefined;
  setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
  /** Whether an explicit Anchor is mounted for positioning. */
  hasAnchor: boolean;
  setHasAnchor: Dispatch<SetStateAction<boolean>>;
  /** Ref callback helpers for merging consumer refs. */
  setReferenceRef: RefCallback<Element>;
  setFloatingRef: RefCallback<HTMLElement>;
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);

/**
 * Returns shared state from the closest parent {@link Popover}.
 *
 * Call only in a Popover descendant; it throws when no popover context is present.
 *
 * @example
 * ```tsx
 * const { setOpen } = usePopoverContext();
 * ```
 */
export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a <Popover> root');
  }
  return context;
};
