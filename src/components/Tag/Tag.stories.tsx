import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Wrap } from '@styled-system/jsx';
import { expect, within } from 'storybook/test';
import { Text } from '../Text';
import { Tag } from './Tag';

/**
 * Tag component for labeling, categorizing, and organizing items.
 *
 * Features:
 * - Two visual variants (default, bold)
 * - Two sizes (md, sm)
 * - 12 recipe-defined hues
 * - Optional leading/trailing icons
 */
const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Tag',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Height and text size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'bold'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    hue: {
      control: 'select',
      options: [
        'gray',
        'tan',
        'red',
        'orange',
        'yellow',
        'lime',
        'green',
        'teal',
        'blue',
        'indigo',
        'purple',
        'magenta',
      ],
      description: 'Color hue',
      table: {
        defaultValue: { summary: 'gray' },
      },
    },
    iconBefore: {
      control: 'select',
      options: [undefined, 'check', 'info', 'warning'],
      description: 'Icon name to display before text',
    },
    iconAfter: {
      control: 'select',
      options: [undefined, 'star', 'tag'],
      description: 'Icon name to display after text',
    },
    children: {
      control: 'text',
      description: 'Tag text content',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const hues = [
  'gray',
  'tan',
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'magenta',
] as const;

// ============================================================================
// Variants
// ============================================================================

export const Default: Story = {
  render: () => (
    <Wrap gap="8" maxW="xs" justify="center">
      {hues.map((hue) => (
        <Tag key={hue} hue={hue}>
          {hue}
        </Tag>
      ))}
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const Bold: Story = {
  render: () => (
    <Wrap gap="8" maxW="xs" justify="center">
      {hues.map((hue) => (
        <Tag key={hue} hue={hue} variant="bold">
          {hue}
        </Tag>
      ))}
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Side-by-Side Comparison
// ============================================================================

export const VariantComparison: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      // alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        default
      </Text>
      <Wrap gap="8" maxW="xs">
        {hues.map((hue) => (
          <Tag key={hue} hue={hue}>
            {hue}
          </Tag>
        ))}
      </Wrap>
      <Text textStyle="mono.md" mr="16">
        bold
      </Text>
      <Wrap gap="8" maxW="xs">
        {hues.map((hue) => (
          <Tag key={hue} hue={hue} variant="bold">
            {hue}
          </Tag>
        ))}
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Sizes
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="24"
      alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        md
      </Text>
      <Wrap gap="8" alignItems="center">
        <Tag hue="green">Approved</Tag>
        <Tag hue="blue" variant="bold">
          Released
        </Tag>
        <Tag hue="green" iconBefore="check">
          Approved
        </Tag>
        <Tag hue="yellow" iconAfter="star">
          Featured
        </Tag>
      </Wrap>
      <Text textStyle="mono.md" mr="16">
        sm
      </Text>
      <Wrap gap="8" alignItems="center">
        <Tag size="sm" hue="green">
          Approved
        </Tag>
        <Tag size="sm" hue="blue" variant="bold">
          Released
        </Tag>
        <Tag size="sm" hue="green" iconBefore="check">
          Approved
        </Tag>
        <Tag size="sm" hue="yellow" iconAfter="star">
          Featured
        </Tag>
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// The `xs` and `md` breakpoints from src/styles/utilities/breakpoints.ts.
const xsBreakpoint = '(min-width: 30rem)';
const mdBreakpoint = '(min-width: 48rem)';

const expectTagSize = (tag: HTMLElement, size: 'sm' | 'md') => {
  const px = size === 'sm' ? 16 : 20;
  const fontPx = size === 'sm' ? 12 : 14;
  const icon = tag.querySelector('svg');
  expect(icon).not.toBeNull();
  expect(tag.getBoundingClientRect().height).toBe(px);
  // The icon alone can make a tag 20px high, so check the text size too.
  expect(getComputedStyle(tag).fontSize).toBe(`${fontPx}px`);
  expect(icon?.getBoundingClientRect().width).toBe(px);
};

const responsiveSizeStory: Story = {
  render: () => (
    <Wrap gap="8" alignItems="center">
      <Tag
        hue="green"
        iconBefore="check"
        size={{ base: 'sm', md: 'md' }}
        data-testid="small-then-medium"
      >
        sm, md from md up
      </Tag>
      <Tag
        hue="blue"
        iconAfter="star"
        size={{ md: 'sm' }}
        data-testid="medium-then-small"
      >
        md, sm from md up
      </Tag>
      <Tag
        hue="purple"
        iconBefore="star"
        size={[null, 'sm']}
        data-testid="array-without-base"
      >
        md, sm from xs up
      </Tag>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboveMd = window.matchMedia(mdBreakpoint).matches;

    // The tag and its icon change size together at the breakpoint.
    expectTagSize(
      canvas.getByTestId('small-then-medium'),
      aboveMd ? 'md' : 'sm',
    );
    // With no `base`, the tag and its icon both fall back to `md`.
    expectTagSize(
      canvas.getByTestId('medium-then-small'),
      aboveMd ? 'sm' : 'md',
    );
    // The same for an array whose first entry is null.
    expectTagSize(
      canvas.getByTestId('array-without-base'),
      window.matchMedia(xsBreakpoint).matches ? 'sm' : 'md',
    );
  },
};

/**
 * `size` accepts conditional values. Resize the viewport across the `md`
 * breakpoint (768px) to see each tag and its icon switch size together.
 */
export const ResponsiveSize: Story = {
  ...responsiveSizeStory,
  play: async (context) => {
    // Fail loudly if the test viewport drops below `md`, rather than
    // repeating the narrow-viewport checks.
    expect(window.matchMedia(mdBreakpoint).matches).toBe(true);
    await responsiveSizeStory.play?.(context);
  },
};

/** The same tags below the `md` breakpoint. */
export const ResponsiveSizeNarrow: Story = {
  ...responsiveSizeStory,
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  play: async (context) => {
    // Fail loudly if the viewport global stops applying, rather than
    // repeating the wide-viewport checks. Below `xs`, the array tag also
    // checks its `md` fallback.
    expect(window.matchMedia(xsBreakpoint).matches).toBe(false);
    await responsiveSizeStory.play?.(context);
  },
};

// ============================================================================
// Icons
// ============================================================================

export const WithIcons: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        iconBefore
      </Text>
      <Wrap gap="8">
        <Tag hue="green" iconBefore="check">
          Approved
        </Tag>
        <Tag hue="red" iconBefore="warning">
          Error
        </Tag>
        <Tag hue="blue" iconBefore="info">
          Info
        </Tag>
      </Wrap>
      <Text textStyle="mono.md" mr="16">
        iconAfter
      </Text>
      <Wrap gap="8">
        <Tag hue="yellow" iconAfter="star">
          Featured
        </Tag>
        <Tag hue="magenta" iconAfter="tag">
          Sale
        </Tag>
        <Tag hue="indigo" iconAfter="flag">
          Flagged
        </Tag>
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Common Use Cases
// ============================================================================

export const StatusTags: Story = {
  name: 'Ex: Status Tags',
  render: () => (
    <Wrap gap="8">
      <Tag hue="green" variant="bold" iconBefore="check">
        Complete
      </Tag>
      <Tag hue="yellow" variant="bold" iconBefore="warning">
        Pending
      </Tag>
      <Tag hue="red" variant="bold" iconBefore="error">
        Failed
      </Tag>
      <Tag hue="blue" variant="bold" iconBefore="info">
        In Progress
      </Tag>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const CategoryTags: Story = {
  name: 'Ex: Category Tags',
  render: () => (
    <Wrap gap="8">
      <Tag hue="purple">Design</Tag>
      <Tag hue="teal">Engineering</Tag>
      <Tag hue="orange">Marketing</Tag>
      <Tag hue="green">Sales</Tag>
      <Tag hue="magenta">Support</Tag>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Interactive Playground
// ============================================================================

/**
 * Interactive playground to test all props
 */
export const Interactive: Story = {
  args: {
    variant: 'default',
    hue: 'gray',
    children: 'Tag Label',
  },
};
