import { type ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';
import { Box, type BoxProps } from '../Box';
import { Icon, type IconNamesList } from '../Icon';
import { tag, type TagVariantProps } from '@styled-system/recipes';

export type TagProps = Omit<BoxProps, keyof TagVariantProps> &
  TagVariantProps & {
    children: string | ReactNode;
    iconName?: IconNamesList;
  };

export const Tag = (props: TagProps) => {
  const {
    appearance,
    hue,
    iconPosition = 'left',
    children,
    iconName,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const hasIcon = !!iconName;

  return (
    <Box
      as="span"
      className={cx(tag({ appearance, hue, iconPosition, hasIcon }), className)}
      {...otherProps}
    >
      {iconName && <Icon name={iconName} width={20} height={20} />}
      {children}
    </Box>
  );
};
