'use client';
import { createJob } from '@/actions/job.action';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  JobPostSchema,
  JobPostSchemaType,
} from '../lib/validators/jobs.validator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { Calendar, LucideRocket, MailOpenIcon } from 'lucide-react';
import JobDescriptionEditor from './JobDescriptionEditor';
import ReactQuill from 'react-quill';
import Image from 'next/image';

const PostJobForm = () => {
  const { toast } = useToast();
  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      companyName: '',
      location: '',
      hasSalaryRange: false,
      minSalary: 0,
      maxSalary: 0,
    },
  });

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: '1' }, { header: '2' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'header',
    'list',
    'bullet',
    'link',
  ];

  const handleFormSubmit = async (data: JobPostSchemaType) => {
    try {
      const response = await createJob(data);

      if (!response.status) {
        return toast({
          title: response.name || 'Something went wrong',
          description: response.message || 'Internal server error',
          variant: 'destructive',
        });
      }
      toast({
        title: response.message,
        variant: 'success',
      });
      form.reset(form.formState.defaultValues);
    } catch (_error) {
      toast({
        title: 'Something went wrong will creating job',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };
  const watchHasSalaryRange = form.watch('hasSalaryRange');

  React.useEffect(() => {
    if (!watchHasSalaryRange) {
      form.clearErrors(['minSalary', 'maxSalary']);
      form.setValue('minSalary', 0);
      form.setValue('maxSalary', 0);
    }
  }, [watchHasSalaryRange, form]);
  return (
    <div className="flex flex-col items-center gap-y-10 justify-center">
      <div className="mt-4 flex gap-2">
        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-48">
          <Calendar className="w-8 h-8 mb-3 mx-auto text-green-500" />
          <p className="text-base font-semibold mb-1">Posted for</p>
          <p className="text-gray-400 text-sm">30 days</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-48">
          <MailOpenIcon className="w-8 h-8 mb-3 mx-auto text-purple-500" />
          <p className="text-base font-semibold mb-1">Emailed to</p>
          <p className="text-gray-400 text-sm">290,301 subscribers</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center text-white w-48">
          <LucideRocket className="w-8 h-8 mb-3 mx-auto text-orange-500" />
          <p className="text-base font-semibold mb-1">Reach</p>
          <p className="text-gray-400 text-sm">
            300,000<span className="text-blue-500">+</span>
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="bg-gray-900 w-[37rem] text-gray-300 p-6 rounded-lg space-y-4"
        >
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
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
                      {/* Add category options here */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Timezone*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-none text-white">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add timezone options here */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Salary*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-none text-white">
                        <SelectValue placeholder="Select a salary range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Add salary range options here */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
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
                      {/* Add job type options here */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Tags</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-gray-800 border-none text-white"
                    placeholder="Search for tags"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Application*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-gray-800 border-none text-white"
                    placeholder="URL or email address"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Please enter a URL or email address
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="bg-gray-900 text-white rounded-lg"
        >
          <JobDescriptionEditor />
        </form>
      </Form>
      <div className="bg-gray-900 p-6 rounded-lg w-[37rem] mx-auto text-gray-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">Company</h2>

        {/* Logo Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-700 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mb-2">
            {/* Placeholder for Avatar */}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Click the avatar to change or upload your company logo
          </p>
        </div>

        {/* Company Name and Email Fields */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-400">
              Company name*
            </label>
            <input
              type="text"
              placeholder="What's your company called?"
              className="w-full px-3 py-2 bg-gray-700 border-none rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-400">
              Company email*
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 bg-gray-700 border-none rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Company bio
          </label>
          <div className="bg-gray-700 rounded-md">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Tell us about your company"
              className="text-white bg-gray-800 overflow-hidden job-description-editor"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg w-[37rem] mx-auto text-gray-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">Payment</h2>
        <Button className="w-full rounded-full mt-4">
          Continue to Payment
        </Button>

        <div className="flex mt-4 gap-2 flex-col items-center">
          <h1 className="text-center text-gray-400">
            &quot;I&apos;m a huge fan of remote work and 100xJobs is by far my
            favorite job board.&quot;
          </h1>
          <Image
            src={'/main.png'}
            alt="100xJobs"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-gray-300">Harkirat Singh</h1>
          <h1 className="text-sm text-gray-300">100xJobs.com</h1>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
