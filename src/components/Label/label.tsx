import { Box, type BoxProps } from '../Box';
//import { Text, type TextProps } from '../Text';
import { label, type LabelVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type LabelProps = Omit<BoxProps, keyof LabelVariantProps> & LabelVariantProps & {
  htmlFor?: string;
  children?: string | React.ReactNode;
}

export const Label: React.FC<LabelProps> = (
  { 
    htmlFor, 
    children, 
    ...props 
  }: LabelProps,
) => {
  const [ className, otherProps ] = splitProps(props);
  return (
    <Box
      htmlFor={htmlFor}
      as="label" 
      className={cx(
        label({}),
        className,
      )} 
      {...otherProps}
    >
      {children}
    </Box>
  );
};
