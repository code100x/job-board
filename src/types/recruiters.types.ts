export type RecruitersTypes = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  _count: {
    jobs: number;
  };
  company: {
    companyName: string;
    companyEmail: string;
  } | null;
};

export type getAllRecruiters = {
  recruiters: RecruitersTypes[];
};
