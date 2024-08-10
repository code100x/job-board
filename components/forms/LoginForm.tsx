"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import { signIn } from "next-auth/react";

const LoginForm = () => {
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
    const loadId = toast.loading("Signing in...");
    

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        toast.success('Signed In',{id:loadId});
      } else {
        toast.error('invalid credentials!',{id:loadId});
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className=" p-8  flex flex-col items-start gap-8 rounded-xl shadow-lg border-t dark:bg-[#0f0f10] ">
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <h3 className="text-3xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
            100xJobs
          </h3>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-lg font-medium">Welcome Back</h4>
            <p className="text-sm text-gray-500 font-medium">
              Please enter your details to sign in
            </p>
          </div>
        </div>

        <form
          className="h-full flex flex-col justify-center items-center gap-5"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel className="text-sm font-semibold dark:text-neutral-200 ">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-neutral-700"
                    placeholder="Enter your email here"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel className="text-sm font-semibold dark:text-neutral-200">
                  Password *
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="border-neutral-700"
                    placeholder="Enter password here"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full flex justify-center items-center dark:bg-neutral-100 "
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
