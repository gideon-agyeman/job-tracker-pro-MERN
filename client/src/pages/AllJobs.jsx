/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import JobsContainer from '../components/JobsContainer';
import SearchContainer from '../components/SearchContainer';
import { useLoaderData } from 'react-router';

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
