import { cx } from '@styled-system/css';
import { Wrap, type WrapProps } from '@styled-system/jsx';
import type { ChipVariantProps } from '@styled-system/recipes';
import { type ReactNode, type RefObject, useCallback, useRef } from 'react';

import type { BoxProps } from '~/components/Box';
import { useControllableState } from '~/system/hooks';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { ChipGroupContext, type ChipGroupType } from './ChipGroupContext';

/** Props for {@link ChipGroup}, which coordinates selectable child chips. */
export type ChipGroupProps = Omit<WrapProps, 'role'> &
  Omit<BoxProps, keyof WrapProps> & {
    /** Required selection model. `'single'` uses radio semantics; `'multi'` uses checkbox semantics. */
    type: ChipGroupType;
    /** Controlled selected value. Use a string for `'single'` or a string array for `'multi'`, with `onChange` to accept updates. */
    value?: string | string[];
    /**
     * Initial selected value for an uncontrolled group. It is used only on first render.
     * @default '' for `'single'`; [] for `'multi'`
     */
    defaultValue?: string | string[];
    /** Called with the next selection when a child chip is activated. */
    onChange?: (value: string | string[]) => void;
    size?: ChipVariantProps['size'];
    /** `Chip` children. Chips require a unique `value` to participate in selection. */
    children: ReactNode;
    /** Accessible name applied to the group container. */
    label?: string;
    /** Container identifier. When supplied, the container references `${id}-label`, which consumers must render themselves. */
    id?: string;
    /** Shared form metadata exposed to child-chip context; it does not create native form inputs. */
    name?: string;
  };

/**
 * Coordinates the selection and keyboard behavior of child {@link Chip} values.
 *
 * Use `value` with `onChange` for controlled selection, or `defaultValue` for
 * initialization only. In a single-select group, arrow keys move focus and
 * select the newly focused chip. Label the group with `label` when it needs an
 * accessible name.
 *
 * @example
 * ```tsx
 * <ChipGroup type="single" defaultValue="all" label="Status">
 *   <Chip value="all">All</Chip>
 *   <Chip value="open">Open</Chip>
 * </ChipGroup>
 * ```
 */
export const ChipGroup = (props: ChipGroupProps) => {
  const {
    type,
    value,
    defaultValue,
    onChange,
    size,
    children,
    label,
    id,
    name,
    gap = '4',
    className,
    ...rest
  } = props;
  const [stylesClassName, otherProps] = splitProps(rest);
  const role = type === 'single' ? 'radiogroup' : 'group';
  const [resolvedValue, setResolvedValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? (type === 'single' ? '' : ([] as string[])),
    onChange,
  });

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
          setResolvedValue(nextValue);
        }
      }
    },
    [setResolvedValue, type],
  );

  return (
    <ChipGroupContext.Provider
      value={{
        type,
        value: resolvedValue,
        onChange: setResolvedValue,
        name,
        size,
        registerChip,
        unregisterChip,
        focusChip,
        chipValues: chipValuesRef.current,
      }}
    >
      <Wrap
        {...dsComponent('ChipGroup')}
        className={cx(stylesClassName, className)}
        role={role}
        aria-label={label}
        id={id}
        gap={gap}
        {...otherProps}
      >
        {children}
      </Wrap>
    </ChipGroupContext.Provider>
  );
};
