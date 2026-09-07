import { cx } from '@styled-system/css';
import { type CodeVariantProps, code } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Text, type TextProps } from '~/components/Text';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props accepted by {@link Code}. */
export type CodeProps = Omit<
  BoxProps,
  keyof CodeVariantProps | keyof TextProps
> &
  CodeVariantProps &
  TextProps & {
    /** Source code or inline content to render. */
    children?: string | ReactNode;
    /** Language metadata forwarded to the native `code` element. */
    lang?: string;
  };

/**
 * Renders code content in a native `code` element.
 *
 * Use `Pre` for a preformatted code block. `lang` supplies element language
 * metadata; it does not perform syntax highlighting.
 *
 * @example
 * ```tsx
 * <Code>npm run build</Code>
 * ```
 */
export const Code = (props: CodeProps) => {
  const { lang, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      {...dsComponent('Code')}
      as="code"
      className={cx(code({}), className)}
      lang={lang}
      {...otherProps}
    >
      <Text color="text">{children}</Text>
    </Box>
  );
};
