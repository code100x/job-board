'use client';

import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react';
export const DemarcationLine = () => (
  <div className="flex items-center my-4">
    <div className="flex-grow h-px bg-gray-300" />
    <span className="px-4 text-sm text-gray-500">or continue with</span>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);

export const GoogleOauthButton = ({ label }: { label: string }) => (
  <Button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      signIn('google');
    }}
    className="w-full h-10 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
    aria-label="google-oauth-button"
  >
    <svg
      className="w-4 h-4 mr-2"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
    >
      <path
        fill="currentColor"
        d="M488 261.8c0-17.8-1.6-35.6-4.9-52.9H249.2v99.4h135.3c-5.8 30-23.1 55.3-49.2 72.1v59.8h79.4c46.5-42.9 73.3-106 73.3-178.4zM249.2 480c65.7 0 120.7-21.8 160.9-59.2l-79.4-59.8c-22.2 14.9-50.5 23.7-81.5 23.7-62.7 0-115.8-42.3-134.7-99.2H33.8v62.1C74 428.7 157.5 480 249.2 480zM114.5 303.7c-7.8-22.8-7.8-47.5 0-70.3V171.3H33.8c-35.1 69.8-35.1 151.8 0 221.6l80.7-62.1zM249.2 97.4c35.8-.6 70.1 12.7 96.2 36.2l72.3-69.2C370.2 28.3 310.4 0 249.2 0 157.5 0 74 51.3 33.8 130.4l80.7 62.1c18.9-56.9 72-99.2 134.7-95.1z"
      />
    </svg>
    {label}
  </Button>
);
