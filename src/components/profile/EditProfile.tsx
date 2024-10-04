'use client';

import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getNameInitials } from '@/lib/utils';
import { EditProfilePicture } from './EditProfilePicture';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserProfileSchema,
  UserProfileSchemaType,
} from '@/lib/validators/user.profile.validator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { updateUser } from '@/actions/user.profile.actions';
import { useToast } from '../ui/use-toast';
type Props = {
  name: string | '';
  email: string | '';
};
export const EditProfile = ({ name, email }: Props) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile/edit`);
  });
  const { toast } = useToast();

  const user = session.data?.user;
  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      name: session.data?.user.name,
      email: session.data?.user.email,
    },
  });

  useEffect(() => {
    form.setValue('name', name);
    form.setValue('email', email);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(e.target.name as keyof UserProfileSchemaType, e.target.value);
  };

  type UpdateUserResponse = {
    error?: string;
    success?: string;
  };

  const handleFormSubmit = async (data: UserProfileSchemaType) => {
    try {
      const res = (await updateUser(
        user?.email || email,
        data
      )) as UpdateUserResponse;
      await session.update({ ...session, user: { ...user, ...data } });
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
    <div className="flex flex-col justify-center items-start my-3 gap-4">
      <div className="flex w-full p-4 border rounded-md mt-5">
        <Dialog>
          <DialogTrigger asChild className="w-20 rounded-full cursor-pointer">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                {getNameInitials(user?.name ?? '')}
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-center items-center sm:w-[330px] sm:h-auto h-screen bg-white dark:bg-slate-950 md:rounded-2xl">
            <DialogHeader>
              <DialogTitle>Profile Picture</DialogTitle>
              <DialogDescription>
                A profile picture helps others recognize you.
              </DialogDescription>
            </DialogHeader>
            <EditProfilePicture
              imageUrl={user?.image}
              name={getNameInitials(user?.name ?? '')}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 p-4 border rounded-md w-full min-h-[45vh]"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex justify-between items-center mb-4">
            <span>Profile Info</span>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={handleInputChange}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
                  />
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
    </div>
  );
};
