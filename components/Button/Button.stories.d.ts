import { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: <E extends React.ElementType = "button">(props: import('./Button').ButtonProps<E> & {
        ref?: React.ForwardedRef<Element>;
    }) => JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        variant: {
            control: string;
            options: string[];
        };
        size: {
            control: string;
            options: string[];
        };
        iconButton: {
            control: string;
        };
        isActive: {
            control: string;
        };
    };
    args: {
        onClick: import('@vitest/spy').Mock<(...args: any[]) => any>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const AllVariants: Story;
