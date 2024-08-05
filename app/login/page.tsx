import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import Socials from "@/components/socials";

export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg space-y-4">
        <div className="space-y-0.5 text-center">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <LoginForm />

        <Socials />

        <Button variant="link" asChild className="w-full">
          <Link href="/register" prefetch={false}>
            Don&apos;t have an account?
          </Link>
        </Button>
      </Card>
    </div>
  );
}
