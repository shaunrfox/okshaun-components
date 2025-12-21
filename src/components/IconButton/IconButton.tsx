import * as React from 'react';
import { cx } from '@styled-system/css';
import { Grid, HStack } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';
import { Box, type BoxProps } from '~/components/Box';
import {
  iconButton,
  type IconButtonVariantProps,
} from '@styled-system/recipes';
import { Icon, type IconNamesList } from '~/components/Icon';
import { splitProps } from '~/utils/splitProps';

/**
 * IconButtonProps is generic and manages its own polymorphism.
 * It includes props for the element type E (default "button") and IconButtonVariantProps.
 *
 * We've added a new optional prop 'iconName'. When provided (and if no children
 * are passed), IconButton will render the corresponding Icon automatically.
 */
export type IconButtonProps<E extends React.ElementType = 'button'> = Omit<
  BoxProps,
  keyof IconButtonVariantProps | 'as'
> &
  IconButtonVariantProps & {
    as?: E;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    iconName?: IconNamesList;
  };

/**
 * Define the polymorphic component type for IconButton.
 */
type IconButtonComponent = <E extends React.ElementType = 'button'>(
  props: IconButtonProps<E> & { ref?: React.ForwardedRef<Element> },
) => React.ReactElement;

/**
 * The IconButton component builds on Box.
 * It automatically renders as a "button" (or an "a" if an href is provided)
 * and applies the iconButton recipe styles.
 *
 * If the caller does not pass children but does provide an 'iconName',
 * the component renders the corresponding Icon automatically.
 */
export const IconButton = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    {
      appearance,
      size,
      href,
      className,
      loading,
      disabled,
      iconName,
      ...props
    }: IconButtonProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const trulyDisabled = loading || disabled;
    const asComponent = href ? 'a' : 'button';
    const classes = iconButton({ appearance, size });

    const [styleClassName, otherProps] = splitProps(props);

    return (
      <Box
        as={asComponent as E}
        ref={ref as React.ForwardedRef<any>}
        href={href}
        disabled={trulyDisabled}
        aria-disabled={trulyDisabled}
        className={cx(classes.container, className, styleClassName)}
        // Add "type" attribute when rendering a button
        type={asComponent === 'button' ? 'button' : undefined}
        {...otherProps}
      >
        <>
          <HStack gap="2" opacity={loading ? 0 : 1}>
            <Icon name={iconName || 'menu'} className={classes.icon} />
          </HStack>
          {loading && (
            <Grid
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              placeItems="center"
            >
              <Spinner
                {...(appearance === 'primary' ? { inverse: true } : {})}
              />
            </Grid>
          )}
        </>
      </Box>
    );
  },
) as IconButtonComponent;
