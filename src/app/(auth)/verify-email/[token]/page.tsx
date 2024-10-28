import { verifyEmail } from '@/actions/auth.actions';
import { Button } from '@/components/ui/button';
import APP_PATHS from '@/config/path.config';
import { FormContainer } from '@/layouts/form-container';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { EmailVerificationLinkExpired } from './EmailVerificationLinkExpired';

const Page = async ({ params: { token } }: { params: { token: string } }) => {
  const res = await verifyEmail({ token });

  if (res.status) return <EmailVerifiedSuccess />;
  else if (res?.error?.notFound) return <EmailVerificationLinkNotFound />;
  else if (res?.error?.linkExpired)
    return <EmailVerificationLinkExpired token={token} />;
  return redirect(APP_PATHS.SIGNIN);
};

export default Page;

const EmailVerifiedSuccess = () => {
  return (
    <div className="my-20">
      <FormContainer
        heading={'Email Verified!'}
        description={
          'Your email has been successfully verified. You can now access your account.'
        }
      >
        <Link href={APP_PATHS.SIGNIN}>
          <Button className="w-full" aria-label="login">
            Go to Login
          </Button>
        </Link>
      </FormContainer>
    </div>
  );
};

const EmailVerificationLinkNotFound = () => {
  return (
    <div className="my-20">
      <FormContainer
        heading={'Link Not Found'}
        description={'The verification link you used is invalid or not found.'}
      >
        <Link href={APP_PATHS.SIGNUP}>
          <Button className="w-full" aria-label="signip-redirect">
            Go to Signup
          </Button>
        </Link>
      </FormContainer>
    </div>
  );
};
