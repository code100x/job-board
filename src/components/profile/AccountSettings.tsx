'use client';

import { useTransition } from 'react';

import { signOut, useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { ChangePassword } from './ChangePassword';
import { deleteUser } from '@/actions/user.profile.actions';
import Loader from '../loader';

type Props = {};
export const AccountSettings = ({}: Props) => {
  const { toast } = useToast();
  const session = useSession();

  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = async () => {
    startTransition(() => {
      deleteUser(session.data?.user.email as string)
        .then((res) => {
          res.error
            ? toast({
                title: res.error as string,
                variant: 'destructive',
              })
            : toast({
                title: res.success as string,
                variant: 'success',
              });
        })
        .then(() => {
          signOut();
        });
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col gap-4 rounded-xl border p-3">
        <p>Password and Authentication</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-40 text-slate-950 dark:text-white"
              variant={'link'}
            >
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change your password</DialogTitle>
            </DialogHeader>
            <ChangePassword />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border shadow-sm p-3">
        <p className="font-bold text-red-500">Danger zone</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-40" variant={'destructive'}>
              {isPending ? <Loader /> : 'Delete Account'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and all associated data.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 justify-end">
              <Button
                variant={'destructive'}
                onClick={handleDeleteAccount}
                disabled={isPending}
              >
                Delete Account
              </Button>
              <DialogClose asChild>
                <Button variant={'ghost'} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
