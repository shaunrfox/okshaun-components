import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useState } from 'react';
import { Box } from '../Box';
import { CheckboxInput } from '../CheckboxInput';
import { TextInput } from '../TextInput';
import { FormField } from './FormField';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Company Name',
    labelFor: 'company-name',
    children: null,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender() {
    const [value, setValue] = useState('');

    return (
      <FormField
        label="Company Name"
        labelFor="company-name"
        helpText="Use your legal business name for billing."
      >
        <TextInput
          id="company-name"
          name="company-name"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="Acme Manufacturing"
        />
      </FormField>
    );
  },
};

export const InlineLayout: Story = {
  render: function InlineLayoutRender() {
    const [value, setValue] = useState('');

    return (
      <FormField
        layout="inline"
        label="Order Number"
        labelFor="order-number"
        helpText="Used for matching external invoices."
        maxW="xl"
      >
        <TextInput
          id="order-number"
          name="order-number"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="SO-28417"
        />
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ExFieldWithError: Story = {
  name: 'Ex: Validation Error',
  render: function ExFieldWithErrorRender() {
    const [email, setEmail] = useState('');
    const showError = email.length > 0 && !email.includes('@');

    return (
      <FormField
        label="Notification Email"
        labelFor="notification-email"
        required
        error={showError}
        errorText="Enter a valid email address."
      >
        <TextInput
          id="notification-email"
          name="notification-email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="team@company.com"
          type="email"
        />
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ExWithInputWrappers: Story = {
  name: 'Ex: Label + Input Wrapper Composition',
  render: function ExWithInputWrappersRender() {
    const [settings, setSettings] = useState({ invoices: true, alerts: false });

    return (
      <Box maxW="lg">
        <FormField
          label="Email Preferences"
          labelFor="invoices"
          helpText="Choose which events should trigger notifications."
        >
          <CheckboxInput
            id="invoices"
            name="invoices"
            checked={settings.invoices}
            onChange={(e) =>
              setSettings({ ...settings, invoices: e.target.checked })
            }
          >
            Invoice sent notifications
          </CheckboxInput>
          <CheckboxInput
            id="alerts"
            name="alerts"
            checked={settings.alerts}
            onChange={(e) =>
              setSettings({ ...settings, alerts: e.target.checked })
            }
          >
            Critical system alerts
          </CheckboxInput>
        </FormField>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};
