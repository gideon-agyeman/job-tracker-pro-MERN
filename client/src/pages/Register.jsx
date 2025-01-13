import { Link, Form } from 'react-router';
import RegisterPageWrapper from '../assets/page-wrappers/RegisterAndLoginPage';
import FormInput from '../components/FormInput';
import { Logo } from '../components';
import SubmitButton from '../components/SubmitButton';

const Register = () => {
  return (
    <RegisterPageWrapper>
      <Form method="POST" action="/register" className="form">
        <Link to="/">
          <Logo />
        </Link>
        <h4>Register</h4>
        <FormInput type="text" label="name" name="name" />
        <FormInput type="text" label="last name" name="lastName" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <FormInput type="text" label="location" name="location" />
        <SubmitButton />
        <p>
          Already have an account?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </RegisterPageWrapper>
  );
};

export default Register;
