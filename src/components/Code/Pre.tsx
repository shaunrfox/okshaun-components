import { cx } from '@styled-system/css';
import { pre } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { splitProps } from '~/utils/splitProps';

import { Code } from './Code';

export type PreProps = BoxProps & {
  children: string | ReactNode;
  lang?: string;
  as?: string;
};

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
