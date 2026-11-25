import { cx } from '@styled-system/css';
import {
  type PageBannerVariantProps,
  pageBanner,
} from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import type { ReactNode } from 'react';

import type { AlertTone } from '~/components/Alert';
import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { Text } from '~/components/Text';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Visual weight of a {@link PageBanner}. */
export type PageBannerEmphasis = 'subtle' | 'bold';

const toneIconNames: Record<AlertTone, IconNamesList> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'info',
};

const subtleIconColors: Record<AlertTone, ColorToken> = {
  info: 'icon.info',
  success: 'icon.success',
  warning: 'icon.warning',
  danger: 'icon.danger',
  neutral: 'icon.subtle',
};

type PageBannerOwnProps = {
  /** Semantic tone. Selects the surface, border, and tone icon. */
  /** @default "info" */
  tone?: AlertTone;
  /**
   * Visual weight. `subtle` tints the page edge; `bold` fills the banner with
   * the tone color and inverts text and icon for maximum contrast.
   *
   * @default "subtle"
   */
  emphasis?: PageBannerEmphasis;
  /** The banner message. */
  children: ReactNode;
  /** Leading action, normally a `Button`. */
  primaryAction?: ReactNode;
  /** Trailing action, normally a lower-emphasis `Button`. Render only alongside `primaryAction`. */
  secondaryAction?: ReactNode;
};

/** Props accepted by {@link PageBanner}. Includes compatible native element props. */
export type PageBannerProps = Omit<
  BoxProps,
  keyof PageBannerVariantProps | keyof PageBannerOwnProps
> &
  Omit<PageBannerVariantProps, 'tone'> &
  PageBannerOwnProps;

/**
 * States a system condition that affects the entire page, spanning its full
 * width.
 *
 * A page banner has no dismiss control by design: it describes a condition
 * that persists until it is resolved, so removing it is the application's
 * decision, not the reader's. Use `Alert` for a message scoped to one section.
 *
 * Renders a `div` with `role="alert"` when `tone` is `danger` and
 * `role="status"` otherwise. `tone="neutral"` uses the info icon.
 *
 * @example
 * ```tsx
 * <PageBanner tone="warning" emphasis="bold">
 *   Scheduled maintenance begins at 22:00 UTC.
 * </PageBanner>
 * ```
 */
export const PageBanner = (props: PageBannerProps) => {
  const {
    tone = 'info',
    emphasis = 'subtle',
    children,
    primaryAction,
    secondaryAction,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = pageBanner({ tone });

  const isBold = emphasis === 'bold';
  const iconName = toneIconNames[tone];
  const iconColor: ColorToken = isBold
    ? 'icon.inverse'
    : subtleIconColors[tone];
  const textColor: ColorToken = isBold ? 'text.inverse' : 'text';
  const hasActions = Boolean(primaryAction ?? secondaryAction);

  return (
    <Box
      {...dsComponent('PageBanner')}
      role={tone === 'danger' ? 'alert' : 'status'}
      data-emphasis={emphasis}
      className={cx(classes.root, className)}
      {...otherProps}
    >
      <Box className={classes.icon}>
        <Icon name={iconName} size="20" fill={iconColor} aria-hidden="true" />
      </Box>
      <Box className={classes.content}>
        <Text textStyle="sans.sm" color={textColor} className={classes.message}>
          {children}
        </Text>
      </Box>
      {hasActions && (
        <Box className={classes.actions}>
          {primaryAction}
          {secondaryAction}
        </Box>
      )}
    </Box>
  );
};
