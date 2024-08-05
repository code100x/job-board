import NewPasswordForm from "@/components/new-password-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NewPasswordPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg space-y-4">
        <div className="space-y-0.5 text-center">
          <h1 className="text-2xl font-bold">100xHire</h1>
          <p className="text-gray-500">Enter a new password</p>
        </div>

        <NewPasswordForm />

        <Button variant="link" asChild className="w-full">
          <Link href="/auth/login" prefetch={false}>
            Back to log in
          </Link>
        </Button>
      </Card>
    </div>
  );
}
