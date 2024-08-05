import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
  const session = await auth();

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center pt-4 pb-20">
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
