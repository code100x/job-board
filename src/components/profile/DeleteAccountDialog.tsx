'use client';

import { ClipboardEvent, useEffect, useState, useTransition } from 'react';

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
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Randomstring from 'randomstring';
import {
  UserProfileDestroySchema,
  UserProfileDestroyType,
} from '@/lib/validators/user.profile.validator';

import { deleteUser } from '@/actions/user.profile.actions';
import { Trash, X } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';

export const DeleteAccountDialog = () => {
  const { toast } = useToast();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileDestroyType>({
    resolver: zodResolver(UserProfileDestroySchema),
  });

  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [randomString, setRandomString] = useState<string>('');

  const [disabled, setDisabled] = useState(true);

  function handleCheck(e: any) {
    if (e.target.value === randomString) {
      return setDisabled(false);
    }
    setDisabled(true);
  }

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

  useEffect(() => {
    setRandomString(Randomstring.generate(8));
  }, []);

  return (
    <Dialog open={modalOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-40 flex gap-2 text-red-500"
          variant={'ghost'}
          onClick={() => setModalOpen(true)}
          aria-label="delete-account"
        >
          <Trash size={15} />
          Delete Account
        </Button>
      </DialogTrigger>

      <DialogContent hideCloseButton>
        <div className="flex justify-end">
          <X
            className="cursor-pointer size-4"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <DialogHeader className="text-start">
          <DialogTitle>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and all associated data.
            <form className="mt-6" onSubmit={handleSubmit(handleDeleteAccount)}>
              <label className="text-black dark:text-gray-200" htmlFor="random">
                Type{' '}
                <span className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white font-mono px-2 py-1 rounded">
                  {randomString}
                </span>
              </label>
              <input
                {...register('random')}
                id="random"
                className=" mt-2 p-2 rounded-md font-bold p-4 rounded-md  w-full bg-gray-200 dark:bg-black outline-none text-black dark:text-white"
                onPaste={(e: ClipboardEvent<HTMLInputElement>) =>
                  e.preventDefault()
                }
                onChange={handleCheck}
              />

              {errors.random?.message && (
                <p className="mt-2 text-red-500">{errors.random?.message}</p>
              )}

              <div className="flex gap-2 items-baseline">
                <Button
                  disabled={disabled}
                  className="mt-4 bg-red-500 hover:bg-red-500 text-white"
                  aria-label="submit"
                >
                  {isPending ? <FaSpinner className="animate-spin" /> : 'Yes'}
                </Button>

                <div
                  className="bg-gray-200 dark:bg-transparent text-black dark:text-white hover:bg-gray-200  hover:dark:bg-transparent border-2  dark:border-slate-500 py-2 px-4 cursor-pointer rounded-md"
                  onClick={() => setModalOpen(false)}
                >
                  <p>No</p>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
