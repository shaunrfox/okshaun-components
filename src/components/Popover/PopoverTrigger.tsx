import { useMergeRefs } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import {
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverTrigger}, the control that opens the popover. */
export type PopoverTriggerProps = Omit<BoxProps, 'children'> & {
  /**
   * Trigger content. A single React element receives refs and interaction
   * props via `cloneElement` and keeps its own styles. Otherwise content is
   * wrapped in an inline `button` (`rich`) or focusable `span` (`definition`).
   */
  children: ReactNode;
};

/**
 * Marks the control that opens a parent {@link Popover}.
 *
 * Pass plain text for an inline dashed-underline phrase: it renders a
 * `button` in `rich` mode and a focusable `span` in `definition` mode. Pass a
 * single element (such as `Button`) to use it as the trigger as-is; it must be
 * focusable, and for `rich` it should be a button so screen readers announce
 * it as one.
 *
 * @example
 * ```tsx
 * <PopoverTrigger>cycle time</PopoverTrigger>
 * ```
 */
export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children, ref, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { interaction, getReferenceProps, setReferenceRef } =
    usePopoverContext();
  const classes = popover({ interaction });

  const childArray = Children.toArray(children);
  const onlyChild = childArray.length === 1 ? childArray[0] : null;
  const childRefProp = isValidElement(onlyChild)
    ? (onlyChild.props as { ref?: Ref<Element | null> }).ref
    : undefined;
  const mergedRef = useMergeRefs([childRefProp, ref, setReferenceRef]);

  if (isValidElement(onlyChild)) {
    const child = onlyChild as ReactElement<
      HTMLAttributes<HTMLElement> & { ref?: Ref<Element>; className?: string }
    >;
    const referenceProps = getReferenceProps({
      ...(otherProps as Record<string, unknown>),
      ...(child.props as Record<string, unknown>),
    });

    return cloneElement(child, {
      ...referenceProps,
      ref: mergedRef,
      className: cx(child.props.className, className) || undefined,
    } as HTMLAttributes<HTMLElement>);
  }

  if (interaction === 'rich') {
    return (
      <Box
        as="button"
        type="button"
        ref={mergedRef}
        className={cx(classes.trigger, className)}
        {...getReferenceProps(otherProps)}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="span"
      ref={mergedRef}
      tabIndex={0}
      className={cx(classes.trigger, className)}
      {...getReferenceProps(otherProps)}
    >
      {children}
    </Box>
  );
};
