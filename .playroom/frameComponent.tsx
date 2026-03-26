import { type ReactNode, useEffect, useLayoutEffect } from 'react';

import { Box, type BoxProps } from '../src/components/Box';
import { IconProvider } from '../src/components/Icon';
import { ThemeProvider, useTheme } from '../src/system/context';

type PlayroomTheme = {
  name?: string;
};

type FrameComponentProps = {
  children?: ReactNode;
  themeName?: string | null;
  theme?: PlayroomTheme | string;
};

function getPlayroomSpritePath() {
  if (typeof window === 'undefined') {
    return '/sprite.svg';
  }

  const marker = '/playroom/';
  const pathname = window.location.pathname;
  const markerIndex = pathname.indexOf(marker);

  if (markerIndex === -1) {
    return '/sprite.svg';
  }

  const afterPlayroomPath = pathname.slice(markerIndex + marker.length);
  const hasFileName =
    afterPlayroomPath.includes('.') && !afterPlayroomPath.endsWith('/');
  const playroomBase = hasFileName
    ? pathname.slice(0, pathname.lastIndexOf('/') + 1)
    : pathname.slice(0, markerIndex + marker.length);

  return `${playroomBase}sprite.svg`;
}

function getPlayroomAssetPath(fileName: string) {
  if (typeof window === 'undefined') {
    return `/${fileName}`;
  }

  const marker = '/playroom/';
  const pathname = window.location.pathname;
  const markerIndex = pathname.indexOf(marker);

  if (markerIndex === -1) {
    return `/${fileName}`;
  }

  const afterPlayroomPath = pathname.slice(markerIndex + marker.length);
  const hasFileName =
    afterPlayroomPath.includes('.') && !afterPlayroomPath.endsWith('/');
  const playroomBase = hasFileName
    ? pathname.slice(0, pathname.lastIndexOf('/') + 1)
    : pathname.slice(0, markerIndex + marker.length);

  return `${playroomBase}${fileName}`;
}

const THEME_STORAGE_KEY = 'cetec-theme-preference';

// Force iframe-level default to light (no system preference fallback)
if (typeof window !== 'undefined') {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (!storedTheme) {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
  }
}

function ThemeBridge({ themeName }: { themeName: 'light' | 'dark' }) {
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    if (theme !== themeName) {
      setTheme(themeName);
    }
  }, [theme, themeName, setTheme]);

  return null;
}

export default function FrameComponent({
  children,
  themeName,
  theme = 'light',
}: FrameComponentProps) {
  const resolvedThemeName =
    themeName && themeName !== '__PLAYROOM__NO_THEME__'
      ? themeName
      : typeof theme === 'string'
        ? theme.toLowerCase()
        : (theme?.name?.toLowerCase() ?? 'light');

  const colorMode = resolvedThemeName === 'dark' ? 'dark' : 'light';

  const frameBodyStyles: BoxProps = {
    display: 'flex',
    flexDir: 'column',
    gap: '16',
    h: 'full',
    w: 'full',
    bg: 'surface',
    p: '24',
  };

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, colorMode);
    document.documentElement.setAttribute('data-color-mode', colorMode);

    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.background = 'surface';

    return () => {
      document.documentElement.removeAttribute('data-color-mode');
    };
  }, [colorMode]);

  return (
    <>
      <link
        rel="stylesheet"
        href={getPlayroomAssetPath('playroom-fonts.css')}
        type="text/css"
      />
      <link
        rel="stylesheet"
        href={getPlayroomAssetPath('playroom-static.css')}
        type="text/css"
      />
      <ThemeProvider>
        <IconProvider spritePath={getPlayroomSpritePath()}>
          <ThemeBridge themeName={colorMode} />
          <Box {...frameBodyStyles}>{children}</Box>
        </IconProvider>
      </ThemeProvider>
    </>
  );
}
