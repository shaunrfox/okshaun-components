import { BoxProps } from './Box';
interface RuleProps extends BoxProps {
    orientation?: 'horizontal' | 'vertical';
}
export declare const Rule: ({ orientation, ...props }: RuleProps) => import("react/jsx-runtime").JSX.Element;
export default Rule;
