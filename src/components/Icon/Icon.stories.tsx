import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@styled-system/jsx';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { Icon } from './Icon';
import iconMetadata from './iconMetadata.json';
import { IconNames } from './iconNames';

type IconMetadataEntry = {
  aliases?: string[];
  tags?: string[];
  category?: string | null;
  deprecated?: boolean;
};

const iconMetadataByName = iconMetadata as Record<string, IconMetadataEntry>;
const iconNames = Object.values(IconNames);

function tokenize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .split(/[\s\-_]+/)
    .filter(Boolean);
}

function buildSearchIndex(name: string, metadata: IconMetadataEntry) {
  const aliases = metadata.aliases ?? [];
  const tags = metadata.tags ?? [];
  const searchable = new Set<string>([name.toLowerCase()]);
  const allValues = [name, ...aliases, ...tags];

  for (const value of allValues) {
    searchable.add(value.toLowerCase());
    for (const token of tokenize(value)) {
      searchable.add(token);
    }
  }

  return Array.from(searchable).join(' ');
}

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Use \`Icon\` for visual affordances in buttons, statuses, and navigation.

When not to use:
- As the only label for interactive controls (pair it with text or an \`aria-label\`)
- As decorative noise in dense data views where it adds no meaning

Minimal snippet:
\`\`\`tsx
<Icon name="search" />
\`\`\`

Realistic example:
\`\`\`tsx
<Button iconAfter="search">
  Search customers
</Button>
\`\`\``,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: { control: 'text' },
  },
  args: {
    name: 'search',
    'aria-label': 'Search',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

type CopyState =
  | { status: 'idle' }
  | { status: 'success'; snippet: string }
  | { status: 'error'; name: string; message: string };

function IconCatalogStory() {
  const [query, setQuery] = useState('');
  const [showDeprecated] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>({ status: 'idle' });
  const filteredIcons = (() => {
    const terms = tokenize(query);

    return iconNames.filter((name) => {
      const metadata = iconMetadataByName[name] ?? {};
      const isDeprecated = metadata.deprecated ?? false;
      if (!showDeprecated && isDeprecated) {
        return false;
      }

      if (terms.length === 0) {
        return true;
      }

      const searchIndex = buildSearchIndex(name, metadata);
      return terms.every((term) => searchIndex.includes(term));
    });
  })();

  const onCopy = async (name: string) => {
    const snippet = `<Icon name="${name}" />`;

    try {
      await navigator.clipboard.writeText(snippet);
      setCopyState({ status: 'success', snippet });
    } catch {
      setCopyState({
        status: 'error',
        name,
        message: 'Clipboard said "nope".',
      });
    }
    setTimeout(() => setCopyState({ status: 'idle' }), 3000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="32"
      maxW="6xl"
      mx="auto"
      py="20"
      px="24"
    >
      <Flex
        justifyContent="start"
        alignItems="center"
        gap="24"
        px="12"
        py="12"
        borderRadius="4"
        zIndex="1"
        position="sticky"
        top="28"
        bg="surface.sunken"
        shadow="raised"
      >
        <TextInput
          name="icon-search"
          type="search"
          size="lg"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.currentTarget.value)
          }
          placeholder="Search by icon name, alias, or tag..."
          iconBefore="search"
          w="280"
        />
        <Text fontSize="12" color="text.subtle" mr="auto">
          Showing {filteredIcons.length} of {iconNames.length} icons
        </Text>

        {copyState.status === 'success' ? (
          <Box
            role="status"
            aria-live="polite"
            px="8"
            py="4"
            borderRadius="4"
            // bg="bg.success"
            fontSize="12"
            color="text.success"
            display="flex"
            alignItems="center"
            gap="4"
          >
            <Icon
              name="circle-check"
              fill="icon.success"
              size="20"
              aria-hidden
            />
            Copied: {copyState.snippet}
          </Box>
        ) : copyState.status === 'error' ? (
          <Box
            role="status"
            aria-live="polite"
            px="8"
            py="4"
            borderRadius="4"
            // bg="bg.danger"
            fontSize="12"
            color="text.danger"
            display="flex"
            alignItems="center"
            gap="4"
          >
            <Icon name="prohibit" fill="icon.danger" size="20" aria-hidden />
            Copy failed for {copyState.name}. {copyState.message}
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            gap="4"
            px="8"
            py="4"
            borderRadius="4"
            // bg="surface.sunken"
            fontSize="12"
            color="text.subtle"
          >
            <Icon name="copy" size="20" aria-hidden />
            Click an icon to copy the JSX snippet
          </Box>
        )}
      </Flex>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
        }}
        gap="12"
      >
        {filteredIcons.map((name) => {
          return (
            <Flex key={name} gap="8" flexDirection="column" alignItems="center">
              <IconButton
                onClick={() => onCopy(name)}
                size="lg"
                variant="ghost"
                iconName={name}
                altText={`Copy ${name} icon`}
              />
              <Text textStyle="mono.xs" color="text.accent.gold">
                {name}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}

export const ExSearchableCatalog: Story = {
  name: 'Ex: Searchable Catalog',
  render: () => <IconCatalogStory />,
  parameters: {
    controls: { disable: true },
  },
};
