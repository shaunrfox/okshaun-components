import { Container, Flex, Grid, HStack, VStack } from '@styled-system/jsx';
import { type ReactNode, useState } from 'react';
import { Box } from '~/components/Box';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Checkbox } from '~/components/Checkbox';
import { CheckboxInput } from '~/components/CheckboxInput';
import { Pre } from '~/components/Code';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';
import { Icon, IconNames, type IconNamesList } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { Label } from '~/components/Label';
import { Link } from '~/components/Link';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuListDivider,
  MenuListGroup,
  MenuListItem,
  MenuTrigger,
} from '~/components/Menu';
import { Radio } from '~/components/Radio';
import { Select, SelectOption } from '~/components/Select';
import { Spinner } from '~/components/Spinner';
import { Tag } from '~/components/Tag';
import { Text } from '~/components/Text';
import { TextInput } from '~/components/TextInput';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { Tooltip } from '~/components/Tooltip';
import { ThemeProvider } from '~/contexts/ThemeProvider';
import { BreakpointIndicator } from './components/BreakpointIndicator';
import { Textarea } from './components/Textarea';

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

function MenuDemo() {
  const [openSingle, setOpenSingle] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);
  const [selected, setSelected] = useState<string>('option1');
  const [multiSelected, setMultiSelected] = useState<Set<string>>(
    new Set(['feature1']),
  );

  const toggleMulti = (value: string) => {
    setMultiSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <HStack gap="24">
      <Menu open={openSingle} onOpenChange={setOpenSingle}>
        <MenuTrigger>
          <Button>Single Select</Button>
        </MenuTrigger>
        <MenuGroup label="Options">
          <MenuItem
            type="single-select"
            label="Option 1"
            description="First option"
            selected={selected === 'option1'}
            onSelect={() => setSelected('option1')}
            index={0}
          />
          <MenuItem
            type="single-select"
            label="Option 2"
            description="Second option"
            selected={selected === 'option2'}
            onSelect={() => setSelected('option2')}
            index={1}
          />
          <MenuItem
            type="single-select"
            label="Option 3"
            description="Third option"
            selected={selected === 'option3'}
            onSelect={() => setSelected('option3')}
            index={2}
          />
        </MenuGroup>
      </Menu>

      <Menu open={openMulti} onOpenChange={setOpenMulti}>
        <MenuTrigger>
          <Button>Multi Select</Button>
        </MenuTrigger>
        <MenuGroup label="Features">
          <MenuItem
            type="multi-select"
            label="Feature 1"
            selectionIndicator="checkbox"
            selected={multiSelected.has('feature1')}
            onSelect={() => toggleMulti('feature1')}
            index={0}
          />
          <MenuItem
            type="multi-select"
            label="Feature 2"
            selectionIndicator="checkbox"
            selected={multiSelected.has('feature2')}
            onSelect={() => toggleMulti('feature2')}
            index={1}
          />
          <MenuItem
            type="multi-select"
            label="Feature 3"
            selectionIndicator="checkbox"
            selected={multiSelected.has('feature3')}
            onSelect={() => toggleMulti('feature3')}
            index={2}
          />
        </MenuGroup>
      </Menu>
    </HStack>
  );
}

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

  const [value, setValue] = useState<string | string[] | null>(null);

  const handleCheckboxInputChange =
    (key: keyof typeof checkboxInputStates) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxInputStates({
        ...checkboxInputStates,
        [key]: e.target.checked,
      });
    };

  // Radio states using Storybook pattern
  const [radioStates, setRadioStates] = useState({
    normal: false,
    defaultChecked: true,
    error: false,
    disabled: false,
  });

  const handleRadioChange =
    (key: keyof typeof radioStates) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRadioStates({ ...radioStates, [key]: e.target.checked });
    };

  // RadioInput states using Storybook pattern
  // const [radioInputStates, setRadioInputStates] = useState({
  //   normal: false,
  //   defaultChecked: true,
  //   error: false,
  //   disabled: false,
  // });

  // const handleRadioInputChange =
  //   (key: keyof typeof radioInputStates) =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setRadioInputStates({
  //       ...radioInputStates,
  //       [key]: e.target.checked,
  //     });
  //   };

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
            <HStack>
              <BreakpointIndicator />
              <ThemeSwitcher />
            </HStack>
          </HStack>
        </Container>
      </Flex>
      <Container maxW={'5xl'}>
        <VStack gap={'8'}>
          <Section>
            <Heading>Select</Heading>
            <Select
              value={value}
              onChange={(value) => setValue(value as string | string[] | null)}
              placeholder="Choose an option..."
            >
              <SelectOption value="option1" label="Option 1" />
              <SelectOption value="option2" label="Option 2" />
              <SelectOption value="option3" label="Option 3" />
            </Select>
            <p>Selected: {value}</p>
          </Section>
          <Section>
            <Heading>Menu</Heading>
            <MenuList>
              <MenuListGroup label="Account">
                <MenuListItem label="Profile" iconLeft="user" />
                <MenuListItem label="Settings" iconLeft="settings" />
              </MenuListGroup>
              <MenuListDivider />
              <MenuListGroup label="Actions">
                <MenuListItem label="Help" iconLeft="help" />
                <MenuListItem label="Log Out" iconLeft="arrow-square-out" />
              </MenuListGroup>
            </MenuList>
          </Section>
          <Section>
            <Heading>Buttons</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack>
                <Button variant="primary" onClick={() => alert('clicked')}>
                  Primary
                </Button>
                <Button>Default</Button>
                <Button variant="subtle">Subtle</Button>
                <Button variant="hollow">Hollow</Button>
              </HStack>
              <HStack>
                <Button
                  variant="primary"
                  iconBefore="user"
                  onClick={() => alert('clicked')}
                >
                  Primary
                </Button>
                <Button iconAfter="caret-down">Default</Button>
                <Button iconAfter="plus" variant="subtle">
                  Subtle
                </Button>
                <Button iconBefore="aa-placeholder" variant="hollow">
                  Hollow
                </Button>
              </HStack>
              <HStack>
                <IconButton variant="subtle" iconName="x" />
                <IconButton iconName="arrow-left" />
                <IconButton
                  variant="primary"
                  size="lg"
                  iconName="arrow-right"
                />
              </HStack>
              <HStack>
                <Button variant="primary" loading>
                  Pepperoni
                </Button>
                <Button loading>Loading</Button>
                <IconButton variant="primary" loading>
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
                <Spinner size="sm" />
                <Text>Small</Text>
              </VStack>
              <VStack>
                <Spinner />
                <Text>Standard</Text>
              </VStack>
              <VStack>
                <Spinner size="lg" />
                <Text>Large</Text>
              </VStack>
            </HStack>
          </Section>
          <Section>
            <Heading level="h2">Icons</Heading>
            <IconList />
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
                <Grid gridTemplateColumns="1fr 1fr" gap="24" minW="lg">
                  <Text textStyle="heading.xs">Static</Text>
                  <Text textStyle="heading.xs">Interactive</Text>

                  <Card>
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Default Card</Heading>
                      <Text>Static card with shadow</Text>
                    </Flex>
                  </Card>
                  <Card interactive>
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Default Card</Heading>
                      <Text>Interactive card with shadow</Text>
                    </Flex>
                  </Card>

                  <Card variant="flat">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Flat Card</Heading>
                      <Text>Static card with flat style</Text>
                    </Flex>
                  </Card>
                  <Card variant="flat" interactive>
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Flat Card</Heading>
                      <Text>Interactive card with flat style</Text>
                    </Flex>
                  </Card>

                  <Card variant="sunken">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Sunken Card</Heading>
                      <Text>Static with sunken background</Text>
                    </Flex>
                  </Card>
                  <Card interactive variant="sunken">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Sunken Card</Heading>
                      <Text>Interactive with sunken background</Text>
                    </Flex>
                  </Card>

                  <Card variant="ghost">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Ghost Card</Heading>
                      <Text>Static with transparent background</Text>
                    </Flex>
                  </Card>
                  <Card interactive variant="ghost">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Ghost Card</Heading>
                      <Text>Interactive with transparent background</Text>
                    </Flex>
                  </Card>

                  <Card variant="overlay">
                    <Flex flexDir="column" p={'16'}>
                      <Heading level="h3">Overlay Card</Heading>
                      <Text>Static card with shadow</Text>
                    </Flex>
                  </Card>
                </Grid>
              </Grid>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Dividers</Heading>
            <VStack alignItems={'flex-start'} gap={'24'} w={'full'}>
              <VStack w={'full'} gap={'8'}>
                <Text>Horizontal Divider</Text>
                <Divider />
                <Divider weight="medium" />
                <Divider weight="thick" />
                <Divider weight="thicker" color="yellow.60" />
              </VStack>
              <HStack h={'80'} gap={'8'}>
                <Text>Vertical Divider</Text>
                <Divider direction="vertical" />
                <Divider direction="vertical" weight="medium" />
                <Divider direction="vertical" weight="thick" />
                <Divider
                  direction="vertical"
                  weight="thicker"
                  color="yellow.60"
                />
                <Text>Between Content</Text>
              </HStack>
            </VStack>
          </Section>
          <Section>
            <Heading level="h2">Labels & Inputs</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack alignItems={'flex-start'} gap={'24'}>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="email-input">Email Address</Label>
                  <TextInput
                    id="email-input"
                    name="email"
                    placeholder="Enter your email"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="name-input">Name</Label>
                  <TextInput
                    id="name-input"
                    name="name"
                    size="sm"
                    placeholder="Enter your name"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="name-input">Name</Label>
                  <TextInput
                    id="name-input"
                    name="name"
                    size="lg"
                    placeholder="Enter your real name"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="error-input">With Error</Label>
                  <TextInput
                    id="error-input"
                    name="error"
                    error
                    placeholder="This field has an error"
                  />
                </VStack>
              </HStack>
              <Grid
                gridTemplateColumns={'repeat(4, auto)'}
                alignItems={'flex-start'}
                gap={'24'}
              >
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="things">Things</Label>
                  <Textarea
                    id="things"
                    name="things"
                    placeholder="Enter your secrets"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="stuff">Stuff</Label>
                  <Textarea
                    id="stuff"
                    name="stuff"
                    size="sm"
                    placeholder="Enter your stuff"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="stuff">Stuff</Label>
                  <Textarea
                    id="stuff"
                    name="stuff"
                    size="lg"
                    placeholder="Enter your stuff"
                  />
                </VStack>
                <VStack alignItems={'flex-start'} gap={'4'}>
                  <Label htmlFor="stuff">Error</Label>
                  <Textarea
                    id="error"
                    name="error"
                    error
                    placeholder="somethin' broke"
                  />
                </VStack>
              </Grid>
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
                  <Radio
                    id="radio1"
                    name="radioGroup"
                    checked={radioStates.normal}
                    onChange={handleRadioChange('normal')}
                  />
                  <Text ml={'8'}>Option 1</Text>
                </Label>
                <Label>
                  <Radio
                    id="radio2"
                    name="radioGroup"
                    checked={radioStates.defaultChecked}
                    onChange={handleRadioChange('defaultChecked')}
                  />
                  <Text ml={'8'}>Option 2</Text>
                </Label>
                <Label>
                  <Radio
                    id="radio3"
                    name="radioGroup"
                    checked={radioStates.disabled}
                    onChange={handleRadioChange('disabled')}
                    disabled
                  />
                  <Text ml={'8'}>Disabled</Text>
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
              <MenuDemo />
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
