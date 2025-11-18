// Navigation Component - Two-level sidebar navigation with accordion behavior

import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import type { NavigationItem } from '../types/navigation';
import {
  navigationService,
  activeNavigationSignal,
} from '../services/NavigationService';
import { Typography } from '../ui';
import './Navigation.scss';

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  onNavigate?: () => void; // Callback for mobile menu close
}

export function Navigation({ onNavigate }: NavigationProps) {
  const location = useLocation();
  const activeState = activeNavigationSignal.value;
  const config = navigationService.getConfig();

  // Update active item based on current route
  useEffect(() => {
    const hash = window.location.hash;
    const anchor = hash ? hash : undefined;
    navigationService.setActiveByPath(location.path, anchor);
  }, [location.path]);

  // Handle hash changes (anchor navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        navigationService.setActiveByPath(location.path, hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.path]);

  // Check for scrollable content in sidebar
  useEffect(() => {
    const aside = document.querySelector('.app-aside');
    if (!aside) return;

    const checkScroll = () => {
      if (aside.scrollHeight > aside.clientHeight) {
        aside.classList.add('has-scroll');
      } else {
        aside.classList.remove('has-scroll');
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Debug: Check child background colors after expand/collapse
  useEffect(() => {
    const checkChildStyles = () => {
      const childLinks = document.querySelectorAll(
        '.pta-nav-item--level-1 .pta-nav-item__link'
      );
      console.log('🔍 Child elements background colors:');
      childLinks.forEach((link, index) => {
        const computedStyle = window.getComputedStyle(link);
        const backgroundColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        const hasActiveClass = link
          .closest('.pta-nav-item')
          ?.classList.contains('pta-nav-item--active');

        console.log(`  Child ${index + 1}:`, {
          backgroundColor,
          color,
          hasActiveClass,
          classes: link.closest('.pta-nav-item')?.className,
        });
      });
    };

    // Check immediately and after a short delay to catch dynamic changes
    checkChildStyles();
    const timeoutId = setTimeout(checkChildStyles, 100);

    return () => clearTimeout(timeoutId);
  }, [activeState]); // Re-run when active state changes

  const handleItemClick = (item: NavigationItem, e: Event) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    // Handle parent items with children (accordion toggle)
    if (item.children && item.children.length > 0) {
      e.preventDefault();
      navigationService.toggleExpanded(item.id);
      return;
    }

    // Handle external links
    if (item.external) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
      e.preventDefault();
      return;
    }

    // Set active item
    navigationService.setActiveItem(item.id);

    // Handle anchor links with smooth scroll
    if (item.anchor) {
      e.preventDefault();
      const targetId = item.anchor.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without jumping
        window.history.pushState(null, '', `${item.path}${item.anchor}`);
        // Update navigation state
        if (item.path) {
          navigationService.setActiveByPath(item.path, item.anchor);
        }
      }
    }

    // Close mobile menu if callback provided
    if (onNavigate) {
      onNavigate();
    }
  };

  const renderNavItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = navigationService.isExpanded(item.id);
    const currentHash = window.location.hash;
    const currentPath = window.location.pathname;

    // Logika isActive (POPRAWIONA):
    // - Dla itemów z anchor (dzieci): aktywny tylko gdy hash się zgadza I path się zgadza
    // - Dla itemów bez dzieci (Home, About, etc.): aktywny tylko gdy path się zgadza I nie ma hash
    // - Dla parent items (z dziećmi): nigdy nie jest "active", tylko może być "parent-active"
    let isActive = false;
    if (item.anchor) {
      // Item z anchor - aktywny gdy path i hash się zgadzają
      isActive =
        currentPath === item.path &&
        currentHash === item.anchor &&
        navigationService.isActive(item.id);
    } else if (!hasChildren) {
      // Item bez dzieci - aktywny gdy path się zgadza I nie ma hash
      isActive =
        currentPath === item.path &&
        !currentHash &&
        navigationService.isActive(item.id);
    }
    // Jeśli hasChildren - isActive pozostaje false

    // Parent jest parent-active gdy ma dzieci i jedno z nich jest aktywne
    const isParentActive =
      hasChildren && navigationService.isParentActive(item.id);

    const itemClasses = [
      'pta-nav-item',
      `pta-nav-item--level-${level}`,
      isActive && 'pta-nav-item--active',
      isParentActive && 'pta-nav-item--parent-active',
      item.disabled && 'pta-nav-item--disabled',
      hasChildren && 'pta-nav-item--has-children',
      isExpanded && 'pta-nav-item--expanded',
    ]
      .filter(Boolean)
      .join(' ');

    const url = navigationService.buildUrl(item);

    return (
      <div key={item.id} className={itemClasses}>
        <a
          href={url}
          className="pta-nav-item__link"
          onClick={e => handleItemClick(item, e)}
          aria-disabled={item.disabled}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {item.icon && <span className="pta-nav-item__icon">{item.icon}</span>}
          <span className="pta-nav-item__label">{item.label}</span>
          {item.badge && (
            <span className="pta-nav-item__badge">{item.badge}</span>
          )}
          {hasChildren && (
            <span className="pta-nav-item__arrow">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          {item.external && (
            <span
              className="pta-nav-item__external"
              aria-label="Opens in new tab"
            >
              ↗
            </span>
          )}
        </a>

        {hasChildren && isExpanded && (
          <div className="pta-nav-children">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="pta-navigation" aria-label="Main navigation">
      {config.groups.map(group => (
        <div key={group.id} className="pta-nav-group">
          {group.title && (
            <Typography
              variant="caption"
              color="tertiary"
              className="pta-nav-group__title"
            >
              {group.title}
            </Typography>
          )}
          <div className="pta-nav-group__items">
            {group.items
              .filter(item => !item.hidden)
              .map(item => renderNavItem(item, 0))}
          </div>
        </div>
      ))}
    </nav>
  );
}
