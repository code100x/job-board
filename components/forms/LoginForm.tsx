"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { FormEvent, useState } from "react";
import { loginUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors: { field: string; message: string }[] = [];
  
    if (!email.trim()) {
      errors.push({ field: 'email', message: 'Email cannot be empty!' });
      isValid = false;
    }
  
    if (!password.trim()) {
      errors.push({ field: 'password', message: 'Password cannot be empty!' });
      isValid = false;
    }
  
    if (!isValid) {
      errors.forEach(({ field, message }) => {
        toast({
          title: message,
          variant: "destructive",
        });
        if (field === 'email') setIsEmailError(true);
        if (field === 'password') setIsPasswordError(true);
      });
      setIsLoading(false);
    }
  
    return isValid;
  };

  const handleClick = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
    return;
  }

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
    setIsLoading(false);
  };

  return (
    <div className="h-fit bg-white flex flex-col items-start gap-8 rounded-md shadow-lg border-t border-gray-200">
      <div className=" bg-white p-8 rounded-lg shadow-md w-96">
        <h3 className=" max-w-64 flex-wrap text-xl text-gray-900 font-medium tracking-tight ">
          Login with your 100xdevs credentials.
        </h3>
        <div className="flex justify-center mb-6 "></div>

        <form className="" onSubmit={(evt) => handleClick(evt)}>
          <div className="flex justify-between mb-4"></div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-Mail Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              placeholder="Email"
              className={`w-full border-gray-400 outline-none text-gray-800 ${
                isEmailError ? "border-red-600" : null
              }`}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              placeholder="••••••••••"
              className={`w-full border-gray-400 outline-none text-gray-800 ${
                isPasswordError ? "border-red-600" : null
              }`}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center items-center rounded-lg"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin " />
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="text-center text-gray-500 my-4">OR</div>
          <Button className="flex-1 w-full mx-2 py-2 px-4 border bg-gray-100 border-gray-300 rounded-md flex items-center justify-center">
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
