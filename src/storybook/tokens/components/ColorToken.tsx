import { Flex } from "@styled-system/jsx";
import {
  token,
  type ColorToken as ColorTokenType,
} from "@styled-system/tokens";

import { Box } from "~/components/Box";
import { Text } from "~/components/Text";
import { Tooltip } from "~/components/Tooltip";

export type ColorTokenProps = {
  tokenKey: ColorTokenType;
};

export interface TokenMeta {
  key: string;
  value: string;
  variable: string;
}

export const ColorToken = ({ tokenKey }: ColorTokenProps) => {
  const tokenPath: `colors.${ColorTokenType}` = `colors.${tokenKey}`;
  const tokenMeta: TokenMeta = {
    key: tokenPath,
    value: token(tokenPath),
    variable: token.var(tokenPath),
  };

  return (
    <Flex direction="column" align="center" gap="2">
      <Tooltip text={tokenMeta.value}>
        <Box
          width="32"
          height="32"
          border="default"
          borderRadius="4"
          bg={tokenKey}
        />
      </Tooltip>

      <Text textStyle="mono.xs">{tokenKey.replace(/^.*?\./, "")}</Text>
    </Flex>
  );
};
