import { redirect } from 'react-router';
import customFetch from './customFetch';
import { toast } from 'react-toastify';

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/');
  }
};

export const jobsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get('/jobs', { params });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'An unexpected error occurred.');
    return error;
  }
};

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const adminPageLoader = async () => {
  try {
    const { data } = await customFetch.get(`/users/admin/app-stats`);
    return data;
  } catch (error) {
    toast.error('access denied');
    console.log(error);
    return redirect('/dashboard');
  }
};

export const statsPageLoader = async () => {
  try {
    const { data } = await customFetch.get('/jobs/stats');
    return data;
  } catch (error) {
    toast.error('');
    return error;
  }
};
