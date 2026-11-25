import { cx } from '@styled-system/css';
import { drawer as drawerRecipe } from '@styled-system/recipes';
import { type ReactNode, useLayoutEffect } from 'react';

import { useLocale } from '~/system/context/useLocale';
import { useMediaQuery } from '~/system/hooks';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';

import { useDrawerContext } from './DrawerContext';

/** Props for {@link DrawerHeader}, the optional heading and close-control region. */
export type DrawerHeaderProps = Omit<BoxProps, 'children'> & {
  /** Text rendered as the default level-three heading when `children` is omitted. */
  title?: string;
  /**
   * Identifier applied to the title heading for `aria-labelledby` on the drawer.
   * Pass the same value to the parent drawer's `aria-labelledby`.
   */
  titleId?: string;
  /**
   * Shows the built-in button that calls the parent drawer's `onOpenChange(false)`.
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom header content. When supplied, it replaces both `title` and the
   * built-in close button; use `useDrawerContext().onClose` for a custom close
   * control.
   */
  children?: ReactNode;
};

/**
 * Renders the header region of a parent {@link Drawer}. It stays fixed while
 * the body scrolls.
 *
 * Use `title` for the standard heading, or provide `children` for custom
 * content such as previous and next controls. It must be rendered inside
 * `Drawer` because it uses drawer context to close the drawer.
 *
 * @example
 * ```tsx
 * <DrawerHeader title="Filters" titleId={titleId} />
 * ```
 */
export const DrawerHeader = (props: DrawerHeaderProps) => {
  const { title, titleId, showCloseButton = true, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = drawerRecipe();
  const { onClose, registerHeaderCloseButton } = useDrawerContext();
  const rendersCloseButton = !children && showCloseButton;
  useLayoutEffect(
    () => (rendersCloseButton ? registerHeaderCloseButton() : undefined),
    [rendersCloseButton, registerHeaderCloseButton],
  );

  const isSm = useMediaQuery('sm');
  const { labels } = useLocale();

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
              altText={labels.closeDrawer}
              aria-label={labels.closeDrawer}
              className={classes.closeButton}
              iconName="x"
            />
          )}
        </>
      )}
    </Box>
  );
};
