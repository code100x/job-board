import Icon from '@/components/ui/icon';
import { socials } from '@/lib/constant/app.constant';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-auto px-6 py-4">
      <div className="w-full max-w-screen-xl flex items-center flex-row-reverse gap-3 mx-auto">
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <Link
              target="_blank"
              key={social.href}
              href={social.href}
              aria-label={social.label}
            >
              <Icon
                icon={social.icon}
                className="text-foreground/60 hover:text-foreground/80"
              />
            </Link>
          ))}
        </div>
        <span className="flex text-xs font-normal text-foreground/60 items-center gap-1">
          <Icon icon="copyright" size={14} />
          <p>2024 100xdevs</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
