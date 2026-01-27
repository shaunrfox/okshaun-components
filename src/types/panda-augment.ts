// Minimal shims for Panda CSS helper types used in generated declarations.
// These are structural and intentionally permissive to avoid leaking @pandacss types.
export type RecipeVariantRecord = Record<
  string,
  Record<string, unknown> | string | number | boolean | null | undefined
>;

type BaseRecipeConfig<V extends RecipeVariantRecord = RecipeVariantRecord> = {
  base?: SystemStyleObject;
  variants?: V;
  compoundVariants?: Array<
    Partial<Record<keyof V, string | number | boolean | null | undefined>> & {
      css?: SystemStyleObject;
    }
  >;
};

export type RecipeConfig<V extends RecipeVariantRecord = RecipeVariantRecord> =
  BaseRecipeConfig<V>;

export type SlotRecipeVariantRecord<S extends string = string> = Record<
  S,
  Record<string, unknown>
>;

type BaseSlotRecipeConfig<
  S extends string = string,
  V extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> = {
  slots?: S[];
  variants?: V;
};

export type SlotRecipeConfig<
  S extends string = string,
  V extends SlotRecipeVariantRecord<S> = SlotRecipeVariantRecord<S>,
> = BaseSlotRecipeConfig<S, V>;

export type SystemStyleObject = Record<string, unknown>;

export type GlobalStyleObject = Record<string, unknown>;

export type CompositionStyles = {
  textStyles?: Record<string, SystemStyleObject>;
  animationStyles?: Record<string, SystemStyleObject>;
  layerStyles?: Record<string, SystemStyleObject>;
};

export type PatternProperties = Record<string, unknown>;

type BasePatternConfig<T extends PatternProperties = PatternProperties> = {
  properties?: T;
  transform?: (props: T) => SystemStyleObject;
};

export type PatternConfig<T extends PatternProperties = PatternProperties> =
  BasePatternConfig<T>;

export type Parts = Record<string, SystemStyleObject>;

export type TextStyles = Record<string, SystemStyleObject>;
export type AnimationStyles = Record<string, SystemStyleObject>;
export type LayerStyles = Record<string, SystemStyleObject>;
