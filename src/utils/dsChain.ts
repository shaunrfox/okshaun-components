import { createContext, useContext } from 'react';

/**
 * Attribute name that carries a resolved interaction chain on a portal root.
 * Always lowercase and hyphenated; HTML lowercases attribute names, so a
 * camelCase spelling would silently produce a different attribute.
 */
export const DS_CHAIN_ATTRIBUTE = 'data-ds-chain';

/** Separator written between chain nodes in the serialized attribute value. */
export const DS_CHAIN_SEPARATOR = '>';

/**
 * Attribute marking the wrapper a portal's contents render into. Written
 * unconditionally, including when the resolved chain is empty, so a consumer
 * walking up the DOM can tell a portal boundary from an ordinary element and
 * stop there instead of continuing into `document.body`.
 */
export const DS_PORTAL_ROOT_ATTRIBUTE = 'data-ds-portal-root';

/**
 * Maximum number of chain nodes retained. The nearest nodes are kept because
 * the leaf end of the chain is what identifies an interaction; page-level
 * object identity is carried separately rather than through this chain.
 */
export const DS_CHAIN_MAX_DEPTH = 5;

/**
 * Attribute carrying business-object identity. The application authors it — on
 * a layout wrapper for legacy Perl screens, on individual elements on React
 * screens. The design system never invents a value; it only copies one onto a
 * portal root, which is the single place DOM ancestry cannot supply it.
 */
export const DS_OBJECT_ATTRIBUTE = 'data-track-object';

// Module-level constant so every reader outside a scope shares one identity.
// A fresh `[]` default would hand consumers a new value on each render and
// defeat the memoization in the provider.
const EMPTY_CHAIN: readonly string[] = Object.freeze([]);

/**
 * Carries the `data-testid` values of the enclosing tagged elements, nearest
 * last. React context walks the React tree rather than the DOM, so portaled
 * content still resolves the chain of the subtree that rendered it.
 */
export const DsChainContext = createContext<readonly string[]>(EMPTY_CHAIN);

/**
 * Returns the interaction chain for the current position in the React tree.
 *
 * Returns a shared empty array outside any scope, so the result is safe to read
 * unconditionally.
 */
export const useDsChain = (): readonly string[] => useContext(DsChainContext);

/**
 * Appends a `data-testid` value to a chain, keeping the nearest
 * `DS_CHAIN_MAX_DEPTH` nodes.
 *
 * A value equal to the innermost node is dropped rather than repeated. Two
 * supported arrangements produce that case: a component that opens a scope
 * above its root and also writes the same id on an inner element, and a
 * consumer that wraps a design-system component in `DsChainScope` using the
 * `data-testid` that component already emits. Neither is an error, and a
 * repeated node carries no information while it consumes one of five slots.
 *
 * Only the innermost node is compared. A legitimately recurring id further out
 * — a nested grid inside a grid — still contributes, because the repeat there
 * describes real structure.
 */
export const extendDsChain = (
  chain: readonly string[],
  testId: string,
): readonly string[] => {
  if (chain[chain.length - 1] === testId) return chain;

  const next = [...chain, testId];

  return next.length > DS_CHAIN_MAX_DEPTH
    ? next.slice(-DS_CHAIN_MAX_DEPTH)
    : next;
};

/**
 * Serializes a chain for the `data-ds-chain` attribute.
 *
 * Returns `undefined` for an empty chain so React omits the attribute instead
 * of emitting an empty string that consumers would have to special-case.
 */
export const dsChainValue = (chain: readonly string[]): string | undefined =>
  chain.length > 0 ? chain.join(DS_CHAIN_SEPARATOR) : undefined;

/**
 * Resolves the business object governing `element` by walking up the DOM to the
 * nearest ancestor carrying `DS_OBJECT_ATTRIBUTE`, `element` itself included.
 *
 * Nearest wins. A legacy Perl screen tags one layout wrapper, so every element
 * on it resolves to the same object; a React screen tags individual elements,
 * so an interaction resolves to the region it started in rather than to the
 * page. Both fall out of the same walk.
 *
 * Returns `undefined` when no ancestor is tagged — including for an element
 * that is not in the document, and for an empty attribute value — so React
 * omits the attribute instead of emitting an empty string that a consumer would
 * have to special-case. An untagged screen must produce no answer, never a
 * borrowed one.
 */
export const dsObjectValue = (
  element: Element | null | undefined,
): string | undefined =>
  element
    ?.closest(`[${DS_OBJECT_ATTRIBUTE}]`)
    ?.getAttribute(DS_OBJECT_ATTRIBUTE) || undefined;
