import { ForgotPassword } from '@/components/auth/forgot-password';
import { FormContainer } from '@/layouts/form-container';
import React from 'react';

const ForgootPasswordPage = async () => {
  return (
    <div className="my-20">
      <FormContainer
        heading={'Welcome back!'}
        description={'Enter your details below to continue with your sign-in.'}
      >
        <ForgotPassword />
      </FormContainer>
    </div>
  );
};

export default ForgootPasswordPage;
