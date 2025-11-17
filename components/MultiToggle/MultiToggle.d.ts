import * as React from 'react';
export interface MultiToggleOption {
    value: string;
    label: string | React.ReactNode;
}
interface MultiToggleProps {
    options: MultiToggleOption[];
    defaultValue?: string;
    name: string;
    onChange?: (value: string) => void;
    className?: string;
    icons?: boolean;
}
export declare function MultiToggle({ options, defaultValue, name, onChange, className, icons, }: MultiToggleProps): import("react/jsx-runtime").JSX.Element;
export {};
