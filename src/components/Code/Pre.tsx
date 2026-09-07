import { cx } from '@styled-system/css';
import { pre } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { splitProps } from '~/utils/splitProps';

import { Code } from './Code';

/** Props accepted by {@link Pre}. */
export type PreProps = BoxProps & {
  /** Preformatted code content. */
  children: string | ReactNode;
  /** Language metadata forwarded to the nested `Code` element. */
  lang?: string;
  /** Element override for the rendered `pre` container. */
  as?: string;
};

/**
 * Renders a preformatted code block using native `pre` and `code` semantics.
 *
 * Whitespace in string content is preserved. The component does not perform
 * syntax highlighting.
 *
 * @example
 * ```tsx
 * <Pre lang="typescript">{'const ready = true;'}</Pre>
 * ```
 */
export const Pre = (props: PreProps) => {
  const { children, lang, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box as="pre" className={cx(pre({}), className)} {...otherProps}>
      <Code lang={lang} slot="react" bg="transparent" {...otherProps}>
        {children}
      </Code>
    </Box>
  );
};
