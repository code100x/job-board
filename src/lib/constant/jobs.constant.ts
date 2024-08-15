export const workMode = {
  remote: 'remote',
  office: 'office',
  hybrid: 'hybrid',
};
export enum WorkModeEnums {
  REMOTE = 'remote',
  OFFICE = 'office',
  HYBRID = 'hybrid',
}
export enum SortByEnums {
  POSTEDAT_ASC = 'postedat_asc',
  POSTEDAT_DESC = 'postedat_desc',
}
export const filters = {
  workMode: [
    {
      id: 1,
      label: 'Remote',
      value: workMode.remote,
    },
    {
      id: 2,
      label: 'Office',
      value: workMode.office,
    },
    {
      id: 3,
      label: 'Hybrid',
      value: workMode.hybrid,
    },
  ],
  chooseCurrency: [
    {
      id: 1,
      label: 'INR',
      value: 'INR',
    },
    {
      id: 2,
      label: 'USD',
      value: 'USD',
    },
  ],
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
  location: [
    { id: 1, label: 'Bangalore', value: 'bangalore' },
    { id: 2, label: 'New Delhi', value: 'new delhi' },
    { id: 3, label: 'Mumbai', value: 'mumbai' },
    { id: 4, label: 'Pune', value: 'pune' },
    { id: 5, label: 'Hyderabad', value: 'hyderabad' },
    { id: 6, label: 'Chennai', value: 'chennai' },
    { id: 7, label: 'Kolkata', value: 'kolkata' },
    { id: 8, label: 'Ahmedabad', value: 'ahmedabad' },
    { id: 9, label: 'Jaipur', value: 'jaipur' },
    { id: 10, label: 'Surat', value: 'surat' },
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
