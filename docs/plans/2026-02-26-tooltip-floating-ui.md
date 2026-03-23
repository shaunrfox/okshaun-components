# Tooltip → Floating UI + Z-Index Token System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the custom-positioning Tooltip with a Floating UI implementation that fixes all accessibility gaps, and introduce a proper z-index token system aligned with the existing shadow/surface naming conventions.

**Architecture:** Tooltip becomes a thin wrapper around Floating UI hooks (`useHover`, `useFocus`, `useDismiss`, `useRole`) with `FloatingPortal` + `FloatingArrow`. All custom geometry math (`getSimulatedRect`, `getClockwise`, etc.) is deleted. Z-index tokens follow the two-layer primitive/semantic pattern already used for shadows and colors.

**Tech Stack:** `@floating-ui/react` ^0.27.x (already installed), Panda CSS `defineTokens` / `defineSemanticTokens`, React 19 `useState` / `useRef`

---

## Context: What Exists Today

### Files this plan touches

| File | Action |
|------|--------|
| `src/styles/primitives/zIndex.ts` | **Create** |
| `src/styles/primitives/index.ts` | **Modify** — add export |
| `src/styles/semantics/zIndex.ts` | **Create** |
| `src/styles/semantics/index.ts` | **Modify** — add export |
| `src/preset.ts` | **Modify** — wire z-index semantic tokens |
| `src/recipes/menu.ts` | **Modify** — `zIndex: 1000` → `'elevated'` |
| `src/recipes/modal.ts` | **Modify** — `zIndex: 1100/1101` → `'overlay'/'modal'` |
| `src/recipes/badge.ts` | **Modify** — `zIndex: '1'` → `'raised'` |
| `src/recipes/radio.ts` | **Modify** — `zIndex: 1` → `'raised'` |
| `src/recipes/avatar.ts` | **Modify** — `zIndex: 1` → `'raised'` |
| `src/recipes/checkbox.ts` | **Modify** — `zIndex: 1` → `'raised'` |
| `src/recipes/toggle.ts` | **Modify** — `zIndex: 0` → `'base'` |
| `src/recipes/tooltip.ts` | **Rewrite** — remove 12 position variants |
| `src/components/Tooltip/Tooltip.tsx` | **Rewrite** — Floating UI implementation |
| `src/components/Tooltip/Tooltip.stories.tsx` | **Create** |

### Key conventions to follow

- Panda recipe z-index values are **strings** when referencing tokens: `zIndex: 'elevated'`
- Panda recipe z-index values are **numbers** for raw values (avoid these after this plan)
- `splitProps(rest)` separates Panda style props from DOM props — always use it
- Recipe slot classes are applied via `cx(classes.slotName, userClassName)`
- Dark mode is handled by Panda CSS variables — `data-color-mode` is set high enough in the DOM tree that `FloatingPortal` content (rendered into `document.body`) inherits it correctly (verified by Menu which already uses `FloatingPortal`)

---

## Task 1: Create z-index primitive tokens

**Files:**
- Create: `src/styles/primitives/zIndex.ts`

### Step 1: Create the file

```ts
// src/styles/primitives/zIndex.ts
import { defineTokens } from '@pandacss/dev';

export const zIndex = defineTokens.zIndex({
  '-1':   { value: -1 },
  '0':    { value: 0 },
  '1':    { value: 1 },
  '2':    { value: 2 },
  '3':    { value: 3 },
  '4':    { value: 4 },
  '5':    { value: 5 },
  '10':   { value: 10 },
  '1000': { value: 1000 },
  '1100': { value: 1100 },
  '1101': { value: 1101 },
  '1200': { value: 1200 },
});
```

### Step 2: Export from primitives index

In `src/styles/primitives/index.ts`, add after the `spacings` export and before the comment block:

```ts
export * from './zIndex';
```

### Step 3: Commit

```bash
git add src/styles/primitives/zIndex.ts src/styles/primitives/index.ts
git commit -m "feat(tokens): add z-index primitive tokens"
```

