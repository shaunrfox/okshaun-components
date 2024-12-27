import { css } from '@styled-system/css';
import { HStack, VStack, Container } from '@styled-system/jsx';
import { Text } from '~/components/Text';
import { Heading } from '~/components/Heading';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Icon } from '~/components/Icon';

export default function App() {
  return (
    <Container>
      <VStack gap={'8'}>
        <Heading as="h1">OK Shaun Componentz</Heading>
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
    </Container>
  );
}
