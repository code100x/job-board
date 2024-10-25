import React from 'react';
import { useForm } from 'react-hook-form';
import {
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { EducationType } from '@/types/user.types';
import {
  addUserEducation,
  editEducation,
} from '@/actions/user.profile.actions';
import { useToast } from '@/components/ui/use-toast';
import { DegreeType, FieldOfStudyType } from '@prisma/client';

const EducationForm = ({
  handleClose,
  selectedEducation,
}: {
  handleClose: () => void;
  selectedEducation: EducationType | null;
}) => {
  const form = useForm<profileEducationType>({
    resolver: zodResolver(profileEducationSchema),
    defaultValues: {
      instituteName: selectedEducation?.instituteName || '',
      degree: selectedEducation?.degree || 'BTech',
      fieldOfStudy: selectedEducation?.fieldOfStudy || 'CS',
      startDate: selectedEducation?.startDate || undefined,
      endDate: selectedEducation?.endDate || undefined,
    },
  });

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
  };

  const { toast } = useToast();

  const onSubmit = async (data: profileEducationType) => {
    try {
      let response;
      if (selectedEducation?.id) {
        response = await editEducation({
          data: data,
          id: selectedEducation?.id,
        });
      } else {
        response = await addUserEducation(data);
      }

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

      handleFormClose();
    } catch (_error) {
      toast({
        title: 'Something went wrong while Adding Skills',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex-1 relative">
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
                    <Input placeholder="Enter Institute Name" {...field} />
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
                      {Object.values(DegreeType).map((type) => (
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
                      {Object.values(FieldOfStudyType).map((type) => (
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
                      onChange={(e) => field.onChange(new Date(e.target.value))}
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
                          e.target.value ? new Date(e.target.value) : undefined
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
              onClick={handleFormClose}
              variant={'outline'}
              className="mt-0 text-slate-500 dark:text-white rounded-[8px]"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-0 text-white rounded-[8px]"
            >
              {form.formState.isSubmitting
                ? 'Please wait ...'
                : `${selectedEducation?.id ? 'Update Education' : 'Add Education'}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
