export type JobType = {
  companyLogo: string | undefined;
  workMode: 'remote' | 'office' | 'hybrid';
  city: string;
  address: string;
  minSalary: number | null;
  type: string;
  category: string;
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
export type getAllRecommendedJobs = {
  jobs: JobType[];
};
export type getJobType = {
  job: JobType | null;
};
