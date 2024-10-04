'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  UserPasswordSchema,
  UserPasswordSchemaType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { changePassword } from '@/actions/user.profile.actions';
import { useSession } from 'next-auth/react';

type Props = {};
export const ChangePassword = ({}: Props) => {
  const { register, watch } = useForm();

  const session = useSession();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<UserPasswordSchemaType>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      e.target.name as keyof UserPasswordSchemaType,
      e.target.value
    );
  };
  type UpdatePasswordResponse = {
    error?: string;
    success?: string;
  };
  const handleFormSubmit = async (data: UserPasswordSchemaType) => {
    try {
      const res = (await changePassword(
        session.data?.user.email as string,
        data
      )) as UpdatePasswordResponse;
      res?.error
        ? toast({
            title: res.error || 'something went wrong',
            variant: 'destructive',
          })
        : toast({ title: res.success, variant: 'success' });
    } catch (error: any) {
      toast({
        title: error?.message || 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 p-4 border rounded-md w-full min-h-[45vh]"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showPassword ? 'text' : 'password'}
                    {...register('newPassword', { required: true })}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="******"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmNewPassword', {
                      required: true,
                      validate: (val: string) => {
                        return val !== watch('newPassword')
                          ? 'Passwords do not match'
                          : true;
                      },
                    })}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full">
          <Button className="bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4 md:w-56 w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
