import { ReactNode } from 'react';
import { css } from '@styled-system/css';
import { HStack, VStack, Container, Box, Grid, Flex } from '@styled-system/jsx';
import { Text } from '~/components/Text';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Icon } from '~/components/Icon';
import { IconNames, type IconNamesList } from '~/components/Icon';
import { Pre } from '~/components/Code';
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
        <HStack key={icon}>
          <Icon
            name={icon}
            className={css({
              fill: 'gray.90',
              _osDark: { fill: 'yellow.20' },
            })}
          />
          <Text>{icon}</Text>
        </HStack>
      ))}
    </Grid>
  );
}

const Section = ({ children }: { children?: ReactNode }) => {
  return (
    // This is a Flex component
    <Grid
      gridTemplateColumns={'10rem 1fr'}
      borderTop={'1px solid pink'}
      borderColor={{ base: 'gray.30', _osDark: 'gray.80' }}
      py={'24'}
      pb={'96'}
      gap={'40'}
      w={'full'}
    >
      {children}
    </Grid>
  );
};

const SectionHeader = ({ children }: { children?: ReactNode }) => {
  return (
    <Box position="sticky" top="8" zIndex="1" h="fit">
      <Text as="h2">{children}</Text>
    </Box>
  );
};

export default function App() {
  return (
    <VStack position="relative" gap={'24'}>
      <Flex
        w="full"
        py={'24'}
        bg={{ base: 'gray.10', _osDark: 'gray.80' }}
        mb={'56'}
      >
        <Container maxW={'5xl'}>
          <Text as="h1">Ok Shaun Componentz</Text>
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
                <Button variant="utility">Utility</Button>
                <Button variant="danger">Danger</Button>
              </HStack>
              <HStack>
                <IconButton>
                  <Icon name="arrow-left" />
                </IconButton>
                <IconButton variant="primary" size="large">
                  <Icon name="arrow-right" />
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
                  <Text as="h4" className={css({ color: 'yellow.20' })}>
                    Text styles
                  </Text>
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
                  <Text as="h4" className={css({ color: 'yellow.20' })}>
                    Headings
                  </Text>
                </Box>
                <Text as="h1">Hamburgefonstiv</Text>
                <Pre>{'<Text as="h1">Hamburgefonstiv</Text>'}</Pre>
                <Text as="h2">Hamburgefonstiv</Text>
                <Pre>{'<Text as="h2">Hamburgefonstiv</Text>'}</Pre>
                <Text as="h3">Hamburgefonstiv</Text>
                <Pre>{'<Text as="h3">Hamburgefonstiv</Text>'}</Pre>
                <Text as="h4">Hamburgefonstiv</Text>
                <Pre>{'<Text as="h4">Hamburgefonstiv</Text>'}</Pre>
              </Grid>
            </VStack>
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
