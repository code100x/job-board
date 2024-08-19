import { WorkMode, Currency } from '@prisma/client';

export type JobType = {
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  id: string;
  title: string;
  description: string | null;
  companyName: string;
  hasSalaryRange: boolean | null;
  postedAt: Date;
  workMode: WorkMode;
  currency: Currency;
};
export type getAllJobsAdditonalType = {
  jobs: JobType[];
  totalJobs: number;
};
export type getJobType = {
  job: JobType | null;
};
