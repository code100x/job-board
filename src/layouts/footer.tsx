import Icon from '@/components/ui/icon';
import { socials, footerLinks } from '@/lib/constant/app.constant';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex max-sm:flex-col gap-5 flex-wrap justify-between border-t py-4 sm:px-28 items-center">
      <div className="flex gap-4">
        {footerLinks['100xlegal'].map((link, index) => (
          <Link
            key={link.href + index}
            href={link.href}
            className="text-base font-medium text-foreground/60 hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex max-sm:flex-col-reverse justify-center flex-wrap gap-4 text-center">
        <div className="text-base font-medium text-slate-400 dark:text-slate-500">
          © 2024 100xJobs. All rights reserved.
        </div>
        <div className="flex gap-2 justify-center">
          {socials.map((social, index) => (
            <Link
              target="_blank"
              key={social.href + index}
              href={social.href}
              className="border p-1 rounded-full"
            >
              <Icon
                icon={social.icon}
                className="text-foreground/60 hover:text-foreground text-xl md:text-2xl text-center "
                size={20}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
