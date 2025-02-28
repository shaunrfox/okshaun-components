import { Box, type BoxProps } from '~/components/Box';
import { Text, type TextProps } from '~/components/Text';
import { code, type CodeVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type CodeProps = Omit<
  BoxProps,
  keyof CodeVariantProps | keyof TextProps
> &
  CodeVariantProps &
  TextProps & {
    children?: string | React.ReactNode;
    lang?: string;
  };

export const Code: React.FC<CodeProps> = ({
  lang,
  children,
  ...props
}: CodeProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="code"
      className={cx(code({}), className as string)}
      lang={lang}
      {...otherProps}
    >
      <Text>{children}</Text>
    </Box>
  );
};
