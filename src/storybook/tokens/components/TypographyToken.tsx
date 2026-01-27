import React from 'react';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { Flex } from '@styled-system/jsx';
import { fonts, fontWeights, fontSizes, lineHeights, letterSpacings } from '~/styles/primitives';

interface TypographyTokenProps {
  tokenKey: keyof typeof fonts | keyof typeof fontWeights | keyof typeof fontSizes | keyof typeof lineHeights | keyof typeof letterSpacings;
  type: 'textStyle' | 'font' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing';
  sampleText?: string;
  showValue?: boolean;
}

export const TypographyToken: React.FC<TypographyTokenProps> = ({
  type,
  tokenKey,
  showValue = true,
  sampleText = 'The quick brown fox jumps over the lazy dog',
}) => {

  const styleProps: any = {};

  switch (type) {
    case 'font':
      styleProps.fontFamily = tokenKey;
      break;
    case 'fontSize':
      styleProps.fontSize = tokenKey;
      break;
    case 'fontWeight':
      styleProps.fontWeight = tokenKey;
      break;
    case 'lineHeight':
      styleProps.lineHeight = tokenKey;
      break;
    case 'letterSpacing':
      styleProps.letterSpacing = tokenKey;
      break;
  }

  return (
    <Flex gap="12" w="fit" align="baseline">
      <Text textStyle="mono.md" fontWeight="bold" color="text" lineHeight="none">
        {tokenKey}
      </Text>

      {showValue && (
        <Text textStyle="mono.xs" color="text.subtlest" lineHeight="none">
          {tokenKey}
        </Text>
      )}

      <Box p="2" bg="bg.neutral" rounded="2">
        <Text {...styleProps}>{sampleText}</Text>
      </Box>
    </Flex>
  );
};
