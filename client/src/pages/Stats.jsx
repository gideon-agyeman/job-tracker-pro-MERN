import { useLoaderData } from 'react-router';
import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';

const Stats = () => {
  const { applicationStatus, monthlyApplications } = useLoaderData();

  return (
    <div>
      <StatsContainer status={applicationStatus} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </div>
  );
};

export default Stats;
