import type { ReactNode } from 'react';
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
//import { CheckBox } from './components/CheckBox';
// import { Input } from '~/components/Input';
// import { Textarea } from '~/components/Textarea';

export function IconList() {
  return (
    <Grid
      gap="16"
      w="full"
      gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
    >
      {(Object.keys(IconNames) as IconNamesList[]).map((icon) => (
        <HStack key={icon} color={{ base: 'gold.40', _dark: 'gold.30' }}>
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
      borderColor={{ base: 'slate.10', _dark: 'slate.80' }}
      py={'24'}
      pb={'96'}
    >
      {children}
    </Grid>
  );
};

function AppContent() {
  return (
    <VStack>
      <Flex
        w="full"
        py={'4'}
        bg={{ base: 'slate.10', _dark: 'slate.80' }}
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
              onClick={() => alert('clicked')}
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
            <Heading>Buttons</Heading>
            <VStack alignItems={'flex-start'} gap={'24'}>
              <HStack>
                <Button
                  variant="primary"
                  onClick={() => alert('clicked')}
                  bg="red.50"
                >
                  Primary
                </Button>
                <Button>Standard</Button>
                <Button variant="hollow">Hollow</Button>
                <Button variant="ghost">Ghost</Button>
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
            <Heading level="h2">Checkboxes</Heading>
            <HStack gap={'40'} alignItems={'flex-end'}>
              {/*
              <CheckBox />
              <CheckBox variant="checked" />
              <CheckBox variant="indeterminate" />
              <CheckBox variant="disabled" />
              <CheckBox variant="error" />
              */}
            </HStack>
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
