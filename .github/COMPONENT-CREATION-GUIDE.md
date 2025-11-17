# Component Creation Guide

This guide outlines the step-by-step process for creating new components in the Preact + Vite TypeScript design system. Follow this to maintain consistency, type safety, and DRY principles.

## Overview

Components are built with:

- **Preact**: JSX via `h()` for dynamic rendering.
- **TypeScript**: Strict types with literal unions.
- **SCSS**: BEM classes, mixins, and maps for variants.
- **Storybook**: Documentation and testing.

## Step-by-Step Process

### 1. Plan the Component

- Define props: variant, size, color, etc., using literal unions.
- Decide on dynamic JSX (e.g., tag mapping for Typography).
- Identify SCSS variants (sizes, colors, states) and use mixins/maps.

### 2. Create the Component File (`src/components/Component.tsx`)

- Import `h` from 'preact', `buildClassName` and types from '../types'.
- Define props interface extending `BaseComponentProps`.
- Use `buildClassName` for BEM classes.
- Handle dynamic tags with `h(tag, props, children)`.
- Spread `...props` for additional attributes.

Example (Typography):

```tsx
import { h } from 'preact';
import { buildClassName } from '../types';
import type { TypographyProps } from '../types';

export const Typography = ({ variant = 'body1', ... }: TypographyProps) => {
  const tag = tagMap[variant] || 'p';
  const classes = buildClassName('pta-typography', modifiers);
  return h(tag, { className: classes, ...props }, children);
};
```

### 3. Add Types (`src/types/`)

- Update `types.ts` for new type definitions (e.g., `TypographyVariant`).
- Update `component-props.ts` for `ComponentProps` interface.
- Ensure re-exports in `index.ts`.

### 4. Add Styles (`src/styles/components/_component.scss`)

- Use `@use "sass:map";` for maps.
- Define maps for variants (e.g., `$typography-variants`).
- Create mixins for dynamic styles (e.g., `@mixin typography-variant($variant)`).
- Use `@each` loops for repetitive classes.
- Follow BEM: `pta-component--modifier`.

Example:

```scss
$typography-variants: ( h1: (font-size: $font-size-3xl, ...), ... );
@mixin typography-variant($variant) { ... }
.pta-typography { @each $variant in ... { &--variant-#{$variant} { @include ... } } }
```

### 5. Update Style Imports

- Add `@forward "_component.scss";` to `src/styles/components/index.scss`.

### 6. Export Component

- Add `export * from './Component';` to `src/components/index.ts`.

### 7. Add Storybook (`src/components/Component.stories.tsx`)

- Use `Meta<typeof Component>` with `parameters: { layout: 'centered' }, tags: ['autodocs']`.
- Define `argTypes` for controls.
- Create stories: Default, variants, etc.
- Use global decorators from `preview.tsx` (no local ThemeProvider).

Example:

```tsx
const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: [...] } },
};
```

### 8. Build and Test

- Run `npm run build` to compile.
- Run `npm run lint:css` and fix issues.
- Run `npm run storybook` to verify stories.
- Test in app by importing and using the component.

## Best Practices

- **DRY**: Use mixins/maps for variants instead of duplication.
- **Type Safety**: Literal unions, no generics.
- **BEM**: `pta-component--modifier`.
- **Dynamic JSX**: Use `h()` for tag switching.
- **Theme Awareness**: Respect `data-theme`.
- **Documentation**: Comprehensive Storybook stories.

## Example: Typography Component

Followed this process to create Typography with variants, colors, align, etc., integrated into Card for titles.

For questions, refer to existing components (Button, Card, Grid).
