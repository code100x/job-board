import { WorkMode, Currency } from '@prisma/client';

export type JobType = {
  companyLogo: string | undefined;
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
  application: string | null;
  companyEmail: string | null;
  category: string | null;
  type: string | null;
  companyBio: string | null;
};
export type getAllJobsAdditonalType = {
  jobs: JobType[];
  totalJobs: number;
};
export type getJobType = {
  job: JobType | null;
};
