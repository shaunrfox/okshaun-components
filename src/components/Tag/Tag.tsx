import { cx } from '@styled-system/css';
import { type TagVariantProps, tag } from '@styled-system/recipes';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Icon, type IconNamesList } from '../Icon';

export type TagProps = Omit<BoxProps, keyof TagVariantProps> &
  Omit<TagVariantProps, 'iconBefore' | 'iconAfter'> & {
    children: string;
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
  };

export const Tag = (props: TagProps) => {
  const { variant, hue, iconBefore, iconAfter, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      className={cx(
        tag({
          variant,
          hue,
          iconBefore: Boolean(iconBefore),
          iconAfter: Boolean(iconAfter),
        }),
        className,
      )}
      {...otherProps}
    >
      {iconBefore && (
        <Icon name={iconBefore} fill="current" color="inherit" size="20" />
      )}
      {children}
      {iconAfter && (
        <Icon name={iconAfter} fill="current" color="inherit" size="20" />
      )}
    </Box>
  );
};
