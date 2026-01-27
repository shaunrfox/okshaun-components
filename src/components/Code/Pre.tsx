import { Box, type BoxProps } from '~/components/Box';
import { Code } from './Code';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';
import { pre } from '@styled-system/recipes';

export type PreProps = BoxProps & {
  children: string | React.ReactNode;
  lang?: string;
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
