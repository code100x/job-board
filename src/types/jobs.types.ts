export type JobType = {
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
  description: string | null;
  postedAt: Date;
  application?: string;
  companyId?: string;
  company?: {
    id: string;
    name: string;
    bio: string;
    logo: string;
  };
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
