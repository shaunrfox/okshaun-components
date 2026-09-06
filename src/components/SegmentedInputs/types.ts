import type { ReactNode } from 'react';

/** Value stored by one editable segment. */
export type SegmentValue = number | string | null;

/** Current segment values keyed by each segment's stable identifier. */
export type SegmentedInputValueMap = Record<string, SegmentValue>;

/** Spacing applied around a visual separator between editable segments. */
export type SeparatorGap = 'none' | 'tight' | 'normal' | 'loose';

/** Content and spacing used for a separator between editable segments. */
export type SeparatorConfig = {
  /** Visual separator content. */
  content?: ReactNode;
  /** Space placed around the separator. */
  gap?: SeparatorGap;
};

/** Metadata for an editable numeric or choice segment. */
export type SegmentItem = {
  type: 'segment';
  id: string;
  label: string;
  placeholder: string;
  value: SegmentValue;
  disabled?: boolean;
} & (
  | {
      kind: 'numeric';
      min: number;
      max: number;
      digits: number;
      step?: number;
      format?: (value: number) => string;
      clampValue?: (value: number, values: SegmentedInputValueMap) => number;
    }
  | {
      kind: 'choice';
      choices: readonly string[];
      inputKeys?: Record<string, string>;
    }
);

/** Metadata for non-editable content between segments. */
export type SeparatorItem = {
  type: 'separator';
  id: string;
  content: ReactNode;
  gap?: SeparatorGap;
};

/** Editable segment or visual separator accepted by `SegmentedInput`. */
export type SegmentedInputItem = SegmentItem | SeparatorItem;

/** Change payload containing the complete value map and changed segment. */
export type SegmentedInputChange = {
  values: SegmentedInputValueMap;
  changedSegmentId: string;
};
