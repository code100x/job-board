'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredError((prevState) => ({
      ...prevState,
      emailReq: false,
    }));
    email.current = e.target.value;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredError((prevState) => ({
      ...prevState,
      passReq: false,
    }));
    password.current = e.target.value;
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    // const loadId = toast.loading('Signing in...');
    if (e) {
      e.preventDefault();
    }

    if (!email.current || !password.current) {
      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
      });
      //   toast.dismiss(loadId);
      return;
    }
    setCheckingPassword(true);
    const res = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    });

    // toast.dismiss(loadId);
    if (!res?.error) {
      router.push('/');
      //   toast.success('Signed In');
    } else {
      //   toast.error('oops something went wrong..!');
      setCheckingPassword(false);
    }
  };

  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          type: 'spring',
          damping: 10,
        }}
        className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 md:max-w-[30vw]"
      >
        <div className="flex flex-col text-center">
          <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
            Welcome to{' '}
            <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
              100xJobs
            </span>
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid w-full items-center gap-4">
            <div className="relative flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                name="email"
                id="email"
                placeholder="name@email.com"
                value={email.current}
                onChange={handleEmailChange}
              />
              {requiredError.emailReq && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Label>Password</Label>
              <div className="flex">
                <Input
                  className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  onChange={handlePasswordChange}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      setIsPasswordVisible(false);
                      handleSubmit();
                    }
                  }}
                />
                <button
                  className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {requiredError.passReq && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
          </div>
          <Button
            size="lg"
            disabled={!email.current || !password.current || checkingPassword}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </motion.div>
      <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
    </section>
  );
};

export default SignIn;
