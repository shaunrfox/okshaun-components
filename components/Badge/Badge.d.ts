import { BadgeVariantProps } from '../../../styled-system/recipes';
import * as React from 'react';
/**
 * BadgeProps is generic and manages its own polymorphism.
 * It includes props for the element type E (default "span") and BadgeVariantProps.
 */
export type BadgeProps<E extends React.ElementType = 'span'> = React.ComponentPropsWithoutRef<E> & BadgeVariantProps & {
    as?: E;
    className?: string;
    children?: React.ReactNode;
};
/**
 * Define a polymorphic BadgeComponent type.
 */
type BadgeComponent = <E extends React.ElementType = 'span'>(props: BadgeProps<E> & {
    ref?: React.ForwardedRef<Element>;
}) => React.ReactElement;
/**
 * The Badge component uses the polymorphic Box as its base.
 * Renders as a <span> by default but can be changed via the 'as' prop.
 */
export declare const Badge: BadgeComponent;
export {};
