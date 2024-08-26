import Icon from '@/components/ui/icon';
import { socials, footerLinks } from '@/lib/constant/app.constant';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-auto relative  w-full p-3">
      <div className="w-full  flex  flex-col  lg:flex-row justify-between gap-3 mx-auto bg-background dark:bg-neutral-900 rounded-3xl p-3 md:p-10 lg:px-16 lg:h-[360px]">
        <div className="h-auto md:h-auto flex flex-col justify-between gap-3 p-2 sm:p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Image
              src="/main.png"
              alt="100xJobs"
              width={90}
              height={90}
              className="rounded-full w-16 h-16 md:w-20 md:h-20"
            />
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-5xl font-bold inline-flex bg-gradient-to-r from-[#63ADF7] to-[#296EE7] bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-[#63ADF7] dark:to-[#296EE7]">
                100xDevs
              </h3>
              <p className="text-neutral-50 text-sm md:text-lg">
                because 10x ain&apos;t enough
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-base md:text-lg">Follow us on</p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link
                  target="_blank"
                  key={social.href}
                  href={social.href}
                  aria-label={social.label}
                >
                  <Icon
                    icon={social.icon}
                    className="text-foreground/60 hover:text-foreground/80 text-xl md:text-2xl"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex flex-col sm:flex-row gap-10 p-2 sm:p-5 ">
          <div className="flex flex-col gap-2 ">
            <p className="font-bold text-xl md:text-2xl">100xLinks</p>

            {footerLinks['100xlinks'].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 hover:text-foreground/80 sm:text-lg font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="font-bold text-xl md:text-2xl">100xLegal</p>

            {footerLinks['100xlegal'].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 hover:text-foreground/80 sm:text-lg font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
