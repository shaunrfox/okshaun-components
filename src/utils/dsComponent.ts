/**
 * Attribute name that identifies which design-system component rendered a DOM
 * element. Always lowercase and hyphenated; HTML lowercases attribute names, so
 * a camelCase spelling would silently produce a different attribute.
 */
export const DS_COMPONENT_ATTRIBUTE = 'data-ds-component';

/** Attribute record applied to a design-system component's root element. */
export type DsComponentAttribute = {
  'data-ds-component': string;
};

/**
 * Returns the `data-ds-component` attribute for a component's root element.
 *
 * Spread the result as the first attribute on the root element so a
 * consumer-supplied `data-ds-component` in the component's rest props still
 * wins. When rest props are forwarded to a nested element instead of the root,
 * pull `data-ds-component` out of the props first and pass it as `override` so
 * the explicit value lands on the root and does not leak onto the inner
 * element.
 *
 * @example
 * ```tsx
 * // Rest props are spread on the root: ordering handles the override.
 * <Box {...dsComponent('Badge')} className={classes.root} {...otherProps} />
 * ```
 *
 * @example
 * ```tsx
 * // Rest props are forwarded to a nested control: pass the override through.
 * const { 'data-ds-component': dsComponentName, ...rest } = props;
 *
 * <Box {...dsComponent('Checkbox', dsComponentName)}>
 *   <Box as="input" {...otherProps} />
 * </Box>;
 * ```
 */
export const dsComponent = (
  name: string,
  override?: string,
): DsComponentAttribute => ({
  [DS_COMPONENT_ATTRIBUTE]: override ?? name,
});
