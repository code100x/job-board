'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import DescriptionEditor from './DescriptionEditor';
import { useForm } from 'react-hook-form';
import {
  CompanySchema,
  CompanySchemaType,
} from '@/lib/validators/companies.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { toast } from './ui/use-toast';
import { createCompany } from '@/actions/company.actions';
import { usePathname, useRouter } from 'next/navigation';

export const CompanyForm = ({ setIsDialogOpen }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const companyLogoImg = useRef<HTMLImageElement>(null);

  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      bio: '',
      logo: 'https://www.example.com',
    },
  });

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
  };

  const submitImage = async (file: File | null) => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('file', file);
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData, 'webp');

      if (!res) {
        throw new Error('Failed to upload image');
      }

      setIsUploading(false);
      return res.url;
    } catch (error) {
      setIsUploading(false);
      console.error('Image upload failed:', error);
    }
  };

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Basic file validation
    if (!selectedFile.type.startsWith('image/')) {
      return toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      if (companyLogoImg.current) {
        companyLogoImg.current.src = reader.result as string;
      }
      setPreviewImg(reader.result as string);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDescriptionChange = (fieldName: any, value: string) => {
    form.setValue(fieldName, value);
  };

  const handleFormSubmit = async (data: CompanySchemaType) => {
    try {
      data.logo = (await submitImage(file)) ?? 'https://www.example.com';
      const response = await createCompany(data);

      if (!response.status) {
        return toast({
          title: response.msg || 'Error',
          variant: 'destructive',
        });
      }
      router.push(pathname);
      toast({
        title: response.msg || 'Company created successfully',
        variant: 'success',
      });

      setPreviewImg(null);
      setFile(null);
      form.reset(form.formState.defaultValues);
      setIsDialogOpen(false);
    } catch (_error) {
      toast({
        title: 'Something went wrong while creating the company',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full rounded-lg mx-auto text-gray-300"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <label
              htmlFor="fileInput"
              className="w-20 h-20 bg-gray-700 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
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
            </label>
            {previewImg && (
              <button
                type="button"
                onClick={clearLogoImage}
                className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
              >
                <X size="16" />
              </button>
            )}
          </div>
          <input
            name="logo"
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
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Company name*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-none text-white"
                      placeholder="What's your company called?"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Company email*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-none text-white"
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Company Bio */}
        <div className="mb-4">
          <FormLabel className="block text-sm mb-1 text-gray-400">
            Company bio
          </FormLabel>
          <div className="bg-gray-800 rounded-xl mt-2 overflow-hidden">
            <DescriptionEditor
              fieldName="bio"
              initialValue={form.getValues('bio')}
              onDescriptionChange={handleDescriptionChange}
              placeholder="Tell us about your company"
            />
          </div>
        </div>

        {/* Company Website */}
        <div className="flex-1 mb-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Company website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-gray-800 border-none text-white"
                    placeholder="Enter your company website"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={form.formState.isSubmitting || isUploading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {form.formState.isSubmitting || isUploading
              ? 'Please wait...'
              : 'Save'}
          </button>
        </div>
      </form>
    </Form>
  );
};
