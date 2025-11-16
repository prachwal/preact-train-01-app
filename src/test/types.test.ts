import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  // Types
  // Types
  type SpacingSize,
  type FontSize,
  type BorderRadiusSize,
  type ComponentSize,
  type Breakpoint,
  type Theme,
  type ButtonVariant,
  type SemanticState,
  type ShadowVariant,

  // Interfaces
  // Interfaces
  type ThemeColors,

  // Constants
  SPACING_VALUES,
  FONT_SIZE_VALUES,
  BORDER_RADIUS_VALUES,
  BREAKPOINT_VALUES,
  BREAKPOINT_NUMBERS,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
  THEME_COLORS,

  // Helper functions
  getCSSVariable,
  getCSSVariableWithFallback,
  buildClassName,
  isDarkTheme,
  remToPx,
  pxToRem,
  getThemeColor,
  isBreakpoint,

  // Backwards compatibility
  // Backwards compatibility
  type Size,
  type Themes,
} from '../types';

describe('Types', () => {
  describe('Type definitions', () => {
    it('should export all type definitions', () => {
      // These are type-only exports, so we test by using them
      const spacing: SpacingSize = 'md';
      const font: FontSize = 'base';
      const border: BorderRadiusSize = 'sm';
      const component: ComponentSize = 'lg';
      const breakpoint: Breakpoint = 'tablet';
      const theme: Theme = 'dark';
      const variant: ButtonVariant = 'primary';
      const state: SemanticState = 'success';
      const shadow: ShadowVariant = 'medium';

      expect(spacing).toBe('md');
      expect(font).toBe('base');
      expect(border).toBe('sm');
      expect(component).toBe('lg');
      expect(breakpoint).toBe('tablet');
      expect(theme).toBe('dark');
      expect(variant).toBe('primary');
      expect(state).toBe('success');
      expect(shadow).toBe('medium');
    });
  });

  describe('ThemeColors interface', () => {
    it('should have all required properties in LIGHT_THEME_COLORS', () => {
      const requiredKeys: (keyof ThemeColors)[] = [
        'bg',
        'bgSecondary',
        'surface',
        'surfaceHover',
        'text',
        'textSecondary',
        'textTertiary',
        'textDisabled',
        'textMuted',
        'textInverted',
        'border',
        'borderLight',
        'borderMedium',
        'borderHover',
        'borderFocus',
        'accent',
        'accentHover',
        'accentActive',
        'accentLight',
        'success',
        'successHover',
        'successLight',
        'error',
        'errorHover',
        'errorLight',
        'warning',
        'warningHover',
        'warningLight',
        'info',
        'infoHover',
        'infoLight',
        'buttonPrimaryBg',
        'buttonPrimaryText',
        'buttonPrimaryHover',
        'buttonSecondaryBg',
        'buttonSecondaryText',
        'buttonSecondaryHover',
        'buttonSuccessBg',
        'buttonSuccessText',
        'buttonSuccessHover',
        'buttonDangerBg',
        'buttonDangerText',
        'buttonDangerHover',
        'buttonDisabledBg',
        'buttonDisabledText',
        'link',
        'linkHover',
        'linkVisited',
        'linkActive',
        'shadow',
        'shadowMedium',
        'shadowHeavy',
        'overlay',
        'focus',
        'focusRing',
      ];

      requiredKeys.forEach(key => {
        expect(LIGHT_THEME_COLORS).toHaveProperty(key);
        expect(typeof LIGHT_THEME_COLORS[key]).toBe('string');
      });
    });

    it('should have all required properties in DARK_THEME_COLORS', () => {
      const requiredKeys: (keyof ThemeColors)[] = [
        'bg',
        'bgSecondary',
        'surface',
        'surfaceHover',
        'text',
        'textSecondary',
        'textTertiary',
        'textDisabled',
        'textMuted',
        'textInverted',
        'border',
        'borderLight',
        'borderMedium',
        'borderHover',
        'borderFocus',
        'accent',
        'accentHover',
        'accentActive',
        'accentLight',
        'success',
        'successHover',
        'successLight',
        'error',
        'errorHover',
        'errorLight',
        'warning',
        'warningHover',
        'warningLight',
        'info',
        'infoHover',
        'infoLight',
        'buttonPrimaryBg',
        'buttonPrimaryText',
        'buttonPrimaryHover',
        'buttonSecondaryBg',
        'buttonSecondaryText',
        'buttonSecondaryHover',
        'buttonSuccessBg',
        'buttonSuccessText',
        'buttonSuccessHover',
        'buttonDangerBg',
        'buttonDangerText',
        'buttonDangerHover',
        'buttonDisabledBg',
        'buttonDisabledText',
        'link',
        'linkHover',
        'linkVisited',
        'linkActive',
        'shadow',
        'shadowMedium',
        'shadowHeavy',
        'overlay',
        'focus',
        'focusRing',
      ];

      requiredKeys.forEach(key => {
        expect(DARK_THEME_COLORS).toHaveProperty(key);
        expect(typeof DARK_THEME_COLORS[key]).toBe('string');
      });
    });
  });

  describe('Constants', () => {
    describe('SPACING_VALUES', () => {
      it('should have all spacing sizes', () => {
        expect(SPACING_VALUES).toEqual({
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem',
        });
      });
    });

    describe('FONT_SIZE_VALUES', () => {
      it('should have all font sizes', () => {
        expect(FONT_SIZE_VALUES).toEqual({
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        });
      });
    });

    describe('BORDER_RADIUS_VALUES', () => {
      it('should have all border radius sizes', () => {
        expect(BORDER_RADIUS_VALUES).toEqual({
          sm: '0.3125rem',
          md: '0.5rem',
          lg: '0.75rem',
          xl: '1rem',
        });
      });
    });

    describe('BREAKPOINT_VALUES', () => {
      it('should have all breakpoint values', () => {
        expect(BREAKPOINT_VALUES).toEqual({
          mobile: '0px',
          tablet: '768px',
          desktop: '1024px',
          large: '1440px',
        });
      });
    });

    describe('BREAKPOINT_NUMBERS', () => {
      it('should have all breakpoint numbers', () => {
        expect(BREAKPOINT_NUMBERS).toEqual({
          mobile: 0,
          tablet: 768,
          desktop: 1024,
          large: 1440,
        });
      });
    });

    describe('THEME_COLORS', () => {
      it('should have light and dark themes', () => {
        expect(THEME_COLORS).toHaveProperty('light');
        expect(THEME_COLORS).toHaveProperty('dark');
        expect(THEME_COLORS.light).toBe(LIGHT_THEME_COLORS);
        expect(THEME_COLORS.dark).toBe(DARK_THEME_COLORS);
      });
    });
  });

  describe('Helper functions', () => {
    describe('getCSSVariable', () => {
      it('should return CSS custom property syntax', () => {
        expect(getCSSVariable('spacing-xs')).toBe('var(--spacing-xs)');
        expect(getCSSVariable('color-primary')).toBe('var(--color-primary)');
      });
    });

    describe('getCSSVariableWithFallback', () => {
      it('should return CSS custom property with fallback', () => {
        expect(getCSSVariableWithFallback('spacing-xs', '0.5rem')).toBe(
          'var(--spacing-xs, 0.5rem)'
        );
      });
    });

    describe('buildClassName', () => {
      it('should return base class when no modifiers', () => {
        expect(buildClassName('pta-button')).toBe('pta-button');
      });

      it('should add boolean modifiers', () => {
        expect(
          buildClassName('pta-button', { primary: true, large: true })
        ).toBe('pta-button pta-button--primary pta-button--large');
      });

      it('should add string modifiers', () => {
        expect(
          buildClassName('pta-button', { variant: 'primary', size: 'lg' })
        ).toBe('pta-button pta-button--primary pta-button--lg');
      });

      it('should ignore falsy modifiers', () => {
        expect(
          buildClassName('pta-button', {
            primary: false,
            large: undefined,
            size: '',
          })
        ).toBe('pta-button');
      });

      it('should handle mixed modifiers', () => {
        expect(
          buildClassName('pta-button', {
            primary: true,
            variant: 'secondary',
            disabled: false,
            size: 'md',
          })
        ).toBe(
          'pta-button pta-button--primary pta-button--secondary pta-button--md'
        );
      });
    });

    describe('isDarkTheme', () => {
      it('should return true for dark theme', () => {
        expect(isDarkTheme('dark')).toBe(true);
      });

      it('should return false for light theme', () => {
        expect(isDarkTheme('light')).toBe(false);
      });

      it('should check system preference for auto theme', () => {
        // Mock window.matchMedia
        const mockMatchMedia = vi.fn().mockReturnValue({ matches: true });
        global.window = { matchMedia: mockMatchMedia } as any;

        expect(isDarkTheme('auto')).toBe(true);
        expect(mockMatchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: dark)'
        );

        mockMatchMedia.mockReturnValue({ matches: false });
        expect(isDarkTheme('auto')).toBe(false);
      });

      it('should return false when window is undefined', () => {
        global.window = undefined as any;
        expect(isDarkTheme('auto')).toBe(false);
      });
    });

    describe('remToPx', () => {
      it('should convert rem to px', () => {
        expect(remToPx(1)).toBe(16);
        expect(remToPx('2rem')).toBe(32);
        expect(remToPx('0.5')).toBe(8);
      });
    });

    describe('pxToRem', () => {
      it('should convert px to rem', () => {
        expect(pxToRem(16)).toBe('1rem');
        expect(pxToRem(32)).toBe('2rem');
        expect(pxToRem(8)).toBe('0.5rem');
      });
    });

    describe('getThemeColor', () => {
      it('should return color from light theme', () => {
        expect(getThemeColor('light', 'bg')).toBe('#ffffff');
        expect(getThemeColor('light', 'accent')).toBe('#6200ee');
      });

      it('should return color from dark theme', () => {
        expect(getThemeColor('dark', 'bg')).toBe('#121212');
        expect(getThemeColor('dark', 'accent')).toBe('#bb86fc');
      });
    });

    describe('isBreakpoint', () => {
      beforeEach(() => {
        global.window = { innerWidth: 1024 } as any;
      });

      it('should return true for matching breakpoint', () => {
        expect(isBreakpoint('desktop')).toBe(true);
        expect(isBreakpoint('tablet')).toBe(false);
      });

      it('should return false when window is undefined', () => {
        global.window = undefined as any;
        expect(isBreakpoint('desktop')).toBe(false);
      });

      it('should handle mobile breakpoint', () => {
        global.window = { innerWidth: 500 } as any;
        expect(isBreakpoint('mobile')).toBe(true);
      });

      it('should handle tablet breakpoint', () => {
        global.window = { innerWidth: 800 } as any;
        expect(isBreakpoint('tablet')).toBe(true);
      });

      it('should handle large breakpoint', () => {
        global.window = { innerWidth: 1500 } as any;
        expect(isBreakpoint('large')).toBe(true);
      });

      it('should return false for invalid breakpoint', () => {
        global.window = { innerWidth: 1024 } as any;
        expect(isBreakpoint('invalid' as any)).toBe(false);
      });
    });
  });

  describe('Component Props Interfaces', () => {
    it('should export component props interfaces', () => {
      // Type-only exports, test by using them
      const baseProps: { className?: string } = {};
      const sizedProps: { size?: ComponentSize } = { size: 'md' };
      const themedProps: { theme?: Theme } = { theme: 'dark' };
      const buttonProps: { variant?: ButtonVariant; disabled?: boolean } = {
        variant: 'primary',
        disabled: true,
      };

      expect(baseProps.className).toBeUndefined();
      expect(sizedProps.size).toBe('md');
      expect(themedProps.theme).toBe('dark');
      expect(buttonProps.variant).toBe('primary');
      expect(buttonProps.disabled).toBe(true);
    });
  });

  describe('Backwards Compatibility', () => {
    it('should export backwards compatible types', () => {
      const size: Size = 'sm';
      const themes: Themes = 'light';

      expect(size).toBe('sm');
      expect(themes).toBe('light');
    });
  });
});
