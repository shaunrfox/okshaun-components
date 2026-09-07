import { cx } from '@styled-system/css';
import { type LabelVariantProps, label } from '@styled-system/recipes';
import type { ReactNode } from 'react';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';

export type LabelProps = Omit<BoxProps, keyof LabelVariantProps> &
  LabelVariantProps & {
    htmlFor: string;
    children?: string | ReactNode;
  };

export const Label = (props: LabelProps) => {
  const { htmlFor, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      {...dsComponent('Label')}
      as="label"
      htmlFor={htmlFor}
      className={cx(label({}), className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
