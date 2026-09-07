import { cx } from '@styled-system/css';
import { type TextVariantProps, text } from '@styled-system/recipes';
import type { ElementType, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Tooltip } from '~/components/Tooltip';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & {
    children: string | ReactNode;
    as?: ElementType;
    /**
     * Short, nonessential explanation shown in a tooltip. Applies a dashed
     * underline and adds the text to sequential keyboard focus.
     */
    definition?: string;
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
    dashedUnderline,
    definition,
    size,
    children,
    textStyle,
    weight,
    role,
    tabIndex,
    truncate,
    allCaps,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const content = (
    <Box
      {...dsComponent('Text')}
      as={as}
      textStyle={textStyle}
      role={role}
      tabIndex={tabIndex ?? (definition ? 0 : undefined)}
      className={cx(
        text({
          family,
          bold,
          underline,
          dashedUnderline: definition ? true : dashedUnderline,
          italic,
          size,
          weight,
          truncate,
          allCaps,
        }),
        className,
      )}
      {...otherProps}
    >
      {children}
    </Box>
  );

  return definition ? <Tooltip text={definition}>{content}</Tooltip> : content;
};
