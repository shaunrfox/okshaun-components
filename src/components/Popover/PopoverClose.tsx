import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { MouseEvent } from 'react';

import { useLocale } from '~/system/context/useLocale';
import { splitProps } from '~/utils/splitProps';

import { IconButton, type IconButtonProps } from '../IconButton';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverClose}, an optional dismiss control. */
export type PopoverCloseProps = Omit<
  IconButtonProps,
  'iconName' | 'altText' | 'onClick'
> & {
  /** Accessible label for the close control. @default "Close" */
  altText?: string;
  /** Called after the popover requests close. */
  onClick?: IconButtonProps['onClick'];
};

/**
 * Optional control that closes the parent {@link Popover}.
 *
 * Escape and outside press already dismiss the panel; use this when a visible
 * close affordance is needed (typically in rich notes).
 *
 * @example
 * ```tsx
 * <PopoverHeader>
 *   <PopoverTitle>Tip</PopoverTitle>
 *   <PopoverClose />
 * </PopoverHeader>
 * ```
 */
export const PopoverClose = (props: PopoverCloseProps) => {
  const { labels } = useLocale();
  const { altText = labels.closePopover, onClick, ...rest } = props;
  const [className, otherProps] = splitProps(rest as Record<string, unknown>);
  const { setOpen } = usePopoverContext();
  const classes = popover();

  return (
    <IconButton
      variant="ghost"
      size="sm"
      iconName="x"
      altText={altText}
      aria-label={altText}
      className={cx(classes.close, className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        setOpen(false);
      }}
      {...otherProps}
    />
  );
};
