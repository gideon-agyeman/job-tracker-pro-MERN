import DashboardFormsWrapper from '../assets/page-wrappers/DashboardFormPage';
import { useOutletContext, Form } from 'react-router';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const Profile = () => {
  const { user } = useOutletContext();

  return (
    <DashboardFormsWrapper>
      <Form method="POST" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              profile picture (max 0.5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="form-input"
            />
          </div>
          <FormInput type="text" name="name" defaultValue={user.name} />
          <FormInput type="text" name="lastName" defaultValue={user.lastName} />
          <FormInput type="email" name="email" defaultValue={user.email} />
          <FormInput type="text" name="location" defaultValue={user.location} />
          <SubmitButton formBtn />
        </div>
      </Form>
    </DashboardFormsWrapper>
  );
};

export default Profile;
