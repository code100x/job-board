"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormSuccess from "./form-success";
import { verification } from "@/actions/verification";
import { Loader } from "lucide-react";

export default function VerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setSuccess(false);
      setMessage("Missing token!");
      return;
    }
    verification(token)
      .then((res) => {
        setSuccess(res.success);
        setMessage(res.message);
      })
      .catch((err) => {
        setSuccess(false);
        setMessage("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg space-y-4">
        <div className="space-y-0.5 text-center">
          <h1 className="text-2xl font-bold">Auth</h1>
          <p className="text-gray-500">Confirming your verification</p>
        </div>

        <div className="flex flex-col gap-y-5 items-center justify-center">
          {success !== null ? (
            <FormSuccess success={success} message={message} />
          ) : (
            <Loader className="size-8 animate-spin" />
          )}
        </div>

        <Button variant="link" asChild className="w-full">
          <Link href="/auth/sign-in" prefetch={false}>
            Back to sign in
          </Link>
        </Button>
      </Card>
    </div>
  );
}
