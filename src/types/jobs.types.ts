export type JobType = {
  companyLogo: string;
  companyBio: string;
  workMode: 'remote' | 'office' | 'hybrid';
  city: string;
  address: string;
  minSalary: number | null;
  type: string;
  category: string;
  maxSalary: number | null;
  minExperience: number | null;
  maxExperience: number | null;
  skills: string[];
  id: string;
  title: string;
  expired: Boolean;
  description: string | null;
  companyName: string;
  postedAt: Date;
  isVerifiedJob?: Boolean;
  application?: string;
  deleted?: Boolean;
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
