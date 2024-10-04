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
import { Filter, SearchIcon } from 'lucide-react';
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
    <div className="flex max-sm:flex-col gap-5">
      <Form {...form}>
        <form className="flex-grow grid grid-cols-[1fr_auto] ">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Search by title or company name"
                      {...field}
                      className="rounded pl-10 pr-4 py-4 truncate"
                    />
                    <SearchIcon
                      className="absolute inset-y-3 left-3  w-4 h-4 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex gap-5 max-sm:justify-between justify-end text-slate-500 dark:text-slate-400">
        {isHome && (
          <div className={cn('flex items-center px-1 max-sm:hidden ', {})}>
            <Popover>
              <PopoverTrigger className="bg-neutral-100 dark:bg-darkBgSecondary rounded-full p-3 cursor-pointer">
                <Icon icon="filter" className="cursor-pointer" size="20" />
              </PopoverTrigger>
              <PopoverContent className="bg-transparent border-none shadow-none">
                <JobFilters searchParams={searchParams} />
              </PopoverContent>
            </Popover>
          </div>
        )}
        <Select
          onValueChange={sortChangeHandler}
          defaultValue={searchParams.sortby}
        >
          <SelectTrigger className="flex-grow rounded  space-x-2 ">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-md dark:bg-neutral-900">
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
        {(isJobs || isHome) && (
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <Filter className="border p-2 rounded-lg" size={40} />
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
      </div>
    </div>
  );
};

export default JobsHeader;
