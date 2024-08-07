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
    <main className="max-w-full">
        {children} 
      </main>
  );
};

export default MainLayout;
