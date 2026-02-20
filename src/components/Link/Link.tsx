import { cx } from '@styled-system/css';
import { type LinkVariantProps, link } from '@styled-system/recipes';
import type {
  FontSizeToken,
  FontToken,
  FontWeightToken,
} from '@styled-system/tokens';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon/Icon';

export type LinkProps = Omit<BoxProps, keyof LinkVariantProps> &
  LinkVariantProps & {
    href: string;
    external?: boolean;
    disabled?: boolean;
    size?: FontSizeToken;
    family?: FontToken;
    italic?: boolean;
    bold?: boolean;
    weight?: FontWeightToken;
    className?: string;
    children?: React.ReactNode;
  };

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Box
      as="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-disabled={disabled}
      className={cx(link({ family, italic, bold }), className)}
      fontSize={size}
      fontWeight={weight}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
      {external && <Icon name="arrow-square-out" size={'20'} />}
    </Box>
  );
};
