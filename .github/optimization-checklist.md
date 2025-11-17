# Project Optimization Checklist

<!-- STATUS: IN_PROGRESS -->
<!-- CREATED: 2025-11-17 -->
<!-- UPDATED: 2025-11-17 -->

## Meta Information

- **Project**: Preact Train 01 App
- **Phase**: Code Analysis & SCSS Optimization
- **Priority**: High

---

## Section: ANALYSIS_PHASE

### Task: 1.1_code_scan

- **Status**: COMPLETED
- **Type**: code-review
- **Target**: src/\*_/_
- **Description**: Przeprowadzenie pełnego skanu kodu TypeScript/TSX
- **Priority**: P0
- **Estimated**: 10m
- **Dependencies**: none
- **Notes**: Analiza komponentów UI, typów, hooks, context providers

### Task: 1.2_scss_audit

- **Status**: COMPLETED
- **Type**: style-review
- **Target**: src/styles/\*_/_.scss
- **Description**: Audyt wszystkich plików SCSS pod kątem redundancji
- **Priority**: P0
- **Estimated**: 15m
- **Dependencies**: 1.1_code_scan
- **Notes**: Sprawdzenie variables, mixins, component styles

### Task: 1.3_component_analysis

- **Status**: PENDING
- **Type**: component-review
- **Target**: src/ui/\*_/_.tsx
- **Description**: Analiza komponentów pod kątem wydajności i wzorców
- **Priority**: P0
- **Estimated**: 10m
- **Dependencies**: 1.1_code_scan
- **Notes**: Button, Card, Grid, Typography

### Task: 1.4_e2e_visual_test

- **Status**: COMPLETED
- **Type**: test
- **Target**: e2e/\*_/_.spec.ts
- **Description**: Inspekcja wizualna przez testy Playwright
- **Priority**: P1
- **Estimated**: 5m
- **Dependencies**: none
- **Notes**: Uruchomienie testów i analiza wyników wizualnych

---

## Section: SCSS_OPTIMIZATION

### Task: 2.1_variables_consolidation

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/\_variables.scss
- **Description**: Konsolidacja zmiennych SCSS - usunięcie duplikatów
- **Priority**: P0
- **Estimated**: 20m
- **Dependencies**: 1.2_scss_audit
- **Notes**: Fluid spacing, typography, colors - sprawdzić każdą sekcję

### Task: 2.2_mixins_optimization

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/\_mixins.scss
- **Description**: Optymalizacja mixinów - DRY principle
- **Priority**: P0
- **Estimated**: 30m
- **Dependencies**: 1.2_scss_audit
- **Notes**: responsive-button-size, responsive-card-size, semantic variants

### Task: 2.3_component_scss_refactor

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/components/\*.scss
- **Description**: Refaktoryzacja stylów komponentów
- **Priority**: P1
- **Estimated**: 40m
- **Dependencies**: 2.1_variables_consolidation,2.2_mixins_optimization
- **Notes**: Buttons, Cards, Grids, Typography - używać mixinów zamiast powtórzeń

### Task: 2.4_theme_optimization

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/\_themes.scss
- **Description**: Optymalizacja definicji motywów
- **Priority**: P1
- **Estimated**: 15m
- **Dependencies**: 2.1_variables_consolidation
- **Notes**: Light/dark theme mixins - usunąć redundancję

---

## Section: APP_VISUAL_OPTIMIZATION

### Task: 3.1_app_layout_improvement

- **Status**: PENDING
- **Type**: enhancement
- **Target**: src/App.tsx, src/App.scss
- **Description**: Optymalizacja układu App.tsx pod kątem wizualnym
- **Priority**: P1
- **Estimated**: 25m
- **Dependencies**: 1.3_component_analysis
- **Notes**: Grid layout, spacing, responsive behavior

### Task: 3.2_component_spacing

- **Status**: PENDING
- **Type**: enhancement
- **Target**: src/App.tsx
- **Description**: Poprawa odstępów między komponentami
- **Priority**: P2
- **Estimated**: 10m
- **Dependencies**: 3.1_app_layout_improvement
- **Notes**: Gap values, padding consistency

### Task: 3.3_typography_hierarchy

- **Status**: PENDING
- **Type**: enhancement
- **Target**: src/App.tsx
- **Description**: Poprawa hierarchii typograficznej
- **Priority**: P2
- **Estimated**: 10m
- **Dependencies**: 3.1_app_layout_improvement
- **Notes**: Heading sizes, text variants

---

## Section: MIXIN_REORGANIZATION

### Task: 4.1_create_mixin_categories

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/\_mixins.scss
- **Description**: Reorganizacja mixinów w logiczne kategorie
- **Priority**: P1
- **Estimated**: 20m
- **Dependencies**: 2.2_mixins_optimization
- **Notes**: Layout, Sizing, Colors, Effects, Responsive

### Task: 4.2_extract_common_patterns

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/\_mixins.scss
- **Description**: Ekstrakcja wspólnych wzorców do reużywalnych mixinów
- **Priority**: P1
- **Estimated**: 25m
- **Dependencies**: 4.1_create_mixin_categories
- **Notes**: Button states, card variants, common transitions

### Task: 4.3_simplify_component_variants

