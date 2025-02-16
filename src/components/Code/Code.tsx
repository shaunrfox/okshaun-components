import { type PropsWithChildren } from 'react';
import { Box, type BoxProps } from '@styled-system/jsx';
// import { CopyToClipboardButton } from './copy-to-clipboard-button';

interface Props extends BoxProps {
  children: React.ReactNode;
  lang?: string;
}

export const Code = (props: PropsWithChildren<Props>) => {
  const { children, lang, ...rest } = props;
  return (
    <Box
      as="code"
      bg="slate.80"
      position="relative"
      overflow="auto"
      p="4"
      whiteSpace="pre"
      fontSize="14"
      lang={lang}
      {...rest}
    >
      {children}
    </Box>
  );
};
