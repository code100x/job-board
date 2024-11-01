'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import APP_PATHS from '@/config/path.config';
import { useRouter } from 'next/navigation';
import { resendVerificationEmail } from '@/actions/auth.actions';
import { EMAIL_VERIFICATION_LINK_RESENT_TIME } from '@/config/auth.config';

export const Welcome = () => {
  const router = useRouter();
  return (
    <div className="text-center p-4">
      <p className="text-muted-foreground mb-4">
        Didn’t receive the email? Click the button below to resend it.
      </p>
      <CountdownButton />
      <Button
        variant="link"
        className="mt-4 text-primary underline"
        onClick={() => router.push(APP_PATHS.SIGNIN)}
        aria-label="go-to-login"
      >
        Go to Login
      </Button>
    </div>
  );
};

const CountdownButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const resentTime = EMAIL_VERIFICATION_LINK_RESENT_TIME;
  const [secondsRemaining, setSecondsRemaining] = useState(resentTime);

  // Handler when button is clicked
  const handleClick = async () => {
    setIsDisabled(true);
    setSecondsRemaining(resentTime);
    await resendVerificationEmail(null);
  };

  // useEffect to handle the countdown logic
  useEffect(() => {
    if (secondsRemaining === 0 && isDisabled) {
      setIsDisabled(false); // Enable the button once the countdown is over
    }

    let timer: NodeJS.Timeout;

    if (isDisabled && secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000); // Decrease the time every second
    }

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [isDisabled, secondsRemaining]);

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      className="w-full"
      aria-label="wait"
    >
      {isDisabled
        ? `Wait ${secondsRemaining} second${secondsRemaining !== 1 ? 's' : ''}...`
        : 'Click Me'}
    </Button>
  );
};
