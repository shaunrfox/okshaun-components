import React, { useEffect, useState } from 'react';
import type { ColorToken as ColorTokenType } from '@styled-system/tokens';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { Flex, Grid } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';
import { Tooltip } from '~/components/Tooltip';
import { getToken, type TokenMeta } from './tokenLoader';

export interface ColorTokenProps {
  tokenKey: ColorTokenType;
}

export const ColorToken: React.FC<ColorTokenProps> = ({ tokenKey }) => {
  const [tokenMeta, setTokenMeta] = useState<TokenMeta | null>(null);
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
