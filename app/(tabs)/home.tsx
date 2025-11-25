import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { TransactionItem } from '@/components/ui/TransactionItem';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Transaction, WalletService } from '@/services/wallet.service';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
  const { user, refreshUser } = useAuth();
  const [balance, setBalance] = useState('0.00');
  const [accountNumber, setAccountNumber] = useState('');
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [balanceData, transactionsData] = await Promise.all([
        WalletService.getBalance(),
        WalletService.getTransactions(1, 5),
      ]);

      setBalance(balanceData.balance);
      setAccountNumber(balanceData.accountNumber);
      setRecentTransactions(transactionsData.transactions);
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec du chargement des données du portefeuille');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadData(), refreshUser()]);
    setRefreshing(false);
  }, []);

  if (loading) {
    return <Loading fullScreen message="Chargement de votre portefeuille..." />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bon retour,</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => Alert.alert('Notifications', 'Aucune nouvelle notification')}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Solde Total</Text>
            <TouchableOpacity onPress={onRefresh}>
              <Ionicons name="refresh" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>{parseFloat(balance).toFixed(2)} XFA</Text>
          <Text style={styles.accountNumber}>Compte: {accountNumber}</Text>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Recharge', 'Contactez l\'administrateur pour recharger votre portefeuille')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="add" size={24} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>Recharger</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/transactions' as any)}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="list" size={24} color={Colors.info} />
              </View>
              <Text style={styles.actionText}>Historique</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transactions Récentes</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/transactions' as any)}>
              <Text style={styles.seeAll}>Voir Tout</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length === 0 ? (
            <Card>
              <View style={styles.emptyState}>
                <Ionicons name="receipt-outline" size={48} color={Colors.textLight} />
                <Text style={styles.emptyText}>Aucune transaction</Text>
                <Text style={styles.emptySubtext}>
                  Votre historique de transactions apparaîtra ici
                </Text>
              </View>
            </Card>
          ) : (
            recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          )}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="card-outline" size={32} color={Colors.primary} />
              <Text style={styles.featureTitle}>Épargne</Text>
              <Text style={styles.featureSubtitle}>Bientôt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="gift-outline" size={32} color={Colors.accent} />
              <Text style={styles.featureTitle}>Récompenses</Text>
              <Text style={styles.featureSubtitle}>Bientôt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="analytics-outline" size={32} color={Colors.success} />
              <Text style={styles.featureTitle}>Analytiques</Text>
              <Text style={styles.featureSubtitle}>Bientôt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="help-circle-outline" size={32} color={Colors.info} />
              <Text style={styles.featureTitle}>Support</Text>
              <Text style={styles.featureSubtitle}>Obtenir de l'aide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
  },
  userName: {
    ...Typography.h3,
    color: Colors.white,
    fontWeight: '700',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: -40,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  balanceLabel: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.9,
  },
  balanceAmount: {
    ...Typography.h1,
    fontSize: 40,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  accountNumber: {
    ...Typography.caption,
    color: Colors.white,
    opacity: 0.8,
    fontFamily: 'monospace',
    marginBottom: Spacing.lg,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  actionText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  seeAll: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginTop: Spacing.md,
  },
  emptySubtext: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  featureTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  featureSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
