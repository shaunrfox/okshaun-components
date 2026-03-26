import { Container, Flex, Grid, HStack, VStack } from '@styled-system/jsx';
import type { FC, ReactNode } from 'react';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { ThemeProvider } from '~/system/context';

import { Card } from './components/Card';

interface SectionProps {
  children?: ReactNode;
}

export const Section = (props: SectionProps) => {
  const { children } = props;
  return (
    <Grid
      gridTemplateColumns="1fr 3fr"
      gap="40"
      w="full"
      borderTopWidth="1"
      borderTopStyle="solid"
      borderColor="border"
      py="24"
      pb="96"
      {...props}
    >
      {children}
    </Grid>
  );
};

const Header: FC = () => {
  return (
    <Flex
      w="full"
      py="4"
      bg="surface.sunken"
      mb="56"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="medium"
    >
      <Container maxW="5xl">
        <HStack justify="space-between">
          <Text
            as="div"
            family="body"
            size="16"
            letterSpacing="widest"
            textTransform="uppercase"
            fontWeight="bold"
            onClick={() => alert('clicked')}
          >
            Cetec Components
          </Text>
          <ThemeSwitcher />
        </HStack>
      </Container>
    </Flex>
  );
};

const AppContent: FC = () => {
  return (
    <VStack>
      <Header />
      <Container maxW="5xl">
        <VStack gap="8">
          <Section>
            <Heading>Buttons</Heading>
            <VStack alignItems="flex-start" gap="24">
              <HStack>
                <Button variant="primary" onClick={() => alert('clicked')}>
                  Primary
                </Button>
                <Button>Standard</Button>
                <Button variant="hollow">Hollow</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="selected">Selected</Button>
                <Button variant="danger">Danger</Button>
                <Button size="lg" iconBefore="arrow-left">
                  Button
                </Button>
                <Button size="sm" iconAfter="arrow-right">
                  Button
                </Button>
              </HStack>
              <HStack>
                <IconButton variant="ghost" iconName="x" altText="Close" />
                <IconButton
                  variant="primary"
                  iconName="arrow-left"
                  size="lg"
                  altText="Left"
                />
                <IconButton
                  variant="primary"
                  iconName="arrow-right"
                  size="lg"
                  altText="Right"
                />
              </HStack>
              <HStack>
                <Button variant="primary" loading>
                  Pepperoni
                </Button>
                <Button loading>Loading</Button>
                <IconButton
                  variant="primary"
                  loading
                  iconName="x"
                  altText="Loading"
                />
              </HStack>
            </VStack>
          </Section>

          <Section>
            <Heading level="h2">Card</Heading>
            <VStack gap="10" alignItems="flex-start">
              <Heading level="h3">Default</Heading>
              <HStack gap="40" alignItems="flex-start">
                <Card p="16">
                  <Text>Default</Text>
                </Card>
                <Card variant="flat" p="16">
                  <Text>Flat</Text>
                </Card>
                <Card disabled p="16">
                  <Text>Disabled</Text>
                </Card>
              </HStack>
            </VStack>
            <Heading level="h2"></Heading>
            <VStack gap="10" alignItems="flex-start">
              <Heading level="h3">Flat</Heading>
              <HStack gap="40" alignItems="flex-start">
                <Card variant="flat" p="16">
                  Default
                </Card>
                <Card variant="flat" p="16" grabbed>
                  Grabbed
                </Card>
                <Card variant="flat" p="16" disabled>
                  Disabled
                </Card>
              </HStack>
            </VStack>
            <Heading level="h2"></Heading>
            <VStack gap="10" alignItems="flex-start">
              <Heading level="h3">Example</Heading>
              <HStack gap="40" alignItems="flex-start">
                <Card grabbed>
                  <Box p="16" textAlign="left">
                    <Heading level="h4">Affordable Default</Heading>
                    <Text>
                      Forward thinking pricing model. Cetec ERP has broken
                      ground with the way business platforms are delivered,
                      making manufacturing ERP a platform and a commodity.
                    </Text>
                  </Box>
                </Card>
                <Card variant="flat">
                  <Box p="16" textAlign="left">
                    <Heading level="h4">Affordable Flat</Heading>
                    <Text>
                      Forward thinking pricing model. Cetec ERP has broken
                      ground with the way business platforms are delivered,
                      making manufacturing ERP a platform and a commodity.
                    </Text>
                  </Box>
                </Card>
              </HStack>
            </VStack>
          </Section>
        </VStack>
      </Container>
    </VStack>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
