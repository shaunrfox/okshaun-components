import { BoxProps } from '../Box';
import { LinkVariantProps } from '../../../styled-system/recipes';
import { FontSizeToken, FontToken, FontWeightToken } from '../../../styled-system/tokens';
export type LinkProps = Omit<BoxProps, keyof LinkVariantProps> & LinkVariantProps & {
    href: string;
    external?: boolean;
    disabled?: boolean;
    size?: FontSizeToken;
    family?: FontToken;
    italic?: boolean;
    bold?: boolean;
    weight?: FontWeightToken;
    className?: string;
    children?: React.ReactNode;
};
export declare const Link: React.FC<LinkProps>;
