import * as React from 'react';

// By wrapping P with React.PropsWithChildren, children is now part of the props
export type PropsWithAs<
  P,
  E extends React.ElementType,
> = React.PropsWithChildren<P> & { as?: E };

export type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref'];

/**
 * Polymorphic components with generic ref types can be tricky because
 * React.forwardRef doesn't preserve generics well.
 *
 * This helper function wraps React.forwardRef and ensures that generics
 * for the "as" prop are maintained. This way, components built with it will have
 * proper ref and prop types for whichever element type is chosen.
 */
function forwardRefWithAs<P extends object, E extends React.ElementType>(
  render: (
    props: PropsWithAs<P, E>,
    ref: PolymorphicRef<E>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef(
    (props: React.PropsWithoutRef<PropsWithAs<P, E>>, ref: React.Ref<any>) =>
      render(props as PropsWithAs<P, E>, ref as PolymorphicRef<E>),
  ) as unknown as <T extends React.ElementType = E>(
    props: PropsWithAs<P, T> & { ref?: PolymorphicRef<T> },
  ) => React.ReactElement | null;
}

export default forwardRefWithAs;
