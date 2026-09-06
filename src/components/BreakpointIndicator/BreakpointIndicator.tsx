import { cx } from '@styled-system/css';
import { breakpointIndicator } from '@styled-system/recipes';
import type { BoxProps } from '~/components/Box';
import { Tag } from '~/components/Tag';
import { useMediaQuery } from '~/system/hooks';

export type BreakpointIndicatorProps = BoxProps;

export const BreakpointIndicator = (props: BreakpointIndicatorProps) => {
  const { className, ...rest } = props;
  // breakpoint labels: [base, xs, sm, md, lg, xl, 2xl]
  // Call all hooks at the top level (React rules)
  const isXs = useMediaQuery('xs');
  const isSm = useMediaQuery('sm');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  const isXl = useMediaQuery('xl');
  const is2Xl = useMediaQuery('2xl');

  let hue = 'red';
  let label = '@media/base';

  if (is2Xl) {
    hue = 'blue';
    label = '@media/2xl';
  } else if (isXl) {
    hue = 'teal';
    label = '@media/xl';
  } else if (isLg) {
    hue = 'green';
    label = '@media/lg';
  } else if (isMd) {
    hue = 'lime';
    label = '@media/md';
  } else if (isSm) {
    hue = 'yellow';
    label = '@media/sm';
  } else if (isXs) {
    hue = 'orange';
    label = '@media/xs';
  }

  return (
    <Tag
      className={cx(breakpointIndicator(), className)}
      hue={
        hue as 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'blue'
      }
      appearance="bold"
      {...rest}
    >
      {label}
    </Tag>
  );
};
