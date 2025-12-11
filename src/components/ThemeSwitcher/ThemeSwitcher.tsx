import { useTheme } from '~/contexts/ThemeContext';
import { themeSwitcher } from '@styled-system/recipes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={themeSwitcher()}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span>0</span>
    </button>
  );
}
