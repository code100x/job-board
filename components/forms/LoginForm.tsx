"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { loginUser } from "@/actions/user";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { FaCircleNotch, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
=======
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginUser, userLoginSchema } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
<<<<<<< HEAD
} from "@/components/ui/form";
import { userLoginSchema } from "@/zod/user";
import { motion } from "framer-motion";
=======
} from "../ui/form";
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201

const LoginForm = () => {
  const { toast } = useToast();

  const router = useRouter();
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof userLoginSchema>>({
=======
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginUser>({
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

<<<<<<< HEAD
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    const credentials = values;
    setIsLoading(true);
    const response = await loginUser(credentials);

=======
  const handleFormSubmit = async (values: LoginUser) => {
    setIsLoading(true);
    const response = await loginUser(values);
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
    if (response?.status !== "success") {
      toast({
        title: response.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: response.message,
      variant: "default",
    });
    router.push("/jobs");
    setIsLoading(false);
    console.log(values);
  };

  return (
<<<<<<< HEAD
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-fit w-[500px] p-6 bg-white flex flex-col items-start gap-5 rounded-md shadow-lg border-t border-gray-200"
    >
      <h3 className="md:text-lg max-w-80 flex-wrap text-sm text-gray-700 tracking-tight ">
        Login with your 100xdevs to continue.
      </h3>

      <div className="w-full max-w-md flex gap-3 flex-col">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      className=" focus:ring-2 focus:ring-gray-500"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl className="relative ">
                    <div>
                      <Input
                        className="focus:ring-2 focus:ring-gray-500"
                        type={showPassword ? "password" : "text"}
                        placeholder="******"
                        {...field}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  <FaCircleNotch className="animate-spin" />
                  <span className="ml-3">submit</span>
                </>
              ) : (
                <span>submit</span>
              )}
            </Button>
          </form>
        </Form>

        <div className=" w-full">
          <hr className="mb-3 border-gray border" />
          <Button variant="outline" className="w-full">
            <FaGoogle className="mr-2" />
            Login with Google
          </Button>
        </div>
      </div>
    </motion.div>
=======
    <Form {...form}>
      <div className="h-fit p-8 bg-white flex flex-col items-start gap-8 rounded-xl shadow-lg border-t border-gray-200">
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
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-gray-400"
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
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Password *
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="border-gray-400"
                    placeholder="Enter password here"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="w-full flex justify-center items-center"
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
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
  );
};

export default LoginForm;
