import type { Meta, StoryObj } from '@storybook/react';

import { expect, fn, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Box } from '../Box';
import { Card } from '../Card';
import { Label } from '../Label';
import { ToggleInput } from '../ToggleInput';
import { Toggle, type ToggleChangeHandler } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use `ToggleInput` in product settings and forms so label association and spacing are consistent. Use `Toggle` when composing custom wrappers only.',
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
    name: 'toggle-story',
    checked: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender() {
    const [checked, setChecked] = useState(false);

    return (
      <ToggleInput
        name="email-alerts"
        id="email-alerts"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Enable email alerts
      </ToggleInput>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Recommended default for app settings: controlled `ToggleInput` with clear label text.',
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <Card p="24" bg="bg.accent.tan.subtlest" display="grid" gap="12">
      <ToggleInput
        name="unchecked"
        id="unchecked"
        checked={false}
        onChange={() => {}}
      >
        Unchecked
      </ToggleInput>
      <ToggleInput
        name="checked"
        id="checked"
        checked={true}
        onChange={() => {}}
      >
        Checked
      </ToggleInput>
      <ToggleInput
        name="error"
        id="error"
        checked={false}
        error
        onChange={() => {}}
      >
        Error
      </ToggleInput>
      <ToggleInput
        name="disabled"
        id="disabled"
        checked={false}
        disabled
        onChange={() => {}}
      >
        Disabled
      </ToggleInput>
      <ToggleInput
        name="disabled-checked"
        id="disabled-checked"
        checked={true}
        disabled
        onChange={() => {}}
      >
        Disabled checked
      </ToggleInput>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'State coverage is demonstrated with `ToggleInput`, the primary component for application usage.',
      },
    },
  },
};

export const ExPrimitiveOnly: Story = {
  name: 'Ex: Primitive Toggle Only',
  render: function ExPrimitiveOnlyRender() {
    const [checked, setChecked] = useState(false);
    const onChange: ToggleChangeHandler = (e) => setChecked(e.target.checked);
    const id = 'primitive-toggle';

    return (
      <Label htmlFor={id} display="inline-flex" alignItems="center" gap="6">
        <Toggle
          name="primitive-toggle"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        Manual composition using Toggle primitive
      </Label>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Primitive-only example for advanced composition. Prefer `ToggleInput` in application code.',
      },
    },
  },
};

export const ExSettingsGroup: Story = {
  name: 'Ex: Settings Group',
  render: function ExSettingsGroupRender() {
    const [settings, setSettings] = useState({
      marketing: false,
      updates: true,
      reminders: false,
    });

    return (
      <Box display="grid" gap="10">
        <ToggleInput
          name="marketing"
          id="marketing"
          checked={settings.marketing}
          onChange={(e) =>
            setSettings({ ...settings, marketing: e.target.checked })
          }
        >
          Marketing emails
        </ToggleInput>
        <ToggleInput
          name="updates"
          id="updates"
          checked={settings.updates}
          onChange={(e) =>
            setSettings({ ...settings, updates: e.target.checked })
          }
        >
          Product updates
        </ToggleInput>
        <ToggleInput
          name="reminders"
          id="reminders"
          checked={settings.reminders}
          onChange={(e) =>
            setSettings({ ...settings, reminders: e.target.checked })
          }
        >
          Task reminders
        </ToggleInput>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const A11yKeyboardInteraction: Story = {
  name: 'A11y: Keyboard Interaction',
  render: function A11yKeyboardInteractionRender() {
    const [checked, setChecked] = useState(false);

    return (
      <ToggleInput
        name="a11y-toggle"
        id="a11y-toggle"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        Turn on compact mode
      </ToggleInput>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('checkbox', { name: /compact mode/i });

    toggle.focus();
    expect(toggle).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(toggle).toBeChecked();
  },
  parameters: { controls: { disable: true } },
};
