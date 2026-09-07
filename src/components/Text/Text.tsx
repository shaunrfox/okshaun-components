import { cx } from '@styled-system/css';
import { type TextVariantProps, text } from '@styled-system/recipes';
import type { ElementType, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Tooltip } from '~/components/Tooltip';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props accepted by {@link Text}. */
export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & {
    /** Text or inline content to render. */
    children: string | ReactNode;
    /** @default "span" */
    as?: ElementType;
    /**
     * Short, nonessential explanation shown in a tooltip. Applies a dashed
     * underline and adds the text to sequential keyboard focus.
     */
    definition?: string;
    /** Explicit ARIA role when the rendered element does not provide it. */
    role?: string;
    /** Adds the text to sequential keyboard focus when a composite widget requires it. */
    tabIndex?: number;
  };

/**
 * Renders design-system typography without imposing document semantics.
 *
 * The component renders a `span` by default. Choose `as` based on the content's
 * semantic role; use `Heading` for document headings and `Label` for form
 * labels. Provide `definition` for a short explanation that appears on hover
 * and keyboard focus.
 *
 * @example
 * ```tsx
 * <Text definition="Application programming interface">API</Text>
 * ```
 */
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
