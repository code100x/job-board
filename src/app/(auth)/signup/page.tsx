import { Signup } from '@/components/auth/signup';
import { FormContainer } from '@/layouts/form-container';

const SignupPage = () => {
  return (
    <div className="my-20">
      <FormContainer
        heading={'Welcome to 100xJobs'}
        description={'Please enter your details to sign up.'}
      >
        <Signup />
      </FormContainer>
    </div>
  );
};

export default SignupPage;
