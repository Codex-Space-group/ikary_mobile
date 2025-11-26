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

export default function EditProfileScreen() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est requis');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erreur', "L'email est requis");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    try {
      setLoading(true);
      await AuthService.updateProfile({ name, email });
      await refreshUser();
      Alert.alert('Succès', 'Profil mis à jour avec succès', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec de la mise à jour du profil');
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
        <Text style={styles.headerTitle}>Éditer le profil</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.content}>
          <Card>
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <Text style={styles.avatarHint}>
                Photo de profil à venir
              </Text>
            </View>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            <Card>
              <Input
                label="Nom complet"
                value={name}
                onChangeText={setName}
                placeholder="Entrez votre nom"
                autoCapitalize="words"
              />
              <View style={styles.inputSpacing} />
              <Input
                label="Adresse email"
                value={email}
                onChangeText={setEmail}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Button
              title="Enregistrer les modifications"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
            />
          </View>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    ...Typography.h1,
    fontSize: 48,
    color: Colors.white,
    fontWeight: '700',
  },
  avatarHint: {
    ...Typography.caption,
    color: Colors.textSecondary,
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
});
