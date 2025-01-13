/* eslint-disable react/prop-types */
import InfoWrapper from '../assets/page-wrappers/JobInfo';

const JobInfo = ({ icon, text }) => {
  return (
    <InfoWrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </InfoWrapper>
  );
};

export default JobInfo;
