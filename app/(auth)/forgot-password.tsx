import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
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

export default function ForgotPasswordScreen() {
  const { requestPasswordReset, confirmPasswordReset } = useAuth();
  const [step, setStep] = useState<'request' | 'confirm'>('request');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validateRequest = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'email est invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateConfirm = () => {
    const newErrors: any = {};

    if (!resetToken) {
      newErrors.resetToken = 'Le code est requis';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Le mot de passe est requis';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async () => {
    if (!validateRequest()) return;

    try {
      setLoading(true);
      const response = await requestPasswordReset(email);
      setResetToken(response.resetToken);
      Alert.alert(
        'Code de réinitialisation généré',
        `Votre code de réinitialisation est : ${response.resetToken}\n\nEn production, ce code serait envoyé à votre email.`,
        [{ text: 'OK', onPress: () => setStep('confirm') }]
      );
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec de l\'envoi du code');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async () => {
    if (!validateConfirm()) return;

    try {
      setLoading(true);
      await confirmPasswordReset(resetToken, newPassword);
      Alert.alert(
        'Succès',
        'Mot de passe réinitialisé avec succès! Veuillez vous connecter avec votre nouveau mot de passe.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login' as any),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Ionicons name="key" size={48} color={Colors.white} />
          </View>
          <Text style={styles.title}>Réinitialiser le Mot de passe</Text>
          <Text style={styles.subtitle}>
            {step === 'request'
              ? 'Entrez votre email pour recevoir un code de réinitialisation'
              : 'Entrez le code et votre nouveau mot de passe'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {step === 'request' ? (
            <>
              <Input
                label="Email"
                placeholder="Entrez votre email"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
              />

              <Button
                title="Envoyer le Code"
                onPress={handleRequestReset}
                loading={loading}
                fullWidth
                style={styles.submitButton}
              />

              <TouchableOpacity
                onPress={() => setStep('confirm')}
                style={styles.switchLink}
              >
                <Text style={styles.switchText}>
                  Déjà en possession d\'un code ?{' '}
                  <Text style={styles.switchTextBold}>Entrer le code</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Input
                label="Code de Réinitialisation"
                placeholder="Entrez le code reçu par email"
                value={resetToken}
                onChangeText={setResetToken}
                error={errors.resetToken}
                icon="shield-checkmark-outline"
              />

              <Input
                label="Nouveau Mot de passe"
                placeholder="Entrez votre nouveau mot de passe"
                value={newPassword}
                onChangeText={setNewPassword}
                error={errors.newPassword}
                secureTextEntry
                icon="lock-closed-outline"
              />

              <Input
                label="Confirmer le Nouveau Mot de passe"
                placeholder="Confirmez votre nouveau mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={errors.confirmPassword}
                secureTextEntry
                icon="lock-closed-outline"
              />

              <Button
                title="Réinitialiser le Mot de passe"
                onPress={handleConfirmReset}
                loading={loading}
                fullWidth
                style={styles.submitButton}
              />

              <TouchableOpacity
                onPress={() => setStep('request')}
                style={styles.switchLink}
              >
                <Text style={styles.switchText}>
                  Besoin d'un nouveau code?{' '}
                  <Text style={styles.switchTextBold}>Demander un code</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: Spacing.lg,
    zIndex: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  submitButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  switchLink: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  switchText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  switchTextBold: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
