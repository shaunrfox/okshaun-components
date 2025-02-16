import { type ReactNode } from 'react';
import { css } from '@styled-system/css';
import { HStack, VStack, Container, Box, Grid, Flex } from '@styled-system/jsx';
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
import { CheckBox } from './components/CheckBox';
// import { Input } from '~/components/Input';
// import { Textarea } from '~/components/Textarea';

function IconList() {
  return (
    <Grid
      gap="16"
      w="full"
      gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
    >
      {(Object.keys(IconNames) as IconNamesList[]).map((icon) => (
        <HStack key={icon} color={{ base: 'mint.40', _dark: 'yellow.20' }}>
          <Icon name={icon} />
          <Text family={'mono'} fontSize={'14'}>
            {icon}
          </Text>
        </HStack>
      ))}
    </Grid>
  );
}

const Section = ({ children }: { children?: ReactNode }) => {
  return (
    <Grid
      gridTemplateColumns={'1fr 3fr'}
      gap={'40'}
      w={'full'}
      borderTopWidth={'1'}
      borderTopStyle={'solid'}
      borderColor={{ base: 'gray.10', _dark: 'gray.80' }}
      py={'24'}
      pb={'96'}
    >
      {children}
    </Grid>
  );
};

const SectionHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <Box position="sticky" top="8" zIndex="1" h="fit">
      <Heading as="h2">{children}</Heading>
    </Box>
  );
};

function AppContent() {
  return (
    <VStack position="relative" gap={'24'}>
      <Flex
        w="full"
        py={'4'}
        bg={{ base: 'gray.10', _dark: 'gray.80' }}
        mb={'56'}
        position={'sticky'}
        top={'0'}
        zIndex={'100'}
        boxShadow={'medium'}
      >
        <Container maxW={'5xl'}>
          <HStack justify={'space-between'}>
            <Text
              as={'div'}
              family={'mono'}
              fontSize={'16'}
              letterSpacing={'widest'}
              textTransform={'uppercase'}
              fontWeight={'bold'}
            >
              Ok Shaun Componentz
            </Text>
            <ThemeSwitcher />
          </HStack>
        </Container>
      </Flex>
      <Container maxW={'5xl'}>
        <VStack gap={'8'}>
          <Section>
            <SectionHeader>Buttons</SectionHeader>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack>
                <Button variant="primary">Primary</Button>
                <Button>Standard</Button>
                <Button variant="hollow">Hollow</Button>
                <Button variant="cta">CTA</Button>
                <Button variant="danger">Danger</Button>
              </HStack>
              <HStack>
                <IconButton variant="ghost">
                  <Icon name="x" />
                </IconButton>
                <IconButton>
                  <Icon name="arrow-left" />
                </IconButton>
                <IconButton variant="primary" size="large">
                  <Icon name="arrow-right" />
                </IconButton>
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
            <SectionHeader>Text</SectionHeader>
            <VStack alignItems={'flex-start'}>
              <Grid
                gridTemplateColumns={'minmax(auto, 1fr) 1fr'}
                w={'full'}
                gap={'24'}
                alignItems={'center'}
              >
                <Box gridColumn={'1 / -1'}>
                  <Heading
                    as="h4"
                    color={{ base: 'mint.40', _dark: 'yellow.20' }}
                  >
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
                <Text font="mono">
                  Signs night have sixth hath that likeness us fill you're
                  subdue fowl.
                </Text>
                <Pre>{`<Text font="mono">...</Text>`}</Pre>
                <Box gridColumn={'1 / -1'} mt={'32'}>
                  <Heading
                    as="h4"
                    color={{ base: 'mint.40', _dark: 'yellow.20' }}
                  >
                    Headings
                  </Heading>
                </Box>
                <Heading as="h1">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h1">Hamburgefonstiv</Heading>'}</Pre>
                <Heading>Hamburgefonstiv</Heading>
                <Pre>{'<Heading>Hamburgefonstiv</Heading>'}</Pre>
                <Heading as="h3">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h3">Hamburgefonstiv</Heading>'}</Pre>
                <Heading as="h4">Hamburgefonstiv</Heading>
                <Pre>{'<Heading as="h4">Hamburgefonstiv</Heading>'}</Pre>
                <Box gridColumn={'1 / -1'} mt={'32'}>
                  <Heading
                    as="h4"
                    color={{ base: 'mint.40', _dark: 'yellow.20' }}
                  >
                    Links
                  </Heading>
                </Box>
                <Text>
                  Internal:&emsp;
                  <Link href="https://cetecerp.com">Cetec ERP</Link>
                </Text>
                <Pre>
                  {'<Link href="https://cetecerp.com">Cetec ERP</Link>'}
                </Pre>
                <Text>
                  External:&emsp;
                  <Link href="https://cetecerp.com" external>
                    Cetec ERP
                  </Link>
                </Text>
                <Pre>
                  {
                    '<Link href="https://cetecerp.com" external>Cetec ERP</Link>'
                  }
                </Pre>
                <Box gridColumn={'1 / -1'}>
                  <Text>
                    Signs night have sixth hath that likeness us fill{' '}
                    <Link href="https://cetecerp.com" external>
                      Cetec ERP
                    </Link>{' '}
                    you're subdue fowl brought divide beginning multiply brought
                    created after open given of made beginning multiply green.
                  </Text>
                </Box>
              </Grid>
            </VStack>
          </Section>
          <Section>
            <SectionHeader>Spinner</SectionHeader>
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
            <SectionHeader>Icons</SectionHeader>
            <IconList />
          </Section>
          {/* <Section>
            <SectionHeader>
              Inputs
            </SectionHeader>
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
