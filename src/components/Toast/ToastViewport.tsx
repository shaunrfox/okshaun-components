import { FloatingPortal } from '@floating-ui/react';

import { cx } from '@styled-system/css';
import { toast as toastRecipe } from '@styled-system/recipes';

import { Box, type BoxProps } from '~/components/Box';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';
import type { ToastRecord } from './context/toastContext';
import { Toast } from './Toast';

type ToastViewportOwnProps = {
  /** Toasts to render, oldest first. The last entry sits nearest the corner. */
  toasts: ToastRecord[];
  /** Called with a toast's id when that toast asks to be removed. */
  onDismiss: (id: string) => void;
};

/** Props accepted by {@link ToastViewport}. */
export type ToastViewportProps = Omit<
  BoxProps,
  keyof ToastViewportOwnProps | 'children'
> &
  ToastViewportOwnProps;

/**
 * Renders the fixed bottom-right toast stack in a portal.
 *
 * `ToastProvider` renders this internally; applications do not place it
 * themselves. The viewport is click-through, so only the toasts inside it
 * receive pointer events.
 */
export const ToastViewport = (props: ToastViewportProps) => {
  const { toasts, onDismiss, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = toastRecipe();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <FloatingPortal>
      {/*
       * No `reference`: toasts are queued imperatively from application code,
       * so there is no opening element to resolve a business object from.
       */}
      <DsChainPortalRoot>
        <Box
          {...dsComponent('ToastViewport')}
          className={cx(classes.viewport, className)}
          {...otherProps}
        >
          {toasts.map((entry) => (
            <Toast
              key={entry.id}
              tone={entry.tone}
              duration={entry.duration}
              dismissible={entry.dismissible ?? true}
              dismissLabel={entry.dismissLabel}
              primaryAction={entry.primaryAction}
              secondaryAction={entry.secondaryAction}
              state={entry.closing ? 'closing' : 'open'}
              onDismiss={() => onDismiss(entry.id)}
            >
              {entry.message}
            </Toast>
          ))}
        </Box>
      </DsChainPortalRoot>
    </FloatingPortal>
  );
};
