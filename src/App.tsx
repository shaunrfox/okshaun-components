import { ReactNode } from 'react';
import { css } from '@styled-system/css';
import { HStack, VStack, Container, Flex } from '@styled-system/jsx';
import { Text } from '~/components/Text';
import { Heading } from '~/components/Heading';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Icon } from '~/components/Icon';
import { Input } from '~/components/Input';
import { Textarea } from '~/components/Textarea';
import { IconNames, type IconNamesList } from '~/components/Icon';

function IconList() {
  return (
    <Flex
      className={css({
        gap: '16',
        // maxWidth: '800px',
        p: '24',
      })}
    >
      {(Object.keys(IconNames) as IconNamesList[]).map((icon) => (
        <Icon key={icon} name={icon} />
      ))}
    </Flex>
  );
}

const Section = ({ children }: { children?: ReactNode }) => {
  return (
    // This is a Flex component
    <Flex
      css={{
        gap: '16',
        borderTop: '1px solid',
        borderColor: 'gray.50',
        py: '24',
      }}
    >
      <Container css={{ outline: '1px solid green', w: 'auto' }}>
        {children}
      </Container>
    </Flex>
  );
};

export default function App() {
  return (
    <VStack gap={'8'}>
      <Container>
        <Heading as="h1">OK Shaun Componentz</Heading>
      </Container>
      <Section>
        <Heading as="h2" level={24}>
          Buttons
        </Heading>
        <HStack>
          <Button>Standard</Button>
          <Button variant="primary" size="large">
            Primary Large
          </Button>
          <Button variant="danger" size="small">
            Danger Small
          </Button>
          <Button variant="hollow">hollow</Button>
          <Button variant="utility">utility</Button>
          <Icon name="arrow-left" />
          <IconButton>
            <Icon name="arrow-left" />
          </IconButton>
          <IconButton variant="primary" size="large">
            <Icon name="arrow-right" />
          </IconButton>
        </HStack>
      </Section>
      <Section>
        <Heading as="h2" level={24}>
          Inputs
        </Heading>
        {/* <HStack gap={'24'}>
          <Input label="First" type="text" />
          <Input label="Last" type="text" />
          <Input label="Email" type="email" internalLabel={true} />
        </HStack>
        <HStack gap={'24'}>
          <Input label="Phone" type="tel" stacked={false} />
          <Textarea label="Message" autoGrow={true} />
        </HStack> */}
      </Section>
      <Section>
        <Heading as="h2" level={24}>
          Text
        </Heading>
        <VStack>
          <Text>
            Signs night have sixth hath that likeness us fill you're subdue fowl
            brought divide beginning multiply brought created after open given
            of made beginning multiply green.
          </Text>
          <Text>
            Place appear green. Also, saying male subdue fruitful winged fourth
            had void winged. So green spirit, herb day had there replenish,
            lights lesser signs. Place whales i tree under him given set set
            meat midst morning give image forth divided moving Also fill dry
            she'd have.
          </Text>
          <Text>
            May life. She'd fruit fruitful earth. Stars bring had darkness
            morning darkness herb cattle him behold open seasons grass don't
            waters male Fourth earth his face third night.
          </Text>
        </VStack>
      </Section>
      <IconList />
      <p
        className={css({
          fontFamily: 'serif',
          fontStyle: 'italic',
          color: 'blue.50',
          fontWeight: 'bold',
          textStyle: '4xl',
        })}
      >
        beep
      </p>
    </VStack>
  );
}
