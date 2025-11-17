import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
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
  type TypographyVariant,
  type TypographyColor,
  type TypographyAlign,
  type CardVariant,
  type BorderWidthSize,

  // Interfaces
  type ThemeColors,
  type BaseComponentProps,
  type SizedComponentProps,
  type ThemedComponentProps,
  type ButtonProps,
  type CardProps,
  type GridComponentProps,
  type TypographyProps,

  // Validation functions
  isSpacingSize,
  isFontSize,
  isBorderRadiusSize,
  isBorderWidthSize,
  isComponentSize,
  isTheme,
  isButtonVariant,
  isCardVariant,
  isSemanticState,
  isShadowVariant,
  isTypographyVariant,
  isTypographyColor,
  isTypographyAlign,
  isValidThemeColors,
  isValidBaseComponentProps,
  isValidButtonProps,
  isValidSizedComponentProps,
  isValidThemedComponentProps,
  isValidGridComponentProps,
  isValidCardProps,
  isValidTypographyProps,

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
      const borderWidth: BorderWidthSize = 'thin';
      const component: ComponentSize = 'lg';
      const breakpoint: Breakpoint = 'tablet';
      const theme: Theme = 'dark';
      const variant: ButtonVariant = 'primary';
      const cardVariant: CardVariant = 'elevated';
      const state: SemanticState = 'success';
      const shadow: ShadowVariant = 'medium';
      const typography: TypographyVariant = 'h1';
      const color: TypographyColor = 'primary';
      const align: TypographyAlign = 'center';

      expect(spacing).toBe('md');
      expect(font).toBe('base');
      expect(border).toBe('sm');
      expect(borderWidth).toBe('thin');
      expect(component).toBe('lg');
      expect(breakpoint).toBe('tablet');
      expect(theme).toBe('dark');
      expect(variant).toBe('primary');
      expect(cardVariant).toBe('elevated');
      expect(state).toBe('success');
      expect(shadow).toBe('medium');
      expect(typography).toBe('h1');
      expect(color).toBe('primary');
      expect(align).toBe('center');
    });
  });

  describe('Type validation functions', () => {
    it('should validate SpacingSize', () => {
      expect(isSpacingSize('md')).toBe(true);
      expect(isSpacingSize('invalid')).toBe(false);
    });

    it('should validate FontSize', () => {
      expect(isFontSize('base')).toBe(true);
      expect(isFontSize('invalid')).toBe(false);
    });

    it('should validate BorderRadiusSize', () => {
      expect(isBorderRadiusSize('sm')).toBe(true);
      expect(isBorderRadiusSize('invalid')).toBe(false);
    });

    it('should validate BorderWidthSize', () => {
      expect(isBorderWidthSize('thin')).toBe(true);
      expect(isBorderWidthSize('invalid')).toBe(false);
    });

    it('should validate ComponentSize', () => {
      expect(isComponentSize('lg')).toBe(true);
      expect(isComponentSize('invalid')).toBe(false);
    });

    it('should validate Theme', () => {
      expect(isTheme('dark')).toBe(true);
      expect(isTheme('invalid')).toBe(false);
    });

    it('should validate ButtonVariant', () => {
      expect(isButtonVariant('primary')).toBe(true);
      expect(isButtonVariant('invalid')).toBe(false);
    });

    it('should validate CardVariant', () => {
      expect(isCardVariant('elevated')).toBe(true);
      expect(isCardVariant('invalid')).toBe(false);
    });

    it('should validate SemanticState', () => {
      expect(isSemanticState('success')).toBe(true);
      expect(isSemanticState('invalid')).toBe(false);
    });

    it('should validate ShadowVariant', () => {
      expect(isShadowVariant('medium')).toBe(true);
      expect(isShadowVariant('invalid')).toBe(false);
    });

    it('should validate TypographyVariant', () => {
      expect(isTypographyVariant('h1')).toBe(true);
      expect(isTypographyVariant('invalid')).toBe(false);
    });

    it('should validate TypographyColor', () => {
      expect(isTypographyColor('primary')).toBe(true);
      expect(isTypographyColor('invalid')).toBe(false);
    });

    it('should validate TypographyAlign', () => {
      expect(isTypographyAlign('center')).toBe(true);
      expect(isTypographyAlign('invalid')).toBe(false);
    });
  });

  describe('Interface validation functions', () => {
    it('should validate ThemeColors interface', () => {
      expect(isValidThemeColors(LIGHT_THEME_COLORS)).toBe(true);
      expect(isValidThemeColors(DARK_THEME_COLORS)).toBe(true);
      expect(isValidThemeColors({})).toBe(false);
    });

    it('should validate BaseComponentProps', () => {
      expect(isValidBaseComponentProps({ className: 'test' })).toBe(true);
      expect(isValidBaseComponentProps({ 'data-theme': 'dark' })).toBe(true);
      expect(isValidBaseComponentProps({ className: 123 })).toBe(false);
    });

    it('should validate BaseComponentProps with invalid values', () => {
      expect(isValidBaseComponentProps({ className: 123 })).toBe(false);
      expect(isValidBaseComponentProps({ id: 456 })).toBe(false);
      expect(isValidBaseComponentProps({ 'data-testid': 789 })).toBe(false);
      expect(isValidBaseComponentProps({ 'data-theme': 'invalid' })).toBe(
        false
      );
    });

    it('should return false for non-object BaseComponentProps', () => {
      expect(isValidBaseComponentProps(null)).toBe(false);
      expect(isValidBaseComponentProps('string')).toBe(false);
      expect(isValidBaseComponentProps(123)).toBe(false);
      expect(isValidBaseComponentProps(undefined)).toBe(false);
      expect(isValidBaseComponentProps([])).toBe(true); // Array is object
      expect(isValidBaseComponentProps({})).toBe(true); // Empty object is valid
    });

    it('should validate BaseComponentProps with all optional properties undefined', () => {
      expect(
        isValidBaseComponentProps({
          className: undefined,
          id: undefined,
          'data-testid': undefined,
          'data-theme': undefined,
        })
      ).toBe(true);
    });

    it('should validate ButtonProps with all optional properties undefined', () => {
      expect(
        isValidButtonProps({
          children: 'Test', // required
          size: undefined,
          theme: undefined,
          variant: undefined,
          semanticState: undefined,
          shadow: undefined,
          borderRadius: undefined,
          borderWidth: undefined,
          disabled: undefined,
          onClick: undefined,
        })
      ).toBe(true);
    });

    it('should validate ButtonProps with invalid values', () => {
      expect(isValidButtonProps({ size: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ theme: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ variant: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ semanticState: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ shadow: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ borderRadius: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ borderWidth: 'invalid' })).toBe(false);
      expect(isValidButtonProps({ disabled: 'not-boolean' })).toBe(false);
      expect(isValidButtonProps({ onClick: 'not-function' })).toBe(false);
      expect(isValidButtonProps({ children: 123 })).toBe(false);
      expect(isValidButtonProps({ className: 456 })).toBe(false);
      // Test case where base props are valid but button-specific className check is triggered
      expect(
        isValidButtonProps({
          className: 123, // This should trigger the button-specific className check
          size: 'md',
          theme: 'light',
          variant: 'primary',
          disabled: false,
          onClick: () => {},
          children: 'Test',
        })
      ).toBe(false);
    });

    it('should validate ButtonProps with invalid children types', () => {
      expect(isValidButtonProps({ children: {} })).toBe(false); // Object is invalid
      expect(isValidButtonProps({ children: null })).toBe(false); // null is invalid
      expect(isValidButtonProps({ children: undefined })).toBe(true); // undefined is valid (optional)
      expect(isValidButtonProps({ children: 'string' })).toBe(true); // string is valid
      expect(isValidButtonProps({ children: ['array'] })).toBe(true); // array is valid
    });

    it('should validate ButtonProps with valid values', () => {
      expect(
        isValidButtonProps({
          size: 'md',
          theme: 'light',
          variant: 'primary',
          disabled: false,
          onClick: () => {},
          children: 'Test',
        })
      ).toBe(true);
      expect(
        isValidButtonProps({
          className: 'custom-class',
          id: 'test-id',
          'data-testid': 'test-data',
          size: 'lg',
          theme: 'dark',
          variant: 'secondary',
          semanticState: 'success',
          shadow: 'light',
          borderRadius: 'md',
          borderWidth: 'thin',
          disabled: true,
          onClick: () => {},
          children: ['Test', 'Array'],
        })
      ).toBe(true);
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
          xs: '0.25rem',
          sm: '0.375rem',
          md: '0.5rem',
          lg: '0.75rem',
          xl: '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
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
          none: '0',
          sm: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
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
      const baseProps: BaseComponentProps = {
        className: 'test-class',
        id: 'test-id',
        'data-testid': 'test-component',
        'data-theme': 'dark',
      };

      const sizedProps: SizedComponentProps = {
        ...baseProps,
        size: 'md',
      };

      const themedProps: ThemedComponentProps = {
        ...baseProps,
        theme: 'dark',
      };

      const buttonProps: ButtonProps = {
        className: 'custom-button',
        id: 'button-id',
        'data-testid': 'button-test',
        'data-theme': 'light',
        size: 'lg',
        theme: 'light',
        variant: 'primary',
        semanticState: 'success',
        shadow: 'medium',
        borderRadius: 'sm',
        borderWidth: 'thin',
        disabled: false,
        onClick: () => {},
        children: 'Test Button',
      };

      const cardProps: CardProps = {
        className: 'custom-card',
        id: 'card-id',
        'data-testid': 'card-test',
        'data-theme': 'auto',
        size: 'md',
        theme: 'auto',
        variant: 'elevated',
        semanticState: 'info',
        shadow: 'light',
        borderRadius: 'md',
        borderWidth: 'medium',
        title: 'Test Card',
        headerLevel: 2,
        as: 'section',
        style: { margin: '10px' },
        children: 'Card content',
      };

      const gridProps: GridComponentProps = {
        mode: 'flex',
        direction: 'row',
        justify: 'center',
        align: 'stretch',
        gap: 'lg',
        wrap: true,
        as: 'div',
        className: 'custom-grid',
        children: 'Grid content',
      };

      const typographyProps: TypographyProps = {
        variant: 'h1',
        color: 'primary',
        align: 'center',
        gutterBottom: true,
        noWrap: false,
        style: { fontWeight: 'bold' },
        children: 'Typography content',
        className: 'custom-typography',
      };

      expect(baseProps.className).toBe('test-class');
      expect(baseProps.id).toBe('test-id');
      expect(baseProps['data-testid']).toBe('test-component');
      expect(baseProps['data-theme']).toBe('dark');

      expect(sizedProps.size).toBe('md');
      expect(themedProps.theme).toBe('dark');

      expect(buttonProps.variant).toBe('primary');
      expect(buttonProps.disabled).toBe(false);
      expect(buttonProps.children).toBe('Test Button');
      expect(buttonProps.className).toBe('custom-button');

      expect(cardProps.variant).toBe('elevated');
      expect(cardProps.title).toBe('Test Card');
      expect(cardProps.headerLevel).toBe(2);
      expect(cardProps.as).toBe('section');
      expect(cardProps.style).toEqual({ margin: '10px' });
      expect(cardProps.children).toBe('Card content');
      expect(cardProps.className).toBe('custom-card');

      expect(gridProps.mode).toBe('flex');
      expect(gridProps.direction).toBe('row');
      expect(gridProps.justify).toBe('center');
      expect(gridProps.align).toBe('stretch');
      expect(gridProps.gap).toBe('lg');
      expect(gridProps.wrap).toBe(true);
      expect(gridProps.as).toBe('div');
      expect(gridProps.className).toBe('custom-grid');
      expect(gridProps.children).toBe('Grid content');

      expect(typographyProps.variant).toBe('h1');
      expect(typographyProps.color).toBe('primary');
      expect(typographyProps.align).toBe('center');
      expect(typographyProps.gutterBottom).toBe(true);
      expect(typographyProps.noWrap).toBe(false);
      expect(typographyProps.style).toEqual({ fontWeight: 'bold' });
      expect(typographyProps.children).toBe('Typography content');
      expect(typographyProps.className).toBe('custom-typography');
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

  describe('Additional Component Props Validation', () => {
    it('should validate SizedComponentProps', () => {
      expect(isValidSizedComponentProps({ size: 'md' })).toBe(true);
      expect(isValidSizedComponentProps({ size: 'invalid' })).toBe(false);
      expect(isValidSizedComponentProps({ className: 'test' })).toBe(true);
      expect(isValidSizedComponentProps({ className: 123 })).toBe(false);
    });

    it('should validate ThemedComponentProps', () => {
      expect(isValidThemedComponentProps({ theme: 'dark' })).toBe(true);
      expect(isValidThemedComponentProps({ theme: 'invalid' })).toBe(false);
      expect(isValidThemedComponentProps({ className: 'test' })).toBe(true);
      expect(isValidThemedComponentProps({ 'data-theme': 'invalid' })).toBe(
        false
      );
    });

    it('should validate GridComponentProps', () => {
      expect(
        isValidGridComponentProps({
          mode: 'flex',
          direction: 'row',
          justify: 'center',
          align: 'stretch',
          gap: 'lg',
          wrap: true,
          as: 'div',
          className: 'test',
          children: 'content',
        })
      ).toBe(true);
      expect(isValidGridComponentProps({ mode: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ direction: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ justify: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ align: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ gap: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ wrap: 'not-boolean' })).toBe(false);
      expect(isValidGridComponentProps({ gridTemplateColumns: 123 })).toBe(
        false
      );
      expect(isValidGridComponentProps({ gridTemplateRows: 123 })).toBe(false);
      expect(isValidGridComponentProps({ gridAutoFlow: 'invalid' })).toBe(
        false
      );
      expect(isValidGridComponentProps({ as: 'invalid' })).toBe(false);
      expect(isValidGridComponentProps({ className: 123 })).toBe(false);
      expect(isValidGridComponentProps({ children: {} })).toBe(false);
    });

    it('should validate GridComponentProps with optional properties defined', () => {
      expect(
        isValidGridComponentProps({
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto',
          gridAutoFlow: 'row',
          children: 'content',
        })
      ).toBe(true);
    });

    it('should validate CardProps', () => {
      expect(
        isValidCardProps({
          size: 'md',
          theme: 'light',
          variant: 'elevated',
          semanticState: 'success',
          shadow: 'medium',
          borderRadius: 'sm',
          borderWidth: 'thin',
          title: 'Test Card',
          headerLevel: 2,
          as: 'section',
          style: { margin: '10px' },
          children: 'content',
        })
      ).toBe(true);
      expect(isValidCardProps({ size: 'invalid' })).toBe(false);
      expect(isValidCardProps({ theme: 'invalid' })).toBe(false);
      expect(isValidCardProps({ variant: 'invalid' })).toBe(false);
      expect(isValidCardProps({ semanticState: 'invalid' })).toBe(false);
      expect(isValidCardProps({ shadow: 'invalid' })).toBe(false);
      expect(isValidCardProps({ borderRadius: 'invalid' })).toBe(false);
      expect(isValidCardProps({ borderWidth: 'invalid' })).toBe(false);
      expect(isValidCardProps({ title: 123 })).toBe(false);
      expect(isValidCardProps({ headerLevel: 'not-number' })).toBe(false);
      expect(isValidCardProps({ headerLevel: 7 })).toBe(false);
      expect(isValidCardProps({ as: 'invalid' })).toBe(false);
      expect(isValidCardProps({ style: 'not-object' })).toBe(false);
      expect(isValidCardProps({ children: {} })).toBe(false);
    });

    it('should validate CardProps with optional properties defined', () => {
      expect(
        isValidCardProps({
          title: 'Title',
          headerLevel: 1,
          style: {},
          children: 'content',
        })
      ).toBe(true);
    });

    it('should validate TypographyProps', () => {
      expect(
        isValidTypographyProps({
          variant: 'h1',
          color: 'primary',
          align: 'center',
          gutterBottom: true,
          noWrap: false,
          style: { fontWeight: 'bold' },
          children: 'content',
        })
      ).toBe(true);
      expect(isValidTypographyProps({ variant: 'invalid' })).toBe(false);
      expect(isValidTypographyProps({ color: 'invalid' })).toBe(false);
      expect(isValidTypographyProps({ align: 'invalid' })).toBe(false);
      expect(isValidTypographyProps({ gutterBottom: 'not-boolean' })).toBe(
        false
      );
      expect(isValidTypographyProps({ noWrap: 'not-boolean' })).toBe(false);
      expect(isValidTypographyProps({ style: 'not-object' })).toBe(false);
      expect(isValidTypographyProps({ children: {} })).toBe(false);
    });

    it('should validate TypographyProps with optional properties defined', () => {
      expect(
        isValidTypographyProps({
          gutterBottom: true,
          noWrap: true,
          style: {},
          children: 'content',
        })
      ).toBe(true);
    });

    it('should validate TypographyProps with optional properties defined', () => {
      expect(
        isValidTypographyProps({
          gutterBottom: true,
          noWrap: true,
          style: {},
          children: 'content',
        })
      ).toBe(true);
    });
  });
});
