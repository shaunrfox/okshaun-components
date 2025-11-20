import { ReactNode, useState } from 'react';
import { HStack, VStack, Container, Grid, Flex } from '@styled-system/jsx';
import { Box } from '~/components/Box';
import { Text } from '~/components/Text';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Icon, IconNames, type IconNamesList } from '~/components/Icon';
import { Pre } from '~/components/Code';
import { ThemeProvider } from '~/contexts/ThemeContext';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { Heading } from '~/components/Heading';
import { Link } from '~/components/Link';
import { Spinner } from '~/components/Spinner';
import { Badge } from '~/components/Badge';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { Card } from '~/components/Card';
import { Divider } from '~/components/Divider';
import { Label } from '~/components/Label';
import { Menu } from '~/components/Menu';
import { Radio } from '~/components/Radio';
import { Tag } from '~/components/Tag';
import { TextInput } from '~/components/TextInput';
import { Toggle } from '~/components/Toggle';
import { Tooltip } from '~/components/Tooltip';
import { Checkbox } from '~/components/Checkox';
import { CheckboxInput } from '~/components/CheckboxInput';

export function IconList() {
  return (
    <Grid
      gap="16"
      w="full"
      gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
    >
      {(Object.keys(IconNames) as IconNamesList[]).map((icon) => (
        <HStack key={icon} color={{ base: 'blue.60', _dark: 'blue.40' }}>
          <Icon name={icon} />
          <Text family={'mono'} fontSize={'14'}>
            {icon}
          </Text>
        </HStack>
      ))}
    </Grid>
  );
}

export const Section = ({ children }: { children?: ReactNode }) => {
  return (
    <Grid
      gridTemplateColumns={'1fr 3fr'}
      gap={'40'}
      w={'full'}
      borderTopWidth={'1'}
      borderTopStyle={'solid'}
      borderColor={'border'}
      py={'24'}
      pb={'96'}
    >
      {children}
    </Grid>
  );
};

