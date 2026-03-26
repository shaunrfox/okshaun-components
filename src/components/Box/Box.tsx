import { cx } from '@styled-system/css';
import { type BoxVariantProps, box } from '@styled-system/recipes';
import type { SystemStyleObject } from '@styled-system/types';
import {
  type ComponentPropsWithRef,
  createElement,
  type ElementType,
} from 'react';

import { splitProps } from '~/utils/splitProps';

type AsProp<T extends ElementType> = {
  // Chooses which element/component Box renders as.
  as?: T;
};

// Removes keys we define ourselves (like `as`) from the intrinsic element props.
type PropsToOmit<T extends ElementType, P extends object> = keyof (AsProp<T> &
  P);

export type PolymorphicComponentProps<
  T extends ElementType,
  Props extends object = object,
> = Props & AsProp<T> & Omit<ComponentPropsWithRef<T>, PropsToOmit<T, Props>>;

// Box's design-system styling surface (tokens, recipe variants, etc.).
type BoxOwnProps = SystemStyleObject & BoxVariantProps;

// Final polymorphic Box props:
// - `as` decides which element props are legal
// - BoxOwnProps adds Panda system props on top
export type BoxProps<T extends ElementType = ElementType> =
  PolymorphicComponentProps<T, BoxOwnProps>;

/**
 * Our base polymorphic component, which provides the correct default props based on the rendered element type.
 * Note: in React 19+, ref is passed through as a prop, and onClick is inherited based on the element type.
 */

export const Box = <T extends ElementType = 'div'>(props: BoxProps<T>) => {
  const { as, ...rest } = props;
  // Default to a semantic neutral container when `as` is not provided.
  const Component = as ?? 'div';
  // splitProps extracts className; everything else forwards to the rendered element.
  const [className, otherProps] = splitProps(rest);
  // Merge recipe class output with any consumer-provided className.
  const comboClassName = cx(box({}), className);

  // Runtime render happens via React.createElement so `as` can be dynamic.
  return createElement(Component, {
    className: comboClassName,
    ...otherProps,
  });
};

// React 19+: ComponentPropsWithRef<ElementType> is recommended as refs are now passed as props in function components.
// https://react-typescript-cheatsheet.netlify.app/docs/react-types/componentprops/
// ---------------
// ComponentPropsWithRef<ElementType> includes all HTML element props, so onClick is inherited.
// The inherited type would be:
// onClick?: MouseEventHandler<HTMLElement>
// i.e., (event: MouseEvent<HTMLElement>) => void
// ---------------
//
// In React 19+, you can access ref directly as a prop in function components - no forwardRef wrapper needed.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
