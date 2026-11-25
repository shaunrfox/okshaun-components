import { cx } from '@styled-system/css';
import { type AlertVariantProps, alert } from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/**
 * Semantic tone shared by every notification component.
 *
 * `neutral` renders the info icon: it marks the message as informational
 * without claiming a state.
 */
export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

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

type AlertDismissProps =
  | {
      /** Adds a close control. The alert does not remove itself. */
      dismissible: true;
      /** Runs when the close control is activated. */
      onDismiss: () => void;
    }
  | {
      /** @default false */
      dismissible?: false;
      onDismiss?: never;
    };

type AlertOwnProps = {
  /** Semantic tone. Selects the surface, border, and tone icon. */
  /** @default "info" */
  tone?: AlertTone;
  /** Optional bold title rendered above the message. It does not create a document heading. */
  title?: string;
  /** The alert message. */
  children: ReactNode;
  /** Leading action, normally a `Button`. */
  primaryAction?: ReactNode;
  /** Trailing action, normally a lower-emphasis `Button`. Render only alongside `primaryAction`. */
  secondaryAction?: ReactNode;
  /** Accessible label for the close control. @default "Dismiss" */
  dismissLabel?: string;
} & AlertDismissProps;

/** Props accepted by {@link Alert}. Includes compatible native element props. */
export type AlertProps = Omit<
  BoxProps,
  keyof AlertVariantProps | keyof AlertOwnProps
> &
  Omit<AlertVariantProps, 'tone'> &
  AlertOwnProps;

/**
 * Announces a state or outcome inline, in the flow of the section it concerns.
 *
 * Use `Alert` for blocking feedback the user must read before continuing and
 * for section-level awareness. Use `PageBanner` for a system condition that
 * affects the whole page, `Toast` for transient non-blocking feedback, and
 * `InlineNote` for guidance attached to a single form field.
 *
 * Renders a `div` with `role="alert"` when `tone` is `danger` so assistive
 * technology interrupts, and `role="status"` otherwise so it announces
 * politely. `tone="neutral"` uses the info icon.
 *
 * @example
 * ```tsx
 * <Alert tone="danger" title="Could not save" dismissible onDismiss={clear}>
 *   The server rejected the request.
 * </Alert>
 * ```
 */
export const Alert = (props: AlertProps) => {
  const { labels } = useLocale();
  const {
    tone = 'info',
    title,
    children,
    primaryAction,
    secondaryAction,
    dismissible = false,
    onDismiss,
    dismissLabel = labels.dismiss,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = alert({ tone });

  const iconName = toneIconNames[tone];
  const hasActions = Boolean(primaryAction ?? secondaryAction);

  return (
    <Box
      {...dsComponent('Alert')}
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx(classes.root, className)}
      {...otherProps}
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
        {title && (
          <Text
            as="div"
            textStyle="sans.md"
            fontWeight="bold"
            lineHeight="tight"
            color="text.bold"
            className={classes.title}
          >
            {title}
          </Text>
        )}
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
