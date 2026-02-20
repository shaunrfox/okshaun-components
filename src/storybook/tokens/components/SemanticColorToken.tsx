import { Flex, HStack } from '@styled-system/jsx';
import type { ColorToken } from '@styled-system/tokens';
import type React from 'react';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { Tooltip } from '~/components/Tooltip';
import { colors as primitiveColors } from '~/styles/primitives/colors';
import { colors as semanticColors } from '~/styles/semantics/colors';

interface SemanticColorTokenProps {
  token: ColorToken;
  label?: string;
}

// Utility to resolve semantic token to actual color values and references
function resolveSemanticToken(token: ColorToken): {
  light: string;
  dark: string;
  lightRef: string;
  darkRef: string;
} {
  // Split token path (e.g., "bg.neutral" -> ["bg", "neutral"])
  const originalParts = token.split('.');
  let parts = [...originalParts];

  // Navigate through semantic colors object
  let current: Record<string, unknown> | null = semanticColors as Record<
    string,
    unknown
  >;

  // First, try the token as-is
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part] as Record<string, unknown>;
    } else {
      current = null;
      break;
    }
  }

  type SemanticValue = { base?: unknown; _dark?: unknown };
  // If we found a value directly, use it
  if (current && typeof current === 'object' && 'value' in current) {
    const value = current.value as SemanticValue;
    if (value && typeof value === 'object') {
      const lightRef = extractColorReference(value.base ?? value);
      const darkRef = extractColorReference(value._dark ?? value.base ?? value);
      const lightValue = resolveColorReference(value.base ?? value);
      const darkValue = resolveColorReference(
        value._dark ?? value.base ?? value,
      );
      return {
        light: lightValue,
        dark: darkValue,
        lightRef: lightRef,
        darkRef: darkRef,
      };
    }
  }

  // If not found directly, try adding DEFAULT
  parts = [...originalParts, 'DEFAULT'];
  current = semanticColors as Record<string, unknown>;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part] as Record<string, unknown>;
    } else {
      current = null;
      break;
    }
  }

  // If we found a value with DEFAULT, use it
  if (current && typeof current === 'object' && 'value' in current) {
    const value = current.value as SemanticValue;
    if (value && typeof value === 'object') {
      const lightRef = extractColorReference(value.base ?? value);
      const darkRef = extractColorReference(value._dark ?? value.base ?? value);
      const lightValue = resolveColorReference(value.base ?? value);
      const darkValue = resolveColorReference(
        value._dark ?? value.base ?? value,
      );
      return {
        light: lightValue,
        dark: darkValue,
        lightRef: lightRef,
        darkRef: darkRef,
      };
    }
  }

  // Fallback: return original token
  return { light: token, dark: token, lightRef: token, darkRef: token };
}

// Utility to extract primitive color reference from semantic reference
function extractColorReference(ref: unknown): string {
  if (typeof ref === 'string') {
    // Check if it's a reference like "{colors.neutral.20}"
    const match = ref.match(/^\{colors\.(.+)\}$/);
    if (match?.[1]) {
      return match[1]; // Return just the color path like "neutralA.20"
    }
    // Return direct color values unchanged
    return ref;
  }
  return String(ref);
}

// Utility to resolve color references like "{colors.neutral.20}" to actual values
function resolveColorReference(ref: unknown): string {
  if (typeof ref === 'string') {
    // Check if it's a reference like "{colors.neutral.20}"
    const match = ref.match(/^\{colors\.(.+)\}$/);
    if (match?.[1]) {
      const colorPath = match[1].split('.');
      let current: Record<string, unknown> | null = primitiveColors as Record<
        string,
        unknown
      >;
      for (const part of colorPath) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part] as Record<string, unknown>;
        } else {
          return ref; // Return original if can't resolve
        }
      }
      // Return the value if found
      if (current && typeof current === 'object' && 'value' in current) {
        return current.value as string;
      }
    }
    // Return direct color values or hex codes
    return ref;
  }
  return String(ref);
}
export const SemanticColorToken: React.FC<SemanticColorTokenProps> = ({
  token,
  label,
}) => {
  const resolved = resolveSemanticToken(token);

  return (
    <HStack>
      <Flex borderRadius="4" w="fit" border="default">
        <Tooltip text={`light: ${resolved.lightRef}`}>
          <Box
            w="32"
            height="32"
            roundedLeft="3"
            bg={token}
            data-light-hex={resolved.light}
            data-light-reference={resolved.lightRef}
          />
        </Tooltip>
        <Tooltip text={`dark: ${resolved.darkRef}`}>
          <Box
            w="32"
            height="32"
            roundedRight="3"
            bg={token}
            data-dark-hex={resolved.dark}
            data-dark-reference={resolved.darkRef}
            data-color-mode="dark"
          />
        </Tooltip>
      </Flex>
      <Text
        as="p"
        textStyle="mono.xs"
        color="text.subtlest"
        maxW="full"
        lineHeight="tight"
        hyphens="auto"
      >
        {label || token}
      </Text>
    </HStack>
  );
};
