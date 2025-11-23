import { Tag } from '~/components/Tag';
import { useMediaQuery } from '~/hooks';

export default function BreakpointIndicator() {
  // breakpoint labels: [base, xs, sm, md, lg, xl, 2xl]
  // Call all hooks at the top level (React rules)
  const isXs = useMediaQuery('xs');
  const isSm = useMediaQuery('sm');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  const isXl = useMediaQuery('xl');
  const is2Xl = useMediaQuery('2xl');

  // Find the largest matching breakpoint
  let breakpoint = (
    <Tag hue="red" appearance="bold">
      @media/base
    </Tag>
  );
  if (is2Xl) {
    breakpoint = (
      <Tag hue="blue" appearance="bold">
        @media/2xl
      </Tag>
    );
  } else if (isXl) {
    breakpoint = (
      <Tag hue="teal" appearance="bold">
        @media/xl
      </Tag>
    );
  } else if (isLg) {
    breakpoint = (
      <Tag hue="green" appearance="bold">
        @media/lg
      </Tag>
    );
  } else if (isMd) {
    breakpoint = (
      <Tag hue="lime" appearance="bold">
        @media/md
      </Tag>
    );
  } else if (isSm) {
    breakpoint = (
      <Tag hue="yellow" appearance="bold">
        @media/sm
      </Tag>
    );
  } else if (isXs) {
    breakpoint = (
      <Tag hue="orange" appearance="bold">
        @media/xs
      </Tag>
    );
  }

  return breakpoint;
}
