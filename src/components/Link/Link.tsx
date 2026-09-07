import { cx } from '@styled-system/css';
import { type LinkVariantProps, link } from '@styled-system/recipes';
import type {
  FontSizeToken,
  FontToken,
  FontWeightToken,
} from '@styled-system/tokens';
import type { MouseEvent, ReactNode } from 'react';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon/Icon';

/** Props accepted by {@link Link}. */
export type LinkProps = Omit<BoxProps, keyof LinkVariantProps> &
  LinkVariantProps & {
    /** Destination URL for the native anchor. */
    href: string;
    /** @default false */
    external?: boolean;
    /** @default false */
    disabled?: boolean;
    size?: FontSizeToken;
    /** @default "body" */
    family?: FontToken;
    /** @default false */
    italic?: boolean;
    /** @default false */
    bold?: boolean;
    /** Explicit font-weight token. */
    weight?: FontWeightToken;
    /** Additional class name merged with the link recipe class. */
    className?: string;
    /** Link label and inline content. */
    children?: ReactNode;
  };

/**
 * Navigates to another location using a native anchor.
 *
 * Set `external` for destinations that should open in a new tab. Use `Button`
 * for actions that do not navigate.
 *
 * @example
 * ```tsx
 * <Link href="/orders">View orders</Link>
 * ```
 */
export const Link = (props: LinkProps) => {
  const {
    href,
    external,
    disabled,
    children,
    size,
    family,
    weight,
    italic,
    bold,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Box
      {...dsComponent('Link')}
      as="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      // aria-disabled and tabIndex are needed to properly disable the link for accessibility
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={cx(link({ family, italic, bold, size, weight }), className)}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
      {external && <Icon name="arrow-square-out" size="20" fill="link" />}
    </Box>
  );
};
