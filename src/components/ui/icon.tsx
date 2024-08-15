import icons from '@/lib/icons';
import React, { FC } from 'react';
import { LucideProps } from 'lucide-react';
export interface IconProps extends LucideProps {
  icon: keyof typeof icons;
}
const Icon: FC<IconProps> = ({ icon, ...props }) => {
  const Comp = icons[icon];
  return <Comp {...props} />;
};

export default Icon;
