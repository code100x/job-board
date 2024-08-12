import { Copyright, Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-20 flex justify-between items-center bg-background p-4 lg:px-14 border border-t-secondary">
      <div className="flex justify-center items-center gap-5 font-normal text-slate-600 :">
        <a href="" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin className="hover:text-gray-800 transition-colors cursor-pointer" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" title="Twitter">
          <Twitter className="hover:text-gray-800 transition-colors cursor-pointer" />
        </a>
        <a
          href="https://github.com/Harit007x/job-board"
          target="_blank"
          rel="noopener noreferrer"
          title="Github"
        >
          <Github className="hover:text-gray-800 transition-colors cursor-pointer" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" title="Website">
          <GlobeIcon className="hover:text-gray-800 transition-colors cursor-pointer" />
        </a>
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
