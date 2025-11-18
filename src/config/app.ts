// Application configuration
// This file contains runtime configuration values

// Base URL for routing (from Vite environment or fallback to import.meta.env.BASE_URL)
export const BASE_URL =
  import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || '/';

// Helper function to create full URLs
export const createUrl = (path: string): string => {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine base URL with path
  return `${BASE_URL}${cleanPath}`;
};

// Helper function to check if URL is external
export const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//')
  );
};
