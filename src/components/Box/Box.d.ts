import { default as React, AriaAttributes, ComponentPropsWithoutRef, ElementType } from 'react';
import { BoxVariantProps } from '../../../styled-system/recipes';
import { SystemStyleObject } from '../../../styled-system/types';
export type BoxProps = Omit<ComponentPropsWithoutRef<ElementType>, 'as'> & SystemStyleObject & BoxVariantProps & {
    as?: ElementType;
} & AriaAttributes;
export declare const Box: React.FC<BoxProps>;
