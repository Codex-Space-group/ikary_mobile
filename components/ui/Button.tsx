import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}) => {
  const isDisabled = disabled || loading;

  const getButtonContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
          size="small"
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[styles.text, getTextStyle(), icon ? styles.textWithIcon : null]}>
            {title}
          </Text>
        </>
      )}
    </>
  );

  const getTextStyle = (): TextStyle => {
    const baseStyle = {
      ...Typography.button,
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, color: Colors.white };
      case 'secondary':
        return { ...baseStyle, color: Colors.white };
      case 'outline':
        return { ...baseStyle, color: Colors.primary };
      case 'ghost':
        return { ...baseStyle, color: Colors.primary };
      default:
        return baseStyle;
    }
  };

  const getButtonStyle = () => {
    const baseStyles: any[] = [
      styles.button,
      size === 'small' && styles.buttonSmall,
      size === 'large' && styles.buttonLarge,
      fullWidth && styles.fullWidth,
      isDisabled && styles.disabled,
      style,
    ].filter(Boolean);

    if (variant === 'outline') {
      return [...baseStyles, styles.outline];
    }
    if (variant === 'ghost') {
      return [...baseStyles, styles.ghost];
    }
    if (variant === 'secondary') {
      return [...baseStyles, styles.secondary];
    }
    if (variant === 'primary') {
      return [...baseStyles, styles.primary];
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={getButtonStyle()}
    >
      {getButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.small,
  },
  buttonSmall: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  buttonLarge: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  primary: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.lg - 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: Spacing.sm,
  },
});
