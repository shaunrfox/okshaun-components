import { ReactNode, ElementType } from 'react';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import { text, type TextVariantProps } from '@styled-system/recipes';

export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & {
    children: string | ReactNode;
    as?: ElementType;
    role?: string;
    tabIndex?: number;
  };

export const Text = (props: TextProps) => {
  const {
    as = 'span',
    family,
    italic,
    bold,
    underline,
    size,
    children,
    textStyle,
    weight,
    role, // role if use in form input text for refrence, also semantic role overrides if non-semantic tag.
    tabIndex, // tabIndex main use for in list or loop select text using key press focus
    truncate,
    allcaps,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      as={as}
      textStyle={textStyle}
      className={cx(
        text({
          family,
          bold,
          underline,
          italic,
          size,
          weight,
          truncate,
          allcaps,
        }),
        className,
      )}
      role={role}
      tabIndex={tabIndex}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
