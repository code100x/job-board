'use client';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useSetQueryParams from '@/hooks/useSetQueryParams';
import { useEffect } from 'react';

const FormSchema = z.object({
  search: z.string().optional(),
});

const JobsHeader = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const setQueryParams = useSetQueryParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });
  const formValues = form.watch();

  function sortChangeHandler(value: SortByEnums) {
    setQueryParams({ sortby: value, page: 1 });
  }

  useEffect(() => {
    setQueryParams({
      search: formValues.search,
    });
  }, [formValues, searchParams, setQueryParams]);

  return (
    <div className="flex gap-5">
      <Form {...form}>
        <form className="w-full grid grid-cols-[1fr_auto] gap-2">
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
