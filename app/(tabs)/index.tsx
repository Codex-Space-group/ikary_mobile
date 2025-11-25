import { router } from 'expo-router';
import { useEffect } from 'react';

export default function TabIndex() {
  useEffect(() => {
    // Redirect to home screen
    router.replace('/home' as any);
  }, []);

  return null;
}
