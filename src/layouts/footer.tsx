'use client';

import Icon from '@/components/ui/icon';
import { socials } from '@/lib/constant/app.constant';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="mt-auto px-6 py-4">
      <div className="w-full max-w-screen-xl flex items-center flex-row-reverse gap-3 mx-auto">
        <div className="flex items-center gap-2 relative">
          {socials.map((social) => (
            <div
              key={social.href}
              onMouseEnter={() => setHoveredSocial(social.label)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="relative flex flex-col items-center"
            >
              <Link
                target="_blank"
                href={social.href}
                aria-label={social.label}
              >
                <Icon
                  icon={social.icon}
                  className="text-foreground/60 hover:text-foreground/80"
                />
              </Link>
              {hoveredSocial === social.label && (
                <div className="absolute bottom-full mb-2 flex flex-col items-center">
                  <div className="relative text-xs font-normal text-white bg-black p-2 rounded-lg shadow-md">
                    {social.label}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-black"></div>
                  </div>
                </div>
              )}
            </div>
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
