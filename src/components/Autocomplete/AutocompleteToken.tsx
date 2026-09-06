import type { KeyboardEventHandler, Ref } from 'react';

import { Chip } from '../Chip/Chip';

type AutocompleteTokenProps = {
  className?: string;
  disabled?: boolean;
  dismissButtonRef?: Ref<HTMLButtonElement>;
  isNew?: boolean;
  label: string;
  onDismiss: () => void;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  size: 'sm' | 'md';
};

export const AutocompleteToken = (props: AutocompleteTokenProps) => {
  const {
    className,
    disabled,
    dismissButtonRef,
    isNew,
    label,
    onDismiss,
    onKeyDown,
    size,
  } = props;

  return (
    <Chip
      className={className}
      data-new={isNew || undefined}
      size={size}
      dismissable
      disabled={disabled}
      dismissButtonRef={dismissButtonRef}
      dismissButtonTabIndex={-1}
      onDismiss={onDismiss}
      onDismissKeyDown={onKeyDown}
    >
      {label}
    </Chip>
  );
};
