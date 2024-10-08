'use client';

import { useTransition } from 'react';

import { signOut, useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

import { Button } from '../ui/button';
import Loader from '../loader';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { deleteUser } from '@/actions/user.profile.actions';
import { Trash } from 'lucide-react';

export const DeleteAccountDialog = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-40 flex gap-2 text-red-500" variant={'ghost'}>
          <Trash size={15} />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
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
            className="w-36"
            variant={'destructive'}
            onClick={handleDeleteAccount}
            disabled={isPending}
          >
            {isPending ? <Loader /> : 'Delete Account'}
          </Button>
          <DialogClose asChild>
            <Button variant={'ghost'} disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
