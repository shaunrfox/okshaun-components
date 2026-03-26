import { css, cx } from '@styled-system/css';
import { type AvatarVariantProps, avatar } from '@styled-system/recipes';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { type AllowedIconSizes, Icon } from '~/components/Icon';
import { splitProps } from '~/utils/splitProps';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type AvatarShape = 'circle' | 'square' | 'hexagon';

export type AvatarPresence = 'online' | 'busy' | 'offline' | 'focus';

export type AvatarStatus = 'approved' | 'declined' | 'locked';

export type AvatarProps = Omit<BoxProps, keyof AvatarVariantProps> &
  Omit<AvatarVariantProps, 'size' | 'shape'> & {
    /** Image source URL */
    src?: string;
    /** Alt text for image */
    alt?: string;
    /** Name for generating initials fallback */
    name?: string;
    /** Size of the avatar */
    size?: AvatarSize;
    /** Shape of the avatar */
    shape?: AvatarShape;
    /** Presence indicator (bottom-right) */
    presence?: AvatarPresence;
    /** Status indicator (top-right) */
    status?: AvatarStatus;
    /** Custom fallback content (overrides initials) */
    fallback?: ReactNode;
    /** Border color for the avatar */
    borderColor?: BoxProps['borderColor'];
  };

// Presence indicator colors
const presenceStyles: Record<AvatarPresence, string> = {
  online: css({ bg: 'bg.success.bold' }),
  busy: css({ bg: 'bg.danger.bold' }),
  offline: css({ bg: 'bg.neutral.bold' }),
  focus: css({ bg: 'bg.brand.bold' }),
};

// Status indicator colors
const statusStyles: Record<AvatarStatus, string> = {
  approved: css({ bg: 'bg.success.bold', color: 'icon.inverse' }),
  declined: css({ bg: 'bg.danger.bold', color: 'icon.inverse' }),
  locked: css({ bg: 'bg.neutral.bold', color: 'icon.inverse' }),
};

// Map size to status icon size
const sizeToStatusIconSize: Record<AvatarSize, AllowedIconSizes> = {
  xs: '8',
  sm: '10',
  md: '12',
  lg: '14',
  xl: '16',
  '2xl': '20',
};

/**
 * Get initials from a name string.
 * - Single word: first letter
 * - Multiple words: first letter of first and last word
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) {
    return '';
  }
  if (parts.length === 1) {
    return parts[0].charAt(0);
  }
  const lastPart = parts[parts.length - 1];
  return parts[0].charAt(0) + (lastPart ? lastPart.charAt(0) : '');
}

/**
 * Avatar component for displaying user or entity images with optional
 * presence and status indicators.
 */
export const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt = '',
    name,
    size = 'md' as AvatarSize,
    shape = 'circle' as AvatarShape,
    presence,
    status,
    fallback,
    borderColor,
    ref,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  // Type-safe size for indexing
  const safeSize = size as AvatarSize;
  const classes = avatar({ size: safeSize, shape });

  // Determine what to show: image, fallback, or initials
  const showImage = Boolean(src) && failedSrc !== src;
  const isImageLoaded = Boolean(src) && loadedSrc === src;
  const initials = name ? getInitials(name) : null;

  // Get icon size based on avatar size
  const iconSize = sizeToStatusIconSize[safeSize];

  return (
    <Box
      as="span"
      ref={ref}
      className={cx(classes.root, className)}
      borderColor={borderColor}
      {...otherProps}
    >
      {/* Image */}
      {showImage && (
        <Box
          as="img"
          src={src}
          alt={alt}
          className={classes.image}
          onError={() => {
            if (!src) {
              return;
            }

            setFailedSrc(src);
            setLoadedSrc(null);
          }}
          onLoad={() => {
            if (!src) {
              return;
            }

            setLoadedSrc(src);
            setFailedSrc(null);
          }}
          opacity={isImageLoaded ? 1 : 0}
        />
      )}

      {/* Fallback content (shown when no image or image failed) */}
      {(!showImage || !isImageLoaded) && (
        <Box as="span" className={classes.fallback}>
          {fallback || initials || <Icon name="user" />}
        </Box>
      )}

      {/* Presence indicator */}
      {presence && (
        <Box
          as="span"
          className={cx(
            classes.presence,
            presenceStyles[presence as AvatarPresence],
          )}
        />
      )}

      {/* Status indicator */}
      {status && (
        <Box
          as="span"
          className={cx(classes.status, statusStyles[status as AvatarStatus])}
        >
          {status === 'approved' && (
            <Icon name="check" size={iconSize} fill="icon.inverse" />
          )}
          {status === 'declined' && (
            <Icon name="x" size={iconSize} fill="icon.inverse" />
          )}
          {status === 'locked' && (
            <Icon name="lock" size={iconSize} fill="icon.inverse" />
          )}
        </Box>
      )}
    </Box>
  );
};
