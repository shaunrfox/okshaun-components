import { default as React, ComponentPropsWithoutRef, ElementType } from 'react';
import { BoxVariantProps } from '../../../styled-system/recipes';
import { SystemStyleObject } from '../../../styled-system/types';
export type BoxProps = Omit<ComponentPropsWithoutRef<ElementType>, 'as'> & SystemStyleObject & BoxVariantProps & {
    as?: ElementType;
};
export declare const Box: React.FC<BoxProps>;
