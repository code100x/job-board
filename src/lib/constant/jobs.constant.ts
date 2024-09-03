export enum SortByEnums {
  POSTEDAT_ASC = 'postedat_asc',
  POSTEDAT_DESC = 'postedat_desc',
}
export const filters = {
  salaryRange: [
    {
      id: 1,
      label: '$0-$5k',
      value: '0-5000',
    },
    {
      id: 2,
      label: '$5-$10k',
      value: '5000-10000',
    },
    {
      id: 3,
      label: '$10-$30k',
      value: '10000-30000',
    },
    {
      id: 4,
      label: '$30-$50k',
      value: '30000-50000',
    },
    {
      id: 5,
      label: '$50k or above',
      value: '50000-above',
    },
  ],
};

export const jobSorting = [
  {
    id: 1,
    label: 'Latest Jobs',
    value: 'postedat_desc',
  },
  {
    id: 2,
    label: 'Oldest Jobs',
    value: 'postedat_asc',
  },
];
