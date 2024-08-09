import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../ui/button";
import { WorkExperience, workExperienceSchema } from "@/zod/profile";

interface WorkExperienceFormProps {
  onSave: (experience: WorkExperience & { id: string }) => void;
  editingId: string | null;
  experiences: (WorkExperience & { id: string })[];
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ onSave, editingId, experiences }) => {
  const form = useForm<WorkExperience>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      currentlyWork: false,
      description: "",
      positionType: undefined,
    },
  });

  const { watch, handleSubmit, reset } = form;
  const currentlyWork = watch("currentlyWork");

  useEffect(() => {
    if (editingId) {
      const experienceToEdit = experiences.find((exp) => exp.id === editingId);
      if (experienceToEdit) {
        form.reset(experienceToEdit);
      }
    } else {
      reset();
    }
  }, [editingId, experiences, form, reset]);

  const onSubmit = (data: WorkExperience) => {
    const experience = { ...data, id: editingId || Date.now().toString() };
    onSave(experience);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Company*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Company"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Title*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Start date*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Start date"
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
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">End date*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="End date"
                  disabled={currentlyWork}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentlyWork"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 mb-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-gray-700 font-normal">I currently work here</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Description"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionType"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="block text-gray-700 text-sm font-bold mb-2">Position Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select position type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FULLTIME">Full-time</SelectItem>
                  <SelectItem value="PARTTIME">Part-time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="INTERNSHIP">Internship</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {editingId ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkExperienceForm;
