import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import {
  profileSchema,
  ProfileSchemaType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserType } from '@/types/user.types';
import { updateUserDetails } from '@/actions/user.profile.actions';

const EditProfileForm = ({
  handleClose,
  userdetails,
}: {
  handleClose: () => void;
  userdetails: UserType;
}) => {
  const { toast } = useToast();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewAvatarImg, setPreviewAvatarImg] = useState<string | null>(
    userdetails.avatar || null
  );
  const [previewBannerImg, setPreviewBannerImg] = useState<string | null>(
    userdetails.banner || null
  );

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: userdetails.email || '',
      contactEmail: userdetails.contactEmail || '',
      avatar: userdetails.avatar || '',
      banner: userdetails.banner || '',
      name: userdetails.name || '',
      discordLink: userdetails.discordLink || '',
      linkedinLink: userdetails.linkedinLink || '',
      twitterLink: userdetails.twitterLink || '',
      githubLink: userdetails.githubLink || '',
      portfolioLink: userdetails.portfolioLink || '',
    },
  });

  const submitImage = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData, 'webp');
      if (!res) {
        throw new Error('Failed to upload image');
      }

      const uploadRes = res;
      return uploadRes.url;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const onSubmit = async (data: ProfileSchemaType) => {
    try {
      if (avatarFile) {
        data.avatar = (await submitImage(avatarFile)) ?? '/main.svg';
      }
      if (bannerFile) {
        data.banner = (await submitImage(bannerFile)) ?? '';
      }
      const response = await updateUserDetails(data);

      if (!response.status) {
        return toast({
          title: response.message || 'Error',
          variant: 'destructive',
        });
      }
      toast({
        title: response.message,
        variant: 'success',
      });
      handleFormClose();
    } catch (_error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong while updating.',
      });
    }
  };

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };
  const profileImageRef = useRef<HTMLImageElement>(null);
  const bannerImageRef = useRef<HTMLImageElement>(null);

  const handleClick = (inputType: string) => {
    if (!inputType) return;
    if (
      (inputType === 'avatarFileInput' && previewAvatarImg) ||
      (inputType === 'bannerFileInput' && previewBannerImg)
    )
      return;

    const fileInput = document.getElementById(
      `${inputType}`
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  };

  const clearLogoImage = (inputType: string) => {
    if (!inputType) return;
    const fileInput = document.getElementById(
      `${inputType}`
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    if (inputType === 'avatarFileInput') {
      setPreviewAvatarImg(null);
      setAvatarFile(null);
      form.setValue('avatar', '');
    } else if (inputType === 'bannerFileInput') {
      setPreviewBannerImg(null);
      setBannerFile(null);
      form.setValue('banner', '');
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    if (!inputType) return;
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (!selectedFile) {
      return;
    }
    if (!selectedFile.type.includes('image')) {
      toast({
        title:
          'Invalid file format. Please upload an image file (e.g., .png, .jpg, .jpeg, .svg ) for the company logo',
        variant: 'destructive',
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (inputType === 'bannerFileInput') {
        if (bannerImageRef.current) {
          bannerImageRef.current.src = reader.result as string;
        }
        setPreviewBannerImg(reader.result as string);
      } else {
        if (profileImageRef.current) {
          profileImageRef.current.src = reader.result as string;
        }
        setPreviewAvatarImg(reader.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);
    if (selectedFile) {
      if (inputType === 'bannerFileInput') setBannerFile(selectedFile);
      else setAvatarFile(selectedFile);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 h-full flex flex-col justify-between"
      >
        <div className="flex flex-col gap-y-4">
          <FormLabel> Banner Picture </FormLabel>
          <div className="flex justify-center">
            <div
              className="w-full h-28 relative dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
              onClick={() => handleClick('bannerFileInput')}
            >
              {previewBannerImg ? (
                <Image
                  src={previewBannerImg}
                  ref={bannerImageRef}
                  className="object-cover w-full h-full rounded-md overflow-hidden"
                  alt="Banner Logo"
                  width={160}
                  height={160}
                />
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <FaFileUpload
                    height={80}
                    width={80}
                    className="text-white h-10 w-10"
                  />
                  <div className="text-sm text-gray-400 dark:text-gray-300 text-center px-4">
                    Upload banner image
                  </div>
                </div>
              )}
              {previewBannerImg && (
                <button
                  type="button"
                  onClick={() => clearLogoImage('bannerFileInput')}
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full items-center flex justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
                >
                  <X size="16" />
                </button>
              )}
            </div>

            <input
              id="bannerFileInput"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, 'bannerFileInput')}
            />
          </div>

          <FormLabel> Profile Picture </FormLabel>
          <div className="flex justify-center">
            <div
              className="w-40 h-40 relative dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
              onClick={() => handleClick('avatarFileInput')}
            >
              {previewAvatarImg ? (
                <Image
                  src={previewAvatarImg}
                  ref={profileImageRef}
                  className="object-cover w-full h-full rounded-md overflow-hidden"
                  alt="Company Logo"
                  width={160}
                  height={160}
                />
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <FaFileUpload
                    height={80}
                    width={80}
                    className="text-white h-10 w-10"
                  />
                  <div className="text-sm text-gray-400 dark:text-gray-300 text-center px-4">
                    Upload profile image
                  </div>
                </div>
              )}
              {previewAvatarImg && (
                <button
                  type="button"
                  onClick={() => clearLogoImage('avatarFileInput')}
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full items-center flex justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
                >
                  <X size="16" />
                </button>
              )}
            </div>

            <input
              id="avatarFileInput"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, 'avatarFileInput')}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
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
                    placeholder="email@gmail.com"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@gmail.com"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Portfolio Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://x.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord Link </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://discord.com/user"
                    {...field}
                    className="rounded-[8px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="py-4 flex gap-4 justify-end">
          <Button
            type="reset"
            onClick={handleFormClose}
            variant={'outline'}
            className="mt-0 text-slate-500 dark:text-slate-400 rounded-[8px]"
          >
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="mt-0 text-white rounded-[8px]"
          >
            {form.formState.isSubmitting ? 'Please wait...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
