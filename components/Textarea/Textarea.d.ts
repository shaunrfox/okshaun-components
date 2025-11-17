import { BoxProps } from '../Box';
import { TextareaVariantProps } from '../../../styled-system/recipes';
export type TextareaProps = Omit<BoxProps, keyof TextareaVariantProps> & TextareaVariantProps & {
    name: string;
    autoSize?: boolean;
    error?: boolean;
    disabled?: boolean;
    id?: string;
};
export declare const Textarea: React.FC<TextareaProps>;
