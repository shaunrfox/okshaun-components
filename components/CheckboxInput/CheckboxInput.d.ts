import { FC, ReactNode } from 'react';
import { BoxProps } from '../Box';
import { CheckboxInputVariantProps } from '../../../styled-system/recipes';
export type CheckboxInputProps = BoxProps & CheckboxInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
};
export declare const CheckboxInput: FC<CheckboxInputProps>;
export default CheckboxInput;
