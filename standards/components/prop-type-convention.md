# Component Prop Type Convention

Defines how component prop types are composed from `BoxProps`, recipe variants, and component-specific props.

## Hard Standards

1. Base composition must start from `Omit<BoxProps, keyof VariantProps>`.

```ts
export type ComponentProps = Omit<BoxProps, keyof ComponentVariantProps> &
  ComponentVariantProps & {
    // component-specific props
  };
```

2. Prefer React 19 ref-as-prop typing (`ComponentPropsWithRef`) and avoid `forwardRef` wrappers unless external integration requires it.
3. If a component should not accept children, explicitly omit `'children'` from the base type.
4. Do not declare function components with `React.FC` or `FC`; type props on the function parameter.
5. Do not use React namespace type imports/usages (for example `import type React from 'react'` or `React.ReactNode`); use named type imports from `react`.

```ts
export type DatePickerProps = Omit<
  BoxProps,
  keyof DatePickerVariantProps | 'children'
> &
  DatePickerVariantProps & {
    value?: DateValue | null;
  };
```

## Guidance

1. If a recipe prop needs a different public type, omit it from recipe variant props and re-declare it.
2. Prefer declaring component-specific props after base/variant composition for readability.
3. Do not narrow `children` to `string` when component composition is expected.
   - For composable primitives (for example `Button` with inline `Badge`), type as `ReactNode` (or `string | ReactNode`) to preserve valid usage.
   - Prefer adapting prop types over forcing callsite rewrites that reduce component ergonomics.

### Situational Example: Re-typing Variant Props

```ts
export type ButtonProps = Omit<BoxProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'iconBefore' | 'iconAfter'> & {
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
  };
```
