'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import {
  expFormSchemaType,
  expFormSchema,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import _ from 'lodash';
import { EmployementType, WorkMode } from '@prisma/client';
import { Switch } from '../ui/switch';

const ProfileExperience = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };
  const form = useForm<expFormSchemaType>({
    resolver: zodResolver(expFormSchema),
    defaultValues: {
      companyName: '',
      designation: '',
      EmploymentType: 'Full_time',
      address: '',
      workMode: 'office',
      currentWorkStatus: false,
      startDate: undefined,
      endDate: undefined,
      description: '',
    },
  });
  const WatchCurrentWorkStatus = form.watch('currentWorkStatus');
  const onSubmit = () => {};

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };
  return (
    <>
      <h3 className="font-bold text-2xl">Work Experience</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <Info width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t added work experience yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Share your experience to attract the right companies.
          </p>
        </div>
        <Button onClick={handleOpen} className="text-white rounded-sm">
          Add your work experience
        </Button>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add Work Experience</SheetTitle>
            <SheetDescription>
              Share your work history to highlight your career journey and
              expertise for employers.
            </SheetDescription>
          </SheetHeader>
          <div className=" flex-1 relative overflow-y-auto no-scrollbar">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div className="flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="EmploymentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(EmployementType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {_.startCase(type)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Mode</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(WorkMode).map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {_.startCase(mode)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentWorkStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Currently working here</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split('T')[0]
                                : ''
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!WatchCurrentWorkStatus && (
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={
                                field.value
                                  ? field.value.toISOString().split('T')[0]
                                  : ''
                              }
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? new Date(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          Describe your role and responsibilities (50-255
                          characters)
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
                    Add Project{' '}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileExperience;
