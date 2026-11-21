import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import { type ReactNode, useEffect, useId } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverDescription}, supporting text under the title. */
export type PopoverDescriptionProps = Omit<BoxProps, 'children'> & {
  /** Description content. Strings render as text; nodes render as-is. */
  children: string | ReactNode;
};

/**
 * Renders supporting description text and wires it to `aria-describedby`.
 *
 * @example
 * ```tsx
 * <PopoverDescription>Applies to open work orders only.</PopoverDescription>
 * ```
 */
export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const { children, id: idProp, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { size, setDescriptionId } = usePopoverContext();
  const generatedId = useId();
  const descriptionId = idProp ?? generatedId;
  const classes = popover({ size });

  useEffect(() => {
    setDescriptionId(descriptionId);
    return () => setDescriptionId(undefined);
  }, [descriptionId, setDescriptionId]);

  return (
    <Box
      as="div"
      id={descriptionId}
      className={cx(classes.description, className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
