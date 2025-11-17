import { BoxProps } from '../Box/Box';
import { DividerVariantProps } from '../../../styled-system/recipes';
export type DividerProps = Omit<BoxProps, keyof DividerVariantProps> & DividerVariantProps & {
    direction?: string;
    weight?: string;
};
export declare const Divider: React.FC<DividerProps>;
