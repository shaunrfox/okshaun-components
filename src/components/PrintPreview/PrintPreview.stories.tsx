import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from '@storybook/test';
import { Grid, HStack, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { PrintPage } from './PrintPage';
import { PrintPreview } from './PrintPreview';
import type { PrintPreviewFit } from './pageGeometry';
import { type PageSize, pageSizes } from './pageSizes';
import { usePrintPage } from './usePrintPage';

/**
 * Shows printed pages at their true proportions, scaled to fit the area.
 *
 * - `PrintPreview` measures itself and applies one scale to every page.
 * - `PrintPage` takes the page size as a prop. It does not know what the
 *   content is, so it works with server HTML in an iframe, an editable
 *   canvas, or a rendered PDF page.
 * - `usePrintPage` gives content the scale and page geometry.
 */
const meta = {
  title: 'Components/PrintPreview',
  component: PrintPreview,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    fit: {
      control: 'select',
      options: ['page', 'width', 0.5, 1],
      description:
        '`page` fits the whole page, `width` fits its width, a number is a fixed zoom',
      table: { defaultValue: { summary: 'page' } },
    },
  },
  args: {
    fit: 'page',
    'aria-label': 'Document preview',
  },
} satisfies Meta<typeof PrintPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sample content that pads itself to the page margins with `usePrintPage`. */
const SampleDocument = ({ title }: { title: string }) => {
  const { margins } = usePrintPage();
  // Margins are runtime page values, so they pass through as a style.
  const padding = {
    paddingTop: margins.top,
    paddingRight: margins.right,
    paddingBottom: margins.bottom,
    paddingLeft: margins.left,
  };
  return (
    // Plain elements inherit the sheet's ink, so the sample reads the same in
    // both app themes.
    <VStack alignItems="stretch" gap="12" h="full" style={padding}>
      <Box as="h2" fontSize="24" fontWeight="bold">
        {title}
      </Box>
      <Box as="p">A short paragraph of sample text.</Box>
      <Box as="p">A second paragraph, to show the text flow.</Box>
      <VStack
        alignItems="stretch"
        gap="4"
        borderTopWidth="1"
        borderColor="neutral.30"
        pt="12"
      >
        <Box as="p">First item</Box>
        <Box as="p">Second item</Box>
      </VStack>
    </VStack>
  );
};

export const Default: Story = {
  render: (args) => (
    <Box h="lg">
      <PrintPreview {...args}>
        <PrintPage size={pageSizes.letter} margins={0.5} showMargins>
          <SampleDocument title="Sample document" />
        </PrintPage>
      </PrintPreview>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const preview = canvas.getByLabelText('Document preview');
    const page = preview.querySelector<HTMLElement>(
      '[data-ds-component="PrintPage"]',
    );
    await waitFor(() => {
      expect(page).not.toHaveAttribute('data-measuring');
    });
    // Letter is 816 CSS pixels wide at scale 1. Fit scales it down.
    await expect(page?.getBoundingClientRect().width).toBeLessThan(816);
  },
};

/** The same 4 × 6 in label, as given and turned to landscape. */
export const Orientation: Story = {
  render: (args) => (
    <Grid columns={2} gap="0">
      <Box h="md">
        <PrintPreview {...args} aria-label="Portrait label">
          <PrintPage size={pageSizes.label4x6} orientation="portrait">
            <SampleDocument title="Portrait" />
          </PrintPage>
        </PrintPreview>
      </Box>
      <Box h="md">
        <PrintPreview {...args} aria-label="Landscape label">
          <PrintPage size={pageSizes.label4x6} orientation="landscape">
            <SampleDocument title="Landscape" />
          </PrintPage>
        </PrintPreview>
      </Box>
    </Grid>
  ),
};

const sizeExamples: { name: string; size: PageSize }[] = [
  { name: 'Letter', size: pageSizes.letter },
  { name: 'A4', size: pageSizes.a4 },
  { name: 'Legal', size: pageSizes.legal },
  { name: 'Label 4 × 2 in', size: pageSizes.label4x2 },
  { name: 'Label 2 × 1 in', size: pageSizes.label2x1 },
  { name: 'Custom 100 × 50 mm', size: { width: 100, height: 50, unit: 'mm' } },
];

/** Presets and a custom size. Every size is a plain `PageSize` object. */
export const Sizes: Story = {
  render: (args) => (
    <Grid columns={3} gap="0">
      {sizeExamples.map(({ name, size }) => (
        <Box key={name} h="xs">
          <PrintPreview {...args} aria-label={name}>
            <PrintPage size={size}>
              <Box p="8">
                <Box as="p">{name}</Box>
              </Box>
            </PrintPage>
          </PrintPreview>
        </Box>
      ))}
    </Grid>
  ),
};

