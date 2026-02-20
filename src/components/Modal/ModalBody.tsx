import { cx } from '@styled-system/css';
import { modal as modalRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';

export type ModalBodyProps = Omit<BoxProps, 'children'> & {
  /** Body content */
  children: React.ReactNode;
};

export const ModalBody = (props: ModalBodyProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe();

  return (
    <Box className={cx(classes.body, className)} {...otherProps}>
      {children}
    </Box>
  );
};
