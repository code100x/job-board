import Signin from '@/components/auth/signin';
import { FormContainer } from '@/layouts/form-container';

const LoginPage = () => {
  return (
    <FormContainer
      heading={'Welcome back'}
      description={'Please enter your details to sign in.'}
    >
      <Signin />
    </FormContainer>
  );
};

export default LoginPage;
