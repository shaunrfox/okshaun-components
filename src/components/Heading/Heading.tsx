import { forwardRef } from 'react';
import { Text, type TextProps } from '~/components/Text';
import { headingStyle, type HeadingVariantProps } from './headingStyle';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<C extends HeadingElement = 'h2'> = Omit<TextProps, 'as'> &
  HeadingVariantProps & {
    as?: C;
  };

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', level = '24', font = 'sans', ...props }, ref) => (
    <Text
      as={as}
      level={level}
      font={font}
      className={headingStyle({ level, font })}
      ref={ref}
      {...props}
    />
  ),
);

Heading.displayName = 'Heading';
