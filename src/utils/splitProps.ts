import { css, cx } from '@styled-system/css';
import { splitCssProps } from '@styled-system/jsx';

export const splitProps = (
  props: Record<string, unknown>,
): [string, Record<string, unknown>] => {
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;

  const generatedClassName: string = css(cssProp, styleProps);
  const existingClassName =
    typeof otherProps.className === 'string' ? otherProps.className : '';

  const mergedClassName = cx(existingClassName, generatedClassName);

  const { className: _className, ...remainingProps } = otherProps;

  return [mergedClassName, remainingProps];
};
