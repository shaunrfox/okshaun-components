import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import { type ReactNode, useEffect, useId } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Icon, type IconNamesList } from '../Icon';

import { type PopoverTone, usePopoverContext } from './PopoverContext';

const toneIconNames: Record<PopoverTone, IconNamesList> = {
  note: 'note',
  tip: 'info',
  warning: 'warning',
  important: 'flag',
  caution: 'warning',
};

const toneIconColors: Record<PopoverTone, ColorToken> = {
  note: 'icon.subtle',
  tip: 'icon.info',
  warning: 'icon.warning',
  important: 'icon.danger',
  caution: 'icon.warning',
};

/** Props for {@link PopoverTitle}, the popover heading. */
export type PopoverTitleProps = Omit<BoxProps, 'children' | 'title'> & {
  /** Title content. Strings render as text; nodes render as-is. */
  children: string | ReactNode;
  /**
   * Shows the tone icon when the parent Popover has a `tone`.
   * @default true
   */
  showToneIcon?: boolean;
};

/**
 * Renders the popover title and wires it to `aria-labelledby` on the panel.
 *
 * When the parent sets a `tone`, an optional leading icon matches that tone.
 * Tone remains visual only and does not change live-region roles.
 *
 * @example
 * ```tsx
 * <PopoverTitle>Warning</PopoverTitle>
 * ```
 */
export const PopoverTitle = (props: PopoverTitleProps) => {
  const { children, showToneIcon = true, id: idProp, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { tone, size, setTitleId } = usePopoverContext();
  const generatedId = useId();
  const titleId = idProp ?? generatedId;
  const classes = popover({ size, tone });

  useEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [setTitleId, titleId]);

  return (
    <Box
      as="div"
      id={titleId}
      className={cx(classes.title, className)}
      {...otherProps}
    >
      {showToneIcon && tone && (
        <Box className={classes.titleIcon} aria-hidden="true">
          <Icon
            name={toneIconNames[tone]}
            size="16"
            fill={toneIconColors[tone]}
          />
        </Box>
      )}
      {children}
    </Box>
  );
};
