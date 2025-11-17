import { Box, type BoxProps } from '~/components/Box';
import { Code } from './Code';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';
import { pre } from '@styled-system/recipes';

export type PreProps = BoxProps & {
  children: string | React.ReactNode;
  lang?: string;
  as?: string;
};

export const Pre: React.FC<PreProps> = ({
  children,
  lang,
  ...props
}: PreProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box as="pre" className={cx(pre({}), className as string)} {...otherProps}>
      <Code lang={lang} slot="react" bg="transparent" {...otherProps}>
        {children}
      </Code>
    </Box>
  );
};
