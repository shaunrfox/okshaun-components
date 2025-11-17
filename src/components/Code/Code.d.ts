import { BoxProps } from '../Box';
import { TextProps } from '../Text';
import { CodeVariantProps } from '../../../styled-system/recipes';
export type CodeProps = Omit<BoxProps, keyof CodeVariantProps | keyof TextProps> & CodeVariantProps & TextProps & {
    children?: string | React.ReactNode;
    lang?: string;
};
export declare const Code: React.FC<CodeProps>;
