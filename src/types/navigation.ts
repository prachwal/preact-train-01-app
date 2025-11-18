// Navigation Types for Multi-level Navigation System

import type { ComponentChildren } from 'preact';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: ComponentChildren;
  path?: string;
  anchor?: string; // For anchor links like #section
  children?: NavigationItem[];
  external?: boolean;
  badge?: string; // Optional badge text (e.g., "New", "Beta")
  disabled?: boolean;
  hidden?: boolean; // Hide from sidebar navigation (but keep in routing)
}

export interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationItem[];
}

export interface NavigationConfig {
  groups: NavigationGroup[];
}

export interface ActiveNavigationState {
  activeItemId: string | null;
  activeParentId: string | null;
  expandedIds: string[];
}
