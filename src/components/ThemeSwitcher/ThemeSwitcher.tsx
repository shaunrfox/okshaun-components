import { cx } from '@styled-system/css';
import { themeSwitcher } from '@styled-system/recipes';
import { Box, type BoxProps } from '~/components/Box';
import { useTheme } from '~/system/context';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

export type ThemeSwitcherProps = BoxProps;

/**
 * Renders an icon-only control that toggles the nearest theme provider between
 * light and dark themes.
 *
 * It obtains state from `useTheme`, so it must be rendered below the design
 * system's theme provider. The accessible label always describes the theme that
 * will be selected next.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const [className, otherProps] = splitProps(props);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box
      {...dsComponent('ThemeSwitcher')}
      as="button"
      className={cx(themeSwitcher(), className)}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      {...otherProps}
    />
  );
};
