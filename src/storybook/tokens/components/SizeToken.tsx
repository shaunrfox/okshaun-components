import { Flex } from '@styled-system/jsx';
import type React from 'react';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import {
  containerSizeTokens,
  numericSizes,
  sizes,
  utilitySizes,
} from '~/styles/primitives/sizes';
import { breakpoints } from '~/styles/utilities/breakpoints';
import { sizeBarStyles, wrapperStyles } from './sizeTokenStyles';

export interface SizeTokenProps {
  tokenKey:
    | keyof (
        | typeof numericSizes
        | typeof utilitySizes
        | typeof containerSizeTokens
        | typeof breakpoints
      )
    | string;
  utility?: boolean;
  breakpoint?: boolean;
}

type SizeTokenRecord = Record<string, { value: string }>;

const getSizeTokenValue = (tokenKey: string, breakpoint?: boolean) => {
  if (tokenKey in numericSizes) {
    return (numericSizes as SizeTokenRecord)[tokenKey]?.value;
  }
  if (tokenKey in utilitySizes) {
    return (utilitySizes as SizeTokenRecord)[tokenKey]?.value;
  }
  if (tokenKey in containerSizeTokens) {
    return (containerSizeTokens as SizeTokenRecord)[tokenKey]?.value;
  }
  if (tokenKey in breakpoints && breakpoint) {
    return breakpoints[tokenKey as keyof typeof breakpoints];
  }
  const s = sizes[tokenKey as keyof typeof sizes];
  return typeof s === 'object' && s && 'value' in s
    ? (s as { value: string }).value
    : s;
};

export const SizeToken: React.FC<SizeTokenProps> = ({
  tokenKey,
  utility = false,
  breakpoint = false,
}) => {
  let tokenValue: string | undefined;
  let breakpointTokenRems: string | undefined;

  // if breakpoint, create a token value for the breakpoint
  if (breakpoint) {
    tokenValue = `${tokenKey}`;
    tokenKey = `breakpoint-${tokenKey}`;
    breakpointTokenRems = breakpoints[tokenValue as keyof typeof breakpoints];
  }

  return (
    <Flex className={wrapperStyles} data-utility={utility}>
      <Flex gap="8" align="baseline">
        <Text
          textStyle="mono.md"
          fontWeight="bold"
          color="text"
          lineHeight="none"
        >
          {breakpoint ? tokenValue : tokenKey}
        </Text>
        <Box
          className={sizeBarStyles}
          width={tokenKey as keyof typeof sizes}
          data-size-token-value={getSizeTokenValue(tokenKey)}
        />
      </Flex>
      <Text textStyle="mono.xs" color="text.subtlest" lineHeight="none">
        {breakpoint ? breakpointTokenRems : getSizeTokenValue(tokenKey)}
      </Text>
    </Flex>
  );
};
