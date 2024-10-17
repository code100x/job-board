import { useMemo } from 'react';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

export const useFilterCheck = (formValues: JobQuerySchemaType) => {
  const isAnyFilterSelected = useMemo(() => {
    return ['workmode', 'EmpType', 'salaryrange', 'city'].some((key) => {
      const value = formValues[key as keyof JobQuerySchemaType];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // For non-array values, check if they're truthy
      return !!value;
    });
  }, [formValues]);

  return isAnyFilterSelected;
};
