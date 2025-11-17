import { BoxProps } from '../Box';
import { IconButtonVariantProps } from '../../../styled-system/recipes';
import { IconNamesList } from '../Icon';
import * as React from 'react';
/**
 * IconButtonProps is generic over an element type E (defaulting to 'button').
 * It extends BoxProps<E> (which already includes all intrinsic props, like onClick)
 * and the recipe variant props.
 *
 * We've added a new optional prop 'iconName'. When provided (and if no children
 * are passed), IconButton will render the corresponding Icon automatically.
 */
export type IconButtonProps<E extends React.ElementType = 'button'> = BoxProps<E> & IconButtonVariantProps & {
    href?: string;
    loading?: boolean;
    loadingText?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    iconName?: IconNamesList;
};
/**
 * Define the polymorphic component type for IconButton.
 */
type IconButtonComponent = <E extends React.ElementType = 'button'>(props: IconButtonProps<E> & {
    ref?: React.ForwardedRef<Element>;
}) => JSX.Element;
/**
 * The IconButton component builds on Box.
 * It automatically renders as a "button" (or an "a" if an href is provided)
 * and applies the iconButton recipe styles.
 *
 * If the caller does not pass children but does provide an 'iconName',
 * the component renders the corresponding Icon automatically.
 */
export declare const IconButton: IconButtonComponent;
export {};
