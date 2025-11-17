import { TextProps } from '../Text';
import { HeadingVariantProps } from '../../../styled-system/recipes';
export type HeadingProps = Omit<TextProps, keyof HeadingVariantProps> & HeadingVariantProps & {
    children?: string | React.ReactNode;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export declare const Heading: React.FC<HeadingProps>;
