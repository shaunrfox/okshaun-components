import { cx } from '@styled-system/css';
import { type BoxVariantProps, box } from '@styled-system/recipes';
import type { SystemStyleObject } from '@styled-system/types';
import {
  type ComponentPropsWithRef,
  createElement,
  type ElementType,
} from 'react';

import { DsChainScope } from '~/components/DsChainScope';
import { splitProps } from '~/utils/splitProps';

type AsProp<T extends ElementType> = {
  /** Element or component rendered by the polymorphic component. */
  /** @default "div" */
  as?: T;
};

// Removes keys we define ourselves (like `as`) from the intrinsic element props.
type PropsToOmit<T extends ElementType, P extends object> = keyof (AsProp<T> &
  P);

/**
 * Combines custom props with the compatible native props and ref for the
 * element selected by `as`.
 */
export type PolymorphicComponentProps<
  T extends ElementType,
  Props extends object = object,
> = Props & AsProp<T> & Omit<ComponentPropsWithRef<T>, PropsToOmit<T, Props>>;

// Box's design-system styling surface (tokens, recipe variants, etc.).
type BoxOwnProps = SystemStyleObject & BoxVariantProps;

/** Props accepted by {@link Box}, including Panda style and native element props. */
export type BoxProps<T extends ElementType = ElementType> =
  PolymorphicComponentProps<T, BoxOwnProps>;

/**
 * Renders a token-aware polymorphic foundation for design-system components.
 *
 * `Box` renders a `div` by default. Set `as` to use another semantic element or
 * component; compatible native props and the React 19 `ref` prop follow that
 * selection. Prefer a semantic component when one already expresses the
 * intended behavior.
 *
 * @example
 * ```tsx
 * <Box as="section" p="16" aria-labelledby="summary-heading">
 *   Summary content
 * </Box>
 * ```
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
  const element = createElement(Component, {
    className: comboClassName,
    ...otherProps,
  });

  // Instrumentation is opt-in by `data-testid` presence, not by component
  // identity. Box sits on every render path in the system, so the untagged case
  // must cost nothing: one property read and an early return. No hook call, no
  // context subscription, no array, no object literal, no extra element.
  // Box itself calls no hooks, so branching on a prop here cannot desynchronize
  // hook order; the scope is a separate component that owns its own hooks.
  const testId = otherProps['data-testid'];
  if (typeof testId !== 'string' || testId.length === 0) {
    return element;
  }

  return <DsChainScope testId={testId}>{element}</DsChainScope>;
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
