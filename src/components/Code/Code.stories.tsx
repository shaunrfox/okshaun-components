import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Code } from './Code';

const meta = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'npm run build',
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Box display="grid" gap="12" maxW="prose">
      <Text>
        Subtle: run <Code variant="subtle">npm run prepare</Code> first.
      </Text>
      <Text>
        Outline: run <Code variant="outline">npm run prepare</Code> first.
      </Text>
      <Text>
        Plain: run <Code variant="plain">npm run prepare</Code> first.
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const SizeFollowsText: Story = {
  render: () => (
    <Box display="grid" gap="12" maxW="prose">
      <Heading level="h3">
        Configure <Code>api_token</Code>
      </Heading>
      <Text>
        Body text with <Code>api_token</Code> inline.
      </Text>
      <Text textStyle="body.xs">
        Small text with <Code>api_token</Code> inline.
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const LongValueWraps: Story = {
  render: () => (
    <Box maxW="xs" borderWidth="1" borderColor="border" p="12">
      <Text>
        Token:{' '}
        <Code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0</Code>
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const NativeSemantics: Story = {
  name: 'Test: native code element',
  render: () => (
    <Text>
      Run{' '}
      <Code language="shell" data-testid="inline-code">
        npm test
      </Code>
      .
    </Text>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const code = canvas.getByTestId('inline-code');

    expect(code.tagName).toBe('CODE');
    expect(code).toHaveAttribute('data-language', 'shell');
    expect(code).toHaveAttribute('data-ds-component', 'Code');
    // Children render directly in the code element, with no wrapper.
    expect(code.children).toHaveLength(0);
    expect(code).not.toHaveAttribute('lang');
  },
  parameters: { controls: { disable: true } },
};

export const ExApiSetupNote: Story = {
  name: 'Ex: API Setup Note',
  render: () => (
    <Box display="grid" gap="8" maxW="prose">
      <Text>
        Set <Code>API_TOKEN</Code> in your environment. The client sends it as
        an <Code>Authorization: Bearer &lt;token&gt;</Code> header on every
        request.
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