---

## Task 2: Create z-index semantic tokens

**Files:**
- Create: `src/styles/semantics/zIndex.ts`
- Modify: `src/styles/semantics/index.ts`

### Step 1: Create the semantic token file

```ts
// src/styles/semantics/zIndex.ts
import { defineSemanticTokens } from '@pandacss/dev';

/**
 * Z-index elevation scale — mirrors shadow and surface naming:
 *   raised    → shadows.raised    / surface.raised   (internal component stacking)
 *   elevated  → shadows.elevated                     (menus, dropdowns)
 *   overlay   → shadows.overlay   / surface.overlay  (modal backdrop)
 *   modal     →                                      (modal container, above backdrop)
 *   tooltip   →                                      (always on top)
 */
export const zIndex = defineSemanticTokens.zIndex({
  base:     { value: '{zIndex.0}'    },
  raised:   { value: '{zIndex.1}'    },
  elevated: { value: '{zIndex.1000}' },
  overlay:  { value: '{zIndex.1100}' },
  modal:    { value: '{zIndex.1101}' },
  tooltip:  { value: '{zIndex.1200}' },
});
```

### Step 2: Export from semantics index

In `src/styles/semantics/index.ts`:

```ts
export * from './colors';
export * from './shadows';
export * from './zIndex';
```

### Step 3: Commit

```bash
git add src/styles/semantics/zIndex.ts src/styles/semantics/index.ts
git commit -m "feat(tokens): add z-index semantic tokens aligned with shadow/surface naming"
```

---

## Task 3: Wire z-index tokens into preset

**Files:**
- Modify: `src/preset.ts`

### Step 1: Update the theme object

In `src/preset.ts`, the `theme` object currently has:

```ts
const theme = {
  tokens: {
    ...tokens,
  },
  semanticTokens: {
    colors: semanticTokens.colors,
    shadows: semanticTokens.shadows,
  },
};
```

Update to:

```ts
const theme = {
  tokens: {
    ...tokens,
  },
  semanticTokens: {
    colors: semanticTokens.colors,
    shadows: semanticTokens.shadows,
    zIndex: semanticTokens.zIndex,
  },
};
```

### Step 2: Update the preset definition

In the same file, the `semanticTokens` block inside `okshaunPreset` currently has:

```ts
semanticTokens: {
  colors: theme.semanticTokens.colors,
  shadows: theme.semanticTokens.shadows,
},
```

Update to:

```ts
semanticTokens: {
  colors: theme.semanticTokens.colors,
  shadows: theme.semanticTokens.shadows,
  zIndex: theme.semanticTokens.zIndex,
},
```

### Step 3: Run panda codegen to verify no errors

```bash
npm run panda
```

Expected: completes without errors. If TypeScript complains about `zIndex` not being a valid key in `defineSemanticTokens`, verify the Panda version supports it (it does as of v1.x — the `primitives/index.ts` comment confirms `zIndex: string | number` is a supported token type).

### Step 4: Commit

```bash
git add src/preset.ts
git commit -m "feat(tokens): wire z-index semantic tokens into preset"
```

---

## Task 4: Update existing recipes to use z-index tokens

**Files:**
- Modify: `src/recipes/menu.ts`
- Modify: `src/recipes/modal.ts`
- Modify: `src/recipes/badge.ts`
- Modify: `src/recipes/radio.ts`
- Modify: `src/recipes/avatar.ts`
- Modify: `src/recipes/checkbox.ts`
- Modify: `src/recipes/toggle.ts`

### Step 1: menu.ts

Find `zIndex: 1000` and replace with `zIndex: 'elevated'`.

### Step 2: modal.ts

Find `zIndex: 1100` (on the `overlay` slot) and replace with `zIndex: 'overlay'`.
Find `zIndex: 1101` (on the `container` slot) and replace with `zIndex: 'modal'`.

### Step 3: badge.ts

Find `zIndex: '1'` and replace with `zIndex: 'raised'`.

