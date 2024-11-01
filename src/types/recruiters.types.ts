export type RecruitersTypes = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  _count: {
    jobs: number;
  };
  company: {
    name: string; // changed from companyName to match Prisma schema
    website: string | null; // changed from companyEmail to match Prisma schema
  } | null;
};

export type getAllRecruiters = {
  recruiters: RecruitersTypes[];
};
