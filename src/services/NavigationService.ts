// Navigation Service
// Manages navigation state, active item tracking, and navigation data

import { signal } from '@preact/signals';
import type {
  NavigationConfig,
  NavigationItem,
  ActiveNavigationState,
} from '../types/navigation';
import { navigationConfig } from '../data/navigation';
import { getVisibleNavigationItems } from '../utils/navigation';

// Signals for reactive navigation state
export const activeNavigationSignal = signal<ActiveNavigationState>({
  activeItemId: null,
  activeParentId: null,
  expandedIds: [],
});

export class NavigationService {
  private config: NavigationConfig;

  constructor(config: NavigationConfig = navigationConfig) {
    this.config = config;
  }

  /**
   * Get all navigation items flattened
   */
  getAllItems(): NavigationItem[] {
    const items: NavigationItem[] = [];
    this.config.groups.forEach(group => {
      group.items.forEach(item => {
        items.push(item);
        if (item.children) {
          items.push(...item.children);
        }
      });
    });
    return items;
  }

  /**
   * Find navigation item by ID
   */
  findItemById(id: string): NavigationItem | null {
    const allItems = this.getAllItems();
    return allItems.find(item => item.id === id) || null;
  }

  /**
   * Find navigation item by path
   */
  findItemByPath(path: string, anchor?: string): NavigationItem | null {
    const allItems = this.getAllItems();

    // If anchor is provided, look for exact match with anchor
    if (anchor) {
      const itemWithAnchor = allItems.find(
        item => item.path === path && item.anchor === anchor
      );
      if (itemWithAnchor) return itemWithAnchor;
    }

    // Otherwise find by path
    return allItems.find(item => item.path === path) || null;
  }

  /**
   * Get parent of a navigation item
   */
  getParentItem(itemId: string): NavigationItem | null {
    for (const group of this.config.groups) {
      for (const item of group.items) {
        if (item.children) {
          const child = item.children.find(c => c.id === itemId);
          if (child) return item;
        }
      }
    }
    return null;
  }

  /**
   * Check if item has children
   */
  hasChildren(itemId: string): boolean {
    const item = this.findItemById(itemId);
    return !!(item && item.children && item.children.length > 0);
  }

  /**
   * Set active navigation item
   */
  setActiveItem(itemId: string | null) {
    const parent = itemId ? this.getParentItem(itemId) : null;

    activeNavigationSignal.value = {
      activeItemId: itemId,
      activeParentId: parent?.id || null,
      expandedIds: parent ? [parent.id] : [],
    };
  }

  /**
   * Set active item by path and optional anchor
   */
  setActiveByPath(path: string, anchor?: string) {
    // If anchor provided, find exact match with both path and anchor
    if (anchor) {
      const item = this.findItemByPath(path, anchor);
      if (item) {
        this.setActiveItem(item.id);
        return;
      }
    }

    // Otherwise find by path only
    const pathItem = this.findItemByPath(path);
    if (pathItem) {
      // Check if this item has children
      const hasChildren = pathItem.children && pathItem.children.length > 0;

      if (hasChildren) {
        // For parent items with children, only set as parent-active (expanded)
        // without setting activeItemId
        activeNavigationSignal.value = {
          activeItemId: null, // No specific child is active yet
          activeParentId: pathItem.id,
          expandedIds: [pathItem.id], // Auto-expand parent
        };
      } else {
        // For items without children, set as active normally
        this.setActiveItem(pathItem.id);
      }
    }
  }

  /**
   * Toggle expanded state for parent items
   */
  toggleExpanded(itemId: string) {
    const current = activeNavigationSignal.value;
    const expandedIds = [...current.expandedIds];
    const index = expandedIds.indexOf(itemId);

    if (index > -1) {
      expandedIds.splice(index, 1);
    } else {
      expandedIds.push(itemId);
    }

    activeNavigationSignal.value = {
      ...current,
      expandedIds,
    };
  }

  /**
   * Check if item is expanded
   */
  isExpanded(itemId: string): boolean {
    return activeNavigationSignal.value.expandedIds.includes(itemId);
  }

  /**
   * Check if item is active
   */
  isActive(itemId: string): boolean {
    return activeNavigationSignal.value.activeItemId === itemId;
  }

  /**
   * Check if item's parent is active
   */
  isParentActive(itemId: string): boolean {
    return activeNavigationSignal.value.activeParentId === itemId;
  }

  /**
   * Get navigation configuration
   */
  getConfig(): NavigationConfig {
    return this.config;
  }

  /**
   * Build full URL with path and anchor
   */
  buildUrl(item: NavigationItem): string {
    if (item.external) return item.path || '#';
    const base = item.path || '#';
    return item.anchor ? `${base}${item.anchor}` : base;
  }
}

// Export singleton instance
export const navigationService = new NavigationService();
