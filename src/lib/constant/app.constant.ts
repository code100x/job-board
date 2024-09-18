import { IconProps } from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';

export const GITHUB_REPO = 'https://github.com/code100x/job-board';
export const navbar = [
  { id: 1, label: 'Jobs', path: APP_PATHS.JOBS },
  {
    id: 2,
    label: 'Manage',
    path: APP_PATHS.MANAGE_JOBS,
    roleRequired: 'ADMIN',
  },
  // todo: add actual path
  { id: 3, label: 'Internship', path: '/' },
  { id: 4, label: 'Testimonials', path: APP_PATHS.TESTIMONIALS },
  { id: 5, label: 'FAQs', path: APP_PATHS.FAQS },
  { id: 6, label: 'Post a Job', path: APP_PATHS.POST_JOB },

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
  '100xlinks': [
    { label: 'App', href: 'https://app.100xdevs.com' },
    { label: 'Projects', href: '' },
    { label: 'Reports', href: '' },
  ],
  '100xlegal': [
    { label: 'Privacy Policy', href: '' },
    { label: 'Terms of Service', href: '' },
    { label: 'Desclaimer', href: '' },
  ],
};
