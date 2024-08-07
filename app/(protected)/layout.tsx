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

    <div className="h-full py-4 px-2">
    <Navbar session={session}/>
      {children}
      <Footer/>
    </div>
    </>
  );
};

export default MainLayout;
