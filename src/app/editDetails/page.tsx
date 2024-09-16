import BackgroundSvg from '@/components/BackgroundSvg';
import HalfCircleGradient from '@/components/HalfCircleGradient';
import UserDetails from '@/components/userDetails';
import React from 'react';

const editDetails = () => {
  return (
    <div>
      <BackgroundSvg />
      <HalfCircleGradient position="top" />
      <div>
        <UserDetails />
      </div>
      <HalfCircleGradient position="bottom" />
    </div>
  );
};

export default editDetails;
