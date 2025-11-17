# SCSS Architecture Documentation

## Purpose

Ten dokument opisuje architekturę, funkcjonalność i wzorce używane w systemie SCSS projektu Preact Train App. Nie zawiera kodu, tylko opis struktury i zasad użycia.

---

## Struktura Plików

### `/src/styles/` - Globalne Style

#### `index.scss`

**Funkcjonalność**: Główny punkt wejścia dla wszystkich stylów  
**Odpowiedzialność**: Importuje w odpowiedniej kolejności: variables → mixins → base → themes → components  
**Użycie**: Importowany w `src/index.tsx`

#### `_variables.scss`

**Funkcjonalność**: Centralna definicja zmiennych SCSS  
**Zawiera**:

- Design tokens (spacing, colors, shadows, borders, typography)
- Breakpoints responsywne (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- Zmienne specyficzne dla komponentów (header, navigation)
- Font system (rodziny, rozmiary, wagi)

**Synchronizacja**: Musi być zsynchronizowany z `src/types/constants.ts`

#### `_mixins.scss`

**Funkcjonalność**: Reużywalne mixins dla responsywności, rozmiarów, wariantów  
**Zawiera**:

- **Media queries**: `respond-above()`, `respond-below()` - mobile-first approach
- **Responsive sizing**: `responsive-button-size()`, `responsive-card-size()` - adaptacyjne rozmiary
- **Semantic variants**: `semantic-border-variant()`, `semantic-bg-variant()` - kolory semantyczne
- **Shadow variants**: `shadow-variant()` - poziomy cieni (none, light, medium, heavy)
- **Border variants**: `border-radius-variant()`, `border-width-variant()` - warianty obramowań
- **Typography mixins**: `font-heading()`, `font-body()` - style tekstowe

**Optymalizacja**: Używa map i pętli dla DRY code

#### `_base.scss`

**Funkcjonalność**: Reset CSS, globalne style, CSS custom properties  
**Zawiera**:

- CSS reset (box-sizing, margins, paddings)
- CSS custom properties z wartościami dla light/dark theme
- Globalne style dla html, body
- Focus styles dla accessibility
- Print styles

#### `_themes.scss`

**Funkcjonalność**: Definicje motywów (light/dark/auto)  
**Mechanizm**: Używa atrybutów `[data-theme="light"]`, `[data-theme="dark"]`  
**Auto mode**: Reaguje na `@media (prefers-color-scheme: dark)`  
**Zmienne**: Definiuje kolory, tła, teksty dla każdego motywu

---

### `/src/styles/components/` - Style Komponentów

#### `index.scss`

**Funkcjonalność**: Agregator stylów komponentów  
**Użycie**: Forward wszystkich plików komponentów

#### `_buttons.scss`

**Funkcjonalność**: Style przycisku Button  
**BEM Classes**:

- `.pta-button` - base class
- `.pta-button--{variant}` - primary, secondary, success, danger
- `.pta-button--{size}` - sm, md, lg, xl
- `.pta-button--state-{state}` - semantic states
- `.pta-button--disabled` - stan wyłączony

**Features**:

- Responsive sizing via mixins
- Shadow variants (none, light, medium, heavy)
- Border radius variants (none, sm, md, lg, xl, 2xl)
- Border width variants (none, thin, medium, thick)
- Hover/focus/active states
- Disabled state

#### `_cards.scss`

**Funkcjonalność**: Style komponentu Card  
**BEM Classes**:

- `.pta-card` - base class
- `.pta-card__title`, `.pta-card__content` - elementy
- `.pta-card--{variant}` - default, elevated, outlined
- `.pta-card--{size}` - sm, md, lg, xl

**Features**:

- Warianty wizualne (płaskie, podniesione, z obramowaniem)
- Responsywne rozmiary i padding
- Semantic states
- Shadow i border variants

#### `_grids.scss`

**Funkcjonalność**: System layoutu Grid/Flexbox  
**BEM Classes**:

- `.pta-grid` - base class
- `.pta-grid--flex`, `.pta-grid--grid` - tryby
- `.pta-grid--direction-{dir}` - row, column, row-reverse, column-reverse
- `.pta-grid--justify-{value}` - start, center, end, between, around, evenly
- `.pta-grid--align-{value}` - start, center, end, stretch, baseline
- `.pta-grid--gap-{size}` - xs, sm, md, lg, xl, 2xl, 3xl

**Features**:

- Flexbox i CSS Grid support
- Responsywne gap spacing
- Auto-flow grid options
- Wrap control

#### `_typography.scss`

**Funkcjonalność**: Style komponentu Typography  
**BEM Classes**:

- `.pta-typography` - base class
- `.pta-typography--variant-{variant}` - h1-h6, subtitle1-2, body1-2, caption, overline
- `.pta-typography--color-{color}` - primary, secondary, success, error, warning, info
- `.pta-typography--align-{align}` - left, center, right, justify
- `.pta-typography--gutter-bottom` - margines dolny
- `.pta-typography--no-wrap` - text-overflow ellipsis

**Features**:

- Hierarchia typograficzna (h1: 2.5rem → h6: 1rem)
- Semantic colors
- Responsive font sizes
- Line heights optymalne dla czytelności

#### `_switches.scss`

**Funkcjonalność**: iOS-style toggle switch (WYMAGA NAPRAWY)  
**BEM Classes**:

- `.pta-switch` - base class
- `.pta-switch__slider`, `.pta-switch__thumb`, `.pta-switch__label` - elementy
- `.pta-switch--{size}` - sm, md, lg, xl
- `.pta-switch--{variant}` - primary, secondary, success, danger
- `.pta-switch--checked` - stan zaznaczony
- `.pta-switch--disabled` - stan wyłączony

**Features** (po naprawie):

- Smooth animations
- Variant colors for checked state
- Size variants z dostosowanymi wymiarami
- Semantic borders
- Shadow i border radius variants
- Keyboard accessibility (focus-visible)

#### `_modals.scss`

**Funkcjonalność**: Modal dialog overlay  
**BEM Classes**:

- `.pta-modal` - backdrop
- `.pta-modal__content` - content container
- `.pta-modal__header`, `.pta-modal__body`, `.pta-modal__close` - elementy
- `.pta-modal__content--{size}` - sm, md, lg

**Features**:

- Fade-in animation
- Slide-up content animation
- Responsive sizing
- Close button styling
- Backdrop blur

---

## System Design Tokens

### Spacing Scale

- xs: 0.25rem (4px)
- sm: 0.375rem (6px)
- md: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)
- 2xl: 1.5rem (24px)
- 3xl: 2rem (32px)

