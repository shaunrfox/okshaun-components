import { BoxProps } from '../Box';
import { BadgeVariantProps } from '../../../styled-system/recipes';
import * as React from 'react';
/**
 * BadgeProps is generic.
 * It extends BoxProps for the element type E (default "span") and BadgeVariantProps.
 */
export type BadgeProps<E extends React.ElementType = 'span'> = BoxProps<E> & BadgeVariantProps & {
    className?: string;
    children?: React.ReactNode;
};
/**
 * Define a polymorphic BadgeComponent type.
 */
type BadgeComponent = <E extends React.ElementType = 'span'>(props: BadgeProps<E> & {
    ref?: React.ForwardedRef<Element>;
}) => JSX.Element;
/**
 * The Badge component uses the polymorphic Box as its base.
 * Renders as a <span> by default but can be changed via the 'as' prop.
 */
export declare const Badge: BadgeComponent;
export {};
