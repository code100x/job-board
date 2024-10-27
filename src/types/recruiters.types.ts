export type RecruitersTypes = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  _count: {
    jobs: number;
  };
};

export type getAllRecruiters = {
  recruiters: RecruitersTypes[];
};
