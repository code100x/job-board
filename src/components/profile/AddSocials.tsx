'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import APP_PATHS from '@/config/path.config';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

import {
  UserProfileSchema,
  UserProfileSchemaType,
} from '@/lib/validators/user.profile.validator';

// import { useToast } from '../ui/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

// import Loader from '../loader';
type Props = {
  name: string;
  email: string;
};
export const AddSocials = ({}: Props) => {
  const router = useRouter();
  const session = useSession();
  // const { toast } = useToast();

  // const [isPending, startTransition] = useTransition();

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof UserProfileSchemaType, e.target.value);
  };

  // const handleFormSubmit = async (data: UserProfileSchemaType) => {
  //     try {
  //         startTransition(() => {
  //             updateUser(data)
  //                 .then((res) => {
  //                     res.error
  //                         ? toast({
  //                             title: (res.error as string) || 'something went wrong',
  //                             variant: 'destructive',
  //                         })
  //                         : toast({ title: res.success as string, variant: 'success' });
  //                 })
  //                 .then(() => {
  //                     session.update({ ...session, user: { ...user, ...data } });
  //                 });
  //         });
  //     } catch (error: any) {
  //         toast({
  //             title: error?.message || 'Internal server error',
  //             variant: 'destructive',
  //         });
  //     }
  // };

  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile/edit`);
  });
  return (
    <Form {...form}>
      <form className="flex flex-col gap-3 p-4 border rounded-md w-full">
        <div className="flex justify-between items-center mb-3">
          <span>Add Socials</span>
        </div>
        <div className="flex lg:flex-row md:flex-col w-full gap-3 max-md:items-end lg:items-end max-sm:flex-col">
          <div className="flex lg:flex-row md:w-full gap-3 w-full max-md:items-end">
            <div className="md:w-full lg:w-1/3 sm:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Platform Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        onChange={handleInputChange}
                        className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:w-full w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
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
          <div className="flex justify-end max-sm:w-full">
            <Button
              // disabled={isPending}
              className="bg-slate-950 text-white dark:text-slate-950 dark:bg-white rounded-md py-2 px-4 md:w-56 w-full"
            >
              {/* {isPending ? <Loader /> : 'Save'} */}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