/** Margins can be one number or four sides, in the unit of the page size. */
export const Margins: Story = {
  render: (args) => (
    <Grid columns={2} gap="0">
      <Box h="md">
        <PrintPreview {...args} aria-label="Even margins">
          <PrintPage size={pageSizes.letter} margins={1} showMargins>
            <SampleDocument title="1 in all sides" />
          </PrintPage>
        </PrintPreview>
      </Box>
      <Box h="md">
        <PrintPreview {...args} aria-label="Mixed margins">
          <PrintPage
            size={pageSizes.a4}
            margins={{ top: 30, right: 15, bottom: 20, left: 25 }}
            showMargins
          >
            <SampleDocument title="Mixed, in mm" />
          </PrintPage>
        </PrintPreview>
      </Box>
    </Grid>
  ),
};

/** Pages stack and share one scale, set by the largest page. */
export const MultiplePages: Story = {
  args: { fit: 'width' },
  render: (args) => (
    <Box h="lg">
      <PrintPreview {...args}>
        <PrintPage size={pageSizes.letter} margins={0.5} showMargins>
          <SampleDocument title="Page 1" />
        </PrintPage>
        <PrintPage size={pageSizes.letter} margins={0.5} showMargins>
          <SampleDocument title="Page 2" />
        </PrintPage>
        <PrintPage size={pageSizes.label4x6}>
          <SampleDocument title="Label" />
        </PrintPage>
      </PrintPreview>
    </Box>
  ),
};

const sampleHtml = `<!doctype html>
<html><head><style>
  @page { size: letter; margin: 0.5in; }
  body { margin: 0.5in; font: 14px/1.4 system-ui, sans-serif; color: #1e1f21; }
  h1 { font-size: 28px; margin: 0 0 16px; }
</style></head><body>
  <h1>Sample page</h1>
  <p>This HTML lays out at 96 CSS pixels per inch, the same as print.</p>
</body></html>`;

/**
 * HTML in an iframe. The iframe fills the sheet at 96 CSS pixels per inch, so
 * it lays out as it prints.
 */
export const IframeContent: Story = {
  render: (args) => (
    <Box h="lg">
      <PrintPreview {...args}>
        <PrintPage size={pageSizes.letter} margins={0.5} showMargins>
          <Box
            as="iframe"
            title="Sample page"
            srcDoc={sampleHtml}
            w="full"
            h="full"
            borderWidth="0"
          />
        </PrintPage>
      </PrintPreview>
    </Box>
  ),
};

/** The overlay draws in page space above the content, such as an error marker. */
export const Overlay: Story = {
  render: (args) => (
    <Box h="lg">
      <PrintPreview {...args}>
        <PrintPage
          size={pageSizes.letter}
          margins={0.5}
          overlay={
            <Box
              position="absolute"
              top="96"
              left="48"
              w="272"
              h="40"
              borderWidth="2"
              borderStyle="solid"
              borderColor="border.danger"
              borderRadius="4"
            />
          }
        >
          <SampleDocument title="Sample document" />
        </PrintPage>
      </PrintPreview>
    </Box>
  ),
};

const fitOptions: { label: string; value: PrintPreviewFit }[] = [
  { label: 'Fit page', value: 'page' },
  { label: 'Fit width', value: 'width' },
  { label: '100%', value: 1 },
];

const cardSizes: { label: string; size: PageSize }[] = [
  { label: 'A6', size: pageSizes.a6 },
  { label: '4 × 6', size: pageSizes.postcard },
  { label: '5 × 7', size: pageSizes.card5x7 },
];

const CardPrintView = () => {
  const [fit, setFit] = useState<PrintPreviewFit>('page');
  const [size, setSize] = useState<PageSize>(pageSizes.postcard);
  const [landscape, setLandscape] = useState(false);
  return (
    <VStack alignItems="stretch" gap="0" h="lg">
      <HStack gap="8" p="8" borderBottomWidth="1" borderColor="border">
        {cardSizes.map((option) => (
          <Button
            key={option.label}
            size="sm"
            variant={size === option.size ? 'primary' : undefined}
            onClick={() => setSize(option.size)}
          >
            {option.label}
          </Button>
        ))}
        <Button size="sm" onClick={() => setLandscape((value) => !value)}>
          {landscape ? 'Portrait' : 'Landscape'}
        </Button>
        {fitOptions.map((option) => (
          <Button
            key={option.label}
            size="sm"
            variant={fit === option.value ? 'primary' : undefined}
            onClick={() => setFit(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </HStack>
      <Box flex="1" minH="0">
        <PrintPreview fit={fit} aria-label="Card preview">
          <PrintPage
            size={size}
            orientation={landscape ? 'landscape' : 'portrait'}
            margins={0.25}
            showMargins
          >
            <SampleDocument title="Greeting card" />
          </PrintPage>
        </PrintPreview>
      </Box>
    </VStack>
  );
};

/** Ex: a card print view with a size picker, orientation, and fit. */
export const ExCardPrintView: Story = {
  render: () => <CardPrintView />,
};
