'use client';

import {
  AddUserSubscription,
  DeleteUserSubscription,
} from '@/actions/notification';
import { BellIcon, BellOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { getUserSubscription } from '@/actions/user.profile.actions';

export default function NotificationRequest() {
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<'granted' | 'default' | 'denied'>(window.Notification.permission);

  const [userSub, setUserSub] = useState<{
    id: string;
    subscription: string;
    userId: string;
  } | null>(null);

  const [fetch, setFetch] = useState<boolean>(false);

  const { toast } = useToast();

  //Asking for permission from user & if granted then calling the fn to subscribe the user;

  async function showNotificationPermission() {
    if ('Notification' in window) {
      window.Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
          setNotificationPermissionStatus(permission);
          await subscribeUser();
        } else {
          toast({
            variant: 'default',
            title: 'Go to browser setting to change permission',
          });
        }
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Browser do not support this',
      });
    }
  }

  //Deleting the subscription from database & making it non-pushable user

  async function deleteNotificationPermission() {
    if ('Notification' in window) {
      setNotificationPermissionStatus('denied');

      const response = await DeleteUserSubscription();
      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: response.message,
        });
        return;
      }
      toast({
        variant: 'destructive',
        title:
          'Notifications have been disabled. To stop browser notifications completely, please update your notification settings in the browser.',
      });

      setFetch((prev) => !prev);
    } else {
      toast({
        variant: 'destructive',
        title: 'Browser do not support this',
      });
    }
  }

  //converting a Base64-encoded string into a Uint8Array, which is a typed array that stores binary data

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

  //if sw.js is register the calling the createSubscription with registered service worker object else first creating and then calling it

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

  //Creating a subscription object using service work regsitration object and saving it to the db for further use

  async function createSubscription(registration: ServiceWorkerRegistration) {
    try {
      if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      if (!('PushManager' in window)) {
        throw new Error('Push messaging is not supported');
      }

      const appServerkey = urlB64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );

      const options = {
        applicationServerKey: appServerkey,
        userVisibleOnly: true,
      };

      const subscriptionObject =
        await registration.pushManager.subscribe(options);

      const response = await AddUserSubscription(
        JSON.stringify(subscriptionObject)
      );

      if (response.status !== 200) {
        toast({
          variant: 'destructive',
          title: response.message,
        });
        return;
      }

      toast({
        variant: 'success',
        title: 'Notification Added',
      });
      setFetch((prev) => !prev);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Failed to enable notifications: ${(error as Error).message}`,
      });
    }
  }
  useEffect(() => {
    const getUserSubs = async () => {
      const response = await getUserSubscription();

      if (response.status !== 200) {
        setUserSub(null);
        return;
      }
      setUserSub(response.data);
    };
    getUserSubs();
  }, [fetch]);

  return (
    <div>
      {notificationPermissionStatus === 'granted' && userSub?.id ? (
        <BellIcon
          onClick={deleteNotificationPermission}
          className="size-6 text-slate-200 cursor-pointer"
        />
      ) : (
        <BellOffIcon
          onClick={showNotificationPermission}
          className="size-6 text-gray-400 cursor-pointer"
        />
      )}
    </div>
  );
}
