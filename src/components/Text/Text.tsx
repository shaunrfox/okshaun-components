import { styled } from '@styled-system/jsx';
import type { StyledComponent } from '@styled-system/jsx';
import type { ComponentProps } from 'react';
import { textStyle } from './textStyle';

type ParagraphProps = ComponentProps<'p'> & { as?: React.ElementType } & {
  [key: string]: any;
  className?: string;
};

export const Text = styled('p', textStyle) as StyledComponent<
  'p',
  ParagraphProps
>;

export type TextProps = ComponentProps<typeof Text>;
