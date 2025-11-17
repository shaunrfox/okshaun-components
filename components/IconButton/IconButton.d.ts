import { IconButtonVariantProps } from '../../../styled-system/recipes';
import { IconNamesList } from '../Icon';
import * as React from 'react';
/**
 * IconButtonProps is generic and manages its own polymorphism.
 * It includes props for the element type E (default "button") and IconButtonVariantProps.
 *
 * We've added a new optional prop 'iconName'. When provided (and if no children
 * are passed), IconButton will render the corresponding Icon automatically.
 */
export type IconButtonProps<E extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<E> & IconButtonVariantProps & {
    as?: E;
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
}) => React.ReactElement;
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
