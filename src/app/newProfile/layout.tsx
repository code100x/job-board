'use client';
import React from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full container gap-6 md:gap-6 md:pt-6 relative px-0">
      {children}
    </div>
  );
};

export default ProfileLayout;