### Shadow Scale

- none: brak cienia
- light: subtelny cień (0 1px 2px)
- medium: standardowy cień (0 4px 6px)
- heavy: mocny cień (0 10px 15px)

### Border Radius Scale

- none: 0
- sm: 0.25rem (4px)
- md: 0.375rem (6px)
- lg: 0.5rem (8px)
- xl: 0.75rem (12px)
- 2xl: 1rem (16px)

### Border Width Scale

- none: 0
- thin: 1px
- medium: 2px
- thick: 4px

### Breakpoints (Mobile-First)

- sm: 640px - małe tablety
- md: 768px - tablety
- lg: 1024px - małe laptopy
- xl: 1280px - desktopy
- 2xl: 1536px - duże ekrany

---

## Wzorce i Konwencje

### BEM Naming Convention

- **Block**: `.pta-component` (kebab-case, prefix `pta-`)
- **Element**: `.pta-component__element` (double underscore)
- **Modifier**: `.pta-component--modifier` (double hyphen)
- **Semantic State**: `.pta-component--state-{value}`
- **Utility**: `.u-*`
- **JS Hook**: `.js-*`
- **Transient State**: `.is-*`

### Responsive Strategy

**Mobile-First**: Bazowe style dla mobile, potem `@media (min-width: ...)` dla większych ekranów  
**Breakpoint Usage**: Używaj mixins `respond-above()` i `respond-below()`  
**Fluid Typography**: `clamp()` dla płynnych rozmiarów czcionek  
**Flexible Spacing**: Responsive padding/margin przez mixins

### Accessibility Features

- Focus-visible dla keyboard navigation
- High contrast w focus states
- Reduced motion support (`@media (prefers-reduced-motion: reduce)`)
- Semantic HTML tags
- ARIA-compliant structures

### Performance Optimizations

- CSS custom properties dla themes (unikanie duplikacji)
- Mixins z mapami zamiast powtarzającego się kodu
- Critical CSS inline w index.html
- Tree-shaking unused styles w production
- Gzip-friendly class naming (consistent prefixes)

---

## Synchronizacja TypeScript ↔ SCSS

### Krytyczne Zasady

1. **Design tokens w TypeScript** (`src/types/constants.ts`) są source of truth
2. **SCSS variables** (`src/styles/_variables.scss`) muszą być zsynchronizowane
3. **Kolejność zmian**: TypeScript → SCSS → CSS custom properties → testy
4. **Validacja**: `npm run type-check` + `npm run lint:css` + `npm run test:run`

### Workflow przy zmianie tokenów:

1. Edytuj `src/types/constants.ts`
2. Zsynchronizuj `src/styles/_variables.scss`
3. Zaktualizuj `src/styles/_base.scss` (CSS custom properties)
4. Dostosuj mixins w `src/styles/_mixins.scss` jeśli potrzeba
5. Przetestuj `npm run dev` i sprawdź wizualnie
6. Uruchom testy `npm run test:run`

---

## Optymalizacje i Refaktoring

### Cel Refaktoryzacji

