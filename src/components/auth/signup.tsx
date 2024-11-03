'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  companyInfoSchema,
  SignupSchema,
  SignupData,
  CompanyInfo,
} from '@/lib/validators/auth.validator';
import ImageUpload from '../image-upload';

export const Signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isHr, setIsHr] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'USER',
    },
  });

  const companyForm = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: '',
      website: '',
      description: '',
    },
  });

  async function signupHandler(data: Omit<SignupData, 'companyInfo'>) {
    try {
      const signupData: SignupData = {
        ...data,
        role: isHr ? 'HR' : 'USER',
      };

      if (isHr) {
        const companyData = companyForm.getValues();
        if (companyData.name) {
          signupData.companyInfo = {
            name: companyData.name,
            website: companyData.website,
            description: companyData.description,
          };
        }
      }

      const response = await signUp(signupData);

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
        router.push(APP_PATHS.HOME);
      }
    } catch (error) {
      toast({
        title: `something went wrong ${error}`,
        variant: 'destructive',
      });
    }
  }

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

          {isHr && (
            <div className="space-y-4">
              <FormField
                control={companyForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your company"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageUpload />
            </div>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-10"
            aria-label="submit"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Create Account'}
          </Button>
        </form>
      </Form>
    </>
  );
};
