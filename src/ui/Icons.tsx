import type { JSX } from 'preact';
import { h } from 'preact';
import {
  Twitter,
  Github,
  MessageCircle,
  Sun,
  Moon,
  Monitor,
  MapPin,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  Clipboard,
  Palette,
  Bell,
  Lock,
  Wrench,
  Info,
  BookOpen,
  Monitor as ComputerIcon,
  Scroll,
  DollarSign,
  Users,
  Package,
  Mail,
  Tag,
  Clock,
  Shield,
} from 'lucide-react';

/**
 * Icon Components
 *
 * Centralized icon library using Lucide React icons for consistency and performance.
 * All icons are tree-shakeable and professionally designed.
 */

// Social Media Icons
export const TwitterIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (Twitter as any)({ className, size: 20, 'aria-label': 'Twitter' });

export const GitHubIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (Github as any)({ className, size: 20, 'aria-label': 'GitHub' });

export const DiscordIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (MessageCircle as any)({ className, size: 20, 'aria-label': 'Discord' });

// Theme Icons
export const LightThemeIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (Sun as any)({ className, size: 20, 'aria-label': 'Light theme' });

export const DarkThemeIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (Moon as any)({ className, size: 20, 'aria-label': 'Dark theme' });

export const AutoThemeIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element =>
  (Monitor as any)({ className, size: 20, 'aria-label': 'Auto theme' });

// Icon Constants using Lucide icon components
export const ICONS = {
  POLAND: h(MapPin as any, { size: 16 }),
  UK: h(MapPin as any, { size: 16 }),
  GERMANY: h(MapPin as any, { size: 16 }),
  FRANCE: h(MapPin as any, { size: 16 }),
  SPAIN: h(MapPin as any, { size: 16 }),
  PROFILE: h(User as any, { size: 16 }),
  GEAR: h(Settings as any, { size: 16 }),
  HELP: h(HelpCircle as any, { size: 16 }),
  LOGOUT: h(LogOut as any, { size: 16 }),
  HOME: h(Home as any, { size: 16 }),
  CLIPBOARD: h(Clipboard as any, { size: 16 }),
  PALETTE: h(Palette as any, { size: 16 }),
  BELL: h(Bell as any, { size: 16 }),
  LOCK: h(Lock as any, { size: 16 }),
  WRENCH: h(Wrench as any, { size: 16 }),
  INFO: h(Info as any, { size: 16 }),
  BOOKS: h(BookOpen as any, { size: 16 }),
  COMPUTER: h(ComputerIcon as any, { size: 16 }),
  SCROLL: h(Scroll as any, { size: 16 }),
  MONEY: h(DollarSign as any, { size: 16 }),
  PEOPLE: h(Users as any, { size: 16 }),
  PACKAGE: h(Package as any, { size: 16 }),
  ENVELOPE: h(Mail as any, { size: 16 }),
  TAG: h(Tag as any, { size: 16 }),
  CLOCK: h(Clock as any, { size: 16 }),
  SHIELD: h(Shield as any, { size: 16 }),
  USER: h(User as any, { size: 16 }),
  DOLLAR: h(DollarSign as any, { size: 16 }),
  SETTINGS: h(Settings as any, { size: 16 }),
} as const;

export type IconName = keyof typeof ICONS;
