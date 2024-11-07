'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupSchemaType,
  SignupSchema,
} from '@/lib/validators/auth.validator';
import { PasswordInput } from '../password-input';
import { DemarcationLine, GoogleOauthButton } from './social-auth';
import { useToast } from '../ui/use-toast';
import APP_PATHS from '@/config/path.config';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/auth.actions';

interface InputProps {
  fulfilled: boolean;
  text: string;
}

const PasswordRequirement = ({ fulfilled, text }: InputProps) => (
  <div className="flex items-center gap-2 text-sm">
    {fulfilled ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    )}
    <span className={fulfilled ? 'text-green-700' : 'text-red-700'}>
      {text}
    </span>
  </div>
);

export const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const watchPassword = form.watch('password');

  const passwordRequirements = [
    {
      fulfilled: /[a-z]/.test(watchPassword),
      text: 'Contains lowercase letter',
    },
    {
      fulfilled: /[A-Z]/.test(watchPassword),
      text: 'Contains uppercase letter',
    },
    {
      fulfilled: /[0-9]/.test(watchPassword),
      text: 'Contains number',
    },
    {
      fulfilled: /[!@#$%^&*(),.?":{}|<>]/.test(watchPassword),
      text: 'Contains special character',
    },
  ];

  const handleSubmit = async (data: SignupSchemaType) => {
    try {
      const response = await signUp(data);
      if (!response.status) {
        toast({
          title: response.message || 'Something went wrong',
          variant: 'destructive',
        });
      } else {
        toast({
          title: response.message || 'Signup successful! Welcome!',
          variant: 'success',
        });
        router.push(APP_PATHS.WELCOME);
      }
    } catch {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@example.com"
                  />
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
                  <PasswordInput
                    field={field}
                    placeholder="Enter your password"
                  />
                </FormControl>
                <div className="mt-2 space-y-1 flex  justify-between">
                  <div>
                    {passwordRequirements.map((req, idx) => (
                      <PasswordRequirement key={idx} {...req} />
                    ))}
                  </div>
                  <div>
                    <Link
                      href={APP_PATHS.FORGOT_PASSWORD}
                      className="text-xs text-muted-foreground font-medium hover:underline "
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting
              ? 'Creating Account...'
              : 'Create Account'}
          </Button>

          <DemarcationLine />
          <GoogleOauthButton label="Sign up with Google" />
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/signin" className="font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
