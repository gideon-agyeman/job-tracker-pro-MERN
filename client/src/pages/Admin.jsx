import { useLoaderData } from 'react-router';
import StatsWrapper from '../assets/page-wrappers/StatsContainer';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import StatsItem from '../components/StatsItem';

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <StatsWrapper>
      <StatsItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="current jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </StatsWrapper>
  );
};

export default Admin;
