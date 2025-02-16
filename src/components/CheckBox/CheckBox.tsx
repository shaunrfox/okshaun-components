import { Box } from '../Box';
import type { SystemStyleObject } from '@styled-system/types';
import { checkbox, type CheckboxVariantProps } from '@styled-system/recipes';
import { Icon, type IconNamesList } from '../Icon';

type CheckBoxProps = CheckboxVariantProps &
  Omit<React.ComponentProps<typeof Box>, 'as'> & {
    variant?: string;
  } & SystemStyleObject;

const variantIcon: Record<'checked' | 'indeterminate', IconNamesList> = {
  checked: 'check',
  indeterminate: 'minus',
};

export function CheckBox({ variant = 'default' }: CheckBoxProps) {
  const iconName: IconNamesList | undefined =
    variantIcon[variant as keyof typeof variantIcon] ?? undefined;

  return (
    <Box>
      <Box as="input" type="checkbox" />
      <Box className={checkbox({ variant })}>
        {iconName && (
          <Icon
            size={12}
            {...(iconName && { name: iconName })}
            viewBox="0 0 12 12"
          />
        )}
      </Box>
    </Box>
  );
}
