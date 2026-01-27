import React from 'react';
import { Box, type BoxProps } from '../Box';
//import { Text, type TextProps } from '../Text';
import { label, type LabelVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

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
