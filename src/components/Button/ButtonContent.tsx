import { Grid, HStack } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';

/**
 * ButtonContent handles rendering the children alongside an optional Spinner.
 */
export const ButtonContent = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => (
  <>
    <HStack gap="2" opacity={loading ? 0 : 1}>
      {children}
    </HStack>
    {loading && (
      <Grid
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        placeItems="center"
      >
        <Spinner />
      </Grid>
    )}
  </>
);
