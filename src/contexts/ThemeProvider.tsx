import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

const THEME_STORAGE_KEY = 'okshaun-theme-preference';

function getInitialTheme(): Theme {
  // Check for stored preference
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme) {
    return storedTheme;
  }

  // Check for system preference
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  // Default to light
  return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  // Update theme in both DOM and localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  // Apply theme to DOM
  useEffect(() => {
    // Remove any existing theme
    document.documentElement.removeAttribute('data-color-mode');
    document.documentElement.removeAttribute('data-theme');

    document.documentElement.setAttribute('data-color-mode', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      // Only update if user hasn't explicitly set a preference
      if (!storedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}