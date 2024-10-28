'use client';
import { useState } from 'react';
import { FormContainer } from '@/layouts/form-container';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/actions/auth.actions';
import { useToast } from '@/components/ui/use-toast';

export const EmailVerificationLinkExpired = ({ token }: { token: string }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResendClick = async () => {
    setIsLoading(true);
    try {
      await verifyEmail({ token, resend: true });
      setIsEmailSent(true);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something went wrong, please try again!',
      });
    } finally {
      setIsLoading(!true);
    }
  };

  return (
    <div className="my-20">
      <FormContainer
        heading={'Link Expired!'}
        description={
          isEmailSent
            ? 'We’ve sent a confirmation email to your inbox. Please confirm your email address to activate your account.'
            : 'The verification link has expired or is invalid. Please request a new verification link.'
        }
      >
        {!isEmailSent ? (
          <Link href={APP_PATHS.SIGNIN}>
            <Button
              className="w-full"
              disabled={isLoading}
              aria-label="login-redirect"
            >
              Go to Login
            </Button>
          </Link>
        ) : (
          <Link href={APP_PATHS.SIGNIN} onClick={handleResendClick}>
            <Button className="w-full" aria-label="resend">
              Resend Verification Email
            </Button>
          </Link>
        )}
      </FormContainer>
    </div>
  );
};
