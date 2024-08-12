import { SiteHeader } from "@/components/SiteHeader";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <SiteHeader />
      <div className="flex justify-center">{children}</div>
    </>
  );
};

export default MainLayout;
