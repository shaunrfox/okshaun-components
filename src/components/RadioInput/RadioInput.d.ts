import { RadioInputVariantProps } from '../../../styled-system/recipes';
import { BoxProps } from '../Box';
import { FC, ReactNode } from 'react';
export type RadioInputProps = BoxProps & RadioInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
};
export declare const RadioInput: FC<RadioInputProps>;
export default RadioInput;
