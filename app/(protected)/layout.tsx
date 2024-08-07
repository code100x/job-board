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
    <>
    <div className="flex flex-col items-center py-4" >
    <Navbar session={session}/>
    </div>
    <div className="h-full">
      {children}
      <Footer />
    </div>
    </>
  );
};

export default MainLayout;
