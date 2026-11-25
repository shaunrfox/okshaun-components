import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import type { DateValue } from '~/components/DateTime/helpers';
import { Text } from '~/components/Text';
import { LocaleProvider } from '~/system/context';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone Days/Months/Years calendar grid. No popover, no input field, no picker — this is the pure selection surface that DateMenu/DateTimeMenu and eventually the pickers compose on top of.',
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatDate = (value: DateValue | null) =>
  value
    ? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
    : 'none';

// =============================================================================
// DEFAULT
// =============================================================================

const DefaultDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Calendar value={value} onChange={setValue} />
      <Text textStyle="mono.xs" color="text.subtlest">
        Selected: {formatDate(value)}
      </Text>
    </VStack>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
};

// =============================================================================
// WITH INITIAL SELECTION
// =============================================================================

const WithSelectionDemo = () => {
  const [value, setValue] = useState<DateValue | null>({
    year: 2026,
    month: 7,
    day: 13,
  });
  return <Calendar value={value} onChange={setValue} />;
};

export const WithSelection: Story = {
  render: () => <WithSelectionDemo />,
};

// =============================================================================
// MIN / MAX BOUNDS
// =============================================================================

const BoundedDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Text textStyle="mono.xs" color="text.subtlest">
        Bounded to 2026-07-01 through 2026-07-24 — everything outside that
        window is disabled at the day, month, and year level.
      </Text>
      <Calendar
        value={value}
        onChange={setValue}
        minDate={{ year: 2026, month: 7, day: 1 }}
        maxDate={{ year: 2026, month: 7, day: 24 }}
        defaultViewDate={{ year: 2026, month: 7 }}
      />
    </VStack>
  );
};

export const MinMaxBounds: Story = {
  render: () => <BoundedDemo />,
};

// =============================================================================
// DISABLED
// =============================================================================

export const Disabled: Story = {
  render: () => (
    <Calendar
      disabled
      value={{ year: 2026, month: 7, day: 13 }}
      defaultViewDate={{ year: 2026, month: 7 }}
    />
  ),
};

// =============================================================================
// Ex: Months/Years drill-down
// =============================================================================

const DrillDownDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Text textStyle="mono.xs" color="text.subtlest">
        Click the "Month Year" header label to jump to the Months view, then the
        year label to jump to Years — the standard fast-navigation drill-down
        for picking a date far from today.
      </Text>
      <Calendar
        value={value}
        onChange={setValue}
        defaultViewDate={{ year: 2026, month: 7 }}
      />
    </VStack>
  );
};

export const ExDrillDownNavigation: Story = {
  name: 'Ex: Drill-Down Navigation',
  render: () => <DrillDownDemo />,
};

// =============================================================================
// Locales
// =============================================================================

export const FrenchLocale: Story = {
  name: 'Locale: French',
  render: () => (
    <LocaleProvider locale="fr-FR">
      <Calendar defaultViewDate={{ year: 2026, month: 1 }} />
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'janvier 2026' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('columnheader', { name: 'dimanche' }),
    ).toHaveTextContent('dim');
    // fr-FR weeks start on Monday.
    await expect(canvas.getAllByRole('columnheader')[0]).toHaveAccessibleName(
      'lundi',
    );
    await expect(
      canvas.getByRole('gridcell', { name: '15 janvier 2026' }),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'janvier 2026' }));
    await expect(
      canvas.getByRole('gridcell', { name: 'février 2026' }),
    ).toHaveTextContent('févr.');
  },
};

export const SpanishLocale: Story = {
  name: 'Locale: Spanish',
  render: () => (
    <LocaleProvider
      locale="es-ES"
      labels={{ previousMonth: 'Mes anterior', nextMonth: 'Mes siguiente' }}
    >
      <Calendar defaultViewDate={{ year: 2026, month: 1 }} />
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'enero de 2026' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('columnheader', { name: 'miércoles' }),
    ).toHaveTextContent('mié');
    // es-ES weeks start on Monday.
    await expect(canvas.getAllByRole('columnheader')[0]).toHaveAccessibleName(
      'lunes',
    );
    await expect(
      canvas.getByRole('button', { name: 'Mes anterior' }),
    ).toBeInTheDocument();
  },
};

export const ThaiLocale: Story = {
  name: 'Locale: Thai (Gregorian Names)',
  render: () => (
    <LocaleProvider locale="th-TH">
      <Calendar defaultViewDate={{ year: 2026, month: 1 }} />
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // th-TH defaults to the Buddhist calendar (year 2569). Calendar's grid is
    // Gregorian, so the title must show 2026.
    await expect(
      canvas.getByRole('button', { name: 'มกราคม 2026' }),
    ).toBeInTheDocument();
  },
};
