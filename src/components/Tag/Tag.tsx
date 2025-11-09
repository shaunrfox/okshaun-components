import { tag, type TagVariantProps } from '@styled-system/recipes';
import { Box, type BoxProps } from '../Box';
import { ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';
import { Icon, type IconNamesList } from '../Icon';

export type TagProps = BoxProps &
  TagVariantProps & {
    children: string | ReactNode;
    iconName?: IconNamesList;
  };

export const Tag: React.FC<TagProps> = ({
  variant,
  hue,
  iconPosition = 'left',
  children,
  iconName,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
  const hasIcon = !!iconName;

  return (
    <Box
      as="span"
      className={cx(tag({ variant, hue, iconPosition, hasIcon }), className)}
      {...otherProps}
    >
      {iconName && <Icon name={iconName} width={20} height={20} />}
      {children}
    </Box>
  );
};
