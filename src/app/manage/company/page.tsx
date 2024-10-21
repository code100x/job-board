import { getAllCompanies } from '@/actions/company.actions';
import CompanyTable from '@/components/CompanyTabel';
import React from 'react';

const page = async () => {
  const companies = await getAllCompanies();

  return (
    <div className="mt-10 flex flex-col items-center">
      <CompanyTable company={companies.data.companies} />
    </div>
  );
};

export default page;
