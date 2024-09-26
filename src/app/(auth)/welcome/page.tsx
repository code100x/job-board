import { Welcome } from '@/components/auth/welcome';
import APP_PATHS from '@/config/path.config';
import { FormContainer } from '@/layouts/form-container';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PENDING_EMAIL_VERIFICATION_USER_ID } from '@/config/auth.config';

const WelcomePage = () => {
  const unverifiedUserId = cookies().get(PENDING_EMAIL_VERIFICATION_USER_ID);
  if (!unverifiedUserId) redirect(APP_PATHS.SIGNIN);

  return (
    <div className="my-20">
      <FormContainer
        heading={'Check Your Email!'}
        description={
          'We’ve sent a confirmation email to your inbox. Please confirm your email address to activate your account.'
        }
      >
        <Welcome />
      </FormContainer>
    </div>
  );
};

export default WelcomePage;