- **Status**: PENDING
- **Type**: refactor
- **Target**: src/styles/components/\*.scss
- **Description**: Uproszczenie wariantów komponentów używając mixinów
- **Priority**: P1
- **Estimated**: 30m
- **Dependencies**: 4.2_extract_common_patterns
- **Notes**: Reduce code duplication in button/card variants

---

## Section: TESTING_VALIDATION

### Task: 5.1_run_e2e_tests

- **Status**: PENDING
- **Type**: test
- **Target**: e2e/\*_/_.spec.ts
- **Description**: Uruchomienie testów E2E po zmianach
- **Priority**: P0
- **Estimated**: 5m
- **Dependencies**: 3.1_app_layout_improvement,3.2_component_spacing,3.3_typography_hierarchy
- **Notes**: Playwright tests - wszystkie muszą przejść

### Task: 5.2_visual_regression_check

- **Status**: PENDING
- **Type**: test
- **Target**: visual
- **Description**: Sprawdzenie regresji wizualnych
- **Priority**: P1
- **Estimated**: 10m
- **Dependencies**: 5.1_run_e2e_tests
- **Notes**: Porównanie przed/po, screenshots

### Task: 5.3_build_verification

- **Status**: PENDING
- **Type**: test
- **Target**: build
- **Description**: Weryfikacja poprawności buildu
- **Priority**: P0
- **Estimated**: 3m
- **Dependencies**: 5.1_run_e2e_tests
- **Notes**: npm run build, sprawdzenie bundle size

### Task: 5.4_css_lint_check

- **Status**: PENDING
- **Type**: test
- **Target**: scss
- **Description**: Sprawdzenie CSS linting
- **Priority**: P1
- **Estimated**: 2m
- **Dependencies**: 2.3_component_scss_refactor
- **Notes**: npm run lint:css

---

## Section: DOCUMENTATION

### Task: 6.1_update_copilot_instructions

- **Status**: PENDING
- **Type**: documentation
- **Target**: .github/copilot-instructions.md
- **Description**: Dodanie instrukcji używania checklisty SED
- **Priority**: P0
- **Estimated**: 15m
- **Dependencies**: none
- **Notes**: Sekcja o procesie optymalizacji, przykłady sed commands

### Task: 6.2_document_scss_structure

- **Status**: PENDING
- **Type**: documentation
- **Target**: .github/SCSS-STRUCTURE.md
- **Description**: Dokumentacja nowej struktury SCSS
- **Priority**: P1
- **Estimated**: 20m
- **Dependencies**: 4.1_create_mixin_categories
- **Notes**: Kategorie mixinów, naming conventions, usage examples

### Task: 6.3_create_optimization_guide

- **Status**: PENDING
- **Type**: documentation
- **Target**: .github/OPTIMIZATION-GUIDE.md
- **Description**: Przewodnik optymalizacji dla przyszłych zmian
- **Priority**: P2
- **Estimated**: 15m
- **Dependencies**: 6.2_document_scss_structure
- **Notes**: Best practices, anti-patterns, checklist workflow

---

## Summary Statistics

- **Total Tasks**: 21
- **Completed**: 0
- **In Progress**: 0
- **Pending**: 21
- **Blocked**: 0
- **Total Estimated Time**: 305 minutes (~5 hours)

---

## Priority Legend

- **P0**: Critical - Must be done
- **P1**: High - Should be done
- **P2**: Medium - Nice to have
- **P3**: Low - Optional

## Status Values

- **PENDING**: Not started
- **IN_PROGRESS**: Currently working
- **COMPLETED**: Finished
- **BLOCKED**: Waiting for dependencies
- **SKIPPED**: Intentionally not done

---

## SED Commands for Managing This Checklist

### Get task status

```bash
sed -n '/^### Task: TASK_ID$/,/^$/p' optimization-checklist.md | grep "Status:"
```

### Update task status

```bash
sed -i '/^### Task: TASK_ID$/,/^$/{s/Status: PENDING/Status: COMPLETED/}' optimization-checklist.md
```

### Get section summary

```bash
sed -n '/^## Section: SECTION_NAME$/,/^## Section:/p' optimization-checklist.md
```

### List all pending tasks

```bash
sed -n '/Status: PENDING/p' optimization-checklist.md
```

### Update timestamp

```bash
sed -i "s/<!-- UPDATED: .* -->/<!-- UPDATED: $(date +%Y-%m-%d) -->/" optimization-checklist.md
```

### Get task by ID

```bash
sed -n '/^### Task: TASK_ID$/,/^### Task:/p' optimization-checklist.md
```

### Count tasks by status

```bash
grep -c "Status: COMPLETED" optimization-checklist.md
```

---

## Usage Instructions

1. **Check current status**: Use grep to find pending tasks
2. **Start task**: Update status to IN_PROGRESS
3. **Complete task**: Update status to COMPLETED
4. **Dependencies**: Check Dependencies field before starting
5. **Update timestamp**: Run sed command after each session
6. **Track progress**: Count completed vs total tasks

Example workflow:

```bash
# Start task
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: PENDING/Status: IN_PROGRESS/}' .github/optimization-checklist.md

# Complete task
sed -i '/^### Task: 1.1_code_scan$/,/^$/{s/Status: IN_PROGRESS/Status: COMPLETED/}' .github/optimization-checklist.md

# Update timestamp
sed -i "s/<!-- UPDATED: .* -->/<!-- UPDATED: $(date +%Y-%m-%d) -->/" .github/optimization-checklist.md
```
