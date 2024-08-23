import Icon from '@/components/ui/icon';
import { socials } from '@/lib/constant/app.constant';
import Link from 'next/link';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex flex-col items-center hidden group-hover:flex">
        <div className="text-xs font-normal text-foreground/60 bg-white p-2 rounded-lg shadow-md whitespace-nowrap">
          {text}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-white"></div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-auto px-6 py-4">
      <div className="w-full max-w-screen-xl flex items-center flex-row-reverse gap-3 mx-auto">
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <Tooltip key={social.href} text={social.label}>
              <Link
                target="_blank"
                href={social.href}
                aria-label={social.label}
                className="flex items-center"
              >
                <Icon
                  icon={social.icon}
                  className="text-foreground/60 hover:text-foreground/80"
                />
              </Link>
            </Tooltip>
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
