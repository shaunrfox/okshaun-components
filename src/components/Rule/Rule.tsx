// /** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import { Box, BoxProps } from './Box';

interface RuleProps extends BoxProps {
  orientation?: 'horizontal' | 'vertical';
}

const ruleStyles = (theme: Theme) => css`
  min-width: 1px;
  min-height: 1px;
  flex-grow: 1;
  flex-shrink: 0;
  /* align-self: center; */
  /* justify-self: center; */
  border-style: solid;
  border-width: 1px;
  border-color: ${theme.color.gray[30]};
  filter: invert(1);
  mix-blend-mode: difference;
`;

const orientationStyles = (orientation: RuleProps['orientation']) => css`
  width: ${orientation === 'vertical' ? '1px' : '100%'};
  max-width: ${orientation === 'vertical' ? '1px' : '100%'};
  height: ${orientation === 'vertical' ? '100%' : '1px'};
  max-height: ${orientation === 'vertical' ? '100%' : '1px'};
  border-width: ${orientation === 'vertical' ? '0 1px 0 0' : '0 0 1px 0'};
`;

export const Rule = ({ orientation = 'horizontal', ...props }: RuleProps) => {
  return (
    <Box
      css={(theme) => [ruleStyles(theme), orientationStyles(orientation)]}
      {...props}
    >
      <Box>&nbsp;</Box>
    </Box>
  );
};

export default Rule;
