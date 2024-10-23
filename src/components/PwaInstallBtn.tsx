'use client';

import { BeforeInstallPromptEvent } from '@/types/pwa.types';
import React, { useEffect, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { useToast } from './ui/use-toast';

const PWAInstallButton = () => {
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      toast({
        title: 'App installed successfully!',
        description: 'You can now access the app from your device.',
      });
    });

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredEvent) {
      toast({
        title: 'Installation not available',
        description:
          'Check if the app is already installed or Refresh Website  ',
        variant: 'destructive',
      });
      return;
    }

    try {
      await deferredEvent.prompt();
    } catch (_) {
      toast({
        title: 'Installation failed',
        description:
          'There was a problem installing the app. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeferredEvent(null);
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      className="flex gap-2 items-center md:w-fit w-full rounded-lg py-2 px-3 bg-[#3259E8] text-sm text-[#FFFF] font-medium hover:bg-[#3e63e9] justify-center"
    >
      <AiFillThunderbolt />
      <p>Download App</p>
    </button>
  );
};

export default PWAInstallButton;
