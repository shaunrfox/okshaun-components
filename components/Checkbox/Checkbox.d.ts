import { BoxProps } from '../Box';
import { CheckboxVariantProps } from '../../../styled-system/recipes';
import { AriaAttributes } from 'react';
export type CheckboxProps = Omit<BoxProps, keyof CheckboxVariantProps> & CheckboxVariantProps & {
    name: string;
    indeterminate?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    labelledby?: string;
} & AriaAttributes;
export declare const Checkbox: React.FC<CheckboxProps>;
