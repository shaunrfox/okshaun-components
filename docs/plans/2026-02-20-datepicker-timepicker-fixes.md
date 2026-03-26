# Fix DatePicker & TimePicker — Floating UI + Architecture

## Context

Two issues reported after initial implementation:

1. **Components non-functional**: Focus ring appears but no typing, no dropdown. Root cause: `useFocus` from Floating UI is incompatible with a multi-span segmented input. When focus moves between sibling `<span>` segments, `onBlur` bubbles to the container and `useFocus` sees `relatedTarget` pointing to a sibling span (not the floating element), so it fires `onOpenChange(false)` immediately — popover never stays open.

2. **Architecture mismatch**: Plan called for using Autocomplete as the composition reference and reusing `MenuList`/`MenuListItem`. TimeList currently uses custom `Box[role="option" as="button"]` items instead.

---

## Fix 1 — Floating UI Trigger (DatePicker.tsx + TimePicker.tsx)

**Remove**: `useFocus` import and from `useInteractions`.

**Add**: `useClick(context, { keyboardHandlers: false })` — exactly as Autocomplete does.

**Add** a `containerRef` + combined ref setter (needed so blur handler can check containment):
```ts
const containerRef = useRef<HTMLDivElement | null>(null);
const setContainerRef = useCallback((el: HTMLDivElement | null) => {
  containerRef.current = el;
  refs.setReference(el);
}, [refs.setReference]);
```

**Update `useInteractions`**:
```ts
const click = useClick(context, { keyboardHandlers: false });
const dismiss = useDismiss(context, { bubbles: false });
const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
```

**Add `handleSegmentBlur`** — only closes if focus left both container AND floating:
```ts
const handleSegmentBlur = useCallback((e: React.FocusEvent) => {
  setFocusedSegment(null);
  const related = e.relatedTarget as Node | null;
  if (
    !containerRef.current?.contains(related) &&
    !refs.floating.current?.contains(related)
  ) {
    handleOpenChange(false);
  }
}, [refs.floating, handleOpenChange]);
```

**Update segment `onFocus`** — open popover on focus (was only setting focused segment):
```tsx
onFocus={() => { setFocusedSegment(seg.type); if (!disabled) handleOpenChange(true); }}
```

**Update segment `onBlur`** — use `handleSegmentBlur` instead of `() => setFocusedSegment(null)`.

**Add container `onClick`** — clicking whitespace focuses first segment:
```tsx
onClick={(e: React.MouseEvent<HTMLDivElement>) => {
  if (e.target === e.currentTarget && !disabled) segmentRefs.current[0]?.focus();
}}
```

**Update container `ref`** from `refs.setReference` to `setContainerRef`.

Same changes apply identically to both `DatePicker.tsx` and `TimePicker.tsx`.

---

## Fix 2 — TimeList: Use MenuListItem (TimeList.tsx)

Replace the custom `Box[as="button" role="option"]` inside `renderColumn` with `MenuListItem` from `~/components/Menu`.

The column container (`Box[role="listbox"]`) stays — it uses `classes.column` recipe styles for the narrow scrollable layout. We don't use `MenuList` as the column wrapper because `MenuList` carries popover-level styles (shadow, bg, maxWidth) that conflict with being a sub-column inside a larger popover.

**Import**: `import { MenuListItem } from '~/components/Menu';`

**Replace** the `Box[as="button"]` map inside `renderColumn` with:
```tsx
<MenuListItem
  key={String(item)}
  label={formatItem(item)}
  selected={item === selectedItem}
  type="action"
  justifyContent="center"
  onClick={() => onItemSelect(item)}
/>
```

- `type="action"` — no selection indicator rendered
- `selected` — triggers `data-selected` + `_selected` recipe styles (bg highlight)
- `justifyContent="center"` — centers number labels in the column
- `role="option"` is `MenuListItem`'s default — no need to specify
- Remove `onKeyDown`, `tabIndex` (handled via `onClick` + Floating UI parent listbox)

---

## Critical Files

| File | Change |
|---|---|
| `src/components/DatePicker/DatePicker.tsx` | Remove `useFocus`, add `useClick`, containerRef, handleSegmentBlur, segment onFocus/onBlur updates, container onClick |
| `src/components/TimePicker/TimePicker.tsx` | Same Floating UI changes as DatePicker |
| `src/components/TimePicker/TimeList.tsx` | Import + use `MenuListItem` for column items |

No recipe changes, no new files, no export changes.

---

## Verification

1. `npm run panda` — must complete clean
2. `npm run storybook` — open DatePicker story:
   - Click container whitespace → first segment focuses, popover opens
   - Tab between segments — popover stays open throughout
   - Click a calendar day → popover closes, segment values update
   - Press Escape → popover closes
3. TimePicker story:
   - Same focus/dismiss checks
   - Time list columns render with MenuListItem styling (hover/selected states)
   - Select an hour → highlighted, popover closes, segments update
4. `npm run lint` — no new errors
