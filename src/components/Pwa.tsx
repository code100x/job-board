'use client';

import { useEffect } from 'react';
import { useToast } from './ui/use-toast';

export default function Pwa() {
  const { toast } = useToast();
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
            }
          );

          if (registration.active) {
            return true;
          } else {
            registration.addEventListener('activate', () => {
              return true;
            });
          }
        } catch (_) {
          toast({
            variant: 'destructive',
            title: 'Failed to register Service Worker',
            description:
              'Push notifications may not work properly. Try to revisit',
          });
        }
      }
    };

    registerServiceWorker();
  }, [toast]);

  return <></>;
}
