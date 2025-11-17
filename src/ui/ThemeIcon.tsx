import type { ThemeIconProps } from '../types/component-props';

export function ThemeIcon({ theme, className }: ThemeIconProps) {
  if (theme === 'light') {
    return (
      <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Light theme"
      >
        <circle
          cx="10"
          cy="10"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="10"
          y1="1"
          x2="10"
          y2="3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="17"
          x2="10"
          y2="19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="19"
          y1="10"
          x2="17"
          y2="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="10"
          x2="1"
          y2="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="15.95"
          y1="4.05"
          x2="14.54"
          y2="5.46"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="5.46"
          y1="14.54"
          x2="4.05"
          y2="15.95"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="15.95"
          y1="15.95"
          x2="14.54"
          y2="14.54"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="5.46"
          y1="5.46"
          x2="4.05"
          y2="4.05"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (theme === 'dark') {
    return (
      <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dark theme"
      >
        <path
          d="M17 10.5C16.6 14.4 13.4 17.6 9.5 18C5.6 18.4 2.1 16 1 12.4C0.4 10.4 0.8 8.2 2 6.5C2.2 6.2 2.2 5.8 2 5.5C1.8 5.2 1.4 5.1 1.1 5.3C0.4 5.7 -0.1 6.4 0 7.2C0 7.5 0.1 7.8 0.3 8C1.9 11.7 5.8 13.9 9.8 13.5C13.8 13.1 16.9 10 17.3 6C17.4 5.2 17.1 4.5 16.5 4C16.2 3.8 15.8 3.8 15.5 4C15.2 4.2 15.1 4.6 15.3 4.9C15.9 5.8 16.2 6.9 16.1 8C16 8.8 16 9.7 17 10.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // auto theme
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Auto theme"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M10 2 V18" stroke="currentColor" strokeWidth="2" />
      <path d="M2 10 L10 10 L10 2 L2 2 L2 10 Z" fill="currentColor" />
    </svg>
  );
}
