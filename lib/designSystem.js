// Design System - Centralized constants and tokens

export const COLORS = {
  PRIMARY: '#4361EE',
  SECONDARY: '#06D6A0',
  ACCENT: '#FFB703',
  DANGER: '#EF476F',
  DARK: '#2B2D42',
  LIGHT: '#F8F9FA',
  WHITE: '#FFFFFF',
  GRAY: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const TYPOGRAPHY = {
  FONT_FAMILY: {
    HEADING: "'Poppins', sans-serif",
    BODY: "'Inter', sans-serif",
    MONO: "'Roboto Mono', monospace",
  },
  FONT_SIZE: {
    XS: '12px',
    SM: '14px',
    BASE: '16px',
    LG: '18px',
    XL: '20px',
    '2XL': '24px',
    '3XL': '32px',
    '4XL': '40px',
  },
  FONT_WEIGHT: {
    REGULAR: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
  },
};

export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
  XL: '32px',
};

export const SHADOWS = {
  NONE: 'none',
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  BASE: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  CARD: '0 2px 8px rgba(0, 0, 0, 0.1)',
  HOVER: '0 4px 16px rgba(0, 0, 0, 0.15)',
};

export const BORDER_RADIUS = {
  NONE: '0',
  SM: '4px',
  BASE: '8px',
  MD: '12px',
  LG: '16px',
  FULL: '9999px',
};

export const BREAKPOINTS = {
  MOBILE: '640px',
  TABLET: '768px',
  DESKTOP: '1024px',
  WIDE: '1280px',
};

export const TRANSITIONS = {
  FAST: '150ms ease-in-out',
  BASE: '200ms ease-in-out',
  SLOW: '300ms ease-in-out',
};

export const STATUS = {
  ACTIVE: { label: 'Active', color: '#06D6A0', bgColor: '#E6F9F5' },
  INACTIVE: { label: 'Inactive', color: '#9CA3AF', bgColor: '#F3F4F6' },
  PENDING: { label: 'Pending', color: '#FFB703', bgColor: '#FEF3C7' },
  COMPLETED: { label: 'Completed', color: '#06D6A0', bgColor: '#E6F9F5' },
  FAILED: { label: 'Failed', color: '#EF476F', bgColor: '#FCE7EB' },
};

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{10,}$/,
  ID_REGEX: /^[A-Z0-9]{8,}$/,
};
