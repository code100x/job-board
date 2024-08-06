"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { FormEvent, useState } from "react";
import { loginUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import LoginWithGoogleButton from "../ui/Login-with-google";
import { Eye, EyeOff } from "lucide-react"; 
import { userLoginSchema } from "@/zod/user";
import { z, ZodError } from "zod";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleClick = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate inputs
      userLoginSchema.parse({ email, password });

      const credentials = { email, password };
      const response = await loginUser(credentials);

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
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path.includes("email")) {
            newErrors.email = err.message;
          }
          if (err.path.includes("password")) {
            newErrors.password = err.message;
          }
          toast({
            title: err.message,
            variant: "destructive",
            duration: 3000,
          });
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "An unexpected error occurred",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="h-fit p-8 bg-violet-50 flex flex-col w-full max-w-md items-center gap-5 rounded-md shadow-lg border-t border-gray-200"
    >
      <LoginWithGoogleButton />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white p-1 rounded-md text-gray-600">Or continue with</span>
        </div>
      </div>

      <h3 className="max-w-64 flex-wrap text-lg text-gray-700 tracking-tight">
        100xdevs credentials
      </h3>

<form
  className="h-full flex flex-col items-center gap-4"
  onSubmit={(evt) => handleClick(evt)}
>
  <div className="w-72">
    <Input
      value={email}
      onChange={(evt) => setEmail(evt.target.value)}
      placeholder="Email"
      className={`w-full border-gray-400 outline-none max-w-lg text-gray-800 ${errors.email ? "border-red-500" : ""}`}
      aria-label="Email"
      aria-invalid={!!errors.email}
      aria-describedby="email-error"
    />
    {errors.email && <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>}
  </div>

  <div className="relative w-full">
    <Input
      type={isPasswordVisible ? "text" : "password"}
      value={password}
      onChange={(evt) => setPassword(evt.target.value)}
      placeholder="Password"
      className={`w-full border-gray-400 outline-none text-gray-800 ${errors.password ? "border-red-500" : ""}`}
      aria-label="Password"
      aria-invalid={!!errors.password}
      aria-describedby="password-error"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
    >
      {isPasswordVisible ? (
        <EyeOff size={20} className="cursor-pointer" />
      ) : (
        <Eye size={20} className="cursor-pointer" />
      )}
    </button>
    {errors.password && <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>}
  </div>

  <Button
    disabled={isLoading}
    type="submit"
    className="w-full flex justify-center items-center rounded-lg"
    aria-label="Sign In"
  >
    {isLoading ? (
      <Loader2 size={20} className="animate-spin " />
    ) : (
      "Sign In"
    )}
  </Button>
</form>

      <p className="text-center text-gray-500">
        Don&apos;t have an account yet? <a href="/sign-up" className="text-violet-600 hover:underline">Sign Up</a>
      </p>
    </motion.div>
  );
};

export default LoginForm;
