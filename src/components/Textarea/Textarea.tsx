import * as React from 'react';
import { textarea } from '@styled-system/recipes';
import { Label } from '~/components/Label';
import { Text } from '~/components/Text';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  stacked?: boolean;
  internalLabel?: boolean;
  autoGrow?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      className,
      stacked = true,
      internalLabel = false,
      autoGrow = false,
      ...props
    },
    ref,
  ) => {
    return (
      <Label
        className={textarea()}
        stacked={stacked}
        internalLabel={internalLabel}
        autoGrow={autoGrow}
        htmlFor={props.id || ''}
      >
        {label && <Text as="span">{label}</Text>}
        <textarea
          id={props.id}
          ref={ref}
          className={className}
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            const target = e.currentTarget;
            const parent = target.parentNode as HTMLElement;
            parent.dataset.value = target.value || '';
          }}
          {...props}
        />
      </Label>
    );
  },
);

Textarea.displayName = 'Textarea';
