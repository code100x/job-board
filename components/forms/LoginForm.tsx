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
    if (!email || email === "") {
      toast({
        title: "Email cannot be empty!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!password || password === "") {
      toast({
        title: "Email cannot be empty!",
        variant: "destructive",
      });
      setIsLoading(false);
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
    <div className="h-fit p-4 bg-white flex flex-col items-start gap-8 rounded-md shadow-lg border-t border-gray-200">
      <h3 className="max-w-64 flex-wrap text-lg text-gray-700 tracking-tight">
        Login with your 100xdevs to continue.
      </h3>

      <form
        className="h-full flex flex-col items-center gap-3"
        onSubmit={(evt) => handleClick(evt)}
      >
        <Input
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          placeholder="Email"
          className="w-64 border-gray-400 outline-none text-gray-800"
        />

        <Input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          placeholder="Password"
          className="w-64 border-gray-400 outline-none text-gray-800"
        />

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
      </form>
    </div>
  );
};

export default LoginForm;
