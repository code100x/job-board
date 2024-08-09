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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewCustomJob, customJobSchema } from "@/zod/job";
import { useToast } from "../ui/use-toast";
import { createCustomJob } from "@/actions/customjob";

type CustomJobFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomJobsForm = ({ setOpen }: CustomJobFormProps) => {
  const { toast } = useToast();

  const form = useForm<NewCustomJob>({
    resolver: zodResolver(customJobSchema),
    defaultValues: {
      name: "",
      description: "",
      companyName: "",
      payment_type: undefined,
      location: "",
    },
  });

  const handleFormSubmit = async (values: NewCustomJob) => {
    const { payment_type, location } = values;

    if(payment_type == undefined){
        toast({
            title: "Please select your preferred payment type",
            variant: "destructive",
        })
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

    const response = await createCustomJob(values);

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
        className="h-fit flex flex-col gap-3 p-2"
      >
        <div className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Your Name *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full border-gray-400"
                    placeholder="Your Name Please"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Description *
                </FormLabel>
                <FormControl>
                  <Input
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
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Company Name *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full border-gray-400"
                    placeholder="Enter company name here"
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
            name="payment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-800">
                  Payment Method *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred payment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                      <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
                      <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                      <SelectItem value="PAYPAL">Paypal</SelectItem>
                      <SelectItem value="CRYPTO">Crypto</SelectItem>
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
        <div className="w-full flex justify-end items-center mt-4">
          <Button type="submit">Send Custom Job</Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomJobsForm;
