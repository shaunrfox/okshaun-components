import { BoxProps } from '../Box';
import { CheckboxVariantProps } from '../../../styled-system/recipes';
import { ChangeEventHandler } from 'react';
export type CheckboxProps = {
    /** Form field name */
    name: string;
    /** Controlled checked state (REQUIRED) */
    checked: boolean;
    /** Change handler (REQUIRED) */
    onChange: ChangeEventHandler<HTMLInputElement>;
    /** Unique identifier for the checkbox */
    id?: string;
    /** Display indeterminate state (partially checked) */
    indeterminate?: boolean;
    /** Disable the checkbox */
    disabled?: boolean;
    /** Display error state */
    error?: boolean;
} & Omit<BoxProps, 'checked' | 'onChange' | keyof CheckboxVariantProps> & CheckboxVariantProps;
/**
 * Helper type for checkbox change events
 * @example
 * const handleChange: CheckboxChangeHandler = (e) => setChecked(e.target.checked);
 */
export type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;
/**
 * Helper type for checkbox change handler functions
 * @example
 * const handleChange: CheckboxChangeHandler = (e) => setChecked(e.target.checked);
 */
export type CheckboxChangeHandler = (e: CheckboxChangeEvent) => void;
/**
 * Checkbox is a controlled component.
 * You must pass `checked` and `onChange` props.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 */
export declare const Checkbox: React.FC<CheckboxProps>;
