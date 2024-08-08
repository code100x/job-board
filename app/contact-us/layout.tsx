import { SiteHeader } from "@/components/SiteHeader";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center p-4 pb-20">
      <SiteHeader />
      {children}
    </div>
  );
};

export default MainLayout;
