import { cx } from '@styled-system/css';
import { kbd } from '@styled-system/recipes';

import { Box, type BoxProps } from '~/components/Box';
import { Tooltip } from '~/components/Tooltip';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

export type KbdSpecialSymbol =
  | 'command'
  | 'option'
  | 'control'
  | 'shift'
  | 'escape'
  | 'delete'
  | 'return'
  | 'tab'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right';

export type KbdValue = string | KbdSpecialSymbol;

/** Props accepted by {@link Kbd}. */
export type KbdProps = Omit<BoxProps, 'children'> & {
  /** Ordered key labels that make up the shortcut. */
  keys: KbdValue[];
};

const symbolMap: Record<KbdSpecialSymbol, { label: string; visible: string }> =
  {
    command: { label: 'Command', visible: '⌘' },
    option: { label: 'Option', visible: '⌥' },
    control: { label: 'Control', visible: '⌃' },
    shift: { label: 'Shift', visible: '⇧' },
    escape: { label: 'Escape', visible: 'Esc' },
    delete: { label: 'Delete', visible: 'Del' },
    return: { label: 'Return', visible: '↩' },
    tab: { label: 'Tab', visible: 'Tab' },
    'arrow-up': { label: 'Up Arrow', visible: '↑' },
    'arrow-down': { label: 'Down Arrow', visible: '↓' },
    'arrow-left': { label: 'Left Arrow', visible: '←' },
    'arrow-right': { label: 'Right Arrow', visible: '→' },
  };

const isSpecialSymbol = (value: KbdValue): value is KbdSpecialSymbol =>
  value in symbolMap;

/**
 * Displays a keyboard shortcut as a group of native `kbd` elements.
 *
 * Known symbols receive readable tooltip labels: ⌘ command, ⌥ option,
 * ⌃ control, ⇪ shift, ⎋ escape, ⌫ delete, ↩ return, ⇥ tab, and the four arrow
 * symbols. `Kbd` describes a shortcut; it is not an interactive control.
 *
 * @example
 * ```tsx
 * <Kbd keys={['⌘', 'K']} />
 * ```
 */
export const Kbd = (props: KbdProps) => {
  const { keys, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const tooltipLabel = keys
    .map((key) => (isSpecialSymbol(key) ? symbolMap[key].label : key))
    .join(' + ');
  const defaultClasses = kbd({});
  const symbolClasses = kbd({ variant: 'symbol' });

  return (
    <Tooltip text={tooltipLabel}>
      <Box
        {...dsComponent('Kbd')}
        as="span"
        className={cx(defaultClasses.kbdGroup, className)}
        {...otherProps}
      >
        {keys.map((key, index) => (
          <Box
            // biome-ignore lint/suspicious/noArrayIndexKey: keys are a static ordered list and may repeat
            key={`${key}-${index}`}
            as="kbd"
            className={
              isSpecialSymbol(key) ? symbolClasses.key : defaultClasses.key
            }
            aria-label={isSpecialSymbol(key) ? symbolMap[key].label : key}
          >
            {isSpecialSymbol(key) ? symbolMap[key].visible : key}
          </Box>
        ))}
      </Box>
    </Tooltip>
  );
};
