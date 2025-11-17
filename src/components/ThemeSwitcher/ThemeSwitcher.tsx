import { useTheme } from '~/contexts/ThemeContext';
import { themeSwitchStyles } from './themeSwitcherStyles';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={themeSwitchStyles}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span></span>
    </button>
  );
}
