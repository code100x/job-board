import React, { useRef, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const EditProfileForm = ({ handleClose }: { handleClose: () => void }) => {
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
            Cancel
          </Button>
          <Button type="submit" className="mt-0 text-white rounded-[8px]">
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
