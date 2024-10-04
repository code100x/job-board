import React from 'react';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerSession(authOptions);

  if (auth) redirect(`/`);

  return children;
}
