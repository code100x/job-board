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

  const handleClick = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);

    if (!email.trim()) {
      toast({
        title: "Email cannot be empty!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Password cannot be empty!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const credentials = { email, password };

    try {
      const response = await loginUser(credentials);

      if (response?.status === "success") {
        toast({
          title: response.message,
          variant: "default",
        });
        router.push("/jobs");
      } else {
        toast({
          title: response?.message || "Login failed!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-fit w-full flex items-center justify-center bg-cover bg-center">
      <div className="max-w-md w-full p-6 sm:p-8 md:p-10 bg-white bg-opacity-90 rounded-lg shadow-lg border-t border-gray-200 min-h-[500px] flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl md:text-2xl text-gray-700 text-center mb-6 sm:mb-8">
          Login with your 100xdevs to continue.
        </h3>

        <form
          className="flex flex-col items-center gap-4 sm:gap-6"
          onSubmit={(evt) => handleClick(evt)}
        >
          <Input
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="Email"
            className="w-full sm:w-80 border-gray-400 outline-none text-gray-800 py-2 px-3 rounded-md"
          />

          <Input
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            placeholder="Password"
            className="w-full sm:w-80 border-gray-400 outline-none text-gray-800 py-2 px-3 rounded-md"
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full sm:w-1/2 flex justify-center items-center rounded-lg py-3 px-6 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
