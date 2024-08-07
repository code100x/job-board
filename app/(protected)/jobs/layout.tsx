import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = async ({ children }: MainLayoutProps) => {
  const session = await auth();

  return (
    <main className="max-w-full mx-2">
        <div className="flex">
            <div className="w-64 pr-4 shrink-0 hidden md:block">
                <Sidebar/>
            </div>
            {children}
            </div> 
      </main>
  );
};

export default MainLayout;
