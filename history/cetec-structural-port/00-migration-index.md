# Cetec Structural and Behavioral Port

Date: 2026-06-21

## Objective

Port the reusable structure and behavior developed in `Cetec-Design-System` into
`@okshaun/components` without importing Cetec branding. The target includes
component APIs, controlled and uncontrolled state, composition contexts,
responsive recipe structure, accessibility, focus management, pointer behavior,
form submission, stories, and supporting documentation.

The source of truth for comparison is the sibling repository at
`/Users/shaunfox/Documents/bigfootcode/Cetec-Design-System`. The implementation
must adapt the relevant behavior rather than copying files wholesale.

## Non-negotiable boundaries

- Retain okshaun primitive and semantic tokens, fonts, theme names, color
  decisions, and overall visual identity.
- Preserve `Autocomplete`, `Dropdown`, all existing chevron icons, and the
  current theme-provider contract.
- Preserve okshaun's more complete public type exports.
- Prefer additive compatibility aliases and deprecation notes before removing
  existing props such as `iconBefore`, `iconAfter`, or controlled-only APIs.
- Do not adopt Cetec's root `index.ts`, preset, reset stylesheet, font imports,
  or package export map wholesale.
- Do not copy recipe values when the difference is purely visual. Port recipe
  slots, state selectors, conditional variants, and layout behavior using
  okshaun tokens.
- Track implementation exclusively through beads. These documents are design
  specifications, not task lists.

## Dependency order

```text
Field/Slot contexts ─┬─ Button, IconButton, Icon, Avatar, Badge, Spinner
                     ├─ FormField, TextInput, Textarea
                     ├─ Checkbox, Radio, Toggle and labeled inputs
                     └─ Chip, Select, DatePicker, TimePicker

Controllable state ──┬─ ChipGroup, RadioGroup, Select
                     └─ Checkbox, Radio, Toggle, DatePicker, TimePicker

Responsive recipes ──┬─ all recipe ports
                     ├─ List/Menu
                     └─ BreakpointIndicator

List ────────────────┬─ Select
                     └─ Menu

Chip ────────────────── Select multi-value rendering

Icon + Spinner asset ── Spinner, Kbd documentation examples
```

## Recommended implementation sequence

1. Shared context, state, recipe, export, and packaging foundations.
2. Icon, Spinner, Button, IconButton, Avatar, Badge, and BreakpointIndicator.
3. FormField, TextInput, Textarea, Checkbox, Radio, Toggle, and labeled inputs.
4. RadioGroup, Chip, and ChipGroup.
5. List and linked-list behavior.
6. Select.
7. Menu and menubar behavior.
8. DatePicker, TimePicker, and range-wrapper compatibility.
9. Modal, ThemeSwitcher, Kbd, and Skeleton.
10. Cross-component Storybook, documentation, package, and doctor validation.

## Component specifications

### Foundations

- [Field and slot contexts](01-field-and-slot-contexts.md)
- [Controllable-state utilities](02-controllable-state-utilities.md)
- [Responsive recipe structure](03-responsive-recipe-structure.md)
- [Public exports and packaging](04-public-exports-and-packaging.md)

### New components

- [Kbd](kbd.md)
- [Skeleton](skeleton.md)
- [RadioGroup](radio-group.md)

### Composite components

- [Menu](menu.md)
- [Select](select.md)
- [Chip](chip.md)
- [FormField](form-field.md)
- [TextInput](text-input.md)
- [List](list.md)
- [Modal](modal.md)
- [DatePicker](date-picker.md)
- [TimePicker](time-picker.md)

### Primitives and composed controls

- [Button](button.md)
- [IconButton](icon-button.md)
- [Icon](icon.md)
- [Avatar](avatar.md)
- [Badge](badge.md)
- [Spinner](spinner.md)
- [Checkbox](checkbox.md)
- [CheckboxInput](checkbox-input.md)
- [Radio](radio.md)
- [RadioInput](radio-input.md)
- [Toggle](toggle.md)
- [ToggleInput](toggle-input.md)
- [Textarea](textarea.md)
- [ThemeSwitcher](theme-switcher.md)
- [BreakpointIndicator](breakpoint-indicator.md)

## Small-delta components

The following Cetec differences do not justify independent ports:

- `Box`, `Breadcrumbs`, `Label`, and `Text`: import ordering or comments only.
- `Card` and `Heading`: additional responsive stories; cover the shared
  conditional-value capability in the responsive-recipe plan.
- `Code`: Cetec's hard-coded text color is brand-specific and must not be copied.
- `Divider`, `Link`, `Tag`, `Tooltip`, `DateRangePicker`, and
  `TimeRangePicker`: narrow type derivations should be folded into the public
  API and picker plans.
- `Tag`: Cetec hue names reflect its palette and are explicitly excluded.
- `ThemeProvider`: retain okshaun themes; take only generic correctness fixes
  found during implementation.

## Compatibility policy

- Existing controlled usage continues to work without source changes.
- New uncontrolled props use `defaultValue`, `defaultChecked`, or `defaultOpen`.
- A controlled prop always wins over its default counterpart.
- Callbacks fire for both controlled and uncontrolled interactions.
- Context values provide defaults; an explicit component prop wins over slot
  context, which wins over field context, which wins over recipe defaults.
- Existing named-icon props remain aliases while arbitrary `before` and `after`
  slots are introduced.
- Breaking changes require a deliberate major-version decision and cannot be
  introduced merely because Cetec made the change.

## Storybook and documentation policy

Port stories that prove behavior: keyboard navigation, focus restoration,
controlled/uncontrolled transitions, responsive conditional values, form
submission, touch/coarse pointer handling, loading, validation, and slot
composition. Rewrite text and token examples for okshaun.

Adapt Cetec's top-navigation menubar and conditions documentation. Expand the
existing accessibility, controlled-components, floating-UI, and Panda-patterns
documents where the new behavior changes their guidance.

## Validation gates

Each implementation batch must pass:

```bash
npm run typecheck
npm run standards:check
npm run storybook:build
```

Integration milestones must additionally pass:

```bash
npm run validate
npm run build
npm run doctor:react
```

Final package verification must confirm that `dist/index.js`,
`dist/types/index.d.ts`, `dist/preset.js`, `dist/styles.css`, and
`dist/sprite.svg` contain the intended additions without removing current
exports or assets.

