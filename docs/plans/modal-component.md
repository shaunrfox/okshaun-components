# Modal Component Implementation Plan

## Requirements
- **Controlled component only** - `open` and `onOpenChange` props, no ModalTrigger
- **Three sizes**: sm (400px), md (560px), lg (720px)
- **CSS animations**: Fade overlay + scale/slide container

## Component API
```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="md">
  <ModalHeader title="Dialog Title" showCloseButton />
  <ModalBody>Content...</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button appearance="primary">Save</Button>
  </ModalFooter>
</Modal>
```

## Files to Create/Modify

### 1. Add Keyframes
**File:** `src/styles/utilities/keyframes.ts`

Add to existing `defineKeyframes`:
```typescript
modalFadeIn: {
  '0%': { opacity: '0' },
  '100%': { opacity: '1' },
},
modalFadeOut: {
  '0%': { opacity: '1' },
  '100%': { opacity: '0' },
},
modalScaleIn: {
  '0%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
  '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
},
modalScaleOut: {
  '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
  '100%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
},
```

### 2. Create Slot Recipe
**File:** `src/recipes/modal.ts` (new)

Slots: `overlay`, `container`, `header`, `title`, `closeButton`, `body`, `footer`

Key styling:
- `overlay`: fixed, inset 0, `bg: 'blanket.danger'`, zIndex 1100
- `container`: flex column, `bg: 'surface.overlay'`, borderRadius 12, boxShadow
- Animations via `data-state` attribute (`open` vs `closing`)

Size variants affect container maxWidth and title fontSize.

### 3. Export Recipe
**File:** `src/recipes/index.ts`
```typescript
export { modalRecipe } from './modal';
```

### 4. Register in Preset
**File:** `preset.ts`
- Add `modalRecipe` to destructured imports
- Add `modal: modalRecipe` to `slotRecipes` object

### 5. Run Panda Codegen
```bash
npm run panda
```

### 6. Create Component Files
**Directory:** `src/components/Modal/`

| File | Purpose |
|------|---------|
| `types.ts` | ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps, ModalContextValue |
| `ModalContext.tsx` | Context + useModalContext hook |
| `Modal.tsx` | Main component with FloatingPortal, FloatingFocusManager, useDismiss |
| `ModalHeader.tsx` | Title + close button (uses IconButton) |
| `ModalBody.tsx` | Scrollable content area |
| `ModalFooter.tsx` | Action buttons area |
| `index.tsx` | Re-exports |

**Key patterns from Menu.tsx:**
- `FloatingPortal` for rendering outside DOM
- `FloatingFocusManager` with `modal={true}` for focus trapping
- `useDismiss()` for Escape key handling
- `FloatingOverlay` with `lockScroll` to prevent body scroll

**Animation handling:**
- Track `isClosing` state and `shouldRender` state
- Set `data-state="closing"` during exit animation
- Wait 150ms for animation before unmounting

### 7. Export from Main Index
**File:** `src/index.ts`
```typescript
export { Modal, ModalHeader, ModalBody, ModalFooter, useModalContext } from './components/Modal';
export type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './components/Modal';
```

### 8. Create Storybook Story
**File:** `src/components/Modal/Modal.stories.tsx`

Stories: Default, Small, Large, NoCloseButton, PreventOverlayClose

## Implementation Order
1. Keyframes (no dependencies)
2. Recipe (depends on keyframes)
3. Export recipe + register in preset
4. Run `npm run panda`
5. Component files (types → context → Modal → subcomponents → index)
6. Main index export
7. Storybook story
8. Test with `npm run storybook`

## Reference Files
- `src/components/Menu/Menu.tsx` - FloatingUI portal/focus pattern
- `src/components/Menu/MenuContext.tsx` - Context pattern
- `src/recipes/menu.ts` - Slot recipe structure
- `src/styles/semantics/colors.ts:454-458` - `blanket.danger` token for overlay
