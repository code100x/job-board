'use client';
import React, { useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil, Settings, Share2, X } from 'lucide-react';
import {
  profileSchema,
  ProfileSchemaType,
} from '@/lib/validators/user.profile.validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';
import { useToast } from '../ui/use-toast';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import ProfileAccountSheet from './ProfileAccountSheet';

const ProfileHeroSection = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
    setIsAccountOpen(false);
  };

  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      aboutMe: '',
      username: '',
      email: '',
      contactEmail: '',
      profileImage: '',
      name: '',
    },
  });
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

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
    data.profileImage = (await submitImage(file)) ?? '/main.svg';
  };

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };
  const profileImageRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  };

  const clearLogoImage = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    setPreviewImg(null);
    setFile(null);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (profileImageRef.current) {
        profileImageRef.current.src = reader.result as string;
      }
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <>
      <div className="border rounded-2xl  h-72 overflow-hidden">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="p-6 relative flex-col flex gap-y-3">
          <Avatar className="h-32 w-32 absolute -top-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-full flex justify-end gap-2">
            <Button
              variant={'outline'}
              className="px-3 py-2 rounded-sm"
              onClick={handleOpen}
            >
              <Pencil height={16} width={16} />
            </Button>
            <Button
              onClick={() => setIsAccountOpen(true)}
              variant={'outline'}
              className="px-3 py-2 rounded-sm"
            >
              <Settings height={16} width={16} />
            </Button>
            <Button variant={'outline'} className="px-3 py-2 rounded-sm">
              <Share2 height={16} width={16} />
            </Button>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Jhone Doe</h2>
            <a href="#" className="text-sm text-primary font-semibold">
              @jhonedoe
            </a>
          </div>
        </div>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0 overflow-y-auto no-scrollbar">
          <SheetHeader>
            <SheetTitle className="text-2xl">Edit Your Profile</SheetTitle>
            <SheetDescription>
              Update your personal information, contact details, and social
              links to keep your profile current and professional.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div className="flex flex-col gap-y-4">
                  <FormLabel> Profile Picture </FormLabel>
                  <div className="flex justify-center">
                    <div
                      className="w-40 h-40 dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
                      onClick={handleClick}
                    >
                      {previewImg ? (
                        <Image
                          src={previewImg}
                          ref={profileImageRef}
                          className="object-contain w-full h-full rounded-md overflow-hidden"
                          alt="Company Logo"
                          width={160}
                          height={160}
                        />
                      ) : (
                        <FaFileUpload
                          height={80}
                          width={80}
                          className="text-white h-10 w-10"
                        />
                      )}
                    </div>
                    {previewImg && (
                      <button
                        type="button"
                        onClick={clearLogoImage}
                        className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full items-center flex justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
                      >
                        <X size="16" />
                      </button>
                    )}

                    <input
                      id="fileInput"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="username"
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
                    name="aboutMe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Me</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write here"
                            {...field}
                            className="rounded-[8px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Describe yourself between 50 to 255 characters.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-4 flex gap-4 justify-end">
                  <Button
                    type="reset"
                    onClick={handleFormClose}
                    variant={'outline'}
                    className="mt-0 text-white rounded-[8px]"
                  >
                    {' '}
                    Cancel{' '}
                  </Button>
                  <Button
                    type="submit"
                    className="mt-0 text-white rounded-[8px]"
                  >
                    {' '}
                    Update Profile{' '}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
      <ProfileAccountSheet isOpen={isAccountOpen} handleClose={handleClose} />
    </>
  );
};

export default ProfileHeroSection;
