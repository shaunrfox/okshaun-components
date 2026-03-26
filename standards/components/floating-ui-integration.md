# Floating UI Integration Standard

Defines baseline integration for floating components (menus, pickers, tooltips, dialogs).

## Scope

This standard applies to all anchored floating components and to shared
floating infrastructure.

- Shared core lives in `src/system/floating-ui/`.
- Component engines (Menu, pickers, tooltip, dialog) consume shared core but
  keep their own ARIA and keyboard semantics.

## Hard Standards

1. Interactive floating content uses `FloatingPortal` + `FloatingFocusManager`.
2. Use `useFloating` with `autoUpdate` and collision middleware (`offset`, `flip`, `shift`) as baseline.
3. Wire both refs and interactions through Floating UI (`refs.setReference`, `refs.setFloating`, `getReferenceProps`, `getFloatingProps`).
4. New floating components must use shared core utilities from
   `src/system/floating-ui/floating.ts` (`useOverlayFloating`,
   `createOverlayMiddleware`) unless a documented exception is required.
5. Share mechanics, not semantics:
   - Menu/action patterns keep menu semantics (`menu`, `menuitem`, submenu
     behavior).
   - Select/list patterns keep listbox semantics (`listbox`, `option`).
   - Calendar patterns keep grid semantics.
6. Context ownership follows engine boundaries:
   - cross-family shared state/utilities -> `src/system/*`
   - component-family context -> inside that component folder
     (for example `src/components/Menu/context/*`).

## Hard With Exceptions

Tooltip-like non-interactive floaters can skip `FloatingFocusManager`.

Engine-specific middleware may diverge from baseline when needed (for example
`arrow`, `size`) but should still be composed through shared middleware helpers.

## Guidance

Cast getter spreads to `Record<string, unknown>` only when TypeScript inference breaks at component boundaries.

```ts
{...(getFloatingProps() as Record<string, unknown>)}
```

If inference works, prefer typed props without extra casting.

Prefer the following implementation pattern:

```ts
const floating = useOverlayFloating({
  open,
  onOpenChange,
  placement: 'bottom-start',
  middleware: createOverlayMiddleware({
    extras: [
      /* optional engine-specific middleware */
    ],
  }),
});
```

Keep visual/content reuse separate from engine behavior:

- Reuse shared row/content primitives for option-like UIs.
- Keep close-on-select and tree coordination inside Menu engine.
