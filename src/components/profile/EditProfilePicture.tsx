'use client';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PencilIcon, Trash } from 'lucide-react';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { updateAvatar } from '@/actions/user.profile.actions';
import { useToast } from '../ui/use-toast';
type Props = {
  imageUrl?: string;
  name: string;
};
export const EditProfilePicture = ({ imageUrl, name }: Props) => {
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadFileAction(formData);
    await updateAvatar(session.data?.user.email || '', response?.url || '');
    if (response.error) {
      toast({
        title: response.error,
        variant: 'destructive',
      });
    } else {
      const res = await updateAvatar(
        session.data?.user.email || '',
        response?.url || ''
      );
      await session.update({ ...session, user: { image: response.url } });
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
    }
  };

  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile/edit`);
  }, [session.status, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4">
      <div className="flex justify-center items-center">
        <Avatar className="cursor-pointer w-64 h-64">
          <AvatarImage className=" object-cover" src={imageUrl || ''} />
          <AvatarFallback className="text-8xl font-bold">{name}</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs text-slate-500">Accepts .PNG, .JPEG, .JPG</span>
      <form className="flex mt-2" method="post" encType="multipart/form-data">
        <Label
          className="flex items-center justify-center gap-3 text-xs bg-slate-950 text-white dark:bg-white dark:text-black rounded-full px-6 cursor-pointer"
          htmlFor="pfp"
        >
          <PencilIcon className="w-4 h-4" />
          Change
        </Label>
        <input
          type="file"
          id="pfp"
          name="pfp"
          className="hidden"
          accept="image/jpeg, image/jpg, image/png"
          max={1}
          onChange={uploadImage}
        />
        <Button
          variant={'ghost'}
          className="flex items-center justify-center gap-3 text-xs text-red-400 bg-none border-none bg-transparent hover:bg-transparent"
        >
          <Trash className="w-4 h-4" />
          Remove
        </Button>
      </form>
    </div>
  );
};
