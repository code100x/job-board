'use client';

import { useEffect, useTransition } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import APP_PATHS from '@/config/path.config';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

import {
  userSocialSchema,
  userSocialSchemaType,
} from '@/lib/validators/user.profile.validator';

import { useToast } from '../ui/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  addUserSocials,
  deleteUserSocials,
} from '@/actions/user.profile.actions';

import Loader from '../loader';
import { Trash } from 'lucide-react';
type Props = {
  socials?: userSocialSchemaType;
};
export const AddSocials = ({ socials }: Props) => {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<userSocialSchemaType>({
    resolver: zodResolver(userSocialSchema),
    defaultValues: {
      platform: socials?.platform || '',
      link: socials?.link || '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof userSocialSchemaType, e.target.value);
  };

  const handleFormSubmit = async (data: userSocialSchemaType) => {
    try {
      startTransition(() => {
        addUserSocials(data).then((res) => {
          if (res.status) {
            toast({
              title: 'Socials added successfully',
              variant: 'success',
            });
            form.reset();
          } else {
            toast({
              title: res.message || 'Internal server error',
              variant: 'destructive',
            });
          }
        });
      });
    } catch (error: any) {
      toast({
        title: error?.message || 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  const delteteSocial = async (id: string) => {
    try {
      startTransition(() => {
        deleteUserSocials({ socialId: id }).then((res) => {
          if (res.status) {
            toast({
              title: 'Socials deleted successfully',
              variant: 'success',
            });
            window.location.reload();
          } else {
            toast({
              title: res.message || 'Internal server error',
              variant: 'destructive',
            });
          }
        });
      });
    } catch (error: any) {
      toast({
        title: error?.message || 'Internal server error',
        variant: 'destructive',
      });
    }
  };
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile/edit`);
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 w-full"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div
          className={`flex ${socials && 'lg:flex-row'} md:flex-col w-full gap-3 max-md:items-end lg:items-end max-sm:flex-col`}
        >
          <div
            className={`flex ${socials && 'lg:flex-row'} md:w-full gap-3 w-full max-md:items-end`}
          >
            <div
              className={`${socials ? 'md:w-full lg:w-1/2 sm:w-1/2' : 'w-1/2'}`}
            >
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Platform Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        onChange={handleInputChange}
                        className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={`${socials ? 'md:w-full lg:w-1/2 sm:w-1/2' : 'w-1/2'}`}
            >
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        onChange={handleInputChange}
                        className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            {socials ? (
              <div className="flex gap-3">
                <Button
                  disabled={isPending}
                  className="bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4"
                >
                  {isPending ? <Loader /> : 'Save'}
                </Button>
                <Button
                  variant={'ghost'}
                  disabled={isPending}
                  onClick={() =>
                    socials && socials?.id && delteteSocial(socials.id)
                  }
                  className="flex items-center justify-center gap-3 text-xs text-red-400 bg-none border-none bg-transparent hover:bg-transparent"
                >
                  <Trash className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                disabled={isPending}
                className={`bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4 ${!socials && 'md:w-56'} w-full`}
              >
                {isPending ? <Loader /> : 'Save'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
