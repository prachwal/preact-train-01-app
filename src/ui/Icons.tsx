import type { JSX } from 'preact';
import { h } from 'preact';
import {
  X,
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
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';

/**
 * Icon Components
 *
 * Centralized icon library using Lucide React icons for consistency and performance.
 * All icons are tree-shakeable and professionally designed.
 */

// Social Media Icons
export const XIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (X as any)({ className, size: 20, 'aria-label': 'X (formerly Twitter)' });

export const GitHubIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Github as any)({ className, size: 20, 'aria-label': 'GitHub' });

export const DiscordIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (MessageCircle as any)({ className, size: 20, 'aria-label': 'Discord' });

export const YouTubeIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Youtube as any)({ className, size: 20, 'aria-label': 'YouTube' });

export const InstagramIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Instagram as any)({ className, size: 20, 'aria-label': 'Instagram' });

export const FacebookIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Facebook as any)({ className, size: 20, 'aria-label': 'Facebook' });

export const LinkedInIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Linkedin as any)({ className, size: 20, 'aria-label': 'LinkedIn' });

// Theme Icons
export const LightThemeIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Sun as any)({ className, size: 20, 'aria-label': 'Light theme' });

export const DarkThemeIcon = ({
  className,
}: {
  className?: string | undefined;
}): JSX.Element =>
  (Moon as any)({ className, size: 20, 'aria-label': 'Dark theme' });

export const AutoThemeIcon = ({
  className,
}: {
  className?: string | undefined;
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
