'use client';
import { filters } from '@/lib/constant/jobs.constant';
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
import { cn } from '@/lib/utils';
import useSetQueryParams from '@/hooks/useSetQueryParams';
import { useEffect, useState } from 'react';
import { WorkMode } from '@prisma/client';
import _ from 'lodash';
import { DEFAULT_PAGE } from '@/config/app.config';
import { getCityFilters } from '@/actions/job.action';

const JobFilters = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const [cityFilters, setCityFilters] = useState<string[]>([]);

  const setQueryParams = useSetQueryParams();
  const form = useForm<JobQuerySchemaType>({
    resolver: zodResolver(JobQuerySchema),
    defaultValues: {
      page: DEFAULT_PAGE,
      workmode: searchParams.workmode,
      salaryrange: searchParams.salaryrange,
      city: searchParams.city,
    },
  });

  const formValues = form.watch();

  async function fetchCityFilters() {
    const cities = await getCityFilters();
    setCityFilters(cities.additional.cities);
    return cities;
  }

  useEffect(() => {
    fetchCityFilters();
  }, []);

  useEffect(() => {
    if (formValues) {
      setQueryParams(formValues);
    }
  }, [formValues, setQueryParams, searchParams]);

  return (
    <aside
      className={cn(
        'rounded-lg  bg-background  min-w-[290px]  p-6 h-fit  top-20'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-base text-primary-text">All Filters</h3>
      </div>
      <Separator className="my-6" />
      <Form {...form}>
        <form className=" flex flex-col gap-3">
          <ScrollArea className={cn('h-fit pr-4')}>
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[
                'work-mode',
                'choose-currency',
                'salary-range',
                'city',
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
                        {Object.keys(WorkMode).map((item, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name="workmode"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={index}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {_.startCase(item)}
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
              <AccordionItem value="city">
                <AccordionTrigger className="text-primary-text hover:no-underline">
                  City
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="city"
                    render={() => (
                      <FormItem className="flex flex-wrap gap-2 space-y-0">
                        {cityFilters.map((item, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name="city"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={index}
                                  className="flex items-center space-y-0 group"
                                  aria-checked={field.value?.includes(item)}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                      hidden
                                    />
                                  </FormControl>
                                  <FormLabel className="text-primary-text font-normal text-xs cursor-pointer group-aria-checked:bg-primary group-aria-checked:text-primary-foreground flex items-center justify-start py-2 px-4 rounded-full border">
                                    {_.startCase(item.toLowerCase())}
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
