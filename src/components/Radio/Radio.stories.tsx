import type { Meta, StoryObj } from '@storybook/react';

import { expect, fn, userEvent, within } from '@storybook/test';
import { useId, useState } from 'react';
import { Box } from '../Box';
import { Card } from '../Card';
import { RadioInput } from '../RadioInput';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use `RadioInput` for product forms so each option includes a label and reliable hit area. Use `Radio` only for custom composition patterns.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    id: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    name: 'radio-story',
    checked: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender() {
    const groupId = useId();
    const [selected, setSelected] = useState('standard');

    return (
      <Box display="grid" gap="10">
        <RadioInput
          name={`${groupId}-shipping`}
          id={`${groupId}-standard`}
          checked={selected === 'standard'}
          onChange={() => setSelected('standard')}
        >
          Standard shipping
        </RadioInput>
        <RadioInput
          name={`${groupId}-shipping`}
          id={`${groupId}-express`}
          checked={selected === 'express'}
          onChange={() => setSelected('express')}
        >
          Express shipping
        </RadioInput>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Recommended usage: `RadioInput` options in a controlled group with user-facing labels.',
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <Card p="24" bg="bg.accent.tan.subtlest" display="grid" gap="12">
      <RadioInput
        name="unchecked"
        id="unchecked"
        checked={false}
        onChange={() => {}}
      >
        Unchecked
      </RadioInput>
      <RadioInput
        name="checked"
        id="checked"
        checked={true}
        onChange={() => {}}
      >
        Checked
      </RadioInput>
      <RadioInput
        name="error"
        id="error"
        checked={false}
        error
        onChange={() => {}}
      >
        Error
      </RadioInput>
      <RadioInput
        name="disabled"
        id="disabled"
        checked={false}
        disabled
        onChange={() => {}}
      >
        Disabled
      </RadioInput>
      <RadioInput
        name="disabled-checked"
        id="disabled-checked"
        checked={true}
        disabled
        onChange={() => {}}
      >
        Disabled checked
      </RadioInput>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'State examples are shown as `RadioInput` options because that is the primary form integration path.',
      },
    },
  },
};

export const ExPrimitiveOnly: Story = {
  name: 'Ex: Primitive Radio Only',
  render: function ExPrimitiveOnlyRender() {
    const groupId = useId();
    const [selected, setSelected] = useState('one');

    return (
      <Box display="grid" gap="10">
        <Radio
          name={`${groupId}-primitive`}
          id={`${groupId}-one`}
          checked={selected === 'one'}
          onChange={() => setSelected('one')}
        />
        <Radio
          name={`${groupId}-primitive`}
          id={`${groupId}-two`}
          checked={selected === 'two'}
          onChange={() => setSelected('two')}
        />
      </Box>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Primitive-only example for advanced wrappers. Prefer `RadioInput` in application flows.',
      },
    },
  },
};

export const A11yKeyboardNavigation: Story = {
  name: 'A11y: Arrow Key Navigation',
  render: function A11yKeyboardNavigationRender() {
    const groupId = useId();
    const [selected, setSelected] = useState('first');

    const makeChangeHandler = (value: 'first' | 'second' | 'third') => {
      return () => setSelected(value);
    };

    return (
      <Box display="grid" gap="10">
        <RadioInput
          name={`${groupId}-a11y-group`}
          id={`${groupId}-first`}
          checked={selected === 'first'}
          onChange={makeChangeHandler('first')}
        >
          First option
        </RadioInput>
        <RadioInput
          name={`${groupId}-a11y-group`}
          id={`${groupId}-second`}
          checked={selected === 'second'}
          onChange={makeChangeHandler('second')}
        >
          Second option
        </RadioInput>
        <RadioInput
          name={`${groupId}-a11y-group`}
          id={`${groupId}-third`}
          checked={selected === 'third'}
          onChange={makeChangeHandler('third')}
        >
          Third option
        </RadioInput>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('radio', { name: /first option/i });

    first.focus();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');

    const second = canvas.getByRole('radio', { name: /second option/i });
    expect(second).toBeChecked();
  },
  parameters: { controls: { disable: true } },
};
