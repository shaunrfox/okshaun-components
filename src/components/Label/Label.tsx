import { cx } from '@styled-system/css';
//import { Text, type TextProps } from '../Text';
import { type LabelVariantProps, label } from '@styled-system/recipes';
import type React from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';

export type LabelProps = Omit<BoxProps, keyof LabelVariantProps> &
  LabelVariantProps & {
    htmlFor?: string;
    children?: string | React.ReactNode;
  };

export const Label = (props: LabelProps) => {
  const { htmlFor, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="label"
      htmlFor={htmlFor}
      className={cx(label({}), className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
