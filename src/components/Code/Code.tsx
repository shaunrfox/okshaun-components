import { cx } from '@styled-system/css';
import { type CodeVariantProps, code } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

type CodeOwnProps = {
  /** Code, an identifier, or a value shown in a monospace font. */
  children?: ReactNode;
  /**
   * Programming or data language of the content, such as `sql` or `json`.
   * Rendered as `data-language`; it does not apply syntax highlighting.
   */
  language?: string;
};

/** Props accepted by {@link Code}. Includes compatible native element props. */
export type CodeProps = Omit<
  BoxProps,
  keyof CodeVariantProps | keyof CodeOwnProps
> &
  CodeVariantProps &
  CodeOwnProps;

/**
 * Marks a short piece of code, an identifier, or a machine value inside text.
 *
 * Renders a native `code` element. The font size follows the surrounding
 * text, and long values wrap rather than overflow. Use `CodeBlock` for
 * multi-line code, or when the reader needs a copy button. Use `Kbd` for
 * keyboard shortcuts.
 *
 * The default `subtle` variant tints the background. Use `outline` where a
 * tint competes with a selected row, and `plain` for monospace values in dense
 * tables, such as part numbers.
 *
 * @example
 * ```tsx
 * <Text>
 *   Set <Code>API_TOKEN</Code> in your environment, then send it as a bearer token.
 * </Text>
 * ```
 */
export const Code = (props: CodeProps) => {
  const { variant, language, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      {...dsComponent('Code')}
      as="code"
      className={cx(code({ variant }), className)}
      data-language={language}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
