import React, { type ElementType } from 'react';
import { Box, type BoxProps } from '~/components/Box';
import type {
  FontToken,
  FontSizeToken,
  FontWeightToken,
} from '@styled-system/tokens';
import { text, type TextVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & {
    italic?: boolean;
    family?: FontToken;
    bold?: boolean;
    underline?: boolean;
    size?: FontSizeToken;
    weight?: FontWeightToken;
    children?: string | React.ReactNode;
    as?: ElementType;
    className?: string;
  };

export const Text: React.FC<TextProps> = ({
  as = 'p',
  italic,
  family,
  bold,
  underline,
  size,
  weight,
  children,
  ...props
}: TextProps) => {
  const [className, otherProps] = splitProps(props);

  return (
    <Box
      as={as}
      className={cx(
        text({ family, bold, underline, italic, size, weight }),
        className as string,
      )}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
