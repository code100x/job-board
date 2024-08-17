// components/Spinner.tsx

import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const sizeClasses = {
  small: 'w-4 h-4 border-2',
  medium: 'w-6 h-6 border-4',
  large: 'w-8 h-8 border-4',
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'border-primary',
  className,
}) => {
  return (
    <div
      className={`border-t-transparent border-solid rounded-full animate-spin ${sizeClasses[size]} ${color} ${className}`}
    ></div>
  );
};

export default Spinner;
