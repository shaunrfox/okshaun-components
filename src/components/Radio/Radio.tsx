import { Box, type BoxProps } from '../Box';
import { radio, type RadioVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { Label } from '../Label';

export type RadioProps = Omit<BoxProps, keyof RadioVariantProps> &
  RadioVariantProps & {
    id?: string;
    name: string;
    disabled?: boolean;
    error?: boolean;
  };

export const Radio: React.FC<RadioProps> = ({ id, name, error, ...props }) => {
  const { container, input, indicator } = radio({});
  return (
    <Label className={container} htmlFor={id}>
      <Box
        as="input"
        type="radio"
        id={id}
        name={name}
        aria-label={name}
        className={input}
        {...props}
        {...(error && { 'data-error': true })}
      />
      <Icon className={indicator} name={'radio'} />
      <Icon className={indicator} name={'radio-checked'} />
      <Icon className={indicator} name={'radio-focus'} />
    </Label>
  );
};
