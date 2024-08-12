import { SiteHeader } from "@/components/SiteHeader";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full  flex flex-col gap-4 items-center p-4">
      <SiteHeader />
      {children}
    </div>
  );
};

export default MainLayout;
