import DashboardFormsWrapper from '../assets/page-wrappers/DashboardFormPage';
import FormInput from '../components/FormInput';
import { Form, useSubmit, Link } from 'react-router';
import { JOB_STATUS, JOB_TYPE, SORT_JOBS } from '../../../utils/constants';
import FormSelect from '../components/FormSelect';
import SubmitButton from '../components/SubmitButton';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  // const debounce = (onChange) => {
  //   let timeout;
  //   return (e) => {
  //     const form = e.currentTarget.form;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       onChange(form);
  //     }, 2000);
  //   };
  // };

  return (
    <DashboardFormsWrapper>
      <Form action="" className="form">
        <h4 className="form-title">Search Jobs</h4>
        <div className="form-center">
          <FormInput
            type="search"
            name="search"
            defaultValue={search}
            // onChange={debounce((form) => submit(form))}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormSelect
            name="jobStatus"
            label="job status"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormSelect
            name="jobType"
            label="job type"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormSelect
            name="sort"
            label="sort"
            list={Object.values(SORT_JOBS)}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            reset
          </Link>
          <SubmitButton formBtn />
        </div>
      </Form>
    </DashboardFormsWrapper>
  );
};

export default SearchContainer;
