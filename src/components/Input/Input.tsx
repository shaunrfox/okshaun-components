import * as React from 'react';
import { input } from '@styled-system/recipes';
import { Label } from '~/components/Label';
import { Text } from '~/components/Text';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  stacked?: boolean;
  internalLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, className, stacked = true, internalLabel = false, ...props },
    ref,
  ) => {
    return (
      <Label
        className={input()}
        stacked={stacked}
        internalLabel={internalLabel}
        htmlFor={props.id || ''}
      >
        {label && <Text as="span">{label}</Text>}
        <input id={props.id} ref={ref} className={className} {...props} />
      </Label>
    );
  },
);

Input.displayName = 'Input';
