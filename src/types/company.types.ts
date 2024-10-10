export type CompanyType = {
  id: string;
  name: string;
  email: string;
  website: string | null;
  bio: string;
  createdAt: Date;
  logo: string;
};
export type CompanyByIdSchemaType = {
  id: string;
};
export type CompanySchemaType = {
  name: string;
  email: string;
  website: string | null;
  bio: string;
  logo: string;
};

// export type getCommpanyType = {
//   company: CompanyType | null;
// };
