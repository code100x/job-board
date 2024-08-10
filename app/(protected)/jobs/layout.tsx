import { SiteHeader } from "@/components/SiteHeader";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="">
      <SiteHeader />
      {children}
    </div>
  );
};

export default MainLayout;
