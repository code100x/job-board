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
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import useSetQueryParams from '@/hooks/useSetQueryParams';
import { useEffect, useState } from 'react';
import { WorkMode, EmployementType } from '@prisma/client';
import _ from 'lodash';
import { DEFAULT_PAGE } from '@/config/app.config';
import { getCityFilters } from '@/actions/job.action';
import { X } from 'lucide-react';

const JobFilters = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const [cityFilters, setCityFilters] = useState<string[]>([]);

  const setQueryParams = useSetQueryParams();
  const form = useForm<JobQuerySchemaType>({
    resolver: zodResolver(JobQuerySchema),
    defaultValues: {
      page: DEFAULT_PAGE,
      workmode: searchParams.workmode,
      EmpType: searchParams.EmpType,
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

  function clearFilters() {
    form.reset({
      page: DEFAULT_PAGE,
      workmode: [],
      EmpType: [],
      salaryrange: [],
      city: [],
    });
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">All Filters</h3>
        <button
          className="font-medium text-gray-600 dark:text-gray-300"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
      <Form {...form}>
        <form className=" flex flex-col gap-3 mt-6">
          <ScrollArea className={cn('h-fit')}>
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[
                'Employment-type',
                'work-mode',
                'choose-currency',
                'salary-range',
                'city',
              ]}
            >
              <AccordionItem value="Employment-type">
                <AccordionTrigger className="text-primary-text pt-0 hover:no-underline">
                  Employment Type
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="EmpType"
                    render={() => (
                      <FormItem>
                        {Object.keys(EmployementType).map((item, index) => (
                          <FormField
                            key={index}
                            control={form.control}
                            name="EmpType"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={index}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      className="rounded border-slate-300 hover:border-2"
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
                                  <FormLabel className="text-sm font-normal hover:cursor-pointer">
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
              <AccordionItem value="work-mode">
                <AccordionTrigger className="text-primary-text hover:no-underline">
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
                                      className="rounded border-slate-300 hover:border-2"
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
                                  <FormLabel className="text-sm font-normal hover:cursor-pointer">
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
                                      className="rounded border-slate-300 hover:border-2"
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
                                  <FormLabel className="text-sm font-normal hover:cursor-pointer">
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
                                  <FormLabel
                                    className={`font-medium text-xs cursor-pointer flex gap-1 text-center justify-start py-2 px-4 rounded-full border
                                               ${field.value?.includes(item) ? 'pr-1 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-700 dark:text-blue-400 border-blue-800 dark:border-blue-400' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 '}`}
                                  >
                                    {_.startCase(item.toLowerCase())}
                                    {field.value?.includes(item) && (
                                      <X size={15} />
                                    )}
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
