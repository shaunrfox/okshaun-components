import { ReactNode, ElementType } from 'react';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import type {
  FontToken,
  FontSizeToken,
  FontWeightToken,
} from '@styled-system/tokens';
import { text, type TextVariantProps } from '@styled-system/recipes';

export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & {
    italic?: boolean;
    family?: FontToken;
    bold?: boolean;
    underline?: boolean;
    size?: FontSizeToken;
    weight?: FontWeightToken;
    children?: string | ReactNode;
    as?: ElementType;
  };

export const Text = (props: TextProps) => {
  const {
    as = 'span',
    italic,
    family,
    bold,
    underline,
    size,
    weight,
    children,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      as={as}
      className={cx(
        text({ family, bold, underline, italic }),
        className as string,
      )}
      fontSize={size}
      fontWeight={weight}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
