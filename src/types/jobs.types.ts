export type JobType = {
  workMode: 'remote' | 'office' | 'hybrid';
  location: string;
  minSalary: number | null;
  maxSalary: number | null;
  id: string;
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
