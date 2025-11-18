// Navigation utilities for dynamic routing and navigation management

import type { NavigationConfig, NavigationItem } from '../types/navigation';

/**
 * Flattens navigation config into a list of all routable items
 * Excludes external links and items without components
 */
export function getRoutableItems(config: NavigationConfig): NavigationItem[] {
  const routableItems: NavigationItem[] = [];

  function traverseItems(items: NavigationItem[]) {
    for (const item of items) {
      // Include items that have components (routable)
      if (item.component && !item.external) {
        routableItems.push(item);
      }

      // Recursively check children
      if (item.children) {
        traverseItems(item.children);
      }
    }
  }

  for (const group of config.groups) {
    traverseItems(group.items);
  }

  return routableItems;
}

/**
 * Gets navigation items that should be visible in the sidebar
 * Excludes hidden items
 */
export function getVisibleNavigationItems(
  config: NavigationConfig
): NavigationItem[] {
  function traverseItems(items: NavigationItem[]): NavigationItem[] {
    return items
      .filter(item => !item.hidden)
      .map(item => {
        const visibleItem: NavigationItem = {
          ...item,
        };
        if (item.children) {
          visibleItem.children = traverseItems(item.children);
        }
        return visibleItem;
      });
  }

  return config.groups.flatMap(group => traverseItems(group.items));
}

/**
 * Finds a navigation item by path
 */
export function findItemByPath(
  config: NavigationConfig,
  path: string
): NavigationItem | null {
  function searchItems(items: NavigationItem[]): NavigationItem | null {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = searchItems(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  for (const group of config.groups) {
    const found = searchItems(group.items);
    if (found) return found;
  }

  return null;
}
