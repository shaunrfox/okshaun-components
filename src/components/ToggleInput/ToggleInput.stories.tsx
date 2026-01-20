import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within, expect } from '@storybook/test';
import { ToggleInput } from './ToggleInput';
import { ToggleChangeHandler } from '../Toggle';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../Button';

const meta: Meta<typeof ToggleInput> = {
  title: 'Components/ToggleInput',
  component: ToggleInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the toggle input',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'ID attribute for the toggle input',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Label text for the toggle',
      table: {
        defaultValue: { summary: undefined },
        type: { summary: 'string | ReactNode' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Display error state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Checked state of the toggle',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    name: 'toggle',
    children: 'Toggle label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - Most common usage
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const handleChange: ToggleChangeHandler = (e) =>
      setChecked(e.target.checked);

    return (
      <ToggleInput
        name="notifications"
        id="notifications"
        checked={checked}
        onChange={handleChange}
      >
        Enable notifications
      </ToggleInput>
    );
  },
};

// 2. All States - Show all variants/states together (PREFERRED)
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <Box display="flex" flexDirection="column" gap="16">
      <ToggleInput
        name="unchecked"
        id="unchecked"
        checked={false}
        onChange={() => {}}
      >
        <Text>Off</Text>
      </ToggleInput>
      <ToggleInput
        name="checked"
        id="checked"
        checked={true}
        onChange={() => {}}
      >
        <Text>On</Text>
      </ToggleInput>
      <ToggleInput
        name="error"
        id="error"
        error
        checked={false}
        onChange={() => {}}
      >
        <Text>Error state</Text>
      </ToggleInput>
      <ToggleInput
        name="disabled"
        id="disabled"
        disabled
        checked={false}
        onChange={() => {}}
      >
        <Text>Disabled (off)</Text>
      </ToggleInput>
      <ToggleInput
        name="disabled-checked"
        id="disabled-checked"
        disabled
        checked={true}
        onChange={() => {}}
      >
        <Text>Disabled (on)</Text>
      </ToggleInput>
    </Box>
  ),
};

// 3. Example Stories - Use "Ex:" prefix
export const ExInteractive: Story = {
  name: 'Ex: Interactive Toggle',
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box display="flex" flexDirection="column" gap="12">
        <ToggleInput
          name="interactive"
          id="interactive"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Click to toggle (currently: {checked ? 'on' : 'off'})
        </ToggleInput>
      </Box>
    );
  },
};

export const ExSettingsPanel: Story = {
  name: 'Ex: Settings Panel',
  render: () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      notifications: true,
      autoSave: true,
      analytics: false,
    });

    const handleChange =
      (key: keyof typeof settings) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [key]: e.target.checked });
      };

    return (
      <Box display="flex" flexDirection="column" gap="16" minWidth="xl">
        <Text fontWeight="semibold" fontSize="18">
          Settings
        </Text>

        <ToggleInput
          name="darkMode"
          id="darkMode"
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
        >
          Dark mode
        </ToggleInput>

        <ToggleInput
          name="notifications"
          id="notifications"
          checked={settings.notifications}
          onChange={handleChange('notifications')}
        >
          Push notifications
        </ToggleInput>

        <ToggleInput
          name="autoSave"
          id="autoSave"
          checked={settings.autoSave}
          onChange={handleChange('autoSave')}
        >
          Auto-save drafts
        </ToggleInput>

        <ToggleInput
          name="analytics"
          id="analytics"
          checked={settings.analytics}
          onChange={handleChange('analytics')}
        >
          Share usage analytics
        </ToggleInput>
      </Box>
    );
  },
};

export const ExFormIntegration: Story = {
  name: 'Ex: Form Integration',
  render: () => {
    const [formData, setFormData] = useState({
      marketing: false,
      terms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert(
        `Form submitted:\nMarketing emails: ${formData.marketing}\nTerms accepted: ${formData.terms}`,
      );
    };

    return (
      <Box
        as="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap="16"
      >
        <ToggleInput
          name="marketing"
          id="marketing"
          checked={formData.marketing}
          onChange={(e) =>
            setFormData({ ...formData, marketing: e.target.checked })
          }
        >
          Receive marketing emails (optional)
        </ToggleInput>

        <ToggleInput
          name="terms"
          id="terms"
          checked={formData.terms}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.checked })
          }
          error={!formData.terms}
        >
          I accept the terms and conditions *
        </ToggleInput>

        <Box mt="8">
          <Button type="submit" disabled={!formData.terms}>
            Submit
          </Button>
        </Box>
      </Box>
    );
  },
};

