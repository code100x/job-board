'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import APP_PATHS from '@/config/path.config';
import {
  SigninSchema,
  SigninSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useToast } from '../ui/use-toast';
import { DemarcationLine, GoogleOauthButton } from './social-auth';
import { PasswordInput } from '../password-input';

export const Signin = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function signinHandler(data: SigninSchemaType) {
    try {
      const response = await signIn('signin', { ...data, redirect: false });
      if (!response?.ok) {
        return toast({
          title: response?.error || 'Internal server error',
          variant: 'destructive',
        });
      }
      toast({
        title: 'Login successful! Welcome back!',
        variant: 'success',
      });
      // const redirect = searchParams.get('next') || APP_PATHS.HOME;
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('next') || APP_PATHS.HOME;
      router.push(redirect);
      router.refresh();
    } catch (_error) {
      return toast({
        title: 'Internal server error',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signinHandler)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="name@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link
              href={APP_PATHS.FORGOT_PASSWORD}
              className="text-xs text-muted-foreground font-medium hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-10"
            aria-label="submit"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Sign In'}
          </Button>
          <DemarcationLine />
          <GoogleOauthButton label="Sign in with Google" />
        </form>
      </Form>
      <div className="flex items-center justify-center mt-6">
        <span className="text-muted-foreground">
          Don&apos;t have an account yet?{' '}
          <Link
            href={APP_PATHS.SIGNUP}
            className="text-muted-foreground font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};
