'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import APP_PATHS from '@/config/path.config';
import {
  SignupSchema,
  SignupSchemaType,
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

const Signup = () => {
  // const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function signupHandler(data: SignupSchemaType) {
    try {
      const response = await signIn('signup', { ...data, redirect: false });
      if (!response?.ok) {
        return toast({
          title: response?.error || 'Internal server error',
          variant: 'destructive',
        });
      }
      toast({
        title: 'Signup successful! Welcome to 100xJobs!',
        variant: 'success',
      });
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('next') || APP_PATHS.HOME;
      router.push(redirect);
    } catch (_error) {
      toast({
        title: 'something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signupHandler)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jhon Doe" />
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
                  <Input type="password" {...field} placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link
              href={APP_PATHS.RESET_PASSWORD}
              className="text-xs text-muted-foreground font-medium hover:underline"
            >
              Forget your password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-10"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Create Account'}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center mt-6">
        <span className="text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={APP_PATHS.SIGNIN}
            className="text-muted-foreground font-semibold hover:underline"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
