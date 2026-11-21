import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import { token } from '@styled-system/tokens';
import type { ReactNode } from 'react';

import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverContent}, the portalled floating panel. */
export type PopoverContentProps = Omit<BoxProps, 'children'> & {
  /** Popover panel content composed from Header, Body, Footer, and related parts. */
  children: ReactNode;
};

/**
 * Renders the portalled popover panel with dismiss behavior and optional focus
 * trapping.
 *
 * For `interaction="rich"`, focus is trapped inside the panel and restored to
 * the trigger on close. For `interaction="definition"`, there is no focus trap
 * and keyboard users cannot reach the content, so keep it non-interactive.
 * Escape and outside press dismiss the panel. Tone is visual only and never
 * sets `role="alert"`.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <PopoverHeader><PopoverTitle>Tip</PopoverTitle></PopoverHeader>
 *   <PopoverBody>Save often while editing.</PopoverBody>
 * </PopoverContent>
 * ```
 */
export const PopoverContent = (props: PopoverContentProps) => {
  const { children, ref, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const {
    open,
    interaction,
    showArrow,
    size,
    tone,
    floatingContext,
    floatingStyles,
    domReference,
    getFloatingProps,
    setFloatingRef,
    arrowRef,
    titleId,
    descriptionId,
  } = usePopoverContext();
  const floatingLayer = useFloatingLayer();
  const mergedRef = useMergeRefs([ref, setFloatingRef]);

  const classes = popover({ size, tone, layer: floatingLayer });
  const isRich = interaction === 'rich';

  if (!open) {
    return null;
  }

  // Surface stays neutral for all tones; accent is the left border only.
  const arrowFill = token.var('colors.surface.overlay');

  const panel = (
    <Box
      {...dsComponent('PopoverContent')}
      ref={mergedRef}
      className={cx(classes.content, className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      {...getFloatingProps(otherProps)}
      style={floatingStyles}
    >
      {children}
      {showArrow && (
        <FloatingArrow
          ref={arrowRef}
          context={floatingContext}
          fill={arrowFill}
          stroke={token.var('colors.border')}
          strokeWidth={1}
        />
      )}
    </Box>
  );

  return (
    <FloatingPortal>
      <DsChainPortalRoot reference={domReference}>
        {isRich ? (
          <FloatingFocusManager
            context={floatingContext}
            modal={true}
            returnFocus={true}
          >
            {panel}
          </FloatingFocusManager>
        ) : (
          panel
        )}
      </DsChainPortalRoot>
    </FloatingPortal>
  );
};
