import Signin from '@/components/auth/signin';
import { FormContainer } from '@/layouts/form-container';

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <FormContainer
        heading={'Welcome back'}
        description={'Please enter your details to sign in.'}
      >
        <Signin />
      </FormContainer>
    </div>
  );
};

export default LoginPage;
