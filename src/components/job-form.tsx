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
import { Checkbox } from './ui/checkbox';

const PostJobForm = () => {
  const { toast } = useToast();
  const form = useForm<JobPostSchemaType>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      companyName: '',
      location: '',
      workMode: 'office',
      jobType: 'FULL_TIME',
      experienceLevel: 'MID_LEVEL',
      requiredSkills: [],
      educationLevel: '',
      yearsOfExperience: 0,
      hasSalaryRange: false,
      minSalary: 0,
      maxSalary: 0,
      benefits: [],
      numberOfOpenings: 1,
      remoteWorkOption: false,
      applicationDeadline: '',
      travelRequirements: '',
    },
  });
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
        title: 'Something went wrong while creating job',
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
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-950 to-black shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 p-6 transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-3xl font-bold text-white">Post a New Job</h2>
        <p className="text-gray-400 mt-2">
          Fill in the details to create a new job listing
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Job Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. Acme Inc."
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-300">
                  Job Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                    placeholder="Describe the job role, responsibilities, and requirements..."
                    rows={6}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Work Mode
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750">
                        <SelectValue placeholder="Select work mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {['on-site', 'remote', 'hybrid'].map((mode) => (
                        <SelectItem
                          key={mode}
                          value={mode}
                          className="hover:bg-gray-700"
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Job Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {[
                        'Full-time',
                        'Part-time',
                        'Contract',
                        'Temporary',
                        'Internship',
                      ].map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-gray-700"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Experience Level
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {['Entry', 'Mid-level', 'Senior', 'Executive'].map(
                        (level) => (
                          <SelectItem
                            key={level}
                            value={level}
                            className="hover:bg-gray-700"
                          >
                            {level}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. New York, NY"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfOpenings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Number of Openings
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. 1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requiredSkills"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-300">
                  Required Skills
                </FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'JavaScript',
                    'React',
                    'Node.js',
                    'Python',
                    'SQL',
                    'AWS',
                  ].map((skill) => (
                    <FormField
                      key={skill}
                      control={form.control}
                      name="requiredSkills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={skill}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        skill,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-gray-300">
                              {skill}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Education Level
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. Bachelor's Degree"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Years of Experience
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. 3"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-semibold text-gray-300">
                Salary Range ($ per annum)
              </Label>
              <FormField
                control={form.control}
                name="hasSalaryRange"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-gray-600"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-400">
                      Disclose salary range
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            {watchHasSalaryRange && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Minimum
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-650"
                          placeholder="e.g. 50000"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Maximum
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-650"
                          placeholder="e.g. 100000"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Application Deadline
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="travelRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Travel Requirements
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full bg-gray-800 border-gray-700 text-white rounded-md shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-600 transition-all duration-300 hover:bg-gray-750"
                      placeholder="e.g. 10% travel"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="remoteWorkOption"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-semibold text-gray-300">
                    Remote Work Option Available
                  </FormLabel>
                  <p className="text-sm text-gray-400">
                    Check if this position offers a remote work option
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-md hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md transform hover:scale-105"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Job...
                </span>
              ) : (
                'Create Job'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostJobForm;
