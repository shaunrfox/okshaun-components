import { Box, type BoxProps } from '../Box';
import { modal as modalRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

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
