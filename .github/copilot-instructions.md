### Purpose

This repository is a Preact + Vite TypeScript single-page app with a comprehensive design system. These instructions guide AI coding agents to maintain architectural consistency and developer productivity.

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
- `src/App.tsx` — demo page showcasing components and theme switching
- `src/ThemeProvider.tsx` — Context provider for theme state with localStorage persistence and SSR safety
- `src/ui/Button.tsx` — reusable Button with typed props (variant, size, shadow, semanticState, borderRadius, borderWidth)
- `src/ui/Card.tsx` — Card component with variants, shadows, borders, title support
- `src/ui/Grid.tsx` — Layout Grid component with responsive support
- `src/ui/Typography.tsx` — Text Typography component with variants, colors, alignment
- `src/components/CardDemo.tsx` — Demo component for Button variants
- `src/types/index.ts` — **canonical source** for design tokens, types, and `buildClassName` utility
- `src/styles/index.scss` — global SCSS entry with `@use` imports
- `src/styles/_variables.scss` — SCSS variables (must sync with `src/types/index.ts`)
- `src/styles/_themes.scss` — CSS custom properties applied via `data-theme` attributes
- `src/styles/_base.scss` — global reset, CSS variables, base component styles
- `src/styles/components/_buttons.scss` — Button styles with mixins
- `src/styles/components/_cards.scss` — Card styles with mixins
- `src/styles/components/_grids.scss` — Grid styles
- `src/styles/components/_typography.scss` — Typography styles with maps
- `vitest.config.ts` — unit testing config (jsdom, excludes e2e)
- `playwright.config.ts` — e2e testing config with Vite dev server integration
- `e2e/` — Playwright tests for cross-browser validation

**Big-picture architecture & data flows**

- **Single client SPA**; no backend; Context-based state management
- **Theme flow**: UI → `Theme` context → localStorage + `document.documentElement.setAttribute('data-theme', ...)` → CSS `[data-theme]` selectors
- **Component flow**: Typed props → `buildClassName()` → BEM classes → SCSS styles
- **Design tokens**: Centralized in `src/types/index.ts`; SCSS variables derive from these
- **Cross-component communication**: Context providers (currently `Theme`)

**Project-specific conventions & patterns**

- **Preact/compat**: Use React-like hooks (`useState`, `useEffect`, `useContext`, `memo`)
- **Strict TypeScript**: All component props use literal unions; no generic `string` types. Use `ComponentChildren` from Preact for `children` props instead of `React.ReactNode`.
- **Component API**: Spread `...props` with special `className` merging: `className ? `${baseClassName} ${className}` : baseClassName`
- **Theme system**: `Theme` type = `'light'|'dark'|'auto'`; auto mode respects `prefers-color-scheme`
- **Design tokens**: Update `src/types/index.ts` first, then sync SCSS variables

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

1. Update TypeScript constants in `src/types/index.ts` first (include 'none' for BorderRadiusSize, BorderWidthSize, ShadowVariant)
2. Sync SCSS variables in `src/styles/_variables.scss`
3. Add CSS custom properties in `src/styles/_base.scss`
4. Update mixins in `src/styles/_mixins.scss` if needed
5. Run `npm run dev` and verify no regressions

**Testing patterns**

- **Unit tests**: Focus on `src/types/index.ts` utilities and type definitions
- **E2E tests**: Validate real browser behavior, theme switching, component interactions
- **Test selectors**: Use `getByRole('button', { name: '...', exact: true })` to avoid text conflicts

**Storybook Development**

- **Creating Stories**: When creating Storybook stories for components, use the component's props type in the Meta type, e.g., `Meta<ComponentProps>`. This ensures type safety and auto-completion in Storybook controls.
- **Example**: For a component like Grid, use `Meta<GridComponentProps>` and define argTypes based on the props.
- **Theme Integration**: Stories should use decorators to wrap in ThemeProvider and include globalTypes for theme switching.
- **Best Practices**: Include various prop combinations in stories to showcase component flexibility.

**Component Creation Process**

1. Create TSX component in `src/ui/` with typed props, `buildClassName`, and dynamic JSX via `h()`.
2. Add types/interfaces in `src/types/` (update `types.ts`, `component-props.ts`).
3. Add SCSS styles in `src/styles/components/_component.scss` using mixins/maps for DRY.
4. Update `src/styles/components/index.scss` with `@forward`.
5. Export in `src/ui/index.ts`.
6. Add Storybook stories in `src/ui/Component.stories.tsx` with decorators and argTypes.
7. Build (`npm run build`), lint (`npm run lint:css`), and test in Storybook (`npm run storybook`).

**Optimization Workflow with SED-Based Checklists**

When performing large-scale optimizations, refactorings, or multi-step improvements:

1. **Create or use optimization checklist**: `.github/optimization-checklist.md` contains structured tasks with SED-parseable format
2. **Task structure**: Each task has ID, status, type, target, description, priority, estimated time, dependencies, notes
3. **Status tracking**: Use `sed` commands to query/update task status without opening files
4. **Section-based organization**: Tasks grouped into logical sections (ANALYSIS_PHASE, SCSS_OPTIMIZATION, etc.)
5. **Dependency management**: Check task dependencies before starting work

**SED Command Examples for Checklist Management**

```bash
# Get task status
sed -n '/^### Task: 1.1_code_scan$/,/^$/p' .github/optimization-checklist.md | grep "Status:"

# Update task to in-progress
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: PENDING/Status: IN_PROGRESS/}' .github/optimization-checklist.md

# Mark task as completed
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: IN_PROGRESS/Status: COMPLETED/}' .github/optimization-checklist.md

# List all pending tasks
sed -n '/Status: PENDING/p' .github/optimization-checklist.md

# Get section summary
sed -n '/^## Section: SCSS_OPTIMIZATION$/,/^## Section:/p' .github/optimization-checklist.md

# Update timestamp after work session
sed -i "s/<!-- UPDATED: .* -->/<!-- UPDATED: $(date +%Y-%m-%d) -->/" .github/optimization-checklist.md

# Count completed tasks
grep -c "Status: COMPLETED" .github/optimization-checklist.md
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
