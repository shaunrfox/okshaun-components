// Minimal Panda type shims to avoid leaking @pandacss/types to consumers
export type StyleObject = Record<string, unknown>;

export type PandaPreset = {
  name?: string;
  theme?: unknown;
  utilities?: unknown;
  patterns?: unknown;
  globalCss?: unknown;
  conditions?: unknown;
};
