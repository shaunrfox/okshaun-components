import { default as React, SVGAttributes } from 'react';
import { BoxProps } from '../Box';
import { ColorToken } from '../../../styled-system/tokens';
import { IconNamesList } from './icons';
import { numericSizes } from '../../styles/tokens';
export type AllowedIconSizes = keyof typeof numericSizes;
export type IconProps = Omit<BoxProps, 'size'> & SVGAttributes<SVGElement> & {
    name: IconNamesList;
    size?: AllowedIconSizes;
    fill?: ColorToken;
};
export declare const Icon: React.FC<IconProps>;
