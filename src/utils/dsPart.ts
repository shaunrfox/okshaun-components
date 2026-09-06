/**
 * Attribute name that names an interactive part inside a design-system
 * component. Always lowercase and hyphenated; HTML lowercases attribute names,
 * so a camelCase spelling would silently produce a different attribute.
 */
export const DS_PART_ATTRIBUTE = 'data-ds-part';

/** Attribute record applied to a named part of a design-system component. */
export type DsPartAttribute = {
  'data-ds-part': string;
};

/**
 * Returns the `data-ds-part` attribute for a named part of a component.
 *
 * Internal instrumentation with the same status as `data-ds-component`: emitted
 * automatically, not a supported public API, and not part of any prop type.
 * **It is not a test handle** — tests query by role, or by the `data-testid` a
 * consumer supplied. Do not document it, type it, or reference it from a test
 * outside this repository.
 *
 * It exists for the collector, which needs to tell apart the interactive parts
 * of one component: a click on a `Select`'s trigger is a different event from a
 * click on a chip's remove control inside it, and both report the same
 * `data-ds-component` and the same chain. The part name is what separates them,
 * and it is the DS's to assign because only the DS knows its own anatomy.
 *
 * Spread the result before the component's rest props so a consumer-supplied
 * value in rest props still wins, matching `dsComponent`.
 *
 * The chain mechanism reads `data-testid` only (see `Box` and
 * `~/utils/dsChain`), so this attribute never contributes a chain node.
 *
 * @example
 * ```tsx
 * <Box role="combobox" {...dsPart('trigger')} {...triggerProps} />
 * ```
 */
export const dsPart = (part: string): DsPartAttribute => ({
  [DS_PART_ATTRIBUTE]: part,
});
