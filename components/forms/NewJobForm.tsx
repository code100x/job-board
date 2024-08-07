"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewJob, newJobSchema } from "@/zod/job";
import { useToast } from "../ui/use-toast";
import { createJob } from "@/actions/job";
import { useState } from "react";
import CustomInput from "../CustomInput";

type NewJobFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewJobForm = ({ setOpen }: NewJobFormProps) => {
  const { toast } = useToast();

  const form = useForm<NewJob>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      title: "",
      description: "",
      companyName: "",
      salary: "",
      currency: "",
      location: "",
      state: undefined,
      country: undefined,
    },
  });

  const location = form.watch("location");

  const handleFormSubmit = async (values: NewJob) => {
    const { currency, location } = values;

    if (currency !== "USD" && currency !== "INR") {
      toast({
        title: "Please select the currency",
        variant: "destructive",
      });
      return;
    }

    if (
      location !== "REMOTE" &&
      location !== "HYBRID" &&
      location !== "OFFICE"
    ) {
      toast({
        title: "Please select the location",
        variant: "destructive",
      });
      return;
    }

    const response = await createJob(values);

    if (response?.status !== "success") {
      toast({
        title: response.message,
        variant: "destructive",
      });
      setOpen(false);
      return;
    }

    toast({
      title: response.message,
      variant: "default",
    });
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full h-fit flex flex-col gap-3"
      >
        <div className="w-full flex justify-between items-center gap-2">
          <div className="w-full flex flex-col gap-1">
            <CustomInput
              type="text"
              name="title"
              label="Job Title *"
              control={form.control}
              placeholderText="Enter job title here"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    Company Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full border-gray-400"
                      placeholder="Enter comapany name here"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Description *
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full h-28 max-h-28 overflow-auto border-gray-400 resize-none"
                    placeholder="Enter description here"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold text-gray-800"
            htmlFor="salary"
          >
            Salary *
          </label>
          <div className="flex justify-center items-center gap-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full border-gray-400"
                      placeholder="Enter comapany name here"
                    />
                  </FormControl>
                  <FormMessage className="text-xs absolute" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Location *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="REMOTE">Remote</SelectItem>
                    <SelectItem value="HYBRID">Hybird</SelectItem>
                    <SelectItem value="OFFICE">Office</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-between items-center gap-2">
          <div className="w-full flex flex-col gap-1">
            <FormField
              disabled={location === "" || location === "REMOTE"}
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full border-gray-400"
                      placeholder="Enter your state here"
                    />
                  </FormControl>
                  <FormMessage className="text-xs absolute" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormField
              disabled={location === "" || location === "REMOTE"}
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full border-gray-400"
                      placeholder="Enter your country here"
                    />
                  </FormControl>
                  <FormMessage className="text-xs absolute" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex justify-end items-center mt-5">
          <Button type="submit">Create Job</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewJobForm;