- **DRY Code**: Eliminate redundant rules, use maps and loops in mixins
- **Maintainability**: Centralized token management, consistent patterns
- **Performance**: Reduce CSS bundle size, optimize selectors
- **Scalability**: Easy to add new variants/sizes/states

### Techniki Optymalizacyjne

#### 1. Map-Based Variants

Zamiast:

```scss
&--sm {
  font-size: 0.875rem;
}
&--md {
  font-size: 1rem;
}
&--lg {
  font-size: 1.125rem;
}
```

Użyj mapy i pętli w mixin:

```scss
$sizes: (
  sm: 0.875rem,
  md: 1rem,
  lg: 1.125rem,
);

@each $name, $size in $sizes {
  &--#{$name} {
    font-size: $size;
  }
}
```

#### 2. Semantic State Mixins

Centralized semantic colors:

```scss
@mixin semantic-variant($state) {
  &--state-#{$state} {
    border-color: var(--pta-color-#{$state});
    // ... other styles
  }
}
```

#### 3. Responsive Mixin Patterns

Mobile-first with progressive enhancement:

```scss
@mixin responsive-size($base, $tablet, $desktop) {
  width: $base;
  @include respond-above(md) {
    width: $tablet;
  }
  @include respond-above(lg) {
    width: $desktop;
  }
}
```

---

## Debugowanie i Troubleshooting

### Common Issues

**Problem**: Kolory motywu nie przełączają się  
**Rozwiązanie**: Sprawdź czy `data-theme` attribute jest ustawiony na `<html>`, czy CSS custom properties są zdefiniowane w `_themes.scss`

**Problem**: Responsive breakpoints nie działają  
**Rozwiązanie**: Upewnij się że używasz `respond-above()` mixin, sprawdź kolejność media queries (mobile-first)

**Problem**: BEM classes nie stosują się  
**Rozwiązanie**: Weryfikuj hierarchię selektorów, użyj `&` dla nested modifiers, sprawdź czy `buildClassName()` generuje poprawne klasy

**Problem**: Style komponentu nie ładują się  
**Rozwiązanie**: Sprawdź czy komponent jest `@forward` w `src/styles/components/index.scss`, czy `index.scss` jest importowany w `src/styles/index.scss`

### Narzędzia Diagnostyczne

- `npm run lint:css` - Stylelint validation
- `npm run dev` - Hot reload dla szybkiego testowania
- Browser DevTools - Inspect computed styles, CSS custom properties
- `npm run build` - Check production bundle size

---

## Best Practices

### DO ✅

- Używaj mixins dla powtarzalnych wzorców
- Przestrzegaj BEM naming convention
- Synchronizuj TypeScript constants z SCSS variables
- Testuj na różnych breakpointach
- Używaj CSS custom properties dla theme-able values
- Dokumentuj skomplikowane mixins
- Optymalizuj selektory (unikaj deep nesting >3 levels)

### DON'T ❌

- Nie hardcoduj wartości (używaj zmiennych/tokenów)
- Nie duplikuj kodu (twórz mixins)
- Nie używaj !important (wyjątek: utility classes)
- Nie mieszaj px/rem bez powodu (konsystencja: rem dla spacing/typography)
- Nie pomijaj prefixu `pta-` w class names
- Nie ignoruj accessibility (focus states, reduced motion)
- Nie łam mobile-first approach (desktop styles powinny być w media queries)

---

## Future Enhancements

### Planowane Ulepszenia

1. **CSS Modules**: Rozważyć migrację do CSS Modules dla lepszej scope isolation
2. **CSS-in-JS**: Opcjonalnie styled-components/emotion dla dynamicznych stylów
3. **Design Tokens Generator**: Automatyczna generacja SCSS z JSON/YAML
4. **Visual Regression Testing**: Percy/Chromatic dla snapshot testing
5. **Critical CSS**: Automatic extraction i inline dla LCP optimization
6. **CSS Grid Modernization**: Wykorzystać subgrid, container queries
7. **Animation Library**: Centralized animation utilities (entrance, exit, micro-interactions)

---

## Glossary

- **BEM**: Block Element Modifier - metodologia nazewnictwa CSS
- **Design Tokens**: Centralne wartości designu (kolory, spacing, typography)
- **Mobile-First**: Strategia responsive design zaczynająca od najmniejszych ekranów
- **CSS Custom Properties**: Native CSS variables (`--var-name`)
- **Mixin**: Reusable SCSS function generująca style
- **Semantic State**: Stan komponentu odzwierciedlający znaczenie (success, error, warning, info)
- **DRY**: Don't Repeat Yourself - zasada eliminacji duplikacji
- **Scope Isolation**: Separation of styles to prevent conflicts
- **Critical CSS**: Above-the-fold CSS needed for initial render
- **Tree-shaking**: Removing unused CSS in production bundle
