import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Socials from "@/components/socials";
import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg space-y-4">
        <div className="space-y-0.5 text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
        </div>

        <RegisterForm />

        <Socials />

        <Button variant="link" asChild className="w-full">
          <Link href="/login" prefetch={false}>
            Already have an account?
          </Link>
        </Button>
      </Card>
    </div>
  );
}
