import { Copyright, Github, GlobeIcon, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full h-20 flex justify-between items-center bg-white/10 p-4 lg:px-14 border border-t-gray-200/90">
      <div className="flex justify-between  font-normal text-slate-600">
        <Button variant="link" className="flex items-center gap-2">
          <Mail className="h-4   sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Email</span>
        </Button>
        <Button variant="link" className="flex items-center gap-2">
          <Linkedin className="h-4  sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Linkedin</span>
        </Button>
        <Button variant="link" className="flex items-center gap-2">
          <Twitter className="h-4   sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>
        <Button variant="link" className="flex items-center gap-2">
          <Github className="h-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Github</span>
        </Button>
        <Button variant="link" className="flex items-center gap-2">
          <GlobeIcon className="h-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Website</span>
        </Button>
      </div>
      <span className="hidden md:flex text-xs font-normal text-slate-600 items-center gap-1 mt-4 lg:mt-0">
        <Copyright size={14} />
        <p>2024</p>
        <p>100xdevs</p>
      </span>
    </footer>
  );
};

export default Footer;