### Step 4: radio.ts

Find `zIndex: 1` and replace with `zIndex: 'raised'`.

### Step 5: avatar.ts

Find all instances of `zIndex: 1` (there are 2) and replace with `zIndex: 'raised'`.

### Step 6: checkbox.ts

Find `zIndex: 1` and replace with `zIndex: 'raised'`.

### Step 7: toggle.ts

Find `zIndex: 0` and replace with `zIndex: 'base'`.

### Step 8: Run panda and verify

```bash
npm run panda
```

Expected: no errors.

### Step 9: Commit

```bash
git add src/recipes/menu.ts src/recipes/modal.ts src/recipes/badge.ts \
        src/recipes/radio.ts src/recipes/avatar.ts src/recipes/checkbox.ts \
        src/recipes/toggle.ts
git commit -m "refactor(recipes): replace raw z-index values with semantic tokens"
```

---

## Task 5: Rewrite the tooltip recipe

**Files:**
- Modify: `src/recipes/tooltip.ts`

This task deletes ~260 lines and replaces with ~80. The entire `position` variant (12 values) is removed — Floating UI owns positioning. The compound variants are removed. The invalid `_position` nested syntax is removed.

### Step 1: Replace the entire file

```ts
// src/recipes/tooltip.ts
import { defineSlotRecipe } from '@pandacss/dev';

export const tooltipRecipe = defineSlotRecipe({
  className: 'tooltip',
  jsx: ['Tooltip'],
  slots: ['tooltipContent', 'title', 'text'],

  base: {
    tooltipContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      // Inverted surface: dark in light mode, light in dark mode
      bg: { base: 'gray.90', _dark: 'gray.10' },
      color: { base: 'gray.10', _dark: 'gray.90' },
      fontFamily: 'sans',
      fontWeight: 'normal',
      borderRadius: '4',
      maxWidth: '240px',
      boxShadow: 'elevated',
      zIndex: 'tooltip',
      pointerEvents: 'none',
    },
    title: {
      fontWeight: 'bold',
      color: 'text',
    },
    text: {
      // Default — overridden by hasTitle variant
      color: 'text.subtlest',
    },
  },

  variants: {
    size: {
      sm: {
        tooltipContent: { py: '4', px: '8' },
        title:          { fontSize: '12' },
        text:           { fontSize: '12' },
      },
      md: {
        tooltipContent: { py: '8', px: '12' },
        title:          { fontSize: '14' },
        text:           { fontSize: '14' },
      },
      lg: {
        tooltipContent: { py: '12', px: '16' },
        title:          { fontSize: '16' },
        text:           { fontSize: '16' },
      },
    },

    // Controls whether title text uses full contrast (has title = true means
    // the text slot uses subtlest color; already in base, but without a title
    // the text slot should use full text color)
    hasTitle: {
      true:  { text: { color: 'text.subtlest' } },
      false: { text: { color: 'text' } },
    },
  },

  defaultVariants: {
    size: 'md',
    hasTitle: false,
  },
});
```

> **Note on colors:** The base `gray.90` / `gray.10` values are preserved here to avoid unintentional visual regressions. A follow-up task should map these to a proper inverted surface semantic token (candidate: `bg.neutral.inverse` / `text.inverse`) once that token's actual color values are verified against the current visual output.

> **Note on caret:** The `caret` boolean variant is removed from the recipe. Caret visibility is now controlled in JSX by conditionally rendering `<FloatingArrow>`. No recipe change needed.

### Step 2: Commit

```bash
git add src/recipes/tooltip.ts
git commit -m "refactor(tooltip): remove position variants, simplify recipe for Floating UI"
```

---

## Task 6: Rewrite the Tooltip component

**Files:**
- Modify: `src/components/Tooltip/Tooltip.tsx`

This task deletes all custom geometry math and replaces it with Floating UI hooks. The component goes from ~294 lines to ~90 lines.

### Step 1: Replace the entire file

