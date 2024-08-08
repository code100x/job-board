import { Copyright, Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-20 flex justify-between items-center bg-background p-4 lg:px-14 border border-t-secondary">
      <div className="flex justify-center items-center gap-5 font-normal text-slate-600 :">
        <Linkedin className="hover:text-gray-800 transition-colors cursor-pointer" />
        <Twitter className="hover:text-gray-800 transition-colors cursor-pointer" />
        <Github className="hover:text-gray-800 transition-colors cursor-pointer" />
        <GlobeIcon className="hover:text-gray-800 transition-colors cursor-pointer" />
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
