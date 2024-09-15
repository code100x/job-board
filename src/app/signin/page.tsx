import { getServerSession } from 'next-auth';
import SignIn from '@/components/sign-in';
import { redirect } from 'next/navigation';
import React from 'react';
import { options } from '@/lib/auth';

const SignInPage = async () => {
  const session = await getServerSession(options);
  if (session?.user) {
    redirect('/');
  }
  return <SignIn />;
};

export default SignInPage;
