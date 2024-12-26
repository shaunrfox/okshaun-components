import { Box as pandaBox } from "../../../styled-system/jsx";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const boxStyles = (theme: Theme) => css`
  min-width: 0;
  padding: ${theme.size[16]};
`;

const flexStyles = (theme: Theme) => css`
  display: flex;
  gap: ${theme.size[16]};
`;

const flexColumnStyles = css`
  flex-direction: column;
`;

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = "div", ...props }, ref) => {
    return <Component ref={ref} css={boxStyles} {...props} />;
  }
);

const Flex = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} css={flexStyles} {...props} />
));

const FlexColumn = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} css={[flexStyles, flexColumnStyles]} {...props} />
));

export { Box, Flex, FlexColumn };
