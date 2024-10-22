'use client';

import { BellIcon, BellOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationRequest() {
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<'granted' | 'default' | 'denied'>('denied');

  function urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function createSubscription(regsitration: ServiceWorkerRegistration) {
    const appServerkey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
    );

    const options = {
      applicationServerKey: appServerkey,
      userVisibleOnly: true,
    };

    await regsitration.pushManager.subscribe(options); //subscription add
  }

  async function subscribeUser() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        createSubscription(registration);
      } else {
        const newRegistration =
          await navigator.serviceWorker.register('/sw.js');
        createSubscription(newRegistration);
      }
    }
  }

  async function showNotification() {
    if ('Notification' in window) {
      window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationPermissionStatus(permission);
          subscribeUser();
        } else {
          alert('Go to setting & allow notifications');
        }
      });
    } else {
      alert("Broswer Doesn't support notifications");
    }
  }

  useEffect(() => {
    if ('Notification' in window) {
      window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationPermissionStatus(permission);
          subscribeUser();
        } else {
          alert('Go to setting & allow notifications');
        }
      });
    } else {
      alert("Broswer Doesn't support notifications");
    }
  }, []);

  return (
    <div>
      {notificationPermissionStatus === 'granted' ? (
        <BellIcon onClick={() => setNotificationPermissionStatus('denied')} />
      ) : (
        <BellOffIcon onClick={showNotification} />
      )}
    </div>
  );
}
