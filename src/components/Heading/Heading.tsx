import { forwardRef } from 'react';
import { Text, TextProps } from '~/components/Text';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<C extends HeadingElement = 'h2'> = TextProps<C>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', level = 24, ...props }, ref) => (
    <Text as={as} level={level} className="heading" ref={ref} {...props} />
  ),
);

Heading.displayName = 'Heading';
