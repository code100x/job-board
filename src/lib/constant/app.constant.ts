import { IconProps } from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';

export const GITHUB_REPO = 'https://github.com/code100x/job-board';
export const navbar = [
  { id: 1, label: 'Explore', path: APP_PATHS.JOBS },
  {
    id: 2,
    label: 'Manage',
    path: APP_PATHS.MANAGE_JOBS,
    roleRequired: 'ADMIN',
  },
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
