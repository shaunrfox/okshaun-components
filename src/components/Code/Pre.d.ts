import { BoxProps } from '../Box';
export type PreProps = BoxProps & {
    children: string | React.ReactNode;
    lang?: string;
    as?: string;
};
export declare const Pre: React.FC<PreProps>;
