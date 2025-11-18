import type { ThemeIconProps } from '../types/component-props';
import { LightThemeIcon, DarkThemeIcon, AutoThemeIcon } from './Icons';

export function ThemeIcon({ theme, className }: ThemeIconProps) {
  if (theme === 'light') {
    return <LightThemeIcon {...(className && { className })} />;
  }

  if (theme === 'dark') {
    return <DarkThemeIcon {...(className && { className })} />;
  }

  // auto theme
  return <AutoThemeIcon {...(className && { className })} />;
}
