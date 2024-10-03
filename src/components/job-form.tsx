'use client';
import { createJob } from '@/actions/job.action';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  JobPostSchema,
  JobPostSchemaType,
} from '../lib/validators/jobs.validator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { Calendar, LucideRocket, MailOpenIcon } from 'lucide-react';
import DescriptionEditor from './DescriptionEditor';
import Image from 'next/image';
import { FaFileUpload } from 'react-icons/fa';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import dynamic from 'next/dynamic';
import { uploadFileAction } from '@/actions/upload-to-cdn';

const DynamicGmapsAutoSuggest = dynamic(() => import('./gmaps-autosuggest'), {
  ssr: false,
});
import { Currency, EmployementType } from '@prisma/client';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';
import { SkillsCombobox } from './skills-combobox';

const PostJobForm = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/create`);
  }, [session.status]);

  const { toast } = useToast();
  const companyLogoImg = useRef<HTMLImageElement>(null);
  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      companyName: '',
      companyBio: '',
      companyEmail: '',
      city: '',
      address: '',
      companyLogo: '',
      currency: 'USD',
      hasExperiencerange: true,
      minExperience: 0,
      maxExperience: 0,
      workMode: 'remote',
      type: EmployementType.Full_time,
      category: 'design',
      hasSalaryRange: true,
      minSalary: 0,
      maxSalary: 0,
      application: '',
    },
  });

  const gmapsInputRef = useRef<any>(null);

  const handleClick = () => {
    //@ts-ignore
    document.getElementById('fileInput').click();
  };

  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleDescriptionChange = (fieldName: any, value: String) => {
    form.setValue(fieldName, value);
  };

  const submitImage = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData);
      if (!res) {
        throw new Error('Failed to upload image');
      }

      const uploadRes = res;
      return uploadRes.url;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
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

  const handleFormSubmit = async (data: JobPostSchemaType) => {
    try {
      data.companyLogo =
        (await submitImage(file)) ?? 'https://wwww.example.com';
      const response = await createJob(data);

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

      if (gmapsInputRef.current) {
        gmapsInputRef.current.reset();
      }

      form.reset(form.formState.defaultValues);
      setComboBoxSelectedValues([]);
    } catch (_error) {
      toast({
        title: 'Something went wrong will creating job',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };
  const watchHasSalaryRange = form.watch('hasSalaryRange');
  const watchHasExperienceRange = form.watch('hasExperiencerange');

  const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<
    string[]
  >([]);

  React.useEffect(() => {
    if (!watchHasSalaryRange) {
      form.clearErrors(['minSalary', 'maxSalary']);
      form.setValue('minSalary', 0);
      form.setValue('maxSalary', 0);
    }
    form.setValue('companyLogo', 'https://wwww.example.com');
  }, [watchHasSalaryRange, form]);

  if (session.status === 'loading') return null;

  return (
    <div className="flex flex-col items-center w-[30rem] gap-y-10 justify-center mb-20">
      <div className="w-full md:justify-center mt-4 flex flex-col md:flex-row gap-2">
        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <Calendar className="w-8 h-8 mb-3 mx-auto text-green-500" />
          <p className="text-base font-semibold mb-1">Posted for</p>
          <p className="text-gray-400 text-sm">30 days</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <MailOpenIcon className="w-8 h-8 mb-3 mx-auto text-purple-500" />
          <p className="text-base font-semibold mb-1">Emailed to</p>
          <p className="text-gray-400 text-sm">17,000 subscribers</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <LucideRocket className="w-8 h-8 mb-3 mx-auto text-orange-500" />
          <p className="text-base font-semibold mb-1">Reach</p>
          <p className="text-gray-400 text-sm">
            500,000<span className="text-blue-500">+</span>
          </p>
        </div>
      </div>
      <div className="flex-col w-full justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col max-w-full"
          >
            <div className="bg-gray-900 w-full text-gray-300 p-6 rounded-lg space-y-7">
              <h2 className="text-2xl font-semibold mb-6">Job details</h2>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Job title*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full bg-gray-800 border-none text-white"
                        placeholder="What's the job?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Category*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-none text-white">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Work mode*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-none text-white">
                            <SelectValue placeholder="Select a workmode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Type*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-none text-white">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(EmployementType).map((item, index) => {
                            return (
                              <SelectItem key={index} value={item}>
                                {_.startCase(item)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="">
                    <Label>Salary Range &#40;in $ per annum&#41;</Label>
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="hasSalaryRange"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-y-0 gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400"
                            />
                          </FormControl>

                          <FormLabel className="mt-0">
                            Do you want to disclose the salary range?
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {watchHasSalaryRange && (
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="minSalary"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <div className="space-y-0.5">
                              <FormLabel>Min</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-gray-800 border-gray-400"
                                placeholder="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxSalary"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <div className="space-y-0.5">
                              <FormLabel>Max</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-gray-800 border-gray-400"
                                placeholder="0"
                              />
                            </FormControl>{' '}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-none text-white">
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.keys(Currency).map((c, index) => {
                                  return (
                                    <SelectItem key={index} value={c}>
                                      {c}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="">
                    <Label>Experience Range in Years</Label>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="hasExperiencerange"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-y-0 gap-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400"
                            />
                          </FormControl>

                          <FormLabel className="mt-0">
                            Is there an experience range required for this role
                            ?
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  {watchHasExperienceRange && (
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="minExperience"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <div className="space-y-0.5">
                              <FormLabel>Min</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-gray-800 border-gray-400"
                                placeholder="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxExperience"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <div className="space-y-0.5">
                              <FormLabel>Max</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-gray-800 border-gray-400"
                                placeholder="0"
                              />
                            </FormControl>{' '}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel className="font-medium">Loction</FormLabel>
                <DynamicGmapsAutoSuggest
                  innerRef={gmapsInputRef}
                  form={form}
                ></DynamicGmapsAutoSuggest>
              </div>
              <FormField
                control={form.control}
                name="application"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Application Link*
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full bg-gray-800 border-none text-white"
                        placeholder="Please enter a URL or Link for application"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <SkillsCombobox
                comboBoxSelectedValues={comboBoxSelectedValues}
                setComboBoxSelectedValues={setComboBoxSelectedValues}
                form={form}
              ></SkillsCombobox>
            </div>
            <div className="bg-gray-900 w-full p-6 rounded-lg space-y-4 mx-auto my-6">
              <h2 className="text-sm text-white capitalize">Job description</h2>
              <div className="bg-gray-800 rounded-xl mt-2 overflow-hidden">
                <DescriptionEditor
                  fieldName="description"
                  initialValue={form.getValues('description')}
                  onDescriptionChange={handleDescriptionChange}
                  placeholder={'Tell us about your job'}
                />
              </div>
            </div>
            <div className="bg-gray-900 w-full p-6 rounded-lg  mx-auto text-gray-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-300">
                Company
              </h2>

              {/* Logo Upload Section */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-20 h-20 bg-gray-700 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2"
                  onClick={handleClick}
                >
                  {previewImg ? (
                    <Image
                      src={previewImg}
                      ref={companyLogoImg}
                      className="object-cover w-full h-full"
                      alt="Company Logo"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <FaFileUpload className="text-white text-2xl" />
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
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Company name*
                        </FormLabel>
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
                    name="companyEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Company email*
                        </FormLabel>
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
              <div>
                <label className="block text-sm mb-1 text-gray-400">
                  Company bio
                </label>
                <div className="bg-gray-800 rounded-xl mt-2 overflow-hidden">
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
                {form.formState.isSubmitting ? 'Please wait...' : 'Create Job'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostJobForm;
