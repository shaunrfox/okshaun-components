# Controllable-State Utilities

## Current state and Cetec delta

Several okshaun controls implement controlled state independently, while some
require controlled props outright. Cetec adds shared `useControllableState` and
`useOnClose` utilities and applies a consistent controlled/uncontrolled model.

## Target interfaces

Add a generic `useControllableState<T>` accepting:

- `value?: T`
- `defaultValue: T`
- `onChange?: (value: T) => void`

Return the resolved value and a stable setter. The setter updates internal
state only when `value` is undefined and always invokes `onChange` for a real
interaction.

Add `useOnClose` only where its semantics are demonstrably shared. It should
provide stable close behavior without hiding component-specific focus
restoration or close-reason logic.

## Behavioral contract

- Controlled status is determined by `value !== undefined`.
- `null` is a valid controlled value and must not switch the component to
  uncontrolled mode.
- `defaultValue` is read for initial state and is not reapplied on later
  renders.
- Controlled-to-uncontrolled switching is unsupported and should produce a
  development warning if the utility can do so without affecting production.
- Callback invocation must not depend on whether state is controlled.
- Setters must support direct values. Functional updates may be supported if
  required by ChipGroup or Select, but the type and callback behavior must be
  explicit and tested.

## Adoption boundaries

Use the utility for ChipGroup and other value-based composites where it reduces
duplicate behavior. Native form controls may continue to rely on React's
`checked`/`defaultChecked` behavior rather than wrapping native state.

DatePicker and TimePicker maintain segmented local editing state, so the
utility must not replace their segment model blindly. It should govern the
committed value or open state only if synchronization remains correct.

## Stories and tests

Create interaction scenarios for:

- Uncontrolled initialization and updates.
- Controlled updates where the parent accepts the callback.
- Controlled updates where the parent intentionally does not change value.
- `null` as a controlled value.
- Callback order and single invocation.
- Independent value and open-state control in Select and pickers.

Document the controlled-components policy and prop naming conventions.

## Verification

Run typecheck and Storybook interactions for every adopter. Confirm that no
component passes both `value` and `defaultValue` to the same native input.

## Exclusions

Do not port utility use merely for code similarity. Components with reliable
native uncontrolled behavior should retain it.

