import { cx } from '@styled-system/css';

import {
  type HighlightTextVariantProps,
  highlightText,
} from '~/styled-system/recipes';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** A contiguous segment of text and whether it matches the search query. */
type HighlightPart = {
  text: string;
  match: boolean;
};

const getHighlightParts = (value: string, query: string): HighlightPart[] => {
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regExp = new RegExp(`(${safeQuery})`, 'ig');
  const parts = value.split(regExp).filter((part) => part.length > 0);
  const normalizedQuery = query.toLowerCase();

  return parts.map((part) => ({
    text: part,
    match: part.toLowerCase() === normalizedQuery,
  }));
};

/** Props for {@link HighlightText}. */
export type HighlightTextProps = Omit<
  BoxProps,
  keyof HighlightTextVariantProps
> &
  HighlightTextVariantProps & {
    /** Text to render and search within. */
    value: string;
    /** Case-insensitive literal text to mark within `value`. */
    query: string;
    /**
     * When false, returns `value` without creating highlight markup or applying
     * styling props.
     *
     * @default true
     */
    enabled?: boolean;
  };

/**
 * Renders case-insensitive literal matches in text using semantic `mark`
 * elements.
 *
 * Empty or whitespace-only queries, and `enabled={false}`, render the original
 * string without wrapper markup. Use it directly for custom content; default
 * {@link ListItem} content uses it automatically when highlighting is enabled.
 *
 * @example
 * ```tsx
 * <HighlightText value="Account settings" query="account" />
 * ```
 */
export const HighlightText = (props: HighlightTextProps) => {
  const { value, query, enabled = true, ...rest } = props;

  const [className, otherProps] = splitProps(rest);

  if (!enabled || !query.trim()) {
    return <>{value}</>;
  }

  const parts = getHighlightParts(value, query);
  let runningOffset = 0;

  return (
    <>
      {parts.map((part) => {
        const key = `${part.text}-${runningOffset}`;
        runningOffset += part.text.length;

        if (!part.match) {
          return <span key={key}>{part.text}</span>;
        }

        return (
          <Box
            as="mark"
            key={key}
            className={cx(highlightText(), className)}
            {...otherProps}
          >
            {part.text}
          </Box>
        );
      })}
    </>
  );
};
