import { BoxProps } from '../Box';
import { LabelVariantProps } from '../../../styled-system/recipes';
export type LabelProps = Omit<BoxProps, keyof LabelVariantProps> & LabelVariantProps & {
    htmlFor?: string;
    children?: string | React.ReactNode;
};
export declare const Label: React.FC<LabelProps>;
