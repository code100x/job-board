export type JobType = {
  companyLogo: string | undefined;
  workMode: 'remote' | 'office' | 'hybrid';
  city: string;
  address: string;
  minSalary: number | null;
  maxSalary: number | null;
  id: string;
  title: string;
  description: string | null;
  companyName: string;
  postedAt: Date;
  isVerifiedJob: Boolean;
};
export type getAllJobsAdditonalType = {
  jobs: JobType[];
  totalJobs: number;
};
export type getJobType = {
  job: JobType | null;
};
