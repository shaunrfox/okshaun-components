import { cx } from '@styled-system/css';

import {
  type HighlightTextVariantProps,
  highlightText,
} from '~/styled-system/recipes';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

type HighlightPart = {
  text: string;
  match: boolean;
};

const getHighlightParts = (value: string, query: string): HighlightPart[] => {
  if (!query.trim()) {
    return [{ text: value, match: false }];
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regExp = new RegExp(`(${safeQuery})`, 'ig');
  const parts = value.split(regExp).filter((part) => part.length > 0);

  return parts.map((part) => ({
    text: part,
    match: part.toLowerCase() === query.toLowerCase(),
  }));
};

export type HighlightTextProps = Omit<
  BoxProps,
  keyof HighlightTextVariantProps
> &
  HighlightTextVariantProps & {
    value: string;
    query: string;
    enabled?: boolean;
  };

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
