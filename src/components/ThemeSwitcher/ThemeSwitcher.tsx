import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import { useTheme } from '~/contexts/ThemeContext';
import { themeSwitcher } from '@styled-system/recipes';

export type ThemeSwitcherProps = BoxProps;

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const [className, otherProps] = splitProps(props);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box
      as="button"
      className={cx(themeSwitcher(), className)}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      {...otherProps}
    />
  );
};
