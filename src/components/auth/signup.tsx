// signup.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { signUp } from '@/actions/auth.actions';
import APP_PATHS from '@/config/path.config';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SignupSchema } from '@/lib/validators/auth.validator';
import prisma from '@/config/prisma.config';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const companySetupSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyWebsite: z.string().url('Invalid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type CompanySetupForm = z.infer<typeof companySetupSchema>;
type SignupSchemaType = z.infer<typeof SignupSchema>;

export const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showCompanySetup, setShowCompanySetup] = useState(false);
  const [isHr, setIsHr] = useState(false);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'USER',
    },
  });

  const {
    register: companySetupForm,
    handleSubmit: handleCompanySetupSubmit,
    formState: { errors: companySetupErrors },
  } = useForm<CompanySetupForm>({
    resolver: zodResolver(companySetupSchema),
  });

  async function signupHandler(data: SignupSchemaType) {
    try {
      const response = await signUp(data);
      if (!response.status) {
        toast({
          title: response.message || 'Something went wrong',
          variant: 'destructive',
        });
      } else {
        toast({
          title: response.message || 'Signup successful! Welcome to 100xJobs!',
          variant: 'success',
        });
        if (isHr) {
          setShowCompanySetup(true);
        } else {
          router.push(APP_PATHS.HOME);
        }
      }
    } catch {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  const handleCompanySetup = async () => {
    try {
      // Save company info to the database
      await prisma.user.update({
        where: { email: form.getValues('email') },
        data: { onBoard: true },
      });
      setShowCompanySetup(false);
      router.push(APP_PATHS.HOME);
    } catch (error) {
      toast({
        title: `Error occcured: ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
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
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="hr-mode"
              checked={isHr}
              onCheckedChange={(checked) => setIsHr(checked)}
            />
            <Label htmlFor="hr-mode">I&apos;m an HR professional</Label>
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

      <Dialog open={showCompanySetup} onOpenChange={setShowCompanySetup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set up your company profile</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleCompanySetupSubmit(handleCompanySetup)}
            className="space-y-4"
          >
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload Company Logo"
            />
            <Input
              placeholder="Company Name"
              {...companySetupForm('companyName')}
            />
            {companySetupErrors.companyName && (
              <p className="text-red-500">
                {companySetupErrors.companyName.message}
              </p>
            )}
            <Input
              placeholder="Company Website"
              {...companySetupForm('companyWebsite')}
            />
            {companySetupErrors.companyWebsite && (
              <p className="text-red-500">
                {companySetupErrors.companyWebsite.message}
              </p>
            )}
            <Textarea
              placeholder="Description"
              {...companySetupForm('description')}
            />
            {companySetupErrors.description && (
              <p className="text-red-500">
                {companySetupErrors.description.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Finish Setup
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
