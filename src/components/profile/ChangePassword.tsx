'use client';

import { useState, useTransition } from 'react';

import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserPasswordSchema,
  UserPasswordSchemaType,
} from '@/lib/validators/user.profile.validator';

import { Input } from '../ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { changePassword } from '@/actions/user.profile.actions';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Loader from '../loader';

export const ChangePassword = () => {
  const { toast } = useToast();

  const { register, watch } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

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

  const handleFormSubmit = async (data: UserPasswordSchemaType) => {
    try {
      startTransition(() => {
        changePassword(data)
          .then((res) => {
            res?.status &&
              toast({
                title: res.message as string,
                variant: 'success',
              });
          })
          .catch((error) => {
            toast({
              title: error.message as string,
              variant: 'destructive',
            });
          })
          .then(() => {
            form.reset();
          });
      });
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
        className="flex flex-col gap-3 p-4 w-full min-h-[45vh]"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <p className="text-md">Change your password</p>
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
                    type="password"
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
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
                    type="password"
                    {...register('newPassword', { required: true })}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
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
                    aria-label="password"
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
          <Button
            disabled={isPending}
            className="bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4 md:w-56 w-full"
            aria-label="save"
          >
            {isPending ? <Loader /> : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
