# Polymorphic Box Standard

All components should follow the `Box` polymorphic base pattern.

## Hard Standards

1. Components render through `Box` instead of raw HTML elements.
2. Components with passthrough props must use `splitProps(rest)` tuple destructuring.
3. Class names must be merged with `cx(...)`, with generated classes first and user `className` last.
4. Use `Box` `as` prop for semantic element switching.

## Class Merge Patterns

Regular recipe:

```ts
const classes = button({ variant, size });
const [className, otherProps] = splitProps(rest);

<Box className={cx(classes.container, className)} {...otherProps} />;
```

Slot recipe slot class:

```ts
<Box className={cx(classes.item, className)} />
```
