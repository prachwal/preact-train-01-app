# Bug Fixes & Mobile Optimization Checklist

**Created:** 2025-11-17
**Status:** IN_PROGRESS
**Total Tasks:** 14

<!-- UPDATED: 2025-11-17 -->

---

## Section: CRITICAL_BUGS

### Task: 1.1_switch_rerender

- **ID:** 1.1_switch_rerender
- **Status:** COMPLETED
- **Type:** BUG_FIX
- **Target:** src/ui/Switch.tsx
- **Description:** Switch nie ma rerenderingu po kliknięciu - fix signal reactivity
- **Priority:** P0
- **Estimated Time:** 10 min
- **Dependencies:** None
- **Notes:** Problem z onChange callback, potrzeba effect() lub computed()

### Task: 1.2_sidebar_background

- **ID:** 1.2_sidebar_background
- **Status:** COMPLETED
- **Type:** BUG_FIX
- **Target:** src/App.scss, src/styles/\_base.scss
- **Description:** Sidebar biały na ciemnym tle - brak --color-surface variable
- **Priority:** P0
- **Estimated Time:** 15 min
- **Dependencies:** None
- **Notes:** Dodać --pta-color-surface do CSS custom properties

### Task: 1.3_mobile_header_overflow

- **ID:** 1.3_mobile_header_overflow
- **Status:** COMPLETED
- **Type:** BUG_FIX
- **Target:** src/App.scss
- **Description:** Header ucieka nad ekran w widoku mobilnym
- **Priority:** P0
- **Estimated Time:** 10 min
- **Dependencies:** None
- **Notes:** Fix position: fixed z-index i padding-top dla .app-wrapper

### Task: 1.4_mobile_content_shift

- **ID:** 1.4_mobile_content_shift
- **Status:** COMPLETED
- **Type:** BUG_FIX
- **Target:** src/App.scss
- **Description:** Widok mobilny przesunięty - responsywność
- **Priority:** P0
- **Estimated Time:** 15 min
- **Dependencies:** 1.3_mobile_header_overflow
- **Notes:** Sprawdzić padding, margin, overflow dla mobile

---

## Section: COLOR_CONSISTENCY

### Task: 2.1_scss_audit

- **ID:** 2.1_scss_audit
- **Status:** PENDING
- **Type:** AUDIT
- **Target:** src/styles/
- **Description:** Kontrola spójności SCSS i kolorów z używanymi zmiennymi
- **Priority:** P1
- **Estimated Time:** 20 min
- **Dependencies:** 1.2_sidebar_background
- **Notes:** Sprawdzić wszystkie var(--pta-color-_) vs var(--color-_)

### Task: 2.2_surface_color_fix

- **ID:** 2.2_surface_color_fix
- **Status:** COMPLETED
- **Type:** ENHANCEMENT
- **Target:** src/styles/\_base.scss, \_themes.scss
- **Description:** Dodać --pta-color-surface do wszystkich motywów
- **Priority:** P0
- **Estimated Time:** 10 min
- **Dependencies:** 2.1_scss_audit
- **Notes:** Light: #ffffff, Dark: #1e1e1e lub podobne

---

## Section: MODAL_INTEGRATION

### Task: 3.1_edit_profile_modal

- **ID:** 3.1_edit_profile_modal
- **Status:** PENDING
- **Type:** NEW_FEATURE
- **Target:** src/pages/Settings.tsx
- **Description:** Dodać modal do przycisku "Edit Profile" z formularzem
- **Priority:** P1
- **Estimated Time:** 20 min
- **Dependencies:** None
- **Notes:** Mockup z polami: Full Name, Email, Role

### Task: 3.2_change_password_modal

- **ID:** 3.2_change_password_modal
- **Status:** PENDING
- **Type:** NEW_FEATURE
- **Target:** src/pages/Settings.tsx
- **Description:** Dodać modal do "Change Password" z formularzem
- **Priority:** P1
- **Estimated Time:** 20 min
- **Dependencies:** None
- **Notes:** Pola: Current Password, New Password, Confirm Password

