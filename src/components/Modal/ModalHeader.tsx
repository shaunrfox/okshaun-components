import React from 'react';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { modal as modalRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useModalContext } from './ModalContext';
import type { ModalHeaderProps } from './types';
import { Heading } from '../Heading';

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  showCloseButton = true,
  children,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
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
