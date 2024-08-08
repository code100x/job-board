"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { loginUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginUser, userLoginSchema } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const { toast } = useToast();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginUser>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (values: LoginUser) => {
    setIsLoading(true);
    const response = await loginUser(values);
    if (response?.status !== "success") {
      toast({
        title: response.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    router.push("/jobs");
    toast({
      title: response.message,
      variant: "default",
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4 py-2 pb-6">
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="md:right-8 md:top-8 w-full" type="submit" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
