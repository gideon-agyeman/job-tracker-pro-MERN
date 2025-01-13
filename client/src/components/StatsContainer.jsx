import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import Wrapper from '../assets/page-wrappers/StatsContainer';
import StatsItem from './StatsItem';

/* eslint-disable react/prop-types */
const StatsContainer = ({ status }) => {
  const stats = [
    {
      title: 'pending applications',
      count: status?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3cf',
    },
    {
      title: 'scheduled interviews',
      count: status?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'declined',
      count: status?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {stats.map((statusInfo) => {
        const { title, count, icon, color, bcg } = statusInfo;
        return (
          <StatsItem
            key={title}
            count={count}
            title={title}
            icon={icon}
            color={color}
            bcg={bcg}
          />
        );
      })}
    </Wrapper>
  );
};

export default StatsContainer;