```tsx
// src/components/Tooltip/Tooltip.tsx
import {
  FloatingArrow,
  FloatingPortal,
  type Placement,
  arrow,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { type TooltipVariantProps, tooltip } from '@styled-system/recipes';
import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Text } from '../Text';

export type TooltipProps = Omit<BoxProps, keyof TooltipVariantProps | 'children'> &
  TooltipVariantProps & {
    /** Tooltip body text (required) */
    text: string;
    /** Optional bold title rendered above the text */
    title?: string;
    /** Show/hide the arrow caret. Default: true */
    caret?: boolean;
    /** Floating UI placement. Automatically flips if it doesn't fit. Default: 'bottom' */
    placement?: Placement;
    /** Distance in px between trigger and tooltip. Default: 8 */
    offset?: number;
    /** Hover open/close delay in ms, or { open, close } for separate delays */
    delay?: number | { open: number; close: number };
    /** Trigger element. Wrapped in a <span> to attach the floating ref. */
    children?: ReactNode;
  };

export const Tooltip = (props: TooltipProps) => {
  const {
    caret = true,
    size = 'md',
    text,
    title,
    children,
    placement = 'bottom',
    offset = 8,
    delay,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      floatingOffset(offset),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // useRole sets role="tooltip" on the floating element and
  // aria-describedby on the reference — no manual useId needed
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const classes = tooltip({ size, hasTitle: !!title });

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </span>

      {isOpen && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={floatingStyles}
            className={cx(classes.tooltipContent, className)}
            {...(getFloatingProps() as Record<string, unknown>)}
            {...otherProps}
          >
            {title && <Text className={classes.title}>{title}</Text>}
            {text && <Text className={classes.text}>{text}</Text>}
            {caret && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                // Match the tooltip background color via CSS variable.
                // Panda generates this variable from the bg token in the recipe.
                fill="var(--colors-gray-90)"
                style={{ filter: 'var(--dark-mode-arrow-filter, none)' }}
              />
            )}
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};
```

> **FloatingArrow fill note:** The `fill` prop needs to match the tooltip background. Since the bg uses raw `gray.90`/`gray.10` tokens (to be refined later), we use `fill="var(--colors-gray-90)"` for now. When the recipe is updated to use inverted semantic tokens, update this to `fill="var(--colors-bg-neutral-inverse)"`. The dark mode inversion of the arrow is a follow-up concern — the arrow currently won't invert in dark mode with this approach. A cleaner fix is part of the semantic token color cleanup noted in Task 5.

### Step 2: Verify the export in index.tsx is unchanged

`src/components/Tooltip/index.tsx` should still read:
```tsx
export { Tooltip, type TooltipProps } from './Tooltip';
```

Also verify `src/index.ts` exports Tooltip — no changes expected.

> **Removed export:** The `Position` type is no longer exported. If any consumer was importing `Position` from this package, they should now import `Placement` from `@floating-ui/react` directly.

### Step 3: Commit

```bash
git add src/components/Tooltip/Tooltip.tsx
git commit -m "feat(tooltip): replace custom positioning with Floating UI (useHover, useFocus, useDismiss, useRole)"
```

---

## Task 7: Run panda codegen

**Files:** none (generated output only)

### Step 1: Regenerate

```bash
npm run panda
```

Expected: completes without errors. The `styled-system/` directory is updated with the simplified tooltip recipe (no position variants).

### Step 2: Check for TypeScript errors

```bash
npx tsc --noEmit
```

Expected: no errors. Common issues to look for:
- `TooltipVariantProps` no longer has `position` — if any story or usage file passes `position=` to Tooltip, update it to `placement=`
- `hasTitle` is now a recipe variant — it's internal, not in `TooltipProps` (it's derived from `!!title` in the component, not exposed)

### Step 3: Commit if tsc passes

```bash
git add src/styled-system/
git commit -m "chore: regenerate panda output after tooltip recipe simplification"
```

---

## Task 8: Add Storybook story

