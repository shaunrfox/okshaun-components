import { Flex } from '@styled-system/jsx';
import type { SizeToken } from '@styled-system/tokens';
import type React from 'react';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { radii } from '~/styles/primitives/radii';

interface RadiusTokenProps {
  tokenKey: keyof typeof radii;
  boxWidth?: SizeToken;
}

export const RadiusToken: React.FC<RadiusTokenProps> = ({
  tokenKey,
  boxWidth = '32',
}) => {
  // remove "{" and "}" from the token value
  const tokenValue = radii[tokenKey as keyof typeof radii].value
    .replace('{', '')
    .replace('}', '');

  return (
    <Flex direction="column" gap="12" w="fit" align="center">
      <Text
        textStyle="mono.md"
        fontWeight="bold"
        color="text"
        lineHeight="none"
      >
        {tokenKey}
      </Text>
      <Box
        width={boxWidth}
        height="32"
        backgroundColor="blue.50"
        borderWidth="1"
        borderColor="blue.60"
        borderRadius={tokenKey}
      />
      <Text textStyle="mono.xs" color="text.subtlest" lineHeight="none">
        {tokenValue}
      </Text>
    </Flex>
  );
};
