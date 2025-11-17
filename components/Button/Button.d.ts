import { BoxProps } from '../Box';
import { ButtonVariantProps } from '../../../styled-system/recipes';
import * as React from 'react';
/**
 * ButtonProps is now generic.
 * It extends BoxProps for the element type E (default "button") and ButtonVariantProps.
 * This means that any prop accepted by the underlying element (e.g. onClick) is automatically allowed.
 */
export type ButtonProps<E extends React.ElementType = 'button'> = BoxProps<E> & ButtonVariantProps & {
    href?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
};
/**
 * Define a polymorphic ButtonComponent type.
 * The ref type will be inferred from the element type E.
 */
type ButtonComponent = <E extends React.ElementType = 'button'>(props: ButtonProps<E> & {
    ref?: React.ForwardedRef<Element>;
}) => JSX.Element;
/**
 * The Button component uses the polymorphic Box as its base.
 * It automatically renders as an <a> if href is provided.
 * Since ButtonProps extends BoxProps, any extra props (like onClick) are automatically allowed.
 */
export declare const Button: ButtonComponent;
export {};
