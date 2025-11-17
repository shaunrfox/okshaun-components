import { splitCssProps } from '@styled-system/jsx';
import { css, cx } from '@styled-system/css';

export const splitProps = (
  props: Record<string, any>,
): [string, Record<string, any>] => {
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;

  const generatedClassName: string = css(cssProp, styleProps);
  const existingClassName = otherProps.className || '';

  const mergedClassName = cx(existingClassName, generatedClassName);

  const { className: _className, ...remainingProps } = otherProps;

  return [mergedClassName, remainingProps];
};
