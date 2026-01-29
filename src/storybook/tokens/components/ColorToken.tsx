import React, { useEffect, useState } from 'react';
import type { ColorToken as ColorTokenType } from '@styled-system/tokens';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { Flex, Grid } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';
import { Tooltip } from '~/components/Tooltip';

let tokensCache: Record<string, { value: string; variable: string }> | null =
  null;

export interface ColorTokenProps {
  tokenKey: ColorTokenType;
}

export interface TokenMeta {
  key: string;
  value: string;
  variable: string;
}

async function loadTokens(): Promise<
  Record<string, { value: string; variable: string }>
> {
  if (tokensCache) return tokensCache;

  try {
    // Fetch the tokens file as text
    const response = await fetch('src//styled-system/tokens/index.mjs');
    const text = await response.text();

    // Parse the tokens object from the JavaScript
    // The file has: const tokens = { ... }
    const match = text.match(/const tokens = ({[\s\S]*?})\s*export function/);
    if (!match) {
      console.error('Failed to parse tokens from .mjs file');
      return {};
    }

    // Use Function constructor to safely evaluate the object
    const tokensObj = new Function(`return ${match[1]}`)();
    tokensCache = tokensObj;
    return tokensObj;
  } catch (error) {
    console.error('Error loading tokens:', error);
    return {};
  }
}

export async function getToken(path: string): Promise<TokenMeta | null> {
  const tokens = await loadTokens();
  const tokenData = tokens[path];

  if (!tokenData) return null;

  const parts = path.split('.');
  const key = parts.slice(1).join('.');

  return {
    key,
    value: tokenData.value,
    variable: tokenData.variable,
  };
}

export const ColorToken: React.FC<ColorTokenProps> = ({ tokenKey }) => {
  const [tokenMeta, setTokenMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken(`colors.${tokenKey}`);
      setTokenMeta(token);
      setLoading(false);
    };
    loadToken();
  }, [tokenKey]);

  if (loading) {
    return (
      <Flex direction="column" align="center" gap="2">
        <Grid
          placeContent="center"
          width="32"
          height="32"
          border="default"
          borderRadius="4"
        >
          <Spinner size="sm" />
        </Grid>
        <Text textStyle="mono.xs" color="text.disabled">
          ###
        </Text>
      </Flex>
    );
  }

  if (!tokenMeta) {
    return 'Token not found';
  }

  return (
    <Flex direction="column" align="center" gap="2">
      <Tooltip text={tokenMeta.value}>
        <Box
          width="32"
          height="32"
          border="default"
          borderRadius="4"
          style={{ backgroundColor: tokenMeta.variable }}
        />
      </Tooltip>

      <Text textStyle="mono.xs">{tokenMeta.key.replace(/^.*?\./, '')}</Text>
    </Flex>
  );
};
