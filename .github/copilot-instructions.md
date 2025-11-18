### Purpose

This repository is a Preact + Vite TypeScript single-page app with a comprehensive design system and multiple pages. These instructions guide AI coding agents to maintain architectural consistency and developer productivity.

**Quick Start (dev / build / preview)**

- Install: `npm install`
- Dev server: `npm run dev` (Vite — open http://localhost:5173)
- Build: `npm run build` (outputs `dist`)
- Preview: `npx vite preview` (serves built files)

**Key files & responsibilities**

- `package.json` — scripts for build/dev/test; Preact + Vite core deps; testing stack (Vitest + Playwright)
- `vite.config.ts` — enables `@preact/preset-vite` plugin
- `index.html` — Vite entry; **must** contain `<div id="app"></div>` (app throws if missing)
- `src/index.tsx` — app entry; provides `Theme` context; imports global SCSS
- `src/App.tsx` — main app component with routing to different pages
- `src/ThemeProvider.tsx` — Context provider for theme state with localStorage persistence and SSR safety

**UI Components (src/ui/)**

- `Button.tsx` — reusable Button with typed props (variant, size, shadow, semanticState, borderRadius, borderWidth)
- `Card.tsx` — Card component with variants, shadows, borders, title support
- `Grid.tsx` — Layout Grid component with responsive support
- `Typography.tsx` — Text Typography component with variants, colors, alignment
- `Input.tsx` — text input with validation, clear button, character count, icons (205 lines, 39 tests)
- `Select.tsx` — dropdown select with search, multi-select, keyboard nav (332 lines, 33 tests)
- `Switch.tsx` — accessible toggle switch component with ARIA support, variant colors
- `Modal.tsx` — modal dialog component for overlays
- `Hamburger.tsx` — hamburger menu icon with animation
- `ThemeIcon.tsx` — theme switcher icon (light/dark/auto)

**Pages (src/pages/)**

- `Home.tsx` — dashboard page with metrics, quick actions, and recent activity with visual icons
- `Settings.tsx` — user settings and preferences page with theme switching, connected to SettingsService
- `PrivacyPolicy.tsx` — legal page with 9 sections about data collection, usage, security
- `TermsOfService.tsx` — legal page with 10 sections about service terms

**Services (src/services/)**

- `NavigationService.ts` — manages navigation state, active item tracking, parent/child relationships with signals
- `SettingsService.ts` — manages ALL user preferences with localStorage persistence (notifications, privacy, advanced features)

**State Management (src/application/)**

- `signals.ts` — dashboard metrics, theme, mobile menu, activity feed using @preact/signals

**Data Configuration (src/data/)**

- `navigation.ts` — two-level navigation structure with parent/child relationships, anchors for Settings submenu

**Type System (src/types/)**

- `index.ts` — **central export point** for all types, constants, and utilities
- `types.ts` — **core type definitions** (ComponentSize, Theme, variants, etc.)
- `constants.ts` — **design token constants** (SPACING_VALUES, SHADOW_VALUES, etc.)
- `component-props.ts` — **ALL component prop interfaces** (457 lines: ButtonProps, CardProps, InputProps, SelectProps, etc.)
- `utils.ts` — **buildClassName** utility for BEM class generation
- `navigation.ts` — NavigationConfig, NavigationItem, ActiveNavigationState types

**Styling (src/styles/)**

- `index.scss` — global SCSS entry with `@use` imports
- `_variables.scss` — SCSS variables (must sync with `src/types/constants.ts`)
- `_themes.scss` — CSS custom properties applied via `data-theme` attributes
- `_base.scss` — global reset, CSS variables, base component styles
- `_mixins.scss` — reusable mixins with maps and loops (DRY code)
- `components/_buttons.scss` — Button styles with mixins
- `components/_cards.scss` — Card styles with mixins
- `components/_inputs.scss` — Input styles (360 lines) with BEM, responsive design
- `components/_selects.scss` — Select styles (403 lines) with animations, option highlighting
- `components/_switches.scss` — Switch component styles with variant colors
- `components/_modals.scss` — Modal component styles

**Testing (src/test/ and e2e/)**

- `src/test/` — unit tests for components and utilities (Vitest, 322 tests passing)
- `vitest.config.ts` — unit testing config (jsdom, excludes e2e)
- `playwright.config.ts` — e2e testing config with Vite dev server integration
- `e2e/` — Playwright tests for cross-browser validation

**Documentation**

- `.github/scss-architecture.md` — **SCSS architecture documentation** (structure, patterns, best practices)
- `storybook-static/` — built Storybook for component documentation (45 stories)
- `docs/` — **TypeDoc-generated API documentation** (markdown format, auto-deployed to GitHub Pages at /docs)
- `typedoc.json` — TypeDoc configuration with markdown theme, excludes tests/e2e/stories

**Documentation Standards (MANDATORY)**

All TypeScript code MUST include comprehensive JSDoc comments following these requirements:

1. **Component Documentation Requirements**:

   - Every exported component MUST have a JSDoc block with:
     - `@description` - Clear, concise component purpose (1-2 sentences)
     - `@example` - At least one usage example with JSX code
     - `@param` - Description for every prop (use TypeScript types for type info)
     - `@returns` - What the component renders
   - Props interfaces MUST have JSDoc for each property

2. **Function/Service Documentation Requirements**:

   - Every exported function MUST have:
     - `@description` - Function purpose and behavior
     - `@param` - Description for each parameter (with type constraints if applicable)
     - `@returns` - Return value description and type
     - `@throws` - Any exceptions that may be thrown
     - `@example` - Usage example for complex functions

3. **Type/Interface Documentation Requirements**:

   - Every exported type/interface MUST have:
     - `@description` - Purpose and use cases
     - Property-level JSDoc for non-obvious fields
     - `@example` - Usage example for complex types

4. **Documentation Scripts**:

   - Generate docs: `npm run docs:generate` (outputs to `docs/`)
   - Serve docs locally: `npm run docs:serve` (http://localhost:8080)
   - Clean docs: `npm run docs:clean`
   - CI auto-generates and deploys docs to GitHub Pages on main branch pushes

5. **Documentation Validation**:
   - TypeDoc runs in CI pipeline after successful tests
   - Missing JSDoc comments will generate warnings in TypeDoc output
   - Review documentation locally before submitting PRs
   - Check generated docs at https://prachwal.github.io/preact-train-01-app/docs/

**JSDoc Example Templates**

````typescript
/**
 * A reusable button component with extensive variant and state support.
 *
 * @description
 * Provides a flexible button interface with semantic states, visual variants,
 * and accessibility features. Supports all standard button attributes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 *
 * @param props - Button component props
 * @returns A styled button element
 */
export function Button(props: ButtonProps) { ... }

/**
 * Calculates the active navigation state based on current path.
 *
 * @description
 * Traverses the navigation tree to find matching items and their parents,
 * supporting both regular routes and anchor-based sub-navigation.
 *
 * @param path - Current route path (e.g., "/settings#appearance")
 * @param config - Navigation configuration tree
 * @returns Active navigation state with parent and current item
 *
 * @example
 * ```typescript
 * const state = calculateActiveState("/settings#general", navigationConfig);
 * // Returns: { parent: "settings", current: "general" }
 * ```
 */
export function calculateActiveState(path: string, config: NavigationConfig): ActiveNavigationState { ... }
````

**Big-picture architecture & data flows**

- **Single client SPA**; no backend; client-side routing with preact-iso; multi-page navigation
- **State Management Architecture**:
  - `@preact/signals` for reactive state (preferred for all new state)
  - Context providers ONLY for theme (ThemeProvider)
  - Service layer pattern: NavigationService, SettingsService export signals
  - Application-specific signals in `src/application/signals.ts` (dashboard metrics, activity feed)
  - Settings signals in `src/services/SettingsService.ts` with localStorage persistence via `effect()`
- **Theme flow**: UI → `themeSignal` → localStorage + `document.documentElement.setAttribute('data-theme', ...)` → CSS `[data-theme]` selectors
- **Navigation flow**: Two-level hierarchy in `src/data/navigation.ts` → NavigationService manages active state → Navigation component renders with parent/child highlighting
- **Component flow**: Typed props from `src/types/component-props.ts` → `buildClassName()` → BEM classes → SCSS styles
- **Design tokens**: TypeScript constants in `src/types/constants.ts` → SCSS variables in `_variables.scss` → CSS custom properties in `_base.scss`
- **Settings flow**: User interaction → signal update → `effect()` auto-saves to localStorage → UI reactively updates
- **Form components**: Input/Select use controlled/uncontrolled patterns with internal state, support validation, icons, error states

**Project-specific conventions & patterns**

- **Preact/compat**: Use React-like hooks (`useState`, `useEffect`, `useContext`, `memo`) and @preact/signals for reactive state
- **Strict TypeScript**: All component props use literal unions; no generic `string` types. Use `ComponentChildren` from Preact for `children` props instead of `React.ReactNode`.
- **Component API**: Spread `...props` with special `className` merging: `className ? `${baseClassName} ${className}` : baseClassName`
- **Theme system**: `Theme` type = `'light'|'dark'|'auto'`; auto mode respects `prefers-color-scheme`
- **Design tokens**: Update `src/types/constants.ts` first, then sync SCSS variables
- **Service pattern**: Services export signals and utility functions; initialized in components via `useEffect(() => { initializeService(); }, [])`
- **Typography variants**: Use 'body1' or 'body2', NOT 'body'. Valid colors: 'text'|'primary'|'secondary'|'tertiary'|'error'|'warning'|'info'|'success'

**CSS class naming convention (strict BEM required)**

- **Block**: `pta-component` (kebab-case, `pta-` prefix)
- **Element**: `pta-component__element` (double underscore)
- **Modifier**: `pta-component--modifier` (double hyphen)
- **Semantic state**: `pta-component--state-{value}` (e.g., `--state-success`)
- **Utility classes**: `u-*` prefix (e.g., `u-hidden`)
- **JS-only classes**: `js-*` prefix (e.g., `js-theme-toggle`)
- **Transient state**: `is-*` prefix (e.g., `is-open`)

**buildClassName utility (required for consistency)**

```typescript
buildClassName('pta-button', {
  sm: true, // → 'pta-button pta-button--sm'
  variant: 'primary', // → 'pta-button pta-button--primary'
  disabled: false, // → ignored (falsy)
});
```

**Developer workflows, scripts & gotchas**

- **Development**: `npm run dev` (hot reload)
- **Unit tests**: `npm run test:run` (Vitest, jsdom, src/\*_/_.test.ts only)
- **E2E tests**: `npm run test:e2e` (Playwright, real browsers)
- **Type checking**: `npm run type-check` (TypeScript)
- **CSS linting**: `npm run lint:css` (Stylelint with BEM validation)
- **Build**: `npm run build` (Vite production build)
- **Preview**: `npx vite preview` (serve dist/)
- **Test separation**: Vitest excludes e2e/; Playwright uses Vite dev server

**Critical sync requirements (do not break)**

When changing design tokens:

1. Update TypeScript constants in `src/types/constants.ts` first (include 'none' for BorderRadiusSize, BorderWidthSize, ShadowVariant)
2. Sync SCSS variables in `src/styles/_variables.scss`
3. Add CSS custom properties in `src/styles/_base.scss`
4. Update mixins in `src/styles/_mixins.scss` if needed (prefer maps and loops for DRY code)
5. Run `npm run dev` and verify no regressions

**Component Props Management (CRITICAL)**

- **ALL component prop interfaces MUST be defined in `src/types/component-props.ts`** (457 lines)
- **DO NOT define props inline in component files** (e.g., `export interface ComponentProps` in `.tsx` files)
- Components import props: `import type { ButtonProps, InputProps } from '../types'` (re-exported from `src/types/index.ts`)
- Centralized props ensure consistency, type safety, and easier refactoring
- All 10 UI components follow this pattern: Button, Card, Grid, Typography, Input, Select, Switch, Modal, Hamburger, ThemeIcon

**SCSS Best Practices (DRY Code)**

- **Use maps and loops** instead of repetitive variant rules (see `_mixins.scss` for examples)
- **Use `map.get()` instead of deprecated `map-get()`** for accessing map values (Dart Sass 3.0.0+ compatibility) - requires `@use "sass:map"` import
- **Centralize mixins** in `src/styles/_mixins.scss` for reusable patterns
- **Follow mobile-first** responsive strategy with `respond-above()` mixin
- **Avoid hardcoded values** - use SCSS variables from `_variables.scss`
- **Document complex mixins** with comments explaining purpose and usage
- See `.github/scss-architecture.md` for comprehensive SCSS documentation

**Testing patterns**

- **Unit tests**: 322 tests across 10 test files (Vitest with jsdom)
- **Test location**: `src/test/ComponentName.test.tsx` (NOT co-located with components)
- **Test selectors**: Use `getByRole('button', { name: '...', exact: true })` to avoid text conflicts
- **Coverage**: Input (39 tests), Select (33 tests), Button (34 tests), Typography (63 tests)
- **E2E tests**: Playwright in `e2e/` directory for cross-browser validation
- **Run commands**: `npm run test:run` (unit), `npm run test:e2e` (e2e), `npm run type-check` (TypeScript)

**Storybook Development**

- **Creating Stories**: When creating Storybook stories for components, use the component's props type in the Meta type, e.g., `Meta<ComponentProps>`. This ensures type safety and auto-completion in Storybook controls.
- **Example**: For a component like Grid, use `Meta<GridComponentProps>` and define argTypes based on the props.
- **Theme Integration**: Stories should use decorators to wrap in ThemeProvider and include globalTypes for theme switching.
- **Best Practices**: Include various prop combinations in stories to showcase component flexibility.

**Component Creation Process**

1. **Define Props** in `src/types/component-props.ts` - centralized location for ALL component prop types
   - Add JSDoc comments for each property with `@description`
   - Include `@example` for complex prop types
2. **Create TSX component** in `src/ui/ComponentName.tsx`:
   - **Add JSDoc block** with `@description`, `@example`, `@param`, `@returns` tags (MANDATORY)
   - Import props type: `import type { ComponentNameProps } from '../types'`
   - Use `buildClassName()` for BEM class generation with modifiers object
   - Support controlled/uncontrolled patterns for form components (see Input.tsx, Select.tsx)
3. **Add SCSS styles** in `src/styles/components/_componentname.scss`:
   - Use BEM naming: `.pta-component`, `.pta-component__element`, `.pta-component--modifier`
   - Leverage mixins/maps for DRY code (see `_inputs.scss` for 360-line example)
   - Follow mobile-first responsive design with `respond-above()` mixin
4. **Forward styles** in `src/styles/components/index.scss` with `@forward './componentname'`
5. **Export component** in `src/ui/index.ts` for centralized imports
6. **Create Storybook stories** in `src/ui/ComponentName.stories.tsx`:
   - Use `Meta<ComponentNameProps>` for type safety
   - Include decorators for ThemeProvider and globalTypes for theme switching
7. **Write unit tests** in `src/test/ComponentName.test.tsx`:
   - Import `@testing-library/jest-dom` for matchers like `toBeInTheDocument()`
   - Test all variants, states, and user interactions
   - Aim for comprehensive coverage (39+ tests for complex components)
8. **Verify**: Run `npm run build`, `npm run lint:css`, `npm run test:run`, `npm run type-check`, `npm run docs:generate`

**Page Creation Process**

**CRITICAL: Pages MUST be organized in dedicated subfolders with section components**

1. **Create page folder structure** in `src/pages/PageName/`:
   - Create dedicated folder: `src/pages/PageName/`
   - Main page component: `src/pages/PageName/index.tsx` (exports PageName component)
   - Section components: Split page into logical sections (e.g., `ContactForm.tsx`, `ContactInfo.tsx`, `SuccessMessage.tsx`)
   - Page styles: `src/pages/PageName/PageName.scss` with corrected import paths (`../../styles/...`)
2. **Structure guidelines**:
   - **index.tsx**: Main page component that orchestrates sections, handles state, initializes services
   - **Section components**: Reusable, focused components (forms, info cards, headers, footers)
   - **Keep sections simple**: Each section should have single responsibility
   - **Export from index.tsx**: `export function PageName() { ... }` (matches folder name)
3. **Example structure** (Contact page):

   ```
   src/pages/Contact/
   ├── index.tsx              # Main Contact component
   ├── ContactForm.tsx        # Form section with validation
   ├── ContactInfo.tsx        # Info cards section
   ├── SuccessMessage.tsx     # Success state section
   └── Contact.scss           # Page styles
   ```

4. **Import path updates**:

   - UI components: `import { Button, Input } from '../../ui'`
   - Types: `import type { RadioOption } from '../../types'`
   - Services: `import { submitForm } from '../../services/ContactService'`
   - SCSS imports: `@use "../../styles/variables.scss" as *;`

5. **Re-export in pages/index.ts**:

   - Import resolves to folder: `export { Contact } from './Contact';` → loads `./Contact/index.tsx`
   - No changes needed to existing exports

6. **Add route** to `src/App.tsx` Router: `<Route path="/page" component={PageName} />` (no import changes needed)

7. **Update navigation** in `src/data/navigation.ts` if page should appear in nav menu

8. **Handle anchors** for same-page navigation (e.g., Settings submenu uses anchors like `#general`, `#appearance`)

9. **Test navigation**: Create E2E test in `e2e/` directory to verify routing and page functionality

10. **Build and verify**: Run `npm run build` and check `dist/` output, verify all imports resolve correctly

**Optimization Workflow with SED-Based Checklists**

When performing large-scale optimizations, refactorings, or multi-step improvements:

1. **Create or use optimization checklist**: `.github/feature-checklist.md` contains structured tasks with SED-parseable format
2. **Task structure**: Each task has ID, status, type, target, description, priority, estimated time, dependencies, notes
3. **Status tracking**: Use `sed` commands to query/update task status without opening files
4. **Section-based organization**: Tasks grouped into logical sections (ANALYSIS_PHASE, SCSS_OPTIMIZATION, etc.)
5. **Dependency management**: Check task dependencies before starting work

**SED Command Examples for Checklist Management**

```bash
# Get task status
sed -n '/^### Task: 1.1_code_scan$/,/^$/p' .github/feature-checklist.md | grep "Status:"

# Update task to in-progress
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: PENDING/Status: IN_PROGRESS/}' .github/feature-checklist.md

# Mark task as completed
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: IN_PROGRESS/Status: COMPLETED/}' .github/feature-checklist.md

# List all pending tasks
sed -n '/Status: PENDING/p' .github/feature-checklist.md

# Get section summary
sed -n '/^## Section: SCSS_OPTIMIZATION$/,/^## Section:/p' .github/feature-checklist.md

# Update timestamp after work session
sed -i "s/<!-- UPDATED: .* -->/<!-- UPDATED: $(date +%Y-%m-%d) -->/" .github/feature-checklist.md

# Count completed tasks
grep -c "Status: COMPLETED" .github/feature-checklist.md
```

**When to Use Optimization Checklists**

- **Large refactorings**: SCSS consolidation, component restructuring
- **Multi-file changes**: Coordinated updates across types, styles, components
- **Performance optimizations**: Bundle size reduction, CSS optimization
- **Architecture improvements**: Pattern extraction, DRY principle application
- **Visual redesigns**: Layout changes, spacing updates, typography hierarchy

**Checklist Best Practices**

1. **Start with analysis**: Always run analysis tasks before making changes
2. **Follow dependencies**: Check `Dependencies:` field before starting tasks
3. **Update status immediately**: Mark IN_PROGRESS when starting, COMPLETED when done
4. **Document blockers**: If blocked, update status and add notes
5. **Track time**: Compare estimated vs actual time for future planning
6. **Validate after sections**: Run tests after completing each major section
7. **Update timestamp**: Run timestamp update command after each work session

**Priority System**

- **P0 (Critical)**: Must be done, blocks other work
- **P1 (High)**: Should be done, important for quality
- **P2 (Medium)**: Nice to have, improves maintainability
- **P3 (Low)**: Optional, future enhancement
