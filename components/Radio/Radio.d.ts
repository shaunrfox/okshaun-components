import { BoxProps } from '../Box';
import { RadioVariantProps } from '../../../styled-system/recipes';
export type RadioProps = Omit<BoxProps, keyof RadioVariantProps> & RadioVariantProps & {
    id?: string;
    name: string;
    disabled?: boolean;
    error?: boolean;
};
export declare const Radio: React.FC<RadioProps>;
