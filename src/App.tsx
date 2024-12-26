import { css } from '@styled-system/css';
import { HStack } from '@styled-system/jsx';
import { Text } from '~/components/Text';
import { Heading } from '~/components/Heading';

export default function App() {
  return (
    <>
      <Heading as="h1" level={'72'}>
        OK Shaun Componentz
      </Heading>
      <HStack>
        {Array(3)
          .fill(null)
          .map(() => (
            <div key={Math.random()}>
              <Text level={'24'}>Click this!</Text>
            </div>
          ))}
      </HStack>
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
    </>
  );
}
