import type { Meta, StoryObj } from '@storybook/react';

import { expect, fn, userEvent, within } from '@storybook/test';
import { useId, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { RadioInput } from '../RadioInput';
import { Text } from '../Text';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    name: 'radio-group-story',
    onChange: fn(),
    // Every story supplies children through `render`.
    children: null,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  ['standard', 'Standard shipping'],
  ['express', 'Express shipping'],
  ['overnight', 'Overnight shipping'],
] as const;

export const Controlled: Story = {
  render: function ControlledRender() {
    const groupId = useId();
    const [selected, setSelected] = useState('standard');

    return (
      <RadioGroup
        id={groupId}
        name={`${groupId}-shipping`}
        label="Shipping method"
        value={selected}
        onChange={setSelected}
      >
        <Box display="grid" gap="10">
          {options.map(([value, label]) => (
            <RadioInput
              key={value}
              name={`${groupId}-shipping`}
              value={value}
              checked={selected === value}
              onChange={() => setSelected(value)}
            >
              {label}
            </RadioInput>
          ))}
        </Box>
      </RadioGroup>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Uncontrolled: Story = {
  render: function UncontrolledRender() {
    const groupId = useId();

    return (
      <RadioGroup
        id={groupId}
        name={`${groupId}-shipping`}
        label="Shipping method"
        defaultValue="express"
      >
        <Box display="grid" gap="10">
          {options.map(([value, label]) => (
            <RadioInput key={value} value={value}>
              {label}
            </RadioInput>
          ))}
        </Box>
      </RadioGroup>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const groupId = useId();

    return (
      <RadioGroup
        id={groupId}
        name={`${groupId}-shipping`}
        label="Shipping method"
        defaultValue="standard"
        disabled
      >
        <Box display="grid" gap="10">
          {options.map(([value, label]) => (
            <RadioInput key={value} value={value}>
              {label}
            </RadioInput>
          ))}
        </Box>
      </RadioGroup>
    );
  },
  parameters: { controls: { disable: true } },
};

export const WithFormField: Story = {
  name: 'FormField Composition',
  render: function WithFormFieldRender() {
    const groupId = useId();

    return (
      <FormField
        label="Delivery speed"
        labelFor={groupId}
        helpText="The group owns checked state and shared name."
      >
        <RadioGroup
          id={groupId}
          name={`${groupId}-delivery`}
          label="Delivery speed"
          defaultValue="standard"
        >
          <Box display="grid" gap="10">
            {options.map(([value, label]) => (
              <RadioInput key={value} value={value}>
                {label}
              </RadioInput>
            ))}
          </Box>
        </RadioGroup>
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};

export const NativeFormSubmission: Story = {
  render: function NativeFormSubmissionRender() {
    const groupId = useId();
    const [submitted, setSubmitted] = useState('none');

    return (
      <Box
        as="form"
        display="grid"
        gap="12"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(String(data.get('shipping') ?? 'none'));
        }}
      >
        <RadioGroup
          id={groupId}
          name="shipping"
          label="Shipping method"
          defaultValue="overnight"
        >
          <Box display="grid" gap="10">
            {options.map(([value, label]) => (
              <RadioInput key={value} value={value}>
                {label}
              </RadioInput>
            ))}
          </Box>
        </RadioGroup>
        <Button type="submit">Submit</Button>
        <Text textStyle="mono.xs">Submitted: {submitted}</Text>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ArrowNavigation: Story = {
  name: 'Arrow Navigation',
  render: function ArrowNavigationRender() {
    const groupId = useId();
    const [selected, setSelected] = useState('standard');

    return (
      <RadioGroup
        id={groupId}
        name={`${groupId}-shipping`}
        label="Shipping method"
        value={selected}
        onChange={setSelected}
      >
        <Box display="grid" gap="10">
          {options.map(([value, label]) => (
            <RadioInput
              key={value}
              value={value}
              checked={selected === value}
              onChange={() => setSelected(value)}
            >
              {label}
            </RadioInput>
          ))}
        </Box>
      </RadioGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('radio', { name: /standard shipping/i });

    first.focus();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');

    const second = canvas.getByRole('radio', { name: /express shipping/i });
    expect(second).toBeChecked();
  },
  parameters: { controls: { disable: true } },
};
