import { ResetPassword } from '@/components/auth/reset-password';
import prisma from '@/config/prisma.config';
import { FormContainer } from '@/layouts/form-container';
import { isTokenExpiredUtil } from '@/lib/utils';
import { notFound } from 'next/navigation';
import React from 'react';

const ResetPasswordPage = async ({
  params: { token },
}: {
  params: { token: string };
}) => {
  const verificatinToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!verificatinToken) notFound();

  if (isTokenExpiredUtil(verificatinToken.createdAt))
    return <h1>link expried</h1>;

  const user = await prisma.user.findFirst({
    where: { id: verificatinToken.identifier },
  });

  if (!user) notFound();

  return (
    <div className="my-20">
      <FormContainer
        heading={'Welcome back!'}
        description={'Enter your details below to continue with your sign-in.'}
      >
        <ResetPassword />
      </FormContainer>
    </div>
  );
};

export default ResetPasswordPage;
