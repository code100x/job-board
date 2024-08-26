'use client';
import { jobFilterQuery } from '@/actions/job.action';
import { filters, WorkModeEnums } from '@/lib/constant/jobs.constant';
import {
  JobQuerySchema,
  JobQuerySchemaType,
} from '@/lib/validators/jobs.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Checkbox } from '../components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatFilterSearchParams } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import APP_PATHS from '@/config/path.config';

const JobFilters = ({
  searchParams,
  baseUrl,
}: {
  searchParams: JobQuerySchemaType;
  baseUrl: string;
}) => {
  const pathname = usePathname();
  const isHome = pathname === APP_PATHS.HOME;
  const form = useForm<JobQuerySchemaType>({
    resolver: zodResolver(JobQuerySchema),
    defaultValues: {
      workmode:
        searchParams.workmode &&
        (formatFilterSearchParams(searchParams.workmode) as WorkModeEnums[]),
      salaryrange:
        searchParams.salaryrange &&
        formatFilterSearchParams(searchParams.salaryrange),
      location:
        searchParams.location &&
        formatFilterSearchParams(searchParams.location),
    },
  });
  async function handleFormSubmit(data: JobQuerySchemaType) {
    await jobFilterQuery(
      {
        ...data,
        search: searchParams.search,
        sortby: searchParams.sortby,
      },
      baseUrl
    );
  }
  return (
    <aside className="rounded-lg border bg-background  max-w-[320px] w-full h-fit p-6 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-base text-primary-text">All Filters</h3>
      </div>
      <Separator className="my-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className=" flex flex-col gap-3"
        >
          <ScrollArea className={cn('h-96 pr-4', { 'h-64 ': isHome })}>
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[
                'work-mode',
                'choose-currency',
                'salary-range',
                'location',
              ]}
            >
              <AccordionItem value="work-mode">
                <AccordionTrigger className="text-primary-text pt-0 hover:no-underline">
                  Work mode
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="workmode"
                    render={() => (
                      <FormItem>
                        {filters.workMode.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="workmode"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.value as WorkModeEnums
                                      )}
                                      onCheckedChange={(checked) => {
                                        checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.value
                                              )
                                            );
                                        form.handleSubmit(handleFormSubmit)();
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="salary-range">
                <AccordionTrigger className="text-primary-text hover:no-underline">
                  Salary
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="salaryrange"
                    render={() => (
                      <FormItem>
                        {filters.salaryRange.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="salaryrange"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.value
                                              )
                                            );
                                        form.handleSubmit(handleFormSubmit)();
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="location">
                <AccordionTrigger className="text-primary-text hover:no-underline">
                  Location
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="location"
                    render={() => (
                      <FormItem className="flex flex-wrap gap-2 space-y-0">
                        {filters.location.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="location"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex items-center space-y-0 group"
                                  aria-checked={field.value?.includes(
                                    item.value
                                  )}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.value
                                      )}
                                      onCheckedChange={(checked) => {
                                        checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.value
                                              )
                                            );
                                        form.handleSubmit(handleFormSubmit)();
                                      }}
                                      hidden
                                    />
                                  </FormControl>
                                  <FormLabel className="text-primary-text font-normal text-xs cursor-pointer group-aria-checked:bg-primary group-aria-checked:text-primary-foreground flex items-center justify-start py-2 px-4 rounded-full border">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </form>
      </Form>
    </aside>
  );
};

export default JobFilters;
