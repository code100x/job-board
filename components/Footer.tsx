import { Icons } from "./Icons";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-20 flex justify-between items-center bg-background p-4 lg:px-14 border border-t-secondary">
      <div className="flex justify-center items-center gap-5 font-normal text-slate-600 :">
        <Icons.linkedIn className="h-6 w-6 hover:text-gray-800 transition-colors cursor-pointer" />
        <Icons.twitter className="h-6 w-6 hover:text-gray-800 transition-colors cursor-pointer" />
        <Icons.gitHub className="h-6 w-6 hover:text-gray-800 transition-colors cursor-pointer" />
        <Icons.globe className="h-6 w-6 hover:text-gray-800 transition-colors cursor-pointer" />
      </div>
      <span className="flex text-xs font-normal text-slate-600 items-center gap-1">
        <Icons.copyRight className="h-4 w-4" />
        <p>2024</p>
        <p>100xdevs</p>
      </span>
    </footer>
  );
};

export default Footer;
