import { chip, type ChipVariantProps } from '@styled-system/recipes';
import { Box, type BoxProps } from '../Box';
import { type ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';
import { Icon, type IconNamesList } from '../Icon';

export type ChipProps = BoxProps &
  ChipVariantProps & {
    children: string | ReactNode;
    iconName?: IconNamesList;
  };

export const Chip: React.FC<ChipProps> = ({
  state = 'resolved',
  hue = 'blue',
  children,
  iconName,
  onClick,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
  const hasIcon = !!iconName;
  const isClickable = state === 'resolved' || state === 'placeholder';

  return (
    <Box
      as="span"
      className={cx(chip({ state, hue, hasIcon }), className)}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...otherProps}
    >
      {iconName && <Icon name={iconName} width={14} height={14} />}
      {children}
    </Box>
  );
};
