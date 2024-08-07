import { Copyright, Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full h-20 flex flex-col md:flex-row justify-between items-center bg-slate-50 p-4 lg:px-14 border-t  text-white">
      <div className="flex justify-center items-center gap-6 font-medium">
        <Link href="https://linkedin.com" aria-label="LinkedIn">
          <Linkedin className="text-blue-500 hover:text-blue-300 transition-colors cursor-pointer" />
        </Link>
        <Link href="https://twitter.com" aria-label="Twitter">
          <Twitter className="text-black hover:text-blue-400 transition-colors cursor-pointer" />
        </Link>
        <Link href="https://github.com" aria-label="GitHub">
          <Github className=" text-black hover:text-gray-400 transition-colors cursor-pointer" />
        </Link>
        <Link href="https://app.100xdevs.com" aria-label="Website">
          <GlobeIcon className="text-black hover:text-green-400 transition-colors cursor-pointer" />
        </Link>
      </div>
      <span className="text-xs font-medium text-black flex items-center gap-1 mt-4 md:mt-0">
        <Copyright size={14} />
        <p>2024</p>
        <p className="text-indigo-800 text-sm ml-4">100xdevs</p>
      </span>
    </footer>
  );
};

export default Footer;
