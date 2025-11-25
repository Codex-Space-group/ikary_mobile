import { Card } from '@/components/ui/Card';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoggingOut(true);
              await logout();
              router.replace('/(auth)/login' as any);
            } catch (error: any) {
              Alert.alert('Erreur', error.message || 'Erreur de déconnexion');
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    danger = false,
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        <Ionicons
          name={icon}
          size={24}
          color={danger ? Colors.error : Colors.primary}
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Utilisateur'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{user?.isActive ? 'Actif' : 'Inactif'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>
          <Card noPadding>
            <MenuItem
              icon="person-outline"
              title="Éditer le profil"
              subtitle="Mettre à jour vos informations personnelles"
              onPress={() => router.push('/edit-profile' as any)}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="lock-closed-outline"
              title="Changer le mot de passe"
              subtitle="Mettre à jour votre mot de passe"
              onPress={() => Alert.alert('Changer le mot de passe', 'Fonctionnalité à venir')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="wallet-outline"
              title="Détails du portefeuille"
              subtitle={`Compte : ${user?.wallet?.accountNumber || 'N/A'}`}
              onPress={() =>
                Alert.alert(
                  'Détails du portefeuille',
                  `Numéro de compte : ${user?.wallet?.accountNumber}\nSolde : ${user?.wallet?.balance} XFA`
                )
              }
            />
          </Card>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <Card noPadding>
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Gérer les préférences de notification"
              onPress={() => Alert.alert('Notifications', 'Fonctionnalité à venir')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="shield-checkmark-outline"
              title="Sécurité"
              subtitle="Authentification à deux facteurs, code PIN"
              onPress={() => Alert.alert('Sécurité', 'Fonctionnalité à venir')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="language-outline"
              title="Langue"
              subtitle="Français (France)"
              onPress={() => Alert.alert('Langue', 'Fonctionnalité à venir')}
            />
          </Card>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card noPadding>
            <MenuItem
              icon="help-circle-outline"
              title="Centre d'aide"
              subtitle="FAQ et articles de support"
              onPress={() => Alert.alert("Centre d'aide", "Fonctionnalité à venir")}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="chatbubble-outline"
              title="Nous Contacter"
              subtitle="Entrer en contact avec le support"
              onPress={() => Alert.alert('Nous Contacter', 'Email: support@ikarypay.com')}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="document-text-outline"
              title="Conditions & Confidentialité"
              subtitle="Informations légales"
              onPress={() => Alert.alert('Conditions & Confidentialité', 'Fonctionnalité à venir')}
            />
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <Card noPadding>
            <MenuItem
              icon="log-out-outline"
              title="Déconnexion"
              onPress={handleLogout}
              showArrow={false}
              danger
            />
          </Card>
        </View>

        {/* App Version */}
        <Text style={styles.version}>IKARY PAY v1.0.0</Text>
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
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  avatarText: {
    ...Typography.h1,
    fontSize: 48,
    color: Colors.white,
    fontWeight: '700',
  },
  name: {
    ...Typography.h3,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: Spacing.xs,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuIconDanger: {
    backgroundColor: `${Colors.error}15`,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  menuTitleDanger: {
    color: Colors.error,
  },
  menuSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.lg + 44 + Spacing.md,
  },
  version: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
});