### Task: 3.3_delete_account_modal

- **ID:** 3.3_delete_account_modal
- **Status:** PENDING
- **Type:** NEW_FEATURE
- **Target:** src/pages/Settings.tsx
- **Description:** Dodać modal potwierdzenia dla "Delete Account"
- **Priority:** P1
- **Estimated Time:** 15 min
- **Dependencies:** None
- **Notes:** Ostrzeżenie + potwierdzenie tekstem "DELETE"

---

## Section: NEW_PAGES

### Task: 4.1_documentation_page

- **ID:** 4.1_documentation_page
- **Status:** PENDING
- **Type:** NEW_PAGE
- **Target:** src/pages/Documentation.tsx
- **Description:** Utworzyć stronę Documentation z API docs i guides
- **Priority:** P2
- **Estimated Time:** 30 min
- **Dependencies:** None
- **Notes:** Mockup z sekcjami: Getting Started, API, Components

### Task: 4.2_report_issue_page

- **ID:** 4.2_report_issue_page
- **Status:** PENDING
- **Type:** NEW_PAGE
- **Target:** src/pages/ReportIssue.tsx
- **Description:** Utworzyć stronę Report Issue z formularzem
- **Priority:** P2
- **Estimated Time:** 25 min
- **Dependencies:** None
- **Notes:** Formularz: Title, Description, Priority, Category

### Task: 4.3_github_package_json

- **ID:** 4.3_github_package_json
- **Status:** COMPLETED
- **Type:** CONFIG
- **Target:** package.json
- **Description:** Dodać pełną konfigurację NPM: repository, bugs, homepage
- **Priority:** P1
- **Estimated Time:** 10 min
- **Dependencies:** None
- **Notes:** Repository URL, bug tracker, homepage

### Task: 4.4_dynamic_github_link

- **ID:** 4.4_dynamic_github_link
- **Status:** PENDING
- **Type:** INTEGRATION
- **Target:** src/pages/About.tsx
- **Description:** Wstrzyknąć URL GitHub z package.json do przycisku
- **Priority:** P1
- **Estimated Time:** 10 min
- **Dependencies:** 4.3_github_package_json
- **Notes:** Użyć packageJson.repository.url

---

## Section: ROUTING_UPDATES

### Task: 5.1_add_routes

- **ID:** 5.1_add_routes
- **Status:** PENDING
- **Type:** ROUTING
- **Target:** src/App.tsx, src/pages/index.ts
- **Description:** Dodać routes dla Documentation i ReportIssue
- **Priority:** P2
- **Estimated Time:** 5 min
- **Dependencies:** 4.1_documentation_page, 4.2_report_issue_page
- **Notes:** /documentation i /report-issue

---

## Progress Summary

- **Total Tasks:** 14
- **Completed:** 0
- **In Progress:** 0
- **Pending:** 14
- **Blocked:** 0

---

## SED Commands for Status Tracking

```bash
# Update task to IN_PROGRESS
sed -i '/^### Task: 1.1_switch_rerender$/,/^### Task:/{s/\*\*Status:\*\* PENDING/\*\*Status:\*\* IN_PROGRESS/}' .github/bug-fixes-checklist.md

# Mark as COMPLETED
sed -i '/^### Task: 1.1_switch_rerender$/,/^### Task:/{s/\*\*Status:\*\* IN_PROGRESS/\*\*Status:\*\* COMPLETED/}' .github/bug-fixes-checklist.md

# Count completed
grep -c "\*\*Status:\*\* COMPLETED" .github/bug-fixes-checklist.md

# List pending P0 tasks
grep -B 5 "Priority: P0" .github/bug-fixes-checklist.md | grep "Status: PENDING"

# Update timestamp
sed -i "s/<!-- UPDATED: .* -->/<!-- UPDATED: $(date +%Y-%m-%d) -->/" .github/bug-fixes-checklist.md
```

---

**End of Checklist**
