import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '@styled-system/jsx';
import { type ChangeEvent, useState } from 'react';
import { Button } from '../../Button';
import { FormField } from '../../FormField';
import { TextInput } from '../../TextInput';
import { Modal } from '../Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modals/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pre-built form modal with TanStack Form wiring and default footer actions. Use `ModalWrapper` when you need full compositional control.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  name: 'Default',
  render: function DefaultRender() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Create process</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Create Process"
          submitLabel="Create"
          size="sm"
          defaultValues={{ name: '' }}
          onSubmit={async ({ close }) => {
            close();
          }}
        >
          {(form) => (
            <form.Field name="name">
              {(field) => (
                <FormField label="Process Name" labelFor="processName">
                  <TextInput
                    id="processName"
                    name="processName"
                    value={field.state.value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(event.target.value)
                    }
                    autoFocus
                  />
                </FormField>
              )}
            </form.Field>
          )}
        </Modal>
      </>
    );
  },
};

export const ValidationErrors: Story = {
  name: 'Validation Errors',
  render: function ValidationErrorsRender() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit profile</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Edit Profile"
          submitLabel="Save"
          size="sm"
          defaultValues={{ name: '', email: '' }}
          onSubmit={async ({ close }) => {
            close();
          }}
        >
          {(form) => (
            <VStack gap="12" alignItems="stretch">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim() ? 'Name is required' : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    label="Full Name"
                    labelFor="profile-name"
                    required
                    invalid={!field.state.meta.isValid}
                    errorText={field.state.meta.errors.join(', ')}
                  >
                    <TextInput
                      id="profile-name"
                      name="name"
                      value={field.state.value}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </FormField>
                )}
              </form.Field>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value.includes('@') ? 'Enter a valid email' : undefined,
                }}
              >
                {(field) => (
                  <FormField
                    label="Email"
                    labelFor="profile-email"
                    required
                    invalid={!field.state.meta.isValid}
                    errorText={field.state.meta.errors.join(', ')}
                  >
                    <TextInput
                      id="profile-email"
                      name="email"
                      type="email"
                      value={field.state.value}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </FormField>
                )}
              </form.Field>
            </VStack>
          )}
        </Modal>
      </>
    );
  },
};

export const AsyncSubmit: Story = {
  name: 'Async Submit',
  render: function AsyncSubmitRender() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Create project</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Create Project"
          submitLabel="Create"
          size="sm"
          defaultValues={{ name: '' }}
          onSubmit={async ({ close }) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            close();
          }}
        >
          {(form) => (
            <form.Field name="name">
              {(field) => (
                <FormField label="Project Name" labelFor="projectName">
                  <TextInput
                    id="projectName"
                    name="projectName"
                    value={field.state.value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(event.target.value)
                    }
                  />
                </FormField>
              )}
            </form.Field>
          )}
        </Modal>
      </>
    );
  },
};

export const CustomFooter: Story = {
  name: 'Custom Footer',
  parameters: {
    docs: {
      description: {
        story:
          'Use the `footer` prop for non-standard action layouts. Submit wiring is consumer-owned; prefer `ModalWrapper` when the footer must call `form.handleSubmit()`.',
      },
    },
  },
  render: function CustomFooterRender() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Batch close</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Close Selected Quotes"
          defaultValues={{ resolution: '' }}
          onSubmit={async ({ close }) => {
            close();
          }}
          footer={
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => setOpen(false)}
              >
                Close Lines
              </Button>
            </>
          }
        >
          {() => (
            <FormField label="Resolution" labelFor="resolution">
              <TextInput id="resolution" name="resolution" />
            </FormField>
          )}
        </Modal>
      </>
    );
  },
};

export const ExCreateProcess: Story = {
  name: 'Ex: Create Process',
  render: function ExCreateProcessRender() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Create New Process</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Create New Process"
          submitLabel="Create"
          size="sm"
          defaultValues={{ name: '' }}
          onSubmit={async ({ value, close }) => {
            await new Promise((resolve) => setTimeout(resolve, 800));
            window.alert(`Created process: ${value.name}`);
            close();
          }}
        >
          {(form) => (
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value.trim() ? 'Process name is required' : undefined,
              }}
            >
              {(field) => (
                <FormField
                  label="Process Name"
                  labelFor="processName"
                  required
                  invalid={!field.state.meta.isValid}
                  errorText={field.state.meta.errors.join(', ')}
                >
                  <TextInput
                    id="processName"
                    name="processName"
                    value={field.state.value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(event.target.value)
                    }
                    autoFocus
                  />
                </FormField>
              )}
            </form.Field>
          )}
        </Modal>
      </>
    );
  },
};
