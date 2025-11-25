import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  noShadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  noPadding = false,
  noShadow = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        !noPadding && styles.cardPadding,
        !noShadow && Shadows.small,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  cardPadding: {
    padding: Spacing.lg,
  },
});
