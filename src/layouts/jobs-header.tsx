'use client';
import { jobFilterQuery } from '@/actions/job.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { jobSorting, SortByEnums } from '@/lib/constant/jobs.constant';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
const FormSchema = z.object({
  search: z.string().optional(),
});
const JobsHeader = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    jobFilterQuery({ ...searchParams, search: data.search, page: 1 });
  }
  function sortChangeHandler(value: SortByEnums) {
    jobFilterQuery({ ...searchParams, sortby: value, page: 1 });
  }
  return (
    <div className="flex gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-[1fr_auto] gap-2"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search by title or company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Select
        onValueChange={sortChangeHandler}
        defaultValue={searchParams.sortby}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {jobSorting.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobsHeader;
