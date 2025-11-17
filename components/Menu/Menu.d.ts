import { MenuVariantProps } from '../../../styled-system/recipes';
import { BoxProps } from '../Box';
export type MenuProps = Omit<BoxProps, keyof MenuVariantProps> & MenuVariantProps & {
    menuSection: {
        id?: string;
        title?: string;
        divider?: boolean;
        spacer?: boolean;
        link?: boolean;
        items: {
            id: string;
            label: string;
            description?: string;
            value?: string;
            iconName?: string;
            children?: MenuProps['menuSection'];
            disabled?: boolean;
            href?: string;
        }[];
    }[];
    iconPlacement?: 'left' | 'right';
    variant?: 'single-select' | 'multi-select';
    multiSelectType?: 'checkbox' | 'toggle';
    onChange?: (selected: string[] | string | null) => void;
};
export declare const Menu: React.FC<MenuProps>;
