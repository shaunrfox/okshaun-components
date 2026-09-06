import { cx } from '@styled-system/css';
import { kbd } from '@styled-system/recipes';

import { Box, type BoxProps } from '~/components/Box';
import { Tooltip } from '~/components/Tooltip';
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

export type KbdProps = Omit<BoxProps, 'children'> & {
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

export const Kbd = (props: KbdProps) => {
  const { keys, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const tooltipLabel = keys
    .map((key) => (isSpecialSymbol(key) ? symbolMap[key].label : key))
    .join(' + ');
  const containerClasses = kbd().container;
  const regularKeyClasses = kbd().key;
  const symbolKeyClasses = kbd({ symbol: true }).key;

  return (
    <Tooltip text={tooltipLabel}>
      <Box
        as="span"
        className={cx(containerClasses, className)}
        {...otherProps}
      >
        {keys.map((key, index) => (
          <Box
            // biome-ignore lint/suspicious/noArrayIndexKey: keys are a static ordered list and may repeat
            key={`${key}-${index}`}
            as="kbd"
            className={
              isSpecialSymbol(key) ? symbolKeyClasses : regularKeyClasses
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
