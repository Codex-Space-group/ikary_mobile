import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)/home' as any);
      } else {
        router.replace('/(auth)/login' as any);
      }
    }
  }, [isAuthenticated, isLoading]);

  return <Loading fullScreen message="Chargement d'IKAROO PAY..." />;
}
