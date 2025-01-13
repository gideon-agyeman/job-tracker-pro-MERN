import { useRouteError } from 'react-router';
import ErrorPageWrapper from '../assets/page-wrappers/ErrorPage';
import { NotFound } from '../components';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) return <NotFound />;

  return (
    <ErrorPageWrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </ErrorPageWrapper>
  );
};

export default Error;
