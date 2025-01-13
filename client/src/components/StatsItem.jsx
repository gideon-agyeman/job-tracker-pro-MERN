/* eslint-disable react/prop-types */
import StatsItemWrapper from '../assets/page-wrappers/StatItem';

const StatsItem = ({ count, title, icon, color, bcg }) => {
  return (
    <StatsItemWrapper color={color} $bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </StatsItemWrapper>
  );
};

export default StatsItem;
