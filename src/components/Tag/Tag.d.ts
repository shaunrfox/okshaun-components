import { TagVariantProps } from '../../../styled-system/recipes';
import { BoxProps } from '../Box';
import { ReactNode } from 'react';
import { IconNamesList } from '../Icon';
export type TagProps = BoxProps & TagVariantProps & {
    children: string | ReactNode;
    iconName?: IconNamesList;
};
export declare const Tag: React.FC<TagProps>;
