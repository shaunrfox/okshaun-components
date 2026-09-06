import { type ReactNode, useMemo } from 'react';

import { DsChainContext, extendDsChain, useDsChain } from '~/utils/dsChain';

/** Props accepted by {@link DsChainScope}. */
export type DsChainScopeProps = {
  /**
   * `data-testid` value appended to the chain inherited by `children`. Match it
   * to the `data-testid` written on the element this scope describes so the
   * chain and the DOM agree.
   */
  testId: string;
  /** Subtree that resolves the extended chain. */
  children?: ReactNode;
};

/**
 * Adds a test id to the interaction chain shared with a subtree.
 *
 * Design-system components pick this up automatically: `Box` opens a scope
 * whenever it receives a `data-testid`, so anything rendered through the
 * library already contributes. Reach for `DsChainScope` only around raw DOM
 * that does not render through `Box` and still needs to appear in the chain,
 * such as an application-owned wrapper element.
 *
 * The chain exists so portaled content can be attributed back to the subtree
 * that opened it. A menu, modal, or tooltip renders into `document.body` and
 * has no DOM ancestry to its opener, but React context follows the React tree
 * through a portal, so the chain resolves correctly on either side.
 *
 * Renders no DOM of its own. The chain keeps the five nearest ids.
 *
 * @example
 * ```tsx
 * <DsChainScope testId="order-row">
 *   <tr data-testid="order-row">{cells}</tr>
 * </DsChainScope>
 * ```
 */
export const DsChainScope = ({ testId, children }: DsChainScopeProps) => {
  const parentChain = useDsChain();
  // Memoized on the inherited chain and this id: an unrelated parent render
  // must not hand descendants a new array identity and re-render every reader.
  const chain = useMemo(
    () => extendDsChain(parentChain, testId),
    [parentChain, testId],
  );

  return (
    <DsChainContext.Provider value={chain}>{children}</DsChainContext.Provider>
  );
};
