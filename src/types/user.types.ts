import {
  DegreeType,
  EmployementType,
  FieldOfStudyType,
  WorkMode,
} from '@prisma/client';

export interface ProjectType {
  id: number;
  projectName: string;
  projectGithub: string;
  projectThumbnail: string | null;
  projectLiveLink: string | null;
  isFeature: boolean;
  stack: string;
  projectSummary: string;
}
export interface EducationType {
  id: number;
  startDate: Date;
  instituteName: string;
  degree: DegreeType;
  fieldOfStudy: FieldOfStudyType;
  endDate: Date | null;
}
export interface ExperienceType {
  id: number;
  startDate: Date;
  endDate: Date | null;
  companyName: string;
  currentWorkStatus: boolean;
  description: string;
  address: string;
  workMode: WorkMode;
  EmploymentType: EmployementType;
  designation: string;
}

export interface UserType {
  name: string;
  id: string;
  email: string;
  skills: string[];
  contactEmail: string | null;
  resume: string | null;
  avatar: string | null;
  aboutMe: string | null;
  experience: ExperienceType[];
  education: EducationType[];
  project: ProjectType[];
  resumeUpdateDate: Date | null;
  githubLink: string | null;
  portfolioLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  discordLink: string | null;
}
