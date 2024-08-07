import Link from "next/link";

import Image from "next/image";
import { Github, GlobeIcon, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="bottom-0 w-full bg-white p-4 px-6  lg:px-36 print:hidden">
      <div className="mx-auto mt-4 flex w-full flex-row items-start justify-between ">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex"></div>
          <div className="my-8 flex flex-row justify-center md:my-0 gap-x-2">
            <Linkedin className="hover:text-gray-800 transition-colors cursor-pointer" />
            <Twitter className="hover:text-gray-800 transition-colors cursor-pointer" />
            <Github className="hover:text-gray-800 transition-colors cursor-pointer" />
            <GlobeIcon className="hover:text-gray-800 transition-colors cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl text-black font-bold">100xJobs</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
