import { Logo } from "@/components/100xLogo";
import LoginForm from "@/components/forms/LoginForm";
import { Icons } from "@/components/Icons";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section className="container h-full w-full flex flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
