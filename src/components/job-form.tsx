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
import {
  Calendar as CalendarIcon,
  LucideRocket,
  MailOpenIcon,
} from 'lucide-react';
import DescriptionEditor from './DescriptionEditor';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

const DynamicGmapsAutoSuggest = dynamic(() => import('./gmaps-autosuggest'), {
  ssr: false,
});
import { Currency, EmployementType } from '@prisma/client';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import APP_PATHS from '@/config/path.config';
import { SkillsCombobox } from './skills-combobox';
import { getAllCompanies } from '@/actions/company.actions';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { CompanyForm } from './company-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from '@/components/ui/calendar';

const PostJobForm = () => {
  const session = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/create`);
  }, [session.status, router]);

  const { toast } = useToast();
  // const companyLogoImg = useRef<HTMLImageElement>(null);
  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      city: '',
      companyId: '',
      address: '',
      currency: 'USD',
      hasExperiencerange: true,
      minExperience: 0,
      maxExperience: 0,
      workMode: 'remote',
      type: EmployementType.Full_time,
      category: 'design',
      hasExpiryDate: true,
      expiryDate: undefined,
      hasSalaryRange: true,
      minSalary: 0,
      maxSalary: 0,
      application: '',
    },
  });

  const gmapsInputRef = useRef<any>(null);

  const [companies, setCompanies] = useState<
    {
      id: string;
      name: string;
      email: string;
      website: string | null;
      bio: string;
      logo: string;
    }[]
  >([]);

  const fetchCompanies = async () => {
    const response = await getAllCompanies();
    if (response.status) {
      setCompanies(response?.data?.companies);
    }
  };
  React.useEffect(() => {
    fetchCompanies();
  }, [companies]);
  const handleDescriptionChange = (fieldName: any, value: String) => {
    form.setValue(fieldName, value);
  };

  // const submitImage = async (file: File | null) => {
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const uniqueFileName = `${Date.now()}-${file.name}`;
  //     formData.append('uniqueFileName', uniqueFileName);

  //     const res = await uploadFileAction(formData);
  //     if (!res) {
  //       throw new Error('Failed to upload image');
  //     }

  //     const uploadRes = res;
  //     return uploadRes.url;
  //   } catch (error) {
  //     console.error('Image upload failed:', error);
  //   }
  // };

  const handleFormSubmit = async (data: JobPostSchemaType) => {
    try {
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
  const watchHasExpiryDate = form.watch('hasExpiryDate');

  const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<
    string[]
  >([]);

  React.useEffect(() => {
    if (!watchHasSalaryRange) {
      form.clearErrors(['minSalary', 'maxSalary']);
      form.setValue('minSalary', 0);
      form.setValue('maxSalary', 0);
    }
    // form.setValue('', '/main.svg');
  }, [watchHasSalaryRange, form]);

  if (session.status === 'loading') return null;

  return (
    <div className="flex flex-col items-center md:w-[30rem] w-full gap-y-10 justify-center mb-20">
      <div className="w-full md:justify-center mt-4 flex flex-col md:flex-row gap-2">
        <div className="dark:bg-gray-800/90 bg-gray-100 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <CalendarIcon className="w-8 h-8 mb-3 mx-auto text-green-500" />
          <p className="text-base font-semibold mb-1 dark:text-inherit text-gray-800">
            Posted for
          </p>
          <p className="dark:text-gray-400 text-gray-600 text-sm">30 days</p>
        </div>

        <div className="dark:bg-gray-800/90 bg-gray-100 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <MailOpenIcon className="w-8 h-8 mb-3 mx-auto text-purple-500" />
          <p className="text-base font-semibold mb-1 dark:text-inherit text-gray-800">
            Emailed to
          </p>
          <p className="dark:text-gray-400 text-gray-600 text-sm">
            17,000 subscribers
          </p>
        </div>

        <div className="dark:bg-gray-800/90 bg-gray-100 backdrop-blur-sm p-4 rounded-lg text-center text-white w-full md:w-48">
          <LucideRocket className="w-8 h-8 mb-3 mx-auto text-orange-500" />
          <p className="text-base font-semibold mb-1 dark:text-inherit text-gray-800">
            Reach
          </p>
          <p className="dark:text-gray-400 text-gray-600 text-sm">
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
            <div className="dark:bg-gray-900 bg-gray-100 w-full dark:text-gray-300 p-6 rounded-lg space-y-7">
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
                        className="w-full dark:bg-gray-800 border-none text-white"
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
                          <SelectTrigger className="dark:bg-gray-800 border-none dark:text-white">
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
                          <SelectTrigger className="dark:bg-gray-800 border-none dark:text-white">
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
                          <SelectTrigger className="dark:bg-gray-800 border-none dark:text-white">
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
                                className="w-full dark:bg-gray-800 border-gray-400"
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
                                className="w-full dark:bg-gray-800 border-gray-400"
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
                                <SelectTrigger className="dark:bg-gray-800 border-none dark:text-white">
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
                                className="w-full dark:bg-gray-800 border-gray-400"
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
                                className="w-full dark:bg-gray-800 border-gray-400"
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
              <div className="flex flex-col gap-2">
                <Label>Expiry date</Label>
                <FormField
                  control={form.control}
                  name="hasExpiryDate"
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
                        Does this job posting have an expiry date?
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {watchHasExpiryDate && (
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <div className="space-y-0.5"></div>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-[240px] pl-3 text-left font-normal dark:bg-gray-800 
                                      `} // No color change on hover
                                >
                                  {field.value ? (
                                    format(new Date(field.value), 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <span className="ml-auto">📅</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  aria-selected={field.value}
                                  onSelect={(date: any) => {
                                    field.onChange(date); // Update the field value with the selected date
                                  }}
                                  aria-disabled={(date: any) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <FormLabel className="font-medium">Location</FormLabel>
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
                        className="w-full dark:bg-gray-800 border-none dark:text-white"
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
            <div className="dark:bg-gray-900 bg-gray-100 w-full p-6 rounded-lg space-y-4 mx-auto my-6">
              <h2 className="text-sm dark:text-white capitalize">
                Job description
              </h2>
              <div className="dark:bg-gray-800 rounded-xl mt-2 overflow-hidden">
                <DescriptionEditor
                  fieldName="description"
                  initialValue={form.getValues('description')}
                  onDescriptionChange={handleDescriptionChange}
                  placeholder={'Tell us about your job'}
                />
              </div>
            </div>
            <div className="dark:bg-gray-900 bg-gray-100 w-full p-6 rounded-lg  mx-auto dark:text-gray-300">
              <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">
                Company
              </h2>
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Select a Company*
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-gray-800 border-none text-white">
                          <SelectValue placeholder="Select a company that you have already posted a job for" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies.map((company, index) => (
                            <SelectItem key={index} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 w-full p-6 mx-auto justify-center items-center">
                <Separator className="w-1/2" /> OR{' '}
                <Separator className="w-1/2" />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="flex w-full justify-end underline">
                  Manually fill company details
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <h2 className="text-lg font-semibold mb-4 text-gray-300">
                        Company Details
                      </h2>
                    </DialogTitle>
                  </DialogHeader>
                  <CompanyForm setIsDialogOpen={setIsDialogOpen} />
                </DialogContent>
              </Dialog>
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
