'use client';

import { BeforeInstallPromptEvent } from '@/types/pwa.types';
import React, { useEffect, useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';

const PWAInstallButton = () => {
  const [deferredEvent, setDeferredEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    window.addEventListener(
      'beforeinstallprompt',
      (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredEvent(e);
      }
    );

    return window.removeEventListener(
      'beforeinstallprompt',
      (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredEvent(e);
      }
    );
  }, []);

  const handleInstallClick = async () => {
    if (deferredEvent) {
      deferredEvent.prompt();
      setDeferredEvent(null);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex gap-2 items-center md:w-fit w-full rounded-lg py-2 px-3 bg-[#3259E8] text-sm text-[#FFFF] font-medium hover:bg-[#3e63e9] justify-center"
      >
        <AiFillThunderbolt />
        <p>Download App</p>
      </button>
    </>
  );
};

export default PWAInstallButton;
