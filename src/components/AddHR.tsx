'use client';
import { HRPostSchema, HRPostSchemaType } from '@/lib/validators/hr.validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useToast } from './ui/use-toast';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { createHR } from '@/actions/hr.actions';
import { Input } from './ui/input';
import { Button } from './ui/button';
import DescriptionEditor from './DescriptionEditor';
import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';
import { X } from 'lucide-react';
import HRPassword from './HRpassword';

const AddHRForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { toast } = useToast();
  const companyLogoImg = useRef<HTMLImageElement>(null);
  const form = useForm<HRPostSchemaType>({
    resolver: zodResolver(HRPostSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      companyBio: '',
      companyLogo: '/main.svg',
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
      if (companyLogoImg.current) {
        companyLogoImg.current.src = reader.result as string;
      }
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
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
  const createHRHandler = async (data: HRPostSchemaType) => {
    try {
      data.companyLogo = (await submitImage(file)) ?? '/main.svg';
      const response = await createHR(data);

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
      setPreviewImg(null);
      if (response.additional?.password)
        setPassword(response.additional?.password);
      form.reset(form.formState.defaultValues);
    } catch (_error) {
      toast({
        title: 'Something went wrong will creating HR',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };
  const handleDescriptionChange = (fieldName: any, value: String) => {
    form.setValue(fieldName, value);
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  };

  const reset = () => {
    setPassword('');
    form.reset();
  };
  return (
    <div className="flex flex-col items-center md:w-[30rem] w-full gap-y-10 justify-center mb-20">
      <div className="flex-col w-full justify-center mt-5">
        {!password && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(createHRHandler)}
              className="flex flex-col max-w-full space-y-7"
            >
              <div className="dark:bg-gray-900 bg-gray-100 w-full dark:text-gray-300 p-6 rounded-lg space-y-7">
                <h2 className="text-2xl font-semibold mb-6"> HR Details </h2>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium"> Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full dark:bg-gray-800 border-none text-white"
                          placeholder="Name"
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
                      <FormLabel className="font-medium"> Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full dark:bg-gray-800 border-none text-white"
                          placeholder="name@gmail.com"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="dark:bg-gray-900 bg-gray-100 w-full p-6 rounded-lg  mx-auto dark:text-gray-300">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">
                  Company
                </h2>

                {/* Logo Upload Section */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div
                      className="w-20 h-20 dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
                      onClick={handleClick}
                    >
                      {previewImg ? (
                        <Image
                          src={previewImg}
                          ref={companyLogoImg}
                          className="object-contain w-full h-full"
                          alt="Company Logo"
                          width={80}
                          height={80}
                        />
                      ) : (
                        <FaFileUpload className="text-white text-2xl" />
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
                  </div>
                  <input
                    id="fileInput"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Click the avatar to change or upload your company logo
                  </p>
                </div>

                {/* Company Name and Email Fields */}

                <div>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 dark:text-gray-400 font-normal">
                          Company Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full dark:bg-gray-800 border-none text-white"
                            placeholder="Company Name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="mt-5">
                    <label className="block text-sm mb-1 dark:text-gray-400">
                      Company bio *
                    </label>
                  </div>
                  <div className="dark:bg-gray-800 rounded-xl mt-2 overflow-hidden">
                    <DescriptionEditor
                      fieldName="companyBio"
                      initialValue={form.getValues('companyBio')}
                      onDescriptionChange={handleDescriptionChange}
                      placeholder={'Tell us about your company'}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end items-center my-4 ">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Please wait...' : 'Create HR'}
                </Button>
              </div>
            </form>
          </Form>
        )}
        <HRPassword password={password} reset={reset} />
      </div>
    </div>
  );
};

export default AddHRForm;
