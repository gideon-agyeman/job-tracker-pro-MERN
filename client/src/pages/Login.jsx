import { Link, Form } from 'react-router';
import LoginPageWrapper from '../assets/page-wrappers/RegisterAndLoginPage';
import FormInput from '../components/FormInput';
import { Logo } from '../components';
import SubmitButton from '../components/SubmitButton';

const Login = () => {
  return (
    <LoginPageWrapper>
      <Form method="POST" action="/login" className="form">
        <Link to="/">
          <Logo />
        </Link>
        <h4>Login</h4>
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <SubmitButton />
        <p>
          Don&apos;t have an account?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </LoginPageWrapper>
  );
};

export default Login;
