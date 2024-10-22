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
  telergam: FaTelegramPlane,
};

const Icon = ({ name }: { name: keyof typeof icons }) => {
  const Icon = icons[name];
  return <Icon />;
};

export default Icon;
