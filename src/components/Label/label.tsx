import { css } from '@styled-system/css';
import { Text, TextProps } from '../Text';

interface LabelProps extends TextProps {
  children: React.ReactNode;
  htmlFor?: string;
}

const labelStyles = css({
  fontSize: '14',
  fontWeight: 'normal',
  lineHeight: 'normal',
  cursor: 'default',
});

export const Label = ({ children, htmlFor, ...props }: LabelProps) => {
  return (
    <Text as="label" htmlFor={htmlFor} className={labelStyles} {...props}>
      {children}
    </Text>
  );
};
