import { redirect } from 'react-router';
import customFetch from './customFetch';
import { toast } from 'react-toastify';

export const registerUserAction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', userData);
    toast.success('Registration successful..', { autoClose: 3000 });
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
    return error;
  }
};

export const loginUserAction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', userData);
    toast.success('Login successful..', { autoClose: 3000 });
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
    return error;
  }
};

export const addJobAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/jobs', data);
    toast.success('job added', { autoClose: 3000 });
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
    return error;
  }
};

export const editJobAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('job updated', { autoClose: 1000 });
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
    return error;
  }
};

export const deleteJobAction = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('job deleted', { autoClose: 1000 });
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
  }
  return redirect('/dashboard/all-jobs');
};

export const userProfileUpdateAction = async ({ request }) => {
  const formData = await request.formData();
  const imageFile = formData.get('avatar');
  if (imageFile && imageFile.size > 500000) {
    toast.error('image size too large');
    return null;
  }

  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('profile updated', { autoClose: 1000 });
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
  }
  return null;
};
