let tokensCache: Record<string, { value: string; variable: string }> | null =
  null;

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
    const response = await fetch('src//styled-system/tokens/index.mjs');
    const text = await response.text();

    const match = text.match(/const tokens = ({[\s\S]*?})\s*export function/);
    if (!match) {
      console.error('Failed to parse tokens from .mjs file');
      return {};
    }

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
