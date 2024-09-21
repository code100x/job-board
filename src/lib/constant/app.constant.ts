import { IconProps } from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';
import { Contact, DollarSign, PackageSearch } from 'lucide-react';

export const GITHUB_REPO = 'https://github.com/code100x/job-board';
interface NavbarItem {
  id: number;
  path: string;
  label: string;
  icon: React.FC;
  roleRequired?: string;
  isPrivate?: boolean;
}
export const navbar: NavbarItem[] = [
  { id: 1, label: 'Explore Jobs', path: APP_PATHS.JOBS, icon: PackageSearch },
  {
    id: 2,
    label: 'Manage',
    path: APP_PATHS.MANAGE_JOBS,
    roleRequired: 'ADMIN',
    icon: PackageSearch,
  },
  // todo: add actual path
  { id: 3, label: 'Pricing', path: '/', icon: DollarSign },
  { id: 4, label: 'Contact us', path: APP_PATHS.CONTACT_US, icon: Contact },
  /* { id: 5, label: 'FAQs', path: APP_PATHS.FAQS }, */
];

export const socials: {
  href: string;
  label: string;
  icon: IconProps['icon'];
}[] = [
  {
    icon: 'youtube',
    label: 'Youtube',
    href: 'https://www.youtube.com/@100xDevs-n1w',
  },
  { icon: 'twitter', label: 'Twitter', href: 'https://x.com/100xDevs' },
  { icon: 'github', label: 'Github', href: 'https://github.com/code100x' },
  {
    icon: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/100xdevsofficial/',
  },
  {
    icon: 'linkedin',
    label: 'Linkedin',
    href: 'https://www.linkedin.com/company/100xdevs/',
  },
  {
    icon: 'telergam',
    label: 'Telegram',
    href: 'https://t.me/kirat_internal_group',
  },
];

export const footerLinks = {
  '100xlegal': [
    { label: 'About us', href: '' },
    { label: 'Terms of Service', href: '' },
    { label: 'Privacy Policy', href: '' },
  ],
};
