import { cx } from '@styled-system/css';
import { modal as modalRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { useMediaQuery } from '~/system/hooks';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';

import { useModalWrapperContext } from './ModalWrapperContext';

/** Props for {@link ModalHeader}, the optional heading and close-control region. */
export type ModalHeaderProps = Omit<BoxProps, 'children'> & {
  /** Text rendered as the default level-three heading when `children` is omitted. */
  title?: string;
  /**
   * Identifier applied to the title heading for `aria-labelledby` on the dialog.
   * Pass the same value to the parent shell's `aria-labelledby`.
   */
  titleId?: string;
  /**
   * Shows the built-in button that calls the parent modal's `onOpenChange(false)`.
   * @default true
   */
  showCloseButton?: boolean;
  /** Custom header content. When supplied, it replaces both `title` and the built-in close button. */
  children?: ReactNode;
};

/**
 * Renders the optional header region of a parent {@link ModalWrapper}.
 *
 * Use `title` for the standard heading or provide `children` for custom header
 * content. It must be rendered inside `ModalWrapper` because it uses modal
 * context to close the dialog.
 *
 * @example
 * ```tsx
 * <ModalHeader title="Edit profile" />
 * ```
 */
export const ModalHeader = (props: ModalHeaderProps) => {
  const { title, titleId, showCloseButton = true, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe();
  const { onClose } = useModalWrapperContext();

  const isSm = useMediaQuery('sm');

  return (
    <Box className={cx(classes.header, className)} {...otherProps}>
      {children ? (
        children
      ) : (
        <>
          {title && (
            <Heading
              id={titleId}
              level="h3"
              textStyle={{ base: 'heading.sm', sm: 'heading.xs' }}
              className={classes.title}
            >
              {title}
            </Heading>
          )}
          {showCloseButton && (
            <IconButton
              variant="ghost"
              size={isSm ? 'md' : 'lg'}
              onClick={onClose}
              altText="Close dialog"
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
