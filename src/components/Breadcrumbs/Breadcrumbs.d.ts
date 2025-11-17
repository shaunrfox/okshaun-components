import { BoxProps } from '../Box';
import { default as React } from 'react';
export type BreadcrumbsProps = BoxProps & {
    items: {
        id: string;
        label: string;
        href?: string;
    }[];
};
export declare const Breadcrumbs: React.FC<BreadcrumbsProps>;
