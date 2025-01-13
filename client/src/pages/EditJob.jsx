import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { useLoaderData, Form } from 'react-router';
import DashboardFormsWrapper from '../assets/page-wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import SubmitButton from '../components/SubmitButton';

const EditJob = () => {
  const { job } = useLoaderData();
  const { _id, position, company, jobLocation, jobStatus, jobType } = job;

  return (
    <DashboardFormsWrapper>
      <Form method="POST" action={`../edit-job/${_id}`} className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormInput type="text" name="position" defaultValue={position} />
          <FormInput type="text" name="company" defaultValue={company} />
          <FormInput
            type="text"
            name="jobLocation"
            label="job location"
            defaultValue={jobLocation}
          />
          <FormSelect
            name="jobStatus"
            label="job status"
            defaultValue={jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormSelect
            name="jobType"
            label="job type"
            defaultValue={jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </DashboardFormsWrapper>
  );
};

export default EditJob;
