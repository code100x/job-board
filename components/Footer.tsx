import { Copyright, Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-20 flex justify-between items-center bg-white/10 p-4 lg:px-14 border border-t-gray-200/90">
      <div className="flex justify-center items-center gap-5 font-normal text-slate-600 :">
        <Link href={"https://in.linkedin.com/company/100xdevs"}>
        <Linkedin className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link href={"https://x.com/100xdevs"}>
        <Twitter className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link href={"https://github.com/code100x"}>
        <Github className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link href={"https://100xdevs.com"}>
        <GlobeIcon className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
      </div>
      <span className="flex text-xs font-normal text-slate-600 items-center gap-1">
        <Copyright size={14} />
        <p>2024</p>
        <p>100xdevs</p>
      </span>
    </footer>
  );
};

export default Footer;
