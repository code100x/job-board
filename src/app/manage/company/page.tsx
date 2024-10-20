import { getAllCompanies } from '@/actions/company.actions';
import CompanyTable from '@/components/CompanyTabel';
import React from 'react';

const page = async () => {
  const companies = await getAllCompanies();

  return <CompanyTable company={companies.data.companies} />;
};

export default page;
