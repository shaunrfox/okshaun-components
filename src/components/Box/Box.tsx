import React, {
  type ElementType,
  type AllHTMLAttributes,
  createElement,
} from 'react';
import { box, type BoxVariantProps } from '@styled-system/recipes';
import type { SystemStyleObject } from '@styled-system/types';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

/*
 * Imports from recipes are placeholders for if we want to add some kind of styling to Box
 */
export type BoxProps = Omit<AllHTMLAttributes<HTMLElement>, 'as'> &
  SystemStyleObject &
  BoxVariantProps & {
    as?: ElementType;
  };

export const Box: React.FC<BoxProps> = ({ as = 'div', ...props }) => {
  as = typeof as === 'string' && as.length > 0 ? as : 'div';
  const [className, otherProps] = splitProps(props);
  return createElement(as, {
    className: cx(box({}), className as string),
    ...otherProps,
  });
};
