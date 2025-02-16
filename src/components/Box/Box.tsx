import React, {
  type ElementType,
  type AllHTMLAttributes,
  createElement,
} from 'react';
import {
  splitCssProps, // Panda's runtime helper to split style props from others
  styled,
} from '@styled-system/jsx';
import { css } from '@styled-system/css';
import type { SystemStyleObject } from '@styled-system/types';

export type BoxProps = Omit<AllHTMLAttributes<HTMLElement>, 'as'> &
  SystemStyleObject & {
    as?: ElementType;
  };

export const Box: React.FC<BoxProps> = ({ as = 'div', ...props }) => {
  as = typeof as === 'string' && as.length > 0 ? as : 'div';
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const className = css(cssProp, styleProps);

  return createElement(as, {
    className: { className },
    ...otherProps,
  });
};

export default styled(Box);
