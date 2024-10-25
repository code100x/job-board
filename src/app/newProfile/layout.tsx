'use client';
import React from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full container md:gap-6 md:pt-6 relative">
      {children}
    </div>
  );
};

export default ProfileLayout;
