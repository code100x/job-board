import { getUserRecruiters } from '@/actions/user.profile.actions';
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

  const Recruiters = await getUserRecruiters();

  return <ManageRecruiters recruiters={Recruiters} />;
};

export default RecruitersPage;
