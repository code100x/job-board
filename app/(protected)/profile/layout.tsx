import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center pt-4 pb-20">
      <SiteHeader />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
};

export default MainLayout;
