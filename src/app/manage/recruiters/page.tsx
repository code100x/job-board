import ManageRecruiters from '@/components/ManageRecruiters';

import { options } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const RecruitersPage = async () => {
  const server = await getServerSession(options);
  if (!server?.user) {
    redirect('/api/auth/signin');
  } else if (server.user.role !== 'ADMIN') {
    redirect('/jobs');
  }
  const Recruiters = [
    {
      id: '1',
      companyName: 'Tech Innovations Inc.',
      companyEmail: 'contact@techinnovations.com',
      jobsPosted: 25,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      companyName: 'Creative Solutions Ltd.',
      companyEmail: 'info@creativesolutions.com',
      jobsPosted: 15,
      createdAt: '2023-11-30',
    },
    {
      id: '3',
      companyName: 'Global Enterprises',
      companyEmail: 'hr@globalenterprises.com',
      jobsPosted: 30,
      createdAt: '2023-07-22',
    },
    {
      id: '4',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
    {
      id: '5',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
    {
      id: '6',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
    {
      id: '7',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
    {
      id: '8',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
    {
      id: '9',
      companyName: 'House of Aesthetics',
      companyEmail: 'houseofaesthetics154@gmail.com',
      jobsPosted: 10,
      createdAt: '2024-02-10',
    },
  ];

  return <ManageRecruiters recruiters={Recruiters} />;
};

export default RecruitersPage;
