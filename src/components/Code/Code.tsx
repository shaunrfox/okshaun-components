import { cx } from '@styled-system/css';
import { type CodeVariantProps, code } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Text, type TextProps } from '~/components/Text';
import { splitProps } from '~/utils/splitProps';

export type CodeProps = Omit<
  BoxProps,
  keyof CodeVariantProps | keyof TextProps
> &
  CodeVariantProps &
  TextProps & {
    children?: string | ReactNode;
    lang?: string;
  };

export const Code = (props: CodeProps) => {
  const { lang, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="code"
      className={cx(code({}), className)}
      lang={lang}
      {...otherProps}
    >
      <Text color="text">{children}</Text>
    </Box>
  );
};