export const ExFeatureFlags: Story = {
  name: 'Ex: Feature Flags',
  render: () => {
    const [features, setFeatures] = useState({
      betaFeatures: false,
      experimentalUI: false,
      debugMode: false,
    });

    const handleChange =
      (key: keyof typeof features) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeatures({ ...features, [key]: e.target.checked });
      };

    return (
      <Box display="flex" flexDirection="column" gap="16" minWidth="xl">
        <Text fontWeight="semibold" fontSize="18">
          Developer Options
        </Text>

        <ToggleInput
          name="betaFeatures"
          id="betaFeatures"
          checked={features.betaFeatures}
          onChange={handleChange('betaFeatures')}
        >
          <Box display="flex" flexDirection="column">
            <Text>Beta features</Text>
            <Text fontSize="14" color="text.subtlest">
              Try new features before they're released
            </Text>
          </Box>
        </ToggleInput>

        <ToggleInput
          name="experimentalUI"
          id="experimentalUI"
          checked={features.experimentalUI}
          onChange={handleChange('experimentalUI')}
        >
          <Box display="flex" flexDirection="column">
            <Text>Experimental UI</Text>
            <Text fontSize="14" color="text.subtlest">
              Use the redesigned interface
            </Text>
          </Box>
        </ToggleInput>

        <ToggleInput
          name="debugMode"
          id="debugMode"
          checked={features.debugMode}
          onChange={handleChange('debugMode')}
        >
          <Box display="flex" flexDirection="column">
            <Text>Debug mode</Text>
            <Text fontSize="14" color="text.subtlest">
              Show developer information
            </Text>
          </Box>
        </ToggleInput>
      </Box>
    );
  },
};

// 4. Accessibility Stories - Use "A11y:" prefix
export const A11yAccessibilityCheck: Story = {
  name: 'A11y: Accessibility Check',
  render: () => {
    const [checked, setChecked] = useState(false);
    const handleChange: ToggleChangeHandler = (e) =>
      setChecked(e.target.checked);

    return (
      <ToggleInput
        name="accessible"
        id="accessible"
        checked={checked}
        onChange={handleChange}
      >
        Accessible toggle
      </ToggleInput>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find toggle by role (checkbox role since it's an input type="checkbox")
    const toggle = canvas.getByRole('checkbox');

    // Verify toggle has accessible name from label
    expect(toggle).toHaveAccessibleName('Accessible toggle');

    // Test keyboard interaction
    toggle.focus();
    expect(toggle).toHaveFocus();

    // Test spacebar to check
    await userEvent.keyboard(' ');
    expect(toggle).toBeChecked();

    // Test spacebar to uncheck
    await userEvent.keyboard(' ');
    expect(toggle).not.toBeChecked();
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
};

export const A11yKeyboardNavigation: Story = {
  name: 'A11y: Keyboard Navigation',
  render: () => (
    <Box display="flex" flexDirection="column" gap="12">
      <ToggleInput name="first" id="first" checked={false} onChange={() => {}}>
        First toggle
      </ToggleInput>
      <ToggleInput
        name="second"
        id="second"
        checked={false}
        onChange={() => {}}
      >
        Second toggle
      </ToggleInput>
      <ToggleInput name="third" id="third" checked={false} onChange={() => {}}>
        Third toggle
      </ToggleInput>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find first toggle
    const firstToggle = canvas.getByRole('checkbox', { name: /first/i });

    // Focus first toggle
    firstToggle.focus();
    expect(firstToggle).toHaveFocus();

    // Tab to next toggle
    await userEvent.tab();
    const secondToggle = canvas.getByRole('checkbox', { name: /second/i });
    expect(secondToggle).toHaveFocus();

    // Tab to third toggle
    await userEvent.tab();
    const thirdToggle = canvas.getByRole('checkbox', { name: /third/i });
    expect(thirdToggle).toHaveFocus();
  },
};
