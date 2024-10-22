import { RiTwitterXFill } from 'react-icons/ri';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';

const icons: { [key: string]: React.ComponentType } = {
  twitter: RiTwitterXFill,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
};

type Platform = keyof typeof icons;

interface IconProps {
  name: Platform;
}

const Icon = ({ name }: IconProps) => {
  const SelectedIcon = icons[name];
  return <SelectedIcon />;
};

export default Icon;
