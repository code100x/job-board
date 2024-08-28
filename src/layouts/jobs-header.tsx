'use client';
import { jobFilterQuery } from '@/actions/job.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { jobSorting, SortByEnums } from '@/lib/constant/jobs.constant';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useDebounce } from '@uidotdev/usehooks';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';
import JobFilters from './job-filters';
import Icon from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';
import { useEffect } from 'react';
const FormSchema = z.object({
  search: z.string().optional(),
});

const JobsHeader = ({
  searchParams,
  baseUrl,
}: {
  searchParams: JobQuerySchemaType;
  baseUrl: string;
}) => {
  const pathname = usePathname();
  const isHome = pathname === APP_PATHS.HOME;
  const router = useRouter();

  function sortChangeHandler(value: SortByEnums) {
    jobFilterQuery({ ...searchParams, sortby: value, page: 1 }, baseUrl);
  }

  let debounceTimeout: NodeJS.Timeout;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: '',
    },
  });

  const searchValue = form.watch('search');
  const debouncedSearchValue = useDebounce(searchValue, 100);

  useEffect(() => {
    const fetch = async () => {
      if (debouncedSearchValue !== 'undefined') {
        if (debouncedSearchValue?.length) {
          await onSubmit({ search: debouncedSearchValue });
        } else {
          router.push(baseUrl);
        }
      } else {
        router.push(baseUrl);
      }
    };

    fetch();
  }, [debouncedSearchValue]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    jobFilterQuery(
      {
        ...searchParams,
        search: data.search,
        page: 1,
      },
      baseUrl
    );
  }

  return (
    <div className="flex flex-col  gap-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" relative w-full grid grid-cols-[1fr_auto]  "
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
                    className="rounded-full p-5 py-6 dark:bg-neutral-900 truncate"
                    onChange={(e) => {
                      field.onChange(e);
                      if (debounceTimeout) {
                        clearTimeout(debounceTimeout);
                      }
                      debounceTimeout = setTimeout(() => {
                        form.handleSubmit(onSubmit)();
                      }, 300);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex gap-5 justify-end items-center">
        {isHome && (
          <Popover>
            <PopoverTrigger className="bg-neutral-100 dark:bg-neutral-900 rounded-full p-3 cursor-pointer">
              <Icon icon="filter" className="cursor-pointer" size="20" />
            </PopoverTrigger>
            <PopoverContent className="bg-transparent border-none">
              <JobFilters searchParams={searchParams} baseUrl={baseUrl} />
            </PopoverContent>
          </Popover>
        )}

        <Select
          onValueChange={sortChangeHandler}
          defaultValue={searchParams.sortby}
        >
          <SelectTrigger className="w-[180px] rounded-full dark:bg-neutral-900 p-3 py-4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xl dark:bg-neutral-900">
            {jobSorting.map((item) => (
              <SelectItem
                className="rounded-lg"
                key={item.id}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobsHeader;
