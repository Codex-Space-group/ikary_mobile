import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { Transaction } from '@/services/wallet.service';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const isCredit = transaction.type === 'CREDIT';
  const iconName = isCredit ? 'arrow-down-circle' : 'arrow-up-circle';
  const iconColor = isCredit ? Colors.credit : Colors.debit;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Aujourd\'hui';
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description || (isCredit ? 'Argent Reçu' : 'Paiement')}
        </Text>
        <Text style={styles.date}>
          {formatDate(transaction.createdAt)} • {formatTime(transaction.createdAt)}
        </Text>
        <Text style={styles.reference} numberOfLines={1}>
          {transaction.reference}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: iconColor }]}>
          {isCredit ? '+' : '-'}{parseFloat(transaction.amount).toFixed(2)} XFA
        </Text>
        <Text style={styles.balance}>
          Solde: {parseFloat(transaction.balanceAfter).toFixed(2)} XFA
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    marginRight: Spacing.md,
  },
  description: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  date: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  reference: {
    ...Typography.caption,
    color: Colors.textLight,
    fontFamily: 'monospace',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    ...Typography.body,
    fontWeight: '700',
    marginBottom: 2,
  },
  balance: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
