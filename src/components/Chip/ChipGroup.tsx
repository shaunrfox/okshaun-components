import { Wrap, type WrapProps } from '@styled-system/jsx';
import { type ReactNode, type RefObject, useCallback, useRef } from 'react';
import { ChipGroupContext, type ChipGroupType } from './ChipGroupContext';

export type ChipGroupProps = Omit<WrapProps, 'role'> & {
  type: ChipGroupType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  children: ReactNode;
  label?: string;
  id?: string;
  name?: string;
};

export const ChipGroup: React.FC<ChipGroupProps> = ({
  type,
  value,
  onChange,
  children,
  label,
  id,
  name,
  gap = '2',
  ...props
}) => {
  const role = type === 'single' ? 'radiogroup' : 'group';

  // Track chip refs for keyboard navigation
  const chipRefs = useRef<Map<string, RefObject<HTMLButtonElement | null>>>(
    new Map(),
  );
  const chipValuesRef = useRef<string[]>([]);

  const registerChip = useCallback(
    (chipValue: string, ref: RefObject<HTMLButtonElement | null>) => {
      chipRefs.current.set(chipValue, ref);
      if (!chipValuesRef.current.includes(chipValue)) {
        chipValuesRef.current.push(chipValue);
      }
    },
    [],
  );

  const unregisterChip = useCallback((chipValue: string) => {
    chipRefs.current.delete(chipValue);
    chipValuesRef.current = chipValuesRef.current.filter(
      (v) => v !== chipValue,
    );
  }, []);

  const focusChip = useCallback(
    (direction: 'next' | 'prev', currentValue: string) => {
      const values = chipValuesRef.current;
      const currentIndex = values.indexOf(currentValue);
      if (currentIndex === -1) return;

      let nextIndex: number;
      if (direction === 'next') {
        // Wrap around to first
        nextIndex = currentIndex === values.length - 1 ? 0 : currentIndex + 1;
      } else {
        // Wrap around to last
        nextIndex = currentIndex === 0 ? values.length - 1 : currentIndex - 1;
      }

      const nextValue = values[nextIndex];
      if (nextValue) {
        const nextRef = chipRefs.current.get(nextValue);
        nextRef?.current?.focus();

        // For single select, also change selection (selection follows focus)
        if (type === 'single') {
          onChange(nextValue);
        }
      }
    },
    [type, onChange],
  );

  return (
    <ChipGroupContext
      value={{
        type,
        value,
        onChange,
        name,
        registerChip,
        unregisterChip,
        focusChip,
        chipValues: chipValuesRef.current,
      }}
    >
      <Wrap
        role={role}
        aria-label={label}
        aria-labelledby={id ? `${id}-label` : undefined}
        id={id}
        gap={gap}
        {...props}
      >
        {children}
      </Wrap>
    </ChipGroupContext>
  );
};
