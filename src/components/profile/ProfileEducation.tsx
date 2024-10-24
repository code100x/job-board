'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import {
  DegreeEnum,
  FieldOfStudyEnum,
  profileEducationSchema,
  profileEducationType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import _ from 'lodash';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const ProfileEducation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  const form = useForm<profileEducationType>({
    resolver: zodResolver(profileEducationSchema),
    defaultValues: {
      instituteName: '',
      degree: DegreeEnum.BTech,
      fieldOfStudy: FieldOfStudyEnum.CS,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };

  const onSubmit = () => {};

  return (
    <>
      <h3 className="font-bold text-2xl">Education</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <Info width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">You haven’t added education yet</h4>
          <p className="text-sm font-medium text-gray-500">
            Provide your education background to complete your profile.
          </p>
        </div>
        <Button onClick={handleOpen} className="text-white rounded-sm">
          Add your education
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Project</SheetTitle>
            <SheetDescription>
              Highlight key project that demonstrate your technical abilities
              and innovative problem-solving.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div className=" flex flex-col gap-y-4">
                  <FormField
                    control={form.control}
                    name="instituteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Project Name </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Institute Name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
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
                            {Object.values(DegreeEnum).map((type) => (
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
                    name="fieldOfStudy"
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
                            {Object.values(FieldOfStudyEnum).map((type) => (
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
                    Add Education{' '}
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

export default ProfileEducation;
