import React from 'react';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { radii } from '~/styles/primitives/radii';
import { Flex } from '@styled-system/jsx';

interface RadiusTokenProps {
  tokenKey: keyof typeof radii;
  boxWidth?: string;
}

export const RadiusToken: React.FC<RadiusTokenProps> = ({
  tokenKey,
  boxWidth = '32'
}) => {

  // remove "{" and "}" from the token value
  const tokenValue = radii[tokenKey as keyof typeof radii].value.replace('{', '').replace('}', '');

  return (
    <Flex direction="column" gap="12" w="fit" align="center">
      <Text textStyle="mono.md" fontWeight="bold" color="text" lineHeight="none">
        {tokenKey}
      </Text>
      <Box
        width={boxWidth as any}
        height="32"
        backgroundColor="blue.50"
        borderWidth="1"
        borderColor="blue.60"
        borderRadius={tokenKey as any}
      />
      <Text textStyle="mono.xs" color="text.subtlest" lineHeight="none">
        {tokenValue}
      </Text>
    </Flex>
  );
};
