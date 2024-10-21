import { JOBS_PER_PAGE } from '@/config/app.config';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { Prisma } from '@prisma/client';

function salaryRangeQuery(salaryrange: JobQuerySchemaType['salaryrange']) {
  const query = salaryrange!.map((range: string) => {
    const [minSalary, maxSalary] = range.split('-');
    const isAbove = isNaN(Number(maxSalary));
    return {
      AND: [
        {
          minSalary: {
            gte: Number(minSalary),
          },
          ...(!isAbove && {
            maxSalary: {
              lte: Number(maxSalary),
            },
          }),
        },
      ],
    };
  });
  return query;
}
export function getJobFilters({
  EmpType,
  workmode,
  city,
  salaryrange,
  search,
  sortby,
  page,
  limit,
}: JobQuerySchemaType) {
  const filters = [
    EmpType && { type: { in: EmpType } },
    workmode && { workMode: { in: workmode } },
    city && { city: { in: city } },
    salaryrange && { OR: salaryRangeQuery(salaryrange) },
    search && {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          companyName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
  ];
  const filterQueries: Prisma.JobWhereInput = {
    AND: filters.filter(
      (filter) => filter !== undefined && filter !== null && filter !== ''
    ) as Prisma.JobWhereInput[],
  };

  const sortFieldMapping: { [key: string]: string } = {
    postedat: 'postedAt',
    maxsalary: 'maxSalary',
  };

  const [sort, sortOrder] = sortby.split('_');
  const orderBy: Prisma.JobOrderByWithAggregationInput = sortby
    ? {
        [sortFieldMapping[sort]]:
          sort === 'maxsalary' ? { sort: sortOrder, nulls: 'last' } : sortOrder,
      }
    : {};

  const pagination = {
    skip: 0,
    take: limit || JOBS_PER_PAGE,
  };
  if (page) {
    pagination.skip = (page - 1) * JOBS_PER_PAGE;
  }
  return { filterQueries, orderBy, pagination };
}
