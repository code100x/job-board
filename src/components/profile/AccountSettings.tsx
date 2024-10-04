'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChangePassword } from './ChangePassword';
import { deleteUser } from '@/actions/user.profile.actions';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

type Props = {};
export const AccountSettings = ({}: Props) => {
  const { toast } = useToast();
  const session = useSession();
  type DeleteUserResponse = {
    error?: string;
    success?: string;
  };
  const handleDeleteAccount = async () => {
    const res = (await deleteUser(
      session.data?.user.email as string
    )) as DeleteUserResponse;
    if (res.error) {
      toast({
        title: res.error as string,
        variant: 'destructive',
      });
    } else {
      toast({
        title: res.success,
        variant: 'success',
      });
    }
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
      <div className="flex flex-col gap-4 rounded-xl border border-red-400 shadow-sm shadow-red-400 p-3">
        <p className="font-bold text-red-500">Danger zone</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'destructive'}>Delete Account</Button>
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
              <Button variant={'destructive'} onClick={handleDeleteAccount}>
                Delete Account
              </Button>
              <Button variant={'ghost'}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
