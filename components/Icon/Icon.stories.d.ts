import { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import('react').FC<import('./Icon').IconProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
