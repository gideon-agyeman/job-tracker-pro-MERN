import ErrorPageWrapper from '../assets/page-wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <ErrorPageWrapper>
      <div>
        <img src={img} alt="not-found" className="" />
        <h3>ohh! page not found</h3>
        <p>we can&apos;t seem to find the page you are looking for</p>
        <Link to="/dashboard">back home</Link>
      </div>
    </ErrorPageWrapper>
  );
};

export default NotFound;