function AppContent() {
  // Checkbox states using Storybook pattern
  const [checkboxStates, setCheckboxStates] = useState({
    normal: false,
    defaultChecked: true,
    indeterminate: false,
    error: false,
    disabled: false,
  });

  const handleCheckboxChange =
    (key: keyof typeof checkboxStates) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxStates({ ...checkboxStates, [key]: e.target.checked });
    };

  // CheckboxInput states using Storybook pattern
  const [checkboxInputStates, setCheckboxInputStates] = useState({
    normal: false,
    defaultChecked: true,
    indeterminate: false,
    error: false,
    disabled: false,
  });

  const handleCheckboxInputChange =
    (key: keyof typeof checkboxInputStates) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxInputStates({
        ...checkboxInputStates,
        [key]: e.target.checked,
      });
    };

  return (
    <VStack>
      <Flex
        w="full"
        bg={'surface'}
        mb={'56'}
        position={'sticky'}
        top={'0'}
        zIndex={'100'}
      >
        <Container maxW={'5xl'}>
          <HStack
            justify={'space-between'}
            borderBottomWidth={'1'}
            borderStyle={'solid'}
            borderColor={'border'}
            py={'4'}
          >
            <Text
              as={'div'}
              family={'mono'}
              fontSize={'16'}
              letterSpacing={'widest'}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              color={'text.bold'}
            >
              okshaun Components
            </Text>
            <ThemeSwitcher />
          </HStack>
        </Container>
      </Flex>
      <Container maxW={'5xl'}>
        <VStack gap={'8'}>
          <Section>
            <Heading>Buttons</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack>
                <Button appearance="primary" onClick={() => alert('clicked')}>
                  Primary
                </Button>
                <Button>Default</Button>
                <Button appearance="subtle">Subtle</Button>
                <Button appearance="hollow">Hollow</Button>
              </HStack>
              <HStack>
                <Button
                  appearance="primary"
                  iconBefore="user"
                  onClick={() => alert('clicked')}
                >
                  Primary
                </Button>
                <Button iconAfter="caret-down">Default</Button>
                <Button iconAfter="plus" appearance="subtle">
                  Subtle
                </Button>
                <Button iconBefore="aa-placeholder" appearance="hollow">
                  Hollow
                </Button>
              </HStack>
              <HStack>
                <IconButton appearance="subtle" iconName="x" />
                <IconButton iconName="arrow-left" />
                <IconButton
                  appearance="primary"
                  size="large"
                  iconName="arrow-right"
                />
              </HStack>
              <HStack>
                <Button appearance="primary" loading>
                  Pepperoni
                </Button>
                <Button loading>Loading</Button>
                <IconButton appearance="primary" loading>
                  <Icon name="x" />
                </IconButton>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Text</Heading>

            <VStack alignItems={'flex-start'}>
              <Grid
                gridTemplateColumns={'minmax(auto, 1fr) 1fr'}
                w={'full'}
                gap={'24'}
                alignItems={'center'}
              >
                <Box gridColumn={'1 / -1'}>
                  <Heading level="h3" color={'gold.40'}>
                    Text styles
                  </Heading>
                </Box>
                <VStack gap={'16'}>
                  <Text>
                    Place appear green. Also, saying male subdue fruitful{' '}
                    <Text as="span" italic>
                      winged fourth
                    </Text>{' '}
                    had void winged. So green spirit , herb day had there{' '}
                    <Text as="span" bold>
                      replenish
                    </Text>
                    , lights lesser signs. Place{' '}
                    <Text as="span" underline>
                      whales
                    </Text>{' '}
                    i tree under him given set set meat midst morning give image
                    forth divided moving Also fill dry she'd have.
                  </Text>
                </VStack>
                <Pre>{`<Text>
	...
	<Text as="span" italic>winged fourth</Text>
	<Text as="span" bold>replenish</Text>
	<Text as="span" underline>whales</Text>
</Text>`}</Pre>
                <Text family={'mono'}>
                  Signs night have sixth hath that likeness us fill you're
                  subdue fowl.
                </Text>
                <Pre>
                  {`<Text family="mono">...</Text>
                    `}
                </Pre>
                <Box gridColumn={'1 / -1'} mt={'32'}>
                  <Heading level="h3" color={'gold.40'}>
                    Headings
                  </Heading>
                </Box>
                <Heading level="h1">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h1">Hamburgefonstiv</Heading>'}</Pre>
                <Heading>Hamburgefonstiv</Heading>
                <Pre>{'<Heading>Hamburgefonstiv</Heading>'}</Pre>
                <Heading level="h3">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h3">Hamburgefonstiv</Heading>'}</Pre>
                <Heading level="h4">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h4">Hamburgefonstiv</Heading>'}</Pre>
                <Box gridColumn={'1 / -1'} mt={'32'}>
                  <Heading level="h3" color={'gold.40'}>
                    Links
                  </Heading>
                </Box>
                <Text>
                  Internal:&emsp;
                  <Link href="https://shaunfox.com">okshaun</Link>
                </Text>
                <Pre>{'<Link href="https://shaunfox.com">okshaun</Link>'}</Pre>
                <Text>
                  External:&emsp;
                  <Link href="https://shaunfox.com" external>
                    okshaun
                  </Link>
                </Text>
                <Pre>
                  {'<Link href="https://shaunfox.com" external>okshaun</Link>'}
                </Pre>
                <Box gridColumn={'1 / -1'}>
                  <Text>
                    Signs night have sixth hath that likeness us fill{' '}
                    <Link href="https://shaunfox.com" external>
                      okshaun
                    </Link>{' '}
                    you're subdue fowl brought divide beginning multiply brought
                    created after open given of made beginning multiply green.
                  </Text>
                </Box>
              </Grid>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Spinner</Heading>
            <HStack gap={'40'} alignItems={'flex-end'}>
              <VStack>
                <Spinner size="small" />
                <Text>Small</Text>
              </VStack>
              <VStack>
                <Spinner />
                <Text>Standard</Text>
              </VStack>
              <VStack>
                <Spinner size="large" />
                <Text>Large</Text>
              </VStack>
            </HStack>
          </Section>
          <Section>
            <Heading level="h2">Icons</Heading>
            <IconList />
          </Section>
          <Section>
            <Heading level="h2">Badge</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack gap={'16'}>
                <Text>Solid</Text>
                <Badge variant="solid" size="sm"></Badge>
                <Badge variant="solid"></Badge>
                <Badge variant="solid" size="lg"></Badge>
              </HStack>
              <HStack gap={'16'}>
                <Text>Subtle</Text>
                <Badge variant="subtle" size="sm"></Badge>
                <Badge variant="subtle"></Badge>
                <Badge variant="subtle" size="lg"></Badge>
              </HStack>
              <HStack gap={'16'}>
                <Text>Outline</Text>
                <Badge variant="outline" size="sm"></Badge>
                <Badge variant="outline"></Badge>
                <Badge variant="outline" size="lg"></Badge>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Tags</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <Grid gap={'8'} gridTemplateColumns={'repeat(13, auto)'}>
                <Text textStyle="mono.sm">Default</Text>
                <Tag>Gray</Tag>
                <Tag hue="red">Red</Tag>
                <Tag hue="orange">Orange</Tag>
                <Tag hue="yellow">Yellow</Tag>
                <Tag hue="lime">Lime</Tag>
                <Tag hue="green">Green</Tag>
                <Tag hue="teal">Teal</Tag>
                <Tag hue="blue">Blue</Tag>
                <Tag hue="indigo">Indigo</Tag>
                <Tag hue="purple">Purple</Tag>
                <Tag hue="magenta">Magenta</Tag>
                <Tag hue="tan">Tan</Tag>
                <Text textStyle="mono.sm">Bold</Text>
                <Tag appearance="bold">Gray</Tag>
                <Tag hue="red" appearance="bold">
                  Red
                </Tag>
                <Tag hue="orange" appearance="bold">
                  Orange
                </Tag>
                <Tag hue="yellow" appearance="bold">
                  Yellow
                </Tag>
                <Tag hue="lime" appearance="bold">
                  Lime
                </Tag>
                <Tag hue="green" appearance="bold">
                  Green
                </Tag>
                <Tag hue="teal" appearance="bold">
                  Teal
                </Tag>
                <Tag hue="blue" appearance="bold">
                  Blue
                </Tag>
                <Tag hue="indigo" appearance="bold">
                  Indigo
                </Tag>
                <Tag hue="purple" appearance="bold">
                  Purple
                </Tag>
                <Tag hue="magenta" appearance="bold">
                  Magenta
                </Tag>
                <Tag hue="tan" appearance="bold">
                  Tan
                </Tag>
              </Grid>
              {/* <HStack gap={'8'}>
                <Tag hue="blue" iconName="check">
                  With Icon Left
                </Tag>
                <Tag hue="green" iconName="star" iconPosition="right">
                  With Icon Right
                </Tag>
              </HStack> */}
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Breadcrumbs</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <Breadcrumbs
                items={[
                  { id: '1', label: 'Home', href: '#' },
                  { id: '2', label: 'Products', href: '#' },
                  { id: '3', label: 'Category' },
                ]}
              />
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Cards</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={'16'}>
                <Card variant="default">
                  <VStack p={'16'} gap={'8'}>
                    <Heading level="h3">Default Card</Heading>
                    <Text>This is a default card with shadow</Text>
                  </VStack>
                </Card>
                <Card variant="flat">
                  <VStack p={'16'} gap={'8'}>
                    <Heading level="h3">Flat Card</Heading>
                    <Text>This is a flat card with border</Text>
                  </VStack>
                </Card>
                <Card variant="default" href="#">
                  <VStack p={'16'} gap={'8'}>
                    <Heading level="h3">Link Card</Heading>
                    <Text>This card is a link</Text>
                  </VStack>
                </Card>
              </Grid>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Dividers</Heading>
            <VStack alignItems={'flex-start'} gap={'24'} w={'full'}>
              <VStack w={'full'} gap={'8'}>
                <Text>Horizontal Divider</Text>
                <Divider direction="horizontal" />
              </VStack>
              <HStack h={'80'} gap={'8'}>
                <Text>Vertical Divider</Text>
                <Divider direction="vertical" />
                <Text>Between Content</Text>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Labels & Inputs</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <VStack alignItems={'flex-start'} gap={'8'}>
                <Label htmlFor="email-input">Email Address</Label>
                <TextInput
                  id="email-input"
                  name="email"
                  placeholder="Enter your email"
                />
              </VStack>
              <VStack alignItems={'flex-start'} gap={'8'}>
                <Label htmlFor="name-input">Name</Label>
                <TextInput
                  id="name-input"
                  name="name"
                  size="large"
                  placeholder="Enter your name"
                />
              </VStack>
              <VStack alignItems={'flex-start'} gap={'8'}>
                <Label htmlFor="error-input">With Error</Label>
                <TextInput
                  id="error-input"
                  name="error"
                  error
                  placeholder="This field has an error"
                />
              </VStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Checkboxes</Heading>
            <HStack gap={'40'} alignItems={'flex-end'}>
              <Checkbox
                checked={checkboxStates.normal}
                onChange={handleCheckboxChange('normal')}
                name="normal"
              />
              <Checkbox
                checked={checkboxStates.defaultChecked}
                onChange={handleCheckboxChange('defaultChecked')}
                name="default-checked"
              />
              <Checkbox
                checked={checkboxStates.indeterminate}
                onChange={handleCheckboxChange('indeterminate')}
                indeterminate
                name="indeterminate"
              />
              <Checkbox
                checked={checkboxStates.error}
                onChange={handleCheckboxChange('error')}
                error
                name="error"
              />
              <Checkbox
                checked={checkboxStates.disabled}
                onChange={handleCheckboxChange('disabled')}
                disabled
                name="disabled"
              />
            </HStack>
          </Section>
          <Section>
            <Heading level="h2">Checkbox Input</Heading>
            <VStack gap={'8'} alignItems={'flex-start'} maxW={'xs'}>
              <CheckboxInput
                name="normal"
                checked={checkboxInputStates.normal}
                onChange={handleCheckboxInputChange('normal')}
              >
                <Text>Aliqua irure veniam</Text>
              </CheckboxInput>
              <CheckboxInput
                name="default-checked"
                checked={checkboxInputStates.defaultChecked}
                onChange={handleCheckboxInputChange('defaultChecked')}
              >
                <Text>elit consectetur elit cillum non eu laborum aute</Text>
              </CheckboxInput>
              <CheckboxInput
                indeterminate
                name="indeterminate"
                checked={checkboxInputStates.indeterminate}
                onChange={handleCheckboxInputChange('indeterminate')}
              >
                <Text>
                  Ut fugiat tempor ullamco voluptate dolor labore amet magna
                  irure reprehenderit est irure est anim eiusmod commodo tempor
                  eu ut.
                </Text>
              </CheckboxInput>
              <CheckboxInput
                error
                name="error"
                checked={checkboxInputStates.error}
                onChange={handleCheckboxInputChange('error')}
              >
                <Text>et qui sit</Text>
              </CheckboxInput>
              <CheckboxInput
                disabled
                name="disabled"
                checked={checkboxInputStates.disabled}
                onChange={handleCheckboxInputChange('disabled')}
              >
                <Text>aliquip velit anim irure</Text>
              </CheckboxInput>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Radio Buttons</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack gap={'16'}>
                <Label>
                  <Radio id="radio1" name="radioGroup" />
                  <Text ml={'8'}>Option 1</Text>
                </Label>
                <Label>
                  <Radio id="radio2" name="radioGroup" />
                  <Text ml={'8'}>Option 2</Text>
                </Label>
                <Label>
                  <Radio id="radio3" name="radioGroup" disabled />
                  <Text ml={'8'}>Disabled</Text>
                </Label>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Toggles</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack gap={'16'}>
                <Label>
                  <Toggle name="toggle1" />
                  <Text ml={'8'}>Default Toggle</Text>
                </Label>
              </HStack>
              <HStack gap={'16'}>
                <Label>
                  <Toggle name="toggle2" checked />
                  <Text ml={'8'}>Checked Toggle</Text>
                </Label>
              </HStack>
              <HStack gap={'16'}>
                <Label>
                  <Toggle name="toggle3" disabled />
                  <Text ml={'8'}>Disabled Toggle</Text>
                </Label>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Tooltips</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack gap={'16'}>
                <Tooltip text="This is a tooltip" position="top">
                  <Button>Hover me (top)</Button>
                </Tooltip>
                <Tooltip text="This is a tooltip" position="bottom">
                  <Button>Hover me (bottom)</Button>
                </Tooltip>
                <Tooltip text="This is a tooltip" position="left">
                  <Button>Hover me (left)</Button>
                </Tooltip>
                <Tooltip text="This is a tooltip" position="right">
                  <Button>Hover me (right)</Button>
                </Tooltip>
              </HStack>
              <HStack gap={'16'}>
                <Tooltip text="Click to toggle" trigger="onClick">
                  <Button>Click me</Button>
                </Tooltip>
                <Tooltip
                  title="Tooltip Title"
                  text="This tooltip has a title"
                  position="top"
                >
                  <Button>With Title</Button>
                </Tooltip>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Menu</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <Box maxW={'280'}>
                <Menu
                  variant="single-select"
                  menuSection={[
                    {
                      id: 'section1',
                      title: 'Options',
                      items: [
                        {
                          id: '1',
                          label: 'Option 1',
                          description: 'First option',
                        },
                        {
                          id: '2',
                          label: 'Option 2',
                          description: 'Second option',
                        },
                        {
                          id: '3',
                          label: 'Option 3',
                          description: 'Third option',
                        },
                      ],
                    },
                  ]}
                />
              </Box>
              <Box maxW={'280'}>
                <Menu
                  variant="multi-select"
                  multiSelectType="checkbox"
                  menuSection={[
                    {
                      id: 'section2',
                      title: 'Features',
                      items: [
                        { id: '4', label: 'Feature 1' },
                        { id: '5', label: 'Feature 2' },
                        { id: '6', label: 'Feature 3' },
                      ],
                    },
                  ]}
                />
              </Box>
            </VStack>
          </Section>
          {/* <Section>
            <Text as="h2">
              Inputs
            </Text>
            <VStack>
              <HStack gap={'24'}>
                <Input label="First" type="text" />
                <Input label="Last" type="text" />
                <Input label="Email" type="email" internalLabel={true} />
              </HStack>
              <HStack gap={'24'}>
                <Input label="Phone" type="tel" stacked={false} />
                <Textarea label="Message" autoGrow={true} />
              </HStack>
            </VStack>
          </Section> */}
        </VStack>
      </Container>
    </VStack>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
