import { Loading } from '@/components/ui/Loading';
import { TransactionItem } from '@/components/ui/TransactionItem';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { Transaction, WalletService } from '@/services/wallet.service';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [filter]);

  const loadTransactions = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      
      const filterType = filter === 'ALL' ? undefined : filter;
      const data = await WalletService.getTransactions(pageNum, 20, filterType);
      
      if (pageNum === 1) {
        setTransactions(data.transactions);
      } else {
        setTransactions([...transactions, ...data.transactions]);
      }
      
      setHasMore(data.pagination.page < data.pagination.totalPages);
      setPage(pageNum);
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec du chargement des transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions(1);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadTransactions(page + 1);
    }
  };

  const renderFilter = (type: 'ALL' | 'CREDIT' | 'DEBIT', label: string, icon: any) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === type && styles.filterButtonActive]}
      onPress={() => setFilter(type)}
    >
      <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading && transactions.length === 0) {
    return <Loading fullScreen message="Chargement des transactions..." />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Voir l'historique de vos transactions</Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {renderFilter('ALL', 'Tout', 'list-outline')}
        {renderFilter('CREDIT', 'Crédit', 'arrow-down-circle-outline')}
        {renderFilter('DEBIT', 'Débit', 'arrow-up-circle-outline')}
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionWrapper}>
            <TransactionItem
              transaction={item}
              onPress={() =>
                Alert.alert(
                  'Détails de la transaction',
                  `Référence: ${item.reference}\nMontant: ${item.amount} XFA\nType: ${item.type}\nDate: ${new Date(item.createdAt).toLocaleString()}\nSolde avant: ${item.balanceBefore} XFA\nSolde après: ${item.balanceAfter} XFA`
                )
              }
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={Colors.textLight} />
            <Text style={styles.emptyText}>Aucune transaction trouvée</Text>
            <Text style={styles.emptySubtext}>
              {filter === 'ALL'
                ? 'Vos transactions apparaîtront ici'
                : `Aucune transaction de type ${filter.toLowerCase()} trouvée`}
            </Text>
          </View>
        }
        ListFooterComponent={
          loading && transactions.length > 0 ? (
            <Loading message="Loading more..." />
          ) : null
        }
      />
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
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    ...Typography.h2,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContent: {
    flexGrow: 1,
  },
  transactionWrapper: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyText: {
    ...Typography.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
