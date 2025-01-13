import LandingPageWrapper from '../assets/page-wrappers/LandingPage';
import { useNavigate } from 'react-router';
import main from '../assets/images/main.svg';
import { Link } from 'react-router';
import { Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const LandingPage = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: 'demoUser@gmail.com',
      password: 'd3m0!Us3r@2025',
    };

    try {
      await customFetch.post('/auth/login', data);
      toast.success('login successful...', { autoClose: 1000 });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <LandingPageWrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            app <span>portal</span>
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab dicta
            facere iste alias pariatur blanditiis molestiae, quo necessitatibus
            saepe nostrum tempore, laboriosam sit aspernatur aperiam.
          </p>
          <Link to="/register" className="btn register-link">
            register / login
          </Link>
          <Link className="btn" onClick={loginDemoUser}>
            Demo User
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img" />
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPage;
