import type { Meta, StoryObj } from '@storybook/react';

import { expect, userEvent, within } from '@storybook/test';

import { Flex, Grid, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Button } from '../../Button';
import { Divider } from '../../Divider';
import { FormField } from '../../FormField';
import { Icon } from '../../Icon';
import { Select, SelectOption } from '../../Select';
import { Text } from '../../Text';
import { Textarea } from '../../Textarea';
import { TextInput } from '../../TextInput';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { ModalWrapper } from '../ModalWrapper';

const meta: Meta<typeof ModalWrapper> = {
  title: 'Components/Modals/ModalWrapper',
  component: ModalWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full', 'fullPage'],
      description: 'Modal size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    preventOverlayClose: {
      control: 'boolean',
      description: 'Prevent closing when clicking overlay',
    },
    position: {
      control: 'select',
      options: ['centered', 'top'],
      description:
        'Centered in the viewport, or fixed below the top edge (horizontally centered)',
      table: {
        defaultValue: { summary: 'centered' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalWrapper>;

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
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="md">
            <ModalHeader title="Dialog Title" showCloseButton />
            <ModalBody>
              <Text>
                This is the default modal dialog. It has a title, body content,
                and footer with action buttons. Default max-width is 576px.
              </Text>
              <Text>
                You can close it by clicking the X button, pressing Escape, or
                clicking outside the modal.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save
              </Button>
            </ModalFooter>
          </ModalWrapper>
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
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="sm">
            <ModalHeader title="Small Dialog" showCloseButton />
            <ModalBody>
              <Text>This is a small modal (448px max width).</Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalWrapper>
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
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="lg">
            <ModalHeader title="Large Dialog" showCloseButton />
            <ModalBody>
              <Text>This is a large modal (768px max width).</Text>
              <Text>
                It provides more space for content, forms, or detailed
                information that needs to be displayed in a dialog.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// X-LARGE SIZE
// ============================================================================

export const XLarge: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open XLarge Modal</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="xl">
            <ModalHeader title="XLarge Dialog" showCloseButton />
            <ModalBody display="flex" flexDirection="column" gap="12">
              <Text>This is a x-large modal (1024px max width).</Text>
              <Text>
                It provides more space for content, forms, or detailed
                information that needs to be displayed in a dialog.
              </Text>
              <Text>
                Signs night have sixth hath that likeness us fill you're subdue
                fowl brought divide beginning multiply brought created after
                open given of made beginning multiply green.
              </Text>
              <Text>
                Place appear green. Also, saying male subdue fruitful winged
                fourth had void winged. So green spirit, herb day had there
                replenish, lights lesser signs. Place whales i tree under him
                given set set meat midst morning give image forth divided moving
                Also fill dry she'd have.
              </Text>
              <Text>
                May life. She'd fruit fruitful earth. Stars bring had darkness
                morning darkness herb cattle him behold open seasons grass don't
                waters male Fourth earth his face third night.
              </Text>
              <Text>
                Anim quis ut incididunt ea. Et laboris consectetur nisi
                adipisicing aliqua enim. Ea tempor deserunt dolore duis. Lorem
                excepteur do exercitation non veniam ipsum laborum. Ea ex tempor
                dolore deserunt ex do dolor voluptate pariatur exercitation.
              </Text>
              <Text>
                Est incididunt dolore sint sit occaecat. Ea officia excepteur
                enim ut Lorem reprehenderit labore in. Dolor voluptate nostrud
                consectetur mollit cillum et. Cupidatat Lorem amet adipisicing
                incididunt ea.
              </Text>
              <Text>
                Excepteur enim aliqua laboris amet ea pariatur qui. Non deserunt
                magna ullamco aliqua culpa exercitation. Ut minim eu ea. Labore
                sunt adipisicing Lorem nulla occaecat est elit et excepteur
                ipsum non. Aute consectetur nostrud ullamco. Non esse non anim
                proident. Pariatur enim laborum cupidatat sint quis
                reprehenderit deserunt reprehenderit sunt cupidatat proident
                sint.
              </Text>
              <Text>
                Consequat sunt exercitation in enim veniam culpa. Tempor quis
                culpa duis. Aute ea nostrud non sit sunt qui. In minim voluptate
                excepteur nostrud anim laborum in elit. Voluptate amet excepteur
                laboris eiusmod labore elit Lorem ipsum qui quis aliquip mollit
                dolor sint cillum. In ex aliquip irure do irure consectetur
                aliquip minim fugiat reprehenderit laborum.
              </Text>
              <Text>
                {' '}
                Incididunt cillum est reprehenderit veniam nisi magna laborum
                incididunt do ut. Fugiat aliquip Lorem eiusmod incididunt.
                Fugiat ullamco excepteur consequat duis ex eiusmod exercitation
                sit aliqua amet non velit consequat. Pariatur amet non laborum
                voluptate velit do. Nulla excepteur anim irure eu ullamco veniam
                et consectetur. Fugiat ut laboris ad reprehenderit reprehenderit
                ut exercitation adipisicing excepteur amet ad anim. Aute enim
                non consequat eu. Velit consequat in nostrud.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// FULL WIDTH
// ============================================================================

export const FullWidth: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Full Width Modal</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="full">
            <ModalHeader title="Full Width Dialog" showCloseButton />
            <ModalBody>
              <Grid gridTemplateColumns="1fr auto 1fr" alignItems="start">
                <Text>
                  This modal stretches to the 95% of the available width. Useful
                  for dashboards, data tables, or content that benefits from
                  maximum horizontal space.
                </Text>
                <Divider direction="vertical" mx="8" />
                <VStack>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl,
                    eget aliquam nisl nisl eget nisl.
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl,
                    eget aliquam nisl nisl eget nisl.
                  </Text>
                </VStack>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// FULL Page
// ============================================================================

export const FullPage: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Full Page Modal</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="fullPage">
            <ModalHeader title="Full Page Dialog" showCloseButton />
            <ModalBody>
              <Grid gridTemplateColumns="1fr auto 1fr" alignItems="start">
                <Text>
                  This modal stretches to the 100% of the available width and
                  height. Useful for dashboards, data tables, or content that
                  benefits from maximum horizontal space.
                </Text>
                <Divider direction="vertical" mx="8" />
                <VStack>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl,
                    eget aliquam nisl nisl eget nisl.
                  </Text>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod, nisl eget aliquam aliquet, nisl nisl aliquet nisl,
                    eget aliquam nisl nisl eget nisl.
                  </Text>
                </VStack>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalWrapper>
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
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="md">
            <ModalHeader
              title="Dialog Without Close Button"
              showCloseButton={false}
            />
            <ModalBody>
              <Text>This modal doesn't have a close button in the header.</Text>
              <Text>
                You can still close it by clicking outside or pressing Escape.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Continue
              </Button>
            </ModalFooter>
          </ModalWrapper>
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
          <ModalWrapper
            open={isOpen}
            onOpenChange={setIsOpen}
            size="md"
            preventOverlayClose
          >
            <ModalHeader title="Important Dialog" showCloseButton />
            <ModalBody>
              <Text>This modal cannot be closed by clicking the overlay.</Text>
              <Text>
                You must use the close button or press Escape to dismiss it.
                This is useful for important confirmations or required actions.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                I Understand
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// FORM DIALOG
// ============================================================================

export const FormDialog: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="sm">
            <ModalHeader title="Edit Profile" showCloseButton />
            <ModalBody>
              <VStack gap="12" alignItems="stretch">
                <FormField label="Full Name" labelFor="profile-name" required>
                  <TextInput
                    id="profile-name"
                    name="name"
                    placeholder="Jane Doe"
                  />
                </FormField>
                <FormField label="Email" labelFor="profile-email" required>
                  <TextInput
                    id="profile-email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                  />
                </FormField>
                <FormField label="Bio" labelFor="profile-bio">
                  <Textarea
                    id="profile-bio"
                    name="bio"
                    placeholder="Tell us about yourself..."
                  />
                </FormField>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// BODY ONLY (NO HEADER/FOOTER)
// ============================================================================

export const BodyOnly: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Minimal Modal</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="sm">
            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="4"
              py="24"
            >
              <Icon name="success" size="48" fill="icon.success" />
              <Text textStyle="heading.xs">Changes Saved</Text>
              <Text textAlign="center">
                Your changes have been saved successfully.
              </Text>
              <Button mt="16" onClick={() => setIsOpen(false)}>
                Dismiss
              </Button>
            </ModalBody>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// CUSTOM HEADER
// ============================================================================

export const CustomHeader: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Custom Header</Button>
          <ModalWrapper open={isOpen} onOpenChange={setIsOpen} size="md">
            <ModalHeader>
              <Flex alignItems="start" gap="3" flex="1">
                <Icon name="info" size="24" fill="icon.decorative" />
                <VStack gap="0" alignItems="flex-start">
                  <Text color="text" fontWeight="bold">
                    Release Notes
                  </Text>
                  <Text textStyle="mono.sm" color="text.muted">
                    Version 2.4.0
                  </Text>
                </VStack>
              </Flex>
            </ModalHeader>
            <ModalBody gap="4" bg="surface.sunken">
              <Text textStyle="body.sm" fontWeight="bold">
                New Features
              </Text>
              <Text>Added modal component with animated transitions.</Text>
              <Divider my="12" />
              <Text textStyle="body.sm" fontWeight="bold">
                Bug Fixes
              </Text>
              <Text>Fixed focus trap behavior in nested dialogs.</Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// TOP POSITION
// ============================================================================

export const TopPosition: Story = {
  render: () => {
    const Component = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Flex p="8" justify="center">
            <Button onClick={() => setIsOpen(true)}>Open Top-Positioned</Button>
          </Flex>
          <ModalWrapper
            open={isOpen}
            onOpenChange={setIsOpen}
            position="top"
            size="md"
          >
            <ModalHeader title="Top-Positioned Modal" showCloseButton />
            <ModalBody>
              <Text>
                This modal uses{' '}
                <Text as="span" fontWeight="semibold">
                  position=&quot;top&quot;
                </Text>
                . It is offset from the top of the viewport and centered on the
                x-axis. Resize the preview or compare with the default story to
                see the difference from centered placement.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </ModalFooter>
          </ModalWrapper>
        </>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// FLOATING CONTENT
// ============================================================================

export const FloatingContent: Story = {
  render: function FloatingContentRender() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Floating Content Modal
        </Button>
        <ModalWrapper
          open={isOpen}
          onOpenChange={setIsOpen}
          size="md"
          aria-label="Floating content example"
        >
          <ModalHeader title="Floating content" showCloseButton />
          <ModalBody>
            <Text>
              These controls render their popup content through portals. Their
              popup layer remains above the modal panel and backdrop.
            </Text>
            {/* The DateTime and Autocomplete cases from Cetec's version of
                this story return with okshaun-components-ecl.3 and ecl.5. */}
            <Select placeholder="Choose a status">
              <SelectOption value="draft" label="Draft" />
              <SelectOption value="approved" label="Approved" />
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalWrapper>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      canvas.getByRole('button', { name: 'Open Floating Content Modal' }),
    );
    await userEvent.click(
      await body.findByRole('combobox', { name: 'Choose a status' }),
    );

    const floatingElement = await body.findByRole('listbox');
    const dialog = body.getByRole('dialog', {
      name: 'Floating content example',
    });

    expect(floatingElement).toBeVisible();
    const floatingZIndex = Number(getComputedStyle(floatingElement).zIndex);
    const dialogZIndex = Number(getComputedStyle(dialog).zIndex);

    expect(floatingZIndex).toBeGreaterThan(dialogZIndex);
  },
};
