'use client';

import React, { useEffect, useTransition } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

import { uploadFileAction } from '@/actions/upload-to-cdn';
import { updateAvatar } from '@/actions/user.profile.actions';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { PencilIcon, Trash } from 'lucide-react';
import APP_PATHS from '@/config/path.config';
import { getNameInitials } from '@/lib/utils';
import Loader from '../loader';

export const EditProfilePicture = () => {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const name = getNameInitials(session.data?.user.name as string);
  const [isPending, startTransition] = useTransition();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();

      formData.append('file', file);
      // const fileName = file.name;
      // formData.append('uniqueFileName', fileName);
      uploadFileAction(formData, 'webp').then((response) => {
        if (response.error) {
          toast({
            title: response.error,
            variant: 'destructive',
          });
        } else {
          updateAvatar(
            session.data?.user.email as string,
            response?.url as string
          )
            .then((res) => {
              res.error
                ? toast({
                    title: res.error as string,
                    variant: 'destructive',
                  })
                : toast({
                    title: res.success,
                    variant: 'success',
                  });
            })
            .then(() => {
              session.update({
                ...session,
                user: { ...session.data?.user, image: response.url },
              });
            });
        }
      });
    });
  };

  const removeImage = () => {
    startTransition(() => {
      updateAvatar(session.data?.user.email as string, '')
        .then((res) => {
          res.error
            ? toast({
                title: res.error as string,
                variant: 'destructive',
              })
            : toast({
                title: res.success,
                variant: 'success',
              });
        })
        .then(() => {
          session.update({
            ...session,
            user: { ...session.data?.user, image: '' },
          });
        });
    });
  };

  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile/edit`);
  }, [session.status, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4">
      <div className="flex justify-center items-center">
        <Avatar className="cursor-pointer w-64 h-64">
          <AvatarImage
            className=" object-cover"
            src={session.data?.user.image}
          />
          <AvatarFallback className="text-8xl font-bold">{name}</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs text-slate-500">Accepts .PNG, .JPEG, .JPG</span>
      <form className="flex mt-2" method="post" encType="multipart/form-data">
        <Label
          className="flex items-center justify-center gap-3 text-xs bg-slate-950 text-white dark:bg-white dark:text-black rounded-full px-6 cursor-pointer w-32"
          htmlFor="pfp"
        >
          {isPending ? (
            <Loader />
          ) : (
            <>
              <PencilIcon className="w-4 h-4" />
              Change
            </>
          )}
        </Label>
        <input
          type="file"
          id="pfp"
          name="pfp"
          className="hidden"
          accept="image/jpeg, image/jpg, image/png"
          max={1}
          onChange={uploadImage}
          disabled={isPending}
        />
        <Button
          variant={'ghost'}
          disabled={isPending}
          onClick={removeImage}
          className="flex items-center justify-center gap-3 text-xs text-red-400 bg-none border-none bg-transparent hover:bg-transparent"
          aria-label="remove"
        >
          <Trash className="w-4 h-4" />
          Remove
        </Button>
      </form>
    </div>
  );
};
