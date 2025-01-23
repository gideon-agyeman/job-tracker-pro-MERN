import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';
import { useQuery } from '@tanstack/react-query';
import { statsQuery } from '../utils/queryObject';

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { applicationStatus, monthlyApplications } = data;

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
