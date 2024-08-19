'use client';
import { createJob, updateJob } from '@/actions/job.action';

import { useRouter } from 'next/navigation';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  JobPostSchema,
  JobPostSchemaType,
} from '../lib/validators/jobs.validator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useToast } from './ui/use-toast';
import { filters } from '@/lib/constant/jobs.constant';
import { useQueryClient } from '@tanstack/react-query';
import { getJobType } from '@/types/jobs.types';

const PostJobForm = ({ job }: getJobType) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: job?.title || '',
      description: job?.description || '',
      companyName: job?.companyName || '',
      location: job?.location || '',
      hasSalaryRange: job?.hasSalaryRange || false,
      minSalary: job?.minSalary || 0,
      maxSalary: job?.maxSalary || 0,
      currency: job?.currency || 'INR',
    },
  });
  const handleFormSubmit = async (data: JobPostSchemaType) => {
    if (!job) {
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
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        router.push('/admin/jobs');
      } catch (_error) {
        toast({
          title: 'Something went wrong will creating job',
          description: 'Internal server error',
          variant: 'destructive',
        });
      }
    } else {
      try {
        const response = await updateJob(data, job.id);

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
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        router.push('/admin/jobs');
      } catch (_error) {
        toast({
          title: 'Something went wrong will creating job',
          description: 'Internal server error',
          variant: 'destructive',
        });
      }
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="h-fit flex flex-col gap-3 p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
          <div className="space-y-10">
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-400"
                        placeholder="Job Title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="workMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold ">
                      Work Mode
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-400">
                          <SelectValue placeholder="Select work mode type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filters.workMode.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-400"
                        placeholder="Job Title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="">
                <Label>Salary Range &#40;in $ per annum&#41;</Label>
              </div>
              <FormField
                control={form.control}
                name="hasSalaryRange"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0 gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
                          className="w-full border-gray-400"
                          placeholder="Enter comapany name here"
                        />
                      </FormControl>{' '}
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
                          className="w-full border-gray-400"
                          placeholder="Enter comapany name here"
                        />
                      </FormControl>{' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div className=" space-y-4">
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full border-gray-400"
                        placeholder="Enter description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-400"
                        placeholder="Enter comapany name here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Currency
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border-gray-400"
                        placeholder="Currency"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-center mt-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? 'Please wait...'
              : `${job ? 'Update Job' : 'Create Job'}`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostJobForm;
