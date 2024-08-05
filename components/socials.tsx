"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/lib/route";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { ChromeIcon, GithubIcon } from "lucide-react";

export default function Socials() {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex gap-x-3 w-full">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleClick("github")}
      >
        <GithubIcon className="size-6" />
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleClick("google")}
      >
        <ChromeIcon className="size-6" />
      </Button>
    </div>
  );
}
