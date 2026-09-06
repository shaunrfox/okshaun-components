import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '@styled-system/jsx';
import { useState } from 'react';
import type { DateValue, TimeValue } from '~/components/DateTime/helpers/types';
import { Text } from '~/components/Text';
import { SegmentedDate } from './SegmentedDate';
import { SegmentedInput } from './SegmentedInput';
import { SegmentedTime } from './SegmentedTime';
import type { SegmentedInputItem, SegmentedInputValueMap } from './types';

const meta = {
  title: 'Components/SegmentedInputs',
  component: SegmentedInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SegmentedInput>;

export default meta;
type Story = StoryObj;

const formatValue = (value: unknown) => JSON.stringify(value);

const getNumericSegment = (
  id: string,
  label: string,
  placeholder: string,
  value: number | null,
  digits: number,
  max: number,
): SegmentedInputItem => ({
  type: 'segment',
  kind: 'numeric',
  id,
  label,
  placeholder,
  value,
  digits,
  min: 0,
  max,
});

const makeSeparator = (
  id: string,
  content: string,
  gap: 'none' | 'tight' | 'normal' | 'loose' = 'normal',
): SegmentedInputItem => ({
  type: 'separator',
  id,
  content,
  gap,
});

export const DateFormats: Story = {
  name: 'SegmentedDate',
  render: function DateRender() {
    const [date, setDate] = useState<DateValue | null>({
      year: 2026,
      month: 7,
      day: 17,
    });

    return (
      <VStack gap="8" alignItems="flex-start">
        <SegmentedDate value={date} onChange={setDate} />
        <SegmentedDate format="MM/DD/YYYY" value={date} onChange={setDate} />
      </VStack>
    );
  },
  parameters: { controls: { disable: true } },
};

export const TimeFormats: Story = {
  name: 'SegmentedTime',
  render: function TimeRender() {
    const [time, setTime] = useState<TimeValue | null>({
      hour: 13,
      minute: 30,
    });

    return (
      <VStack gap="8" alignItems="flex-start">
        <SegmentedTime value={time} onChange={setTime} />
        <SegmentedTime timeFormat="24" value={time} onChange={setTime} />
      </VStack>
    );
  },
  parameters: { controls: { disable: true } },
};

export const CustomComposition: Story = {
  render: function CustomCompositionRender() {
    const [values, setValues] = useState<SegmentedInputValueMap>({
      prefix: null,
      middle: null,
      suffix: null,
    });

    const items: SegmentedInputItem[] = [
      getNumericSegment(
        'prefix',
        'Prefix',
        '___',
        values.prefix as number | null,
        3,
        999,
      ),
      makeSeparator('prefix-middle', '-', 'loose'),
      getNumericSegment(
        'middle',
        'Middle',
        '___',
        values.middle as number | null,
        3,
        999,
      ),
      makeSeparator('middle-suffix', '-', 'loose'),
      getNumericSegment(
        'suffix',
        'Suffix',
        '____',
        values.suffix as number | null,
        4,
        9999,
      ),
    ];

    return (
      <VStack gap="4" alignItems="flex-start">
        <SegmentedInput
          label="Custom segmented identifier"
          items={items}
          onChange={({ values: nextValues }) => setValues(nextValues)}
        />
        <Text textStyle="mono.xs" color="text.subtlest">
          {formatValue(values)}
        </Text>
      </VStack>
    );
  },
  parameters: { controls: { disable: true } },
};

export const SeparatorSpacing: Story = {
  render: function SeparatorSpacingRender() {
    return (
      <VStack gap="8" alignItems="flex-start">
        <SegmentedDate separators={{ gap: 'tight' }} />
        <SegmentedDate separators={{ gap: 'loose' }} />
        <SegmentedTime
          separators={{
            time: { gap: 'tight' },
            meridiem: { gap: 'loose' },
          }}
        />
      </VStack>
    );
  },
  parameters: { controls: { disable: true } },
};

export const FutureExtensionExamples: Story = {
  render: function FutureExtensionExamplesRender() {
    const phoneItems: SegmentedInputItem[] = [
      getNumericSegment('area', 'Area code', '___', null, 3, 999),
      makeSeparator('area-prefix', '-', 'loose'),
      getNumericSegment('prefix', 'Prefix', '___', null, 3, 999),
      makeSeparator('prefix-line', '-', 'loose'),
      getNumericSegment('line', 'Line number', '____', null, 4, 9999),
    ];
    const creditCardItems: SegmentedInputItem[] = [
      getNumericSegment('card-1', 'Card group 1', '____', null, 4, 9999),
      makeSeparator('card-sep-1', ' ', 'loose'),
      getNumericSegment('card-2', 'Card group 2', '____', null, 4, 9999),
      makeSeparator('card-sep-2', ' ', 'loose'),
      getNumericSegment('card-3', 'Card group 3', '____', null, 4, 9999),
      makeSeparator('card-sep-3', ' ', 'loose'),
      getNumericSegment('card-4', 'Card group 4', '____', null, 4, 9999),
    ];
    const emailLikeItems: SegmentedInputItem[] = [
      getNumericSegment('mail-a', 'Mailbox prefix', '____', null, 4, 9999),
      makeSeparator('mail-at', '@', 'normal'),
      getNumericSegment('mail-b', 'Mailbox domain', '______', null, 6, 999999),
      makeSeparator('mail-dot', '.', 'normal'),
      getNumericSegment('mail-c', 'Mailbox suffix', '___', null, 3, 999),
    ];
    const prcItems: SegmentedInputItem[] = [
      getNumericSegment('prc-a', 'PRC part prefix', '___', null, 3, 999),
      makeSeparator('prc-sep', ' ', 'loose'),
      getNumericSegment('prc-b', 'PRC part suffix', '___', null, 3, 999),
    ];

    return (
      <VStack gap="8" alignItems="flex-start">
        <SegmentedInput label="Phone number" items={phoneItems} />
        <SegmentedInput label="Credit card" items={creditCardItems} />
        <SegmentedInput label="Email-like identifier" items={emailLikeItems} />
        <SegmentedInput label="PRC part" items={prcItems} />
      </VStack>
    );
  },
};
