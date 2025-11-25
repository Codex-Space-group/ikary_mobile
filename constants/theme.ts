/**
 * IKARY PAY - Wallet App Theme
 * Sky Blue Gradient Theme with Modern Design
 */

import { Platform } from 'react-native';

// Sky Blue Gradient Colors
export const Colors = {
  // Primary Sky Blue Palette
  primary: '#0EA5E9', // Sky blue
  primaryDark: '#0284C7', // Darker sky blue
  primaryLight: '#38BDF8', // Lighter sky blue
  
  // Gradient Colors
  gradientStart: '#0EA5E9', // Sky blue
  gradientMiddle: '#38BDF8', // Light sky blue
  gradientEnd: '#7DD3FC', // Very light sky blue
  
  // Secondary Colors
  secondary: '#06B6D4', // Cyan
  accent: '#F59E0B', // Amber for highlights
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Text Colors
  textPrimary: '#1E293B', // Dark slate
  textSecondary: '#64748B', // Slate
  textLight: '#94A3B8', // Light slate
  textWhite: '#FFFFFF',
  
  // Background Colors
  background: '#F8FAFC', // Very light blue-gray
  backgroundCard: '#FFFFFF',
  backgroundDark: '#0F172A', // Dark slate
  
  // Border Colors
  border: '#E2E8F0', // Light slate
  borderLight: '#F1F5F9', // Very light slate
  
  // Status Colors
  statusActive: '#10B981',
  statusInactive: '#EF4444',
  statusPending: '#F59E0B',
  
  // Transaction Colors
  credit: '#10B981', // Green for money in
  debit: '#EF4444', // Red for money out
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Shadow
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

// Spacing System
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Typography
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

// Shadow Styles
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
