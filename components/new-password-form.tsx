"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSuccess from "./form-success";
import { useEffect, useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { NewPasswordSchema } from "@/lib/schemas";
import { newPassword } from "@/actions/password";

export default function NewPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setSuccess(null);
    setMessage("");

    startTransition(async () => {
      const result = await newPassword(values, token);

      if (result) {
        setSuccess(result.success);
        setMessage(result.message);
      } else {
        setSuccess(false);
        setMessage("An unexpected error occurred.");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={isPending}
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {success !== null && (
          <FormSuccess success={success} message={message} />
        )}
        <Button disabled={isPending} type="submit" className="w-full" size="lg">
          {isPending ? (
            <span className="animate-spin">
              <Loader className="size-5" />
            </span>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </Form>
  );
}
