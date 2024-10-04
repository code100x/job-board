import { IconProps } from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';
import { PackageSearch } from 'lucide-react';
import adobe from '../../../public/adobe.svg';
import atlassian from '../../../public/atlassian.svg';
import google from '../../../public/google.svg';
import medium from '../../../public/medium.svg';
import framer from '../../../public/framer.svg';
import coinbase from '../../../public/coinbase.svg';

export const GITHUB_REPO = 'https://github.com/code100x/job-board';

export const nonUserNavbar = [
  { id: 1, label: 'Explore jobs', path: APP_PATHS.JOBS },
  { id: 2, label: 'Contact us', path: APP_PATHS.CONTACT_US },
];

export const userNavbar = [
  { id: 1, label: 'Explore jobs', path: APP_PATHS.JOBS },
  { id: 2, label: 'Contact us', path: APP_PATHS.CONTACT_US },
];
export const adminNavbar = [
  { id: 1, label: 'Explore jobs', path: APP_PATHS.JOBS },
  {
    id: 2,
    label: 'Manage Jobs',
    path: APP_PATHS.MANAGE_JOBS,
    roleRequired: 'ADMIN',
    icon: PackageSearch,
  },
  {
    id: 3,
    label: 'Post a job',
    path: APP_PATHS.POST_JOB,
    roleRequired: 'ADMIN',
    icon: PackageSearch,
  },
];

export const socials: {
  href: string;
  icon: IconProps['icon'];
}[] = [
  {
    icon: 'youtube',
    href: 'https://www.youtube.com/@100xDevs-n1w',
  },
  { icon: 'twitter', href: 'https://x.com/100xDevs' },
];

export const footerItems = [
  {
    label: 'About Us',
    href: '/',
  },
  {
    label: 'Terms of Service',
    href: '/',
  },
  {
    label: 'Privacy Policy',
    href: '/',
  },
];

export const trustedCompanies = [
  {
    icon: adobe,
    name: 'adobe',
  },
  {
    icon: atlassian,
    name: 'atlassian',
  },
  {
    icon: medium,
    name: 'medium',
  },
  {
    icon: coinbase,
    name: 'coinbase',
  },
  {
    icon: framer,
    name: 'framer',
  },
  {
    icon: google,
    name: 'google',
  },
];
