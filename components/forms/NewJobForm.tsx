"use client";
import { Button } from "../ui/button";
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
import CustomInput from "../CustomInput";
import { INR, USD } from "@/lib/data";

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
      jobType: "",
      state: undefined,
      country: undefined,
    },
  });

  const location = form.watch("location");
  const currency = form.watch("currency");
  let amount: {
    placeholder: string;
    value: string;
  }[];

  if (currency === "USD") {
    amount = USD;
  }

  if (currency === "INR") {
    amount = INR;
  }

  const handleFormSubmit = async (values: NewJob) => {
    const { location, state, country } = values;

    if (location !== "REMOTE") {
      if (state === undefined || country === undefined) {
        toast({
          title: "Please select state and country",
          variant: "destructive",
        });
        return;
      }
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
        className="w-full h-fit flex flex-col gap-5"
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
            <CustomInput
              type="text"
              name="companyName"
              label="Company Name *"
              control={form.control}
              placeholderText="Enter company name here"
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
          <div className="w-full flex justify-center items-center gap-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-2/6">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Currency" />
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
                <FormItem className="w-4/6">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Salary Range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amount?.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.placeholder}
                          </SelectItem>
                        );
                      })}
                      {!amount || amount === null ? (
                        <p className="text-rose-500 text-sm p-3">
                          Please select currency
                        </p>
                      ) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-between items-center gap-2">
          <div className="w-full flex flex-col gap-1">
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
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    Select Role Type *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="FullTime">Full Time</SelectItem>
                      <SelectItem value="PartTime">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-between items-center gap-2">
          <div className="w-full flex flex-col gap-1">
            <CustomInput
              type="text"
              name="state"
              disabled={location === "" || location === "REMOTE"}
              label="State"
              control={form.control}
              placeholderText="Enter your state here"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <CustomInput
              type="text"
              name="country"
              disabled={location === "" || location === "REMOTE"}
              label="Country"
              control={form.control}
              placeholderText="Enter your country here"
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
