import Job from './Job';
import JobsWrapper from '../assets/page-wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageButtonContainer from './PageButtonContainer';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { data: jobs, meta } = data;
  const { currentPage, numOfPages, totalJobs } = meta;

  if (jobs.length === 0)
    return (
      <JobsWrapper>
        <h2>No jobs found </h2>
      </JobsWrapper>
    );

  return (
    <JobsWrapper>
      <p
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>
          {totalJobs} Job{jobs.length > 1 && 's'} found
        </span>
        <span>
          {currentPage} of {numOfPages} pages
        </span>
      </p>
      <hr style={{ marginBottom: '40px', color: '#00aaaa' }} />
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageButtonContainer />}
    </JobsWrapper>
  );
};

export default JobsContainer;
