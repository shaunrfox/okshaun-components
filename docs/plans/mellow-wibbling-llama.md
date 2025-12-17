# Plan: Presentation-Only Menu Components

## Problem

The `Menu` component bundles **behavior** (Floating UI positioning, keyboard navigation, state management, auto-close) with **presentation** (styled container, items, groups, dividers). This makes Menu unusable when external systems (like BlockNote's `SuggestionMenuController`) already own those behaviors.

Current workaround: Import `menuRecipe` directly and apply classes to raw `Box` components. This shouldn't be required.

## Solution

Create a parallel set of **presentation-only** `MenuList` components that use the same recipe styling but have NO built-in behavior:

| Full Component (with behavior) | Presentation-Only (no behavior) |
|-------------------------------|----------------------------------|
| `Menu` | `MenuList` |
| `MenuItem` | `MenuListItem` |
| `MenuDivider` | `MenuListDivider` |
| `MenuGroup` | `MenuListGroup` |

## Files to Create

### 1. `src/components/Menu/MenuList.tsx`
- Simple container using `menuRecipe().menu` class
- Accepts `size`, `indicatorPosition` variant props
- Uses `role="listbox"` (appropriate for autocomplete patterns)
- Forwards ref for external positioning
- NO Floating UI, NO portal, NO context provider

### 2. `src/components/Menu/MenuListItem.tsx`
- Styled item using recipe classes
- Props: `label`, `description`, `iconLeft`, `iconRight`, `highlightMatch`, `selected`, `active`, `disabled`, `type`, `selectionIndicator`, `onClick`
- `active` prop directly controls highlight state (via `data-active`)
- NO context dependency, NO auto-close, NO keyboard handlers
- Requires `size`/`indicatorPosition` passed as props

### 3. `src/components/Menu/MenuListDivider.tsx`
- Styled divider using recipe class
- NO context dependency

### 4. `src/components/Menu/MenuListGroup.tsx`
- Styled group with optional label
- NO context dependency

## Files to Modify

### 1. `src/components/Menu/types.ts`
Add type definitions:
```typescript
export type MenuListProps = ...
export type MenuListItemProps = ...
export type MenuListDividerProps = ...
export type MenuListGroupProps = ...
```

### 2. `src/components/Menu/index.tsx`
Add exports for new components and types

### 3. `src/index.ts`
Add library-level exports

## Usage Example (BlockNote Integration)

```tsx
import { MenuList, MenuListItem } from '@okshaun/components';

function BlockNoteSuggestionMenu({ items, selectedIndex, onItemClick }) {
  return (
    <MenuList size="compact">
      {items.map((item, index) => (
        <MenuListItem
          key={item.id}
          label={item.title}
          description={item.subtext}
          iconLeft={item.icon}
          active={index === selectedIndex}
          onClick={() => onItemClick(item)}
          size="compact"
        />
      ))}
    </MenuList>
  );
}
```

## Key Design Decisions

1. **Naming**: `MenuList` prefix clearly indicates "list-like" presentation without menu behavior
2. **Prop drilling**: `size`/`indicatorPosition` must be passed to each item (avoids context overhead, keeps components stateless)
3. **ARIA roles**: `listbox`/`option` by default (better for autocomplete), configurable via props
4. **Same recipe**: Both component sets import from `@styled-system/recipes` for identical styling

## Implementation Order

1. Add types to `types.ts`
2. Create `MenuList.tsx`
3. Create `MenuListItem.tsx` (extract presentation logic from `MenuItem.tsx`)
4. Create `MenuListDivider.tsx`
5. Create `MenuListGroup.tsx`
6. Update `index.tsx` and `src/index.ts` exports
7. Add Storybook stories for MenuList components
8. Refactor `Autocomplete.tsx` to use `MenuList`/`MenuListItem` (proof of concept)

## Critical File Paths

- `src/components/Menu/types.ts` - Type definitions
- `src/components/Menu/MenuItem.tsx` - Reference for presentation logic
- `src/recipes/menu.ts` - Recipe definition (no changes needed)
- `src/components/Menu/index.tsx` - Component exports
- `src/index.ts` - Library exports
