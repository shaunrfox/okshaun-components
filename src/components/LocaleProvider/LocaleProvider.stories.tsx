import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { type LocaleLabels, LocaleProvider } from '~/system/context';
import { Box } from '../Box';
import { Calendar } from '../Calendar';
import { Chip } from '../Chip';
import { CodeBlock } from '../CodeBlock';
import { DateTimeInput } from '../DateTime';
import { Select, SelectOption } from '../Select';

/**
 * Example Spanish translations. In the app, each value comes from the app's
 * own translation function, for example `t('ds.previousMonth')`.
 */
const spanishLabels: Partial<LocaleLabels> = {
  selectPlaceholder: 'Seleccionar...',
  chooseDate: 'Elegir fecha',
  previousMonth: 'Mes anterior',
  nextMonth: 'Mes siguiente',
  today: 'hoy',
  selected: 'seleccionado',
  date: 'Fecha',
  time: 'Hora',
  month: 'Mes',
  day: 'Día',
  year: 'Año',
  hour: 'Hora',
  minute: 'Minuto',
  monthPlaceholder: 'MM',
  dayPlaceholder: 'DD',
  yearPlaceholder: 'AAAA',
  clearDateTime: 'Borrar fecha y hora',
};

const meta = {
  title: 'Components/LocaleProvider',
  component: LocaleProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Provides a locale and translated built-in labels to every design-system component below it. The design system does not translate text: the app passes its own translations through `labels`. A label left out keeps its English default. A label prop on a component overrides the provider. Text direction comes from `<html dir>`, not from this provider.',
      },
    },
  },
  args: {
    locale: 'es-ES',
    labels: spanishLabels,
    children: null,
  },
} satisfies Meta<typeof LocaleProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LocaleProvider {...args}>
      <Box display="grid" gap="16" w="xs">
        <Select>
          <SelectOption value="open" label="Abierto" />
          <SelectOption value="closed" label="Cerrado" />
        </Select>
        <DateTimeInput />
        <Calendar />
      </Box>
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Mes anterior' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('group', { name: 'Elegir fecha' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Seleccionar...')).toBeInTheDocument();
    await expect(
      canvas.getByRole('spinbutton', { name: 'Año' }),
    ).toBeInTheDocument();
  },
};

export const PropOverridesProvider: Story = {
  name: 'Prop Overrides Provider',
  render: (args) => (
    <LocaleProvider {...args}>
      <Calendar label="Fecha de factura" />
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('group', { name: 'Fecha de factura' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Mes anterior' }),
    ).toBeInTheDocument();
  },
};

export const CodeBlockLabels: Story = {
  name: 'Code Block Labels',
  render: () => (
    <LocaleProvider
      labels={{
        copyCode: 'Copiar código',
        showAllLines: (count) => `Mostrar las ${count} líneas`,
      }}
    >
      <Box w="xs">
        <CodeBlock code={'uno\ndos\ntres\ncuatro\ncinco'} maxLines={3} />
      </Box>
    </LocaleProvider>
  ),
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Copiar código' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Mostrar las 5 líneas' }),
    ).toBeInTheDocument();
  },
};

export const UndefinedLabelKeepsDefault: Story = {
  name: 'Undefined Label Keeps Default',
  render: () => (
    <LocaleProvider labels={{ removeItem: undefined }}>
      <Chip dismissable onDismiss={() => {}}>
        Widget
      </Chip>
    </LocaleProvider>
  ),
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Remove Widget' }),
    ).toBeInTheDocument();
  },
};

export const EnglishDefaults: Story = {
  name: 'English Defaults Without a Provider',
  render: () => <Calendar />,
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Previous month' }),
    ).toBeInTheDocument();
  },
};
