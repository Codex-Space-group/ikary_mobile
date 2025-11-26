import SplashScreen from '@/components/SplashScreen';
import { AuthProvider } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(auth)/forgot-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="change-password" />
        <Stack.Screen 
          name="payment" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
