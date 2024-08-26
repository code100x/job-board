import { RiTwitterXFill } from 'react-icons/ri';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Sparkles,
  Copyright,
  Sun,
  Moon,
  type Icon as LucideIconType,
  Check,
  ChevronRight,
  DotIcon,
  MapPin,
  DollarSign,
  BookText,
  User,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';

const icons = {
  sparcle: Sparkles,
  rightarrow: ArrowRight,
  menu: Menu,
  dropdown: ChevronDown,
  twitter: RiTwitterXFill,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
  telergam: FaTelegramPlane,
  copyright: Copyright,
  sun: Sun,
  moon: Moon,
  check: Check,
  'chevron-right': ChevronRight,
  'dot-filled': DotIcon,
  location: MapPin,
  currency: DollarSign,
  description: BookText,
  profile: User,
  logout: LogOut,
  filter: SlidersHorizontal,
};
export type IconType = typeof LucideIconType;
export default icons;
