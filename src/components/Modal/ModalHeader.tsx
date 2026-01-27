import { Box, type BoxProps } from '../Box';
import { IconButton } from '../IconButton';
import { modal as modalRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useModalContext } from './ModalContext';
import { Heading } from '../Heading';

export type ModalHeaderProps = Omit<BoxProps, 'children'> & {
  /** Title text */
  title?: string | React.ReactNode;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Children (custom header content) */
  children?: React.ReactNode;
};

export const ModalHeader = (props: ModalHeaderProps) => {
  const { title, showCloseButton = true, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe();
  const { onClose } = useModalContext();

  return (
    <Box className={cx(classes.header, className)} {...otherProps}>
      {children ? (
        children
      ) : (
        <>
          {title && (
            <Heading
              level="h3"
              textStyle="heading.xs"
              className={classes.title}
            >
              {title}
            </Heading>
          )}
          {showCloseButton && (
            <IconButton
              appearance="subtle"
              onClick={onClose}
              aria-label="Close dialog"
              className={classes.closeButton}
              iconName="x"
            />
          )}
        </>
      )}
    </Box>
  );
};