**Files:**
- Create: `src/components/Tooltip/Tooltip.stories.tsx`

### Step 1: Create the story file

```tsx
// src/components/Tooltip/Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    text: 'This is a tooltip',
    placement: 'bottom',
    caret: true,
    size: 'md',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    caret: { control: 'boolean' },
    delay: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover or focus me</Button>
    </Tooltip>
  ),
};

export const WithTitle: Story = {
  args: {
    title: 'Tooltip title',
    text: 'Supporting description text.',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const NoCaret: Story = {
  args: { caret: false },
  render: (args) => (
    <Tooltip {...args}>
      <Button>No caret</Button>
    </Tooltip>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Tooltip {...args} size="sm" text="Small tooltip">
        <Button size="sm">Small</Button>
      </Tooltip>
      <Tooltip {...args} size="md" text="Medium tooltip">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip {...args} size="lg" text="Large tooltip">
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {(['top-start', 'top', 'top-end',
         'left', '', 'right',
         'bottom-start', 'bottom', 'bottom-end'] as const).map((p) =>
        p ? (
          <Tooltip key={p} {...args} placement={p} text={p}>
            <Button style={{ width: '100%' }}>{p}</Button>
          </Tooltip>
        ) : (
          <div key="empty" />
        )
      )}
    </div>
  ),
};

export const WithDelay: Story = {
  args: { delay: { open: 500, close: 200 }, text: 'Opens after 500ms delay' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Delayed tooltip</Button>
    </Tooltip>
  ),
};

/** Demonstrates keyboard accessibility — Tab to the button to trigger the tooltip */
export const KeyboardFocus: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button>Tab past this</Button>
      <Tooltip {...args} text="Triggered by keyboard focus">
        <Button>Focus me with Tab</Button>
      </Tooltip>
    </div>
  ),
};
```

### Step 2: Start Storybook and verify visually

```bash
npm run storybook
```

Check:
- Tooltip opens on hover and on keyboard focus (Tab to the button)
- Tooltip closes on Escape key
- Arrow points in the correct direction
- Arrow repositions when placement flips (e.g., move the trigger near the viewport edge)
- Dark mode toggle works correctly (if Storybook has a theme toggle)
- All size variants render correctly
- `WithTitle` story shows bold title + subtler body text

### Step 3: Commit

```bash
git add src/components/Tooltip/Tooltip.stories.tsx
git commit -m "docs(tooltip): add Storybook stories covering all variants and keyboard focus"
```

---

## Task 9: Post-refactor verification

### Step 1: Lint

```bash
npm run lint
```

Expected: no errors. If there are unused import warnings on `Tooltip.tsx` (e.g., old `Position` type), clean them up.

### Step 2: react-doctor

```bash
npm run doctor
```

Expected: score ≥ 98/100. Specific things to check in the output:

- **No `role="tooltip"` warning** — `useRole` adds this automatically
- **No `aria-describedby` warning** — `useRole` adds this automatically
- Lint checks may still fail due to the Node v22 / oxlint binding issue (pre-existing, not introduced by this change)

### Step 3: TypeScript strict check

```bash
npx tsc --noEmit
```

Expected: 0 errors.

### Step 4: Build verification

```bash
npm run build
```

Expected: builds cleanly. Verify `dist/index.js` and `dist/preset.js` are generated.

### Step 5: Final commit

If everything passes:

```bash
git add -A
git commit -m "chore: post-refactor verification — lint, tsc, build all passing"
```

---

## What Was Not Done (Intentional Scope Limits)

| Item | Reason deferred |
|------|----------------|
| Semantic color tokens for tooltip bg | Needs visual verification against `bg.neutral.inverse` — separate cleanup |
| `FloatingArrow` dark mode color inversion | Depends on the color token cleanup above |
| `onClick` / Popover behavior | Future `Popover` component — out of scope |
| Removing `Position` type from public API as breaking change | Low priority, just stop exporting it |
| Modal container using DOM stacking instead of separate z-index | Modal architecture cleanup — separate task |
