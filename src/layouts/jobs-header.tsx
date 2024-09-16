'use client';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useSetQueryParams from '@/hooks/useSetQueryParams';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/icon';
import APP_PATHS from '@/config/path.config';
import { useEffect } from 'react';
import JobFilters from './job-filters';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
const FormSchema = z.object({
  search: z.string().optional(),
});

const JobsHeader = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const pathname = usePathname();
  const isHome = pathname === APP_PATHS.HOME;
  const isJobs = pathname === APP_PATHS.JOBS;
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
    <div className="flex flex-col  gap-5 px-5">
      <Form {...form}>
        <form className="w-full grid grid-cols-[1fr_auto] ">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search by title or company name"
                    {...field}
                    className="rounded-full p-5 py-6  dark:bg-neutral-900 truncate"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex gap-5 max-sm:justify-between justify-end">
        {isHome && (
          <div className={cn('flex items-center px-1 max-sm:hidden ', {})}>
            <Popover>
              <PopoverTrigger className="bg-neutral-100 dark:bg-neutral-900 rounded-full p-3 cursor-pointer">
                <Icon icon="filter" className="cursor-pointer" size="20" />
              </PopoverTrigger>
              <PopoverContent className="bg-transparent border-none shadow-none">
                <JobFilters searchParams={searchParams} />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {(isJobs || isHome) && (
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <Icon icon="filter" className="cursor-pointer" size="20" />
            </SheetTrigger>
            <SheetContent side={'left'} className="h-full w-80">
              <SheetHeader className="mt-2 h-full w-full">
                <ScrollArea>
                  <JobFilters searchParams={searchParams}></JobFilters>
                </ScrollArea>
              </SheetHeader>
            </SheetContent>
          </Sheet>
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
