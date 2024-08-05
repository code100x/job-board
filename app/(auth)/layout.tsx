import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { auth } from "@/auth";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await auth();

  return (
    <div className="absolute inset-0 min-h-screen w-full flex flex-col items-center p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
