import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/services/auth.service';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ChangePasswordScreen() {
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword.trim()) {
      Alert.alert('Erreur', 'Le mot de passe actuel est requis');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Erreur', 'Le nouveau mot de passe est requis');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Erreur', 'Le nouveau mot de passe doit être différent de l\'ancien');
      return;
    }

    try {
      setLoading(true);
      await AuthService.changePassword({
        currentPassword,
        newPassword,
      });
      
      Alert.alert(
        'Succès',
        'Mot de passe changé avec succès. Vous allez être déconnecté pour des raisons de sécurité. Veuillez vous reconnecter avec votre nouveau mot de passe.',
        [
          { 
            text: 'OK', 
            onPress: async () => {
              await logout();
              router.replace('/(auth)/login' as any);
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Changer le mot de passe</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content}>
          {/* Security Info */}
          <Card>
            <View style={styles.infoBox}>
              <Ionicons name="shield-checkmark" size={32} color={Colors.primary} />
              <Text style={styles.infoTitle}>Sécurité de votre compte</Text>
              <Text style={styles.infoText}>
                Assurez-vous que votre nouveau mot de passe contient au moins 6 caractères
                et est différent de votre mot de passe actuel.
              </Text>
            </View>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations de sécurité</Text>
            <Card>
              <Input
                label="Mot de passe actuel"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Entrez votre mot de passe actuel"
                secureTextEntry={!showCurrentPassword}
                rightIcon={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
              
              <View style={styles.inputSpacing} />
              
              <Input
                label="Nouveau mot de passe"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Entrez votre nouveau mot de passe"
                secureTextEntry={!showNewPassword}
                rightIcon={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setShowNewPassword(!showNewPassword)}
              />
              
              <View style={styles.inputSpacing} />
              
              <Input
                label="Confirmer le nouveau mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmez votre nouveau mot de passe"
                secureTextEntry={!showConfirmPassword}
                rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Button
              title="Changer le mot de passe"
              onPress={handleChangePassword}
              loading={loading}
              disabled={loading}
            />
          </View>

          {/* Warning */}
          <Card>
            <View style={styles.warningBox}>
              <Ionicons name="warning" size={24} color={Colors.warning} />
              <Text style={styles.warningText}>
                Après avoir changé votre mot de passe, vous serez automatiquement déconnecté
                pour des raisons de sécurité. Vous devrez vous reconnecter avec votre nouveau mot de passe.
              </Text>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h4,
    color: Colors.white,
    fontWeight: '700',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  infoBox: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  infoTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputSpacing: {
    height: Spacing.md,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: `${Colors.warning}10`,
    borderRadius: 12,
  },
  warningText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 20,
  },
});
