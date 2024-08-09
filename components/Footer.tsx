import { Copyright, Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-20 flex justify-between items-center bg-background p-4 lg:px-14 border border-t-secondary">
      <div className="flex justify-center items-center gap-5 font-normal text-slate-600 :">
        <Link
          href="https://in.linkedin.com/company/100xdevs"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link
          href="https://x.com/TechAlerts101"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link
          href="https://github.com/code100x/job-board"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          <Github className="hover:text-gray-800 transition-colors cursor-pointer" />
        </Link>
        <Link
          href="https://100xdevs.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GlobeIcon className="hover:text-gray-800 transition-colors cursor-pointer" />{" "}
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
