// Document Management System Color Palette
export const COLORS = {
  // Primary Colors
  primary: {
    main: '#2563EB', // Primary blue
    light: '#60A5FA',
    dark: '#1E40AF',
    contrast: '#FFFFFF',
  },
  
  // Secondary Colors
  secondary: {
    main: '#4B5563', // Gray
    light: '#9CA3AF',
    dark: '#1F2937',
    contrast: '#FFFFFF',
  },
  
  // Success Colors
  success: {
    main: '#059669', // Green
    light: '#34D399',
    dark: '#065F46',
    contrast: '#FFFFFF',
  },
  
  // Warning Colors
  warning: {
    main: '#D97706', // Amber
    light: '#FBBF24',
    dark: '#92400E',
    contrast: '#FFFFFF',
  },
  
  // Error Colors
  error: {
    main: '#DC2626', // Red
    light: '#F87171',
    dark: '#991B1B',
    contrast: '#FFFFFF',
  },
  
  // Info Colors
  info: {
    main: '#3B82F6', // Blue
    light: '#93C5FD',
    dark: '#1E40AF',
    contrast: '#FFFFFF',
  },
  
  // Document Status Colors
  documentStatus: {
    draft: '#9CA3AF', // Gray
    inReview: '#F59E0B', // Amber
    approved: '#10B981', // Green
    rejected: '#EF4444', // Red
    archived: '#6B7280', // Gray
  },
  
  // Background Colors
  background: {
    default: '#F9FAFB',
    paper: '#FFFFFF',
    dark: '#1F2937',
  },
  
  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    disabled: '#9CA3AF',
    hint: '#6B7280',
  },
  
  // Border Colors
  border: {
    light: '#E5E7EB',
    main: '#D1D5DB',
    dark: '#9CA3AF',
  },
  
  // Action Colors
  action: {
    active: '#2563EB',
    hover: '#1D4ED8',
    selected: '#1E40AF',
    disabled: '#9CA3AF',
    disabledBackground: '#F3F4F6',
  },
  
  // Chart Colors
  chart: {
    line: '#3B82F6',
    area: '#93C5FD',
    bar: '#60A5FA',
    pie: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  },
};

// Theme Modes
export const THEME_MODES = {
  light: {
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
    },
    border: {
      light: COLORS.border.light,
      main: COLORS.border.main,
    },
  },
  dark: {
    background: {
      default: COLORS.background.dark,
      paper: '#2D3748',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#E5E7EB',
    },
    border: {
      light: '#4B5563',
      main: '#6B7280',
    },
  },
};

// Utility function to get theme colors based on mode
export const getThemeColors = (isDarkMode: boolean) => {
  return {
    ...COLORS,
    mode: isDarkMode ? THEME_MODES.dark : THEME_MODES.light,
  };
};

// Type definitions
export type ThemeColors = typeof COLORS;
export type ThemeMode = typeof THEME_MODES.light | typeof THEME_MODES.dark; 