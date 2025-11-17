import { FC, ReactNode, ChangeEventHandler } from 'react';
import { BoxProps } from '../Box';
import { CheckboxInputVariantProps } from '../../../styled-system/recipes';
export type CheckboxInputProps = BoxProps & CheckboxInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
};
export declare const CheckboxInput: FC<CheckboxInputProps>;
export default CheckboxInput;
