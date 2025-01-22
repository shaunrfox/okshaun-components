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
    <Box bg="gray.80" position="relative" lang={lang} {...rest}>
      <Box
        overflow="auto"
        p="4"
        whiteSpace="pre"
        fontSize="14"
        lineHeight="20"
        fontFamily="mono"
      >
        {children}
      </Box>
    </Box>
  );
};
