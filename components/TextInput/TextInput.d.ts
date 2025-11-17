import { BoxProps } from '../Box/Box';
import { TextinputVariantProps } from '../../../styled-system/recipes';
import { AriaAttributes } from 'react';
export type TextInputProps = Omit<BoxProps, keyof TextinputVariantProps> & TextinputVariantProps & {
    name: string;
    error?: boolean;
    id?: string;
    'aria-describedby'?: string;
} & AriaAttributes;
export declare const TextInput: React.FC<TextInputProps>;
