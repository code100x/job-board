import { Button } from '@/components/ui/button';
import React from 'react';

const ProfileEmptyContainers = ({
  title,
  isOwner,
  Icon,
  description,
  handleClick,
  buttonText,
}: {
  title: string;
  Icon: React.ElementType;
  description: string;
  handleClick: () => void;
  buttonText: string;
  isOwner: boolean;
}) => {
  return (
    <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
      <Icon width={32} height={32} />
      <div className="text-center">
        <h4 className="font-bold text-xl">{title}</h4>
        <p className="text-sm font-medium text-gray-500">{description}</p>
      </div>
      {isOwner && (
        <Button onClick={handleClick} className="text-white rounded-sm">
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ProfileEmptyContainers;
