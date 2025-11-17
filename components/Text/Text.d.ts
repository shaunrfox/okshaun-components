import { default as React, ElementType } from 'react';
import { BoxProps } from '../Box';
import { FontToken, FontSizeToken, FontWeightToken } from '../../../styled-system/tokens';
import { TextVariantProps } from '../../../styled-system/recipes';
export type TextProps = Omit<BoxProps, keyof TextVariantProps> & TextVariantProps & {
    italic?: boolean;
    family?: FontToken;
    bold?: boolean;
    underline?: boolean;
    size?: FontSizeToken;
    weight?: FontWeightToken;
    children?: string | React.ReactNode;
    as?: ElementType;
    className?: string;
};
export declare const Text: React.FC<TextProps>;
