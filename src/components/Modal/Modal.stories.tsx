import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { Button } from '../Button';
import { Text } from '../Text';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Modal size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    preventOverlayClose: {
      control: 'boolean',
      description: 'Prevent closing when clicking overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ============================================================================
// DEFAULT STORY
// ============================================================================

export const Default: Story = {
  render: () => {
    const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="md">
          <ModalHeader title="Dialog Title" showCloseButton />
          <ModalBody>
            <Text>
              This is the default modal dialog. It has a title, body content,
              and footer with action buttons.
            </Text>
            <Text mt="4">
              You can close it by clicking the X button, pressing Escape, or
              clicking outside the modal.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// SMALL SIZE
// ============================================================================

export const Small: Story = {
  render: () => {
    const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="sm">
          <ModalHeader title="Small Dialog" showCloseButton />
          <ModalBody>
            <Text>This is a small modal (400px max width).</Text>
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// LARGE SIZE
// ============================================================================

export const Large: Story = {
  render: () => {
    const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="lg">
          <ModalHeader title="Large Dialog" showCloseButton />
          <ModalBody>
            <Text>This is a large modal (720px max width).</Text>
            <Text mt="4">
              It provides more space for content, forms, or detailed information
              that needs to be displayed in a dialog.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// NO CLOSE BUTTON
// ============================================================================

export const NoCloseButton: Story = {
  render: () => {
    const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (No Close Button)
        </Button>
        <Modal open={isOpen} onOpenChange={setIsOpen} size="md">
          <ModalHeader
            title="Dialog Without Close Button"
            showCloseButton={false}
          />
          <ModalBody>
            <Text>This modal doesn't have a close button in the header.</Text>
            <Text mt="4">
              You can still close it by clicking outside or pressing Escape.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => setIsOpen(false)}>
              Continue
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// PREVENT OVERLAY CLOSE
// ============================================================================

export const PreventOverlayClose: Story = {
  render: () => {
    const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (No Overlay Close)
        </Button>
        <Modal
          open={isOpen}
          onOpenChange={setIsOpen}
          size="md"
          preventOverlayClose
        >
          <ModalHeader title="Important Dialog" showCloseButton />
          <ModalBody>
            <Text>This modal cannot be closed by clicking the overlay.</Text>
            <Text mt="4">
              You must use the close button or press Escape to dismiss it. This
              is useful for important confirmations or required actions.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button appearance="primary" onClick={() => setIsOpen(false)}>
              I Understand
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
    };
    return <Component />;
  },
};
