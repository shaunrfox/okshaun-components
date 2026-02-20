import { cx } from '@styled-system/css';
import { type BoxVariantProps, box } from '@styled-system/recipes';
import type { SystemStyleObject } from '@styled-system/types';
import {
  type ComponentPropsWithRef,
  type ElementType,
  createElement,
} from 'react';
import { splitProps } from '~/utils/splitProps';
/*
 * Imports from recipes are placeholders for if we want to add some kind of styling to Box
 */
export type BoxProps = Omit<ComponentPropsWithRef<ElementType>, 'as'> &
  SystemStyleObject &
  BoxVariantProps & {
    as?: ElementType;
  };

// export const Box: React.FC<BoxProps> = ({ as = 'div', ...props }) => {
export const Box = ({ as = 'div', ...props }: BoxProps) => {
  const [className, otherProps] = splitProps(props);
  const comboClassName = cx(box({}), className);
  return createElement(as, {
    className: comboClassName,
    ...otherProps,
  });
};
