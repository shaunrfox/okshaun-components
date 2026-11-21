import { cx } from '@styled-system/css';
import {
  type ToastVariantProps,
  toast as toastRecipe,
} from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import type { AlertTone } from '~/components/Alert';
import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

const toneIconNames: Record<AlertTone, IconNamesList> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'info',
};

const toneIconColors: Record<AlertTone, ColorToken> = {
  info: 'icon.info',
  success: 'icon.success',
  warning: 'icon.warning',
  danger: 'icon.danger',
  neutral: 'icon.subtle',
};

type ToastDismissProps =
  | {
      /** Shows the close control. */
      /** @default true */
      dismissible?: true;
      /** Runs when the close control is activated or `duration` elapses. */
      onDismiss: () => void;
    }
  | {
      dismissible: false;
      /** Optional callback used by `duration` when no close control is shown. */
      onDismiss?: () => void;
    };

type ToastOwnProps = {
  /** Semantic tone. Selects the leading accent and the tone icon. */
  /** @default "neutral" */
  tone?: AlertTone;
  /** The toast message. */
  children: ReactNode;
  /** Leading action, normally a `Button`. */
  primaryAction?: ReactNode;
  /** Trailing action, normally a lower-emphasis `Button`. Render only alongside `primaryAction`. */
  secondaryAction?: ReactNode;
  /**
   * Milliseconds before the toast calls `onDismiss` by itself. The countdown
   * pauses while the toast is hovered or contains focus and resumes from the
   * remaining time. Pass `null`, or omit it, for a toast that never times out.
   * `ToastProvider` supplies this value and always passes `null` for
   * `tone: 'danger'`.
   */
  duration?: number | null;
  /** Accessible label for the close control. @default "Dismiss" */
  dismissLabel?: string;
  /**
   * Animation phase. `closing` plays the exit animation; the owner removes the
   * toast once it finishes.
   *
   * @default "open"
   */
  state?: 'open' | 'closing';
} & ToastDismissProps;

/** Props accepted by {@link Toast}. Includes compatible native element props. */
export type ToastProps = Omit<
  BoxProps,
  keyof ToastVariantProps | keyof ToastOwnProps
> &
  Omit<ToastVariantProps, 'tone'> &
  ToastOwnProps;

/**
 * Confirms a non-blocking outcome in a transient, floating message.
 *
 * Applications normally queue toasts imperatively with `useToast` rather than
 * rendering this component, which is the presentation for one entry in a
 * `ToastProvider` stack. Render it directly only to place a toast outside that
 * stack. Use `Alert` when the message must stay until it is read.
 *
 * Renders a `div` with `role="alert"` when `tone` is `danger` and
 * `role="status"` otherwise. `tone="neutral"` uses the info icon.
 *
 * @example
 * ```tsx
 * <Toast tone="success" duration={5000} onDismiss={remove}>Saved</Toast>
 * ```
 */
export const Toast = (props: ToastProps) => {
  const { labels } = useLocale();
  const {
    tone = 'neutral',
    children,
    primaryAction,
    secondaryAction,
    dismissible = true,
    onDismiss,
    duration = null,
    dismissLabel = labels.dismiss,
    state = 'open',
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = toastRecipe({ tone });

  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const paused = hovered || focusWithin;
  const remainingRef = useRef<number>(duration ?? 0);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // Reseed the budget whenever the caller changes the lifetime. Declared before
  // the timer effect so a new `duration` is in place before the timer restarts.
  useEffect(() => {
    remainingRef.current = duration ?? 0;
  }, [duration]);

  useEffect(() => {
    if (duration === null || paused || state === 'closing') {
      return;
    }

    const startedAt = Date.now();
    const timer = setTimeout(() => {
      remainingRef.current = 0;
      onDismissRef.current?.();
    }, remainingRef.current);

    return () => {
      clearTimeout(timer);
      // Bank the unspent time so a resume continues instead of restarting.
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAt),
      );
    };
  }, [duration, paused, state]);

  const iconName = toneIconNames[tone];
  const hasActions = Boolean(primaryAction ?? secondaryAction);

  return (
    <Box
      {...dsComponent('Toast')}
      role={tone === 'danger' ? 'alert' : 'status'}
      aria-atomic="true"
      data-state={state}
      data-paused={paused ? 'true' : undefined}
      className={cx(classes.root, className)}
      {...otherProps}
      // Consumer handlers run alongside the pause logic, never instead of it,
      // so an analytics listener cannot let the toast time out while hovered.
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setFocusWithin(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!event.currentTarget.contains(nextTarget)) {
          setFocusWithin(false);
        }
        onBlur?.(event);
      }}
    >
      <Box className={classes.icon}>
        <Icon
          name={iconName}
          size="20"
          fill={toneIconColors[tone]}
          aria-hidden="true"
        />
      </Box>
      <Box className={classes.content}>
        <Text
          textStyle="sans.sm"
          lineHeight="tight"
          color="text"
          className={classes.message}
        >
          {children}
        </Text>
        {hasActions && (
          <Box className={classes.actions}>
            {primaryAction}
            {secondaryAction}
          </Box>
        )}
      </Box>
      {dismissible && (
        <IconButton
          variant="ghost"
          size="sm"
          iconName="x"
          altText={dismissLabel}
          onClick={onDismiss}
          className={classes.dismiss}
        />
      )}
    </Box>
  );
};
