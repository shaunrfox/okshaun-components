# Storybook Conventions

Storybook files are first-class documentation and implementation examples.

## Hard Standards

1. Use typed meta pattern:

```ts
const meta = { ... } satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
```

2. Use Panda components/props for layout (`Box`, `VStack`, `HStack`, etc.), not inline style objects.
3. Include practical usage coverage: default/variants/states plus at least one realistic `Ex: ...` story.
4. Story files follow repo code conventions (import ordering, quote style, valid paths, type imports).

## Style Refactor Playbook

When replacing `style={{ ... }}` in stories/components, preserve intent first,
then map to Panda props/tokens:

1. Replace direct style keys with first-class Panda props when available.
   - Example: `style={{ opacity: imageLoaded ? 1 : 0 }}` -> `opacity={imageLoaded ? 1 : 0}`.
2. Replace pixel widths with tokenized sizing props instead of removing width.
   - Example: `style={{ width: '300px' }}` -> `w="xs"`.
   - Example: `style={{ width: '220px' }}` -> `width="224"` (closest token).
3. Keep layout constraints that communicate demo intent (picker field width, alignment, etc.).
   - Do not drop width/spacing constraints just to satisfy lint.
4. Use style-prop escape hatches only when token/pattern mapping is not practical.
   - Prefer typed style props first; keep `style={...}` for dynamic pass-through values only.
5. Avoid one-off `className={css({...})}` in component/story JSX.
   - Prefer direct Panda style props for local layout/visuals.
   - Use recipe classes or utility wrappers (`splitProps`) when class composition is needed.

## Why Strictness Is High

Storybook is a teaching surface for engineers of mixed frontend experience.
Examples must reflect preferred design-system usage, not shortcuts.
