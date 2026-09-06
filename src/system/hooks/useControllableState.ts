import { useCallback, useEffect, useRef, useState } from 'react';

export type UseControllableStateProps<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const valueRef = useRef<T | undefined>(value);
  const onChangeRef = useRef(onChange);
  const controlledRef = useRef(value !== undefined);
  const initialControlledRef = useRef(controlledRef.current);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  valueRef.current = currentValue;
  onChangeRef.current = onChange;
  controlledRef.current = isControlled;

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    if (initialControlledRef.current !== isControlled) {
      console.warn(
        'useControllableState changed between controlled and uncontrolled modes. This is unsupported.',
      );
    }
  }, [isControlled]);

  const setValue = useCallback((nextValue: T | ((currentValue: T) => T)) => {
    const resolvedValue =
      typeof nextValue === 'function'
        ? (nextValue as (currentValue: T) => T)(valueRef.current as T)
        : nextValue;

    if (!controlledRef.current) {
      setUncontrolledValue(resolvedValue);
    }

    onChangeRef.current?.(resolvedValue);
  }, []);

  return [currentValue, setValue] as const;
};
