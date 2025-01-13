import DashboardFormsWrapper from '../assets/page-wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router';
import FormInput from '../components/FormInput';
import { Form } from 'react-router';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import FormSelect from '../components/FormSelect';
import SubmitButton from '../components/SubmitButton';

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <DashboardFormsWrapper>
      <Form method="POST" action="" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormInput type="text" name="position" />
          <FormInput type="text" name="company" />
          <FormInput
            type="text"
            label="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormSelect
            name="jobStatus"
            label="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormSelect
            name="jobType"
            label="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </DashboardFormsWrapper>
  );
};

export default AddJob;
