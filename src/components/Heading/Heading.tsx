import { ComponentProps } from 'react';
import { styled } from '@styled-system/jsx';
import type { StyledComponent } from '@styled-system/jsx';
import { headingStyle, type HeadingVariantProps } from './headingStyle';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = ComponentProps<'h2'> &
  HeadingVariantProps & { as?: HeadingElement } & {
    [key: string]: any;
    level?: number;
  };

export const Heading = styled('h2', headingStyle) as StyledComponent<
  'h2',
  HeadingProps
>;
