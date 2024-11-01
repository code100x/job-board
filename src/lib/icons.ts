import { RiTwitterXFill } from 'react-icons/ri';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaYoutube,
  FaSpinner,
  FaDiscord,
} from 'react-icons/fa';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Sparkles,
  Copyright,
  ArchiveRestore,
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
  Trash2,
  LogOut,
  SlidersHorizontal,
  AlertCircle,
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
  discord: FaDiscord,
  instagram: FaInstagram,
  telergam: FaTelegramPlane,
  loading: FaSpinner,
  copyright: Copyright,
  sun: Sun,
  ArchiveRestore: ArchiveRestore,
  trash: Trash2,
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
  alert: AlertCircle,
};
export type IconType = typeof LucideIconType;
export default icons;
