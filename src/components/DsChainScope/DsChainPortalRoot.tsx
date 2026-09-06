import type { ReactNode } from 'react';

import { dsChainValue, dsObjectValue, useDsChain } from '~/utils/dsChain';

type DsChainPortalRootProps = {
  /** Portal contents that need DOM ancestry back to the opening subtree. */
  children?: ReactNode;
  /**
   * The element that opened this portal — Floating UI's `elements.domReference`
   * at the call site. Its nearest `data-track-object` ancestor is copied onto
   * the portal root, giving portaled content the business-object identity that
   * DOM ancestry cannot supply.
   *
   * Optional because not every portal has one. A `Modal` driven by an `open`
   * prop never sets a reference, and omitting it there yields no object rather
   * than a guessed one.
   */
  reference?: Element | null;
};

/**
 * Wraps portal contents in an element stamped with the resolved chain and the
 * business object the interaction belongs to.
 *
 * Internal. Render it as the outermost child of a `FloatingPortal` so the
 * chain is read at the portal's position in the React tree, which is where the
 * opening component sits, rather than at the component function's own
 * position. Reading it in the component body instead would miss any scope the
 * component's own root `Box` opened for its subtree.
 *
 * The two identities arrive by different routes and that is deliberate. The
 * chain follows the React tree, because a portal's contents are still React
 * descendants of what opened them. The object follows the DOM from the
 * reference element, because the application authors it as markup — a layout
 * wrapper on a legacy Perl screen, individual elements on a React screen — and
 * never through React context.
 *
 * The attributes are written during render, never from an effect: portal
 * content mounts late, and an effect-stamped attribute can lose the race
 * against a click that lands immediately after paint.
 *
 * The wrapper is an unstyled, statically positioned `div`. Every floating
 * element it wraps is absolutely or fixed positioned, so it stays out of flow
 * and the wrapper contributes no layout box of its own.
 */
export const DsChainPortalRoot = ({
  children,
  reference,
}: DsChainPortalRootProps) => {
  const chain = useDsChain();

  return (
    // The marker is unconditional; neither value is. An empty chain emits no
    // `data-ds-chain`, so without the marker an untagged portal is
    // indistinguishable from an ordinary element and a consumer walking up the
    // DOM continues past it into `document.body` — producing a chain from
    // whatever it finds there, with no error. The marker makes "portal
    // boundary, resolved to nothing" a state a reader can detect, and it is
    // what tells that reader to stop and take both values from here.
    <div
      data-ds-portal-root=""
      data-ds-chain={dsChainValue(chain)}
      data-track-object={dsObjectValue(reference)}
    >
      {children}
    </div>
  );
};
