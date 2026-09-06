import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useState } from 'react';
import { Box } from '../Box';
import { CheckboxInput } from '../CheckboxInput';
import { Textarea } from '../Textarea';
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

export const SuccessState: Story = {
  render: function SuccessStateRender() {
    const [value, setValue] = useState('shaun@example.com');

    return (
      <FormField
        label="Recovery Email"
        labelFor="recovery-email"
        success
        successText="Looks good."
      >
        <TextInput
          id="recovery-email"
          name="recovery-email"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          type="email"
        />
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};

export const NestedControls: Story = {
  render: function NestedControlsRender() {
    const [bio, setBio] = useState('');
    const [options, setOptions] = useState({
      marketing: true,
      product: false,
    });

    return (
      <FormField
        label="Profile Details"
        labelFor="profile-details"
        helpText="Nested controls should inherit the surrounding field state."
        gap="4"
      >
        <Textarea
          id="profile-details"
          name="profile-details"
          value={bio}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setBio(e.target.value)
          }
          rows={4}
        />
        <Box display="grid" gap="2">
          <CheckboxInput
            id="marketing"
            name="marketing"
            checked={options.marketing}
            onChange={(e) =>
              setOptions({ ...options, marketing: e.target.checked })
            }
          >
            Marketing updates
          </CheckboxInput>
          <CheckboxInput
            id="product"
            name="product"
            checked={options.product}
            onChange={(e) =>
              setOptions({ ...options, product: e.target.checked })
            }
          >
            Product announcements
          </CheckboxInput>
        </Box>
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};

export const InlineGapOverride: Story = {
  render: function InlineGapOverrideRender() {
    const [value, setValue] = useState('');

    return (
      <FormField
        layout="inline"
        label="Reference"
        labelFor="reference"
        helpText="Custom gap keeps the input stack breathable."
        gap="4"
        maxW="xl"
      >
        <TextInput
          id="reference"
          name="reference"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          placeholder="INV-2048"
        />
      </FormField>
    );
  },
  parameters: { controls: { disable: true } },
};
