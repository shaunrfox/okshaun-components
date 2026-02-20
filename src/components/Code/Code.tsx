import { cx } from '@styled-system/css';
import { type CodeVariantProps, code } from '@styled-system/recipes';
import { Box, type BoxProps } from '~/components/Box';
import { Text } from '~/components/Text';
import { splitProps } from '~/utils/splitProps';

export type CodeProps = Omit<BoxProps, keyof CodeVariantProps> &
  CodeVariantProps & {
    children?: string | React.ReactNode;
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
      <Text>{children}</Text>
    </Box>
  );
};
