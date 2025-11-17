import { BoxProps } from '../Box/Box';
import { SpinnerVariantProps } from '../../../styled-system/recipes';
export type SpinnerProps = Omit<BoxProps, keyof SpinnerVariantProps> & SpinnerVariantProps & {
    size?: 'standard' | 'small' | 'large';
    className?: string;
};
export declare const Spinner: React.FC<SpinnerProps>;
