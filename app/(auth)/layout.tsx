import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="absolute inset-0 min-h-screen w-full flex flex-col items-center p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <SiteHeader />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;