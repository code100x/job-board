import PaymentManagement from '@/components/PaymentManagement';
import { options } from '@/lib/auth';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const ManagePayment = async () => {
  const server = await getServerSession(options);
  if (!server?.user) {
    redirect('/api/auth/signin');
  } else if (server.user.role !== 'ADMIN') {
    redirect('/jobs');
  }
  const payments = [
    {
      tranId: 'TX123456789',
      companyName: 'House of Aesthetics',
      amount: 150.0,
      date: '2024-10-24',
    },
    {
      tranId: 'TX987654321',
      companyName: 'Tech Innovations Inc.',
      amount: 250.0,
      date: '2024-10-23',
    },
    {
      tranId: 'TX456789123',
      companyName: 'Creative Solutions Ltd.',
      amount: 75.5,
      date: '2024-10-22',
    },
    {
      tranId: 'TX321654987',
      companyName: 'Global Enterprises',
      amount: 300.0,
      date: '2024-10-21',
    },
    {
      tranId: 'TX321654987',
      companyName: 'Global Enterprises',
      amount: 300.0,
      date: '2024-10-21',
    },
    {
      tranId: 'TX321654987',
      companyName: 'Global Enterprises',
      amount: 300.0,
      date: '2024-10-21',
    },
    {
      tranId: 'TX321654987',
      companyName: 'Global Enterprises',
      amount: 300.0,
      date: '2024-10-21',
    },
    {
      tranId: 'TX321654987',
      companyName: 'Global Enterprises',
      amount: 300.0,
      date: '2024-10-21',
    },
  ];

  return <PaymentManagement payments={payments} />;
};

export default ManagePayment;
