import { splitCssProps } from '@styled-system/jsx';
import { css } from '@styled-system/css';

export function splitProps(props: object) {
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const className: string = css(cssProp, styleProps);
  return [className, otherProps];
}
