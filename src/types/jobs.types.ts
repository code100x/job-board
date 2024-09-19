export type JobType = {
  companyLogo: string;
  workMode: 'remote' | 'office' | 'hybrid';
  city: string;
  address: string;
  minSalary: number | null;
  maxSalary: number | null;
  id: string;
  type: string;
  title: string;
  description: string | null;
  companyName: string;
  postedAt: Date;
};
export type getAllJobsAdditonalType = {
  jobs: JobType[];
  totalJobs: number;
};
export type getJobType = {
  job: JobType | null;
};
